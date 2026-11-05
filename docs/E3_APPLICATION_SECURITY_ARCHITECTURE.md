# E3 — Application Security Architecture

**Status:** Complete — provider-neutral application security design documented  
**Date:** 2026-11-05  
**Decision:** E-0003  
**Branch:** `docs/project-foundation`  
**Inputs:** D1–D15; E1 threat model/register; E2 network protection; D3 backend; D4 data; D5 API; D6 identity; D9 AI; D11 admin; D12 payment; D13 module communication; D14 end-to-end flows; Security and Engineering Constitutions.  
**Scope boundary:** Application-level security requirements, contracts and future verification scenarios. No application code, endpoint, database migration, security library, identity provider, policy engine or production control is implemented or tested by this document.

## 1. Purpose and governing principles

E3 defines how the platform protects application requests, data, domain actions and user-visible outputs after traffic crosses the E2 network boundary. It applies to web/PWA, Android/iOS clients, public REST API, backend modules, workers, admin workflows and provider adapters.

Governing principles:
1. **Server is authoritative:** client state, UI visibility, URL, request body, headers and local storage never establish identity, permission, ownership, price, entitlement, progress, assessment result or publication state.
2. **Deny by default:** every non-public use case declares its permission, resource scope, account-state conditions and workflow constraints.
3. **Validate at every trust boundary:** transport schema, domain invariants and output context each receive their own validation.
4. **Least privilege and explicit ownership:** each module owns its data and state transitions; no cross-module table writes.
5. **Safe output:** encode for the final rendering context; do not trust HTML, Markdown, URLs, filenames, AI output or uploaded metadata.
6. **No secrets in clients or logs:** credentials and provider secrets remain server-side and are redacted from telemetry.
7. **Fail closed for protected decisions:** uncertainty in identity, authorization, signature, workflow state or policy denies the action.
8. **Auditable privileged changes:** administrative, financial, publishing, security and permission changes are attributable and reviewable.
9. **Defense in depth:** application controls complement E2 network protections; neither substitutes for the other.
10. **No code execution in application process:** learner code is out of scope for the main app and remains disabled until E9, L13–L15 and E15 approval.

## 2. Scope and trust boundaries

### In scope
- Request parsing, validation, normalization and error handling.
- Authentication-to-principal handoff and authorization enforcement (D6 owns identity architecture).
- Object-level, function-level, tenant and workflow authorization.
- Injection, unsafe deserialization, path traversal, file upload and content rendering defenses.
- CSRF, CORS, session and browser security integration.
- Rate limits, abuse controls, idempotency and concurrency.
- Secrets, sensitive data, audit events and privacy-aware logs.
- AI prompt/context/output trust boundaries.
- Payment/webhook and external-provider adapter boundaries.
- Admin and content author/reviewer/publisher separation.
- Secure module boundaries and asynchronous event validation.

### Out of scope / not selected
- Identity provider, token/session technology, MFA vendor and key-management product.
- Exact framework packages, WAF, API gateway, hosting provider or deployment configuration.
- Final data retention periods, legal basis, jurisdictional compliance or certification.
- Production endpoint paths and generated OpenAPI document beyond D5 baseline.
- Sandbox runtime technology; covered by E9 and L13–L15.
- Operational incident response detail and monitoring platform; E12 owns operational procedures.

### Trust model
Treat all client-supplied values, uploaded files, external provider responses, webhook bodies, AI prompts/retrieval results/model outputs, queued event payloads and administrator free-text as untrusted until authenticated, schema-validated, authorized and contextually handled. A value validated at one layer is not automatically safe for a different layer or output context.

## 3. Application security architecture

### 3.1 Request processing pipeline

Every protected HTTP request follows this logical sequence:
1. Enforce E2 transport/edge constraints and request-size/time limits.
2. Parse only supported content types and bounded payload formats; reject malformed or ambiguous framing.
3. Apply request correlation and abuse/rate policy without treating client IDs as trusted identity.
4. Validate authentication protocol/session and resolve a server-side D6 principal.
5. Validate account status, session freshness and required step-up assurance for sensitive actions.
6. Validate route DTO/schema and reject unknown or forbidden fields where mass assignment is a risk.
7. Invoke authorization policy with principal, action, resource, tenant/owner, workflow state and contextual constraints.
8. Execute a domain use case through the owning module's application interface.
9. Persist state and outbox/audit evidence atomically where the domain requires it.
10. Validate response contract, redact sensitive fields and encode output for its final context.
11. Emit privacy-minimized security/operational events and correlation metadata.

