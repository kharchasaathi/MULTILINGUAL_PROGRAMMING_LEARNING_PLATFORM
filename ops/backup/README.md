# PostgreSQL backup and recovery utilities (E13)

This repository contains a provider-neutral encrypted logical-backup utility and a repeatable integration test. It is not, by itself, a production disaster-recovery service.

## Dependencies and identity

- Bash 4+, PostgreSQL client tools compatible with the server major version, age/age-keygen, GNU sha256sum.
- Use a dedicated least-privilege database identity. Inject PGHOST, PGPORT, PGDATABASE, PGUSER and PGPASSWORD from a secret manager; never place credentials in files committed to Git.
- Supply AGE_RECIPIENT (public key) to the backup job. Keep AGE_IDENTITY_FILE (private identity) outside the backup store and recover it through separately controlled escrow.
- BACKUP_DIR must be a restricted, monitored, off-host or mounted backup location in production. The script creates it with mode 0700; confirm the underlying storage and mount semantics enforce the intended access controls.

## Create and verify a backup

```bash
export BACKUP_DIR=/secure-backups/postgres
export AGE_RECIPIENT=age1...
export PGHOST=db.internal PGPORT=5432 PGDATABASE=appdb PGUSER=backup_reader
bash ops/backup/backup-postgres.sh
bash ops/backup/verify-backup.sh /secure-backups/postgres/appdb-<UTC>.dump.age
```

The backup script stages plaintext and encrypted output in a private temporary directory under BACKUP_DIR, then publishes the completed artifact, checksum and manifest. A checksum detects artifact changes relative to the checksum file; it is not a digital signature or independent authenticity proof. Protect metadata separately from backup administrators.

## Restore safely

Restore requires both explicit operator confirmation and an isolation attestation. Provision a new, empty recovery database on an isolated host/network first. The script intentionally does not drop existing objects.

```bash
export AGE_IDENTITY_FILE=/run/secrets/backup-age-identity
export RESTORE_CONFIRM=YES
export RESTORE_TARGET_ISOLATED=YES
export PGHOST=recovery-db.internal PGPORT=5432 PGDATABASE=appdb_recovery PGUSER=recovery_operator
bash ops/backup/restore-postgres.sh /secure-backups/postgres/appdb-<UTC>.dump.age
```

The operator must independently verify target host, database identity, network isolation and approval before setting the attestation. After restore, validate migrations/schema, row counts, foreign keys, application smoke tests, E11 deletion tombstones/legal holds and E12 audit integrity before any cutover. The script does not perform those application-level checks.

## Tests

Mocked shell behavior and guard tests:
```bash
bash ops/backup/test-backup-scripts.sh
```

Real encryption + PostgreSQL logical backup/restore round trip (requires a disposable PostgreSQL instance and age):
```bash
bash ops/backup/test-backup-integration.sh
```

## Production gates not provided by this provider-neutral utility

- Continuous WAL archiving, physical base backups and tested point-in-time recovery (PITR).
- Cross-account/region immutable copies, retention locks, storage lifecycle and separate backup administration.
- Scheduled execution, freshness/coverage alerts, on-call ownership and restore-drill cadence.
- Object-store/event/outbox/inbox/audit snapshots coordinated with the database consistency point.
- Age identity escrow, key rotation/revocation drills and independent custody.
- E11 deletion-tombstone/legal-hold replay and E12 audit evidence integration.
- Approved numeric RPO/RTO, capacity planning, measured restore objectives, application smoke tests and cutover approval.

Do not claim production recovery readiness until these dependencies are selected, implemented, exercised and approved. Logical pg_dump is not PITR.
