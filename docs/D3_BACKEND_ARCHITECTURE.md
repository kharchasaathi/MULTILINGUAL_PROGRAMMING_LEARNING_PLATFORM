# D3 — Backend Architecture

**Status:** Complete — logical backend architecture and module boundaries documented  
**Date:** 2026-11-05  
**Depends on:** D1 technology-stack decision; D2 frontend architecture; C1–C15 content contracts  
**Baseline:** Node.js LTS, TypeScript strict, NestJS, PostgreSQL/Prisma ORM 7 stable, REST/JSON + OpenAPI  
**Deployment shape:** Modular monolith; provider-specific infrastructure remains deferred

## 1. Purpose and scope

D3 defines the backend runtime boundary, NestJS module ownership, dependency rules, request lifecycle, application/service/repository responsibilities, provider adapters, asynchronous-work policy, cross-cutting controls, observability and implementation test plan.

This is a logical architecture, not an implementation. It does not create NestJS code, Prisma schema, migrations, endpoints, queues, worker infrastructure, identity provider, hosting topology or production configuration. D4 defines persistence; D5 defines concrete API contracts; D6 defines identity/session design; later D7–D14 refine domain engines and integrations.

## 2. Architecture decisions

1. Start with one deployable NestJS **modular monolith**. Modules are independently testable but share one application runtime and PostgreSQL system of record.
2. Organize by business capability, not technical layer alone. Each module owns its use cases and persistence boundary.
3. Keep domain rules framework-independent. Controllers are transport adapters; application services orchestrate use cases; repositories encapsulate persistence.
4. Validate every external payload at runtime. TypeScript types do not validate HTTP, database JSON, AI output, uploaded files or provider responses.
5. Backend is authoritative for authorization, state transitions, scoring, publication, progress writes and paid entitlements. Client-side checks are UX only.
6. Provider SDKs are confined to adapters behind application-owned interfaces. Provider-specific types never cross into domain contracts.
7. No microservices, Redis, message broker or distributed transaction infrastructure in the initial design. Add only after measured workload or isolation requirements justify them and a decision is recorded.
8. Never execute learner-supplied code in NestJS, Next.js, a database process or a privileged application container. Any future execution is delegated to a separately designed disposable sandbox/worker trust boundary.
9. Human review/approval controls publication. AI generation and automated quality checks can create evidence or drafts but cannot approve or publish.
10. The backend exposes versioned REST/JSON contracts under the D2 convention `/api/v1`; D5 owns exact routes, request/response schemas and compatibility rules.

## 3. Runtime context and trust boundaries

```text
Web / PWA (Next.js)        Expo mobile
        | HTTPS                | HTTPS
        +----------+-----------+
                   |
          NestJS API application
   transport -> authz -> use cases -> domain
                   |          |
              adapters    repositories
                   |          |
       external providers   PostgreSQL
                   |
       isolated execution gateway
       (future; separate security design)
```

Trust boundaries:
- HTTP requests, headers, cookies/tokens, query parameters, files and client state are untrusted.
- AI prompts/completions, retrieved context and model-produced structured data are untrusted.
- Email, object storage, payment, telemetry and other provider responses are untrusted.
- Database records are trusted only after schema, ownership and invariant checks; legacy or malformed JSON must not bypass validation.
- Background-job payloads are untrusted serialized input and must be schema-validated and authorized against the initiating actor/context.
- No browser/mobile client receives database credentials, privileged provider secrets or direct database access.

## 4. NestJS module map and ownership

The authoritative module inventory is in `D3_BACKEND_MODULE_MATRIX.csv`. Initial logical modules:

| Module | Owns | Explicitly does not own |
|---|---|---|
| Platform/Core | bootstrap, configuration validation, health/readiness, request context, exception mapping | product business rules |
| Identity & Access boundary | identity-provider adapter seam, principal context, permission/policy checks | provider selection or full auth design (D6) |
| Learner & Profile | learner profile and preferences | authentication credentials |
| Curriculum & Course | curriculum catalogue, levels, modules, prerequisites and published course structure | authoring approval workflow |
| Content & Localization | lesson versions, locale variants, glossary/visual references and content retrieval | AI provider execution or reviewer authority |
| Authoring & Review | draft submission, review assignments, C14/C15 gates, immutable release workflow | bypassing publisher approval |
| Assessment | question/item definitions, attempts, answer evaluation and scoring policies | learner code execution or progress projection ownership |
| Projects | project briefs, learner submissions, milestone and rubric evidence | assessment scoring or progress projection ownership |\n| Learning Progress | enrolment/progress evidence and projections, completion and achievement calculations | client-side authoritative progress or source assessment/project evidence |
| AI Orchestration | task policy, prompt assembly, provider-neutral generation/validation workflow, usage budgets | final content approval/publication |
| Playground Gateway | editor-session and execution-request orchestration, policy checks, safe result mapping | running code inside API process |
| Asset & Media | metadata, upload authorization, object-storage adapter seam | public access to private assets |
| Notification | notification intent, templates and provider adapter seam | authentication or business-state authority |
| Payment & Billing | orders, payment/refund/subscription state, provider webhook verification and reconciliation | effective entitlement decisions or client-trusted payment state |\n| Entitlement | effective server-side access grants/revocations derived from verified payment facts and approved free/admin policy | raw payment credentials or payment-provider state authority |
| Audit & Compliance | append-only security/business audit records and access policy | unrestricted logging of payloads/secrets |

