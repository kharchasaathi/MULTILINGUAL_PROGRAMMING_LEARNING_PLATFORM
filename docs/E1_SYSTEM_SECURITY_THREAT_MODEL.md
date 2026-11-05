# E1 — System Security Threat Model

**Status:** Complete — architecture-level threat model and risk register documented  
**Date:** 2026-11-05  
**Decision:** E-0001  
**Branch:** docs/project-foundation  
**Inputs:** D1–D15, D6 identity, D9 AI, D11 admin, D12 payment, D13 module communication, D14 end-to-end flows, Security Constitution and Engineering Constitution  
**Scope boundary:** Design-time threat identification and proposed controls. No implementation, provider assessment, penetration test, vulnerability scan, security certification or production control validation is claimed.

## 1. Executive summary

E1 establishes the platform-wide security threat model before detailed controls are designed in E2–E15.

The platform handles learner identities, profiles, progress, assessment answers, project submissions, unpublished course material, privileged review decisions, AI requests, payment evidence and administrative operations. It also plans to execute learner-supplied programs in a future isolated sandbox. These assets create different confidentiality, integrity and availability risks.

Highest-priority themes:
1. Account takeover, session compromise and authorization bypass.
2. Cross-learner IDOR/BOLA across API, project, assessment, progress, asset and admin resources.
3. Supply-chain or deployment-secret compromise.
4. Prompt injection or context contamination causing cross-user disclosure or unauthorized AI actions.
5. Malicious learner code escaping its sandbox and reaching host, control plane, internal network or other tenants.
6. Forged/replayed payment webhooks or reconciliation errors causing unauthorized financial transitions or entitlement grants.
7. Forged, replayed, poisoned or misrouted internal events corrupting progress, entitlements, notifications or audit evidence.
8. Data exfiltration through uploads, logs, backups, exports, telemetry or support/admin workflows.
9. Denial of service through authentication abuse, expensive AI/playground requests, large uploads, event retry storms or database exhaustion.
10. Privileged insider/admin misuse or separation-of-duties bypass.

**E1 conclusion:** Threats and trust boundaries are documented and mapped to proposed controls, owners, residual risks and later E-stage tasks. This is an architecture-level baseline, not a security approval. Critical sandbox risk remains a hard enablement blocker.

## 2. Scope, assumptions and exclusions

### In scope
- Next.js website/PWA and Expo native clients.
- API edge and NestJS modular monolith.
- Identity provider boundary and D6 principal/session/authorization model.
- PostgreSQL/Prisma and object storage.
- Curriculum/content/localization, C15 review and release, assessment, projects and progress.
- AI orchestration and external model/provider adapters.
- Payment provider, hosted checkout, webhook ingress, payment records and entitlement evaluation.
- D13 application ports, outbox, inbox, workers, replay and reconciliation.
- Notification providers, admin workspace, audit, telemetry, CI/CD, secrets and backup/recovery.
- Future code playground and external isolated execution gateway.

### Explicitly out of scope
- Selection/configuration of identity, cloud, AI, payment, storage, messaging, notification, telemetry or sandbox vendors.
- Exact production network topology, regions, firewall rules, key-management product or retention durations.
- Detailed control specifications assigned to E2–E13.
- Test execution assigned to E14; final security approval assigned to E15.
- Legal advice, PCI scope determination, regulatory certification or formal privacy impact assessment.
- Claiming any control is deployed or effective in a running environment.

### Assumptions to validate
- All clients, external providers, uploaded content, learner input, AI output, code and event payloads are untrusted.
- Backend and each domain module enforce their own authorization and state invariants.
- PostgreSQL is the authoritative relational store; module ownership is logical within the initial modular monolith.
- Async delivery is at-least-once; duplicate and out-of-order delivery are expected.
- No authoritative offline writes are enabled initially.
- Code execution remains disabled until E9 and L13–L15 gates have independent evidence and approval.
- Compromise of a privileged control-plane credential or CI/CD identity can have platform-wide impact.

If an assumption changes, review the affected threats and risk scores.

## 3. Security objectives and risk scoring

### Security objectives

| Objective | Required property | Example failure |
|---|---|---|
| Confidentiality | Only authorized actors access data for an approved purpose | Learner A reads learner B's assessment |
| Integrity | Only the owning authority changes a record or decision | Client sets score, payment success or release approval |
| Availability | Critical workflows resist abuse and recover safely | AI cost exhaustion takes down the platform |
| Authenticity | Principals, providers, producers and events are verified | Forged identity callback or payment webhook |
| Accountability | Sensitive actions have attributable protected evidence | Admin role grant cannot be traced |
| Isolation | One tenant/process/runtime/environment cannot compromise another | Sandbox escape |
| Privacy | Personal data is minimized, purpose-bound and lifecycle-managed | Prompts/logs/backups retain learner data indefinitely |
| Safety/correctness | AI and learning decisions cannot exceed their authority | Prompt injection changes scoring or approves content |

