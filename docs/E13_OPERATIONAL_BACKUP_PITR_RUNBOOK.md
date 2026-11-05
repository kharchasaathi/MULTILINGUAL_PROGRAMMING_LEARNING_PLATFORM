# E13 Operational Backup, PITR and Recovery Runbook

**Status:** Local backup/restore and PostgreSQL+age CI evidence passed; Backblaze B2 bucket created; B2 publisher contract tests added; live cloud upload, PITR and DR evidence pending.
**Selected off-site object storage:** Backblaze B2 S3-compatible API, EU Central (eu-central-003).
**Bucket:** kharchasaathi-e13-backup-primary
**Endpoint:** https://s3.eu-central-003.backblazeb2.com
**PITR engine:** pgBackRest with PostgreSQL WAL archiving and B2 S3-compatible repository.
**Scope:** Operational baseline, not proof of production readiness.

## 1. Separate backup paths

1. backup-postgres.sh + age + publish-b2-backup.sh is the portable logical-export path. Only encrypted .dump.age artifacts and their SHA-256/manifest metadata may leave the trusted host.
2. pgBackRest is the physical base-backup + continuous WAL path required for point-in-time recovery. It writes directly to the B2 S3-compatible repository. Never upload pgBackRest internal repository files with the single-file logical publisher.
3. A logical pg_dump snapshot is not PITR. PITR requires a valid physical base backup and every required WAL segment through the chosen target.

## 2. Backblaze B2 topology and constraints

- Current off-site bucket: kharchasaathi-e13-backup-primary, EU Central eu-central-003, endpoint https://s3.eu-central-003.backblazeb2.com.
- User-confirmed console state: Private bucket, Backblaze-managed default encryption enabled (SSE-B2), File Lifecycle = Keep all versions, Object Lock = Disabled, zero uploaded files at time of screenshot.
- B2 buckets are versioned by default; the S3-compatible API reports Versioning Enabled and does not support suspending versioning. Keep all versions must remain until retention and restore behavior are approved.
- B2 S3-compatible API requires HTTPS and Signature Version 4. Use the exact endpoint/region for this bucket. Use a bucket-restricted B2 Application Key; never use the master key in a workload. Keep secrets in a secret manager, not Git, CLI arguments, manifests or logs.
- B2 does not provide AWS IAM roles, AWS S3 Block Public Access, or SSE-KMS. Verify the bucket ACL is Private. Do not send AWS KMS headers. Default SSE-B2 is Backblaze-managed; keep client-side encryption regardless: age for logical dumps and pgBackRest repository cipher for physical backups/WAL.
- B2 Object Lock is currently Disabled. Enabling it on this bucket is a one-way change and cannot be disabled. Enabling Object Lock alone does not make files immutable; a default retention or per-file retention must also be configured. Do not enable it until the owner approves a retention period/mode and a disposable test proves pgBackRest backup, WAL archive, expire/prune and restore behavior. Prefer a separately administered immutable DR destination for the ransomware boundary.
- B2 Cloud Replication is configured through the B2 console or Native API, not through the S3-compatible API. After a replication rule is created, it applies to objects uploaded through the S3-compatible API too. Cross-region replication requires a separate B2 account in the destination region and a destination bucket. If source Object Lock is enabled, destination Object Lock must also be enabled. Verify both accounts' billing readiness and key permissions. Replication status and a restore from destination must be tested; rule creation alone is not DR evidence.
- Backblaze states first-time Cloud Replication setup requires verified email and payment history or a payment. No replication rule has been created.
- Do not configure lifecycle hiding/deletion until the approved PITR window, pgBackRest retention, replication and Object Lock interactions have been tested. B2 Keep all versions can increase stored bytes; monitor storage and versions.

## 3. Logical backup publisher

