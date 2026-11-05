# E6 — Database Security Hardening

**Status:** Design baseline complete; implementation and verification pending  
**Date:** 2026-11-05  
**Depends on:** D4 PostgreSQL/Prisma logical architecture; E1–E5 security baselines  
**Scope:** Database security requirements and future verification catalogue. No deployed database, migration, role, policy, backup or test is claimed.

## 1. Purpose and authority
Harden the PostgreSQL system of record without changing D4's modular-monolith ownership model. Browser and native clients never connect directly. Each owning backend module accesses its data through approved repositories. Database controls supplement, never replace, E4 identity and E5 authorization. The database must not infer authority from client-supplied IDs, role names or tenant context.

## 2. Data classification and boundaries
Use D4 classifications: Public, Internal, Confidential and Restricted. Treat database, replicas, exports, logs, backups, migration runners, BI/reporting, workers, caches and search indexes as distinct access boundaries. Confidential learner profiles, progress, assessment responses, submissions and private assets require purpose-bound access. Restricted credentials, recovery factors and provider secrets remain outside ordinary application tables and logs. Derived copies inherit source classification and deletion/retention obligations.

## 3. Database identities and privilege model
Define separate identities for application runtime, migration, read-only reporting, backup/restore, operational monitoring and each isolated worker class. Runtime identities must not own schemas, create extensions, grant privileges, bypass row security or perform DDL. Migration identity is short-lived, approval-gated and unavailable to normal application processes. Reporting is read-only and limited to approved views/columns. Backup identity cannot query arbitrary application data. Avoid shared credentials between environments or services; use managed secret delivery, rotation, revocation and access audit. No credentials in source, CI artifacts, client bundles, fixtures or logs.

## 4. PostgreSQL privilege hardening
When implementation begins: revoke broad PUBLIC privileges; explicitly grant CONNECT, schema USAGE and table/sequence/function privileges; configure safe default privileges for future objects; separate ownership from runtime access; review inherited roles and membership paths. Restrict CREATE, TEMP, replication, bypass-RLS and superuser. Lock down extensions and database-level capabilities. Fix search_path for privileged functions; schema-qualify objects; prohibit unsafe SECURITY DEFINER functions unless reviewed, minimal, owned by a non-login role and tested against search_path/privilege escalation. Runtime must not modify audit evidence or migration history.

## 5. Tenant, row and object isolation
D4's initial model is one database/schema with logical module ownership; tenant topology is unresolved. Do not assume RLS is enabled. Before multi-tenancy, decide tenant key, membership, data residency and cross-tenant service requirements. If RLS is selected, use restrictive policies and FORCE ROW LEVEL SECURITY where appropriate; table owners and privileged bypass paths require explicit treatment. Establish tenant context only from authenticated server-side principal and validated membership, scoped to a transaction; reset pooled connections reliably. Never accept a raw tenant GUC/header as authority. Enforce E5 resource/tenant authorization in application queries as a second layer. Test direct SQL, pool reuse, background jobs, exports and administrative paths for isolation.

## 6. Query and data integrity
Use Prisma parameterized APIs; raw SQL requires review, parameters and static allowlists for identifiers/order clauses. Never concatenate untrusted values into SQL. Bound query complexity, rows, execution time and connection use. Use constraints, foreign keys, unique/check constraints, transactions, idempotency and optimistic concurrency to preserve invariants. Protect immutable version, review, payment, progress and audit history. Use explicit column projections; prevent answer-key, draft, secret and restricted-field leakage. JSONB requires versioned schema validation. Database triggers must not silently translate code or alter domain authority.

## 7. Encryption and secrets
Require validated TLS for database connections and verify certificates/hostnames. At-rest encryption must cover primary storage, replicas, snapshots, temporary storage and backups. Select managed KMS/key ownership and rotation only after provider/region decision; separate key administration from data administration and test recovery. Field-level encryption/tokenization is risk-based, with searchable-data leakage and key-loss trade-offs documented. Credentials and keys are delivered at runtime from a managed secret boundary; rotation and emergency revocation must not require source changes.

## 8. Migration and supply-chain controls
Prisma migration history is the normal schema-change path. Review migration SQL, privilege impact, lock behavior, backfill, data-loss risk and rollback/forward-repair. Use expand–migrate–verify–contract for rolling releases. Run migrations with a separate short-lived identity; production schema changes require approval and evidence. Test empty-database and previous-version upgrades, representative data, constraints and query plans. Pin ORM/driver versions and review extensions. Never copy production personal data into development/test; use synthetic or properly sanitized datasets.

## 9. Backup, restore and continuity
Require encrypted automated backups and PITR where supported; isolate backup credentials and failure domains; protect immutable/offsite copies against deletion/ransomware. Database and object-store recovery must be coordinated. Approve numeric RPO/RTO, retention and legal-hold rules before launch rather than inventing values. Restore drills must verify decryption keys, schema/migration compatibility, row/integrity checks, access restrictions and application operation in an isolated target. Alert on missed backups and failed restore drills. Backup deletion follows approved retention/legal policy.

## 10. Audit, monitoring and operational safety
Capture privileged logins, grants/revocations, role membership, DDL/migrations, policy changes, sensitive exports, backup/restore actions and suspicious query patterns. Protect audit records from runtime mutation and separate audit readers. Redact query parameters and personal data; do not enable indiscriminate full-query logging. Monitor connection saturation, long/blocked queries, replication lag, failed auth, privilege drift, unusual exports and backup failures. Apply connection limits, pool budgets, statement/lock timeouts and safe cancellation. On uncertainty, deny access or stop the affected operation without corrupting committed data.

## 11. Cache, replica and derived-data controls
Read replicas, analytics views, caches, search indexes, materialized views and exports are not authorization authorities. Preserve source ownership and tenant filters; restrict lag-sensitive decisions to the primary/authoritative service. Invalidate derived data on permission revocation, deletion and classification change. Exports require fresh E5 authorization, purpose, scope, expiry and audit. Do not allow reporting credentials to reach write paths.

## 12. Data lifecycle
Define approved retention, learner export, deletion/anonymization, legal hold and backup expiry before production. Deletion workflows must reconcile primary data, replicas, object storage, caches, indexes, exports and backups according to policy. Preserve legally required financial/security evidence with minimization and restricted access. No arbitrary cascade may cross module ownership or erase immutable evidence.

## 13. Deferred decisions
Hosting/provider/region; PostgreSQL version and topology; Prisma migration deployment; runtime and operational role names; tenant model and RLS choice; KMS and encryption policy; connection pooler; audit extension/SIEM; backup product; RPO/RTO; retention/legal hold; restore cadence; query budgets; replica/analytics topology. Resolve each with owner, threat review, implementation evidence and E15 acceptance.

## 14. Acceptance gates
1. Database identities and privilege grants are enumerated and least-privilege reviewed.
2. Runtime cannot own schema, perform DDL, grant privileges or bypass isolation.
3. SQL injection, object/tenant isolation, sensitive projection and pooled-context reset scenarios pass.
4. TLS, at-rest and backup encryption plus key recovery are evidenced.
5. Migration, restore, audit-integrity, retention and derived-data deletion workflows are tested.
6. Production approval includes evidence, residual risk owners and E15 review.

**Verification status:** Architecture and catalogs only. No SQL/Prisma migration, database configuration, RLS policy, credential, encryption, backup, restore, scan or test has been implemented or executed. Learner code execution remains disabled until E9, L13–L15 and E15 approval.