Modules may be split into smaller packages when implementation evidence requires it; do not create empty NestJS modules solely to mirror this planning table.

## 5. Layering and dependency rules

Within a capability module:

- **Transport layer:** NestJS controllers, route guards/interceptors, request/response mapping. No business decisions or direct Prisma queries.
- **Application layer:** use-case services, command/query handlers where useful, transaction orchestration, idempotency and authorization coordination.
- **Domain layer:** entities/value objects, policies, state machines and pure invariants. No NestJS, Prisma, HTTP or provider SDK imports.
- **Ports:** module-owned interfaces for repositories, clock, ID generation, storage, AI, notification, payment and execution adapters.
- **Adapters:** Prisma repositories, provider clients, storage implementations and external API clients. Translate provider errors/data into stable internal results.
- **Validation/contracts:** runtime schemas and DTO mapping at boundaries; exact shared public schemas are finalized in D5.

Dependency direction:
- Domain depends on no infrastructure or framework package.
- Application depends on its own domain and declared ports.
- Adapters implement ports and may depend on application/domain contracts.
- Controllers depend on application use cases, not repositories.
- Cross-module calls use exported application interfaces/facades; never reach into another module's tables or private repositories.
- Shared kernel stays deliberately small (IDs, clock abstraction, error primitives, locale IDs). Avoid a catch-all common module.
- Circular module dependencies are prohibited. Assessment and Project publish versioned evidence facts through D13 outbox/event contracts; Progress consumes those facts and must not be a compile-time dependency of Assessment or Project. Progress may depend on the validated event contract, not source repositories. Payment publishes verified financial facts; Entitlement consumes them and owns access grants. If two modules need mutual coordination, introduce a narrow orchestration owner or event contract.

## 6. Request lifecycle

For every API request, the intended order is:

1. Terminate insecure transport at the deployment edge; enforce request/header/body size limits and accepted content types.
2. Create request/correlation context and safe structured access metadata.
3. Apply coarse route-level authentication where required; D6 defines the actual protocol/session mechanism.
4. Parse and validate path, query, headers and body against versioned runtime schemas.
5. Resolve principal, tenant/ownership scope and locale context from trusted server-side state.
6. Enforce function-level and resource-level authorization (deny by default).
7. Apply rate/concurrency and abuse controls appropriate to the operation.
8. Invoke an application use case; enforce domain invariants and idempotency for retryable writes.
9. Execute database changes in a bounded transaction; do not hold transactions open during external network calls.
10. Map domain outcomes to stable API result/error contracts; redact internals.
11. Emit audit events for sensitive state changes and security-relevant denials.
12. Record latency, outcome and trace context without logging secrets or full learner content.

Readiness must fail when required dependencies/configuration are unavailable; liveness must not depend on optional external providers. Health endpoints disclose no secrets, stack traces or infrastructure topology.

## 7. Data access and transaction policy (D4 refines)

- PostgreSQL is the authoritative relational store. Prisma ORM 7 stable is the baseline access/migration tool.
- Only the owning module's repository may read/write its private tables. Cross-module reads use documented application queries or stable read models.
- Use foreign keys, unique/check constraints and transactions to enforce invariants at the database boundary where appropriate.
- Transaction boundaries follow one business use case; keep them short and deterministic.
- Do not make network/provider calls inside a database transaction.
- Use optimistic concurrency/version checks for mutable review/content records and other high-conflict workflows.
- Idempotency records and business writes must commit atomically for operations where retries could duplicate effects.
- Use an outbox-style durable handoff only when a committed state change must reliably trigger asynchronous work; D4/D13 must define exact schema and failure recovery before implementation.
- No unreviewed schema push or destructive migration in shared/production environments. Migrations are versioned, reviewed, tested against representative data and paired with rollback/forward-repair notes.
- Avoid speculative indexes and caching; use query plans and measured evidence.