The ordering is a logical security sequence. Implementations may combine middleware/guards/pipes, but must preserve the guarantees and avoid TOCTOU gaps. Authorization must be rechecked at the authoritative mutation boundary, not only in a controller.

### 3.2 Trust and responsibility boundaries

| Boundary | Untrusted input | Required control | Authority |
|---|---|---|---|
| Client → API | Params, body, headers, locale, IDs, files | Schema validation, auth, authorization, abuse limits | API + domain module |
| API → module | DTOs and caller context | Typed application port, explicit permission/resource scope | Owning module |
| Module → database | Query values and state transitions | Parameterized ORM/query, constraints, transactions | Data-owning module |
| API/worker → provider | Provider request and response | Fixed adapter, secret isolation, TLS, response validation | Provider adapter + domain |
| Provider → webhook | Raw body, headers, event ID | Raw-body signature verification, replay/idempotency and state validation | Provider-owning domain |
| AI → application | Prompt, retrieval and model output | Treat as data; schema/safety/provenance validation | D9 orchestration + human workflow |
| Admin client → privileged use case | Action, target ID, reason | D6 principal, scoped permission, workflow/C15, step-up/dual control where approved | Admin/domain owner |
| Queue → consumer | Event envelope/payload | Schema/version/producer validation, tenant binding, idempotency | Consumer module |
| Upload → storage/processor | Bytes, filename, MIME, archive | Size/type/signature limits, quarantine, safe processing | Asset/content module |

## 4. Input validation and canonicalization

- Define runtime schemas for every public request, webhook, event, import, upload metadata and provider response. TypeScript types alone are not validation.
- Use allowlisted fields and reject unexpected fields for security-sensitive writes; never mass-assign request objects to persistence models.
- Validate length, type, format, range, enum, encoding, nesting depth, array count, numeric precision and cross-field invariants.
- Normalize only where semantics are unambiguous. Preserve original evidence when normalization affects audit or legal interpretation.
- Validate opaque identifiers syntactically, then separately verify resource existence, tenant and ownership.
- Parse dates/times, locale, currency and decimal values with explicit formats and precision; never trust client-computed totals or monetary values.
- Enforce request-body, multipart, decompression, archive expansion, recursion and processing-time limits.
- Reject duplicate/ambiguous security-sensitive parameters and conflicting representations (e.g. duplicate JSON keys if parser behavior is unsafe).
- Treat Unicode confusables, bidirectional controls and normalization differences carefully in usernames, filenames and identifiers; display safely and compare using a documented canonical form.
- Validate external provider responses against versioned adapter schemas before they influence domain state.
- Never use validation as a substitute for authorization or output encoding.

## 5. Authorization and access control

### 5.1 Policy model

Every protected operation declares:
- principal type and authenticated account state;
- permission/action;
- resource type and resource identifier;
- tenant, owner and relationship constraints;
- current workflow/state and permitted transition;
- locale/content version or other contextual scope;
- required assurance/step-up and approval evidence, if applicable;
- audit classification and reason requirement.

Authorization evaluates **subject + action + resource + context + state** at the server-side use-case boundary. Deny by default; no implicit admin bypass.

### 5.2 Mandatory enforcement
- Function-level authorization: user can invoke this operation.
- Object-level authorization: user can act on this specific object.
- Property-level authorization: user can read/change these specific fields.
- Tenant/ownership isolation: object IDs cannot be used to cross user/tenant boundaries.
- Workflow authorization: only valid transitions for the current state and actor are accepted.
- Contextual authorization: locale, content version, subscription entitlement, risk, account state and C15 separation are checked where relevant.
- List/search/export endpoints apply the same row-level scope as detail endpoints; pagination/filter manipulation must not widen access.
- Authorization is enforced for API, worker, webhook, scheduled job, admin and internal application-port entry points. Internal calls still carry explicit actor/service context.
- Recheck authorization immediately before high-impact state mutation to prevent time-of-check/time-of-use gaps.
- A 404-versus-403 disclosure policy may reduce enumeration, but it must not alter actual authorization.

