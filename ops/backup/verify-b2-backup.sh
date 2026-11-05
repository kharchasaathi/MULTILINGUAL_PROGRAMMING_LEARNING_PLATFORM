#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

: "${B2_BUCKET:?Set B2_BUCKET}"
: "${B2_ENDPOINT:?Set B2_ENDPOINT}"
: "${B2_REGION:?Set B2_REGION}"
: "${B2_APPLICATION_KEY_ID:?Set B2_APPLICATION_KEY_ID}"
: "${B2_APPLICATION_KEY:?Set B2_APPLICATION_KEY}"
: "${B2_PREFIX:=postgres}"

[[ $# -eq 1 ]] || { echo "Usage: $0 BACKUP_FILE.dump.age" >&2; exit 64; }
[[ "$B2_ENDPOINT" == https://*.backblazeb2.com ]] || { echo "Refusing non-Backblaze HTTPS endpoint" >&2; exit 1; }
file="$1"
[[ -s "$file" && -s "${file}.sha256" && -s "${file%.dump.age}.manifest" ]] || { echo "Local backup/checksum/manifest missing" >&2; exit 1; }
versions="${B2_VERSION_LOG:-${file}.b2-versions}"
[[ -s "$versions" ]] || { echo "B2 version evidence file missing: $versions" >&2; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "Missing AWS CLI v2" >&2; exit 127; }

export AWS_ACCESS_KEY_ID="$B2_APPLICATION_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$B2_APPLICATION_KEY"
export AWS_DEFAULT_REGION="$B2_REGION"
unset AWS_SESSION_TOKEN || true

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
base="$(basename -- "$file")"
prefix="${B2_PREFIX#/}"
prefix="${prefix%/}"
expected_key="${prefix:+$prefix/}$base"
expected_manifest="${expected_key%.dump.age}.manifest"

# Require exactly the three objects produced by the publisher and exact version IDs.
artifact_version=""
checksum_version=""
manifest_version=""
while IFS=$'\t' read -r key version; do
  [[ -n "$key" && -n "$version" ]] || { echo "Malformed version evidence row" >&2; exit 1; }
  case "$key" in
    "$expected_key") artifact_version="$version" ;;
    "$expected_key.sha256") checksum_version="$version" ;;
    "$expected_manifest") manifest_version="$version" ;;
    *) echo "Unexpected object key in version evidence: $key" >&2; exit 1 ;;
  esac
done < "$versions"
[[ -n "$artifact_version" && -n "$checksum_version" && -n "$manifest_version" ]] || {
  echo "Version evidence must contain artifact, checksum and manifest versions" >&2; exit 1;
}

aws s3api get-object --bucket "$B2_BUCKET" --key "$expected_key" --version-id "$artifact_version" "$tmp/$base" --endpoint-url "$B2_ENDPOINT" --no-cli-pager >/dev/null
aws s3api get-object --bucket "$B2_BUCKET" --key "$expected_key.sha256" --version-id "$checksum_version" "$tmp/backup.sha256" --endpoint-url "$B2_ENDPOINT" --no-cli-pager >/dev/null
aws s3api get-object --bucket "$B2_BUCKET" --key "$expected_manifest" --version-id "$manifest_version" "$tmp/backup.manifest" --endpoint-url "$B2_ENDPOINT" --no-cli-pager >/dev/null

cmp -- "$file.sha256" "$tmp/backup.sha256"
cmp -- "${file%.dump.age}.manifest" "$tmp/backup.manifest"
expected_sum="$(awk 'NR==1 {print $1}' "$tmp/backup.sha256")"
actual_sum="$(sha256sum "$tmp/$base" | awk '{print $1}')"
[[ "$expected_sum" == "$actual_sum" ]] || { echo "Remote artifact SHA-256 mismatch" >&2; exit 1; }

echo "B2 remote download and SHA-256 verification passed."
echo "Bucket=$B2_BUCKET ArtifactVersion=$artifact_version ChecksumVersion=$checksum_version ManifestVersion=$manifest_version"
