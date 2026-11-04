# D15 — System Architecture Review and Approval

**Status:** Complete — conditionally approved as the logical architecture baseline  
**Date:** 2026-11-05  
**Scope reviewed:** D1–D14, supporting module/entity/API matrices, project governance, engineering constitution and security constitution  
**Decision:** D-0013  
**Branch:** `docs/project-foundation`  
**Approval boundary:** Approval to proceed to Stage E security architecture and Stage F quality engineering. This is not approval to start production implementation, deploy infrastructure, enable payments, publish learner content or execute untrusted code.

## 1. Executive decision

The D1–D14 architecture is **approved with mandatory pre-implementation conditions** as the platform's logical architecture baseline.

The review confirms a coherent direction:
- TypeScript-first modular monorepo and modular-monolith backend.
- Next.js web/PWA and Expo native client boundary.
- NestJS application boundary, PostgreSQL/Prisma persistence and versioned REST contracts.
- Explicit ownership for identity, curriculum, content/review, assessment, projects, progress, AI, payment, entitlement, notification, assets, playground and audit capabilities.
- Six supported locales: Telugu, English, Malayalam, Kannada, Tamil and Hindi.
- W3Schools-exclusive curriculum scope, with original instructional content.
- Server-authoritative authorization, assessment, progress, publication and entitlement.
- D13 application-port and at-least-once event communication.
- D14 end-to-end flows, trust boundaries, recovery and reconciliation.

The review also found integration inconsistencies. The directly correctable ownership, dependency, identity and API-inventory mismatches have been reconciled in the supporting D3–D5/D4 artifacts. Remaining incomplete contracts and security/provider choices are recorded as gates below.

**Verdict:** Architecture baseline approved for security and quality design. Production implementation remains blocked until the applicable gate is evidenced as closed.

## 2. Review method and evidence

Reviewed:
- D1 technology stack decision and stack matrix.
- D2 frontend architecture and route matrix.
- D3 backend architecture and module ownership matrix.
- D4 database architecture and entity matrix.
- D5 REST contract and endpoint matrix.
- D6 identity, authentication and authorization architecture.
- D7 course engine architecture and lifecycle/entity matrices.
- D8 language engine, locale registry and parity matrix.
- D9 AI architecture, task and data contract matrices.
- D10 progress architecture, event catalog, data contract and workflow matrices.
- D11 admin architecture, permissions, data contracts and workspace matrix.
- D12 payment architecture, state machine and data contract matrix.
- D13 module communication architecture.
- D14 end-to-end system data flow.
- AGENTS.md, Engineering Constitution and Security Constitution.
- Current Master Structure, Progress Tracker and Decision Log.

This is a document/contract consistency review. It is not a code review, threat-model execution, penetration test, privacy/legal opinion, load test, migration validation or production readiness certification.

## 3. Architecture baseline approved

| Area | Approved logical baseline | Authority / constraint |
|---|---|---|
| Product | Responsive website, PWA, Android, future iOS | Website-first sequence |
| Locales | te, en, ml, kn, ta, hi | D8 allowlist; C2–C7 native rules |
| Curriculum | W3Schools-only scope | No out-of-source topic expansion |
| Web | Next.js App Router | D2 client boundary |
| Native | Expo React Native | Separate native UI; shared contracts only |
| Backend | NestJS modular monolith | No premature microservices |
| Language | TypeScript strict | Compatible stable versions pinned at implementation |
| Database | PostgreSQL + Prisma ORM 7 stable baseline | D4 owner-only repository access |
| API | REST/JSON, `/api/v1`, OpenAPI | D5 schemas and compatibility rules |
| Internal communication | In-process application ports first; D13 outbox/inbox for durable async | At-least-once, idempotent consumers |
| AI | Provider-neutral bounded orchestration | AI cannot approve, publish, score or grant access |
| Content release | Immutable, hash-bound C15 approval | No draft leakage or approval bypass |
| Progress | Server-authoritative evidence and rebuildable projections | D10 policy owns completion/mastery |
| Payment | Provider-neutral D12 boundary | Verified financial facts only |
| Entitlement | Separate effective-access authority | Client/payment redirect cannot grant access |
| Code execution | External isolated sandbox only | Disabled until E9 and L13–L15 approval |
| Observability | OpenTelemetry-compatible contracts | Vendor/SLO thresholds deferred |

This table approves technology families and authority boundaries, not exact package versions, providers, hosting regions, deployment settings or operational values.

## 4. Cross-document findings and reconciliations

### 4.1 D3 dependency cycle

