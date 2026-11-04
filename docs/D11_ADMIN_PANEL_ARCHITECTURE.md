# D11 — Admin Panel Architecture

**Status:** Complete at logical product, role, workflow and contract specification scope  
**Date:** 2026-11-05  
**Depends on:** C14–C15; D1–D10  
**Baseline:** Next.js App Router admin workspace; NestJS modular monolith; PostgreSQL/Prisma; REST/JSON /api/v1  
**Scope:** Architecture only. No admin UI, backend endpoint, permission seed, database migration or production account is implemented.

## 1. Purpose and authority model

D11 defines a secure, auditable administrative workspace for operating the learning platform: curriculum and content operations, review queues, publication, learner support, localization readiness, AI operations, progress investigation, platform configuration and audit.

The admin panel is a privileged client, not a trusted authority. Every action is authorized by the backend against the authenticated D6 principal, explicit permission, resource scope, account state and workflow state. Hiding a button or route is not authorization.

**Governing rules**
1. Deny by default; least privilege; explicit permission for every privileged operation.
2. Roles and grants are server-controlled, scoped and audited; client-supplied role names are never trusted.
3. Preserve C15 author/reviewer/publisher separation. No self-review, self-approval or self-publication.
4. AI output and automated quality scores are evidence only; they cannot approve, publish, grant permissions or override human decisions.
5. High-impact operations use step-up authentication and/or dual control when approved security policy requires it; exact rules remain E-stage decisions.
6. Prefer versioning, withdrawal, suspension or compensating records over destructive edits.
7. Support all six locales: te, en, ml, kn, ta, hi. Untranslated interface text must not be mistaken for approved learning content.
8. Admins do not bypass W3Schools curriculum scope, D7 prerequisites, D8 locale readiness, D10 evidence or C14/C15 gates.
9. Every privileged action records actor, permission, resource, reason where applicable, server timestamp, outcome and audit reference.

## 2. Goals and non-goals

### Goals
- Task-oriented workspaces for authorized operational roles.
- Queues showing status, ownership, age and actionable blockers.
- Version-aware content review and release management.
- Privacy-minimized learner support and audited interventions.
- Locale readiness, glossary and parity evidence.
- Redacted AI task/usage oversight without secret exposure.
- Read-only progress investigation and aggregate analytics.
- Audit search and operational health for authorized roles.
- Accessible, responsive, keyboard-operable and six-locale admin UI.

### Non-goals
- Universal super-admin or permission bypass.
- Replacing D6 authorization, C15 approval, D7 curriculum, D8 locale, D9 AI or D10 progress ownership.
- Raw database editing, arbitrary SQL/console access or learner score editing.
- Autonomous publication, review approval or curriculum expansion by AI.
- Payment/subscription design (D12), inter-module transport (D13) or end-to-end data flow (D14).
- Selecting identity provider, MFA vendor, hosting, monitoring vendor or retention duration.

## 3. Application boundary and navigation

Admin is a protected web workspace with a distinct route namespace and navigation shell. It may share design tokens and authenticated client infrastructure with the learner app, but it has separate access policies.

| Workspace | Primary tasks | Data owner | Critical guard |
|---|---|---|---|
| Overview | Assigned work, queue age, release readiness, operational alerts | D11 | Permission-filtered aggregates only |
| Curriculum | W3Schools source map, B7–B12 mapping, prerequisites, coverage gaps | D7 | No scope expansion |
| Content Studio | Lesson versions, structured blocks, code samples, diagrams, locale drafts | Content | No direct published-version mutation |
| Review & Approval | Assignments, comments, C14 evidence, C15 gates, release readiness | C15 | No self-review or missing-gate bypass |
| Localization | Six-locale registry, glossary, token validation, parity | D8 | No silent fallback or AI auto-approval |
| Assessments & Projects | C12 item/rubric and C13 brief/milestone review | C12/C13 | No learner result editing |
| Learners & Support | Support cases, minimum profile context, limited account actions | Identity/Support | No unrestricted profile or answer inspection |
| AI Operations | Redacted task metrics, provider health, usage and policy proposals | D9 | No secrets or privileged prompt exposure |
| Progress & Analytics | Aggregate completion/mastery, projection freshness, scoped diagnostics | D10 | Read-only evidence history |
| Assets | Approved asset metadata and content references | Asset module | No public exposure of private assets |
| Access Administration | Role grant requests, approvals, revocation and access review | D6 | No self-grant |
| Audit & Compliance | Restricted audit search and export | Audit | Immutable history |
| Platform Settings | Versioned feature/config proposals and approvals | Platform | No raw secrets or unilateral high-risk change |

Navigation visibility is derived from server-issued effective permissions, but every route, data request and action is independently authorized server-side.

## 4. Roles and separation of duties

Roles are permission bundles, not trusted claims. A person may hold multiple roles only when the grant process allows it; conflicting duties are checked both at assignment and action time.