### 5.3 Role and separation constraints
D6 owns principal and permission architecture; D11 owns admin workspaces and permission matrix; C15 owns review/approval separation. E3 requires:
- Client-provided role, reviewer, publisher, owner or entitlement claims are ignored.
- Author cannot self-review/approve/publish the same content version.
- AI or automated quality score cannot grant approval or permission.
- Support staff cannot change payment state or grant entitlements.
- Learner cannot write authoritative progress/mastery or assessment results.
- Service identities have narrow scopes and cannot impersonate human roles.
- Break-glass access is separately approved, time-limited, audited and reviewed.

## 6. Injection and unsafe interpretation defenses

- **SQL/ORM:** use parameterized Prisma/ORM operations; never concatenate untrusted values into SQL. Dynamic identifiers/sort fields use strict allowlists.
- **NoSQL/search/cache:** parameterize queries and validate query operators; prevent user input from becoming query syntax.
- **OS/process:** do not pass untrusted input to shell commands. Prefer fixed executable plus structured arguments; if unavoidable, strict allowlist, no shell interpolation and isolated low-privilege worker.
- **Template injection:** never compile user/AI content as a server-side template. Use fixed templates and escaped variables.
- **XSS:** context-aware output encoding; safe framework defaults; avoid raw HTML insertion. If rich HTML is required, use a maintained allowlist sanitizer and narrowly scoped rendering component.
- **Markdown:** render with raw HTML disabled by default; sanitize generated HTML; validate link schemes and attributes; prevent dangerous URL protocols and unsafe embeds.
- **URL/redirect:** allowlist schemes/hosts where required; reject open redirects and credential-bearing URLs; apply E2 SSRF broker rules for server-side fetches.
- **Path traversal:** map user-visible IDs to server-owned storage keys; canonicalize paths; reject traversal, absolute paths, alternate separators and symlink escapes.
- **Deserialization:** accept only explicitly defined JSON schemas; do not deserialize untrusted polymorphic object graphs or executable formats.
- **Regular expressions:** avoid attacker-controlled catastrophic patterns; bound input and use safe patterns/timeouts.
- **Header/log injection:** sanitize CR/LF and delimiters in log fields; use structured logging.
- **Prototype pollution:** reject dangerous object keys where relevant and use safe object construction/merge patterns.
- **Mass assignment:** explicit DTO-to-domain mapping; never bind request bodies directly to ORM entities.

## 7. Browser, session and API security integration

- D6 is authoritative for authentication protocol, session lifecycle, token validation and account recovery. E3 requires strict validation of issuer, audience, expiry, signature, nonce/state and redirect URI as appropriate to the selected protocol.
- Browser cookies, if used for sessions, must be Secure, HttpOnly and appropriately SameSite; session identifiers rotate after authentication and privilege changes.
- Protect state-changing cookie-authenticated requests against CSRF; verify Origin and anti-CSRF proof as appropriate.
- Apply restrictive Content Security Policy, frame-ancestors/frame protection, Referrer-Policy, X-Content-Type-Options and appropriate Permissions-Policy. Final values must be tested against actual app needs.
- CORS uses explicit origins; it does not grant authorization.
- Validate content type and accept only expected methods. Return stable D5 errors without stack traces, SQL, filesystem paths, secrets or provider internals.
- Disable production debug routes, stack traces, source maps containing secrets and verbose framework diagnostics.
- Use safe cache directives for authenticated/personal/financial/admin responses; shared caches must not serve one user's data to another.
- API versioning and OpenAPI contracts follow D5; runtime validation must match published schema. Breaking security-sensitive schema changes require review and compatibility tests.
- Mobile secrets cannot be protected by obfuscation; no static privileged secret or provider key may be embedded in an app binary.

## 8. File upload, download and content processing