**Finding:** The original backend module matrix showed Assessment depending on Progress while Progress depended on Assessment, creating a potential compile-time/module dependency cycle.

**Correction committed:**
- Assessment no longer depends on Progress.
- Progress no longer imports Assessment internals.
- Assessment and Project publish versioned evidence facts through D13 contracts.
- Progress consumes those facts idempotently.
- Project is explicitly represented as an owning backend capability.
- Payment and Entitlement are separate module boundaries.

**Evidence:** Updated `docs/D3_BACKEND_MODULE_MATRIX.csv` and `docs/D3_BACKEND_ARCHITECTURE.md`.

### 4.2 D4 and D6 identity mapping mismatch

**Finding:** The initial D4 entity matrix placed issuer/subject uniqueness on `identity_principal`, while D6 specifies a separate external identity link mapped to an internal principal.

**Correction committed:**
- `identity_principal` is the internal actor identity.
- `identity_external_link` owns the unique `(issuer, subject)` mapping.
- Provider credentials/tokens remain outside ordinary application tables.

**Evidence:** Updated `docs/D4_DATABASE_ENTITY_MATRIX.csv` and `docs/D4_DATABASE_ARCHITECTURE.md`.

### 4.3 D13 durable consumer inbox

**Finding:** D13 requires durable inbox deduplication, but D4's initial matrix did not list a consumer receipt entity.

**Correction committed:** Added logical `platform_inbox_receipt` with unique consumer/event identity, schema version and processing state. Exact schema, retention and indexes remain migration-design work.

**Evidence:** Updated D4 entity matrix and database architecture.

### 4.4 D5 and D12 payment API reconciliation

**Finding:** D12 listed learner billing/entitlement API candidates, but the D5 endpoint matrix did not contain them.

**Correction committed:** Added candidate v1 rows for plan listing, price listing, order creation/status, hosted checkout, effective entitlement read and refund request/status. Provider webhook ingress remains isolated server-to-server.

**Evidence:** Updated `docs/D5_API_ENDPOINT_MATRIX.csv` and `docs/D5_API_CONTRACTS.md`.

### 4.5 D5 and D10 progress evidence semantics

**Finding:** A generic-looking progress update route could be misread as permission to mutate a derived progress projection.

**Correction committed:** The existing progress write route is explicitly an append-only evidence command. It cannot patch projection, completion or mastery state and cannot accept client-authored evaluator facts.

**Evidence:** Updated D5 endpoint matrix and contract document.

### 4.6 Remaining cross-document persistence reconciliation

The following are **not falsely marked complete**:
- C13 project submission, milestone and rubric persistence must be mapped into the migration-ready D4 schema inventory.
- D12 billing entities remain in the D12 data-contract matrix and must be reconciled with D4 migration naming, common IDs, audit, idempotency and outbox/inbox conventions.
- Notification delivery preferences, jobs, attempts and suppression records need a complete owner-approved persistence contract.
- D6 session, role assignment, external link, verification and recovery entities need final D4 reconciliation.
- D13 outbox/inbox retention, leases, indexes and worker recovery schema need final migration-level design.

D4's current matrix is a logical baseline, not a complete production schema.

## 5. End-to-end architecture invariants

These are mandatory system-wide rules:

1. No client connects directly to PostgreSQL.
2. Only the owning module mutates its domain records.
3. Every protected action uses D6 server-resolved principal, permission and resource scope.
4. No role, user ID, score, locale preference, price, payment result or entitlement supplied by the client is authoritative.
5. Published curriculum/content/review versions are immutable and hash/version-bound.
6. C15 owns human review and publication gates; AI cannot approve or publish.
7. C12 owns assessment evaluation; C13 owns project submission/rubric evidence.
8. D10 owns progress evidence ingestion and projections, not assessment/project source records.
9. D12 owns financial facts; Entitlement owns effective access decisions.
10. Async delivery is at-least-once; consumers are idempotent; exactly-once transport is never claimed.
11. Unknown side-effect outcomes require status lookup/reconciliation before retry.
12. No distributed database transaction across modules; use local transactions and D13 events/sagas with compensation.
13. No untrusted learner code executes in the API/web process.
14. No silent fallback to an unapproved lesson/assessment locale.
15. Sensitive payloads, credentials and payment secrets are excluded from events/logs/traces.
16. No release, payment, sandbox or privileged admin action bypasses its owning approval/security gates.

## 6. Architecture risks and required gates