| Role | Primary authority | Explicit prohibition |
|---|---|---|
| Learner Support Agent | Minimum learner/support context; support notes and approved case workflow | Cannot change scores/mastery, access reviewer notes or grant roles |
| Curriculum Manager | Propose catalogue/source-map and prerequisite changes | Cannot approve own changes or expand W3Schools scope |
| Content Author | Create/edit own draft versions and submit review packages | Cannot approve own work or publish |
| Content Editor | Editorial checks and actionable feedback | Cannot waive specialist gates |
| Technical Reviewer | Technical correctness gate for assigned scope | Cannot self-review or publish |
| Native-language Reviewer | Review assigned locale and version only | Cannot approve another locale without scope |
| Assessment Reviewer | Review item validity, answer keys, scoring policy and rubrics | Cannot edit learner attempt results |
| Accessibility Reviewer | Review accessibility evidence and block release | Cannot waive other specialist gates |
| Release Manager/Publisher | Publish or withdraw eligible frozen releases | Cannot supply missing approval or self-approve |
| AI Operations Manager | Redacted metrics and controlled task-policy proposals | Cannot access secrets or approve/publish content |
| Progress Analyst | Aggregate metrics and scoped diagnostic reads | Cannot mutate progress evidence |
| Security Administrator | Grant/revoke approved roles and investigate access | Cannot approve content by virtue of security role |
| Auditor | Read audit, release and access history | Read-only |
| Platform Administrator | Manage approved operational settings | No blanket learner-data access or approval bypass |

Break-glass access is not a standing role. It must be time-limited, narrowly scoped, reason-bound, alerted and reviewed after use. Grant authority, MFA and dual-control thresholds require E-stage approval.

## 5. Permission model

Use stable permission identifiers and resource scopes. Role-to-permission assignments are centrally managed; exceptions are explicit, time-bounded grants with reason and review date.

Permission families include:
- admin.dashboard.read
- curriculum.read / curriculum.propose / curriculum.submit_review
- content.read / content.create_draft / content.edit_own_draft / content.submit_review
- review.assign / review.comment / review.decide.curriculum / review.decide.technical / review.decide.locale / review.decide.assessment / review.decide.accessibility
- release.readiness.read / release.publish / release.withdraw / release.restore
- localization.read / localization.edit_draft / localization.review / glossary.propose
- assessment.definition.review / project.rubric.review
- learner.support.read_limited / learner.account.suspend.request / learner.account.suspend.approve
- progress.aggregate.read / progress.diagnostic.read_scoped
- ai.metrics.read / ai.policy.propose / ai.policy.approve
- access.grant.request / access.grant.approve / access.revoke
- audit.read / audit.export
- platform.config.propose / platform.config.approve

Each authorization decision considers authenticated principal/account state, permission, resource scope, ownership/assignment, workflow state, conflict-of-interest, independent approver, step-up requirement and emergency-access status. NestJS use cases enforce checks centrally. UI capability hints are advisory only.

## 6. Review and publication workflow

Admin surfaces C15; it does not replace it.
- Submission freezes a version/hash-bound package with curriculum mapping, locale, C14 evidence and provenance.
- Reviewer assignment checks qualification, locale scope and conflicts of interest.
- Decisions bind to exact content hash and gate. Material changes invalidate affected approvals.
- Required specialist gates must pass. Rejected/needs-changes items return to author with actionable comments.
- Publisher sees eligibility checklist and may publish only the frozen approved release manifest.
- Publish, withdraw and restore create immutable audit events and versioned release records.
- Emergency withdrawal requires narrow permission and reason, followed by review.
- Corrections create a new version and re-enter review. No silent edit to a published version.
- C14 score cannot replace mandatory gates or reviewer decisions.

## 7. Learner support and progress investigation

Support views are case-based and purpose-limited; default to minimum profile fields and masked contact data. Sensitive account actions use request/approve workflows where policy requires separation. Detailed assessment responses, private submissions and reviewer notes require separate scoped permission and documented purpose.

Progress investigation is read-only. D10 evidence remains append-only; corrections use its authorized compensating-event process, never direct database editing. No support screen can change assessment scores or mastery. Disputes route to the owning assessment/project review process. Export, erasure, retention and legal-hold requests follow the future approved privacy workflow.

## 8. Localization, AI and analytics workspaces

Localization readiness is shown by immutable content version and release: draft, validation, native review, approved or unavailable. UI translation coverage is distinct from lesson/assessment approval. Preserve protected code tokens and C9 glossary version.

AI operations show task ID, policy/schema version, redacted provider/model identifier, outcome, latency, usage/cost where available, safety/validation result and correlation ID. Secrets and raw sensitive learner prompts are excluded from general dashboards. Policy changes are versioned proposals and require independent approval. AI cannot publish.

Progress analytics show defined aggregate measures, projection lag, rebuild failures and reconciliation alerts. Individual drill-down is restricted and audited. Do not equate engagement/time-on-page with learning or infer ability from noisy signals.

## 9. Admin UX, accessibility and localization

- Responsive desktop/tablet/mobile layouts; dense tables have accessible compact alternatives.
- Keyboard navigation, visible focus, semantic landmarks, accessible names, error summaries and non-color-only statuses.
- Confirm high-impact actions with target, consequence and reason.
- Queue filters, pagination and stable sorting; version/hash, locale, owner, state and blockers visible on review records.
- Privileged decisions wait for server confirmation; stale-data/ETag conflicts never silently overwrite.
- Clear loading, empty, denied, stale and conflict states.
- Admin interface supports te, en, ml, kn, ta and hi. Code identifiers, URLs and protected tokens remain unchanged.
- Prevent hidden data leaks through client caches, browser history, exports and notification previews.

