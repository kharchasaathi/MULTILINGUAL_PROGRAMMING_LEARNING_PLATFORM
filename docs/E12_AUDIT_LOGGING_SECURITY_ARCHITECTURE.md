# E12 — Audit Logging and Security Event Architecture

**Status:** Complete at architecture, control-catalogue and verification-design scope; implementation and operational validation pending  
**Date:** 2026-11-05  
**Decision:** E-0012  
**Authority:** E1 threat model; E3 application security; E4 identity; E5 authorization; E6 database; E7 API; E8 AI; E9 sandbox; E10 payment; E11 privacy; D11 admin; D13 module communication  
**Scope boundary:** Provider-neutral design. No logging SDK, collector, SIEM, database table, retention job, alert, dashboard, integration or runtime control is implemented or tested.

## 1. Purpose and ownership

E12 defines trustworthy, privacy-aware audit evidence for security-relevant and privileged activity across clients, API, domain modules, workers, providers and future execution systems. Audit logging is distinct from application diagnostics, metrics and distributed tracing. D13 owns event delivery patterns; each domain remains authoritative for its business state; E12 defines the common audit event contract, integrity, access, retention, monitoring and review requirements. E11 governs personal-data purpose, minimization, rights, retention and legal holds. E5 governs who may read/export audit records and who may perform privileged actions.

Audit records support accountability, incident investigation and control evidence. They do not independently prove that an underlying action was valid; correlate them with authoritative domain records and provider evidence.

## 2. Mandatory invariants

1. Record security-relevant events at the authoritative server/domain boundary, not solely from client-side telemetry.
2. Every event identifies actor (human/service/system/unknown), action, target reference, outcome, time, source context, correlation and schema version where known.
3. Denied attempts, failed authentication, authorization decisions, privileged changes and sensitive data access are auditable without logging secrets or full sensitive payloads.
4. Audit writes for critical state transitions are durable and atomic with the business transaction, or use a documented transactional outbox; no success response may imply audit durability when it is absent.
5. Audit records are append-only to application actors. Corrections are supplemental events; original evidence is never silently edited or deleted.
6. The runtime cannot alter, truncate or disable its own audit evidence, retention configuration or audit access policy.
7. Audit storage, encryption keys, administrators and readers are separated from audited application privileges.
8. Audit records are minimized, purpose-bound and classified under E11. Do not log passwords, tokens, session cookies, API keys, webhook secrets, private keys, PAN/CVV/PIN/OTP, raw prompts or full learner submissions by default.
9. Event integrity, ordering and completeness limitations are explicit. A missing event is not evidence that an action did not occur.
10. Unknown actor, missing authorization context, invalid schema or audit pipeline failure is represented explicitly; never fabricate actor identity or success.
11. Access, search, export, replay, retention override and legal-hold actions on audit data are themselves audited.
12. Alerts require ownership, severity, response procedure, evidence and tuning; a dashboard or log line alone is not an incident response capability.

## 3. Event taxonomy and minimum envelope

Use a versioned, language-neutral event envelope. Required fields:
- event_id: globally unique immutable identifier.
- event_type and schema_version: stable namespaced type and contract version.
- occurred_at and recorded_at: UTC timestamps; preserve source clock uncertainty where relevant.
- actor: actor type and stable internal principal/service identifier; use explicit unknown when unresolved.
- action: stable action/permission identifier and bounded description.
- target: resource type and opaque reference; avoid direct identifiers where pseudonymous references suffice.
- outcome: success, denied, failed, challenged, pending or unknown; include safe reason code.
- source: service/module, environment, channel and trusted source context; never accept arbitrary client claims as trusted origin.
- correlation: request/trace/interaction/aggregate reference and causation reference where applicable.
- data_classification, purpose_code, integrity_metadata and schema version.
- change_summary: allowlisted field names or before/after hashes for approved changes; never indiscriminately copy full records.

