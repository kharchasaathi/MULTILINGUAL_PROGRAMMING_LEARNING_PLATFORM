#!/usr/bin/env bash
set -Eeuo pipefail
[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }

file="$1"
[[ -f "$file" && -s "$file" ]] || { echo "Backup missing or empty" >&2; exit 1; }
sum="${file}.sha256"
manifest="${file%.dump.age}.manifest"
[[ -f "$sum" && -s "$sum" && -f "$manifest" && -s "$manifest" ]] || {
  echo "Checksum or manifest missing" >&2; exit 1;
}
command -v sha256sum >/dev/null 2>&1 || { echo "Missing sha256sum" >&2; exit 127; }

# Reject malformed or mismatched metadata before accepting the artifact.
grep -qx 'format=platform-postgres-backup-v1' "$manifest"
grep -qx "artifact=$(basename -- "$file")" "$manifest"
grep -Eq '^database=[A-Za-z0-9_.-]+$' "$manifest"
grep -Eq '^created_at_utc=[0-9]{8}T[0-9]{6}Z$' "$manifest"
grep -qx 'encryption=age' "$manifest"
grep -qx 'dump_format=postgres-custom' "$manifest"
(
  cd "$(dirname -- "$file")"
  sha256sum --check "$(basename -- "$sum")"
)
echo "Checksum and manifest verified. Decryption and recovery require a restore test."