## 10. API and data boundaries

D5 remains HTTP contract authority. Logical resource groups for later D5 reconciliation: admin overview/queues; scoped curriculum/content/review/locale/release search; review assignment/comment/decision; release eligibility/publish/withdraw/restore; learner support cases; aggregate analytics/scoped diagnostics; redacted AI metrics/policy proposals; access grant/revoke and audit search/export.

All bodies are runtime-validated; filters and pagination are bounded; writes use idempotency and expected-version/ETag where appropriate. Actor identity comes from D6 principal, never request body. Every query applies resource scope before returning data. Exports require dedicated permission, purpose, limits and audit.

D4 persistence proposals are in D11_ADMIN_DATA_CONTRACT_MATRIX.csv. These are logical proposals, not Prisma model names or migrations. Do not duplicate C15 decisions, D10 evidence or D7 catalogue state.

## 11. Audit, privacy and security

Audit at minimum actor, effective permission, action, resource ID/type/version/hash, reason where applicable, redacted before/after summary, request/correlation ID, server timestamp, outcome and approval chain. Audit records are append-only and access-controlled.

Controls include server-side object authorization on every list/detail/action/export; CSRF/session protections as finalized in E-stage; bounded search/export; IDOR and privilege-escalation prevention; self-approval and publisher-bypass prevention; safe rendering of learner/reviewer/AI text; CSV formula-injection neutralization; secret/PII redaction; restricted audit export; time-bound break-glass; and no arbitrary SQL, shell, code execution or provider-secret access through admin UI.

Retention, legal hold, data residency, minors' safeguards, export/erasure and incident notification remain E-stage decisions. D11 does not authorize unrestricted learner-data access.

## 12. Operational metrics

Measure queue age/backlog by gate and locale, reviewer assignment latency, rejection/rework rate, release lead time, stale approval invalidations, locale parity blockers, access grant/revocation latency, break-glass use, admin denial rates, audit export volume, support resolution time, AI policy/usage anomalies and progress projection lag. Metrics are aggregated and privacy-minimized.

## 13. Acceptance criteria and future test plan

D11 is complete at architecture scope when workspaces, module ownership, roles, permissions, C15 separation, C14 gates, privacy-limited learner support, read-only progress inspection, AI authority limits, audit requirements, API/data boundaries, accessibility, localization, security and open decisions are documented.

Future tests (not executed):
1. Unauthenticated users cannot access admin routes or APIs.
2. Learners cannot infer admin data by changing route or resource ID.
3. Hidden UI actions remain denied when called directly.
4. Client-supplied role claims cannot grant permissions.
5. Suspended accounts cannot perform privileged actions.
6. Support agents see only minimum permitted learner fields.
7. Support agents cannot read reviewer notes or raw assessment answers.
8. Authors cannot approve their own content versions.
9. Reviewers cannot approve versions they authored or materially edited.
10. Locale reviewers cannot approve outside assigned locale scope.
11. Reviewers cannot decide gates outside their qualifications.
12. Publishers cannot publish when mandatory gates are missing or stale.
13. AI drafts cannot approve or publish themselves.
14. C14 scores cannot bypass mandatory C15 gates.
15. Material content changes invalidate affected approval evidence.
16. Withdraw/restore requires permission, reason and immutable audit.
17. Admins cannot directly alter D10 events, scores or mastery.
18. Progress diagnostic reads are scoped and audited.
19. Role grants prevent self-escalation and enforce independent approval.
20. Emergency access expires and triggers review.
21. Bulk export requires separate permission, purpose, bounds and audit.
22. CSV export neutralizes formula injection.
23. Search/filter parameters are validated and bounded.
24. Stored XSS in learner text/comments/AI output is safely rendered.
25. CSRF/session protections apply to state-changing browser requests.
26. Audit records cannot be modified through admin APIs.
27. Audit search/export is denied to unauthorized roles.
28. All six admin locales can be selected and rendered.
29. Keyboard-only users can complete review/publish tasks.
30. Stale data/ETag conflict prevents overwriting a newer decision.
31. Configured high-impact actions require step-up/dual control.
32. Redacted AI metrics do not reveal secrets or sensitive prompts.
33. Analytics do not expose cross-learner personal data.
34. Platform config changes require versioned proposal and approval.
35. Rate limits/export caps prevent bulk exfiltration.

## 14. Open decisions and handoff

Require approval/security review before implementation: final role catalogue and grant authority; MFA/step-up and dual-control matrix; break-glass expiry/alerts; exact routes and D5 reconciliation; D4 audit entities and immutability; support case and identity-verification lifecycle; export/erasure/legal hold/minors policy; queue SLAs/escalation/staffing; analytics cohort thresholds and drill-down; visual design/breakpoints; AI provider operations and budget.

**Next task: D12 — Design the payment architecture.**
