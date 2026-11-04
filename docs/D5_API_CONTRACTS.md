# D5 — Versioned REST API Contracts

**Status:** Complete — API conventions, endpoint inventory and wire-contract rules documented  
**Date:** 2026-11-05  
**Depends on:** D1 stack; D2 frontend architecture; D3 backend architecture; D4 PostgreSQL data model; C1–C15 content and workflow contracts  
**Baseline:** NestJS; REST/JSON; OpenAPI; `/api/v1`  
**Scope:** Logical API contract specification. This is not an implemented API or generated OpenAPI document.

## 1. Purpose and boundaries

D5 defines stable HTTP conventions shared by Next.js web/PWA and Expo mobile clients: resource naming, versioning, request/response envelopes, validation, pagination, filtering, sorting, errors, authorization expectations, idempotency, concurrency, locale behavior, caching and compatibility.

D5 does not implement controllers, DTOs, validation pipes, generated OpenAPI files, SDK clients, authentication/session protocols, role assignments, payment integrations or code execution. D6 owns authentication and detailed identity/session design. D7–D14 refine domain-specific contracts. The final OpenAPI document is generated from reviewed runtime contracts during implementation; this document is its design baseline.

## 2. API principles

1. HTTPS only in deployed environments; JSON request/response by default.
2. Base path is `/api/v1`. The version is explicit in the URL and represents a compatibility contract.
3. NestJS controllers are transport adapters. Use cases and domain rules remain authoritative in backend modules.
4. All input and output are runtime-validated. TypeScript compile-time types alone are insufficient.
5. Clients never access PostgreSQL directly and never determine authorization, scoring, publication, entitlement or progress completion.
6. Stable resource IDs are opaque UUIDs; public slugs are discovery identifiers, not authorization credentials.
7. Locale is explicit. Supported values: `te`, `en`, `ml`, `kn`, `ta`, `hi`.
8. Errors are stable machine-readable contracts; internal exception/provider/SQL details are never exposed.
9. Retryable writes support idempotency where duplicate effects are possible. Concurrency-sensitive updates use ETags/version tokens or explicit expected-version fields.
10. No API endpoint executes learner code in the NestJS process. A future execution endpoint can only broker a separately approved isolated worker.
11. OpenAPI schemas are the source for generated API documentation/client types after implementation; hand-maintained duplicate schemas must be avoided.
12. New fields should be additive and optional by default. Breaking changes require a new major API version or an explicitly negotiated migration plan.

## 3. URL, method and naming conventions

- Base: `/api/v1`; resource paths use lowercase kebab-case plural nouns.
- Use HTTP methods semantically: GET read; POST create/command; PUT full replacement only where defined; PATCH partial update; DELETE only for reversible/disposable resources under policy.
- Use nested paths only where the child cannot be meaningfully addressed without the parent. Do not encode arbitrary deep object graphs into URLs.
- Use query parameters for filtering, ordering, pagination and locale selection when the resource representation is locale-dependent.
- IDs are opaque; clients must not parse UUID internals.
- Commands with domain transitions use explicit action subresources, e.g. `POST /review-requests/{id}/submit`, `POST /review-requests/{id}/decisions`, `POST /releases`. Avoid generic status PATCH that bypasses workflow rules.
- No trailing slash requirement. Canonical URLs are returned in `links` only when useful.
- Request body uses `application/json`; file upload uses a separately authorized asset upload flow defined later.
- Response content type is `application/json; charset=utf-8`. Unsupported media types return `415`.

## 4. Versioning and compatibility

- `/api/v1` is the stable major version prefix.
- Patch/minor-compatible changes within v1: add optional response fields, add new endpoints, add optional query parameters with safe defaults, add new enum values only where clients are designed to tolerate unknown values.
- Breaking changes: remove/rename fields, change field meaning/type, make optional fields required, alter status semantics, change pagination contract, or add enum values to closed enums consumed exhaustively. Such changes require v2 or an explicitly documented staged migration.
- Unknown response fields must be ignored by clients. Clients should handle unknown non-critical enum values safely; security-sensitive states fail closed.
- Deprecation requires response/header notice, migration guide, usage measurement and a published sunset date. Do not remove a route while supported mobile versions still depend on it.
- OpenAPI document version and API major version are separate. Every schema is named and version-controlled.
- No promise of indefinite v1 support is made; support policy is decided before public launch.

