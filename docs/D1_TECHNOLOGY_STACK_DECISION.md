# D1 — Technology Stack Selection

**Status:** Complete — baseline stack selected; provider-specific choices explicitly deferred  
**Date:** 2026-11-05  
**Decision record:** D-0003 in `docs/DECISION_LOG.md`  
**Scope:** Select the application technology families and engineering toolchain. D1 does not design detailed module boundaries, database schemas, API endpoints, identity flows, hosting topology or sandbox isolation; those are later D2–D15/E tasks.

## 1. Decision summary

Adopt a **TypeScript-first modular monorepo** with a website-first delivery path:

| Layer | Selected baseline | Use |
|---|---|---|
| Language | TypeScript, strict mode | Web, API, mobile and shared contracts |
| Web | React + Next.js App Router | Responsive website, server rendering and web application |
| Styling | Tailwind CSS with accessible semantic components | Responsive UI and design-system implementation |
| API/backend | Node.js LTS + NestJS | Modular backend application and versioned REST API |
| API description | OpenAPI generated from backend contracts | API documentation and future client generation |
| Primary database | PostgreSQL | Relational learning, content, review, assessment and progress data |
| Data access/migrations | Prisma ORM 7 stable line | Typed data access and reviewed, versioned migrations |
| Mobile | React Native + Expo + TypeScript | Android app; future iOS app |
| Web PWA | Next.js web app with standards-based manifest and service worker | Installable web experience and controlled offline capability |
| Monorepo/package manager | pnpm workspaces + Turborepo | Shared packages, reproducible installs and task orchestration |
| Web unit/component tests | Vitest + React Testing Library | Fast isolated tests for web/shared packages |
| Backend tests | Jest + Nest testing utilities | Unit and service integration tests |
| Browser E2E | Playwright | Critical learner/admin browser journeys |
| Mobile tests | Expo-compatible Jest/React Native Testing Library; device E2E tool selected in implementation | Component and device-level coverage |
| Static quality | TypeScript compiler, ESLint, Prettier | Type, lint and formatting gates |
| Code editor | CodeMirror 6, subject to prototype validation | Embedded editor with mobile-conscious footprint |
| Observability | OpenTelemetry-compatible instrumentation and structured logs | Vendor-neutral traces, metrics and logs |
| File/object storage | S3-compatible object-storage interface | Images, attachments and generated assets; vendor not selected |

Pin supported, mutually compatible stable versions in lockfiles when implementation starts. Do not use prerelease, release-candidate or experimental core dependencies in production without a separate recorded exception and risk review.

## 2. Why this stack

### 2.1 One primary programming language

TypeScript across web, backend, mobile and shared contracts reduces context switching and allows strict types to be shared across API clients and domain packages. It does not eliminate runtime validation: every external request, persisted payload, AI response and imported file must still be validated at trust boundaries.

### 2.2 Website-first without blocking mobile

Next.js is the primary website runtime. The PWA is an installable web delivery mode, not a separate application. Expo/React Native is selected for the later native Android and iOS clients. Shared domain types, API client contracts, validation schemas and selected pure business logic may be shared; web and native UI components must remain platform-appropriate rather than forcing one UI implementation across DOM and native controls.

### 2.3 Modular backend before microservices

NestJS provides explicit modules, dependency injection and testable service boundaries. Begin as a **modular monolith** deployed as one backend application. Do not introduce microservices, event brokers or distributed infrastructure until measured scale, isolation or operational requirements justify them.

The backend owns authorization, business rules, content publication, progress writes, AI orchestration and database access. The browser/mobile clients must not connect directly to privileged database credentials.

### 2.4 Relational data as the source of truth

PostgreSQL is the primary system of record because users, courses, topic mappings, lessons, locale versions, review decisions, assessment attempts and progress have relational constraints and transactional workflows. JSON/JSONB may hold bounded flexible content blocks where appropriate; it must not replace relational keys, constraints or validated schemas.

Prisma ORM 7 stable is selected for typed access and migration workflow. Prisma ORM 8 is not selected for the baseline because current documentation identifies it as a release candidate in the material reviewed for this decision. Reassess only after a stable release and migration compatibility review.

