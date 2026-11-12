#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }
: "${AGE_IDENTITY_FILE:?Set AGE_IDENTITY_FILE}"
: "${PGHOST:?Set PGHOST}"
: "${PGDATABASE:?Set PGDATABASE recovery target}"
: "${PGUSER:?Set PGUSER}"

[[ -r "$AGE_IDENTITY_FILE" && -f "$AGE_IDENTITY_FILE" ]] || {
  echo "AGE_IDENTITY_FILE must be a readable regular file" >&2; exit 1;
}
[[ "${RESTORE_CONFIRM:-}" == YES ]] || {
  echo "Blocked: set RESTORE_CONFIRM=YES after approval" >&2; exit 1;
}
[[ "${RESTORE_TARGET_ISOLATED:-}" == YES ]] || {
  echo "Blocked: attest RESTORE_TARGET_ISOLATED=YES for a verified isolated recovery database" >&2; exit 1;
}
case "$PGDATABASE" in
  postgres|template0|template1) echo "Refusing system database target" >&2; exit 1 ;;
esac

file="$1"
bash "$(dirname -- "$0")/verify-backup.sh" "$file"
for cmd in age pg_restore psql mktemp; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "Missing required command: $cmd" >&2; exit 127; }
done

tmp="$(mktemp -d "${TMPDIR:-/tmp}/platform-restore.XXXXXX")"
chmod 700 "$tmp"
cleanup() { rm -rf -- "$tmp"; }
trap cleanup EXIT INT TERM

age --decrypt --identity "$AGE_IDENTITY_FILE" --output "$tmp/restore.dump" "$file"
[[ -s "$tmp/restore.dump" ]] || { echo "Decrypted archive is empty" >&2; exit 1; }
pg_restore --list "$tmp/restore.dump" >/dev/null

# A caller-provided isolation attestation is not enough: independently verify
# that the target contains no user schemas, relations, routines, types or large
# objects before allowing pg_restore to write into it.
target_objects="$(psql -X -qAt -v ON_ERROR_STOP=1 \
  --host="$PGHOST" --username="$PGUSER" --dbname="$PGDATABASE" \
  --command="SELECT
    (SELECT count(*) FROM pg_namespace
      WHERE nspname NOT IN ('pg_catalog', 'information_schema', 'public')
        AND nspname NOT LIKE 'pg_toast%')
    + (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        AND n.nspname NOT LIKE 'pg_toast%')
    + (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        AND n.nspname NOT LIKE 'pg_toast%')
    + (SELECT count(*) FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
        AND n.nspname NOT LIKE 'pg_toast%')
    + (SELECT count(*) FROM pg_largeobject)")"
[[ "$target_objects" =~ ^[0-9]+$ ]] || {
  echo "Could not verify recovery database emptiness; refusing restore" >&2
  exit 1
}
(( target_objects == 0 )) || {
  echo "Recovery database is not empty (user object count: $target_objects); refusing restore" >&2
  exit 1
}

echo "Restoring into verified empty isolated database: $PGDATABASE"
# Intentionally do not use --clean/--if-exists. Restore must target a newly
# provisioned empty recovery database; this avoids silently dropping objects.
pg_restore --host="$PGHOST" --username="$PGUSER" --dbname="$PGDATABASE" \
  --no-owner --no-acl --exit-on-error "$tmp/restore.dump"
echo "Restore command completed. Run schema, row-count, integrity, application and privacy/audit reconciliation before cutover."
