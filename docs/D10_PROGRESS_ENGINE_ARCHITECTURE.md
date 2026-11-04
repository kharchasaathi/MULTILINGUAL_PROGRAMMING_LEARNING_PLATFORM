# D10 — Learner Progress Engine Architecture

**Status:** Complete at logical domain, lifecycle and contract specification scope  
**Date:** 2026-11-05  
**Depends on:** B7–B12; C1–C15; D1–D9  
**Baseline:** NestJS modular monolith, PostgreSQL/Prisma ORM 7 stable, REST/JSON `/api/v1`, six locales  
**Scope:** Logical architecture only; no runtime, schema migration, API endpoint or learner data processing is implemented.

## 1. Purpose and governing decisions

D10 defines how the platform records learner activity and derives reliable progress across a learner-selected curriculum pathway. It connects D7's published course structure, D8's locale/content delivery, C12's assessment evidence and C13's project evidence without taking ownership of their domains.

**Core decisions**
1. Record authoritative progress as append-only, version-bound evidence events; derive current progress projections from those events.
2. Separate activity/engagement, completion, assessment performance and mastery. Opening a lesson is not completion; completion is not automatically mastery.
3. The backend is authoritative. Client-side progress indicators are provisional display only.
4. Progress is scoped to an authenticated learner principal, selected pathway and exact published curriculum/content versions.
5. Replays and duplicate submissions must be idempotent; event history is auditable and projections are rebuildable.
6. Prerequisite eligibility is evaluated against D7's published graph and explicit evidence policy, never inferred from lesson display order.
7. C12 owns assessment definitions/scoring rules; C13 owns project rubrics; D10 consumes their signed/versioned evaluation evidence and applies progress policy.
8. AI (D9) may explain progress or offer bounded study suggestions, but cannot write authoritative evidence, change scores, mark mastery or unlock a pathway.
9. No universal mastery threshold, attempt limit, streak rule or completion percentage is invented here. Those are policy values requiring approval and versioning.
10. No learner progress write is accepted offline as authoritative in the initial release; D2's read-only offline boundary remains.

## 2. Goals and non-goals

### Goals
- Record lesson, topic, module, assessment and project evidence with stable references.
- Support learner-selected track/pathway and version-aware enrolment.
- Derive states such as not started, in progress, completed, blocked and stale.
- Represent mastery separately and only when an approved policy's evidence requirements pass.
- Evaluate prerequisites and progression gates using D7 and B11.
- Support event replay, projection rebuild, corrections and audit.
- Expose privacy-minimized progress summaries to web/PWA/native clients.
- Provide deterministic contracts and future test scenarios.

### Non-goals
- Authoring curriculum, lesson content, assessment items or project briefs.
- Defining assessment answer keys, scoring rubrics or code execution (C12/C13 and future sandbox design own these).
- Granting paid entitlements, certificates or admin permissions.
- Inferring learning from time-on-page, clicks, AI chat volume or unverified client claims.
- Treating streaks, points, badges or leaderboard rank as proof of mastery.
- Automatically selecting a different learning track for the learner.
- Accepting offline authoritative progress writes or trusting client timestamps.
- Guaranteeing learning outcomes or using progress data as formal certification.

## 3. Domain vocabulary

| Term | Meaning |
|---|---|
| Learner principal | Authenticated internal identity from D6 |
| Pathway selection | Learner's explicit selected track/specialization and catalogue release |
| Enrolment | Learner's participation in a selected pathway/release |
| Learning node | D7 stable track, level, module, chapter, topic or lesson identity |
| Content version | Exact published lesson/locale version delivered to learner |
| Evidence event | Append-only record of a validated learner action or evaluator result |
| Progress projection | Rebuildable current-state view derived from evidence events |
| Completion | Required activity/evidence for a node is satisfied under its versioned policy |
| Mastery | Stronger, policy-defined evidence state; distinct from completion |
| Prerequisite gate | D7 dependency condition evaluated using eligible evidence |
| Stale progress | Evidence refers to superseded or materially changed dependencies requiring policy evaluation |
| Correction | Audited compensating event; original evidence is not silently edited/deleted |

## 4. Ownership and module boundaries

