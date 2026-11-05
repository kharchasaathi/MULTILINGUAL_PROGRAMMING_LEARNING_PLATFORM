#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

: "${BACKUP_DIR:?Set BACKUP_DIR}"
: "${AGE_RECIPIENT:?Set AGE_RECIPIENT}"
: "${PGHOST:?Set PGHOST}"
: "${PGDATABASE:?Set PGDATABASE}"
: "${PGUSER:?Set PGUSER}"

for cmd in pg_dump age sha256sum date mktemp; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "Missing required command: $cmd" >&2; exit 127; }
done

mkdir -p -- "$BACKUP_DIR"
chmod 700 -- "$BACKUP_DIR"
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
base="${PGDATABASE}-${stamp}"
stage="$(mktemp -d "$BACKUP_DIR/.${base}.stage.XXXXXX")"
chmod 700 "$stage"
cleanup() { rm -rf -- "$stage"; }
trap cleanup EXIT INT TERM

dump="$stage/${base}.dump"
artifact_name="${base}.dump.age"
artifact="$stage/$artifact_name"
manifest="$stage/${base}.manifest"
checksum="$stage/${artifact_name}.sha256"

pg_dump --format=custom --no-owner --no-acl --file="$dump"
[[ -s "$dump" ]] || { echo "pg_dump produced an empty archive" >&2; exit 1; }

age --encrypt --recipient "$AGE_RECIPIENT" --output "$artifact" "$dump"
[[ -s "$artifact" ]] || { echo "age produced an empty encrypted artifact" >&2; exit 1; }
(
  cd "$stage"
  sha256sum "$artifact_name" > "${artifact_name}.sha256"
)

cat > "$manifest" <<EOF
format=platform-postgres-backup-v1
database=$PGDATABASE
created_at_utc=$stamp
artifact=$artifact_name
encryption=age
dump_format=postgres-custom
EOF

chmod 600 "$artifact" "$checksum" "$manifest"
# Publish only complete files. The checksum and manifest are published last.
mv -- "$artifact" "$BACKUP_DIR/$artifact_name"
mv -- "$checksum" "$BACKUP_DIR/${artifact_name}.sha256"
mv -- "$manifest" "$BACKUP_DIR/${base}.manifest"
echo "Backup created: $BACKUP_DIR/$artifact_name"
