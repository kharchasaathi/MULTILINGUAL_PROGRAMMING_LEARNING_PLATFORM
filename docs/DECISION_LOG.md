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