- Allowlist business-required file types and maximum sizes; verify extension, declared MIME and file signature independently.
- Generate server-side opaque storage keys; never trust user filenames as paths or object identifiers.
- Store uploads outside executable/public web roots; private by default and serve through authorized handlers or short-lived scoped URLs.
- Quarantine uploads before parsing, previewing, indexing or publishing. Scan using a maintained malware/content scanning capability when selected; scanning is an additional control, not proof of safety.
- Reject archive bombs, path traversal entries, symlinks, nested archive abuse, excessive file counts and decompression ratios.
- Use isolated, low-privilege processors with CPU/memory/time/output limits. Do not execute uploaded files or macros.
- Re-encode images/documents where appropriate; strip unnecessary metadata, especially location/personal metadata, based on product requirements.
- Set safe download headers (attachment where appropriate, nosniff, controlled content type) and prevent inline active content.
- Signed URLs are short-lived and object-scoped; do not place sensitive information in object names or URL query parameters.
- Downloads enforce current authorization; possession of a guessed object key is not sufficient.

## 9. Data protection, secrets and privacy

- Apply D4 data ownership and classification. Collect only data needed for a documented purpose.
- Keep credentials, access tokens, refresh tokens, API keys, webhook secrets, signing keys and encryption keys out of source control, client bundles, URLs, logs and ordinary database fields.
- Use an approved secret store at deployment; separate environment secrets; scope access by workload identity; rotate and revoke on exposure.
- Hash passwords only through a vetted password-hashing implementation if the selected identity design stores them; never reversible encryption or custom crypto.
- Encrypt sensitive data at rest through the selected platform controls; E2 governs network transport. Key management is a separate E-stage decision.
- Mask or tokenize sensitive values in support/admin views; require purpose and permission for exceptional access.
- Define retention, deletion, export and legal-hold rules before production; propagate deletion to derived data, search indexes, caches and backups according to approved policy.
- Logs and traces exclude credentials, full payment data, raw session tokens, unnecessary personal data and full request/response bodies.
- Use structured audit events for privileged changes, permission grants, account recovery, financial transitions, content approval/publishing, data export and security policy changes.
- Audit records are append-only from application perspective, access-controlled and tamper-evident using a selected implementation; exact retention and storage mechanism remain open.

## 10. Domain-specific security rules

### 10.1 Learning, assessment and progress
- Client cannot determine score, pass/fail, mastery, completion, prerequisite satisfaction or authoritative progress.
- Assessment submissions are validated against versioned C12 contracts; attempt ownership, timing, attempt limits and policy version are server-checked.
- Progress evidence is appended through D10; no client direct writes to projections or authoritative mastery state.
- Course/content access checks publication status, locale readiness, version and entitlement where applicable.
- Project uploads and learner code are treated as hostile files/data; never execute in the application process.

### 10.2 Content authoring, review and publishing
- Preserve C14 quality gates and C15 author/reviewer/publisher separation.
- Every approval binds to immutable content version/hash and locale; changed content invalidates prior approval as specified by C15.
- Review, publish, withdraw and rollback are distinct authorized transitions with audit evidence.
- AI-generated drafts remain untrusted, provenance-bound suggestions; deterministic checks and authorized human review required before publication.
- No author, admin UI or AI model may bypass curriculum scope or approval policy.

### 10.3 Payments and entitlements
- D12 owns financial state. Client redirect, query parameter, screenshot or success UI never proves payment.
- Verify raw webhook body/signature before parsing-dependent state mutation; validate timestamp/replay, merchant/account/environment and provider event identity.
- Enforce idempotency, immutable financial evidence, ordering/reconciliation and pending/unknown states.
- Payment, order, subscription and entitlement remain separate state machines. Only authoritative entitlement policy grants access.
- Do not receive/store PAN, CVV, PIN, OTP or raw payment credentials; use provider-hosted checkout/approved components.
- Support/admin/AI/learner roles cannot mutate financial state or grant paid entitlements.