Event families include authentication/session/recovery; authorization allow/deny and grant lifecycle; privileged admin/configuration; sensitive learner-data access/export; content approval/publication; payment/refund/dispute/reconciliation; AI tool/policy/data-access decisions; sandbox job lifecycle and isolation events; API abuse/security controls; audit access/exports; key/secret administration; retention/legal-hold and incident response.

## 4. Trust boundaries and event production

- API/client edge: server captures request correlation, route/operation, authenticated principal, validation/authorization outcome and rate-limit/security decision. Avoid raw bodies, credentials, query secrets and uncontrolled headers.
- Identity/access: E4/E5 emit login outcomes, MFA/recovery/session events, policy decision IDs, grant/revoke/expiry, step-up and break-glass events. Do not log authentication factors or bearer tokens.
- Domain modules: owning module emits authoritative state-transition events for orders, payments, entitlements, assessments, progress, content review and publication. Include stable entity/version references, not copied sensitive content.
- Admin/support: capture privileged read, search, export, configuration change, approval, emergency access and failed attempts with reason and scope.
- AI: log task/policy/model/provider identifiers, context provenance references, tool decision/denial, output validation outcome and safety event codes; do not log raw prompts/responses by default.
- Sandbox: if enabled after E9/E14/E15, record job identity, image digest, policy version, resource-limit/termination events and artifact quarantine/release decisions; never collect arbitrary program output as audit evidence without classification.
- Payment/provider: correlate checkout, webhook verification/rejection, state transition, refund/dispute and reconciliation events with opaque provider references; never record card data, secrets or raw unrestricted payloads.
- Workers/events: preserve actor/initiator, service identity, causation, event ID, retry count and processing outcome across D13 hops; distinguish original actor from executing service.

## 5. Integrity, durability and ordering

- Generate event IDs server-side; validate strict schemas and bounded enumerations at ingestion.
- For critical business mutations, write audit/outbox record in the same database transaction as the state change, or use a documented atomic append mechanism. If durable audit cannot be guaranteed, reject or safely defer the high-risk mutation.
- D13 delivery is at-least-once. Deduplicate by immutable event ID; retain original occurrence time and add separate delivery/processing metadata rather than rewriting the event.
- Use monotonic aggregate version/sequence where order matters. Do not assume global total ordering across distributed clocks.
- Protect records with append-only permissions, restricted database roles, immutable/WORM-capable storage candidate, integrity hashes/signatures or chained checkpoints where justified, and independent key administration.
- Detect gaps, tampering, deletion, clock skew, duplicate IDs, schema drift, backlog and collector outage. Hash chains alone do not protect against an attacker controlling both data and keys.
- Backpressure and outage behavior is risk-tiered: high-risk actions fail closed or remain pending if required audit evidence cannot be persisted; low-risk diagnostics may be buffered/dropped only under documented bounded policy. Never silently discard security events.

## 6. Data minimization and privacy

Apply E11 classification, purpose and retention rules. Default audit content is metadata, not full request/response payload. Use allowlisted attributes, opaque identifiers, keyed pseudonymous references where needed and field-level redaction. Never log passwords, OTP/MFA secrets, access/refresh tokens, cookies, authorization headers, private keys, webhook signing secrets, PAN/CVV/PIN, raw payment credentials or full personal/learner content. Avoid raw prompts, source code, assessment answers, uploaded files, database query parameters and unrestricted provider payloads.

Define separate access/retention classes for security audit, financial evidence, access logs, operational diagnostics and traces. No universal retention duration is invented; determine it from purpose, jurisdiction, contractual/statutory duties, E11 retention schedule and legal holds. Deletion/anonymization must cover replicas, exports, indexes and backups while preserving approved evidence subject to legal authority. Do not use audit data for unrelated profiling or AI training.

## 7. Access, segregation and review

