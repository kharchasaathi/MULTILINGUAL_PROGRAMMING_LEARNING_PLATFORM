# E7 — API Security Architecture

**Status:** Complete at architecture, control-catalogue and verification-design scope; implementation pending  
**Date:** 2026-11-05  
**Decision:** E-0008  
**Authority:** D5 REST/OpenAPI contracts; D6 identity; D11 admin; D12 payment; D13 module communication; E1–E6; E11 privacy  
**Baseline:** TypeScript strict, NestJS modular monolith, REST/JSON under /api/v1; no GraphQL or public microservice topology is assumed.  
**Scope boundary:** Provider-neutral design. No endpoint implementation, API gateway, WAF, policy engine, production configuration, scan, penetration test or runtime test is claimed.

## 1. Purpose and ownership

E7 defines security requirements at the public and trusted-internal API boundaries. D5 remains the source of truth for endpoint and OpenAPI contracts. D6/E4 own identity and authentication; E5 owns authorization policy; E2 owns network protections; E3 owns application-wide secure coding; E6 owns database controls; E11 owns privacy and data lifecycle. E7 binds these controls into a consistent API lifecycle and verification baseline.

The initial architecture is a modular monolith. Modules communicate through explicit in-process application ports by default; only approved client/external boundaries use HTTP. Do not invent internal network endpoints or split services merely to satisfy API design.

## 2. Non-negotiable API invariants

1. No API request is trusted because it came from a first-party client, a hidden UI control, an internal-looking header or an opaque identifier.
2. Every route is explicitly classified as public, authenticated, privileged, service-only or provider-callback; unclassified routes are denied.
3. Authentication establishes a server-resolved principal (E4); every protected read and mutation separately evaluates E5 permission, ownership, tenant, field and workflow constraints.
4. Authorization is checked at the authoritative resource/use-case boundary, and again at mutation commit where state may have changed. Unknown policy or unavailable ownership data fails closed.
5. Request schemas are strict, versioned, bounded and validated before domain execution. Unknown fields are rejected for security-sensitive commands; mass assignment is prohibited.
6. Responses use explicit allowlisted DTOs. ORM entities, secrets, internal notes, provider payloads and unrestricted object spreads are never serialized directly.
7. Errors reveal no stack trace, SQL, filesystem path, secret, token, internal hostname or cross-tenant existence information.
8. Retries, callbacks, duplicate delivery and concurrent writes cannot create duplicate payment, entitlement, progress, publication or administrative transitions.
9. API logs and traces exclude credentials and unnecessary personal data; E11 classification, purpose, retention and deletion requirements follow data into telemetry.
10. Security controls fail closed. No test, documentation or design statement is evidence of deployment or runtime effectiveness.

## 3. Route inventory and contract governance

Maintain a generated, reviewable API inventory from D5/OpenAPI with: stable operationId; method/path; API version; owning module/use case; exposure class; authentication scheme; permission ID; resource/tenant/field scope; request/response schema; data classification; idempotency/retry semantics; rate-limit tier; audit event; deprecation owner and verification IDs.

Each operation must have one owning module and one source-of-truth contract. Route registration without inventory metadata is a CI failure. OpenAPI is a contract, not an authorization engine: security schemes, scopes and examples must agree with E4/E5 policy, and generated clients must not be treated as trusted. Breaking changes require versioning or a reviewed migration/deprecation plan; do not silently change semantics under /api/v1.

## 4. Authentication and authorization boundary

- Validate issuer, audience, signature, expiry, not-before, nonce/state and client flow as defined by E4; reject missing, malformed, expired, revoked or ambiguous identity.
- Resolve an internal principal server-side. Never accept userId, role, tenantId, subscription, price, ownership, reviewer status or admin claims from request body/query as authority.
- Apply E5 permission and contextual checks for every operation, including list/search/export, nested resources, bulk actions, downloads, admin diagnostics and background job submission.
- Prevent BOLA/IDOR, BFLA and property-level authorization failures. Random IDs are not access control. Scope database queries to authorized resources and re-check at mutation boundary.
- Separate service identities from humans; bind them to environment, module, audience, narrow scopes and expiry. No shared universal API key or human-role inheritance.
- Provider callbacks use a dedicated route and verification pipeline; callback authentication does not authorize unrelated user actions.