| ID | Risk / incomplete decision | Severity | Owner | Required closure evidence |
|---|---|---|---|---|
| GATE-01 | Full D4 schema reconciliation across C13, D6, D12, D13 and Notification | High | D4 + domain owners | Unified entity/relationship/retention matrix; reviewed migration plan |
| GATE-02 | Exact D5 schemas for project workflows, provider webhook ingress, billing admin and internal progress evidence | High | D5 + D10/D12/C13 | Complete route/contract matrix and OpenAPI design review |
| GATE-03 | Identity provider, protocol, web/native session transport, MFA and recovery | High | D6 + E4/E5 | Approved provider-neutral profile and threat model; secure session decision |
| GATE-04 | Default UI locale and UI-only fallback policy | Medium | D8 + product owner | Recorded locale policy; no lesson/assessment fallback without approved version |
| GATE-05 | AI provider/model, data region, privacy terms, consent, budget and retention | High | D9 + E8/E11 | Provider due diligence, data-flow approval, budget/quotas and safety evaluation |
| GATE-06 | Payment merchant, gateway, market, methods, tax, refund, subscription and PCI scope | High | D12 + E10/E11 | Finance/legal/provider review, hosted-checkout security and reconciliation design |
| GATE-07 | Entitlement policy for expiry, refund, chargeback, multiple grants and grace | High | Entitlement + D12 | Versioned access policy and state-transition tests |
| GATE-08 | D13 worker runtime, lease/locking, retry schedule, dead-letter retention and replay approval | High | D13 + D4 | Worker design, failure/restart model, runbooks and load tests |
| GATE-09 | Code execution isolation, resource quotas, network/filesystem restrictions and abuse controls | Critical | E9 + L13–L15 | Independent sandbox threat model and security approval before enablement |
| GATE-10 | Privacy retention, deletion/anonymization, legal hold, export and minors' data policy | High | E11 + D4/D6/D10/D12 | Approved privacy/data lifecycle policy |
| GATE-11 | Backup, restore, RPO/RTO and key recovery | High | E13 + D4 | Approved targets, tested restore and recovery evidence |
| GATE-12 | CI, test environments, release gates, rollback and monitoring thresholds | High | F11–F15 + G10–G13 | Automated pipeline and demonstrated quality gates |
| GATE-13 | Exact production hosting, region, secrets/KMS and provider connectivity | High | D1/D3 + E2/E6 | Deployment threat model, approved region and secret/key lifecycle |
| GATE-14 | Native/web offline conflict and secure persistence policy | Medium | D2/D8/D10 | Read-only cache policy and explicit prohibition of authoritative offline writes until approved |
| GATE-15 | Project and assessment event schemas, source evidence versioning and correction workflow | High | C12/C13/D10/D13 | Versioned producer/consumer contracts and replay/rebuild tests |

Critical sandbox gate blocks all untrusted code execution. High gates block the relevant production integration. No provider or policy is silently selected by this approval.

## 7. Implementation sequence and dependency gates

The project must continue in this order:

### Stage E — Security Constitution
- E1 threat modelling must use D1–D14 trust boundaries and GATE-01 to GATE-15.
- E2–E13 define network, application, identity, authorization, data, API, AI, sandbox, payment, privacy, audit and recovery controls.
- E14 validates security tests and evidence.
- E15 records security approval and explicitly lists any disabled capabilities.

### Stage F — Error Prevention and Quality Engineering
- Define coding/type/schema/validation standards.
- Create unit, integration, end-to-end, regression, security and performance test strategy.
- Establish CI quality gates, release checks, monitoring and rollback.
- No task is marked passed until its tests actually run and results are recorded.

### Stage G and implementation readiness
- Complete repository protections, GitHub Actions, automated tests, deployment workflow and backup/version-control policy.
- Reconcile all architecture gates and approve implementation-ready schemas/contracts before coding.
- Build incrementally behind tests and feature/security gates.
- Playground, payment, AI provider and production release remain disabled until their specific approval conditions are met.

## 8. Architecture acceptance checklist