### Qualitative 5 × 5 model

Likelihood: 1 Rare, 2 Unlikely, 3 Possible, 4 Likely, 5 Almost certain.  
Impact: 1 Negligible, 2 Minor, 3 Moderate, 4 Major, 5 Severe.

Inherent score = Likelihood × Impact.
- Critical: 20–25
- High: 12–19
- Medium: 6–11
- Low: 1–5

This is a prioritization aid, not a statistical probability. Residual ratings are provisional design judgments after proposed controls; they are not measured. Critical inherent risk cannot be accepted for production merely because controls are documented. A named risk owner must provide evidence and E15 approval for residual High risks or any exception.

## 4. System context and trust boundaries

### Logical data-flow context

\`\`\`mermaid
flowchart TB
  subgraph TB1["TB1 — Untrusted client boundary"]
    WEB["Web / PWA"]
    MOB["Expo native"]
    USER["Learner / Author / Reviewer / Admin"]
    USER --> WEB
    USER --> MOB
  end
  subgraph TB2["TB2 — Public edge and API boundary"]
    EDGE["TLS edge / rate limits / request validation"]
    API["NestJS API / request context"]
    WEB --> EDGE
    MOB --> EDGE
    EDGE --> API
  end
  subgraph TB3["TB3 — Application authority, still least-privilege"]
    IAM["D6 Identity & Authorization"]
    DOM["Owning domain modules"]
    AI["D9 AI orchestration"]
    ENT["Entitlement"]
    AUD["Audit"]
    API --> IAM
    IAM --> DOM
    DOM --> AI
    DOM --> ENT
    DOM --> AUD
  end
  subgraph TB4["TB4 — Data and asynchronous boundary"]
    DB[("PostgreSQL")]
    OBJ[("Private object storage")]
    OUT["Outbox / worker / inbox"]
    DOM --> DB
    DOM --> OBJ
    DOM --> OUT
    OUT --> DOM
  end
  subgraph TB5["TB5 — External provider boundary"]
    IDP["Identity provider"]
    AIP["AI provider"]
    PAY["Payment provider / webhook"]
    MSG["Email / push provider"]
    IAM <--> IDP
    AI <--> AIP
    DOM <--> PAY
    DOM --> MSG
  end
  subgraph TB6["TB6 — Future untrusted code execution boundary"]
    GW["Playground gateway"]
    SB["Disposable isolated sandbox"]
    DOM --> GW
    GW --> SB
  end
  subgraph TB7["TB7 — Privileged operations boundary"]
    CI["CI/CD and build identities"]
    OPS["Cloud / secrets / backup / telemetry operations"]
    CI --> OPS
    OPS --> DB
    OPS --> OUT
  end
\`\`\`

This is a logical diagram. It does not assert that deployment topology or network controls already exist.

### Trust-boundary register

| ID | Boundary | Untrusted crossing | Primary concern |
|---|---|---|---|
| TB1 | Browser/mobile/device | Form data, local state, deep links, cache, device integrity | Client tampering, token theft, XSS, insecure storage |
| TB2 | Internet/API edge | HTTP headers/body/query/files/origin/cookies/tokens | Injection, CSRF, abuse, oversized requests, auth bypass |
| TB3 | Application/module authority | User identifiers, role context, service calls | BOLA/IDOR, confused deputy, ownership bypass |
| TB4 | Database/object/event worker | Serialized records, file metadata, queue payloads, replay | Data corruption, SQL injection, event poisoning, duplicate effects |
| TB5 | Third-party provider | Tokens, callbacks, generated text, provider errors/status | Spoofing, SSRF, provider compromise, data leakage |
| TB6 | Sandbox/host | Arbitrary learner code, packages, files, runtime behavior | Escape, lateral movement, resource exhaustion |
| TB7 | Control plane/operations | Build artifacts, secrets, deployment identity, backups, logs | Privilege escalation, secret theft, destructive deployment |

### Entry points
- Public website, PWA service worker, native app, deep links and app links.
- Authentication callbacks, verification, recovery, account linking and session refresh.
- Every D5 public, learner, author, reviewer, publisher, admin and internal API route.
- Search, lesson rendering, rich content, Markdown/HTML, code samples and locale assets.
- Upload authorization, direct upload, confirmation, scanning, download and signed URL issuance.
- Assessment attempts, response submission and scoring.
- Project submissions, attachments, review and rubric evidence.
- AI tutor, generation, localization, context retrieval and provider callbacks.
- Checkout, payment status, refund requests, provider webhook and reconciliation.
- Outbox dispatcher, worker, inbox consumers, dead-letter queue, replay and scheduled jobs.
- Notification templates, destination resolution and provider callbacks.
- Admin workspaces, role assignment, exports, emergency access and privileged commands.
- GitHub repository, dependencies, CI runners, deployment workflow and environment secrets.
- Database administration, object storage, telemetry, backups and restore process.
- Future playground execution API, sandbox control plane and runtime images.

## 5. Assets and security classification

| ID | Asset | Classification | Owner | Objective |
|---|---|---|---|---|
| A01 | Authentication credentials, session and refresh material | Restricted | D6/provider | Confidentiality/authenticity |
| A02 | Internal principal, external identity link and account state | Confidential | D6 | Integrity/privacy |
| A03 | Role assignments, permission policies and service identities | Restricted | D6 | Integrity/accountability |
| A04 | Learner profile, preferences and contact attributes | Confidential | Learner/D6 | Privacy |
| A05 | Assessment answer keys, attempts and responses | Restricted/Confidential | C12 | Confidentiality/integrity |
| A06 | Project source, submissions, rubric and feedback | Confidential | C13 | Confidentiality/integrity |
| A07 | Progress evidence, completion and mastery projections | Confidential | D10 | Integrity/privacy |
| A08 | Unpublished lessons, translations and review comments | Internal/Confidential | Content/C15 | Integrity/confidentiality |
| A09 | Published curriculum and approved lessons | Public | D7/Content | Integrity/availability |
| A10 | AI prompts, retrieved context, output and provider metadata | Confidential | D9 | Privacy/integrity |
| A11 | Orders, payment state, refunds and disputes | Restricted/Confidential | D12 | Integrity/confidentiality |
| A12 | Effective entitlement grants and revocations | Confidential | Entitlement | Integrity/authorization |
| A13 | Uploaded files, object keys and signed URLs | Confidential by default | Asset | Confidentiality/malware safety |
| A14 | Outbox/inbox events, worker jobs and dead letters | Confidential/Restricted by payload | Producer/consumer | Authenticity/integrity |
| A15 | Audit evidence, security incidents and access logs | Restricted | Audit/Security | Integrity/confidentiality |
| A16 | Provider/API/CI/CD/KMS credentials and signing keys | Restricted | Platform operations | Confidentiality/integrity |
| A17 | Database, object-store and backup copies | Inherit highest source class | Platform operations | Confidentiality/recovery |
| A18 | Sandbox host, images, control plane and tenant data | Restricted | Playground | Isolation/availability |
| A19 | Source code, dependencies, build artifacts and manifests | Internal/Restricted | Engineering/Operations | Integrity/supply chain |
| A20 | Notification destinations and message contents | Confidential | Notification/Learner | Privacy/authenticity |

This is a proposed baseline. D4/E11 must finalize field-level classification, lawful purpose, retention, deletion and legal-hold rules.

## 6. Threat actors and abuse cases

| Actor | Capability/motivation | Abuse |
|---|---|---|
| Anonymous internet attacker | Automated scanning, bots, crafted requests | Public route exploit, DoS, enumeration |
| Malicious learner | Valid low-privilege account | IDOR, assessment manipulation, prompt injection, resource abuse |
| Compromised learner account | Stolen session/credentials | Data theft, unauthorized purchase, project theft |
| Malicious author/reviewer | Legitimate scoped access | Self-approval, content poisoning, answer-key exposure |
| Malicious/compromised admin | Privileged access | Role escalation, export, unauthorized refund/policy changes |
| Malicious upload author | Crafted HTML/SVG/archive/document | Stored XSS, parser exploit, malware, decompression bomb |
| Malicious code author | Arbitrary program execution if enabled | Sandbox escape, mining, scanning, lateral movement |
| Prompt-injection author | User/retrieved text under attacker control | AI policy override attempts, context exfiltration |
| Compromised provider | Provider account/API/callback compromise | Fake events, data misuse, malicious SDK/response |
| Supply-chain attacker | Dependency, package, action, runner compromise | Build/deploy compromise, credential theft |
| Insider/operator error | Legitimate operational access | Accidental exposure, destructive migration, unsafe replay |
| Fraud actor | Repeated checkout/refund/account actions | Payment abuse, chargeback/promotion abuse |

## 7. STRIDE analysis by boundary

| Boundary | Spoofing | Tampering | Repudiation | Information disclosure | Denial of service | Elevation of privilege |
|---|---|---|---|---|---|---|
| TB1 Client/device | Fake client/device or stolen session | Modify IDs, scores, prices, locale | Dispute client actions | Local cache/token theft | Automated floods | UI bypass to hidden route |
| TB2 Internet/API | Forged auth/callback headers | Injection, mass assignment, request smuggling | Missing request/audit correlation | Error leakage, cache mix-up | Flood, expensive endpoints, body bombs | Auth bypass, route/verb confusion |
| TB3 Application | Spoof service principal | Cross-module writes, state bypass | Missing actor/causation | BOLA/IDOR, cross-user response | Expensive call graph | Confused deputy, role/policy bypass |
| TB4 Data/event | Forged producer/event | Poison/replay/reorder, SQL injection | Mutable/missing event history | DB/object/dead-letter leakage | Queue backlog, DB locks, retry storm | DB role escalation, worker overprivilege |
| TB5 Provider | Fake webhook/provider identity | Alter callback, malicious SDK/response | Unverifiable receipt | Provider prompt/data leakage | Provider outage/quota exhaustion | Credential misuse, callback SSRF |
| TB6 Sandbox | Fake job/tenant identity | Runtime escape, artifact tamper | Missing execution provenance | Host/other-tenant file read | CPU/memory/process/network exhaustion | Container/VM escape |
| TB7 Operations | Stolen CI/ops identity | Artifact/workflow/secret/backup tamper | Untracked emergency change | Secret/log/backup theft | Destructive deployment | CI runner to cloud admin/DB superuser |

STRIDE is a coverage aid, not a replacement for abuse-case analysis, privacy review, code review or specialist sandbox/payment assessment.

## 8. Threat register — principal scenarios

Detailed machine-readable records are in E1_THREAT_REGISTER.csv. The register contains 30 threats, inherent scoring, mitigations, owners, next stages and provisional residual ratings.

### Critical threats

**E1-TH-01 — Sandbox escape / host compromise**
- Assets: A18, A16, A17 and tenant data reachable from execution environment.
- Path: crafted code/dependency exploits runtime or isolation and obtains host privileges, metadata access or cross-tenant access.
- Impact: platform-wide compromise, data theft, outage and persistence.
- Required treatment: no execution in API/web process; disposable per-job isolation; separate control/data planes; non-root; no privileged container, host socket or host mounts; read-only minimal filesystem; strict CPU/memory/PID/disk/time limits; egress denied by default; metadata/internal addresses blocked; no production secrets mounted; signed/pinned images; patching and escape monitoring.
- Residual: High until E9 and L13–L15 independent tests/approval. Execution remains disabled.

**E1-TH-02 — CI/CD or signing-secret compromise**
- Assets: A16, A19, A17.
- Path: malicious dependency/action, poisoned pull request, compromised runner, leaked token or overprivileged deploy identity.
- Impact: backdoor deployment, secret exfiltration, database compromise or disabled controls.
- Required treatment: protected branches/environments; minimal GitHub App/token permissions; pinned actions/dependencies; isolated ephemeral runners; no untrusted PR secrets; artifact provenance/signature and review; secret scanning; short-lived deployment credentials; environment separation; production approval; rollback/audit.
- Residual: High until G10–G12 and E2/E6 evidence.

**E1-TH-03 — Cross-user object access (BOLA/IDOR)**
- Assets: A04–A08, A10–A13 and A20.
- Path: attacker changes learnerId, progressId, attemptId, submissionId, assetId, orderId or taskId.
- Impact: private learning data, source code, answers, AI context or financial details exposed/modified.
- Required treatment: derive principal from validated session; load through owning module; enforce owner/relationship/scope on every read/write; opaque IDs are not authorization; privacy-preserving not-found; negative tests for every resource/role.
- Residual: High until full resource matrix and automated cross-user tests; then reassess.

**E1-TH-04 — Privileged account takeover or role escalation**
- Assets: A01–A03, A08, A11, A12, A15.
- Path: credential stuffing, recovery abuse, stolen session, account-link collision, self-grant or weak privileged step-up.
- Impact: access-control takeover, content release, refund/role changes and learner-data export.
- Required treatment: standards-based auth; issuer/audience/signature/nonce/state/redirect validation; session rotation/revocation; risk-based step-up/MFA; privileged grant dual control; scoped/time-bound roles; no self-grant; alert on recovery/role changes.
- Residual: High until E4/E5 decisions and validation.

**E1-TH-05 — Payment webhook spoofing/replay or false financial state**
- Assets: A11, A12, A15.
- Path: forged signature, replayed valid event, wrong merchant/environment, amount/currency/order mismatch or duplicate/out-of-order event.
- Impact: fraudulent entitlement, duplicate refund/financial record and revenue loss.
- Required treatment: raw-body signature verification; timestamp/replay policy; provider+merchant+event dedupe; strict amount/currency/order/environment matching; durable receipt before ack; immutable state transitions; reconcile ambiguous retry; D12 owns financial facts and Entitlement owns grants.
- Residual: High until E10 provider-specific verification and reconciliation tests.

**E1-TH-06 — AI prompt injection / cross-user context exfiltration**
- Assets: A05–A10, A16.
- Path: malicious learner text, lesson, code comment, upload or retrieved document instructs model to ignore policy, reveal context, invoke tools or expose another learner.
- Impact: privacy breach, unsafe answer, answer-key leakage, unauthorized action or corrupted draft.
- Required treatment: no privileged credentials/tools; retrieve only authorized minimum context; strict user/context separation; treat retrieved content as data; typed tool allowlists and server authorization; deterministic output schema/safety validation; no raw HTML execution; human C15 approval; provider data minimization.
- Residual: Medium for bounded assistant tasks after E8 evaluations; High for privileged tool action (prohibited).

### High and medium threats

| ID | Threat | Impact path | Required treatment | Owner / next stage |
|---|---|---|---|---|
| TH-07 | Session replay, CSRF, XSS or fixation | Unauthorized actions/account compromise | Secure cookie/BFF or native storage decision, CSRF, CSP, output encoding, rotation/revocation | App/Identity E3/E4 |
| TH-08 | API injection, mass assignment, parser abuse | Data corruption or unintended behavior | Strict schemas, allowlisted DTOs, parameterized queries, safe errors | API E3/E7 |
| TH-09 | Malicious upload/stored XSS/parser exploit | Malware, script execution, parser exhaustion | Quarantine, type allowlist/magic bytes, scan, archive limits, safe headers | Asset E3/E6 |
| TH-10 | Event spoofing, poisoning, replay or schema confusion | Corrupt progress/entitlement/notification | Producer auth, schema validation, inbox dedupe, sequence checks, quarantine | D13 E6/E7/E12 |
| TH-11 | Overprivileged worker | Cross-module data/secret access | Separate service identities/DB roles, minimum payloads, bounded retry, restricted replay | D13 E6/E7/E12 |
| TH-12 | Admin separation-of-duties bypass | Self-approval, wrong hash/locale, unauthorized refund | C15 checks in owner transaction, immutable decisions, dual control, audit | D6/D11/C15 E5/E12 |
| TH-13 | AI provider data leakage/malicious response | Sensitive prompt disclosure or unsafe output | Data minimization, provider review, strict parser, safe rendering | AI/Privacy E8/E11 |
| TH-14 | Payment/entitlement state confusion | Incorrect premium access or revocation | Server-derived entitlement, verified facts, source-specific grants, reconciliation | Payment E5/E10 |
| TH-15 | Resource exhaustion / DoS | Auth, AI, upload, job or DB exhaustion | Per-actor/global quotas, concurrency, size/time caps, backpressure | Platform E2/E3/E7/E8/E9 |
| TH-16 | Secrets/PII in logs, traces, URLs or exports | Credential and personal-data leak | Structured allowlist logging, redaction, restricted access, masking | Audit/Privacy E6/E11/E12 |
| TH-17 | Database compromise/privilege escalation | Data/schema/backup compromise | Separate runtime/migration/reporting roles, TLS, private networking, safe queries | Data/Platform E2/E6 |
| TH-18 | Object storage/signed URL exposure | Private asset leak | Private buckets, short-lived scoped URL, owner check, cache isolation | Asset E3/E6 |
| TH-19 | Dependency/supply-chain compromise | Malicious build or credential theft | Lockfiles, provenance, dependency/action pinning and scanning | Engineering F11/G10/E2 |
| TH-20 | Notification spoofing/data leakage | Wrong recipient or private content disclosure | Server-resolved destination, verified callbacks, template escaping, minimal content | Notification E3/E7/E11 |
| TH-21 | Backup theft/corruption/unusable restore | Irrecoverable or exposed data | Separate backup identity/failure domain, encryption/key recovery, restore drills | Operations E6/E13 |
| TH-22 | Cache poisoning/cross-user leakage | Private response served to another user | Public immutable content only in shared cache; private no-store; safe keys/invalidation | App/Platform E2/E3 |
| TH-23 | Account enumeration/recovery abuse | Identity disclosure, takeover or lockout | Uniform public responses, single-use challenges, layered rate limits | Identity E4 |
| TH-24 | Audit evidence tampering/repudiation | Privileged actions cannot be investigated | Append-only writer, restricted roles, integrity monitoring | Audit E12 |
| TH-25 | Over-collection/uncontrolled retention | Privacy breach and excessive exposure | Purpose inventory, minimization, retention/deletion, legal hold, backup alignment | Privacy E11/E13 |
| TH-26 | SSRF via URL fetcher | Internal service/metadata access | Avoid arbitrary fetch; allowlist; DNS/IP/redirect revalidation; block private/link-local/metadata; egress proxy | Platform/App E2/E3/E8 |
| TH-27 | Locale/release/cache confusion | Draft, wrong locale or answer-key disclosure | Exact approved release resolver; separate UI/content fallback; locale/version cache key | Content E3/E7 |
| TH-28 | Cross-module confused deputy | Broad service identity acts for wrong actor/resource | Validated actor/purpose; owner rechecks scope; narrow machine permissions | Domain E5/E7 |
| TH-29 | Insider misuse/emergency access | Unauthorized export, replay or policy change | Time-bound scope, step-up, dual control, reason, audit and post-review | Security/Admin E5/E12 |
| TH-30 | Provider outage/key rotation fail-open | Fabricated success or unauthorized fallback | Fail closed for protected actions; pending/unknown states; circuit breakers and reconciliation | Platform/Domain E2/E4/E8/E10/E13 |

## 9. Mandatory architectural guardrails

### Identity and authorization
- Validate issuer, audience, signature, expiry, nonce/state and exact redirect URI using an approved protocol profile.
- Resolve issuer+subject to internal principal; never use email or client-supplied ID as authority.
- Deny by default; enforce action permission and resource ownership inside owning module.
- Re-check account status, scope, workflow state, assurance and separation-of-duties at mutation time.
- Revoke sessions on logout, suspension, recovery and suspected compromise.
- No self-grant; machine principals cannot receive human approval permissions.

### API and application
- Validate every untrusted boundary with strict, versioned runtime schemas.
- Allowlist DTO fields; reject mass assignment and unexpected fields on sensitive commands.
- Use parameterized database access and safe context-specific output encoding.
- Apply request/body/file/time/concurrency limits before expensive processing.
- Prevent CSRF where cookie auth applies; use CSP and secure headers; never expose secrets to browser storage.
- Normalize errors; do not disclose stack traces, provider internals or resource existence unnecessarily.

### Data and assets
- Separate runtime, migration, reporting, backup and worker database roles.
- Keep object storage private by default; scope upload/download authorization and scan before use.
- No sensitive data in public/shared caches; no secrets in URLs, logs, events or traces.
- Define data classification, purpose limitation, retention/deletion and legal-hold policy before launch.
- Backups inherit source classification; recovery includes keys and object assets.

### AI
- AI has no privileged tools, database credentials, deployment secrets or ability to act as a human.
- Retrieve context only after authorization for the actor and task.
- Prompt injection detection is supplemental; capability restriction and server authorization are primary.
- Validate output schema, references, locale, code/token fidelity and safety.
- Never render model output as executable HTML or execute generated code in application process.
- AI output cannot grade, approve, publish, change roles or grant entitlement.

### Payments and events
- Verify webhook signatures over raw bytes before trusting callbacks.
- Validate merchant, environment, order, currency, amount, event ID and replay window.
- Persist receipt durably before acknowledgment; process idempotently; reconcile ambiguous/out-of-order outcomes.
- Payment owns financial facts; Entitlement owns effective access.
- Outbox/inbox records are versioned, bounded and deduplicated; unknown event versions are quarantined.
- Replay is privileged, audited and preserves original event identity.

### Sandbox
- Playground execution remains disabled.
- No host mounts, host socket, privileged runtime, production credentials or unrestricted network.
- Each job is disposable and isolated; quotas and hard timeout are enforced outside learner code.
- Independent escape testing and E15 approval are mandatory before enablement.

### Operations and supply chain
- Protect branch, environment, workflow and deploy permissions.
- Pin/review dependencies and actions; scan secrets and artifacts.
- Use short-lived least-privilege deployment credentials and separate environments.
- Monitor auth abuse, authorization denials, AI spend, webhook mismatch, queue lag, data export and sandbox anomalies.
- Maintain incident response, key rotation, backup restore and rollback runbooks.

## 10. Risk ownership and E-stage mapping

| Owner | Threats | Control task |
|---|---|---|
| Platform/Network | TH-15, TH-17, TH-19, TH-26, TH-30 | E2 |
| Application/API | TH-07, TH-08, TH-09, TH-15, TH-18, TH-20, TH-22, TH-26, TH-27, TH-28 | E3 |
| Identity | TH-04, TH-07, TH-23, TH-30 | E4 |
| Authorization/Admin | TH-03, TH-12, TH-14, TH-28, TH-29 | E5 |
| Data/DB/Assets | TH-09, TH-16, TH-17, TH-18, TH-21, TH-25 | E6 |
| API/Events | TH-08, TH-10, TH-11, TH-20, TH-26, TH-28 | E7 |
| AI | TH-06, TH-13, TH-15, TH-26 | E8 |
| Sandbox | TH-01, TH-15 | E9 |
| Payment | TH-05, TH-14, TH-30 | E10 |
| Privacy | TH-13, TH-16, TH-25, TH-27 | E11 |
| Audit/Operations | TH-10, TH-11, TH-12, TH-16, TH-24, TH-29 | E12 |
| Backup/Recovery | TH-17, TH-21, TH-30 | E13 |
| Security verification | All applicable threats | E14 |
| Security approval | Residual risks and exceptions | E15 |

## 11. D15 gate linkage

| D15 gate | Threat linkage | Required next evidence |
|---|---|---|
| GATE-01 Schema reconciliation | TH-03, TH-10, TH-11, TH-16, TH-17, TH-25 | D4 ownership, classification, retention and migration model |
| GATE-02 Exact API contracts | TH-03, TH-07, TH-08, TH-20, TH-26, TH-28 | D5 route schemas, auth scopes, webhook/internal contracts |
| GATE-03 Identity/session | TH-04, TH-07, TH-23, TH-30 | E4/E5 approved flows and session controls |
| GATE-04 Locale policy | TH-27 | E3/E7 safe resolver and cache behavior |
| GATE-05 AI provider/privacy | TH-06, TH-13, TH-16 | E8/E11 provider/data approval |
| GATE-06 Payment/provider | TH-05, TH-14, TH-16 | E10 webhook/merchant/security review |
| GATE-07 Entitlement policy | TH-05, TH-14, TH-28 | E5/E10 grant/revoke policy |
| GATE-08 Worker operations | TH-10, TH-11, TH-15, TH-24 | E6/E7/E12 durable worker and replay controls |
| GATE-09 Sandbox | TH-01, TH-15 | E9 plus L13–L15 independent security tests |
| GATE-10 Privacy lifecycle | TH-13, TH-16, TH-25 | E11 retention, deletion, export and legal review |
| GATE-11 Backup/recovery | TH-17, TH-21, TH-30 | E13 restore and key recovery evidence |
| GATE-12 CI/quality gates | TH-02, TH-19, TH-24 | F/G pipeline and security checks |
| GATE-13 Hosting/secrets | TH-02, TH-16, TH-17, TH-19, TH-26 | E2/E6 deployment and secret architecture |
| GATE-14 Offline policy | TH-07, TH-22, TH-27 | E3 client/cache policy; no authoritative offline writes |
| GATE-15 Project/assessment evidence | TH-03, TH-10, TH-12, TH-28 | E5/E7 versioned producer/consumer and ownership tests |

## 12. Monitoring and incident indicators

Exact thresholds and vendors are deferred to E2/E12.

| Signal | Potential threat | Response direction |
|---|---|---|
| Failed sign-in/recovery and unusual session reuse | TH-04/07/23 | Throttle, step-up, revoke suspicious session, investigate |
| Cross-owner 403/404 spikes or resource enumeration | TH-03/28 | Rate-limit, alert, preserve minimal audit |
| Role grant, account link, break-glass or publisher anomaly | TH-04/12/29 | Suspend/revoke pending review, dual-control investigation |
| AI token/cost/concurrency or refusal spikes | TH-06/13/15 | Apply budgets/circuit breaker, inspect redacted telemetry |
| Webhook signature/mismatch/replay failures | TH-05/14 | Reject, quarantine, reconcile with provider |
| Outbox age, retry storm, dead-letter and sequence gap | TH-10/11/15 | Backpressure, pause affected consumer, reconcile |
| Upload scan failures, parser crashes, abnormal size | TH-09/15 | Quarantine, block object, inspect isolated scanner |
| Sandbox escape indicators or unexpected egress | TH-01/15 | Terminate job, isolate host, preserve forensic evidence |
| Secret-scanner alert or unexpected CI identity | TH-02/19 | Revoke/rotate credentials, halt deployment, investigate provenance |
| Backup failure, key anomaly or restore mismatch | TH-21/30 | Protect copies, recover keys, invoke recovery runbook |
| Audit gap, tamper attempt or privileged export spike | TH-16/24/29 | Restrict access, preserve independent evidence, incident response |

## 13. Residual risks and explicit non-acceptance

- Sandbox escape risk remains High and execution is disabled.
- Identity/session and privileged account takeover remain High until E4/E5 decisions and implementation tests.
- Payment webhook fraud and entitlement confusion remain High until E10 provider contract, signature verification and reconciliation tests.
- CI/CD compromise remains High until protected environments, short-lived identities and artifact controls are implemented.
- Cross-user IDOR risk remains High until resource ownership tests and runtime authorization are verified.
- Privacy, retention, deletion, data residency and minors' data remain open until E11/legal review.
- Backup/restore risk remains High until E13 recovery and key-restoration drills are executed.
- Residual ratings are provisional. No risk is accepted merely because mitigation is written.

Any change to data flow, provider, trust boundary, privileged capability, execution runtime or public API requires threat-model delta review before release.

## 14. E1 acceptance criteria

| Criterion | Result |
|---|---|
| Scope, assumptions and exclusions documented | Complete |
| Logical system context and trust boundaries documented | Complete |
| Entry points and assets classified at baseline level | Complete |
| Threat actors and abuse cases identified | Complete |
| STRIDE coverage across trust boundaries recorded | Complete |
| Threat register with owners and E-stage mapping created | Complete |
| Critical sandbox and privileged risks explicitly gated | Complete |
| D15 GATE-01–GATE-15 mapped to threats | Complete |
| Proposed controls and monitoring indicators recorded | Complete |
| Residual risks and non-acceptance conditions explicit | Complete |
| Provider-specific controls validated | Pending E2–E13 |
| Automated threat tests / penetration tests executed | Pending E14 |
| Security approval | Pending E15 |

## 15. Future verification plan — not executed

1. Validate every external entry point is represented.
2. Validate every protected resource has an owner and authorization check.
3. Test cross-learner access for profile, progress, assessment, project, asset, AI task, order and admin resources.
4. Test forged/expired/wrong-audience identity tokens and callback state.
5. Test CSRF, XSS, open redirect and session fixation after transport selection.
6. Test injection, mass assignment, oversized body and parser limits.
7. Test malicious file types, archive bombs and stored active content.
8. Test AI prompt injection in learner text, lesson, code comments and retrieved documents.
9. Verify AI cannot access another learner's context or invoke privileged tools.
10. Test forged, replayed, duplicated, out-of-order and mismatched payment webhooks.
11. Test event producer spoofing, schema downgrade, unknown version, replay and duplicate delivery.
12. Test worker restart, lease expiry, poison event quarantine and authorized replay.
13. Test C15 author/reviewer/publisher separation and hash binding.
14. Test sandbox tenant isolation, network denial, metadata blocking and escape resistance before enablement.
15. Test AI/upload/playground cost, concurrency and resource exhaustion controls.
16. Test secrets and personal data redaction in logs, traces, dead letters and exports.
17. Test private object storage, signed URL expiry and cache isolation.
18. Test CI dependency/action tampering and untrusted pull-request secret exposure.
19. Test database role separation, injection resistance and backup access restrictions.
20. Test restore of database, objects and encryption keys; verify reconciliation.
21. Test account enumeration, recovery abuse and rate-limit bypass.
22. Test audit tamper resistance, privileged export and break-glass review.
23. Test provider outage, key rotation and fail-closed behavior.
24. Re-score each threat after control evidence and document exceptions.

These are planned tests. None were executed by E1.

## 16. Handoff

**E1 is complete at architecture-level threat modelling scope.**

Deliverables:
- docs/E1_SYSTEM_SECURITY_THREAT_MODEL.md — narrative threat model, trust boundaries, STRIDE, risk treatment and acceptance.
- docs/E1_THREAT_REGISTER.csv — machine-readable threat register.
- docs/SECURITY_CONSTITUTION.md — updated to reference E1 as the baseline threat model.

**Next task: E2 — Network protection.**

E2 must convert TB2, TB5 and TB7 network threats into deployment-independent network security requirements, ingress/egress policy, service connectivity boundaries, DNS/SSRF protections, TLS, environment isolation, network monitoring and unresolved topology decisions. Do not select a hosting vendor without an approved decision.