## 5. Request parsing and validation

- Enforce allowed methods, content types, character encoding and maximum body size before parsing. Reject ambiguous content types, malformed JSON, duplicate/conflicting security-sensitive fields and unsupported encodings.
- Use strict DTO/schema validation: allowlisted fields, explicit types, bounded strings/arrays/numbers, safe enum values, depth and collection limits, normalization rules and domain invariants.
- Reject mass assignment and prototype-pollution keys; never bind request objects directly to ORM models or domain aggregates.
- Treat path, query, headers, multipart metadata, filenames, pagination cursors and nested values as untrusted. Use parameterized DB operations and allowlisted sort/filter identifiers.
- Bound pagination page size, filter count, sort complexity, query cost and total response size. Use opaque, integrity-protected cursors bound to principal/scope/filter/version where required.
- Validate uploaded bytes, not just extension or client MIME. Apply E2 destination controls, quarantine, malware scanning and archive expansion limits before use.

## 6. Response and error security

- Return explicit response DTOs with property-level allowlists and data classification. Authorize each property or projection when fields have different visibility.
- Use consistent error envelopes and stable machine-readable codes; map internal exceptions to safe client messages. Do not expose stack traces or raw provider/database errors.
- Use correct status semantics without leaking resource existence across ownership boundaries. Apply no-store/cache controls to sensitive identity, learner, admin and payment responses.
- Set appropriate content type and anti-sniffing behavior; encode data for the eventual rendering context. Never return executable HTML or unsafe redirect targets from user-controlled content.
- Redact secrets, tokens, payment identifiers where sensitive, recovery values and private learner content from logs, traces and error reports.

## 7. Abuse, availability and concurrency

- Apply layered rate limits and quotas by route risk, principal, IP/network signal and service identity; do not rely on IP alone. Define stricter limits for login/recovery, AI, search, uploads, exports, admin and payment operations.
- Bound request duration, concurrency, payload size, pagination, fan-out, retries and downstream resource consumption. Propagate cancellation and deadlines.
- Use idempotency keys for retryable state-changing operations. Bind key to principal, operation and canonical request hash; store outcome atomically with state transition; reject conflicting reuse; define expiry and safe replay response.
- Use optimistic concurrency/version preconditions for mutable resources. Reject stale updates rather than last-write-wins where state integrity matters.
- Apply replay protections to signed callbacks and one-time operations. Use durable inbox/outbox patterns from D13; at-least-once delivery means consumers are idempotent.
- Return 429/503 safely with bounded retry guidance; prevent retry storms and avoid retrying non-idempotent operations without a durable idempotency contract.

## 8. Browser, CORS, CSRF and transport

- E2 owns TLS and network policy. API endpoints require approved HTTPS ingress; no downgrade or direct public database/worker access.
- CORS uses explicit production origin allowlists, exact scheme/host/port, minimal methods/headers and no wildcard origin with credentials. Preflight is not authorization.
- If browser credentials/cookies are used, apply E4 session protections and CSRF defenses (appropriate SameSite, secure/httpOnly cookies, anti-CSRF token/origin checks) to state-changing requests. CORS alone is not CSRF protection.
- Validate Host/forwarded headers only from trusted proxies; prevent host-header poisoning and untrusted client-IP spoofing.
- Apply security headers at the correct edge/application layer; avoid caching personalized or privileged responses in shared caches.

## 9. Webhooks, callbacks and external integrations

