# D13 — Module Communication Architecture

**Status:** Complete at logical architecture and contract specification scope  
**Date:** 2026-11-05  
**Depends on:** D1–D12  
**Decision:** D-0011  
**Baseline:** TypeScript strict, NestJS modular monolith, PostgreSQL/Prisma ORM 7, REST/JSON /api/v1, OpenTelemetry-compatible observability  
**Scope:** No broker, queue vendor, transport library, worker runtime, outbox table, endpoint or executable integration is implemented.

## 1. Purpose and governing principles

D13 defines communication between bounded modules inside the modular monolith and durable asynchronous delivery without premature microservices. It covers ownership, call direction, event contracts, transactional outbox/inbox, retries, ordering, versioning, failure handling and observability.

1. Start with in-process synchronous use-case calls inside one NestJS deployment. Do not introduce network calls or a broker between modules by default.
2. A module owns its domain state, invariants, repositories and public application interface. Other modules never read/write its tables directly.
3. Cross-module synchronous calls use explicit exported application contracts, not internal entities, repositories or ORM models.
4. Use asynchronous events only when temporal decoupling, independent retry, fan-out or long-running work is justified.
5. Persist state change and outbox event atomically in the same PostgreSQL transaction.
6. Delivery is at-least-once. Consumers must be idempotent; do not claim exactly-once transport.
7. Events are versioned, minimal, immutable facts. Consumers fetch authorized details from the owning module when needed.
8. Eventual consistency is explicit; pending, retrying and completed are distinct states.
9. Never publish secrets, credentials, raw payment data, full learner content or unnecessary personal data.
10. Provider/webhook payloads, AI output, user content and event payloads are untrusted until validated.
11. Preserve D6 authorization, C15 approval, D7 curriculum, D8 locale, D9 AI, D10 progress, D12 payment and domain ownership.
12. Modular monolith remains the default deployment. Broker adoption or module extraction requires measured need and a recorded decision.

## 2. Communication styles

| Pattern | Use when | Consistency | Initial mechanism |
|---|---|---|---|
| Direct synchronous application call | Immediate bounded result | Same request/local transaction where safe | NestJS exported application port |
| Synchronous HTTP API | Web/mobile client or approved external integration | Request/response | D5 REST /api/v1 |
| Asynchronous internal event | Retry, fan-out or long-running work | Eventual | PostgreSQL outbox + worker + inbox |
| Scheduled reconciliation/job | Periodic comparison, expiry or repair scan | Eventual | Worker claims bounded batches |
| External provider webhook | Provider-originated notification | Eventual and untrusted | Isolated ingress → durable inbox/outbox |

Do not use async messaging to hide unclear dependencies. Do not call another module's repository. Do not create distributed transactions. Define timeout, failure mapping and safe-retry behavior for every critical synchronous call.

## 3. Module ownership and communication map

| Producer/caller | Target | Contract/purpose | Default mode | Authority |
|---|---|---|---|---|
| Identity D6 | All protected use cases | Trusted principal and authorization context | Sync request context | D6 |
| Curriculum D7 | Content | Stable curriculum node/version reference | Sync query/command port | D7 |
| Content | Review C15 | Submit immutable content package/hash | Sync command then async status | Content/C15 |
| Review C15 | Content/Release | Approved version/hash and publish eligibility | Sync command; async release event | C15 |
| Locale D8 | Content/Review | Locale version, glossary and parity evidence | Sync query; async validation when long-running | D8/C15 |
| Assessment C12 | Progress D10 | Versioned evaluated attempt evidence | Async event after authoritative evaluation | C12/D10 |
| Project C13 | Progress D10 | Versioned rubric/milestone evidence | Async event | C13/D10 |
| Course D7 | Progress D10 | Published catalogue/prerequisite snapshot | Sync query; release event | D7/D10 |
| AI D9 | Content/Locale | Draft suggestions only | Sync bounded request or async task | D9; human/C15 authority |
| Payment D12 | Entitlement | Verified payment/refund/subscription facts | Async outbox event | D12/Entitlement |
| Entitlement | Learner API | Effective access decision | Sync query | Entitlement |
| Progress D10 | Learner API/Analytics | Projection summaries and diagnostics | Sync query; async projection event | D10 |
| Admin D11 | Domain modules | Authorized application commands | Sync port; async for long tasks | Owning domain |
| Notification | Learner | Approved delivery request | Async | Notification policy |
| Audit | Domain modules | Privileged/security/financial audit facts | Sync append or transactional outbox | Audit policy |

This is a contract map, not permission to bypass the owning module. Exact ports are finalized during implementation.

## 4. Dependency and synchronous contract rules

