# PostgreSQL backup and recovery utilities (E13)

This repository contains an encrypted PostgreSQL logical-backup utility, a guarded AWS S3 publisher and repeatable tests. S3 is the selected off-site object-storage target. These scripts are not, by themselves, a production disaster-recovery service.

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

## Publish an encrypted backup to AWS S3\n\nThe S3 publisher uploads only an already encrypted `.dump.age` artifact and its checksum/manifest. It refuses to write unless the bucket is in `ap-south-1`, versioning is enabled, Object Lock is enabled, all four S3 Block Public Access settings are true, and a customer-managed KMS key plus an explicit retention period are supplied. It does not create or modify buckets, policies, KMS keys, replication or lifecycle rules.\n\nRequired environment (inject through a secret manager/approved deployment environment):\n\n```bash\nexport AWS_S3_BUCKET=approved-backup-bucket\nexport AWS_S3_REGION=ap-south-1\nexport AWS_S3_PREFIX=postgres\nexport AWS_S3_KMS_KEY_ID=arn:aws:kms:ap-south-1:ACCOUNT:key/KEY-ID\nexport AWS_S3_OBJECT_LOCK_DAYS=30 # proposed example only; owner approval required\nexport AWS_S3_OBJECT_LOCK_MODE=GOVERNANCE # do not use COMPLIANCE without legal/security approval\nbash ops/backup/publish-s3-backup.sh /secure-backups/postgres/appdb-<UTC>.dump.age\n```\n\nThe publisher checks local checksum/manifest before network writes and uploads the artifact first, then checksum and manifest. Object Lock retention is attached to each uploaded object. Capture S3 VersionIds and independently verify remote object checksums/retention in the operational audit record. The publisher does not implement cross-account replication, WAL/PITR, lifecycle policies, scheduled execution, alerting or key escrow. Never pass AWS credentials on the command line or commit them. Use an IAM role with narrowly scoped `GetBucketVersioning`, `GetObjectLockConfiguration`, `GetPublicAccessBlock`, and `PutObject` permissions plus only the required KMS data-key/encrypt permissions.\n\nMock contract test (does not contact AWS):\n```bash\nbash ops/backup/test-s3-publish.sh\n```\n\n## Production gates not provided by these utilities

- Continuous WAL archiving, physical base backups and tested point-in-time recovery (PITR).
- Cross-account/region replication, retention/lifecycle policy and separate backup administration. The S3 publisher only checks and applies per-object controls in an already provisioned bucket.
- Scheduled execution, freshness/coverage alerts, on-call ownership and restore-drill cadence.
- Object-store/event/outbox/inbox/audit snapshots coordinated with the database consistency point.
- Age identity escrow, key rotation/revocation drills and independent custody.
- E11 deletion-tombstone/legal-hold replay and E12 audit evidence integration.
- Approved numeric RPO/RTO, capacity planning, measured restore objectives, application smoke tests and cutover approval.

Do not claim production recovery readiness until these dependencies are selected, implemented, exercised and approved. Logical pg_dump is not PITR.


## PostgreSQL point-in-time recovery (PITR) with pgBackRest

For physical base backups and continuous WAL archiving to the selected S3 repository, use the pgBackRest configuration templates:
- `ops/backup/pgbackrest.conf.example`
- `ops/backup/postgresql-archive-settings.conf.example`
- `ops/backup/run-pgbackrest-backup.sh`
- `ops/backup/check-backup-freshness.sh`
- `ops/backup/cron.example`

The operational procedure, including stanza bootstrap, archive checks, isolated timestamp restore and key custody, is in `docs/E13_OPERATIONAL_BACKUP_PITR_RUNBOOK.md`. These are implementation templates and scripts; they do not mean PostgreSQL archive_mode, S3, IAM, KMS, cron or pgBackRest have been configured on a real service.

**Important S3 retention interaction:** do not apply a default Object Lock retention period to the active pgBackRest repository until a disposable-bucket test confirms backup, WAL archive, expire/prune and restore behavior. Object Lock may prevent repository pruning while versions are retained. Prefer a separately administered DR replica/account as the immutable ransomware boundary, and validate replication and restore before relying on it.

## Restore cutover gates

`ops/backup/post-restore-gates.sh` fails closed unless dual approval, cross-system reconciliation, application smoke tests, code-execution-disabled attestation and executable E11 tombstone-replay/E12 audit-verification hooks are supplied. The CI tests use mock hooks only; real E11/E12 integrations remain unimplemented and must be supplied by their owning workstreams.
