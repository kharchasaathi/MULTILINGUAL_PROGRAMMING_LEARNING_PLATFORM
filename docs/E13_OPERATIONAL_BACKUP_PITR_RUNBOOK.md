# E13 Operational Backup, PITR and Recovery Runbook

**Status:** Implementation templates and fail-closed automation committed; cloud provisioning and live restore evidence pending.  
**Selected off-site object storage:** Backblaze B2 S3-compatible API, EU Central (`eu-central-003`). The PostgreSQL production region is not yet selected/provisioned; B2 is the remote backup target.  
**PITR engine:** pgBackRest with PostgreSQL WAL archiving and the B2 S3-compatible repository.  
**Scope:** Operational baseline. This is not proof of production readiness.

## 1. Separate the two backup paths

1. `backup-postgres.sh` + `age` + `publish-s3-backup.sh` is a logical-export path for portable encrypted snapshots.
2. pgBackRest is the physical base-backup + continuous WAL path required for point-in-time recovery. It writes directly to S3; do not upload pgBackRest's internal repository files with the single-file S3 publisher.

pgBackRest's archive-push path must be enabled on PostgreSQL and tested before relying on PITR. A completed base backup without its required WAL is not a valid recovery point. See the pgBackRest user guide and command/configuration references.

## 2. Backblaze B2 storage topology

- Primary bucket in Mumbai; S3 Versioning enabled; Block Public Access fully enabled; SSE-KMS using a customer-managed KMS key.
- Dedicated backup role uses temporary workload credentials (instance/task role or web identity), never long-lived access keys in config.
- Separate destination account and DR region; destination bucket must also have versioning and Object Lock enabled when source Object Lock is enabled.
- Replication role must be able to read source versions and Object Lock retention/legal-hold metadata, and destination policy must grant cross-account replication. Enable replication metrics/alerts and test replica availability before declaring DR coverage.
- Configure only abort-incomplete-multipart lifecycle cleanup initially. Do not expire or transition pgBackRest WAL/archive objects until the PITR window, repository retention, restore behavior and Object Lock interaction have been tested.
- Object Lock can prevent pgBackRest pruning while object versions remain retained. Do not apply a default retention period to a live pgBackRest repository until a disposable bucket test proves backup, archive-push, expire/prune and restore all work with the chosen retention and IAM permissions. A separate immutable replica/account is preferred as the ransomware boundary.

Both buckets need versioning for replication; Object Lock replication requires Object Lock on both source and destination buckets. Cross-account replication also needs correct source/destination ownership and IAM/bucket policy. Refer to AWS replication requirements and Object Lock documentation.

## 3. pgBackRest configuration and bootstrap

1. Verify the pre-created B2 bucket, exact EU Central endpoint, private ACL, SSE-B2 default encryption and always-on versioning. Create a bucket-restricted Application Key for the workload and a separate recovery key; inject them through the approved secret manager.
2. Store the pgBackRest cipher passphrase in the approved secret manager and render `pgbackrest.conf.example` to `/etc/pgbackrest/pgbackrest.conf` with owner `postgres`, mode `0600`. Never commit the rendered file.
3. Confirm the installed pgBackRest version supports the configured S3 and KMS options. Use a pinned, patched package version and record it.
4. Merge `postgresql-archive-settings.conf.example` into managed PostgreSQL configuration. `archive_mode=on` requires a PostgreSQL restart. Confirm `archive_command` runs as the database service account and has access to pgBackRest config/spool paths.
5. Run, in order:
   - `pgbackrest --stanza=platform stanza-create`
   - `pgbackrest --stanza=platform check`
   - `pgbackrest --stanza=platform --type=full backup`
   - `pgbackrest --stanza=platform info`
6. Generate WAL after the backup and verify archive progress. A backup is not accepted merely because the command exits zero; the archive check must pass.
7. Execute the controlled PITR drill in section 6 before production use.

The sample retention values (4 full, 14 differential, 365 history days) are configuration examples, not an approved retention policy. Review storage cost and Object Lock behavior before activation.

## 4. Scheduling and freshness

`cron.example` proposes a weekly full backup, daily differential backups, and a 15-minute freshness check. It is not installed automatically. Install only after the primary B2 S3-compatible repository and pgBackRest checks pass.

`run-pgbackrest-backup.sh` serializes runs with `flock`, executes the selected backup, then `pgbackrest check`, and only then updates its success marker. `check-backup-freshness.sh` fails when the marker is missing or older than `BACKUP_MAX_AGE_HOURS` (default must be explicitly configured by operations). An executable alert adapter may be supplied via `BACKUP_ALERT_COMMAND`; this is a hook, not a configured notification service.

