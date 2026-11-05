#!/usr/bin/env bash
set -Eeuo pipefail
[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }
file="$1"; [[ -f "$file" && -s "$file" ]] || { echo "Backup missing or empty" >&2; exit 1; }
sum="\${file}.sha256"; manifest="\${file%.dump.age}.manifest"
[[ -f "$sum" && -f "$manifest" ]] || { echo "Checksum or manifest missing" >&2; exit 1; }
(cd "$(dirname "$file")" && sha256sum --check "$(basename "$sum")")
grep -qx 'format=platform-postgres-backup-v1' "$manifest"
grep -qx "artifact=$(basename "$file")" "$manifest"
echo "Checksum and manifest verified; decryption/restore not tested."
