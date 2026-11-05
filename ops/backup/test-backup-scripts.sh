#!/usr/bin/env bash
set -Eeuo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"; tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/bin" "$tmp/out"
cat > "$tmp/bin/pg_dump" <<'MOCK'
#!/usr/bin/env bash
out="$(echo "$arg" | sed 's/^--file=//')"; printf 'mock dump\n' > "$out"
MOCK
cat > "$tmp/bin/age" <<'MOCK'
#!/usr/bin/env bash
out=''; source=''
while (($#)); do case "$1" in --output) out="$2"; shift 2;; --encrypt|--decrypt|--recipient|--identity) shift 2;; *) source="$1"; shift;; esac; done
cp "$source" "$out"
MOCK
cat > "$tmp/bin/pg_restore" <<'MOCK'
#!/usr/bin/env bash
[[ " $* " == *" --list "* ]] && exit 0
exit 0
MOCK
chmod +x "$tmp/bin/"*
export PATH="$tmp/bin:$PATH" BACKUP_DIR="$tmp/out" AGE_RECIPIENT=age1test PGHOST=localhost PGDATABASE=testdb PGUSER=test
"$root/ops/backup/backup-postgres.sh"
artifact="$(find "$tmp/out" -name '*.dump.age' -print -quit)"
"$root/ops/backup/verify-backup.sh" "$artifact"
export AGE_IDENTITY_FILE="$tmp/identity"; touch "$AGE_IDENTITY_FILE"
if RESTORE_CONFIRM=NO "$root/ops/backup/restore-postgres.sh" "$artifact"; then echo "Expected confirmation guard failure" >&2; exit 1; fi
export RESTORE_CONFIRM=YES
"$root/ops/backup/restore-postgres.sh" "$artifact"
echo "Mock backup utility tests passed."
