#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/bin" "$tmp/remote"
cat > "$tmp/bin/aws" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
[[ "$1 $2" == "s3api get-object" ]] || { echo "Unexpected AWS CLI operation: $*" >&2; exit 90; }
key=""
version=""
while (($#)); do
  case "$1" in
    --key) key="$2"; shift 2 ;;
    --version-id) version="$2"; shift 2 ;;
    --endpoint-url) shift 2 ;;
    --bucket) shift 2 ;;
    --no-cli-pager) shift ;;
    *) destination="$1"; shift ;;
  esac
done
[[ "$version" == "v1" ]] || { echo "Wrong object version requested" >&2; exit 91; }
case "$key" in
  postgres/demo-20261105T120000Z.dump.age) src="$B2_TEST_REMOTE/artifact" ;;
  postgres/demo-20261105T120000Z.dump.age.sha256) src="$B2_TEST_REMOTE/checksum" ;;
  postgres/demo-20261105T120000Z.manifest) src="$B2_TEST_REMOTE/manifest" ;;
  *) echo "Unexpected key requested: $key" >&2; exit 92 ;;
esac
cp "$src" "$destination"
MOCK
chmod +x "$tmp/bin/aws"
export PATH="$tmp/bin:$PATH" B2_TEST_REMOTE="$tmp/remote"
export B2_BUCKET="kharchasaathi-e13-backup-primary"
export B2_ENDPOINT="https://s3.eu-central-003.backblazeb2.com"
export B2_REGION="eu-central-003"
export B2_APPLICATION_KEY_ID="mock-key-id" B2_APPLICATION_KEY="mock-secret"
file="$tmp/demo-20261105T120000Z.dump.age"
printf 'encrypted remote fixture\n' > "$file"
(cd "$tmp" && sha256sum "$(basename "$file")" > "$(basename "$file").sha256")
cat > "$tmp/demo-20261105T120000Z.manifest" <<'MANIFEST'
format=platform-postgres-backup-v1
database=demo
created_at_utc=20261105T120000Z
artifact=demo-20261105T120000Z.dump.age
encryption=age
dump_format=postgres-custom
MANIFEST
cp "$file" "$tmp/remote/artifact"
cp "$file.sha256" "$tmp/remote/checksum"
cp "$tmp/demo-20261105T120000Z.manifest" "$tmp/remote/manifest"
cat > "$file.b2-versions" <<'VERSIONS'
postgres/demo-20261105T120000Z.dump.age	v1
postgres/demo-20261105T120000Z.dump.age.sha256	v1
postgres/demo-20261105T120000Z.manifest	v1
VERSIONS
bash "$ROOT/verify-b2-backup.sh" "$file"
printf 'tampered remote content\n' > "$tmp/remote/artifact"
if bash "$ROOT/verify-b2-backup.sh" "$file" >/dev/null 2>&1; then
  echo "Expected remote tamper detection" >&2; exit 1
fi
echo "B2 remote verification and tamper tests passed."
