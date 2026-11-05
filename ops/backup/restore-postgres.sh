#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }
: "\${AGE_IDENTITY_FILE:?Set AGE_IDENTITY_FILE}"
: "\${PGHOST:?Set PGHOST}"
: "\${PGDATABASE:?Set PGDATABASE recovery target}"
: "\${PGUSER:?Set PGUSER}"
[[ "\${RESTORE_CONFIRM:-}" == YES ]] || { echo "Blocked: set RESTORE_CONFIRM=YES after approval" >&2; exit 1; }
[[ "$PGDATABASE" != postgres && "$PGDATABASE" != template0 && "$PGDATABASE" != template1 ]] || { echo "Refusing system database" >&2; exit 1; }
file="$1"; bash "$(dirname "$0")/verify-backup.sh" "$file"
for cmd in age pg_restore; do command -v "$cmd" >/dev/null || { echo "Missing $cmd" >&2; exit 127; }; done
tmp="$(mktemp -d "\${TMPDIR:-/tmp}/platform-restore.XXXXXX")"; trap 'rm -rf -- "$tmp"' EXIT
age --decrypt --identity "$AGE_IDENTITY_FILE" --output "$tmp/restore.dump" "$file"
pg_restore --list "$tmp/restore.dump" >/dev/null
echo "Restoring into explicitly selected database: $PGDATABASE"
pg_restore --host="$PGHOST" --username="$PGUSER" --dbname="$PGDATABASE" --no-owner --no-acl --exit-on-error --clean --if-exists "$tmp/restore.dump"
echo "Restore command completed; run reconciliation and recovery checks before cutover."