| Acceptance check | Result |
|---|---|
| D1–D14 source documents exist on working branch | Pass |
| Approved technology family and modular monolith are consistent | Pass |
| Module ownership is explicit at logical level | Pass with D3 reconciliation |
| Circular Assessment/Progress dependency removed from matrix | Pass |
| Project, Payment and Entitlement boundaries represented | Pass at logical module level |
| Identity principal and external identity link separated | Pass in logical D4 matrix |
| D13 outbox/inbox concepts represented in D4 logical model | Pass; final schema pending |
| D5 billing routes reconciled with D12 candidate list | Pass at route-inventory level |
| D10 progress write semantics protected from client projection mutation | Pass at contract-description level |
| C15 publication, D6 authorization, D9 AI and D12 payment authorities preserved | Pass |
| D14 major end-to-end journeys and failure paths covered | Pass |
| All production database entities and migrations finalized | Not yet; GATE-01 |
| All wire schemas/OpenAPI contracts finalized | Not yet; GATE-02 and domain gates |
| Threat model/security testing approved | Pending Stage E |
| CI and automated test evidence exists | Pending Stage F/G |
| Providers, infrastructure and live integrations approved | Pending relevant gates |

## 9. Approval statement

**System architecture decision: CONDITIONALLY APPROVED.**

The D1–D14 logical architecture is approved as the baseline for proceeding to Stage E security design and Stage F quality engineering. The identified module-cycle, ownership-boundary, identity-mapping, inbox-model and billing/progress API inventory inconsistencies have been corrected in their supporting documents.

This approval does **not** assert that the architecture is production-ready, every schema/route is final, all risks are eliminated, or any tests have passed. GATE-01 through GATE-15 remain tracked conditions with named owners and required evidence. Production implementation and capability enablement must not bypass them.

## 10. D15 future verification scenarios

These checks must be automated or independently evidenced as implementation proceeds; they have not been executed by this documentation review.

1. Architecture dependency graph contains no forbidden module cycles.
2. Assessment has no compile-time dependency on Progress.
3. Project evidence is owned by Project and not Progress.
4. Payment and Entitlement have separate write authorities.
5. Every module has exactly one declared owner for each authoritative entity.
6. No cross-module repository import is allowed.
7. Every cross-module command/event has a versioned contract owner.
8. External identity uniqueness is enforced on issuer+subject link, not internal principal.
9. Identity principal cannot be created twice for the same external link under concurrency.
10. Inbox uniqueness prevents duplicate consumer effects.
11. Outbox event commits atomically with its source business state.
12. Payment routes match D12 candidate contracts and are owner-scoped.
13. Payment redirect cannot grant entitlement.
14. Only verified financial events can trigger entitlement evaluation.
15. Progress learner API cannot accept client score/mastery/completion assertions.
16. Assessment and project evidence references preserve source version and learner scope.
17. C15 release requires exact hash-bound approval gates.
18. AI/service principal cannot impersonate human reviewer/publisher.
19. D8 does not silently substitute an unapproved lesson locale.
20. No untrusted code executes in the API process.
21. Disabled sandbox routes remain unavailable before E9 approval.
22. Cross-learner resource access is denied.
23. Unknown event schema versions are quarantined.
24. Event retries and replay do not duplicate business effects.
25. Unknown payment/assessment/publish outcomes are reconciled before retry.
26. Notification delivery failure does not roll back source business state.
27. Secrets and restricted payment/authentication data are absent from logs and events.
28. Retention/deletion policy is enforced consistently across primary data and backups.
29. Database migrations pass empty-database and previous-version compatibility tests.
30. Restore drill validates database, assets, keys and event reconciliation.
31. CI blocks merge/release on required failed quality/security checks.
32. Rollback/forward-repair is demonstrated for a representative schema/application release.
33. All critical learner journeys pass end-to-end tests.
34. Accessibility and six-locale rendering are verified on supported clients.
35. Provider outage does not cause unauthorized access or fabricated success.

## 11. Deferred decisions register

The following remain deliberately undecided and must be recorded in their owner documents/decision log before implementation:
- Hosting provider/region and deployment topology.
- Identity provider, web/native session protocol and MFA.
- Default UI locale and UI-only fallback behavior.
- AI provider/model, data region, privacy terms, budget and retention.
- Sandbox provider/runtime and isolation profile.
- Object storage and notification provider.
- Payment gateway, merchant entity, supported markets/methods, pricing, taxes and refund/subscription policies.
- Entitlement expiry, grace and chargeback policy.
- Worker/scheduler and broker adoption threshold.
- Event retry/retention/partition/replay policy.
- Database migration-ready consolidation, retention and deletion policy.
- RPO/RTO/SLO, alert thresholds and telemetry vendor.
- CI/deployment environment, rollback and release approvals.

No value is invented or inferred by D15.

## 12. Handoff

D15 is complete at **conditional logical system-architecture approval scope**.

**Next task: E1 — Threat modelling.**

E1 must use the actual D1–D14 architecture and this D15 gate register. It must not restart the architecture or treat conditional approval as a security sign-off.