## 5. Common request conventions

### 5.1 Locale

- Query parameter `locale` accepts exactly `te|en|ml|kn|ta|hi`.
- If omitted for authenticated learner content, backend may use the saved learner preference; if no preference exists, use the product's explicitly configured default locale. The default locale must be decided before implementation and must not be inferred from a browser header after a learner selected one.
- Public endpoints may accept locale explicitly; `Accept-Language` is a negotiation hint only and never overrides an explicit locale or saved preference.
- API metadata and error messages should provide stable codes; localized display text is optional and must not replace machine-readable codes.
- Code snippets, identifiers, commands, filenames and expected program output are not translated.

### 5.2 Pagination

Use cursor pagination for potentially large or changing collections.

Request:
- `limit`: integer 1–100; default 20.
- `cursor`: opaque server-issued cursor; absent on first page.
- `sort`: allowlisted field and direction only, e.g. `createdAt:desc`.
- `filter`: documented per endpoint; no arbitrary ORM field passthrough.

Response:
```json
{
  "data": [],
  "page": {
    "limit": 20,
    "nextCursor": null,
    "hasMore": false
  }
}
```

Cursor must be opaque, tamper-resistant and bound to the query/sort scope. Stable tie-break ordering (normally created timestamp plus ID) is required. Do not return total counts by default; counts may be expensive and can leak private resource existence.

### 5.3 Filtering and sorting

- Each endpoint documents an allowlist of filters, operators and sortable fields.
- Reject unknown filters, duplicate/conflicting parameters and unsupported sort fields with `400 VALIDATION_ERROR`.
- Bound search text length and query complexity.
- Never pass client-provided column names or raw SQL fragments to Prisma.

### 5.4 Idempotency

For retryable create/command operations with duplicate side-effect risk:
- Client sends `Idempotency-Key` (opaque random value; recommended 16–128 characters).
- Scope key by principal (or anonymous operation scope), HTTP operation and route.
- Server stores request fingerprint and stable result atomically with the business effect.
- Same key + same fingerprint returns the original result/status; same key + different fingerprint returns `409 IDEMPOTENCY_KEY_REUSED`.
- Key retention duration is a deployment/product policy and remains undecided. Expired keys must not silently permit duplicate financial or irreversible effects.
- Idempotency does not replace domain uniqueness or transaction constraints.

### 5.5 Optimistic concurrency

- Mutable resources expose an opaque `ETag` or `version` token.
- Client sends `If-Match` for protected updates/transitions where stale writes could overwrite another actor's work.
- Missing precondition where required returns `428 PRECONDITION_REQUIRED`; stale token returns `412 PRECONDITION_FAILED` or a documented `409 VERSION_CONFLICT` consistently for the resource family.
- Immutable content/review versions are not patched in place; create a new version.

## 6. Standard response contracts

### 6.1 Single resource / command result

```json
{
  "data": {
    "id": "opaque-resource-id"
  },
  "meta": {
    "requestId": "opaque-request-id"
  }
}
```

The `data` schema is endpoint-specific. The example is illustrative only.

### 6.2 Collection

Use the pagination contract in section 5.2. Collection responses contain `data` and `page`; optional `meta` may include request ID and safe representation metadata.

