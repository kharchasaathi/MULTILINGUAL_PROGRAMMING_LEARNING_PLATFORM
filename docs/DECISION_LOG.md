# Decision Log

## D-0001 — Product foundation
- Date: 2026-11-04
- Status: Approved
- Decision: Build a professional programming education platform for Telugu, English, Malayalam, Kannada, Tamil, and Hindi.
- Audience: Beginners, school/college students, job seekers, working professionals, self-learners, career switchers.
- Delivery: Responsive website first, then PWA, Android, and future iOS.
- Commercial model: Initially free; future monetization undecided.
- Curriculum reference: W3Schools public topic taxonomy for coverage discovery; original teaching content only.

## D-0002 — Repository
- Date: 2026-11-04
- Status: Implemented
- Decision: Private repo kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM; default branch main.
- Working branch: docs/project-foundation.

## Pending
Technology stack/hosting; database/authentication; AI provider and budget; sandbox technology; brand/design; curriculum scope/levels; privacy retention/compliance; operational SLOs.


## D-0003 — Baseline technology stack
- Date: 2026-11-05
- Status: Approved at stack-selection scope; provider-specific choices remain deferred
- Decision: TypeScript-first modular monorepo; Next.js App Router website/PWA; NestJS Node.js API; PostgreSQL with Prisma ORM 7 stable; React Native + Expo for Android/future iOS; REST/OpenAPI; pnpm workspaces + Turborepo; Vitest/React Testing Library, Jest/Nest testing utilities and Playwright; CodeMirror 6 as a prototype candidate; OpenTelemetry-compatible instrumentation and S3-compatible storage interface.
- Architecture: Start with a modular monolith, not microservices. Keep untrusted code execution outside application processes in a disposable isolated worker; no sandbox vendor selected.
- Deferred: hosting/region, managed database, authentication, AI provider/budget, sandbox vendor/runtimes, object-storage vendor, payment gateway, email/push, Redis/queues, retention and operational SLOs.
- Stability rule: use supported stable versions at implementation time; Prisma ORM 8 prerelease was not selected. Pin compatible versions and lockfiles when implementation begins.
- Rationale and alternatives: docs/D1_TECHNOLOGY_STACK_DECISION.md and docs/D1_TECHNOLOGY_STACK_MATRIX.csv.


## D-0004 — Authentication and identity architecture
- Date: 2026-11-05
- Status: Approved at provider-neutral architecture scope; implementation choices deferred
- Decision: Resolve external identities to internal UUID principals using a provider adapter; enforce server-side deny-by-default authorization with resource scopes and audited role assignments. Preserve C15 author/reviewer separation and publisher authority.
- Deferred: identity provider, OIDC/OAuth profile, web cookie/BFF vs token transport, native PKCE details, session store/lifetimes, MFA/recovery, email/SMS vendor, key management, role-grant operational authority and retention.
- Rationale, trust boundaries, threat scenarios and acceptance tests: `docs/D6_AUTHENTICATION_AND_IDENTITY_ARCHITECTURE.md`; starter role/permission matrix: `docs/D6_AUTHORIZATION_POLICY_MATRIX.csv`.
- No provider, credential store, production auth implementation or deployment is selected or claimed.


## D-0005 — Course engine architecture
- Date: 2026-11-05
- Status: Approved at logical domain/contract scope
- Decision: Separate Curriculum catalogue and prerequisite ownership from Content lesson/version ownership, C15 review/release authority, D10 progress evidence and D8 locale resolution. Use stable node IDs, versioned immutable catalogue releases, explicit prerequisite graph edges and learner-selected track-specific pathways.
- Constraints: Preserve the bounded B7–B12 curriculum and B11 dependency register; W3Schools remains the exclusive curriculum scope source. Do not infer prerequisites from display order or invent chapter/topic coverage.
- Deferred: curated vs learner-configured pathways, chapter parent/reuse model, mastery thresholds, locale fallback, D5 OpenAPI route reconciliation, D4 schema refinement, graph/cache limits and release rollback details.
- Rationale, contracts and future tests: `docs/D7_COURSE_ENGINE_ARCHITECTURE.md`; logical entity additions: `docs/D7_COURSE_ENTITY_MATRIX.csv`; lifecycle transitions: `docs/D7_COURSE_LIFECYCLE_STATE_MACHINE.csv`.


