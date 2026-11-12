#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

# Live Backblaze B2 pgBackRest integration. Synthetic disposable data only.
# Never run against production. This script intentionally does not run expire,
# delete, prune, or remove any remote B2 object.

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root; PostgreSQL commands are executed as the postgres OS user." >&2
  exit 1
fi

: "${B2_PGBR_KEY_ID:?Missing B2_PGBR_KEY_ID}"
: "${B2_PGBR_KEY:?Missing B2_PGBR_KEY}"
: "${PGBR_CIPHER_PASS:?Missing PGBR_CIPHER_PASS}"
: "${GITHUB_RUN_ID:?Missing GITHUB_RUN_ID}"
: "${GITHUB_RUN_ATTEMPT:?Missing GITHUB_RUN_ATTEMPT}"

command -v pgbackrest >/dev/null
command -v pg_createcluster >/dev/null
command -v pg_ctlcluster >/dev/null

readonly PG_VERSION=16
readonly PG_CLUSTER=main
readonly PG_DATA="/var/lib/postgresql/${PG_VERSION}/${PG_CLUSTER}"
readonly PG_CONF="/etc/postgresql/${PG_VERSION}/${PG_CLUSTER}/postgresql.conf"
readonly PGBR_CONF="/etc/pgbackrest/pgbackrest.conf"
readonly RECOVERY_DATA="/var/lib/postgresql/${PG_VERSION}/e13-b2-pitr-recovery"
readonly SOCKET_DIR="/var/run/postgresql-e13-b2-recovery"
readonly RECOVERY_PORT=55433
readonly LOG_DIR="/var/log/pgbackrest"
readonly SPOOL_DIR="/var/spool/pgbackrest"
readonly RUN_REPO_PATH="/pgbackrest/e13-live-test/${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}"
readonly PG_CTL="/usr/lib/postgresql/16/bin/pg_ctl"
TARGET_TIME=""

cleanup() {
  set +e
  if [[ -d "$RECOVERY_DATA" ]]; then
    runuser -u postgres -- "$PG_CTL" -D "$RECOVERY_DATA" -m immediate stop >/dev/null 2>&1
  fi
  pg_ctlcluster "$PG_VERSION" "$PG_CLUSTER" stop >/dev/null 2>&1
  rm -rf "$RECOVERY_DATA" "$SOCKET_DIR"
  # Deliberately no remote pgBackRest expire/prune/delete.
}
trap cleanup EXIT

# This runner and its PostgreSQL cluster are disposable.
if pg_lsclusters --no-header | awk -v v="$PG_VERSION" -v c="$PG_CLUSTER" '$1==v && $2==c {found=1} END {exit !found}'; then
  pg_dropcluster --stop "$PG_VERSION" "$PG_CLUSTER"
fi
pg_createcluster "$PG_VERSION" "$PG_CLUSTER" --start

install -d -o root -g postgres -m 0750 /etc/pgbackrest
install -d -o postgres -g postgres -m 0750 "$LOG_DIR" "$SPOOL_DIR"
install -d -o postgres -g postgres -m 0700 "$SOCKET_DIR"

# Secret values are written only to a runner-local 0640 config readable by
# postgres, never echoed, uploaded, or committed. The runner is ephemeral.
cat > "$PGBR_CONF" <<EOF
[global]
repo1-type=s3
repo1-path=$RUN_REPO_PATH
repo1-s3-bucket=kharchasaathi-e13-backup-primary
repo1-s3-region=eu-central-003
repo1-s3-endpoint=s3.eu-central-003.backblazeb2.com
repo1-s3-uri-style=host
repo1-s3-key-type=shared
repo1-s3-key=$B2_PGBR_KEY_ID
repo1-s3-key-secret=$B2_PGBR_KEY
repo1-cipher-type=aes-256-cbc
repo1-cipher-pass=$PGBR_CIPHER_PASS
start-fast=y
archive-async=y
spool-path=$SPOOL_DIR
log-path=$LOG_DIR
log-level-console=info
log-level-file=detail
process-max=2

