# C15 — Content Review and Approval Workflow

**Status:** Complete — governance and workflow specification  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C14; particularly C8 localization controls, C9 glossary governance, C10 visual standards, C11 code explanations, C12 assessment specification, C13 project specification and C14 quality evaluation  
**Locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`

## 1. Purpose and boundary

C15 defines who reviews learning content, which evidence is required, how decisions move content through review, how revisions and publication are controlled, and how published content can be corrected, withdrawn or restored.

C14 remains the quality rubric and evaluation record. C15 consumes C14 results and governs workflow decisions; it does not replace the rubric, lower its mandatory gates, or turn a numeric score into automatic approval.

This is a planning contract. It does not implement a review UI, workflow service, database, access-control system, audit store, publisher or content delivery system.

## 2. Governing principles

1. No content is published without an explicit, version-bound release decision.
2. Approval applies to an immutable content version and its dependency fingerprints, not to a lesson ID in perpetuity.
3. Every enabled locale is reviewed independently. A six-locale release is not complete while any required locale is missing, stale, rejected or unapproved.
4. Technical correctness and native-language quality require distinct qualified review evidence. One reviewer may hold multiple qualifications, but must record each capacity separately; high-risk content requires independent reviewers.
5. AI output, automated checks and C14 scores are evidence inputs, never human approval identities.
6. Reviewers must declare conflicts of interest and cannot approve their own authored material.
7. Publication, withdrawal and restoration are privileged actions with server-side authorization and immutable audit events.
8. Review comments must be actionable, respectful, tied to a content location/version and classified by severity.
9. A material change invalidates affected approvals; unchanged evidence may be reused only when dependency fingerprints prove it remains applicable.
10. No workflow status may imply code execution, test success or source verification that did not occur.

## 3. Roles and authority

| Role | Responsibilities | Authority boundary |
|---|---|---|
| Author | Creates and revises canonical content, locale drafts and evidence | Cannot approve own submission or publish |
| Curriculum reviewer | Confirms approved W3Schools scope, topic IDs, module mapping, prerequisites and outcomes | Can pass/block curriculum gate; cannot waive technical or locale gates |
| Technical reviewer | Reviews correctness, code, expected results, terminology and C11/C12/C13 technical behavior | Can pass/block technical gate; execution claims require linked execution evidence |
| Native-language reviewer | Reviews naturalness, grammar, register, terminology and semantic parity for one assigned locale | Approves only the assigned locale and version |
| Assessment reviewer | Reviews item validity, answer keys, scoring, feedback, difficulty and outcome alignment | Can pass/block assessment gate |
| Accessibility reviewer | Reviews semantic structure, keyboard use, alternatives, contrast-independent meaning and responsive usability | Can pass/block accessibility gate |
| Content editor | Checks completeness, structure, consistency, attribution and editorial readiness | Cannot waive specialist gates |
| Release manager/publisher | Verifies all required approvals and authorizes a release | May publish only an eligible, frozen version; cannot self-grant missing approvals |
| Content administrator | Handles emergency withdrawal, access correction and controlled restoration | Must record reason and evidence; cannot silently rewrite history |
| Auditor | Reads decision and release history, investigates process compliance | Read-only; no content approval or publication authority |

A person may hold more than one role if authorized, but author/reviewer separation is mandatory. For a high-risk lesson, assessment, code-execution, security-sensitive or consequential learning outcome, require independent technical review and a second-person release approval.

## 4. Review package and submission contract

Every submission creates a version-bound review package containing:

- Stable content, lesson, module, topic and locale IDs.
- Content version, canonical version, locale version and immutable content hash.
- Changed-section summary and prior-version reference.
- W3Schools source URLs and approved curriculum mapping.
- Learning outcomes, prerequisite graph and next-step references.
- Code sample IDs, language/runtime metadata, expected output and execution evidence status.
- Exercise, quiz, answer-key, rubric and project references as applicable.
- C8 generation provenance when AI assistance was used: model/provider identifier if available, prompt/rules/schema versions, protected-segment validation result and human-edit declaration. Never expose secrets or unnecessary personal data.
- C9 glossary version and unresolved terminology warnings.
- C10 visual asset references, alt/text equivalents and responsive/accessibility evidence.
- C14 quality evaluation record, score, gate results, evaluator identity and rubric version.
- Locale coverage matrix for all six supported locales.
- Author identity, submission timestamp and declared conflicts.

Missing mandatory metadata or invalid references prevent queue entry. A draft may be saved without all evidence, but cannot enter formal review until the submission contract validates.

## 5. Workflow states

The canonical state machine is specified in `C15_REVIEW_WORKFLOW_STATE_MACHINE.csv`.

Primary path:

`Draft → Submitted → Triage → In Review → Revision Required → Resubmitted → In Review → Approved for Release → Published`

Terminal or exceptional states include `Rejected`, `Withdrawn`, `Retired` and `Archived`. `Stale` is a blocking state when content or a required dependency changes after review; it must return through the relevant review gates before release.

State is not the same as individual review decision. Each review assignment records `Pending`, `In Progress`, `Passed`, `Changes Requested`, `Failed`, `Conflict` or `Cancelled`.

### Transition guards

- `Draft → Submitted`: required fields present; author confirms readiness and conflict declaration.
- `Submitted → Triage`: immutable snapshot/hash created; duplicate and scope checks completed.
- `Triage → In Review`: reviewer roles assigned; no unresolved intake blocker.
- `In Review → Revision Required`: at least one actionable change request or blocking defect exists.
- `In Review → Rejected`: out-of-scope, integrity, rights, safety or repeated unremedied critical failure; reason mandatory.
- `In Review → Approved for Release`: every mandatory gate passed, C14 acceptance criteria satisfied, no open blocking defect, locale policy satisfied, all approvals match current hashes.
- `Approved for Release → Published`: release manager rechecks hash/dependencies and confirms publication window/channel.
- Any pre-publication state → `Withdrawn`: author or authorized administrator withdraws with reason; assignments cancelled and audit preserved.
- Any reviewed state → `Stale`: canonical content, glossary, curriculum mapping, policy, code/runtime evidence, asset or other required dependency changes in a way that affects the review.
- `Published → Withdrawn`: authorized emergency or routine withdrawal; public availability is disabled or replaced by a safe notice.
- `Published → Retired`: content is intentionally superseded or no longer offered; history remains accessible to authorized staff.
- `Withdrawn → In Review`: corrected version submitted as a new immutable version; never reopen the old snapshot for editing.
- `Retired → Archived`: retention and legal/policy requirements satisfied; no learner-facing availability.

No direct transition from Draft, Revision Required, Rejected, Stale or Withdrawn to Published is permitted.

## 6. Review stages and queue operations

### 6.1 Intake and triage

Triage checks scope, metadata, source links, locale coverage, dependency integrity, rights/provenance, duplicate submissions, privacy and risk classification. Triage is not content approval.

Assign a risk level:
- **Standard:** ordinary explanatory lesson with no executable or sensitive behavior.
- **Elevated:** complex code, assessment, project, data handling, AI-generated content or broad dependency impact.
- **Critical:** security-sensitive execution guidance, potentially harmful instructions, privacy-sensitive examples, or content whose error could create significant learner harm.

Risk level determines independent reviewer requirements, queue priority and release authorization. Risk classification never removes a mandatory gate.

### 6.2 Specialist review

Assignments are created per content version and, where applicable, per locale. The review package exposes only information necessary for the assigned task.

Required review dimensions:
- Curriculum and source alignment.
- Technical correctness and code fidelity.
- Native-language quality and semantic parity for each enabled locale.
- Assessment validity where assessment items exist.
- Accessibility and responsive presentation.
- Editorial completeness and rights/provenance.
- Safety, privacy and integrity.

C14 provides the scored quality evaluation. Each mandatory C14 gate must pass independently even when the weighted score meets the proposed threshold. The C14 threshold and weights remain subject to validation against real samples; C15 does not treat them as empirically validated.

### 6.3 Decision recording

Every reviewer records:
- Decision and role/capacity.
- Reviewed content hash and dependency versions.
- Checklist/gate outcomes and evidence links.
- Comments with section/block/line or item identifiers.
- Defect severity and requested correction.
- Reviewer identity, timestamp and policy version.
- Conflict declaration or recusal, if applicable.

A reviewer must not mark a gate passed while a blocking defect remains open. Silence, timeout or queue expiry is not approval.

## 7. Defects, revisions and disputes

Severity:
- **Blocker:** unsafe, materially incorrect, out of scope, rights/privacy breach, corrupted code/answer key, or missing mandatory locale/gate. Release prohibited.
- **Major:** materially harms the outcome, technical understanding, assessment validity or language parity. Release prohibited until fixed.
- **Minor:** localized clarity, formatting or non-blocking consistency issue. May be accepted only with documented rationale and an owner/due date.
- **Suggestion:** optional improvement; no release block.

Revision handling:
1. Reviewer creates a version-bound comment and defect.
2. Author receives a consolidated revision request grouped by severity and section.
3. Author submits a new immutable version with a change summary and responses.
4. Changed sections and dependent evidence are identified.
5. Affected gates are reassigned; unaffected approvals may be retained only if hash/dependency checks demonstrate no impact and policy permits.
6. Repeated failure, missed agreed correction window or unresolved blocker may lead to rejection or withdrawal with reasons.

Disputes first go to the review lead, who assigns an independent qualified reviewer. The original reviewer may provide evidence but cannot unilaterally overrule the independent decision. Appeals and final decisions are recorded. A disagreement never silently converts a failed gate to passed.

## 8. Six-locale release policy

Locale records are independently versioned and reviewed. The release manifest lists each enabled locale and its exact approved version/hash.

For a release advertised as supporting all six languages:
- All six locale drafts must exist and match the canonical lesson outcome, code behavior, assessment meaning and difficulty.
- Each locale requires native-language approval and technical approval for locale-specific changes.
- Shared code and answer-key evidence may be reused only when exact hashes match.
- Glossary version and locale-specific unresolved terms must be checked.
- A missing, unavailable, stale, rejected or unreviewed locale blocks the six-locale release.

A product may deliberately release a smaller locale set only if the product's locale-availability policy explicitly permits it, the learner UI clearly reports unavailable languages, and the release manifest names the exact supported subset. It must not imply six-language completion.

## 9. Approval and publication controls

Approval is a conjunction of gates, not a vote or score-only decision.

Release eligibility requires:
- Valid approved curriculum mapping and source provenance.
- C14 quality score meeting the currently approved policy threshold.
- Every applicable mandatory C14 gate passed.
- Technical review passed on the exact release hash.
- Native-language review passed for every locale in the release manifest.
- Assessment, accessibility and editorial reviews passed where applicable.
- No open blocker or major defect.
- All dependency fingerprints current.
- Required independent reviewer/release approvals present.
- No unresolved rights, privacy, security or integrity incident.

Publication controls:
- Only the release manager/publisher permission can publish.
- Authorization is checked server-side on every action.
- Release is an immutable manifest: content hashes, locale versions, dependencies, approvals, policy/rubric versions, channel and timestamp.
- Publication is idempotent; retries cannot create duplicate releases.
- A final preflight compares approved and publishing hashes.
- A changed hash or dependency returns the candidate to Stale.
- Rollout may be staged by environment/cohort; production publication requires a recorded approval.
- Rollback target must be a previously approved release, not an arbitrary draft.
- No direct database edit may bypass the workflow.

## 10. Audit trail and retention

Append-only audit events are required for submission, assignment, access to restricted review material, decision, comment/defect change, revision, approval, release, withdrawal, restoration, retirement, archive and permission change.

Each event records:
- Event ID and schema version.
- Actor/service identity and role.
- Action, timestamp and correlation/request ID.
- Content/version/hash and affected locale.
- Prior and resulting state.
- Reason and linked evidence/decision IDs.
- Policy, rubric and dependency versions.
- Outcome and safe diagnostic code.

Audit records are append-only to application roles. Corrections are new compensating events, never destructive edits. Access is least-privilege; sensitive data is minimized/redacted. Retention periods, legal holds and deletion rules must be decided in the privacy/security architecture before production. Audit logs must not store secrets, full learner submissions or unnecessary personal data.

## 11. Withdrawal, incident response and rollback

Triggers include a discovered technical error, harmful or misleading instruction, privacy/rights concern, compromised asset, invalid source mapping, broken dependency, locale defect or unauthorized publication.

Procedure:
1. Anyone may raise an incident; only authorized roles can change release availability.
2. Triage severity and scope, affected versions/locales/channels and learner impact.
3. For urgent risk, content administrator/release manager may immediately withdraw or disable the affected release and publish a neutral notice.
4. Preserve the release manifest and audit evidence; do not erase the faulty version.
5. Identify whether the issue is localized or affects canonical content and dependent lessons.
6. Correct in a new version, run affected reviews and obtain fresh approvals.
7. Restore only a previously approved safe release or publish the corrected version after full gates.
8. Record incident closure, learner-facing correction/notification decision and follow-up actions.

Rollback must be version-specific and channel-aware. If no known-safe prior release exists, keep the content withdrawn rather than restoring an unverified version.

## 12. Queue, service and operational metrics

Queues are separated by intake, curriculum, technical, each locale, assessment, accessibility, editorial and release. Assignment supports qualification, workload, conflict and risk constraints.

Proposed operational targets (not commitments until staffing and capacity are measured):
- Triage acknowledgement: 2 business days.
- Standard specialist review: 5 business days.
- Elevated review: 3 business days after complete package, prioritized by risk.
- Critical incident triage: immediate on-call escalation once such coverage exists.
- Revision response target: 10 business days, configurable by complexity.

A missed target triggers escalation/reassignment, never automatic approval. Targets must be calibrated using observed volume, reviewer capacity and quality outcomes.

Track queue age, time in each state, reviewer workload, rework rounds, blocker/major defect rates, locale parity failures, stale approval rate, rejection rate, post-release corrections, withdrawal/rollback frequency and appeal outcomes. Report metrics by locale and content type without exposing learner personal data.

## 13. Data contracts

The following logical records are required; exact database and API schemas are deferred to Stage D:

- **ReviewRequest:** request_id, content_id, version_id, content_hash, locale_set, risk_level, submitted_by, submitted_at, state, dependency_fingerprints, policy_versions.
- **ReviewAssignment:** assignment_id, request_id, reviewer_id, role, locale, status, assigned_at, due_at, conflict_status.
- **ReviewComment:** comment_id, assignment_id, content_hash, section_or_item_ref, body, severity, created_by, created_at, resolution_status.
- **Defect:** defect_id, request_id, category, severity, affected_locale, affected_refs, status, owner, resolution_version, rationale.
- **ReviewDecision:** decision_id, assignment_id, reviewer_id, role, locale, decision, gate_results, evidence_refs, reviewed_hash, timestamp.
- **Approval:** approval_id, request_id, gate, locale, approved_hash, approver_id, policy_version, timestamp, revoked_reason.
- **ReleaseManifest:** release_id, content_id, canonical_version, locale_versions, content_hashes, dependency_fingerprints, approval_ids, rubric_version, channel, published_by, published_at, status.
- **AuditEvent:** event_id, schema_version, actor, action, timestamp, entity_refs, prior_state, resulting_state, reason, evidence_refs, correlation_id.

All IDs are stable; timestamps are server-generated; state transitions and authorization are server-enforced. Schema validation, idempotency and concurrency control are mandatory.

## 14. Security, privacy and accessibility requirements

- Enforce role and locale scope on the server; hiding UI actions is not authorization.
- Prevent authors from approving their own content; check reviewer qualifications and conflicts at assignment and decision time.
- Protect review drafts and answer keys from unauthorized learners.
- Sanitize comments and rendered content; treat source text, attachments and AI output as untrusted data.
- Do not execute learner code during review on the main application server. Any later execution verification must use an isolated sandbox with resource limits.
- Minimize personal data in examples and review records; never place secrets in prompts or logs.
- Record AI provenance and automated validation results without treating them as human decisions.
- Provide keyboard-operable review actions, accessible status/defect indicators, readable diffs and locale-appropriate scripts.
- Make withdrawal notices and replacement content accessible and available in affected locales.

## 15. Implementation acceptance and test plan

C15 is ready for architecture decomposition when:
- Roles, separation of duties and approval authority are explicit.
- State transitions and guards are machine-readable and unambiguous.
- Review packages and logical data contracts are version-bound.
- C14 gates are consumed without bypass or duplication.
- Six-locale approval rules and partial-locale release boundaries are explicit.
- Revision, dispute, stale, withdrawal, rollback and audit behavior are defined.
- Authorization, privacy, accessibility and untrusted-content boundaries are specified.
- Queue targets are labelled provisional and measurable.
- No production service, test execution or publication is falsely claimed.

Required future implementation tests (not executed by this specification):

| ID | Scenario | Expected result |
|---|---|---|
| C15-T01 | Author submits missing metadata | Intake rejects submission with field errors |
| C15-T02 | Author attempts to approve own content | Server denies action and audits attempt |
| C15-T03 | Unqualified user accepts technical assignment | Assignment rejected |
| C15-T04 | Reviewer accesses another locale outside scope | Access denied and audited |
| C15-T05 | Required locale missing from six-locale release | Release blocked |
| C15-T06 | Locale approval references old content hash | Approval treated as stale |
| C15-T07 | Canonical lesson changes after locale review | Affected locale reviews invalidated |
| C15-T08 | C14 score passes but mandatory gate fails | Approval blocked |
| C15-T09 | Blocking defect remains open | Release blocked |
| C15-T10 | Reviewer submits decision without evidence | Decision rejected or incomplete |
| C15-T11 | Reviewer has conflict of interest | Assignment/decision paused and reassigned |
| C15-T12 | Author submits revised version | New immutable version created; affected gates reopened |
| C15-T13 | Unchanged gate evidence has matching fingerprints | Reuse allowed only under configured policy |
| C15-T14 | Release manager publishes altered hash | Preflight rejects publication |
| C15-T15 | Duplicate publish request is retried | Idempotent result; no duplicate release |
| C15-T16 | Unauthorized user attempts publication | Server-side authorization denies action |
| C15-T17 | Emergency withdrawal is initiated | Availability disabled; release and audit history preserved |
| C15-T18 | Rollback target is an unapproved draft | Rollback rejected |
| C15-T19 | Previously approved safe release is restored | Exact prior manifest restored and audited |
| C15-T20 | Reviewer silently times out | No approval is inferred |
| C15-T21 | Comment contains unsafe markup | Rendered safely; stored as untrusted text |
| C15-T22 | Audit correction is requested | Compensating event appended; prior event retained |
| C15-T23 | Critical defect affects multiple dependent lessons | Impact analysis queues affected content for stale review |
| C15-T24 | Locale-specific minor issue is accepted | Rationale, owner and due date recorded |
| C15-T25 | Queue SLA is missed | Escalation/reassignment; never auto-approval |
| C15-T26 | Archived content is requested by learner | Not served as active content |
| C15-T27 | Reviewer changes a decision after release | New event and controlled re-evaluation; history retained |
| C15-T28 | Review package includes learner personal data | Minimize/redact or reject before reviewer access |

## 16. Scope limits and handoff

C15 specifies workflow governance only. It does not select a database, API framework, identity provider, queue technology, audit platform or hosting design. It does not implement workflow automation, role enforcement, content diffing, publication, notifications, reviewer dashboards or rollback tooling. Those decisions belong in Stage D and subsequent approved implementation tasks.

C14's rubric weights and 80/100 proposed threshold must be calibrated with representative reviewed lessons before operational rollout. Proposed queue targets require staffing and volume validation. Retention periods require privacy/legal policy decisions.

**C15 is complete at content review and approval workflow specification scope.**  
**Next task: D1 — Select technology stack.**
