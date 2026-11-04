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