## 8. Cross-module communication and asynchronous work

Synchronous calls:
- Use a module's exported application interface for immediate queries/commands.
- Keep call graphs acyclic and bounded; define timeouts for external adapters.
- Never expose internal ORM models as inter-module contracts.

Asynchronous work:
- Initial baseline does not select Redis, a broker, queue product or worker deployment.
- Until a durable queue is approved, do not pretend in-process fire-and-forget work is reliable. Small bounded tasks may run synchronously; noncritical work may be explicitly best-effort and observable.
- AI generation, notifications, media processing, analytics export and future code execution are candidates for asynchronous workers, but each requires idempotent job IDs, schema-versioned payloads, retry/backoff limits, dead-letter/manual-recovery policy, cancellation, timeout and audit/trace correlation.
- A worker must re-check actor authorization, resource ownership, content/version status and current policy at execution time; enqueue-time authorization alone is insufficient.
- Exactly-once execution is not assumed. Design for at-least-once delivery with idempotent effects.
- D13 owns cross-module event and communication contracts; infrastructure selection requires workload evidence and a recorded decision.

## 9. Provider adapter policy

Provider ports are defined by the owning capability; adapters translate provider-specific behavior.

| Port seam | Current decision | Required safeguards |
|---|---|---|
| Identity | Provider-neutral seam only | D6 protocol/session, recovery, MFA and account lifecycle |
| AI model | No provider selected | allowlisted tasks, schema-constrained output, prompt-injection defenses, per-user/plan budgets, timeout, redaction, provenance; output remains draft |
| Object storage | S3-compatible interface only | signed short-lived access, content-type/size validation, malware scanning policy, private-by-default, lifecycle/retention |
| Notifications | No provider selected | consent/preferences, locale templates, suppression, retry/idempotency, no secrets in messages |
| Payments | No provider selected | server-verified webhooks, signature/replay checks, idempotent ledger updates; D12 owns design |
| Code execution | No provider selected | separate disposable isolated worker, deny network by default, strict CPU/memory/time/process/filesystem/output limits, cleanup and escape testing |
| Telemetry | OpenTelemetry-compatible seam | data minimization, redaction, sampling policy and access control |

Provider adapters must have contract tests with deterministic fakes and separately controlled integration tests. No provider SDK belongs in domain packages.

## 10. Authorization and sensitive workflows

- Use deny-by-default policy checks at every protected use case, not only controller guards.
- Distinguish learner, author, locale reviewer, technical reviewer, release manager, administrator and service identities; exact role/permission model is D6/E5.
- Check resource ownership and locale scope on every read and write; avoid insecure direct object references.
- Author cannot approve own content. Reviewer qualification/conflict and content-hash freshness are checked at decision time.
- Only authorized release manager can publish an exact approved immutable manifest. AI services cannot approve or publish.
- Assessment answer keys and private drafts are protected server-side; never rely on hiding client routes.
- Entitlements are resolved server-side; client-supplied plan/status is informational only.
- Audit privileged actions, denied sensitive access, approval transitions, publication, withdrawal, entitlement changes and administrative changes.

## 11. Error model and resilience

D5 defines the exact wire schema. D3 requires stable machine-readable categories: validation, unauthenticated, forbidden, not-found (including privacy-preserving concealment where policy requires), conflict/stale-version, rate-limited, dependency-unavailable and internal failure.

- Never return stack traces, SQL, provider secrets, prompt contents or raw exception messages.
- Include a correlation/request ID and safe field-level validation details.
- Retry only transient, idempotent operations; use bounded exponential backoff with jitter in adapters/workers.
- Apply explicit timeouts and concurrency limits to external calls.
- Circuit breaking/bulkheads may be added around proven failure-prone providers; do not add complexity without evidence.
- Fail closed for authorization, approval, payment verification and policy checks.
- A failed optional provider must not make liveness fail; readiness reflects only dependencies required to serve the configured workload.
- Partial success must be explicit and represented in the contract; never silently drop a critical side effect.

## 12. Configuration, secrets and environments

- Validate configuration at startup against a strict schema; fail startup on missing/invalid required values.
- Separate local, test, staging and production configuration; no production credentials in repository or fixtures.
- Use a secret manager supplied by the eventual hosting environment; vendor not selected. Never log or expose secret values.
- Apply least-privilege database/provider credentials and rotate/revoke procedures.
- Keep feature flags server-controlled and auditable; do not use flags to bypass security or review gates.
- Use synthetic fixtures in development/test; production data must not be copied into local fixtures.
- Production rollout requires staged migration, backup/restore evidence, health checks and rollback/forward-repair plan (F-stage and G-stage tasks).

