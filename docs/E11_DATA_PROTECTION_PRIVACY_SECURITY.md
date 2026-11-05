# E11 — Privacy and Data Protection

**Status:** Design baseline complete; implementation and legal review pending  
**Date:** 2026-11-05  
**Authority:** D4 data model; E1 threat model; E3 application security; E4 identity; E5 authorization; E6 database security; canonical E11 privacy slot  
**Scope:** Privacy and data protection requirements. This is not legal advice, a DPIA, compliance certification or evidence of deployed controls.

## 1. Purpose and principles
Protect learner, staff, reviewer and operational data across collection, use, sharing, storage, export, retention and deletion. Apply purpose limitation, data minimization, transparency, accuracy, security, accountability and privacy by default. A feature must identify its purpose, owner, lawful basis/authority, data fields, recipients, retention rule and user-facing notice before collecting personal data.

## 2. Data inventory and classification
Maintain a versioned data inventory with: data subject, field/category, source, purpose, sensitivity, system of record, processors/recipients, region, access roles, retention trigger, deletion behavior, legal hold, derived copies and owner. Reconcile with D4 classifications:
- Public: published curriculum and approved public lessons.
- Internal: unpublished drafts and non-secret operational configuration.
- Confidential: learner profile/preferences, progress, assessment answers, submissions, private assets, AI task metadata and support records.
- Restricted: authentication/recovery factors, provider/payment secrets and sensitive incident evidence.
Do not assume all data in a category has the same legal basis or retention period. Minimize free text and avoid collecting sensitive attributes unless a documented feature need and legal review justify it.

## 3. Purpose, lawful basis and consent
For each processing purpose, document the applicable lawful basis and jurisdiction-specific analysis before launch. Consent, where relied upon, must be informed, specific, freely given, affirmative, granular, recorded with notice/version/time/purpose, and as easy to withdraw as to give. Do not bundle optional analytics, marketing, AI-provider sharing or public profile visibility into core learning consent. Do not treat continued use or a preselected checkbox as consent. Withdrawal stops future optional processing; define lawful handling of data already processed and legally required records. Parental/child-user requirements and age assurance need specialist legal/product review before enabling relevant audiences or features.

## 4. Notices and user rights
Provide clear layered privacy notices at collection and accessible policy pages in supported locales where practicable. Explain purposes, data categories, recipients/processors, transfers, retention criteria, rights, contact/complaint route and material changes. Establish authenticated workflows for access, correction, export, deletion, restriction/objection where applicable, consent withdrawal and grievance. Verify requester identity proportionately; avoid collecting excessive proof. Define response ownership, deadlines based on applicable law, exception handling, appeal and evidence. Never promise a statutory deadline or right without jurisdictional legal review.

## 5. Minimization and lifecycle controls
Collect only required fields; use coarse or pseudonymous identifiers where feasible. Keep identity attributes separate from learning evidence where possible. Avoid sensitive data in URLs, analytics, crash reports, prompts, logs, notifications and support tickets. Set purpose-bound access and expiry for temporary files, exports, invitations and verification artifacts. Define retention triggers and durations per category and legal basis; do not invent universal periods. Expired data is deleted or irreversibly anonymized from active systems and derived stores, subject to approved legal holds and backup expiry. Pseudonymization is not anonymization where re-identification remains possible.

## 6. Sharing, processors and cross-border transfers
Maintain processor/subprocessor inventory, purpose, data fields, region, security terms, retention, deletion, breach notification and audit rights. Complete vendor/privacy review before sending learner data to AI, analytics, email, push, payment, storage or support providers. Minimize payloads and prefer provider-side no-training/no-retention options where contractually verified. Document transfer mechanism and regional restrictions after jurisdiction and hosting are selected. No provider or transfer mechanism is approved by this design.

