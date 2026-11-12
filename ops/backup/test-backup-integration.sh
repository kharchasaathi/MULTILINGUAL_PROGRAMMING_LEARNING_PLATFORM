#!/usr/bin/env bash
# Requires a reachable disposable PostgreSQL test instance, age/age-keygen,
# psql/createdb/dropdb and the standard PostgreSQL environment variables.
set -Eeuo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
: "${PGHOST:?Set PGHOST}"
: "${PGPORT:=5432}"
: "${PGUSER:?Set PGUSER}"
: "${PGPASSWORD:?Set PGPASSWORD}"
export PGPORT
for cmd in psql createdb dropdb age age-keygen; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "Missing required command: $cmd" >&2; exit 127; }
done

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"; dropdb --maintenance-db=postgres --if-exists e13_source >/dev/null 2>&1 || true; dropdb --maintenance-db=postgres --if-exists e13_recovery >/dev/null 2>&1 || true' EXIT
chmod 700 "$tmp"
createdb --maintenance-db=postgres e13_source
export PGDATABASE=e13_source
psql -v ON_ERROR_STOP=1 -d e13_source <<'SQL'
CREATE TABLE e13_recovery_parent (
  id bigint PRIMARY KEY
);
CREATE TABLE e13_recovery_probe (
  id bigint PRIMARY KEY,
  parent_id bigint NOT NULL REFERENCES e13_recovery_parent(id),
  payload text NOT NULL
);
INSERT INTO e13_recovery_parent VALUES (10), (20);
INSERT INTO e13_recovery_probe VALUES
  (1, 10, 'recovery-proof-alpha'),
  (2, 20, 'recovery-proof-beta');
SQL

age-keygen -o "$tmp/age-identity.txt" 2>"$tmp/age-keygen.log"
export AGE_IDENTITY_FILE="$tmp/age-identity.txt"
export AGE_RECIPIENT
AGE_RECIPIENT="$(age-keygen -y "$AGE_IDENTITY_FILE")"
export BACKUP_DIR="$tmp/backups" PGHOST PGUSER PGPASSWORD PGPORT
mkdir -p "$BACKUP_DIR"
bash "$root/ops/backup/backup-postgres.sh"
artifact="$(find "$BACKUP_DIR" -maxdepth 1 -type f -name '*.dump.age' -print -quit)"
[[ -n "$artifact" ]]
bash "$root/ops/backup/verify-backup.sh" "$artifact"

# Restore into a separately created empty database, never over the source.
createdb --maintenance-db=postgres e13_recovery
export PGDATABASE=e13_recovery RESTORE_CONFIRM=YES RESTORE_TARGET_ISOLATED=YES
bash "$root/ops/backup/restore-postgres.sh" "$artifact"
actual="$(psql -v ON_ERROR_STOP=1 -At -d e13_recovery -c "SELECT string_agg(id::text || ':' || parent_id::text || ':' || payload, ',' ORDER BY id) FROM e13_recovery_probe")"
expected='1:10:recovery-proof-alpha,2:20:recovery-proof-beta'
[[ "$actual" == "$expected" ]] || {
  echo "Restored row verification failed: $actual" >&2
  exit 1
}
fk_valid="$(psql -v ON_ERROR_STOP=1 -At -d e13_recovery -c "SELECT convalidated FROM pg_constraint WHERE conname = 'e13_recovery_probe_parent_id_fkey' AND contype = 'f'")"
[[ "$fk_valid" == "t" ]] || {
  echo "Restored foreign-key constraint is missing or not validated" >&2
  exit 1
}
if psql -v ON_ERROR_STOP=1 -d e13_recovery -c "INSERT INTO e13_recovery_probe VALUES (3, 999, 'must-fail')" >/dev/null 2>&1; then
  echo "Restored foreign-key constraint accepted an invalid parent reference" >&2
  exit 1
fi
echo "Real PostgreSQL + age backup/restore integration test passed, including foreign-key integrity."
