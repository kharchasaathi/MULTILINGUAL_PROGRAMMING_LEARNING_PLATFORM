#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
: "${BACKUP_DIR:?Set BACKUP_DIR}"
: "${AGE_RECIPIENT:?Set AGE_RECIPIENT}"
: "${PGHOST:?Set PGHOST}"
: "${PGDATABASE:?Set PGDATABASE}"
: "${PGUSER:?Set PGUSER}"
for cmd in pg_dump age sha256sum date; do command -v "$cmd" >/dev/null || { echo "Missing $cmd" >&2; exit 127; }; done
mkdir -p -- "$BACKUP_DIR"; chmod 700 "$BACKUP_DIR"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"; base="${PGDATABASE}-${stamp}"
tmp="$(mktemp -d "${TMPDIR:-/tmp}/platform-backup.XXXXXX")"; trap 'rm -rf -- "$tmp"' EXIT
pg_dump --format=custom --no-owner --no-acl --file="$tmp/${base}.dump"
test -s "$tmp/${base}.dump"
age --encrypt --recipient "$AGE_RECIPIENT" --output "$BACKUP_DIR/${base}.dump.age" "$tmp/${base}.dump"
(cd "$BACKUP_DIR" && sha256sum "${base}.dump.age" > "${base}.dump.age.sha256")
cat > "$BACKUP_DIR/${base}.manifest" <<EOF
format=platform-postgres-backup-v1
database=${PGDATABASE}
created_at_utc=${stamp}
artifact=${base}.dump.age
encryption=age
dump_format=postgres-custom
EOF
chmod 600 "$BACKUP_DIR/${base}.dump.age" "$BACKUP_DIR/${base}.dump.age.sha256" "$BACKUP_DIR/${base}.manifest"
echo "Backup created: $BACKUP_DIR/${base}.dump.age"