## D-0006 — Language engine architecture
- Date: 2026-11-05
- Status: Approved at logical locale and localization-contract scope
- Decision: Support exactly `te`, `en`, `ml`, `kn`, `ta`, `hi`; explicit route/user choice outranks device negotiation; never silently substitute a lesson or assessment language. Separate UI fallback from learning-content availability. Preserve locale-neutral lesson identity, immutable locale versions, protected code/token payloads and semantic parity. Require C2–C9 rules and C15 human approval.
- Deferred: default UI locale, UI-only fallback policy, anonymous preference retention, per-release locale completeness policy, English spelling convention, font stacks and D4/D5 refinements.
- Evidence: `docs/D8_LANGUAGE_ENGINE_ARCHITECTURE.md`, `docs/D8_SUPPORTED_LOCALE_REGISTRY.csv`, `docs/D8_LOCALIZATION_PARITY_MATRIX.csv`.
- No locale runtime, translation corpus, provider or migration is implemented; tests are specified, not executed.


## D-0007 — Provider-neutral AI engine architecture
- Date: 2026-11-05
- Status: Approved at logical architecture and contract specification scope; provider/model selection deferred
- Decision: Implement AI capabilities through a policy-gated orchestration module and replaceable provider adapters. Allow only explicit task IDs and versioned schemas. Treat prompts, context and model outputs as untrusted; enforce server-side authorization, data minimization, safety checks, deterministic validation, usage budgets, idempotency and audit evidence.
- Authority boundary: AI may produce learner responses and versioned content drafts. It cannot expand W3Schools-derived curriculum scope, execute code, change answer keys/mastery, grant permissions, approve C14/C15 gates or publish. Content drafts require C14 evidence and C15 hash-bound human approval.
- Privacy: no sensitive learner data or secrets sent to providers by default. Provider retention/training terms, processing region, consent/legal basis, raw prompt retention, quotas and budget remain open pending security/privacy and commercial review. No provider/model is selected.
- Evidence: `docs/D9_AI_ENGINE_ARCHITECTURE.md`, `docs/D9_AI_TASK_AND_CAPABILITY_MATRIX.csv`, `docs/D9_AI_DATA_CONTRACT_MATRIX.csv`.
- No runtime, provider integration, database migration, API endpoint, evaluation corpus or executed tests are claimed.


## D-0008 — Learner progress engine architecture
- Date: 2026-11-05
- Status: Approved at logical domain and contract specification scope
- Decision: Use append-only, server-authoritative, version-bound learner evidence events as the durable source of progress; derive rebuildable node/pathway projections. Separate activity, completion and mastery. Evaluate progression using D7's published prerequisite graph and versioned evidence policies.
- Authority boundaries: D10 owns progress state and projections; C12 owns assessment definitions/scoring; C13 owns project rubrics; D7 owns curriculum/prerequisites; D6 owns identity/authorization. Only authenticated owning services may submit evaluator results. AI and clients cannot set scores, completion, mastery or exemptions.
- Constraints: Duplicate writes are idempotent; corrections are compensating audited events; historic evidence retains its original content/catalogue/policy versions. Initial offline mode remains read-only for authoritative progress.
- Deferred: completion criteria, mastery thresholds/recency, cross-version evidence reuse, section-level progress, retention, exact D5 routes, projection worker and SLOs.
- Evidence: `docs/D10_PROGRESS_ENGINE_ARCHITECTURE.md`, `docs/D10_PROGRESS_EVENT_CATALOG.csv`, `docs/D10_PROGRESS_DATA_CONTRACT_MATRIX.csv`, `docs/D10_PROGRESS_WORKFLOW_STATE_MACHINE.csv`.
- No runtime, schema migration, API endpoint or executed test is claimed.


## D-0009 — Admin panel architecture
- Date: 2026-11-05
- Status: Approved at logical product, role and contract specification scope
- Decision: Provide a protected admin workspace with permission-filtered operational workspaces and backend-enforced, deny-by-default scoped authorization. Keep admin UI separate from module authority: D7 curriculum, C15 review/release, D8 localization, D9 AI, D10 progress and D6 identity remain owners of their respective data and decisions.
- Separation of duties: authors cannot approve/publish own work; reviewers act only within assigned qualifications/locale; publishers release only frozen versions with all current mandatory gates; auditors are read-only; support and progress access is purpose-limited.
- Security: audit every privileged action; use scoped/time-bound grants, independent approval for sensitive changes, and reviewed break-glass access. No admin UI access to raw DB, arbitrary code, secrets or direct learner score/mastery mutation.
- Deferred: final role grant authority, MFA/dual-control, break-glass duration, exact D5 routes, D4 audit persistence, privacy/retention, queue SLAs and analytics thresholds.
- Evidence: `docs/D11_ADMIN_PANEL_ARCHITECTURE.md`, `docs/D11_ADMIN_PERMISSION_MATRIX.csv`, `docs/D11_ADMIN_DATA_CONTRACT_MATRIX.csv`, `docs/D11_ADMIN_WORKSPACE_MATRIX.csv`.
- No admin UI, API, migration, permission seed or tests are implemented/executed.