### 6.3 Error envelope

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request is invalid.",
    "requestId": "opaque-request-id",
    "details": [
      {
        "field": "locale",
        "issue": "UNSUPPORTED_VALUE"
      }
    ]
  }
}
```

- `code` is a stable uppercase machine-readable identifier.
- `message` is safe, concise and may be localized; clients must branch on `code`, not prose.
- `requestId` correlates support/diagnostic events.
- `details` is optional, bounded and contains only safe field-level issues.
- Never return stack traces, SQL, provider response bodies, tokens, secrets, prompt text, answer keys or private resource details.
- For resources whose existence is sensitive, return the same privacy-preserving not-found result for absent and unauthorized resources as policy requires.

## 7. HTTP status and error code registry

| HTTP | Stable code examples | Meaning |
|---|---|---|
| 200 | `OK` | Successful read/update/command result |
| 201 | `CREATED` | Resource created; include Location when applicable |
| 202 | `ACCEPTED` | Asynchronous request accepted; status resource returned |
| 204 | `NO_CONTENT` | Successful operation with no response body |
| 400 | `VALIDATION_ERROR`, `INVALID_CURSOR` | Invalid syntax, schema, filter or query |
| 401 | `UNAUTHENTICATED` | No valid authenticated principal; exact protocol is D6 |
| 403 | `FORBIDDEN` | Authenticated principal lacks permission |
| 404 | `NOT_FOUND` | Missing or intentionally concealed resource |
| 405 | `METHOD_NOT_ALLOWED` | Unsupported method |
| 406 | `NOT_ACCEPTABLE` | Unsupported representation |
| 409 | `CONFLICT`, `IDEMPOTENCY_KEY_REUSED`, `INVALID_STATE_TRANSITION` | Domain or replay conflict |
| 412 | `PRECONDITION_FAILED` | Stale ETag/version |
| 413 | `PAYLOAD_TOO_LARGE` | Request exceeds configured limit |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Unsupported content type |
| 422 | `DOMAIN_VALIDATION_FAILED` | Structurally valid but domain-invalid request |
| 428 | `PRECONDITION_REQUIRED` | Required concurrency token absent |
| 429 | `RATE_LIMITED` | Rate/concurrency limit exceeded; include Retry-After |
| 500 | `INTERNAL_ERROR` | Unexpected safe generic failure |
| 502/503/504 | `DEPENDENCY_FAILURE`, `SERVICE_UNAVAILABLE`, `DEPENDENCY_TIMEOUT` | Upstream or service availability issue |

The implementation must define a single mapping policy so the same failure does not unpredictably switch between status codes across endpoints.

## 8. Authentication and authorization contract boundary

- Protected endpoints require a server-resolved principal; the exact cookie/bearer/OIDC/session protocol is D6 and is not assumed here.
- Public read endpoints are explicitly marked public in the endpoint inventory.
- Every protected operation checks function permission, resource ownership, locale scope and current workflow state in the backend use case.
- Frontend route guards are not authorization.
- Never accept `userId`, `role`, `isAdmin`, `plan`, `ownerId` or reviewer identity from request body as authoritative. Derive actor identity and entitlements from trusted server context.
- Role/permission names and policy matrix are finalized in D6/E5. This document describes operation classes only.
- Author cannot approve own content; AI cannot approve/publish; publisher can release only an exact eligible immutable manifest.
- Answer keys, private drafts, reviewer notes and other learners' progress are excluded from learner response schemas.

## 9. Initial endpoint inventory

The complete route/method/ownership/auth/contract inventory is `D5_API_ENDPOINT_MATRIX.csv`. The initial route families are:

- Platform: `GET /health/live`, `GET /health/ready` (minimal operational responses; protect or restrict readiness details).
- Learner: `GET/PATCH /learners/me`; `GET/PATCH /learners/me/preferences`.
- Curriculum: `GET /tracks`, `GET /tracks/{trackId}`, `GET /tracks/{trackId}/modules`, `GET /modules/{moduleId}`, `GET /topics/{topicId}`.
- Content: `GET /lessons/{lessonId}`, `GET /lessons/{lessonId}/versions/{versionId}`; public delivery returns published locale content only.
- Progress: `GET /learners/me/progress`, `GET /learners/me/progress/{progressId}`, `PUT /learners/me/progress/{progressId}` with version/idempotency policy.
- Assessment: `GET /assessments/{assessmentId}`, `POST /assessments/{assessmentId}/attempts`, `GET /assessment-attempts/{attemptId}`, `POST /assessment-attempts/{attemptId}/responses`, `POST /assessment-attempts/{attemptId}/submit`. Learner schemas never expose answer keys.
- Authoring/review: author draft create/update/version/submit; reviewer queues, assignments, comments and decisions; release preflight and publication. Each transition is a command endpoint, not generic status update.
- AI: `POST /ai/generation-tasks`, `GET /ai/generation-tasks/{taskId}`; generated content remains draft and human review is mandatory.
- Assets: request upload authorization, confirm metadata/scan state, request authorized download URL; no arbitrary public object-key access.
- Playground: future execution request/status endpoints are disabled until E9/L13–L15 isolated sandbox approval. No route invokes local eval/exec.

Exact per-route methods, request/response schema names, auth class and idempotency/precondition requirements are listed in the endpoint matrix. Route inventory is a proposed v1 contract; D6 and domain tasks may refine it before implementation, with changes recorded.

## 10. Domain-specific contract rules

### 10.1 Curriculum and content

- Catalogue endpoints return stable IDs, source topic references, order, prerequisites and published availability.
- Lesson delivery requires explicit/effective locale and returns locale version, content schema version, content hash and ordered typed blocks.
- Draft and review endpoints are separate protected surfaces; public content endpoints never return draft/reviewer data.
- Content versions are immutable. Client update requests create new draft versions, never mutate published content.
- W3Schools source URLs are metadata/source attribution only; API must not serve copied W3Schools page text.

### 10.2 Review and release

- Submission freezes the exact version/hash and required locale set.
- Review decisions include gate, locale, reviewed hash, policy/rubric version and reviewer capacity.
- A release command references an immutable release manifest; backend preflight verifies every required locale and approval hash.
- Stale approval, author self-approval, unresolved mandatory defect or incomplete locale coverage blocks publication.
- AI provenance is optional metadata, never a reviewer identity or approval.

### 10.3 Assessment and progress

- Assessment delivery returns only learner-safe item data; answer keys and scoring internals remain server-side.
- Attempt creation and submission are idempotent; attempt ownership is verified for every read/write.
- Progress is updated from validated server-side evidence. Client cannot directly mark arbitrary content complete.
- Scoring and completion policy versions are recorded for reproducibility.

### 10.4 AI and playground

- AI generation accepts a task type, source version/reference and locale/scope under allowlisted policy; it cannot request arbitrary provider operations.
- AI output is schema-validated and stored as a draft with provenance and budget metadata.
- Playground request endpoints remain unavailable until isolated worker architecture, resource controls, network policy, cleanup and escape tests are approved. API process never executes code.

## 11. Caching, rate limits and payload limits

- Public immutable published content may use ETag and cache headers; include locale and content version in cache identity.
- Private learner, assessment, review, draft and answer-key responses use `Cache-Control: no-store` unless a later reviewed policy explicitly permits otherwise.
- Conditional GET uses `If-None-Match` for eligible public resources.
- Rate limits are applied by route class, principal and abuse risk; exact quotas are product/operations decisions, not invented in D5.
- Responses and uploads have configurable size caps; endpoint-specific maximums are declared before implementation.
- Search, AI generation, assessment submission and asset authorization have stricter concurrency/abuse controls.
- Return `429` with `Retry-After` where a retry time is known. Do not expose internal quota calculations or other users' usage.

## 12. OpenAPI and client generation

- NestJS DTO/runtime schema definitions are the implementation source for OpenAPI generation; use a schema-first or code-first method consistently, selected during implementation review.
- Every endpoint documents operationId, summary, tags, security requirement, path/query/header parameters, request body, success responses, all expected errors, pagination, idempotency, ETag behavior and examples.
- Reusable schemas: `ApiError`, `RequestMeta`, `CursorPage`, `LocaleCode`, stable IDs, common timestamps and version/hash metadata.
- OpenAPI document must be linted, diffed in CI and checked for breaking changes. Generated clients are derived artifacts; do not manually edit them.
- Web and mobile consume the same contract through a typed API client package, with platform-specific transport/session adapters.
- Contract tests verify runtime response matches OpenAPI and generated clients can deserialize unknown additive fields.
- No OpenAPI file or client has been generated in this planning task.

## 13. Observability and audit

- Every request has a correlation/request ID; accept a valid bounded client correlation ID only as a trace hint, not trusted identity.
- Log method, route template, status, latency, request ID and safe principal reference. Do not log full URL query strings by default.
- Audit sensitive state changes (profile security, review decisions, release, progress resets, entitlement and administrative actions) in the backend domain transaction/outbox policy.
- Metrics avoid personal data and high-cardinality identifiers.
- Error messages are safe and stable; diagnostics remain in protected logs/traces.
- API health endpoints expose minimal status only; no environment variables, DB connection strings, versions of vulnerable dependencies or topology details.

## 14. API implementation acceptance and future tests

The following are required future API tests, **not executed by this specification**.

| ID | Scenario | Expected result |
|---|---|---|
| D5-T01 | Request has unsupported path version | Stable 404/version error; no silent fallback |
| D5-T02 | Invalid JSON/body schema | 400 with safe field-level details |
| D5-T03 | Unknown query filter or sort key | Rejected before database query |
| D5-T04 | Limit is zero, negative or above 100 | Validation rejects |
| D5-T05 | Cursor tampered or used with different query scope | Rejected safely |
| D5-T06 | Same idempotency key and same payload | Original result returned; one effect |
| D5-T07 | Same key and different payload | 409 conflict |
| D5-T08 | Stale If-Match update | 412 conflict; no lost update |
| D5-T09 | Required If-Match absent | 428 precondition required |
| D5-T10 | Unauthorized resource identifier guessed | 403 or privacy-preserving 404; no data leak |
| D5-T11 | Client sends role/userId/ownerId override | Ignored/rejected; server principal wins |
| D5-T12 | Unknown optional response field received by client | Client remains forward-compatible |
| D5-T13 | Breaking OpenAPI schema change in v1 | CI compatibility gate fails |
| D5-T14 | API runtime response differs from OpenAPI | Contract test fails |
| D5-T15 | Private draft requested on public lesson route | Never returned |
| D5-T16 | Learner requests assessment answer key | No answer-key exposure |
| D5-T17 | Learner attempts to complete another user's progress | Authorization denies |
| D5-T18 | Author submits own review decision | Denied and audited |
| D5-T19 | AI generation output is valid | Draft only; cannot publish |
| D5-T20 | Release manifest has stale/missing locale approval | Publication blocked |
| D5-T21 | Playground route called before sandbox approval | 404/feature-disabled policy; no code execution |
| D5-T22 | Large body or unsupported media type | 413/415 before expensive processing |
| D5-T23 | Rate limit exceeded | 429 with safe Retry-After behavior |
| D5-T24 | Provider throws internal exception | Safe normalized error; no provider detail leak |
| D5-T25 | Public immutable lesson ETag matches | 304; private data never shared through cache |
| D5-T26 | Request log contains token or learner source code | Redaction test prevents emission |
| D5-T27 | Locale parameter outside six-locale allowlist | Validation rejects |
| D5-T28 | API deprecation/removal proposed | Sunset/usage/migration policy gate required |

D5 is accepted when endpoint inventory, method semantics, request/response/error schemas, versioning, validation, pagination, idempotency, concurrency, authorization boundaries, OpenAPI governance and future contract tests are documented.

## 15. Open decisions and handoff

Still open: authentication transport/session protocol and exact security schemes (D6); role/permission matrix; final default locale; numeric rate quotas and payload limits; idempotency retention; API support/sunset policy; exact per-domain fields refined by D7–D14; upload transport and signed URL provider; playground API enablement after sandbox security approval; schema-first versus code-first OpenAPI implementation choice.

Do not guess these values in clients or deploy an endpoint before its owner and acceptance criteria are approved.

**D5 is complete at versioned REST API contract specification scope.**  
**Next task: D6 — Design authentication, identity, session and account lifecycle.**
