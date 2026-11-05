#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

# Publishes an already encrypted E13 PostgreSQL artifact to a pre-provisioned,
# versioned, Object-Lock-enabled S3 bucket. It never creates or changes a bucket.
: "${AWS_S3_BUCKET:?Set AWS_S3_BUCKET}"
: "${AWS_S3_PREFIX:=postgres}"
: "${AWS_S3_REGION:=ap-south-1}"
: "${AWS_S3_KMS_KEY_ID:?Set AWS_S3_KMS_KEY_ID (customer-managed KMS key)}"
: "${AWS_S3_OBJECT_LOCK_DAYS:?Set approved AWS_S3_OBJECT_LOCK_DAYS}"
: "${AWS_S3_OBJECT_LOCK_MODE:=GOVERNANCE}"

[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }
[[ "$AWS_S3_REGION" == ap-south-1 ]] || { echo "Refusing unexpected region: $AWS_S3_REGION" >&2; exit 1; }
[[ "$AWS_S3_OBJECT_LOCK_DAYS" =~ ^[1-9][0-9]*$ ]] || { echo "Object Lock days must be a positive integer" >&2; exit 1; }
[[ "$AWS_S3_OBJECT_LOCK_MODE" == GOVERNANCE || "$AWS_S3_OBJECT_LOCK_MODE" == COMPLIANCE ]] || {
  echo "Object Lock mode must be GOVERNANCE or COMPLIANCE" >&2; exit 1;
}
file="$1"
[[ -f "$file" && -s "$file" ]] || { echo "Backup artifact missing or empty" >&2; exit 1; }
sum="${file}.sha256"
manifest="${file%.dump.age}.manifest"
[[ -s "$sum" && -s "$manifest" ]] || { echo "Checksum or manifest missing" >&2; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "Missing AWS CLI" >&2; exit 127; }
command -v date >/dev/null 2>&1 || { echo "Missing date" >&2; exit 127; }

# Verify local artifact and manifest before any network write.
bash "$(dirname -- "$0")/verify-backup.sh" "$file"

versioning="$(aws s3api get-bucket-versioning --bucket "$AWS_S3_BUCKET" --region "$AWS_S3_REGION" --query Status --output text)"
[[ "$versioning" == Enabled ]] || { echo "Bucket versioning is not Enabled" >&2; exit 1; }

lock="$(aws s3api get-object-lock-configuration --bucket "$AWS_S3_BUCKET" --region "$AWS_S3_REGION" --output json)"
grep -q '"ObjectLockEnabled"[[:space:]]*:[[:space:]]*"Enabled"' <<<"$lock" || {
  echo "S3 Object Lock is not enabled on bucket" >&2; exit 1;
}

public_block="$(aws s3api get-public-access-block --bucket "$AWS_S3_BUCKET" --region "$AWS_S3_REGION" --output json)"
for setting in BlockPublicAcls IgnorePublicAcls BlockPublicPolicy RestrictPublicBuckets; do
  grep -q "\"$setting\"[[:space:]]*:[[:space:]]*true" <<<"$public_block" || {
    echo "S3 public access block missing or disabled: $setting" >&2; exit 1;
  }
done

# Object Lock retention is attached to each object at upload. Retention days
# must be approved by the service owner; this script does not choose policy.
retain_until="$(date -u -d "+${AWS_S3_OBJECT_LOCK_DAYS} days" +%Y-%m-%dT%H:%M:%SZ)"
base="$(basename -- "$file")"
prefix="${AWS_S3_PREFIX#/}"
prefix="${prefix%/}"
key="${prefix:+$prefix/}$base"

put_file() {
  local source="$1" object_key="$2" content_type="$3"
  aws s3api put-object \
    --bucket "$AWS_S3_BUCKET" --key "$object_key" --body "$source" \
    --region "$AWS_S3_REGION" --server-side-encryption aws:kms \
    --ssekms-key-id "$AWS_S3_KMS_KEY_ID" --bucket-key-enabled \
    --object-lock-mode "$AWS_S3_OBJECT_LOCK_MODE" \
    --object-lock-retain-until-date "$retain_until" \
    --content-type "$content_type" --no-cli-pager >/dev/null
}

# Publish data first; publish integrity metadata last. S3 object versions are
# retained independently under the bucket's Object Lock configuration.
put_file "$file" "$key" "application/octet-stream"
put_file "$sum" "$key.sha256" "text/plain"
manifest_key="${key%.dump.age}.manifest"
put_file "$manifest" "$manifest_key" "text/plain"

echo "Encrypted backup and metadata published to s3://$AWS_S3_BUCKET/$key"
echo "Region=$AWS_S3_REGION ObjectLock=$AWS_S3_OBJECT_LOCK_MODE RetainUntil=$retain_until"
echo "Record returned S3 VersionIds and verify remote object checksums in the backup job audit log."
