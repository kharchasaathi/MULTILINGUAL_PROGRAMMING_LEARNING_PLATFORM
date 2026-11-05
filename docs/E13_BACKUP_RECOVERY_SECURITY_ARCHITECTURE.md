# E13 — Backup and Recovery Security Architecture

**Status:** Hardened logical-backup implementation committed; real PostgreSQL+age integration passed in CI; production recovery controls remain open  
**Date:** 2026-11-05  
**Decision:** E-0013  
**Baseline:** PostgreSQL logical backup using pg_dump/pg_restore and age encryption, with AWS S3 selected as the off-site object-storage target  
**Dependencies:** D4, D13, E6, E11, E12  
**Scope:** A deployable script baseline, not a production DR service or compliance certification.

## 1. Objectives and boundaries
Protect confidentiality, integrity and availability of authoritative data. Recovery must restore a consistent, authorized, privacy-compliant state and preserve forensic evidence. Backups are sensitive data stores and inherit the source data classification and retention obligations.

## 2. Recovery tiers and objectives
No numeric RPO/RTO is approved. Service owners must propose and obtain business approval for RPO/RTO per service tier before launch. Do not infer an SLA from backup frequency. Record actual measured recovery point, recovery duration, dependencies and drill evidence.

## 3. Data inventory
Inventory PostgreSQL, object/file bytes and metadata, audit evidence, outbox/inbox, content/media, configuration, infrastructure definitions, secrets/key metadata, AI/RAG derived indexes and runtime images. Each owner records source of truth, classification, backup method, consistency point, retention, region, recovery dependency and deletion/legal-hold behavior. Caches and ephemeral sandbox workspaces are not source-of-truth backups; rebuild or discard them.

## 4. Implemented PostgreSQL utility
Files:
- `ops/backup/backup-postgres.sh`: pg_dump custom archive, age encryption, SHA-256 checksum and manifest.
- `ops/backup/verify-backup.sh`: checksum and manifest verification.
- `ops/backup/restore-postgres.sh`: decrypt, archive-list preflight and explicit-confirmation and isolated-target-attestation restore into a newly provisioned empty database; no implicit object deletion.
- `ops/backup/test-backup-scripts.sh`: mock-based utility/security guard test harness.\n- `ops/backup/test-backup-integration.sh`: real PostgreSQL + age encryption/decryption and data round-trip test, executed by GitHub Actions with a disposable PostgreSQL service.
- `ops/backup/README.md`: usage and operational limits.\n- `ops/backup/publish-s3-backup.sh`: guarded upload of encrypted artifacts and integrity metadata to a pre-provisioned S3 bucket.\n- `ops/backup/test-s3-publish.sh`: mocked AWS CLI contract test; it does not contact AWS.

Use a dedicated backup DB identity, protected environment/secret injection, restricted off-host BACKUP_DIR and public AGE_RECIPIENT. Keep AGE identity outside the artifact and recover it through separately controlled escrow. Never commit credentials or plaintext dumps. Restore only to an isolated, explicitly named recovery database. The restore command is destructive to matching objects in its target.

The PostgreSQL implementation remains logical backup only. The S3 publisher now provides a guarded publishing path for encrypted artifacts: it checks Mumbai region, bucket versioning, Object Lock enablement and all S3 Block Public Access flags, then applies per-object Object Lock retention and SSE-KMS using a required customer-managed key. This is a client-side script baseline only. It does not provision AWS resources, validate IAM policy correctness, configure cross-account replication/lifecycle, enable WAL archiving, physical base backups or PITR, schedule jobs, alert, or perform key escrow. The mocked S3 test proves command contract behavior only, not AWS service behavior or cloud provisioning. The integration workflow proves a real logical backup/restore round trip in CI, not production disaster recovery.

## 5. Storage and cryptographic controls
Encrypt before leaving the trusted host. Separate encryption identity from backup storage and production database administration. Restrict write/delete/read permissions independently. Production requires immutable/offline or separately administered copies, cross-account/region failure separation, retention lock, versioning and tested key escrow. Selected target: S3 in `ap-south-1` (Mumbai), with versioning, Object Lock, S3 Block Public Access and SSE-KMS using a customer-managed KMS key. A separate AWS account and DR region should hold the replicated copy. Object Lock mode/retention and replication policy require explicit security/legal approval; the initial 30-day value is a proposal, not an approved policy. S3 bucket, KMS key, IAM role/policy, replication and lifecycle are not provisioned by this repository. SHA-256 detects accidental/tampered artifact changes relative to the stored checksum; it is not a signature or independent authenticity proof. Protect manifests/checksums from the same destructive actor as artifacts.

## 6. Consistency and recovery sequence
Coordinate database snapshot time with object storage and event/audit stores using a recovery manifest. For PostgreSQL PITR, configure a supported base-backup plus continuous WAL archive and test recovery to a selected timestamp. Logical pg_dump is not a substitute for PITR.