### 2.5 Isolated execution is a separate trust boundary

The code playground and analyzer must not execute learner code inside Next.js, NestJS, the database process or privileged application containers. D1 selects no execution provider or sandbox product. L13–L15 and E9 must define disposable isolated workers, CPU/memory/time/process/filesystem/network limits, no network by default, output limits, cleanup, patching and escape testing before execution can be enabled. Static parsing and syntax analysis should be preferred where execution is unnecessary.

## 3. Repository and workspace layout target

The intended monorepo layout is:

```text
/
├── apps/
│   ├── web/                 # Next.js website and PWA
│   ├── api/                 # NestJS modular backend
│   └── mobile/              # Expo React Native app
├── packages/
│   ├── contracts/           # Versioned API and event contracts
│   ├── domain/              # Pure domain rules; no framework imports
│   ├── validation/          # Runtime schemas at trust boundaries
│   ├── api-client/          # Typed client generated/checked from OpenAPI
│   ├── i18n/                # Locale identifiers and UI message infrastructure
│   ├── design-tokens/       # Shared design tokens, not shared DOM components
│   └── test-utils/          # Shared test fixtures/builders
├── infra/
│   ├── local/               # Local development support only
│   └── deployment/          # Later environment-specific deployment definitions
├── docs/
└── pnpm-workspace.yaml
```

This is a target structure, not a claim that these directories or applications already exist. Exact package boundaries and dependency direction will be refined in D2–D14.

Dependency direction:
- `domain` must not import UI, framework, database or provider SDK packages.
- `contracts` and `validation` must not import application implementations.
- `web` and `mobile` call the backend through the API contract/client.
- `api` owns persistence and privileged provider access.
- Provider integrations sit behind interfaces and cannot leak provider-specific models into domain contracts.

## 4. Architectural defaults and constraints

- **API:** REST/JSON, versioned under `/api/v1`; OpenAPI is the published contract. Use idempotency keys for retryable writes where duplicate effects would be harmful.
- **Validation:** runtime schemas at every trust boundary; TypeScript types alone are not validation.
- **Database:** PostgreSQL with foreign keys, unique/check constraints, transactions and reviewed migrations. Add indexes from query evidence, not speculation.
- **Authorization:** server-side, deny by default, least privilege, per-resource checks. Database row-level security may be added as defense in depth after D4–D6 define the threat model and ownership model.
- **Localization:** stable locale IDs `te/en/ml/kn/ta/hi`; locale-specific content records; preserve code tokens and shared learning outcomes.
- **AI:** provider-neutral adapter and explicit budget/usage controls. No provider is selected in D1; generated content remains draft until C14/C15 gates pass.
- **Caching/queues:** no Redis or message broker in the initial baseline. Add only after a documented workload/consistency need; PostgreSQL remains authoritative.
- **Storage:** object storage behind an interface; exact vendor, region, retention and CDN remain undecided.
- **PWA/offline:** cache the application shell and explicitly approved public/static content only. Do not cache privileged admin pages, answer keys, private learner data or authenticated API responses by default. Offline writes require a later conflict/idempotency design.
- **Code editor:** CodeMirror 6 is the starting candidate; validate language coverage, accessibility, performance and mobile usability in a prototype before locking it.
- **Analytics:** privacy-minimized first-party events; no advertising analytics SDK is selected.
- **Deployment:** support Node.js server/container deployment; hosting vendor and region are not selected.

## 5. Alternatives considered

