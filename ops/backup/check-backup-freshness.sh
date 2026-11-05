#!/usr/bin/env bash
set -Eeuo pipefail
: "${PGBACKREST_HEALTH_DIR:=/var/lib/platform-backup-health}"
: "${BACKUP_MAX_AGE_HOURS:=30}"
marker="$PGBACKREST_HEALTH_DIR/last-successful-backup"
[[ "$BACKUP_MAX_AGE_HOURS" =~ ^[1-9][0-9]*$ ]] || { echo "BACKUP_MAX_AGE_HOURS must be a positive integer" >&2; exit 64; }
if [[ ! -s "$marker" ]]; then
  message="E13 backup freshness failure: no successful backup marker"
  echo "$message" >&2
  if [[ -n "${BACKUP_ALERT_COMMAND:-}" && -x "$BACKUP_ALERT_COMMAND" ]]; then "$BACKUP_ALERT_COMMAND" "$message"; fi
  exit 1
fi
stamp="$(cat "$marker")"
epoch="$(date -u -d "$stamp" +%s)" || { echo "Invalid backup marker timestamp" >&2; exit 1; }
now="$(date -u +%s)"
age=$((now - epoch))
limit=$((BACKUP_MAX_AGE_HOURS * 3600))
if (( age < 0 || age > limit )); then
  message="E13 backup is stale: age_seconds=$age threshold_seconds=$limit"
  echo "$message" >&2
  if [[ -n "${BACKUP_ALERT_COMMAND:-}" && -x "$BACKUP_ALERT_COMMAND" ]]; then "$BACKUP_ALERT_COMMAND" "$message"; fi
  exit 1
fi
echo "Backup freshness OK: age_seconds=$age"
