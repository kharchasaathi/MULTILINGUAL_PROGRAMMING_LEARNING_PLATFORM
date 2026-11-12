#!/usr/bin/env bash
set -Eeuo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
config="${1:-$root/ops/backup/pgbackrest.conf.example}"
[[ -r "$config" ]] || { echo "pgBackRest example config is not readable" >&2; exit 1; }
command -v pgbackrest >/dev/null 2>&1 || { echo "pgbackrest is required for config validation" >&2; exit 127; }

# This is an offline parser/option validation only. The placeholders are
# deliberately not credentials and no provider/database connection is made.
for required in \
  'repo1-type=s3' \
  'repo1-s3-region=eu-central-003' \
  'repo1-s3-endpoint=s3.eu-central-003.backblazeb2.com' \
  'repo1-s3-uri-style=host' \
  'repo1-path=/pgbackrest' \
  'repo1-cipher-type=aes-256-cbc' \
  'archive-async=y' \
  '[platform]' \
  'pg1-path=/var/lib/postgresql/16/main'; do
  grep -Fqx -- "$required" "$config" || {
    echo "Missing or changed required pgBackRest setting: $required" >&2
    exit 1
  }
done

if grep -Eq '(__PLACEHOLDER__|__PG_BACKREST_B2_APPLICATION_KEY_ID__|__PG_BACKREST_B2_APPLICATION_KEY_SECRET__|__INJECT_FROM_SECRET_MANAGER__)' "$config"; then
  echo "Expected non-secret deployment placeholders are present."
else
  echo "Example config unexpectedly lacks documented deployment placeholders" >&2
  exit 1
fi

# The version command forces pgBackRest to load and parse the supplied configuration while
# avoiding stanza creation, database access, bucket access or data transfer.
pgbackrest --config="$config" --stanza=platform version >/dev/null
echo "pgBackRest example configuration parsed successfully (offline; no cloud/database access)."