| Area | Selected | Alternative | Reason for selection / rejection |
|---|---|---|---|
| Web | Next.js App Router | Vite + React SPA | Next.js provides server rendering and integrated web routing; a pure SPA remains viable but would require separately designing rendering/SEO and server delivery |
| Backend | NestJS | Next.js route handlers only; Express/Fastify without framework | A dedicated API boundary supports web/mobile clients and explicit modules; avoid duplicating business rules in frontend routes |
| Mobile | Expo React Native | Separate Kotlin Android and Swift iOS apps; web wrapper only | Shared TypeScript/API contracts and future iOS path reduce duplicated client work; native-specific features remain possible |
| Database | PostgreSQL | Firestore/MongoDB | Relational constraints and transactions fit content workflow, curriculum relations, assessment and progress; document storage may still be used for bounded flexible blocks |
| ORM | Prisma ORM 7 stable | Raw SQL only; Prisma 8 prerelease | Typed model access and migrations improve consistency; avoid prerelease baseline. Critical queries may use reviewed SQL where justified |
| Architecture | Modular monolith | Microservices from day one | Lower operational burden and easier local development; split only with measured need |
| Workspace | pnpm + Turborepo | Separate repositories | Shared types/contracts and coordinated builds benefit from a monorepo; keep package boundaries strict |
| Editor | CodeMirror 6 candidate | Monaco | Start with a lighter, extensible browser editor; validate features and mobile accessibility before final adoption |

## 6. Explicitly deferred decisions

D1 does **not** select:
- Hosting/cloud vendor, deployment region, domain, CDN or managed database provider.
- Authentication/identity provider, session strategy, MFA or account recovery implementation.
- AI model/provider, model routing, embedding/vector provider, budgets or retention.
- Code execution sandbox vendor, runtime images, queue/worker infrastructure or language availability.
- Email/SMS/push provider.
- Payment gateway or billing system.
- Object-storage vendor, backup tier, retention schedule, key management or disaster-recovery targets.
- Redis, message broker, search engine or analytics vendor.
- Final CSS component library, rich-text editor, charting library or visual-diagram renderer.
- Legal/compliance interpretation, data residency or operational SLOs.

These remain open until their relevant architecture/security tasks define requirements and acceptance tests. No vendor free tier should be treated as a production guarantee.

## 7. Cost and operational guardrails

- Start with local development and free/open-source tooling where practical.
- Avoid paid managed services until usage, budget and exit strategy are documented.
- Define monthly spend limits and alerts before enabling paid AI, storage, execution or observability services.
- Keep provider adapters and exportable data formats to reduce lock-in.
- Backups, restore tests, monitoring, secret management and staged deployment are release prerequisites, not optional optimizations.
- Do not enable a paid feature or monetization flow until its business and payment architecture is approved.

## 8. Compatibility and version policy

- Use a supported Node.js LTS line compatible with the selected stable Next.js, NestJS, Expo and Prisma versions at implementation time.
- Pin package versions and commit the pnpm lockfile.
- Upgrade frameworks in controlled pull requests with changelog review, migration notes, automated tests and rollback plan.
- Avoid wildcard dependency ranges for production applications.
- Record exceptions for native modules, platform-specific packages and packages with weak maintenance/security posture.
- Keep web and mobile release compatibility with the versioned API; support an agreed compatibility window before removing API fields/routes.

## 9. D1 acceptance criteria

- A primary stack is selected for web, API, database, mobile, PWA, workspace, tests and code editor candidate.
- Website-first delivery and future Android/iOS path are explicit.
- Modular monolith is the initial backend deployment shape; microservices are not prematurely introduced.
- Data ownership and untrusted code boundaries are clear at stack level.
- Stable versus prerelease dependency policy is explicit.
- Hosting, auth, AI and sandbox vendors are not guessed or prematurely selected.
- Alternatives and trade-offs are recorded.
- D1 decision is added to the decision log and progress trackers.
- No application code, environment, database, deployment or test execution is claimed by this planning decision.

## 10. Evidence reviewed

Official project documentation reviewed on 2026-11-05:
- Next.js App Router and project setup: https://nextjs.org/docs/app
- Next.js deployment options: https://nextjs.org/docs/app/getting-started/deploying
- NestJS architecture and TypeScript: https://docs.nestjs.com/
- NestJS OpenAPI generation: https://docs.nestjs.com/openapi/introduction
- Expo universal app and TypeScript support: https://docs.expo.dev/
- Prisma ORM documentation and stable/prerelease distinction: https://www.prisma.io/docs/orm
- PostgreSQL documentation portal: https://www.postgresql.org/docs/

Documentation confirms framework capabilities, not a guarantee of suitability for every future workload. Revalidate current supported versions and package compatibility when creating the actual applications.

**D1 is complete at baseline technology-stack selection scope.**  
**Next task: D2 — Design frontend architecture.**
