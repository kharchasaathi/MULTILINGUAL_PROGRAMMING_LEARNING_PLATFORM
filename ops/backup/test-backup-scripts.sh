#!/usr/bin/env bash
set -Eeuo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/bin" "$tmp/out"

cat > "$tmp/bin/pg_dump" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
for arg in "$@"; do
  case "$arg" in --file=*) printf 'mock postgres dump\n' > "${arg#--file=}" ;; esac
done
MOCK

cat > "$tmp/bin/age" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
out=''
source=''
decrypt=0
while (($#)); do
  case "$1" in
    --output) out="$2"; shift 2 ;;
    --encrypt) shift ;;
    --decrypt) decrypt=1; shift ;;
    --recipient|--identity) shift 2 ;;
    *) source="$1"; shift ;;
  esac
done
[[ -n "$out" && -n "$source" ]]
if [[ "${MOCK_AGE_FAIL:-0}" == 1 && "$decrypt" == 1 ]]; then
  exit 9
fi
cp -- "$source" "$out"
MOCK

cat > "$tmp/bin/pg_restore" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
if [[ " $* " == *" --list "* ]]; then exit 0; fi
exit 0
MOCK

cat > "$tmp/bin/psql" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
printf '0\\n'
MOCK

chmod +x "$tmp/bin/"*
export PATH="$tmp/bin:$PATH"
export BACKUP_DIR="$tmp/out" AGE_RECIPIENT=age1test
export PGHOST=localhost PGDATABASE=testdb PGUSER=test

bash "$root/ops/backup/backup-postgres.sh"
artifact="$(find "$tmp/out" -type f -name '*.dump.age' -print -quit)"
[[ -n "$artifact" ]]
bash "$root/ops/backup/verify-backup.sh" "$artifact"

# A byte-level change must be rejected by the checksum verifier.
cp "$artifact" "$tmp/tampered.dump.age"
cp "${artifact}.sha256" "$tmp/tampered.dump.age.sha256"
cp "${artifact%.dump.age}.manifest" "$tmp/tampered.manifest"
printf 'tamper' >> "$tmp/tampered.dump.age"
if bash "$root/ops/backup/verify-backup.sh" "$tmp/tampered.dump.age"; then
  echo "Tampered artifact was incorrectly accepted" >&2
  exit 1
fi

export AGE_IDENTITY_FILE="$tmp/identity"
: > "$AGE_IDENTITY_FILE"
if RESTORE_CONFIRM=NO RESTORE_TARGET_ISOLATED=YES bash "$root/ops/backup/restore-postgres.sh" "$artifact"; then
  echo "Restore confirmation guard did not block" >&2
  exit 1
fi
if RESTORE_CONFIRM=YES RESTORE_TARGET_ISOLATED=NO bash "$root/ops/backup/restore-postgres.sh" "$artifact"; then
  echo "Isolation attestation guard did not block" >&2
  exit 1
fi
export RESTORE_CONFIRM=YES RESTORE_TARGET_ISOLATED=YES

# System databases must never be accepted as restore targets.
for target in postgres template0 template1; do
  if PGDATABASE="$target" bash "$root/ops/backup/restore-postgres.sh" "$artifact"; then
    echo "System database target was incorrectly accepted: $target" >&2
    exit 1
  fi
done

# Missing identity and failed decryption must stop before pg_restore.
if AGE_IDENTITY_FILE="$tmp/missing-identity" bash "$root/ops/backup/restore-postgres.sh" "$artifact"; then
  echo "Missing age identity was incorrectly accepted" >&2
  exit 1
fi
if MOCK_AGE_FAIL=1 bash "$root/ops/backup/restore-postgres.sh" "$artifact"; then
  echo "Failed age decryption was incorrectly accepted" >&2
  exit 1
fi

bash "$root/ops/backup/restore-postgres.sh" "$artifact"
echo "Mock backup utility tests passed, including system-database, missing-identity and decryption-failure guards."