## 7. AI and automated processing
Do not send personal, confidential or restricted data to an AI provider by default. Require task-specific allowlists, redaction/minimization, user notice and any required legal basis/consent before external processing. Do not use learner data for model training or unrelated profiling without a separate reviewed purpose and valid authority. AI outputs are not authoritative decisions about grades, mastery, access, eligibility or disciplinary action. Document meaningful automated processing, human review, contestability and impact assessment where applicable. Prompts and outputs inherit the highest sensitivity of included source data.

## 8. Children, education and sensitive contexts
The platform targets learners including school students; age range and launch jurisdictions are not yet fixed. Before serving children, complete jurisdiction-specific child privacy, parental consent/authorization, age assurance, targeted advertising, profiling, safety and school/institution obligations review. Do not infer age, disability, religion, caste, health or other sensitive traits from behavior. Do not use sensitive attributes for personalization or ranking without explicit approved necessity and legal review.

## 9. Security, confidentiality and privacy engineering
Apply E3–E6 controls: least privilege, purpose-bound authorization, encryption, secret separation, audit, secure deletion, backup protection and tenant isolation. Use privacy threat modelling and data protection impact assessment where required or risk-appropriate. Mask data in non-production environments; synthetic data is preferred. Redact identifiers and payloads in telemetry; restrict re-identification keys. Restrict support/admin access to ticket-specific scope and time. Ensure exports are encrypted, expiring, one-time or access-controlled, and audited.

## 10. Retention, deletion, backups and legal holds
Create an approved retention schedule for each data class and processing purpose. Deletion must cover primary DB, replicas, object storage, search indexes, caches, analytics, exports and processors. Define tombstones/propagation evidence and distinguish deletion from anonymization. Backups expire under documented schedules and must not be restored into service in a way that silently resurrects deleted accounts; replay deletion ledger/tombstones after restore. Legal holds require documented authority, scope, owner, expiry/review and restricted access; release triggers normal deletion. Financial/security evidence may have separate statutory retention after legal review.

## 11. Incident and breach response
Maintain a privacy incident playbook integrated with E-stage incident response: detect, triage, contain, preserve evidence, assess affected subjects/data/regions/processors, determine notification duties and timelines with counsel, communicate accurately, remediate and document lessons. Processor contracts must support prompt escalation. Do not disclose breach status or affected scope without verified evidence. Exercise scenarios for accidental export, cross-tenant disclosure, lost device, processor incident, prompt leakage and deletion failure.

## 12. Governance and accountability
Assign accountable product/data owner, privacy/legal reviewer, security owner and processor owner per processing activity. Maintain data inventory, notices, consent evidence, processor register, retention schedule, rights-request log, transfer assessment, DPIA/assessment records, incident register and change history. Material changes in purpose, fields, recipients, model training, region, audience or retention trigger review before release. No product team may self-approve a high-risk new processing purpose.

## 13. Open decisions
Launch jurisdictions and entity/controller identity; age range and child-user model; lawful basis per purpose; consent policy; privacy contact/grievance process; data residency/transfers; processor inventory and contracts; AI provider terms; analytics/advertising policy; data retention durations; rights-request SLA; legal holds; breach notification workflow; DPIA threshold; anonymization standard. Resolve with qualified legal/privacy review before launch.

## 14. Acceptance gates
1. Complete data inventory and purpose/basis mapping for every production data flow.
2. Notices, consent and withdrawal behavior match reviewed purposes and supported locales.
3. Rights request workflows cover primary and derived stores, processors and backup resurrection.
4. Child-user and cross-border obligations are resolved before affected processing begins.
5. Processor/AI sharing is approved, minimized and contractually controlled.
6. Retention, deletion, legal hold and incident response are exercised and evidenced.
7. E15 review accepts residual privacy risks before production launch.

**Verification status:** Design specification only. No legal opinion, DPIA, consent UI, privacy notice, processor contract, retention job, deletion workflow, rights request, incident exercise or privacy test has been completed by E11.
**Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