| Capability | Owner | D10 relationship |
|---|---|---|
| Curriculum nodes, prerequisite graph and catalogue release | D7 Course Engine | Reads immutable published graph and node IDs |
| Lesson identity, locale version and availability | Content/D8 | Records exact content and locale version viewed/attempted |
| Assessment definitions, attempts, scoring policy | C12/Assessment module | Consumes trusted evaluation result and policy version |
| Mini-project briefs, rubric and review | C13/Project and review workflow | Consumes approved project milestone/rubric evidence |
| Identity and authorization | D6 | Resolves learner principal and ownership |
| AI explanations/hints | D9 | Read-only progress context; never writes evidence |
| Progress events, projections, completion/mastery policy application | D10 | Sole owner |
| Publication and content approvals | C14/C15 | Supplies current approved release state |

D10 does not directly query another module's private tables. Use exported application interfaces or stable internal contracts. The event producer must be authenticated and authorized; a client cannot impersonate an evaluator.

## 5. Learning progression model

### 5.1 Pathway and enrolment
- A learner selects one or more permitted pathways explicitly; each selection references a D7 catalogue release.
- Enrolment stores learner, pathway, release, selection time, status and policy version.
- Switching pathway creates a new selection/enrolment context or an explicit versioned transition; it must not silently rewrite historic evidence.
- Evidence may be reusable across pathways only when a published equivalence rule explicitly maps the same stable learning outcome and compatible version. Otherwise it remains pathway-local.
- A retired or superseded catalogue release remains referenced by historic evidence. New activity follows the current eligible release after the learner is informed of the transition.

### 5.2 Node lifecycle
A node's progress projection may use:
- `NOT_STARTED`: no qualifying evidence.
- `IN_PROGRESS`: at least one qualifying activity started, but completion criteria are not satisfied.
- `COMPLETED`: all required completion evidence for the applicable policy is satisfied.
- `MASTERED`: separate approved mastery policy is satisfied using eligible evidence.
- `BLOCKED`: a required prerequisite or availability gate is unsatisfied.
- `STALE`: a relevant content, assessment, prerequisite or policy dependency changed and requires reevaluation.
- `EXEMPTED`: only where an authorized, auditable policy explicitly permits an exemption.

These states are not all mutually exclusive in storage: blocked/stale may be derived overlays on a base state. API responses must expose the base state and blocking/staleness reasons distinctly. No automatic completion from merely opening or scrolling a lesson.

### 5.3 Evidence classes
- Lesson activity: started, section acknowledged, lesson completion confirmation where the lesson policy requires it.
- Assessment: attempt submitted and evaluator-issued result bound to assessment version and scoring policy.
- Project: milestone submitted, rubric evaluation and reviewer decision bound to project version.
- Prerequisite: eligible evidence reference and graph/policy version.
- Authorized correction/exemption: privileged event with actor, reason and audit evidence.

Time spent, client-side clicks, AI statements, unverified code output and self-reported success are not sufficient mastery evidence by themselves.

## 6. Event model and lifecycle

Canonical event envelope:
- `event_id`: server-generated immutable identifier.
- `idempotency_key`: scoped unique client/request key for retry-safe ingestion.
- `learner_id`: resolved server-side principal; never trusted from request body.
- `pathway_selection_id` and `catalogue_release_id`.
- `node_type`, `node_id`, `content_version_id` and `locale` where applicable.
- `event_type` and `event_schema_version`.
- `occurred_at_client`: optional untrusted client timestamp for diagnostics only.
- `recorded_at_server`: authoritative server timestamp.
- `producer`: authenticated client, assessment service, project review service or authorized administrator.
- `evidence_ref`: opaque reference to assessment/project/content evidence.
- `policy_version`, correlation ID and safe metadata.

Event types are allowlisted and defined in `D10_PROGRESS_EVENT_CATALOG.csv`. Unknown event types, cross-user references, unsupported locales, unpublished versions and malformed metadata are rejected.

### Lifecycle
`RECEIVED → AUTHORIZED → VALIDATED → DEDUPLICATED → RECORDED → PROJECTED`

- Authorization checks learner ownership and producer capability.
- Validation checks schema, node/release/content references, locale and allowed state transition.
- Deduplication occurs before append using a unique idempotency constraint.
- Event append and outbox/projection scheduling are transactionally coordinated.
- Projection processing is retryable and idempotent.
- If projection fails after event append, the event remains recorded and the projection is marked pending/rebuildable; never lose the evidence or report a false successful projection.
- Invalid or unauthorized events are rejected and safely audited; they do not partially update progress.

## 7. Completion and mastery policy