## D-0010 — Payment architecture
- Date: 2026-11-05
- Status: Approved at provider-neutral logical architecture and contract specification scope
- Decision: Preserve the initial-free launch model. Define separate Product/Pricing, Order, Payment, Subscription, Refund, Entitlement, Provider Adapter, Reconciliation and Audit boundaries. Use hosted provider checkout, server-authoritative verified provider evidence, append-only financial history, idempotent commands/webhooks and a transactional outbox for entitlement evaluation.
- Security: Platform must not receive/store/log PAN, CVV, PIN, OTP or raw payment credentials. Client redirects never prove payment. Paid entitlement requires verified payment and policy evaluation; AI and ordinary admins cannot set payment success or grant access.
- Deferred: gateway/merchant entity/markets, price catalogue, currency and settlement, GST/tax/invoices, refund/cancellation/trial rules, recurring mandate, fraud controls, PCI scope, retention, exact API schemas and provider SLA.
- Evidence: `docs/D12_PAYMENT_ARCHITECTURE.md`, `docs/D12_PAYMENT_STATE_MACHINE.csv`, `docs/D12_PAYMENT_DATA_CONTRACT_MATRIX.csv`.
- No gateway, merchant account, live transaction, endpoint, migration or executed test is selected/implemented/claimed.


## D-0011 — Module communication
- Date: 2026-11-05
- Status: Approved at architecture specification scope
- Decision: Retain modular monolith and direct application ports by default. Use transactional outbox/inbox and at-least-once idempotent event delivery for justified async workflows. No broker is selected.
- Security: Module ownership and authorization remain authoritative; no direct cross-module repository writes or secrets/payment credentials in event payloads.
- Evidence: docs/D13_MODULE_COMMUNICATION_ARCHITECTURE.md. No runtime, worker, migration or tests are implemented.


## D-0012 — End-to-end system data flow
- Date: 2026-11-05
- Status: Approved at logical data-flow specification scope
- Decision: Connect D1–D13 through explicit end-to-end journeys with authoritative module ownership, validated trust boundaries, D5 external API contracts and D13 internal application-port/event communication. Preserve separate payment and entitlement authority; separate assessment/project source evidence from D10 progress projections; keep AI output draft/assistance-only and C15 human approval authoritative; make asynchronous pending/reconciliation states explicit.
- Rationale and evidence: `docs/D14_END_TO_END_SYSTEM_DATA_FLOW.md` defines registration, course/content delivery, assessment/progress, AI, payment/entitlement, admin review/publishing, notifications, failure recovery, reconciliation, audit, security, privacy, observability and 56 future test scenarios.
- Limitations: This is a logical architecture decision only. No endpoint, migration, provider, worker, UI, deployment or production integration was implemented. Future tests are specified, not executed.
- Next: D15 — Approve system architecture.


## D-0013 — System architecture conditional approval
- Date: 2026-11-05
- Status: Approved as logical architecture baseline; implementation remains gated
- Decision: Approve D1–D14 as the coherent system architecture baseline for progression to Stage E security design and Stage F quality engineering. Do not treat this as production readiness or permission to begin implementation/enable payment, AI provider, content publishing or code execution.
- Reconciliations: D3 Assessment/Progress dependency cycle removed; Project, Payment and Entitlement boundaries clarified; D4 internal principal separated from external identity link and durable inbox receipt added; D5 billing candidate routes reconciled with D12; D5 progress write explicitly constrained to append-only evidence ingestion.
- Mandatory conditions: D15 GATE-01–GATE-15 in `docs/D15_SYSTEM_ARCHITECTURE_APPROVAL.md` must be closed with evidence before relevant implementation or production enablement. These include unified persistence contracts, exact API schemas, identity/session decisions, AI/payment provider review, entitlement policy, worker operations, sandbox security, privacy/retention, backup/restore and CI/release controls.
- Evidence: `docs/D15_SYSTEM_ARCHITECTURE_APPROVAL.md` and reconciled D3/D4/D5 supporting documents.
- Verification boundary: Documentation and repository consistency review only. 35 future architecture checks are specified, not executed. No code, migration, integration, security test or deployment is claimed.
- Next: E1 — Threat modelling.