- Dependencies point to stable application contracts; avoid cyclic imports.
- Domain layer does not depend on NestJS, Prisma, broker SDKs or provider SDKs.
- Application layer orchestrates use cases and ports; infrastructure implements adapters.
- Consumer cannot mutate producer-owned records; it invokes the producer's public command/query contract.
- Shared packages contain only primitive IDs, validated envelope types and error primitives, not shared mutable domain models.
- Never pass ORM objects, live entity references, HTTP request objects or provider SDK types across module boundaries.
- Cross-module writes requiring atomicity must be redesigned as one owning use case or explicit saga/compensation; never simulate distributed ACID.
- Architecture tests detect forbidden imports, repository leakage and dependency cycles.
- A synchronous port defines operation/version, validated input, actor context where relevant, result, stable errors, timeout, idempotency and transaction ownership.
- Target module rechecks ownership, authorization, scope and current state. Queries have no hidden side effects.
- Return minimum necessary data. Use references and authorized follow-up reads for sensitive or large data.
- Do not hold database transactions open during provider, AI or slow network calls.
- A timeout does not prove a side-effecting operation failed; use idempotency and status lookup before retry.

## 5. Event envelope and versioning

Each internal integration event has:
- eventId: unique opaque event identifier.
- eventType: stable namespaced fact, e.g. billing.payment-succeeded.
- eventVersion: positive integer schema version.
- occurredAt: producer UTC timestamp, informational only.
- recordedAt: server/database UTC timestamp when durably recorded.
- producer: owning module identifier.
- aggregateType, aggregateId and aggregateVersion: source identity/version.
- correlationId: end-to-end workflow correlation.
- causationId: nullable command/prior event identifier.
- traceContext: validated propagation fields, never secrets.
- data: minimal event-specific validated payload.
- dataClassification: routing/redaction classification.

Runtime-validate on publish and consume. Events are immutable facts; corrections are new compensating facts. No arbitrary untyped JSON or serialized ORM models. Do not include tokens, API keys, secrets, PAN/CVV/OTP/PIN, raw AI prompts or unnecessary PII. Prefer IDs and version references; consumers fetch details from the owner with their own authorization.

Compatible evolution is additive optional fields. Breaking schema or semantic changes require a new event version and consumer migration plan. Unknown event types/versions are quarantined and alerted, not silently interpreted.

## 6. Transactional outbox and inbox

### Producer outbox
1. Begin owning-module database transaction.
2. Validate command and transition owned aggregate.
3. Insert domain state and outbox event in the same transaction.
4. Commit.
5. Dispatcher claims unpublished rows using a safe lease/concurrency strategy.
6. Publish to internal dispatcher/transport and record delivery attempt/result.
7. Crash after publish but before marking may cause redelivery; consumer idempotency is mandatory.

Outbox fields: event ID/envelope, aggregate sequence/version, created time, attempts, next attempt, lease owner/expiry, published time, last error code and retention metadata. No secrets or unredacted sensitive payloads.

### Consumer inbox
1. Validate envelope and supported event version.
2. Insert receipt with unique consumer ID + event ID.
3. If already processed, acknowledge duplicate without reapplying side effect.
4. Apply consumer-owned projection/side effect in the same transaction as inbox completion where possible.
5. Commit and acknowledge.
6. On failure, leave retryable state; never mark processed prematurely.

Outbox/inbox tables are logical proposals; D4 owns persistence standards. Retention/partitioning/cleanup need operational policy. A future broker transports envelopes but does not replace durable outbox/inbox.

## 7. Delivery, ordering, retry and poison events

- Delivery is at-least-once; never promise exactly-once.
- Global ordering is not guaranteed. Where required, sequence by aggregate ID/version; consumers detect gaps and defer/reconcile.
- Unrelated aggregates may process concurrently.
- Use bounded exponential backoff with jitter and maximum retry policy; exact intervals/counts are operational decisions.
- Classify transient failures (retry), permanent/schema-invalid (quarantine), stale-version conflicts (reload/reconcile), and authorization/policy denials (reject and alert where appropriate).
- Poison events enter restricted dead-letter/quarantine storage with reason, redacted payload, attempts and trace IDs.
- Replay requires authorized operator action, preserves original event ID, records replay metadata and relies on idempotent consumers. Never edit original event.
- No unbounded hot retry loops. Apply concurrency caps, queue-age alerts and circuit breakers for external providers.
- Reconciliation compares source-of-truth state; it does not invent success or mutate another module's data.
- Consumer outage must not block unrelated synchronous journeys unless immediate consistency is explicitly required.

## 8. Sagas and long-running workflows

Use a process manager/saga only when a business process spans modules and cannot complete in one local transaction. Record saga ID, current step/state, deadlines, attempts, correlation and compensation status.

Each step is an idempotent command to its owning module, with timeout, retry classification and terminal handling. Compensation is a new domain action, not a cross-module database rollback. Failed compensation remains COMPENSATION_REQUIRED and alerts an operator.