Operations must additionally alert on archive lag, failed B2 replication, B2 authentication/authorization failure, low disk/spool capacity, failed scheduled jobs, missing inventory coverage and overdue restore drills. Test alert delivery and escalation; the marker check alone does not prove WAL or replica freshness.

## 5. Key custody and recovery

- age public recipient may be available to backup writers; age private identity must be held outside S3 and outside the production database account.
- pgBackRest repository cipher passphrase is a separate secret. Restrict read access to restore operators and an independently controlled emergency recovery group.
- Separate B2 bucket administrators, backup writers, database administrators and restore approvers. Keep B2 Application Keys and the age identity / pgBackRest cipher passphrase in separate secret custody. The B2 SSE-B2 key is Backblaze-managed; it is not a customer-managed KMS key.
- Maintain two-person-controlled, encrypted escrow for required recovery material and a sealed recovery procedure in a separate account/location. Do not put key material or passphrases in Git, manifests, logs or the backup bucket.
- Test recovery of the age identity, pgBackRest cipher passphrase and independent B2 restore Application Key independently. Rotation/revocation must be tested against historical backup generations before retiring any key.
- B2 uses application-key capabilities rather than AWS IAM roles. Define and test a break-glass recovery key held outside the production workload.

No key escrow, rotation drill or KMS recovery has yet been performed by this repository work.

## 6. Isolated PITR drill

Run only in an isolated, disposable recovery environment with a newly provisioned empty PostgreSQL data directory and approved operator/change record.

1. Record source backup set, B2 file IDs/versions, last archived WAL, selected target timestamp and recovery operator.
2. Stop PostgreSQL on the recovery host. Confirm no production data directory or endpoint is referenced.
3. Run `pgbackrest --stanza=platform --pg1-path=<EMPTY_RECOVERY_DATA_DIR> --type=time --target='<UTC_TIMESTAMP>' --target-action=pause restore`.
4. Start the isolated PostgreSQL cluster; confirm it reaches the target and remains paused as expected. Validate timeline, recovery target and server logs.
5. Run schema/migration checks, row-count and foreign-key checks, domain invariants, application smoke tests and business reconciliation.
6. Restore matching object-store versions and reconcile database references; validate outbox/inbox offsets and idempotent replay.
7. Replay E11 deletion tombstones and legal holds before any user-facing service is enabled. Verify E12 audit chain/integrity and append recovery evidence.
8. Keep payments, learner code execution, external AI processing and other gated capabilities disabled until independent approvals.
9. Measure actual recovery point/data loss and elapsed recovery duration. Compare with approved numeric RPO/RTO; no objective is currently approved.
10. Obtain database, privacy, audit, security and business owner sign-off before cutover.

Do not execute a PITR restore against the production data directory. The repository has not yet executed this drill.

## 7. E11/E12 fail-closed cutover hooks

`post-restore-gates.sh` requires:
- `RESTORE_DUAL_APPROVAL=YES`
- `RESTORE_CROSS_SYSTEM_RECONCILIATION=YES`
- `RESTORE_APPLICATION_SMOKE_TEST=YES`
- `RESTORE_CODE_EXECUTION_DISABLED=YES`
- executable `E11_TOMBSTONE_REPLAY_EXECUTABLE` and `E12_AUDIT_VERIFY_EXECUTABLE` hooks.

The hook executables must be implemented, reviewed and deployed by the E11 privacy and E12 audit owners. The test suite uses mock hooks only; it does not replay real deletion records or verify a real audit chain. A successful gate script is not a substitute for signed owner approval.

## 8. Acceptance evidence still required

- Live B2 upload/download test; verify private bucket ACL, SSE-B2, version IDs, object checksums and restricted Application Key behavior. Enable and test Object Lock only after retention approval; configure a separate destination account/bucket and validate replication/restore.
- Successful pgBackRest B2 S3-compatible stanza, base backup, continuous WAL archive and timestamp-based PITR restore.
- Tested key escrow, key rotation and break-glass access.
- Installed schedule, real alert delivery, archive-lag and replication monitoring.
- Real E11 tombstone/legal-hold replay and E12 audit-integrity validation.
- Approved data inventory, retention, legal hold, numeric RPO/RTO and on-call ownership.
- Recurring isolated restore drills with measured RPO/RTO and application/domain validation.

Until all mandatory evidence is attached, E13 remains open and E14 must not begin.