ops/backup/publish-b2-backup.sh:
- verifies the local age-encrypted artifact, checksum and manifest before network writes;
- checks B2 bucket versioning, Private ACL and default SSE-B2/AES256 encryption;
- optionally verifies Object Lock is enabled when explicitly configured;
- uploads artifact, checksum and manifest and captures returned VersionIds;
- does not create buckets, keys, retention policies, replication rules or lifecycle rules;
- does not claim immutable storage when Object Lock is disabled or uploaded files have no retention.

Required environment variables are injected from an approved secret manager:
~~~bash
export B2_BUCKET=kharchasaathi-e13-backup-primary
export B2_ENDPOINT=https://s3.eu-central-003.backblazeb2.com
export B2_REGION=eu-central-003
export B2_APPLICATION_KEY_ID=__INJECT_SECRET__
export B2_APPLICATION_KEY=__INJECT_SECRET__
export B2_OBJECT_LOCK_ENABLED=false
export B2_PREFIX=postgres
bash ops/backup/publish-b2-backup.sh /secure-backups/postgres/appdb-<UTC>.dump.age
~~~
Do not place literal credentials in shell history, Git, screenshots or chat. Use a restricted bucket-scoped Application Key. A live upload is not authorized by the presence of this example; perform it only after the disposable artifact and remote download/verification procedure are approved.

Mock contract test (does not contact B2):
~~~bash
bash ops/backup/test-b2-publish.sh
~~~

## 4. pgBackRest configuration and bootstrap

1. Verify bucket, endpoint, region, Private ACL, SSE-B2 and versioning. Create a bucket-restricted B2 Application Key with only required operations. Separate backup and recovery credentials; keep recovery credentials outside the production host.
2. Render ops/backup/pgbackrest.conf.example to /etc/pgbackrest/pgbackrest.conf, owner postgres, mode 0600. Inject B2 key ID, secret and repository cipher passphrase from secret management. Never commit the rendered file.
3. Pin a patched pgBackRest release and verify its S3-compatible endpoint, Signature V4, URI-style and multipart behavior against B2 in a disposable bucket before production.
4. Merge ops/backup/postgresql-archive-settings.conf.example into managed PostgreSQL configuration. archive_mode=on requires a PostgreSQL restart. Confirm archive command runs as the database service account with access to pgBackRest config/spool paths.
5. Run:
   - pgbackrest --stanza=platform stanza-create
   - pgbackrest --stanza=platform check
   - pgbackrest --stanza=platform --type=full backup
   - pgbackrest --stanza=platform info
6. Generate WAL after the base backup and verify archive progress. A successful backup command alone is not sufficient.
7. Execute the isolated timestamp PITR drill before production use.

The example retention values (4 full, 14 differential, 365 history days) are not an approved retention policy. Validate storage cost and B2 lifecycle/Object Lock behavior before activation.

## 5. Scheduling and freshness

cron.example proposes a weekly full backup, daily differential backups and a 15-minute freshness check; it is not installed automatically. Install only after B2 repository and pgBackRest checks pass.

run-pgbackrest-backup.sh serializes runs with flock, executes the selected backup, runs pgbackrest check, and only then updates its success marker. check-backup-freshness.sh fails when the marker is missing or older than explicitly configured BACKUP_MAX_AGE_HOURS. BACKUP_ALERT_COMMAND is only an adapter hook, not a configured notification service.

Alert on backup freshness/job failures, WAL archive lag, B2 authentication/authorization failure, replication lag/failure, storage growth, low disk/spool capacity, checksum failures, key availability and overdue restore drills. Test alert delivery and escalation.

## 6. Key custody and recovery

- age public recipient may be available to backup writers; age private identity must be held outside B2 and outside the production database account.
- pgBackRest repository cipher passphrase is a separate secret. Restrict access to restore operators and independently controlled emergency recovery.
- B2 Application Keys, age identity and pgBackRest cipher passphrase must have separate custody and least-privilege access. B2 SSE-B2 keys are Backblaze-managed; there is no customer-managed KMS key in this design.
- Maintain two-person-controlled encrypted escrow for recovery material and a sealed procedure in a separate account/location. Do not place key material or passphrases in Git, manifests, logs or the backup bucket.
- Test age identity recovery, pgBackRest passphrase recovery, B2 restore-key access, key rotation/revocation and break-glass access against historical backup generations before retiring any key.

