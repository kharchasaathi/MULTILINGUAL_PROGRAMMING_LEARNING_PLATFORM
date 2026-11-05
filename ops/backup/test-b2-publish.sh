#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/bin" "$tmp/backups"
cat > "$tmp/bin/aws" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
printf '%s\n' "$*" >> "$B2_MOCK_LOG"
case "$1 $2" in
  "s3api get-bucket-versioning") echo Enabled ;;
  "s3api get-bucket-acl") echo '[]' ;;
  "s3api get-bucket-encryption") echo '{"ServerSideEncryptionConfiguration":{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}}' ;;
  "s3api get-object-lock-configuration") echo '{"ObjectLockConfiguration":{"ObjectLockEnabled":"Enabled"}}' ;;
  "s3api put-object") echo mock-version ;;
  *) echo "Unexpected AWS CLI command: $*" >&2; exit 90 ;;
esac
MOCK
chmod +x "$tmp/bin/aws"
cat > "$tmp/backups/demo-20261105T120000Z.manifest" <<'MANIFEST'
format=platform-postgres-backup-v1
database=demo
created_at_utc=20261105T120000Z
artifact=demo-20261105T120000Z.dump.age
encryption=age
dump_format=postgres-custom
MANIFEST
printf 'encrypted-test-artifact\n' > "$tmp/backups/demo-20261105T120000Z.dump.age"
(cd "$tmp/backups" && sha256sum demo-20261105T120000Z.dump.age > demo-20261105T120000Z.dump.age.sha256)
export PATH="$tmp/bin:$PATH" B2_MOCK_LOG="$tmp/b2.log"
export B2_BUCKET="kharchasaathi-e13-backup-primary"
export B2_ENDPOINT="https://s3.eu-central-003.backblazeb2.com"
export B2_REGION="eu-central-003"
export B2_APPLICATION_KEY_ID="mock-key-id" B2_APPLICATION_KEY="mock-secret"
export B2_OBJECT_LOCK_ENABLED=false B2_PREFIX="postgres"
bash "$ROOT/publish-b2-backup.sh" "$tmp/backups/demo-20261105T120000Z.dump.age"
[[ "$(grep -c 's3api put-object' "$tmp/b2.log")" -eq 3 ]]
grep -q 's3api get-bucket-versioning' "$tmp/b2.log"
grep -q 's3api get-bucket-acl' "$tmp/b2.log"
grep -q 's3api get-bucket-encryption' "$tmp/b2.log"
! grep -q -- '--server-side-encryption aws:kms' "$tmp/b2.log"
echo "B2 publisher mocked contract tests passed."

# Fail closed for a public bucket.
sed -i 's/echo '\''\[\]'\''/echo '\''[{"Grantee":{"URI":"http:\/\/acs.amazonaws.com\/groups\/global\/AllUsers"}}]'\''/' "$tmp/bin/aws"
if bash "$ROOT/publish-b2-backup.sh" "$tmp/backups/demo-20261105T120000Z.dump.age" >/dev/null 2>&1; then
  echo "Expected public bucket rejection" >&2; exit 1
fi
echo "B2 public-bucket guard test passed."