## E-0001 — Platform-wide security threat model
- Date: 2026-11-05
- Status: Approved as the architecture-level threat-model baseline; detailed controls and security approval pending E2–E15.
- Decision: Use the E1 threat model and machine-readable register as the security risk baseline for the platform. Map threats to trust boundaries, assets, owners, D15 gates and downstream security tasks. Update it when architecture/data flows/providers/privileged capabilities change.
- Evidence: `docs/E1_SYSTEM_SECURITY_THREAT_MODEL.md`, `docs/E1_THREAT_REGISTER.csv`, updated `docs/SECURITY_CONSTITUTION.md`.
- Coverage: Seven trust boundaries, 20 baseline assets, STRIDE analysis, 30 threats with inherent/provisional residual ratings, 15 D15 gate mappings, monitoring indicators and 24 future verification scenarios.
- Non-acceptance: Sandbox execution remains disabled; Critical/High risks are not accepted by documentation alone. Residual High risks require named ownership, evidence, compensating controls and E15 approval.
- Verification boundary: Documentation review only. No implementation, provider/network configuration, penetration test, automated security test, vulnerability scan, restore drill or production control validation is claimed.
- Next: E2 — Network protection.


## E-0002 — Network protection architecture
- Date: 2026-11-05
- Status: Approved as a provider-neutral network security design baseline; deployment and verification pending.
- Decision: Adopt logical zones Z0-Z7 and default-deny ingress/egress with explicit, owned and observable flows. Require protected public ingress/origins, TLS 1.2 minimum (TLS 1.3 preferred), least-privilege private data/worker connectivity, SSRF-safe egress, DNS protection, environment/CI isolation, network telemetry and fail-closed security behavior.
- Sandbox constraint: Learner code execution remains disabled until E9, L13-L15 and E15 evidence/approval. Future execution network has no path to application/data/worker/control-plane/metadata/other-tenant networks and default-deny egress.
- Evidence: docs/E2_NETWORK_PROTECTION_ARCHITECTURE.md, docs/E2_NETWORK_CONTROL_MATRIX.csv (32 controls), docs/E2_NETWORK_VERIFICATION_CATALOG.csv (30 future scenarios).
- Deferred: Hosting vendor/region/topology, edge/WAF/DDoS, DNS/certificate products, CIDR/firewall rules, workload identity technology, provider allowlists, SIEM/retention, sandbox technology and operational SLOs.
- Verification boundary: Documentation review only. No network configuration, infrastructure scan, TLS/DNS test, penetration test or production control validation is claimed. Future scenarios are not executed.
- Next: E3 — security design.


## E-0003 — Application security architecture
- Date: 2026-11-05. Status: Design baseline complete; implementation and verification pending.
- Adopt the E3 application request, access-control, validation, safe-output, browser, file, privacy, audit, AI, payment, admin and asynchronous-processing requirements.
- Evidence: docs/E3_APPLICATION_SECURITY_ARCHITECTURE.md; docs/E3_APPLICATION_SECURITY_CONTROL_MATRIX.csv (40 controls); docs/E3_APPLICATION_SECURITY_VERIFICATION_CATALOG.csv (40 future scenarios).
- No application code or tests are claimed. Scenarios remain unexecuted. Learner code execution remains disabled pending E9, L13-L15 and E15 approval.
- Next: E4.


## E-0004 — Identity and authentication security
- Date: 2026-11-05; design baseline approved; implementation and verification pending.
- Adopt E4 identity lifecycle, federation validation, MFA/recovery, session revocation, principal handoff, service identity, abuse and audit requirements.
- Evidence: docs/E4_IDENTITY_AUTHENTICATION_SECURITY.md; docs/E4_IDENTITY_AUTHENTICATION_CONTROL_MATRIX.csv (42 controls); docs/E4_IDENTITY_AUTHENTICATION_VERIFICATION_CATALOG.csv (48 future scenarios).
- Provider, credential ownership, MFA policy, session technology/lifetime, key management and recovery policy remain deferred. No implementation or tests are claimed; scenarios are unexecuted.
- Learner code execution remains disabled until E9, L13-L15 and E15 approval. Next: E5.


## E-0005 — Authorization and role security
- Date: 2026-11-05; approved as a logical policy and governance baseline; implementation and verification pending.
- Adopt deny-by-default authorization, server-side mutation-boundary enforcement, hybrid RBAC/contextual scope checks, granular permission identifiers, bounded role bundles, separation of duties, independent expiring grants, privileged-action step-up/dual approval, time-limited break-glass, cache invalidation, service identity isolation and auditable policy decisions.
- Evidence: docs/E5_AUTHORIZATION_ROLE_SECURITY_ARCHITECTURE.md; docs/E5_PERMISSION_CATALOG.csv (44 identifiers); docs/E5_ROLE_PERMISSION_MATRIX.csv (15 candidate roles); docs/E5_AUTHORIZATION_CONTROL_MATRIX.csv (50 controls); docs/E5_AUTHORIZATION_VERIFICATION_CATALOG.csv (55 future scenarios).
- Deferred: policy engine, final role membership, tenant model, approval matrix, assurance thresholds, revocation SLA, cache TTL and audit retention. No implementation or tests are claimed; scenarios are unexecuted.
- Learner code execution remains disabled until E9, L13-L15 and E15 approval. Next: E6 — database security.