Payment checkout/refund/entitlement remain separate D12/D11 workflows. Payment events never directly edit entitlement tables outside the entitlement owner. Content publication remains C15-authoritative. Avoid a generic saga framework until a concrete workflow justifies it.

## 9. Security, privacy and trust boundaries

- Authenticate external webhook ingress separately and verify signatures before accepting provider facts.
- Authorize commands at the owning module; event receipt does not grant user permission.
- Validate producer/transport trust and schemas; an internal event is not inherently trustworthy if source data was untrusted.
- Encrypt transport/storage per E-stage decisions; restrict dispatcher/consumer database and queue permissions.
- Redact sensitive fields in logs, traces, dead letters and dashboards.
- Prevent event injection, replay, spoofed producer, oversized payload, schema confusion, mass assignment and cross-learner IDOR.
- Apply payload size limits, rate limits, bounded retries and resource quotas.
- Audit privileged replay, manual reconciliation and compensating commands.
- Keep payment data minimized; never put cardholder secrets in events.
- Learner content, AI output and uploaded metadata remain untrusted and safely encoded.

## 10. Observability and operations

Every command/event/worker carries correlation and trace context. Measure publish/receive/process/retry/duplicate/quarantine/completion counts; outbox oldest pending age and backlog; consumer lag/latency/failure; retry distribution and dead-letter count; per-event/per-consumer success; aggregate sequence gaps; reconciliation findings; saga age/stuck steps/compensation failures; provider timeouts and circuit-breaker state.

Use structured logs and OpenTelemetry-compatible traces/metrics. Never log sensitive payloads. Alerts need an owner, severity, runbook and actionable threshold. Vendor, retention, SLO and alert thresholds remain open.

## 11. Initial implementation strategy

Phase 1: direct in-process application ports and module dependency architecture tests.  
Phase 2: PostgreSQL outbox/inbox and bounded worker for workflows needing durable async delivery.  
Phase 3: measure throughput, latency, operational burden and isolation needs. Only then evaluate a broker; record an ADR and migration plan first.  
Phase 4: extract a service only with demonstrated scaling, isolation, availability or team-ownership need and a distributed failure/data ownership design.

Do not choose Kafka, RabbitMQ, Redis Streams, cloud queues or any broker vendor in D13. D1's modular monolith remains approved.

## 12. Acceptance and future tests

Architecture acceptance: communication pattern selection, module ownership, dependency rules, sync contracts, event envelope/versioning, outbox/inbox, delivery semantics, ordering, retry/quarantine, saga compensation, security/privacy, observability and phased implementation documented.

Future tests (not executed):
1 forbidden cross-module repository/internal-entity import is detected;
2 dependency graph has no forbidden cycles;
3 application port validates runtime input;
4 unauthorized caller rejected by owning module;
5 sync query has no hidden mutation;
6 same idempotency key does not duplicate command effect;
7 producer state and outbox commit atomically;
8 rollback leaves neither state nor event;
9 dispatcher crash after publish safely redelivers;
10 inbox uniqueness blocks duplicate side effect;
11 consumer effect and inbox completion are atomic;
12 invalid schema is quarantined;
13 unknown event version is not silently processed;
14 breaking schema requires new version;
15 consumer detects aggregate sequence gap;
16 unrelated aggregate events process concurrently;
17 poison event stops hot retry and alerts;
18 retry backoff is bounded and jittered;
19 replay preserves original event and records operator metadata;
20 unauthorized replay is denied and audited;
21 dead-letter payload is redacted/restricted;
22 trace/correlation survives async hops;
23 prohibited secret/PII event fields are rejected;
24 oversized event is rejected;
25 spoofed producer is rejected;
26 webhook signature verified before durable acceptance;
27 provider timeout does not hold DB transaction open;
28 saga step retry is idempotent;
29 failed compensation enters operator-visible state;
30 payment event cannot bypass entitlement owner;
31 C15 release event cannot bypass approval gates;
32 D10 projection cannot mutate source assessment evidence;
33 consumer outage does not block unrelated sync modules;
34 outbox backlog/lag metrics and alerts work;
35 reconciliation detects missed events without inventing state;
36 event contains no PAN/CVV/OTP/PIN or provider secrets;
37 consumers enforce learner/resource scope;
38 schema migration supports old/new consumer compatibility;
39 worker concurrency caps prevent exhaustion;
40 outbox/inbox recovery works after process restart.

## 13. Deferred decisions and handoff

Open: worker runtime/scheduler; broker adoption threshold/vendor; event retention/partitioning; retry intervals/max attempts; aggregate sequence strategy; dead-letter retention/replay approval; encryption/key management; trace sampling/telemetry vendor; queue SLOs/alerts; schema registry tooling; exact cross-module ports; saga operator experience.

**Next task: D14 — Design end-to-end system data flow.**
