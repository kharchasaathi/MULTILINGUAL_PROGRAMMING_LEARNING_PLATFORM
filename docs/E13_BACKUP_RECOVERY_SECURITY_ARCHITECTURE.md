# E13 — Backup and Recovery Security Architecture

**Status:** Hardened logical-backup implementation committed; real PostgreSQL+age integration passed in CI; production recovery controls remain open  
**Date:** 2026-11-05  
**Decision:** E-0013  
**Baseline:** PostgreSQL logical backup using pg_dump/pg_restore and age encryption, with Backblaze B2 selected as the off-site object-storage target  
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

The PostgreSQL implementation has a real logical backup/restore CI round trip and a guarded Backblaze B2 S3-compatible publisher/verifier. The publisher checks bucket versioning, private ACL and SSE-B2/AES256, then uploads the encrypted artifact, checksum and manifest while recording VersionIds. A separate verifier downloads exact versions and recomputes SHA-256. B2 contract tests are mocked; no live B2 service call or cloud data transfer has been executed. pgBackRest config/WAL/PITR remain templates only; no live stanza, base backup, WAL archive or restore has been performed.

## 5. Storage and cryptographic controls
Encrypt before leaving the trusted host. Separate encryption identity from backup storage and production database administration. Restrict write/delete/read permissions independently. Production requires immutable/offline or separately administered copies, cross-account/region failure separation, retention lock, versioning and tested key escrow. Current off-site target: Backblaze B2 S3-compatible API, bucket `kharchasaathi-e13-backup-primary` in EU Central (`eu-central-003`). Observed settings: Private, SSE-B2 enabled, Keep all versions, Object Lock Disabled. B2 has no AWS IAM roles, S3 Block Public Access or SSE-KMS; use restricted Application Keys and client-side encryption. A separate B2 account/bucket is required for another region. Object Lock/retention and replication require explicit owner/security/legal approval. No DR destination or replication rule exists. SHA-256 detects accidental/tampered artifact changes relative to the stored checksum; it is not a signature or independent authenticity proof. Protect manifests/checksums from the same destructive actor as artifacts.

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
\n\n## 11. Historical AWS S3 exploration (2026-11-05; not selected)\n- AWS S3 was evaluated but not provisioned; it is not the current selected target.\n- AWS S3 publisher and its mocked tests remain in the repository as an unselected provider adapter; they do not establish AWS readiness.\n- No AWS cloud upload or service integration was tested.\n- No AWS Object Lock retention policy was approved.\n- No AWS account, bucket, KMS key, IAM role, replication rule, lifecycle rule, billing configuration or cloud upload was created.\n

## 12. PITR, operations and recovery gates (2026-11-05)
- Selected PITR implementation: pgBackRest using an S3 repository in `ap-south-1`, with S3 KMS encryption and workload-role credentials. Configuration examples and PostgreSQL archive settings are in `ops/backup/pgbackrest.conf.example` and `ops/backup/postgresql-archive-settings.conf.example`.
- Added serialized scheduled-backup wrapper, freshness monitor, cron proposal, S3 cross-account replication JSON template, incomplete-multipart lifecycle template and isolated restore runbook.
- Added fail-closed cutover gate requiring dual approval, cross-system reconciliation, application smoke test, code execution disabled, E11 tombstone replay hook and E12 audit verification hook.
- CI run 57 passed the S3 publisher mock contract, replication/lifecycle JSON parsing, Bash syntax, backup/freshness/recovery-gate tests and the existing mocked backup suite. The real PostgreSQL+age integration job also completed successfully in the same run.
- No B2 live upload, Object Lock, replication, PostgreSQL archive configuration, pgBackRest stanza, cron schedule, alert adapter, key escrow or real E11/E12 hook has been provisioned. No live PITR or DR drill has been executed.
- **Retention interaction warning:** applying Object Lock default retention directly to a pgBackRest repository can block pgBackRest pruning until retention expires. A disposable AWS test must validate archive, backup, pruning and restore behavior. Use an independently administered DR replica as the immutable copy only after replication semantics and recovery have been tested.
- E13 remains open; E14 is blocked pending live service and business acceptance evidence.


## 13. Backblaze B2 provider decision and implementation slice (2026-11-05)

- AWS S3 paid-plan activation and Google Cloud Billing setup were not completed. The current off-site storage candidate is Backblaze B2.
- Owner created bucket kharchasaathi-e13-backup-primary in EU Central (eu-central-003). Screenshot evidence: Private; default Backblaze-managed encryption enabled; File Lifecycle Keep all versions; Object Lock Disabled; zero objects at observation time.
- Added ops/backup/publish-b2-backup.sh. It validates local encrypted backup metadata, requires the exact regional HTTPS endpoint, checks bucket versioning, rejects public ACL grants, checks SSE-B2/AES256 default encryption, optionally checks Object Lock configuration, uploads artifact/checksum/manifest and records VersionIds. It does not provision bucket settings, apply retention or configure replication.
- Added ops/backup/test-b2-publish.sh with mocked AWS CLI/S3-compatible contract checks and a public-bucket negative test. Added .github/workflows/e13-b2-contract.yml for shell syntax and mocked contract CI.
- Updated ops/backup/pgbackrest.conf.example for the B2 endpoint, region, and bucket-restricted B2 Application Key placeholders. This is a configuration template only; pgBackRest compatibility with the actual account/bucket has not yet been tested.
- B2 versioning is always enabled; B2 has no AWS IAM roles, Block Public Access or SSE-KMS. B2 Object Lock can be enabled on an existing bucket but cannot later be disabled; retention must be separately configured. Source bucket Object Lock remains Disabled.
- B2 Cloud Replication is configured via console/Native API (not S3 API), requires a separate B2 account per region, and source Object Lock requires destination Object Lock. No destination account/bucket or replication rule exists.
- CI/live status: the new B2 workflow has been committed but its run result must be checked; no live cloud upload, remote download verification, immutable-retention test, pgBackRest WAL/PITR, replication, key escrow, alert delivery, E11/E12 integration or restore drill has been executed.
- **E13 remains IN PROGRESS; E14 remains BLOCKED.**