- Give each provider a dedicated callback route, secret/key scope and versioned parser. Verify signature over the exact raw bytes using provider-defined canonicalization before trusting parsed content.
- Enforce timestamp tolerance, unique event identifiers, replay/deduplication and durable inbox persistence before acknowledging; secret rotation supports bounded overlap and revocation.
- Verify provider account, environment, event type, resource reference and expected state against server-side records. A valid signature alone does not prove the event is relevant or authorize an entitlement.
- Process asynchronously from a durable inbox; keep handler idempotent, order-aware and reconciliation-capable. Do not trust client redirects or browser success pages as payment proof.
- Outbound callbacks/fetches use E2 SSRF-safe destination validation, allowlists where feasible, redirect revalidation, timeouts and response-size limits. Never forward ambient credentials.

## 10. Uploads, downloads and generated links

- Upload initiation and completion require authorization, quotas and purpose binding. Store outside executable web roots; use random object keys, quarantine and content inspection.
- Reject path traversal, symlink tricks, polyglot/mismatched MIME, decompression bombs, oversized archives and unsafe filenames. Do not trust extension or Content-Type supplied by clients.
- Downloads re-authorize current access and apply response disposition/content-type policy. Signed URLs are short-lived, object-specific, least-privilege and revocable where supported; avoid leaking them in referrers/logs.
- Exports are separately authorized, bounded, audited and privacy-filtered; prevent bulk endpoint abuse and cross-tenant aggregation.

## 11. API-specific domain safeguards

- Payment: D12 state machine and verified webhook inbox are authoritative. Client-supplied price, currency, payment status or entitlement is ignored; verify amount/currency/order/provider reference and reconcile before grant/refund.
- Admin/content: E5 permissions and D11 separation-of-duties apply to every admin route; author/reviewer/publisher conflicts and approval state are enforced server-side.
- Learning/progress: owning module verifies learner ownership, lesson/content version and attempt state; clients cannot submit authoritative scores, completion or progress totals.
- AI: API enforces per-principal quotas, approved tool scopes and data minimization; prompt-injection controls belong to E8. Never let API caller-provided role or retrieved content grant tool authority.
- Asynchronous jobs: validate event schema/version, producer identity, tenant/resource scope, expiry and deduplication; re-authorize sensitive actions at execution time rather than relying only on enqueue-time permission.

## 12. Observability, privacy and incident response

Record operationId, route template, outcome, latency, principal pseudonymous reference where justified, authorization decision code, rate-limit action, correlation/trace ID and security event reference. Never log raw Authorization/Cookie headers, access/refresh tokens, API keys, passwords, recovery secrets, full payment payloads or unrestricted request bodies. Apply E11 purpose, minimization, access, retention and deletion rules. Alert on auth failures, authorization denials, enumeration patterns, rate-limit spikes, schema violations, webhook signature/replay failures, unusual exports and contract drift. E12 owns the detailed audit-log system and operational response.

## 13. CI and release gates

Before an API change can merge: validate OpenAPI syntax and compatibility; ensure unique operationIds; require route inventory metadata; verify authentication classification and permission mapping; lint strict request/response schemas; detect undocumented routes and unsafe DTO exposure; run unit/contract/integration tests; run authorization matrix tests for owner/other-user/other-tenant/role/property cases; scan dependencies/secrets; and review migration/deprecation impact. E14 owns the integrated security test programme. CI results must be retained as evidence; a green build does not replace E15 approval.

## 14. Deferred decisions

Exact endpoint inventory and OpenAPI artifact location; auth transport/provider; API gateway/WAF and hosting; rate-limit thresholds and storage; idempotency retention; callback providers/signature profiles; upload scanner/storage; CORS origins; response/cache policy; API deprecation windows; audit retention and operational SLOs. Resolve these before production implementation and launch.

## 15. Completion boundary and hard gates

E7 completes the API security design and future verification catalogue only. It does not claim that routes, guards, DTOs, rate limits, webhook verification, WAF, CORS, logging, scans or tests exist. Learner code execution remains disabled until E9, L13–L15 and E15 approval. Production launch remains blocked on implementation evidence, E14 security testing and E15 approval.
