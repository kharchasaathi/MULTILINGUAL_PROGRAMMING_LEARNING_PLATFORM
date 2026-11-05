#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

# Publishes an already age-encrypted E13 logical backup to a private
# Backblaze B2 bucket through its S3-compatible API. No bucket or key changes.
: "${B2_BUCKET:?Set B2_BUCKET}"
: "${B2_ENDPOINT:?Set B2_ENDPOINT (the exact bucket/account S3 endpoint)}"
: "${B2_REGION:?Set B2_REGION (for example eu-central-003)}"
: "${B2_APPLICATION_KEY_ID:?Set B2_APPLICATION_KEY_ID}"
: "${B2_APPLICATION_KEY:?Set B2_APPLICATION_KEY}"
: "${B2_OBJECT_LOCK_ENABLED:?Set B2_OBJECT_LOCK_ENABLED=true|false after checking bucket settings}"
: "${B2_PREFIX:=postgres}"
if [[ "$B2_OBJECT_LOCK_ENABLED" == true ]]; then
  : "${B2_OBJECT_LOCK_DAYS:?Set approved B2_OBJECT_LOCK_DAYS when Object Lock is enabled}"
  : "${B2_OBJECT_LOCK_MODE:?Set approved B2_OBJECT_LOCK_MODE=GOVERNANCE|COMPLIANCE}"
fi

[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }
[[ "$B2_ENDPOINT" == https://*.backblazeb2.com ]] || { echo "Refusing non-Backblaze HTTPS endpoint" >&2; exit 1; }
[[ "$B2_OBJECT_LOCK_ENABLED" == true || "$B2_OBJECT_LOCK_ENABLED" == false ]] || { echo "B2_OBJECT_LOCK_ENABLED must be true or false" >&2; exit 64; }
if [[ "$B2_OBJECT_LOCK_ENABLED" == true ]]; then
  [[ "$B2_OBJECT_LOCK_DAYS" =~ ^[1-9][0-9]*$ ]] || { echo "B2_OBJECT_LOCK_DAYS must be a positive integer" >&2; exit 64; }
  [[ "$B2_OBJECT_LOCK_DAYS" -le 3000 ]] || { echo "B2 retention cannot exceed 3000 days" >&2; exit 64; }
  [[ "$B2_OBJECT_LOCK_MODE" == GOVERNANCE || "$B2_OBJECT_LOCK_MODE" == COMPLIANCE ]] || { echo "B2_OBJECT_LOCK_MODE must be GOVERNANCE or COMPLIANCE" >&2; exit 64; }
fi
[[ -n "$B2_APPLICATION_KEY_ID" && -n "$B2_APPLICATION_KEY" ]] || { echo "B2 application credentials are required" >&2; exit 64; }

file="$1"
[[ -f "$file" && -s "$file" ]] || { echo "Backup artifact missing or empty" >&2; exit 1; }
sum="${file}.sha256"
manifest="${file%.dump.age}.manifest"
[[ -s "$sum" && -s "$manifest" ]] || { echo "Checksum or manifest missing" >&2; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "Missing AWS CLI v2" >&2; exit 127; }

# Validate local artifact before any network write.
bash "$(dirname -- "$0")/verify-backup.sh" "$file"

export AWS_ACCESS_KEY_ID="$B2_APPLICATION_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$B2_APPLICATION_KEY"
export AWS_DEFAULT_REGION="$B2_REGION"
unset AWS_SESSION_TOKEN || true

versioning="$(aws s3api get-bucket-versioning --bucket "$B2_BUCKET" --endpoint-url "$B2_ENDPOINT" --query Status --output text --no-cli-pager)"
[[ "$versioning" == Enabled ]] || { echo "B2 bucket versioning is not Enabled" >&2; exit 1; }

# B2 does not implement S3 Block Public Access. Confirm the bucket ACL is private.
public_grants="$(aws s3api get-bucket-acl --bucket "$B2_BUCKET" --endpoint-url "$B2_ENDPOINT" --query "Grants[?Grantee.URI=='http://acs.amazonaws.com/groups/global/AllUsers' || Grantee.URI=='http://acs.amazonaws.com/groups/global/AuthenticatedUsers']" --output json --no-cli-pager)"
[[ "$public_grants" == "[]" ]] || { echo "Bucket ACL is not private; refusing upload" >&2; exit 1; }

# B2 SSE-B2 is configured at bucket level. Verify the setting and do not pass
# AWS SSE-KMS headers (B2 does not support SSE-KMS).
encryption="$(aws s3api get-bucket-encryption --bucket "$B2_BUCKET" --endpoint-url "$B2_ENDPOINT" --output json --no-cli-pager)"
grep -Eq '"SSEAlgorithm"[[:space:]]*:[[:space:]]*"AES256"' <<<"$encryption" || {
  echo "Expected Backblaze-managed SSE-B2/AES256 default encryption" >&2; exit 1;
}

lock_args=()
if [[ "$B2_OBJECT_LOCK_ENABLED" == true ]]; then
  retain_until="$(date -u -d "+${B2_OBJECT_LOCK_DAYS} days" +%Y-%m-%dT%H:%M:%SZ)"
  lock_args=(--object-lock-mode "$B2_OBJECT_LOCK_MODE" --object-lock-retain-until-date "$retain_until")
  lock="$(aws s3api get-object-lock-configuration --bucket "$B2_BUCKET" --endpoint-url "$B2_ENDPOINT" --output json --no-cli-pager)"
  grep -q '"ObjectLockEnabled"[[:space:]]*:[[:space:]]*"Enabled"' <<<"$lock" || {
    echo "B2_OBJECT_LOCK_ENABLED=true but Object Lock is not enabled" >&2; exit 1;
  }
fi

base="$(basename -- "$file")"
prefix="${B2_PREFIX#/}"
prefix="${prefix%/}"
key="${prefix:+$prefix/}$base"

put_file() {
  local source="$1" object_key="$2" content_type="$3"
  local version_id
  version_id="$(aws s3api put-object --bucket "$B2_BUCKET" --key "$object_key" --body "$source" \
    --endpoint-url "$B2_ENDPOINT" --content-type "$content_type" \
    "${lock_args[@]}" --query VersionId --output text --no-cli-pager)"
  [[ -n "$version_id" && "$version_id" != None ]] || { echo "B2 did not return a VersionId for $object_key" >&2; exit 1; }
  printf 'Uploaded key=%s version_id=%s\n' "$object_key" "$version_id"
}

# Data first; checksum and manifest last. SHA-256 sidecar is the integrity
# authority; do not treat ETag as a content hash for multipart uploads.
put_file "$file" "$key" "application/octet-stream"
put_file "$sum" "$key.sha256" "text/plain"
manifest_key="${key%.dump.age}.manifest"
put_file "$manifest" "$manifest_key" "text/plain"

echo "Encrypted backup and integrity metadata published to B2 bucket $B2_BUCKET"
echo "Endpoint=$B2_ENDPOINT Region=$B2_REGION ObjectLockEnabled=$B2_OBJECT_LOCK_ENABLED"
echo "Record all returned VersionIds and independently download/verify each remote object."