### Completion
A versioned completion policy declares, per node type and lesson/activity type:
- required evidence types and stable references;
- whether lesson completion confirmation is needed;
- required assessment/project evidence, if any;
- accepted status/result values from the owning evaluator;
- prerequisite conditions;
- whether optional activities affect completion;
- locale/content release requirements.

A policy must not invent an assessment or require an unmapped topic. If a policy is absent or ambiguous, the node remains incomplete and the gap is raised for product review.

### Mastery
Mastery is a separately versioned policy. It may require multiple evidence items or repeated performance, but exact thresholds, decay, recency windows, retry rules and cross-version reuse require an explicit product decision. Do not use a generic percentage threshold by default.

Mastery evidence must:
- come from an authorized evaluator or approved rubric workflow;
- reference the exact assessment/project version and scoring policy;
- include a deterministic result and evidence reference;
- satisfy any independence/attempt requirements configured by policy;
- be reevaluated when material dependencies change.

A learner may complete a lesson without achieving mastery. The UI must explain the distinction and next eligible action.

### Prerequisite evaluation
- Read D7's published, acyclic prerequisite graph and selected pathway context.
- Required edges block until their configured qualifying evidence exists.
- Conditional edges apply only when their condition is true for that pathway.
- Recommended edges guide but do not block.
- A missing node, cycle, unpublished release or unknown policy fails closed for progression.
- Cache results only with graph release, policy version and evidence watermark in the cache key.

## 8. Projection, recalculation and consistency

- Evidence events are the durable source; projections are derived and disposable.
- Maintain node-level and pathway-level projections with last processed event sequence/watermark.
- Projection updates are idempotent and ordered per learner/pathway aggregate.
- Rebuild projections from a known event sequence using the exact historical policy versions, then reconcile against current policy when required.
- A policy/content/curriculum release change triggers impact analysis. Mark affected nodes stale or schedule deterministic reevaluation; do not silently rewrite historic evidence.
- Use optimistic concurrency/version tokens for user-visible aggregate changes.
- A summary may be eventually consistent; response must include `as_of`, projection status and pending indicator.
- Reconciliation jobs compare event counts, projection watermarks and invariant checks. Repair is append-audited.
- No cross-module distributed transaction is required; use transactional outbox/inbox contracts where asynchronous evaluation results are consumed.

## 9. API contract outline (D5 alignment)

Logical resource groups (exact routes and OpenAPI schemas require D5 reconciliation):
- Pathway selection/enrolment: select, list and change selected pathway with expected catalogue release.
- Progress summary: fetch pathway/node summaries, blockers, stale flags and `as_of` watermark.
- Evidence ingestion: submit allowlisted learner activity events with idempotency key.
- Assessment result intake: internal service-to-service contract only; never accept a client-authored score.
- Project evidence intake: authorized review/project service contract only.
- Recalculation/status: authorized internal operation; no learner ability to self-assert completion.
- History: paginated learner-owned evidence summary with sensitive evaluator/internal fields withheld.

Every request is runtime-validated. Authorization is server-side and deny-by-default. Learner ID comes from D6 principal context. Writes use idempotency keys; conflicting updates use expected version/ETag. Errors use D5 stable codes. Never expose answer keys, reviewer-only notes or another learner's evidence.

## 10. Persistence proposal (D4 alignment)

Proposed logical entities are in `D10_PROGRESS_DATA_CONTRACT_MATRIX.csv`:
- pathway selection/enrolment;
- append-only progress event;
- idempotency record or unique event key;
- node progress projection;
- pathway progress projection;
- completion/mastery policy version;
- prerequisite evaluation snapshot/watermark;
- evidence reference;
- correction/exemption audit record;
- projection/rebuild job metadata.

Use UUID identifiers, UTC server timestamps, foreign keys and unique constraints. Store policy and release version references. JSONB only for bounded schema-versioned metadata, never as a substitute for relational ownership or authorization. Avoid duplicating raw assessment answers in progress events; store opaque evidence references and minimum derived result data.

## 11. Privacy, security and abuse controls