### 10.4 AI and retrieved context
- Prompts, retrieved documents, learner code, tool outputs and provider responses are untrusted data, never policy instructions.
- Apply task-scoped tool allowlists and server-side authorization for every tool call.
- Prevent cross-user/context data leakage; retrieval filters must enforce tenant and access policy before context reaches the model.
- Validate output schema, size, links, code fences and unsafe active content before display or storage.
- Model output cannot execute code, call arbitrary network destinations, alter permissions, grade consequential work, approve or publish.
- Apply quotas, rate limits, timeouts, cost budgets and privacy minimization; do not send secrets or unnecessary personal data to providers.
- Record provider/model/prompt/schema/policy provenance and safety outcome without logging sensitive prompt content unnecessarily.

### 10.5 Admin and privileged operations
- Admin panel is an untrusted client; all permissions enforced server-side.
- Sensitive operations require step-up and/or dual control when the approved D11/E-stage policy requires it.
- No self-approval, self-publishing, role escalation or hidden support bypass.
- Bulk actions and exports require explicit scoped permission, bounded size, reason where required and audit.
- Account suspension, permission grant/revoke, key rotation, payment adjustment, data export and content publishing are high-impact events.
- Emergency access is time-bound and independently reviewed.

## 11. Abuse resistance, idempotency and concurrency

- Apply per-route, per-principal, per-account and global rate/concurrency budgets; use E2 edge controls plus application-level enforcement.
- Protect login/recovery/OTP, search, uploads, AI, assessment, checkout, exports and admin mutations with tailored quotas.
- Prevent account enumeration with consistent responses and bounded timing where appropriate.
- Idempotency keys are scoped to principal, operation and request fingerprint; persist outcome and reject key reuse with a different payload.
- Use optimistic concurrency/version tokens for concurrent edits and state transitions. Reject stale writes rather than silently overwriting.
- Bound pagination, sorting, filters, graph/query complexity, batch size and export workload.
- Use timeouts, bounded retries, jitter, circuit breakers and backpressure for providers and workers; never retry non-idempotent money movement blindly.
- Apply anti-automation controls proportionately and accessibly; do not use IP-only decisions as the sole risk signal.

## 12. Error handling and security event model

- Return stable D5 error codes, safe public messages and correlation ID; no stack traces, SQL, filesystem paths, provider secrets or internal topology.
- Distinguish validation, authentication, authorization, conflict, rate limit, dependency unavailable and internal errors without revealing sensitive resource existence.
- Fail closed for protected actions when policy evaluation, identity validation, signature verification or ownership lookup fails.
- Security events include actor/service identity, action, target type/opaque ID, decision, reason code, correlation ID, timestamp, environment and policy/version reference where safe.
- Do not log raw secrets, access tokens, cookies, payment credentials, full sensitive payloads or unrestricted prompt content.
- Protect event access, integrity and retention under E12. Alert on repeated authorization denials, privilege changes, suspicious exports, signature failures, abuse spikes and policy bypass indicators.

## 13. Secure development and change requirements

- Security requirements and abuse cases become acceptance criteria before implementation.
- Use strict TypeScript, runtime schemas, dependency pinning/lockfiles, code review and automated static/dependency/secret scanning in F-stage/G-stage.
- Security-sensitive code requires reviewer approval and tests for allow and deny paths.
- No direct ORM access across module boundaries; no unreviewed dynamic SQL, raw HTML, shell execution or arbitrary URL fetch.
- Threat model and control matrices update when routes, roles, data classes, providers, file processing, AI tools or trust boundaries change.
- Secrets never enter pull-request logs or untrusted CI jobs. Deployment credentials are short-lived and environment-protected.
- Security exceptions require owner, rationale, compensating control, scope, expiry, approval and audit; Critical risk cannot be silently accepted.
- Rollback must not restore vulnerable configuration or bypass authorization.

## 14. Control ownership

| Control area | Accountable design owner | Integration |
|---|---|---|
| Identity, sessions, principal | D6 | API, web/mobile clients |
| API contracts and runtime validation | D5/API | D3 controllers, DTOs, OpenAPI |
| Authorization and resource ownership | Domain owner + D6 | Every use case and worker |
| Persistence/query safety | Data-owning module | D4, Prisma and migrations |
| Content workflow | C14/C15 + D7/D8/D11 | Author/reviewer/publisher |
| Assessment/progress authority | C12/D10 | Learner client and API |
| AI trust/output/tool safety | D9 | Retrieval, adapters, UI |
| Payment/webhook integrity | D12 | Provider adapter, entitlement |
| Async event validation | D13 | Outbox/inbox consumers |
| Upload/content processing | Asset/content owner | Storage and isolated processor |
| Logging/incident response | E12 | Platform and module owners |
| Independent verification | E14/E15 | All critical controls |

