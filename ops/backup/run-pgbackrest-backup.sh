#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
: "${PGBACKREST_STANZA:=platform}"
: "${PGBACKREST_BACKUP_TYPE:=diff}"
: "${PGBACKREST_HEALTH_DIR:=/var/lib/platform-backup-health}"
command -v pgbackrest >/dev/null 2>&1 || { echo "pgbackrest is required" >&2; exit 127; }
case "$PGBACKREST_BACKUP_TYPE" in full|diff|incr) ;; *) echo "Invalid backup type" >&2; exit 64 ;; esac
mkdir -p "$PGBACKREST_HEALTH_DIR"
chmod 700 "$PGBACKREST_HEALTH_DIR"
exec 9>"$PGBACKREST_HEALTH_DIR/backup.lock"
flock -n 9 || { echo "Another backup is already running" >&2; exit 75; }
started="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
pgbackrest --stanza="$PGBACKREST_STANZA" --type="$PGBACKREST_BACKUP_TYPE" backup
pgbackrest --stanza="$PGBACKREST_STANZA" check
printf '%s\n' "$started" > "$PGBACKREST_HEALTH_DIR/last-successful-backup.tmp"
mv "$PGBACKREST_HEALTH_DIR/last-successful-backup.tmp" "$PGBACKREST_HEALTH_DIR/last-successful-backup"
printf 'Backup and archive check completed at %s\n' "$started"