## 13. Observability and operations

- Structured logs include timestamp, severity, service/module, environment, request/correlation ID, trace/span IDs, safe actor reference and stable error code.
- Metrics cover request rate/latency/error rate, dependency latency/failures, database pool/transaction health, queue age/retries (when a queue exists), AI usage/cost (when enabled), authorization denials and publication outcomes.
- Distributed tracing uses OpenTelemetry-compatible instrumentation; redact tokens, cookies, prompts, source code, answers and personal data by default.
- Audit trail is distinct from diagnostic logs and follows C15 append-only/versioned event requirements.
- Define retention, access, alert thresholds, SLOs and incident runbooks before production; not selected by D3.
- Liveness, readiness and dependency health are separate checks. Operational endpoints are access-controlled or safely minimal.

## 14. Performance and capacity principles

- Paginate bounded catalogue/review lists; cap page size and query complexity.
- Avoid N+1 reads; use measured query plans and explicit projections.
- Bound upload sizes, AI context/output sizes, concurrency and per-principal request rates.
- Cache only public, versioned, non-sensitive content with explicit invalidation. Do not cache answer keys, private drafts, authenticated responses or learner progress by default.
- Avoid synchronous fan-out to optional providers in learner-critical paths.
- Establish load targets from product usage assumptions and measure before scaling. No numeric SLO or capacity claim is made here.

## 15. Implementation test and acceptance plan

The following are required future tests, **not executed by this architecture document**.

| ID | Scenario | Expected result |
|---|---|---|
| D3-T01 | Invalid/missing required configuration | Startup fails with safe actionable error |
| D3-T02 | Invalid request payload | Rejected before application use case |
| D3-T03 | Caller lacks role permission | Denied server-side; sensitive action audited |
| D3-T04 | Caller owns no requested resource | Denied or privacy-preserving not-found |
| D3-T05 | Module imports another module's private repository | Architecture/lint test fails |
| D3-T06 | Circular module dependency introduced | Architecture test fails |
| D3-T07 | Domain imports NestJS/Prisma/provider SDK | Dependency-boundary test fails |
| D3-T08 | Provider returns malformed/unexpected data | Adapter rejects/maps safely |
| D3-T09 | External provider times out | Bounded timeout and stable dependency error |
| D3-T10 | Retry repeats an idempotent write | One business effect; stable replay result |
| D3-T11 | Database constraint/transaction fails | No partial business state |
| D3-T12 | Worker receives malformed payload | Reject/quarantine; no privileged action |
| D3-T13 | Worker executes after authorization revoked | Re-check denies action |
| D3-T14 | AI produces valid-looking lesson | Remains draft; no approval/publication |
| D3-T15 | Author attempts own approval | Denied and audited |
| D3-T16 | Publish hash differs from approved hash | Preflight blocks release |
| D3-T17 | Learner code submitted to API | Only queued to separate approved sandbox boundary; never eval/exec in API |
| D3-T18 | API error occurs | Safe stable error; no stack/secret leakage |
| D3-T19 | Sensitive values appear in request context | Redaction prevents log emission |
| D3-T20 | Optional provider unavailable | Core liveness remains healthy; feature degrades explicitly |
| D3-T21 | Private draft requested by unauthorized learner | Denied without content leakage |
| D3-T22 | Large list/query/upload exceeds policy | Rejected or bounded before expensive work |
| D3-T23 | Database migration is destructive/unreviewed | Release gate blocks migration |
| D3-T24 | Health endpoint queried externally | Only approved minimal status disclosed |

D3 acceptance is met when module ownership and dependency direction are explicit; request, persistence, provider and async boundaries are defined; C8/C14/C15 approval controls are preserved; learner code is isolated; test scenarios and operational requirements are recorded; and all deferred decisions remain visible.

## 16. Open decisions and handoff

Still deferred: hosting/region, identity provider and session protocol, detailed roles/permissions, database schema and migration plan, exact REST routes/schemas, queue/broker/worker infrastructure, AI provider/model/budget, storage/notification/payment providers, sandbox vendor/runtime, retention, SLOs and compliance obligations.

These are not blockers to completing this logical D3 architecture, but they must be resolved in the designated D4–D15/E tasks before implementation or production enablement.

**D3 is complete at backend architecture and module-boundary specification scope.**  
**Next task: D4 — Design PostgreSQL database architecture and data ownership.**