## E-0006 — Database security hardening
- Date: 2026-11-05; design baseline complete; implementation and verification pending.
- Adopt least-privilege database identities, explicit PostgreSQL grants, privileged-function hardening, server-derived tenant context, conditional RLS, parameterized query requirements, integrity constraints, validated TLS, encryption/key governance, separate migration authority, protected backups/restores, audit integrity and derived-data lifecycle controls.
- Evidence: docs/E6_DATABASE_SECURITY_HARDENING.md; docs/E6_DATABASE_SECURITY_CONTROL_MATRIX.csv (58 controls); docs/E6_DATABASE_SECURITY_VERIFICATION_CATALOG.csv (52 future scenarios).
- Deferred: database host/provider/region, tenant model and RLS decision, KMS, connection pooler, audit/backup products, RPO/RTO and retention. No database configuration, migration, role, RLS, encryption, backup/restore or test is claimed; scenarios are unexecuted.
- Learner code execution remains disabled until E9, L13-L15 and E15 approval. Next: E7 — API security.


## E-0007 — E11 Privacy and data protection (canonical mapping corrected)
- Date: 2026-11-05; design baseline complete; implementation and jurisdiction-specific legal review pending.
- Adopt purpose-bound processing, data inventory/classification, minimization, granular consent where relied upon, transparent notices, authenticated rights workflows, processor review, restricted AI data sharing, child-user review gates, retention/deletion propagation, legal-hold governance and privacy incident response.
- Evidence: docs/E11_DATA_PROTECTION_PRIVACY_SECURITY.md; docs/E11_PRIVACY_CONTROL_MATRIX.csv (48 controls); docs/E11_PRIVACY_VERIFICATION_CATALOG.csv (38 future scenarios).
- Deferred: controller/entity and launch jurisdictions, lawful basis per purpose, child-user model, processor/AI providers, cross-border transfer mechanism, retention durations, rights SLA, legal holds and breach notification process. No legal opinion, DPIA, UI, contracts, workflows or tests are claimed; scenarios are unexecuted.
- Learner code execution remains disabled until E9, L13-L15 and E15 approval. Next: E7 — API security.


## E-0008 — API security
- Status: Design baseline complete; implementation and verification pending (2026-11-05).
- Evidence: `docs/E7_API_SECURITY_ARCHITECTURE.md`, `docs/E7_API_SECURITY_CONTROL_MATRIX.csv` (60 controls), `docs/E7_API_SECURITY_VERIFICATION_CATALOG.csv` (56 future scenarios).
- No API implementation or tests are claimed. Next: E8 — AI prompt injection protection.


## E-0009 — AI prompt injection protection
- Status: Design baseline complete; implementation and verification pending (2026-11-05).
- Adopt untrusted-context handling, task-scoped context minimization, retrieval authorization/provenance, no-tool-by-default AI tasks, deterministic tool authorization, strict output validation, cross-user isolation, privacy controls, adversarial evaluation and kill-switch requirements.
- Evidence: `docs/E8_AI_PROMPT_INJECTION_PROTECTION.md`; `docs/E8_AI_SECURITY_CONTROL_MATRIX.csv` (65 controls); `docs/E8_AI_SECURITY_VERIFICATION_CATALOG.csv` (60 future scenarios).
- No provider, classifier, retrieval ACL, tool broker, runtime mitigation or tests are claimed. Next: E9 — code execution sandbox security.


## E-0010 — Secure code execution sandbox
- Date: 2026-11-05; architecture complete; implementation and enablement pending.
- Evidence: `docs/E9_CODE_EXECUTION_SANDBOX_SECURITY.md`, `docs/E9_SANDBOX_SECURITY_CONTROL_MATRIX.csv` (70 controls), `docs/E9_SANDBOX_SECURITY_VERIFICATION_CATALOG.csv` (60 future scenarios).
- Execution remains disabled until L13-L15 readiness, E14 independent test evidence and E15 explicit approval. No runtime or tests are claimed.
- Next: E10 — payment security.