[platform]
pg1-path=$PG_DATA
pg1-port=5432
pg1-user=postgres
EOF
chown root:postgres "$PGBR_CONF"
chmod 0640 "$PGBR_CONF"
unset B2_PGBR_KEY_ID B2_PGBR_KEY PGBR_CIPHER_PASS

# Stanza bootstrap uses only the run-scoped B2 prefix above.
# No repository retention is configured: pgBackRest backup must not auto-expire
# prior objects, even within this disposable run prefix.
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform stanza-create

cat >> "$PG_CONF" <<EOF

# E13 disposable B2 integration test settings; never apply to production.
archive_mode = on
archive_command = 'pgbackrest --config=$PGBR_CONF --stanza=platform archive-push %p'
archive_timeout = '10s'
wal_level = replica
EOF
pg_ctlcluster "$PG_VERSION" "$PG_CLUSTER" restart

psql_as_postgres() {
  runuser -u postgres -- psql -X -v ON_ERROR_STOP=1 -h /var/run/postgresql -p 5432 -d postgres "$@"
}

psql_as_postgres -c "CREATE TABLE e13_b2_pitr_probe (event text PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT clock_timestamp());"
psql_as_postgres -c "INSERT INTO e13_b2_pitr_probe(event) VALUES ('present-at-base-backup');"

# Validate WAL archiving to B2, then create a physical full backup.
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform check
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform --type=full backup
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform info

# Choose a recovery boundary after the backup, then commit a later transaction.
sleep 2
TARGET_TIME="$(date -u '+%Y-%m-%d %H:%M:%S+00')"
sleep 3
psql_as_postgres -c "INSERT INTO e13_b2_pitr_probe(event) VALUES ('after-pitr-target');"
psql_as_postgres -c "SELECT pg_switch_wal();"
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform check

# Restore from B2 to a separate, empty local recovery directory.
pg_ctlcluster "$PG_VERSION" "$PG_CLUSTER" stop
install -d -o postgres -g postgres -m 0700 "$RECOVERY_DATA"
runuser -u postgres -- pgbackrest --config="$PGBR_CONF" --stanza=platform \
  --pg1-path="$RECOVERY_DATA" --type=time --target="$TARGET_TIME" \
  --target-action=promote restore

# Start recovered PostgreSQL on a separate socket and port.
if ! runuser -u postgres -- "$PG_CTL" -D "$RECOVERY_DATA" \
  -o "-c config_file=$PG_CONF -c data_directory=$RECOVERY_DATA -p $RECOVERY_PORT -k $SOCKET_DIR -c archive_mode=off -c listen_addresses=''" \
  -l "$RECOVERY_DATA/e13-recovery.log" start; then
  cat "$RECOVERY_DATA/e13-recovery.log" >&2 || true
  exit 1
fi

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

before_count="$(runuser -u postgres -- psql -X -At -v ON_ERROR_STOP=1 -h "$SOCKET_DIR" -p "$RECOVERY_PORT" -d postgres -c "SELECT count(*) FROM e13_b2_pitr_probe WHERE event='present-at-base-backup';")"
after_count="$(runuser -u postgres -- psql -X -At -v ON_ERROR_STOP=1 -h "$SOCKET_DIR" -p "$RECOVERY_PORT" -d postgres -c "SELECT count(*) FROM e13_b2_pitr_probe WHERE event='after-pitr-target';")"
[[ "$before_count" == "1" ]] || { echo "Base-backup row missing after B2 PITR" >&2; exit 1; }
[[ "$after_count" == "0" ]] || { echo "Post-target transaction unexpectedly present after B2 PITR" >&2; exit 1; }

runuser -u postgres -- "$PG_CTL" -D "$RECOVERY_DATA" -m fast stop
echo "PASS: live B2 pgBackRest stanza, full physical backup, WAL archive, B2 restore and timestamp PITR."
echo "REMOTE PREFIX: $RUN_REPO_PATH/"
echo "LIMITATION: synthetic disposable database only; no production data, retention/prune/delete, Object Lock, replication, alerting, escrow or approved RPO/RTO tested."