## 15. Application security control register

The companion `E3_APPLICATION_SECURITY_CONTROL_MATRIX.csv` defines 40 requirements, owner, priority and evidence. Each control remains **design** until implementation evidence is linked. Minimum acceptance must include both positive and negative tests, where applicable.

Critical control families: server-authoritative principal; deny-by-default function/object/property authorization; tenant isolation; workflow/C15 enforcement; runtime schema validation; injection-safe queries; XSS/CSRF protections; secrets redaction; webhook verification; AI tool/output constraints; payment/entitlement separation; secure upload handling; append-only privileged audit.

## 16. Future verification plan

The companion `E3_APPLICATION_SECURITY_VERIFICATION_CATALOG.csv` defines 40 future scenarios. Coverage includes:
- Unauthenticated access, role spoofing, IDOR/BOLA, BFLA and property-level leakage.
- Cross-tenant list/search/export, workflow state bypass, stale version and TOCTOU.
- DTO/schema, mass assignment, SQL/NoSQL/OS/template injection, XSS, Markdown and open redirect.
- CSRF, CORS, cookie/session and security headers.
- Upload MIME/signature mismatch, archive bomb, traversal, symlink and unauthorized download.
- Secret leakage, log injection, error disclosure, audit tampering/access.
- AI prompt injection, retrieval cross-tenant leak, tool abuse and unsafe output.
- Payment forged/replayed/out-of-order webhook and client-side false success.
- Event schema spoofing, duplicate processing and worker authorization.
- Rate-limit abuse, idempotency misuse and concurrency conflict.

Tests are specified only and **have not been executed**. E14 must record environment, date, tool/version, result, evidence and remediation. E15 must independently review critical controls and residual risk.

## 17. Decisions deliberately deferred

- Authentication provider/protocol/session/cookie/token implementation and MFA/step-up thresholds (D6/E4/E5).
- Permission catalog final grants and break-glass authority (D6/D11/E5).
- Framework packages, validation/sanitization libraries and CSP values.
- Secret manager, key-management service, audit storage/tamper-evidence implementation.
- Malware scanning provider, file type/size limits and content-processing service.
- Data retention/deletion periods, legal basis and jurisdictional compliance.
- WAF/API gateway, deployment environment and network enforcement product (E2).
- AI provider/model, prompt retention, tool inventory and exact budgets (D9/E8).
- Payment gateway, merchant entity, PCI scope and tax rules (D12).
- Sandbox runtime and execution isolation (E9, L13–L15).
- SIEM/observability provider, alert thresholds and incident SLAs (E12).
- Exact endpoint schemas and production OpenAPI generated from runtime contracts (D5/F-stage).

No vendor, legal value, threshold or implementation detail is invented here.

## 18. E3 exit criteria and conclusion

- [x] E1/E2 trust boundaries translated into application security responsibilities.
- [x] Request processing pipeline and server-authoritative policy model defined.
- [x] Function/object/property/tenant/workflow authorization requirements defined.
- [x] Input validation, injection, output encoding and browser protections defined.
- [x] Upload/download, secrets, privacy, logs and audit requirements defined.
- [x] AI, payment, admin, assessment/progress and async boundaries reconciled.
- [x] Abuse resistance, idempotency, concurrency and fail-closed behavior defined.
- [x] Control matrix and future verification catalog versioned.
- [x] Tracker, constitution and decision log updated.
- [ ] Application controls implemented and verified — pending implementation.
- [ ] E14 tests executed and E15 approval — pending.

**Conclusion:** E3 establishes the application security baseline. It does not certify the application as secure, authorize production launch or enable payments, AI providers, privileged workflows or code execution. No code or security tests were executed. **Next: E4 — continue security design.**