- Audit writers are service identities scoped to append-only operations; ordinary application runtime cannot update/delete audit rows or alter storage policy.
- Audit readers use dedicated least-privilege roles and purpose-bound access. Separate security investigation, privacy review, finance review and platform operations scopes.
- No self-approval of access to sensitive audit data. Privileged audit search/export requires E5 permission, recent authentication/step-up as approved, reason, bounded time/resource scope and audit of the access itself.
- Break-glass access is time-limited, attributable, justified, notified and retrospectively reviewed; emergency use does not suppress logging.
- Restrict bulk export, redact unrelated subjects, watermark/expire exports and record recipient, purpose, filters, count and expiry.
- Review access grants and high-risk events periodically; exact cadence, owners and thresholds remain deferred pending operational governance.

## 8. Detection, alerting and incident response

Create risk-based detection use cases for repeated authentication failures/account recovery abuse; privilege escalation/self-approval; unusual denied access/BOLA probing; sensitive exports and cross-tenant access; audit pipeline gaps/tampering; payment webhook signature/replay/amount mismatch; abnormal refunds/chargebacks; AI tool-policy violations/data exfiltration; sandbox escape/resource-limit anomalies; secret/key changes; retention/deletion failures; and unusual service identities.

Every alert definition must specify event source, query/logic, severity, confidence, threshold/window, owner, on-call route, response playbook, evidence preservation, suppression/tuning and test method. Avoid claiming that every single denied request is an incident; aggregate and contextualize. Monitor pipeline health separately from threat signals: ingestion lag, dropped/rejected events, queue depth, clock skew, schema failures, storage capacity, integrity-check results and alert delivery failures.

Incident workflow: detect → validate → triage → contain → preserve evidence → scope affected subjects/systems → notify security/privacy/legal/finance owners as required → eradicate/recover → verify → document lessons and update threat/control records. Preserve raw evidence only in restricted forensic stores under approved policy.

## 9. Architecture integration and failure modes

E12 integrates with E4/E5 identity and authorization; E6 database permissions and integrity; E7 API route metadata; E8 AI policy decisions; E9 sandbox telemetry; E10 financial events; E11 privacy; D11 admin workflows; D13 outbox/inbox and correlation. Do not create a second source of truth for domain state or bypass module ownership.

Define event schemas and version compatibility; reject or quarantine unknown critical schemas. Collector/transport outages must not block unrelated low-risk operations indefinitely, but high-risk actions cannot proceed without required durable audit evidence. Use bounded buffers, backpressure, retry with jitter, dead-letter quarantine, operator replay with authorization and audit. Never put secrets in dead-letter payloads.

## 10. Deferred decisions

Audit store and isolation topology; append-only/WORM product; cryptographic integrity/checkpoint design and key custody; event broker/collector; schema registry; SIEM/alert platform; event taxonomy registry owner; retention durations by class/jurisdiction; forensic evidence procedure; review cadence; on-call roles and SLOs; alert thresholds; clock synchronization; export approval matrix; legal-hold authority; cost and capacity budgets.

## 11. Acceptance gates

1. Every security-relevant event family has owner, schema, classification, purpose and source.
2. Critical mutations are durably audited atomically or through approved transactional outbox.
3. Audit writers/readers/admins/keys are separated; runtime cannot alter evidence.
4. Schemas, IDs, ordering, retries, dedupe, gaps and tamper detection are specified.
5. Secrets and unnecessary personal/learner/payment content are excluded by default.
6. Audit read/search/export/retention/legal-hold operations are scoped and themselves audited.
7. Alert use cases have owners, thresholds, playbooks and pipeline-health monitoring.
8. E11 retention/legal review and E13 backup/recovery controls are reconciled.
9. E14 independent tests and E15 explicit approval are completed before production reliance.

**Verification status:** Design only. The accompanying 60 controls and 55 scenarios are specifications, not deployed controls or executed tests. No log collector, SIEM, WORM store, database schema, alert, retention job, dashboard, integration or runtime control is implemented or validated.