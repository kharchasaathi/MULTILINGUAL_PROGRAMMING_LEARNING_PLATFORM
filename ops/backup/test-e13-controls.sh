#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
mkdir -p "$tmp/bin" "$tmp/health" "$tmp/hooks"
cat > "$tmp/bin/pgbackrest" <<'MOCK'
#!/usr/bin/env bash
set -Eeuo pipefail
printf '%s\n' "$*" >> "$PGBR_LOG"
if [[ "${MOCK_FAIL_BACKUP:-0}" == 1 && " $* " == *" backup "* ]]; then
  exit 42
fi
MOCK
chmod +x "$tmp/bin/pgbackrest"
export PATH="$tmp/bin:$PATH" PGBR_LOG="$tmp/pgbackrest.log"
export PGBACKREST_HEALTH_DIR="$tmp/health"
PGBACKREST_BACKUP_TYPE=full bash "$ROOT/run-pgbackrest-backup.sh"
grep -q -- '--type=full backup' "$PGBR_LOG"
[[ -s "$PGBACKREST_HEALTH_DIR/last-successful-backup" ]]
# A failed backup must not advance the last-successful marker.
printf '2026-01-01T00:00:00Z\n' > "$PGBACKREST_HEALTH_DIR/last-successful-backup"
if MOCK_FAIL_BACKUP=1 PGBACKREST_BACKUP_TYPE=diff bash "$ROOT/run-pgbackrest-backup.sh"; then
  echo "Failed backup unexpectedly passed" >&2; exit 1
fi
[[ "$(cat "$PGBACKREST_HEALTH_DIR/last-successful-backup")" == "2026-01-01T00:00:00Z" ]]
BACKUP_MAX_AGE_HOURS=30 bash "$ROOT/check-backup-freshness.sh" && {
  echo "Stale marker unexpectedly passed" >&2; exit 1;
} || [[ $? -eq 1 ]]
# A missing marker must fail closed.
rm "$PGBACKREST_HEALTH_DIR/last-successful-backup"
if BACKUP_MAX_AGE_HOURS=30 bash "$ROOT/check-backup-freshness.sh"; then
  echo "Missing freshness marker unexpectedly passed" >&2; exit 1
fi
# A stale marker must fail closed.
date -u -d '2 days ago' +%Y-%m-%dT%H:%M:%SZ > "$PGBACKREST_HEALTH_DIR/last-successful-backup"
if BACKUP_MAX_AGE_HOURS=30 bash "$ROOT/check-backup-freshness.sh"; then
  echo "Stale freshness marker unexpectedly passed" >&2; exit 1
fi
# Recovery cutover must be blocked until approvals and E11/E12 hooks exist.
if bash "$ROOT/post-restore-gates.sh"; then
  echo "Recovery gates unexpectedly passed without approvals" >&2; exit 1
fi
cat > "$tmp/hooks/e11" <<'HOOK'
#!/usr/bin/env bash
echo E11 >> "$HOOK_LOG"
HOOK
cat > "$tmp/hooks/e12" <<'HOOK'
#!/usr/bin/env bash
echo E12 >> "$HOOK_LOG"
HOOK
chmod +x "$tmp/hooks/e11" "$tmp/hooks/e12"
export HOOK_LOG="$tmp/hooks.log"
RESTORE_DUAL_APPROVAL=YES RESTORE_CROSS_SYSTEM_RECONCILIATION=YES \
RESTORE_APPLICATION_SMOKE_TEST=YES RESTORE_CODE_EXECUTION_DISABLED=YES \
E11_TOMBSTONE_REPLAY_EXECUTABLE="$tmp/hooks/e11" E12_AUDIT_VERIFY_EXECUTABLE="$tmp/hooks/e12" \
bash "$ROOT/post-restore-gates.sh"
grep -q '^E11$' "$HOOK_LOG"
grep -q '^E12$' "$HOOK_LOG"
echo "E13 PITR scheduling, freshness and fail-closed recovery gate tests passed."
