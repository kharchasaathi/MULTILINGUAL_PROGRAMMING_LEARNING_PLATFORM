# Security Constitution
Status: Baseline policy; E1 architecture-level threat model completed. Detailed control design and security approval remain pending E2–E15.

## Threat model baseline
The platform-wide threat model is documented in `docs/E1_SYSTEM_SECURITY_THREAT_MODEL.md`; the machine-readable register is `docs/E1_THREAT_REGISTER.csv`. The model covers seven trust boundaries (client, public edge/API, application modules, data/events, external providers, future sandbox and privileged operations), asset classification, threat actors, STRIDE analysis, 30 tracked threats, D15 gate mapping, monitoring indicators and residual-risk conditions. E1 is design-time analysis only; it does not prove that controls are implemented or effective. Update the model whenever a trust boundary, data flow, provider, privileged capability or execution runtime changes.

## Principles
Secure by default, least privilege, defense in depth, privacy by design, and fail closed. Treat browser input, uploads, learner code, AI output, retrieved content, and third-party responses as untrusted.

## Identity and access
Use established authentication protocols and secure session handling. Never invent cryptography. Enforce authorization on every protected server operation. Separate learner, author, reviewer, and administrator privileges. Protect recovery and privileged actions.

## Application, API, and data
Validate inputs at trust boundaries; use versioned schemas, parameterized database operations, context-aware output encoding, rate limits, request-size limits, and safe error messages. Keep secrets server-side. Encrypt transport and use managed encryption at rest where available. Minimize personal data and define retention/deletion policies before launch. Log security events without credentials or unnecessary sensitive data.

## AI safety
Treat prompts, retrieved documents, code, and tool outputs as untrusted data, not policy instructions. Constrain tools and permissions. Prevent cross-user data exposure, secret disclosure, and unauthorized actions. Evaluate prompt injection and data-exfiltration risks.

## Learner code execution
Never run untrusted code in the main application process or privileged backend. Use isolated, disposable environments with strict CPU, memory, time, process, filesystem, and network controls. Deny network access by default. Patch runtimes and test isolation boundaries before enabling execution.

## Operations
Dependency and secret scanning; backups and recovery drills; incident response; monitoring; rollback; threat models and security acceptance tests for high-risk modules. No production launch before security review.

## Decisions still required
Authentication provider, data classification, retention, key management, sandbox technology, logging, incident process, and applicable compliance obligations.


## Risk acceptance and enablement gates
- A documented mitigation is not evidence that a control is deployed or effective.
- Critical risks require explicit disablement or isolation until independently tested and approved. Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- High residual risks require a named owner, documented business rationale, compensating controls, expiry/review date and E15 approval; do not silently accept them.
- Protected actions fail closed when identity, authorization, ownership, signature verification or policy evaluation is unavailable.
- Threat register updates and control evidence are versioned. Security exceptions and emergency actions require attributable, audited approval.


## Network protection baseline (E2)
- Treat public clients, internet paths, DNS answers, external providers and uploaded destinations as untrusted.
- Use logical zones and deny-by-default ingress/egress. Every allowed flow requires purpose, owner, environment, protocol/port, data class, enforcement point, review expiry and rollback evidence.
- Expose only approved HTTPS routes; protect origins; keep data stores, queues, caches, worker controls and admin interfaces private.
- Require TLS 1.2 minimum, prefer TLS 1.3, validate outbound certificates/hostnames and prohibit insecure downgrade.
- Restrict data access to named least-privilege workload identities. Network location never replaces application authorization or module ownership.
- Restrict outbound destinations. SSRF-safe fetches validate IPv4/IPv6 addresses at connection time and after redirects, block private/loopback/link-local/reserved/metadata ranges and prevent DNS rebinding.
- Separate development, test, staging and production identities, data and network paths. CI runners have no ambient production access.
- Learner code execution remains disabled until E9, L13-L15 and E15 approval. Future sandbox egress is denied by default and has no route to application, data, control-plane, metadata or other tenants.
- Monitor denied flows, DNS/TLS anomalies, unexpected egress, policy drift and telemetry gaps. Network changes are reviewed, versioned, attributable and rollback-capable.
- E2 is a design baseline only; no network infrastructure or control is claimed to be deployed or verified.


## Canonical E-stage task map (2026-11-05)
The authoritative sequence is defined in docs/MASTER_STRUCTURE.md: E1 Threat modelling; E2 Network protection; E3 Application security; E4 Authentication security; E5 Authorization and roles; E6 Database security; E7 API security; E8 AI prompt injection protection; E9 Code execution sandbox security; E10 Payment security; E11 Privacy and data protection; E12 Audit logging; E13 Backup and recovery; E14 Security testing; E15 Security approval. The privacy milestone previously labelled E7 is canonically E11 and is documented under the E11 artifact filenames. E7 API security remains pending. Completion labels describe design documentation only unless implementation and independent verification evidence are explicitly recorded.


## API security baseline (E7)
- Maintain a versioned route inventory tied to D5 contracts and one owning module; unclassified routes fail closed.
- E4 authenticates the principal; E5 authorizes every operation and resource. Client-supplied roles and opaque IDs never grant access.
- Validate bounded request schemas; use explicit response DTOs, safe errors, quotas, idempotency and replay protection.
- Verify provider callbacks before processing; re-authorize file access and asynchronous jobs; apply E11 privacy rules to telemetry.
- E7 is design-only. Implementation and testing remain pending; E14 and E15 gates still apply.


## AI prompt injection baseline (E8)
- Treat user prompts, retrieved documents, code, OCR, transcripts, metadata, tool outputs and model outputs as untrusted data; none can override server policy or grant authority.
- Minimize and isolate context by principal, tenant, task and purpose. Enforce retrieval authorization before search and before citation/snippet delivery; provenance is mandatory for trusted use.
- AI tasks default to no tools. Every proposed tool call passes a deterministic server-side broker with E4 identity, E5 authorization, strict schemas, resource scope, quotas and audit.
- AI cannot approve/publish, grant permissions, set authoritative grades/mastery, change payment entitlements or execute learner code.
- Validate structured output, curriculum references and destination rendering; never execute raw generated code or HTML. Apply E11 minimization, retention and deletion rules.
- Evaluate direct/indirect, multilingual and multimodal injection, data leakage and tool misuse with deterministic assertions. E8 is design-only; E14 evidence and E15 approval remain required.


## Secure code execution baseline (E9)
- Learner code is hostile. Never execute it in the application, API, AI process, database host or a worker holding application credentials.
- Execution defaults to disabled. Future runtime requires dedicated isolation, disposable per-job instances, least-privilege identities, default-deny network, externally enforced resource limits and quarantined outputs.
- Do not expose host paths, devices, runtime sockets, metadata endpoints, credentials, hidden tests or control-plane interfaces to a job.
- Verify immutable signed runtime images and provenance; provide independent kill switch, monitoring and recovery.
- No execution enablement until L13-L15 readiness, E14 independent test evidence and E15 explicit approval. E9 is design-only; no runtime or tests are claimed.