No key escrow, rotation drill or break-glass test has yet been performed.

## 7. Isolated PITR drill

Run only in an isolated, disposable recovery environment with a newly provisioned empty PostgreSQL data directory and approved operator/change record.

1. Record source backup set, B2 file IDs/versions, last archived WAL, selected target timestamp and recovery operator.
2. Stop PostgreSQL on the recovery host. Confirm no production data directory or endpoint is referenced.
3. Run pgbackrest --stanza=platform --pg1-path=<EMPTY_RECOVERY_DATA_DIR> --type=time --target='<UTC_TIMESTAMP>' --target-action=pause restore.
4. Start the isolated PostgreSQL cluster; confirm it reaches the target and remains paused as expected. Validate timeline, recovery target and server logs.
5. Run schema/migration checks, row-count and foreign-key checks, domain invariants, application smoke tests and business reconciliation.
6. Restore matching object-store versions and reconcile database references; validate outbox/inbox offsets and idempotent replay.
7. Replay E11 deletion tombstones and legal holds before any user-facing service is enabled. Verify E12 audit chain/integrity and append recovery evidence.
8. Keep payments, learner code execution, external AI processing and other gated capabilities disabled until independent approvals.
9. Measure actual recovery point/data loss and elapsed recovery duration. Compare with approved numeric RPO/RTO; no objective is currently approved.
10. Obtain database, privacy, audit, security and business owner sign-off before cutover.

Never execute PITR against the production data directory. This drill has not yet been executed.

## 8. E11/E12 fail-closed cutover hooks

post-restore-gates.sh requires:
- RESTORE_DUAL_APPROVAL=YES
- RESTORE_CROSS_SYSTEM_RECONCILIATION=YES
- RESTORE_APPLICATION_SMOKE_TEST=YES
- RESTORE_CODE_EXECUTION_DISABLED=YES
- executable E11_TOMBSTONE_REPLAY_EXECUTABLE and E12_AUDIT_VERIFY_EXECUTABLE hooks.

The hook executables must be implemented, reviewed and deployed by E11 privacy and E12 audit owners. Current tests use mock hooks only; they do not replay real deletion records or verify a real audit chain. A successful gate script is not a substitute for signed owner approval.

## 9. Acceptance evidence still required

- Approved data inventory, data classification, retention/legal-hold policy and numeric RPO/RTO.
- B2 restricted Application Keys, tested live logical upload/download and independent checksum/manifest verification.
- Object Lock enablement and approved per-object/default retention on a disposable/test bucket, followed by approved immutable DR destination; source bucket Object Lock is currently Disabled.
- Separate B2 destination account/region, Cloud Replication rule, replication status monitoring and successful restore from the replica.
- Successful pgBackRest B2 S3-compatible stanza, base backup, continuous WAL archive and timestamp-based PITR restore.
- Tested age identity/passphrase/B2 key escrow, rotation and break-glass access.
- Installed schedule, real alert delivery, WAL-lag and replication monitoring.
- Real E11 tombstone/legal-hold replay and E12 audit-integrity validation.
- Cross-system consistency, application smoke tests, dual approval and measured RPO/RTO.
- Recurring isolated restore drills and database/privacy/audit/security/business sign-off.

Until every mandatory gate is evidenced, E13 remains open and E14 remains blocked.

## 10. Provider capability references

- Backblaze S3-compatible API: https://www.backblaze.com/docs/cloud-storage-s3-compatible-api
- B2 Object Lock: https://www.backblaze.com/docs/cloud-storage-object-lock
- B2 Cloud Replication: https://www.backblaze.com/docs/cloud-storage-cloud-replication
- pgBackRest configuration: https://pgbackrest.org/configuration.html
