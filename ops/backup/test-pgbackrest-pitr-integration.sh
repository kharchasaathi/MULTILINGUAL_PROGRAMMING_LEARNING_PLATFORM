#!/usr/bin/env bash
set -Eeuo pipefail

# Disposable, local-filesystem pgBackRest integration test.
# This validates PostgreSQL 16 base backup + WAL archive + timestamp PITR.
# It does NOT contact Backblaze B2 or prove the production S3-compatible path.

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run this CI test as root; PostgreSQL commands are executed as the postgres OS user." >&2
  exit 1
fi

command -v pgbackrest >/dev/null 2>&1 || { echo "pgbackrest is required" >&2; exit 127; }
command -v pg_ctlcluster >/dev/null 2>&1 || { echo "PostgreSQL cluster tools are required" >&2; exit 127; }
command -v pg_createcluster >/dev/null 2>&1 || { echo "PostgreSQL cluster tools are required" >&2; exit 127; }

PG_VERSION=16
PG_CLUSTER=main
PG_DATA="/var/lib/postgresql/${PG_VERSION}/${PG_CLUSTER}"
PG_CONF="/etc/postgresql/${PG_VERSION}/${PG_CLUSTER}/postgresql.conf"
PGBR_CONF="/etc/pgbackrest/pgbackrest.conf"
REPO="/var/lib/pgbackrest/repo1"
RECOVERY_DATA="/var/lib/postgresql/${PG_VERSION}/e13-pitr-recovery"
SOCKET_DIR="/var/run/postgresql-e13-recovery"
RECOVERY_PORT=55432
LOG_DIR="/var/log/pgbackrest"
PG_CTL="/usr/lib/postgresql/16/bin/pg_ctl"
SPOOL_DIR="/var/spool/pgbackrest"
TARGET_TIME=""

cleanup() {
  set +e
  if [[ -d "$RECOVERY_DATA" ]]; then
    runuser -u postgres -- "$PG_CTL" -D "$RECOVERY_DATA" -m immediate stop >/dev/null 2>&1
  fi
  pg_ctlcluster "$PG_VERSION" "$PG_CLUSTER" stop >/dev/null 2>&1
  rm -rf "$RECOVERY_DATA" "$SOCKET_DIR" "$REPO"
}
trap cleanup EXIT

# Ensure a clean disposable cluster and repository for repeatable CI execution.
if pg_lsclusters --no-header | awk -v v="$PG_VERSION" -v c="$PG_CLUSTER" '$1==v && $2==c {found=1} END {exit !found}'; then
  pg_dropcluster --stop "$PG_VERSION" "$PG_CLUSTER"
fi
pg_createcluster "$PG_VERSION" "$PG_CLUSTER" --start

install -d -o root -g postgres -m 0750 "$(dirname "$PGBR_CONF")"
install -d -o postgres -g postgres -m 0750 "$REPO" "$LOG_DIR" "$SPOOL_DIR"
install -d -o postgres -g postgres -m 0750 "$SOCKET_DIR"
cat > "$PGBR_CONF" <<EOF
[global]
repo1-type=posix
repo1-path=$REPO
repo1-retention-full=2
start-fast=y
process-max=2
log-level-console=info
log-path=$LOG_DIR
spool-path=$SPOOL_DIR

[platform]
pg1-path=$PG_DATA
pg1-port=5432
pg1-user=postgres
EOF
chown root:postgres "$PGBR_CONF"
chmod 0640 "$PGBR_CONF"

# Create the stanza before enabling archive_command.
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform stanza-create

cat >> "$PG_CONF" <<EOF

# E13 disposable CI integration settings; never applied to a production cluster.
archive_mode = on
archive_command = 'pgbackrest --config=$PGBR_CONF --stanza=platform archive-push %p'
archive_timeout = '10s'
wal_level = replica
EOF
pg_ctlcluster "$PG_VERSION" "$PG_CLUSTER" restart

psql_as_postgres() {
  runuser -u postgres -- psql -X -v ON_ERROR_STOP=1 -h /var/run/postgresql -p 5432 -d postgres "$@"
}

psql_as_postgres -c "CREATE TABLE IF NOT EXISTS e13_pitr_probe (event text PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT clock_timestamp());"
psql_as_postgres -c "INSERT INTO e13_pitr_probe(event) VALUES ('present-at-base-backup') ON CONFLICT DO NOTHING;"

# Confirm that PostgreSQL can archive WAL through pgBackRest before the base backup.
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform check
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform --type=full backup

# Select a recovery target after the base backup, then create a later transaction.
TARGET_TIME="$(date -u '+%Y-%m-%d %H:%M:%S+00')"
sleep 3
psql_as_postgres -c "INSERT INTO e13_pitr_probe(event) VALUES ('after-pitr-target');"
psql_as_postgres -c "SELECT pg_switch_wal();"
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform check

# Stop the source cluster and restore to a distinct, empty data directory.
pg_ctlcluster "$PG_VERSION" "$PG_CLUSTER" stop
install -d -o postgres -g postgres -m 0700 "$RECOVERY_DATA"
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform \
  --pg1-path="$RECOVERY_DATA" --type=time --target="$TARGET_TIME" \
  --target-action=promote restore

# Start the recovered cluster on a separate port/socket; do not reconnect to production.
runuser -u postgres -- "$PG_CTL" -D "$RECOVERY_DATA" \
  -o "-p $RECOVERY_PORT -k $SOCKET_DIR -c archive_mode=off -c listen_addresses=''" \
  -l "$RECOVERY_DATA/e13-recovery.log" start

ready=0
for _ in $(seq 1 60); do
  if pg_isready -h "$SOCKET_DIR" -p "$RECOVERY_PORT" -U postgres >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 1
done
if [[ "$ready" -ne 1 ]]; then
  cat "$RECOVERY_DATA/e13-recovery.log" >&2 || true
  echo "Recovered PostgreSQL cluster did not become ready" >&2
  exit 1
fi

before_count="$(runuser -u postgres -- psql -X -At -v ON_ERROR_STOP=1 -h "$SOCKET_DIR" -p "$RECOVERY_PORT" -d postgres -c "SELECT count(*) FROM e13_pitr_probe WHERE event='present-at-base-backup';")"
after_count="$(runuser -u postgres -- psql -X -At -v ON_ERROR_STOP=1 -h "$SOCKET_DIR" -p "$RECOVERY_PORT" -d postgres -c "SELECT count(*) FROM e13_pitr_probe WHERE event='after-pitr-target';")"
[[ "$before_count" == "1" ]] || { echo "Base-backup row missing after PITR" >&2; exit 1; }
[[ "$after_count" == "0" ]] || { echo "Post-target transaction unexpectedly present after PITR" >&2; exit 1; }

runuser -u postgres -- "$PG_CTL" -D "$RECOVERY_DATA" -m fast stop
echo "PASS: PostgreSQL 16 local pgBackRest full backup, WAL archiving and timestamp PITR restored to the requested boundary."
echo "LIMITATION: local POSIX repository only; no B2 connectivity, production data, key custody, alert delivery or owner-approved RPO/RTO was tested."