Suggested order:
1. Validate recovery account, network isolation, IAM and key availability.
2. Restore PostgreSQL to isolated target and validate schema/migrations/integrity.
3. Restore matching object versions and metadata; reconcile references.
4. Restore/validate audit evidence; validate outbox/inbox offsets and deduplicate replay.
5. Apply E11 deletion tombstones, retention and legal holds before serving data.
6. Rotate credentials after compromise scenarios; restore dependent application services.
7. Rebuild AI/search indexes from authorized source records and recompute caches.
8. Keep sandbox execution, payments and other gated high-risk features disabled until their independent enablement approvals remain valid.
9. Run application smoke tests, security checks and business reconciliation; obtain explicit cutover approval.

## 7. Threats and failure scenarios
Cover accidental deletion, operator error, corrupt writes, ransomware, compromised cloud/admin credentials, region/provider outage, key loss/compromise, database corruption, missing WAL, object-store inconsistency, event replay, audit gaps and privacy deletion resurrection. Recovery environment must be clean-room, isolated, patched and independently administered.

## 8. Privacy and audit
Backups inherit E11 purpose, minimization, retention, legal hold and deletion constraints. A restore must replay deletion tombstones and prevent erased personal data from re-entering active systems. Audit backup/restore request, actor, approval, target, artifact hash, key identifier (never key), timestamps, outcome and validation evidence. Audit-store backups must be independently protected and integrity-checked. Do not place secrets, credentials, raw learner submissions or unnecessary personal data in logs/manifests.

## 9. Monitoring and operations
Production operations must monitor last successful backup, backup age, inventory coverage, artifact size/anomalies, checksum failures, key availability, WAL lag, remote-copy status, retention-lock status, restore-drill age, RPO/RTO measurements and recovery capacity. Define named on-call owners and escalation. Test alert delivery and failure behavior.

## 10. Acceptance gates
- Provider/storage/KMS selection and threat review approved.
- Data inventory and owner coverage complete.
- Numeric RPO/RTO, retention and legal-hold policy approved.
- Off-host immutable copy, key escrow and WAL/PITR implemented where required.
- Object/event/audit consistency and privacy deletion replay implemented.
- Restore drills, security tests, application smoke tests and measured RPO/RTO pass.
- E14 independent security testing and E15 explicit security approval completed.

**Current limitation:** Provider-neutral PostgreSQL logical backup/verify/restore scripts, mock tests and a real PostgreSQL+age integration workflow have been committed. The real integration workflow passed in GitHub Actions run 23 (both mock and real integration jobs successful). No production database, scheduled backup, remote immutable storage, PITR, key escrow, cross-system restore drill or production recovery has been executed. E13 remains open until the acceptance gates above are evidenced.
\n\n## 11. AWS S3 implementation slice (2026-11-05)\n- Selected provider: AWS S3, primary region `ap-south-1` (Mumbai).\n- Added `ops/backup/publish-s3-backup.sh`, which uploads only encrypted `.dump.age` artifacts plus checksum and manifest after validating local metadata, bucket versioning, Object Lock enablement and all S3 public-access-block flags. Each object receives SSE-KMS and explicit Object Lock retention.\n- Added `ops/backup/test-s3-publish.sh` for mocked AWS CLI contract tests.\n- The 30-day retention value is an example pending owner approval; GOVERNANCE is the conservative initial mode. COMPLIANCE mode must not be enabled without legal/security approval.\n- No AWS account, bucket, KMS key, IAM role, replication rule, lifecycle rule, billing configuration or cloud upload has been created or tested. S3 slice remains unverified against live AWS until a controlled test account is provisioned.\n

## 12. PITR, operations and recovery gates (2026-11-05)
- Selected PITR implementation: pgBackRest using an S3 repository in `ap-south-1`, with S3 KMS encryption and workload-role credentials. Configuration examples and PostgreSQL archive settings are in `ops/backup/pgbackrest.conf.example` and `ops/backup/postgresql-archive-settings.conf.example`.
- Added serialized scheduled-backup wrapper, freshness monitor, cron proposal, S3 cross-account replication JSON template, incomplete-multipart lifecycle template and isolated restore runbook.
- Added fail-closed cutover gate requiring dual approval, cross-system reconciliation, application smoke test, code execution disabled, E11 tombstone replay hook and E12 audit verification hook.
- CI run 57 passed the S3 publisher mock contract, replication/lifecycle JSON parsing, Bash syntax, backup/freshness/recovery-gate tests and the existing mocked backup suite. The real PostgreSQL+age integration job also completed successfully in the same run.
- No AWS bucket/KMS/IAM/replication, PostgreSQL archive configuration, pgBackRest stanza, cron schedule, alert adapter, key escrow or real E11/E12 hook has been provisioned. No live PITR or DR drill has been executed.
- **Retention interaction warning:** applying Object Lock default retention directly to a pgBackRest repository can block pgBackRest pruning until retention expires. A disposable AWS test must validate archive, backup, pruning and restore behavior. Use an independently administered DR replica as the immutable copy only after replication semantics and recovery have been tested.
- E13 remains open; E14 is blocked pending live service and business acceptance evidence.