- Progress and assessment history are personal learner data. Apply purpose limitation, least privilege and approved retention/deletion policy.
- Enforce object-level authorization for every read/write; test IDOR/cross-user access.
- Never trust learner ID, score, mastery state, evaluator identity, timestamps or policy version supplied by client.
- Only assessment/project owning services can emit evaluator-result events through authenticated internal contracts.
- Rate-limit event ingestion; cap batch size and metadata size; reject replay outside the idempotency contract.
- Prevent duplicate awards/completion through unique event keys and idempotent projection.
- Audit administrative corrections, exemptions and manual overrides with reason and independent authorization.
- Do not use progress data for advertising or unrelated profiling.
- Encrypt in transit and at rest under platform security architecture; redact sensitive payloads from logs.
- Retention, export, erasure/legal hold and minors' data policy remain E-stage privacy decisions.
- No offline write is authoritative in the initial release. If offline event capture is considered later, it needs signed identity context, replay protection, conflict resolution and explicit server reconciliation design.

## 12. Observability and operations

Measure:
- event ingestion accepted/rejected/duplicate rates;
- authorization and validation failure rates;
- projection lag and oldest pending event;
- rebuild duration/failure and reconciliation mismatches;
- stale progress counts after content/policy releases;
- prerequisite evaluation latency/cache hit rate;
- completion/mastery transitions by policy version;
- API latency/error rate and per-learner abuse signals.

Use correlation IDs and event IDs. Logs must not include raw answers or unnecessary personal data. Alert on projection lag, repeated reconciliation mismatch, unauthorized evaluator events and unusual event volume. RPO/RTO and operational SLO targets remain D4/F-stage decisions.

## 13. Acceptance criteria and future test plan

D10 is complete at architecture scope when:
- Event types and canonical event envelope are defined.
- Activity, completion and mastery are distinct.
- Node lifecycle and pathway selection/versioning are defined.
- D7 prerequisites and C12/C13 evaluator ownership are respected.
- Idempotency, append-only history, projection rebuild and stale-policy behavior are specified.
- Server-authoritative API, authorization, privacy and offline boundaries are explicit.
- D4 persistence and D5/D6 contracts are mapped.
- Acceptance criteria, operational metrics and test scenarios are documented.

Future tests (not executed):
1. Unauthenticated event ingestion is denied.
2. Learner cannot submit a different learner ID or write another learner's progress.
3. Unknown event type/schema version is rejected.
4. Unsupported locale or unpublished content version is rejected.
5. Duplicate idempotency key returns the original outcome without duplicate evidence.
6. Same key with a different payload is rejected as conflict.
7. Client timestamp cannot override server ordering.
8. Lesson-open event never marks completion or mastery.
9. Completion requires all policy-defined evidence.
10. Completion does not imply mastery.
11. Mastery requires approved policy and trusted evaluator evidence.
12. Client-authored score/mastery/evaluator fields are rejected.
13. Assessment result accepted only from authorized assessment service.
14. Project result accepted only from authorized project/review service.
15. Required prerequisite blocks progression until eligible evidence exists.
16. Conditional prerequisite applies only when its condition is met.
17. Recommended prerequisite does not block.
18. Prerequisite cycle or missing node fails closed.
19. Historic evidence retains original catalogue/content/policy versions.
20. Changed content/policy marks affected projection stale or schedules reevaluation.
21. Projection replay is deterministic for fixed event and policy versions.
22. Duplicate projection job does not double-count evidence.
23. Projection failure leaves event durable and reports pending status.
24. Rebuild reconciles projection watermark and counts.
25. Cross-pathway evidence reuse requires explicit equivalence rule.
26. Pathway switch does not rewrite prior evidence.
27. Learner cannot access reviewer-only notes or answer keys.
28. Administrative correction/exemption requires authorization, reason and audit.
29. Offline client data is not treated as authoritative progress.
30. Batch size, event rate and payload limits are enforced.
31. Progress response includes `as_of` and projection freshness.
32. Retention/deletion workflow preserves legal/audit constraints.
33. Locale-unavailable lesson does not create false completion evidence.
34. AI-generated text cannot create authoritative progress events.
35. Reconciliation detects missing, duplicated or out-of-order projection work.

## 14. Open decisions and handoff

Require explicit approval before implementation:
- Completion criteria per lesson/activity type and whether explicit learner confirmation is required.
- Mastery thresholds, evidence count, recency/decay and retry policy.
- Whether and how assessment/project evidence can be reused across versions/pathways.
- Partial completion and section-level progress policy.
- Streaks, points, badges and certificates (not required for core progress).
- Learner-facing progress terminology and UI details.
- Exact D5 route/schema additions and internal service authentication.
- Event retention, privacy/legal deletion, minors' policy and export.
- Projection processing cadence/worker choice, event ordering and operational SLOs.
- Manual override authority and dual-control thresholds.

**Next task: D11 — Design the admin panel.**
