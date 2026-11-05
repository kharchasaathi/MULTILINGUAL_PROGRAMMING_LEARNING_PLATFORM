# E13 — Backup and Recovery Security Architecture

**Status:** Hardened logical-backup implementation committed; real integration CI pending; production recovery controls remain open  
**Date:** 2026-11-05  
**Decision:** E-0013  
**Baseline:** Provider-neutral PostgreSQL logical backup utility using pg_dump/pg_restore and age encryption  
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
- `ops/backup/README.md`: usage and operational limits.

Use a dedicated backup DB identity, protected environment/secret injection, restricted off-host BACKUP_DIR and public AGE_RECIPIENT. Keep AGE identity outside the artifact and recover it through separately controlled escrow. Never commit credentials or plaintext dumps. Restore only to an isolated, explicitly named recovery database. The restore command is destructive to matching objects in its target.

The implementation is logical backup only. It does not enable WAL archiving, physical base backups, PITR, remote replication, immutable storage, scheduling, alerting, object-store backup or cloud KMS integration. The integration workflow proves a real logical backup/restore round trip in CI, not production disaster recovery.

## 5. Storage and cryptographic controls
Encrypt before leaving the trusted host. Separate encryption identity from backup storage and production database administration. Restrict write/delete/read permissions independently. Production requires immutable/offline or separately administered copies, cross-account/region failure separation, retention lock, versioning and tested key escrow. SHA-256 detects accidental/tampered artifact changes relative to the stored checksum; it is not a signature or independent authenticity proof. Protect manifests/checksums from the same destructive actor as artifacts.

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

**Current limitation:** Provider-neutral PostgreSQL logical backup/verify/restore scripts, mock tests and a real PostgreSQL+age integration workflow have been committed. The real integration workflow is pending its first passing result. No production database, scheduled backup, remote immutable storage, PITR, key escrow, cross-system restore drill or production recovery has been executed. E13 remains open until the acceptance gates above are evidenced.
