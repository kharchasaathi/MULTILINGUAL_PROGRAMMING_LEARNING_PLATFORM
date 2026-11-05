#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/bin" "$tmp/backups"
cat > "$tmp/bin/aws" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
printf '%s\n' "$*" >> "$AWS_MOCK_LOG"
case "$1 $2" in
  "s3api get-bucket-versioning") echo Enabled ;;
  "s3api get-object-lock-configuration") echo '{"ObjectLockEnabled":"Enabled"}' ;;
  "s3api get-public-access-block") echo '{"PublicAccessBlockConfiguration":{"BlockPublicAcls":true,"IgnorePublicAcls":true,"BlockPublicPolicy":true,"RestrictPublicBuckets":true}}' ;;
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
export PATH="$tmp/bin:$PATH" AWS_MOCK_LOG="$tmp/aws.log"
export AWS_S3_BUCKET="e13-test-bucket" AWS_S3_PREFIX="postgres"
export AWS_S3_REGION="ap-south-1" AWS_S3_KMS_KEY_ID="alias/e13-backup"
export AWS_S3_OBJECT_LOCK_DAYS=30 AWS_S3_OBJECT_LOCK_MODE=GOVERNANCE
bash "$ROOT/publish-s3-backup.sh" "$tmp/backups/demo-20261105T120000Z.dump.age"
[[ "$(grep -c 's3api put-object' "$tmp/aws.log")" -eq 3 ]]
grep -q -- '--server-side-encryption aws:kms' "$tmp/aws.log"
grep -q -- '--checksum-algorithm SHA256' "$tmp/aws.log"
grep -q -- '--object-lock-mode GOVERNANCE' "$tmp/aws.log"
echo "S3 publisher mocked contract tests passed."
