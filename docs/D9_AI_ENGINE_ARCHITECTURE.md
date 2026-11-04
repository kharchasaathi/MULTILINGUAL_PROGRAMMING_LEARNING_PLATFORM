# D9 — AI Engine Architecture

**Status:** Complete at provider-neutral architecture and contract specification scope  
**Date:** 2026-11-05  
**Depends on:** C1–C15; D1–D8  
**Baseline:** TypeScript strict, NestJS modular monolith, PostgreSQL/Prisma, REST/JSON  
**Decision:** D-0007  
**Scope:** Logical design only; no model/provider selected and no runtime implemented.

## 1. Purpose and governing decision

Define a safe, measurable, provider-neutral AI capability for the programming-learning platform. AI may assist learners and authorized content authors, but it is never the authority for curriculum scope, technical truth, assessment outcomes, learner mastery, access control, review approval or publication.

The engine is an application-owned orchestration boundary. Provider SDKs remain inside replaceable adapters. All prompts, retrieved context, model outputs and provider metadata are untrusted inputs. Server-side policy, deterministic validation and authorized human decisions remain authoritative.

This document extends C8's localization design; it does not replace C8, C14 or C15.

## 2. Goals and non-goals

### Goals
- Support bounded AI tasks: lesson-authoring drafts, six-locale localization drafts, learner explanations/hints, question clarification and controlled code/concept explanation.
- Keep curriculum scope anchored to approved B7–B12 records and W3Schools topic taxonomy.
- Preserve D8 locale identity, C2–C7 language rules, C9 glossary and protected code/token fidelity.
- Validate structured outputs before they can be displayed or enter review.
- Record prompt, schema, policy, model, provider, locale and content provenance.
- Enforce privacy minimization, safety policy, budgets, rate limits and abuse controls.
- Measure quality and reliability without representing model confidence as proof.
- Keep a human approval gate for any content that may become published instructional material.

### Non-goals
- Selecting a vendor, foundation model, embedding model, hosting region or commercial plan.
- Autonomous curriculum discovery or addition of topics outside approved W3Schools scope.
- Autonomous publication, grading of consequential assessments, mastery decisions or certification.
- Running generated or learner-submitted code in the AI service or application process.
- Fine-tuning/training a model or assuming provider data-retention/training behavior.
- Replacing C8 localization, C11 code explanation, C12 assessment, C14 quality evaluation or C15 review workflow.
- Guaranteeing factual correctness, zero hallucinations, perfect translation or uninterrupted provider availability.

## 3. AI task catalogue and authority limits

| Task ID | Capability | Permitted result | Authority boundary |
|---|---|---|---|
| AI-AUTHOR-DRAFT | Draft original lesson sections from an approved lesson brief | Versioned draft for author review | Cannot add curriculum IDs or approve/publish |
| AI-LOCALIZE-DRAFT | Draft one target locale using D8 and C2–C7 | Locale candidate with protected-token manifest | C8/C15 validation and human review required |
| AI-EXPLAIN | Explain an approved lesson concept in the selected locale | Learner-facing explanation | Must stay within lesson context; no invented source claims |
| AI-HINT | Provide progressive hints for an approved exercise | Hint at configured level | Must not reveal answer prematurely unless policy permits |
| AI-CLARIFY | Rephrase an existing instruction or explain a term | Clarification tied to source section | Cannot change task requirements or answer key |
| AI-CODE-EXPLAIN | Explain supplied code or a W3Schools-mapped concept | Explanation and static observations | No execution claim; no unsafe code execution |
| AI-QUESTION-DRAFT | Draft question candidates against approved outcomes | Draft items and rationale | Assessment reviewer owns validity, answer key and scoring approval |

Every task has an explicit task ID, input schema, output schema, policy version, locale policy, maximum context/output size, risk class and budget class. Unknown task IDs are rejected. General-purpose unrestricted chat is not implicitly enabled by this catalogue.

AI must never:
- Choose or alter curriculum scope, prerequisites, lesson outcomes or official source mapping.
- Change answer keys, award marks, determine mastery, unlock levels or issue certificates.
- Grant roles, permissions, subscriptions or entitlements.
- Approve C14 gates, C15 reviews, releases or publication.
- Access arbitrary URLs, browse, invoke tools, write repository files or call privileged APIs.
- Execute code, SQL, shell commands or learner projects.
- Make unsupported claims that code was run, tested, verified or passed.

## 4. Logical architecture and trust boundaries

Logical flow:

`Client → AI Task API → Authentication/Authorization → Task Policy Resolver → Context Assembler → Prompt Registry → Safety Pre-check → Provider Router/Adapter → Output Parser → Deterministic Validators → Safety Post-check → Response/Draft Store → Audit & Usage Ledger`

For instructional content drafts, add C14 evaluation evidence and C15 human review before publication. Learner-facing responses may be returned only after policy, schema, safety and context checks.

### Components

| Component | Responsibility | Must not do |
|---|---|---|
| Task Registry | Allowlisted task definitions, risk and contract versions | Accept arbitrary task names |
| Policy Resolver | Resolve actor, locale, entitlement, task permissions and limits | Trust client-supplied roles |
| Context Assembler | Fetch minimum approved lesson/topic context | Fetch arbitrary URLs or unrelated learner data |
| Prompt Registry | Store immutable, reviewed prompt versions and templates | Allow runtime user edits to privileged instructions |
| Safety Pre-check | Classify input, detect sensitive data and injection indicators | Treat classifier output as sole security boundary |
| Provider Router | Select an approved configured adapter by capability/policy | Expose vendor-specific types to domain contracts |
| Provider Adapter | Map internal request/result to provider API | Hold business authority or publish content |
| Output Validator | Parse schema, enforce bounds and references | Accept arbitrary free-form output as trusted |
| Domain Validators | Check scope, locale, code fidelity, answer policy and semantic constraints | Treat model self-evaluation as proof |
| Safety Post-check | Inspect generated output for unsafe or disallowed content | Replace human specialist review |
| Response/Draft Store | Persist permitted result, provenance and status | Overwrite approved content |
| Usage & Audit | Record safe usage, cost, policy decisions and events | Log secrets or unnecessary raw prompts |

All provider and model responses are untrusted. The AI module has no repository credentials, database superuser, deployment secrets, payment credentials or direct privileged tool access.

## 5. Request and response contracts

### Common request envelope
- `request_id`: client-generated idempotency key, scoped to actor and task.
- `task_id` and `task_contract_version`: exact allowlisted task.
- `locale`: one of `te/en/ml/kn/ta/hi`; explicit user selection wins.
- `context_refs[]`: opaque references to approved server-side content; never arbitrary URLs.
- `input`: task-specific, schema-validated payload.
- `requested_output_schema`: server-resolved schema ID/version, not a client-selected schema.
- `client_context`: only allowlisted, non-sensitive UI context.
- `expected_content_version`: required for authoring/localization operations.
- `consent/purpose`: required where policy or provider data handling requires explicit consent.

Server resolves principal, authorization, locale policy, context, limits, prompt version, provider capability and budget. Client cannot set provider credentials, system prompt, model privilege, approval status, usage quota or safety bypass.

### Common response envelope
- `request_id`, `task_id`, `task_contract_version`
- `status`: `completed | needs_review | refused | rate_limited | unavailable | failed`
- `locale`
- `result`: task-specific validated object or null
- `warnings[]`: stable warning codes, not raw provider diagnostics
- `provenance`: opaque generation record reference and safe version identifiers
- `usage`: normalized token/unit and cost estimate where available
- `created_at`

The server assigns statuses and timestamps. The model cannot set `approved`, `published`, `mastered`, `correct` or equivalent authority-bearing fields. A refusal or unavailable response must fail closed; no silent fallback to a different locale or unapproved provider.

## 6. Provider abstraction and routing

Define an application-owned port with normalized operations:
- capability discovery from a locally approved registry;
- structured generation with declared input/output schema;
- cancellation/timeout support where provider allows;
- normalized usage and error mapping;
- health/capacity signal without exposing provider details to domain modules.

The capability registry records provider/model identifier, supported task classes, structured-output support, locale coverage evidence, context/output limits, data-handling approval, region constraints, availability status, cost schedule version and evaluation status. Registry entries are disabled until reviewed and explicitly enabled.

Routing criteria, in order:
1. Policy and data-classification eligibility.
2. Task capability and output-schema support.
3. Required locale and quality evaluation evidence.
4. Region/residency and contractual approval.
5. Budget and quota availability.
6. Operational health and configured priority.

No provider/model is selected in D9. Fallback is allowed only to another pre-approved adapter meeting the same policy, data and quality requirements. Otherwise return unavailable/queue for later; never downgrade privacy or locale policy to preserve availability.

## 7. Prompt and context governance

- Store prompts as immutable, versioned templates with owner, purpose, task ID, locale behavior, variables, expected schema, safety constraints, change reason and review evidence.
- Separate trusted system policy, task instructions, validated context and user-provided text into distinct typed fields.
- Treat retrieved lesson content, code comments, examples, learner inputs and external strings as untrusted data; delimit and label them as data.
- Do not concatenate untrusted content into privileged instructions.
- Context assembly uses allowlisted internal references and least-data selection; no arbitrary network retrieval.
- Never include passwords, session tokens, provider secrets, payment data or unnecessary personal/health data.
- Prompt changes require version increment, regression evaluation and approval before production activation.
- Record prompt hash/version, task schema version, policy version and context reference/version; avoid storing full raw prompt unless a separately approved privacy policy requires it.
- Do not reveal hidden prompts, secrets, internal policies or another user's context in responses.

Prompt-injection detection is defence in depth only. Security comes from capability restriction, typed context, authorization outside the model, no privileged tools, output validation and least privilege.

## 8. Validation and safety pipeline

Mandatory stages:
1. Authenticate actor and authorize task/resource.
2. Validate request size, task ID, locale, schema and idempotency.
3. Classify data and minimize context; block disallowed sensitive payloads.
4. Resolve approved content and confirm curriculum/topic references.
5. Apply input safety and prompt-injection screening.
6. Resolve approved prompt, model capability and budget.
7. Invoke provider with timeout, output cap and no privileged tools.
8. Parse structured output; reject malformed, oversized, truncated or unknown fields.
9. Validate references, locale, section bounds, code/token fidelity, answer-key boundaries and task invariants.
10. Apply output safety and sensitive-data leakage checks.
11. Persist only permitted output with provenance and audit event.
12. For instructional content, route draft and evidence through C14/C15; do not publish directly.

A failed mandatory stage returns a stable refusal/rejection code and no trusted result. Sanitization is context-specific; never render model output as raw HTML or executable markup. Escape untrusted text and use safe rendering components.

### Risk tiers
- **Low:** bounded explanation of approved public lesson context; automated checks and user feedback.
- **Medium:** exercise hints, code explanations, question clarification; stronger scope/answer leakage checks and abuse limits.
- **High:** authoring, localization, assessment-item drafting, security-sensitive or content that may be published; full provenance, deterministic checks, C14 evidence and qualified human approval.

No model-generated score can waive a mandatory gate.

## 9. Privacy, data classification and retention

Classify data before context assembly:
- **Public learning content:** approved published lessons and topic metadata; eligible only under approved provider terms.
- **Internal draft content:** unpublished authoring/review material; provider use requires explicit organizational approval and data-handling review.
- **Learner data:** profile, progress, attempts and submissions; exclude by default. Any task requiring it needs purpose limitation, minimization, authorization and documented consent/legal basis.
- **Sensitive/restricted data:** credentials, payment details, government identifiers, health data, secrets and security tokens; do not send to generation providers.

Open decisions requiring E-stage privacy/security review:
- Provider training/retention terms and opt-out guarantees.
- Processing region, cross-border transfer and data residency.
- Consent and lawful basis by task and age group.
- Raw prompt/completion retention, deletion and audit retention.
- Redaction strategy and incident response.
- Whether internal drafts may be processed by an external provider.

Do not assume any provider does or does not train on submitted data. No learner personal data is required for core lesson-authoring/localization workflows.

## 10. Cost, quotas and resilience

- Enforce per-actor, per-task, per-locale and platform-wide request/token/cost budgets server-side.
- Use concurrency limits, rate limits, maximum context/output sizes and daily/monthly ceilings.
- Reserve budget before provider invocation; reconcile with normalized provider usage afterward.
- When budget is exhausted, reject or queue according to policy; do not bypass limits or silently switch to an unapproved provider.
- Idempotency prevents duplicate billing and duplicate draft creation.
- Retry only transient network/provider failures with bounded exponential backoff and jitter; do not retry policy refusals, validation failures or unsafe output.
- Use circuit breaking and provider health states; no unbounded retry loops.
- Distinguish timeout, rate limit, quota exhaustion, invalid response, safety refusal, schema failure and provider outage.
- Provide admin reporting for usage, estimated/actual cost, task mix, user-level anomalies and budget alerts.
- Cost estimates are estimates until reconciled with provider billing. Budget values and currency remain undecided.

## 11. Persistence and audit alignment

Logical D4 additions are proposed in `D9_AI_DATA_CONTRACT_MATRIX.csv`; exact Prisma names and migrations are deferred. Persist minimal metadata:
- generation request/job and actor/purpose;
- task and contract version;
- provider/model capability reference and configuration version;
- prompt, policy and output-schema versions/hashes;
- context references and content-version fingerprints;
- lifecycle status, safe error code and timestamps;
- normalized usage/cost record;
- validation/safety evidence references;
- output artifact reference/hash for retained drafts;
- audit event and reviewer/release linkage where applicable.

Do not persist secrets. Raw prompt/completion storage is opt-in by data class and retention policy, not default. Usage and approval history must be auditable without retaining unnecessary personal data. Immutable draft versions are separate from canonical/published content versions.

## 12. Evaluation, observability and continuous improvement

Before enabling a task/provider combination, define an internally authored, permission-cleared evaluation set with representative locales, edge cases, protected code, injection attempts, ambiguity, refusals and malformed outputs. No evaluation corpus is claimed to exist yet.

Measure:
- schema-valid output rate;
- scope/reference violation rate;
- protected-token mismatch rate;
- safety/refusal outcomes and leakage incidents;
- human revision/rejection rate;
- semantic/locale parity review outcomes;
- task completion, timeout and provider error rates;
- p50/p95 latency;
- normalized token usage and cost per task;
- duplicate/idempotency conflicts;
- budget exhaustion and rate-limit events;
- post-publication corrections for AI-assisted content.

Use deterministic contract tests plus reviewed human evaluation. Track model, prompt, schema and policy versions for regression comparisons. Re-evaluate after any model/provider/prompt/policy/schema change. Automated evaluation is a signal, not proof of correctness. Alert on safety incidents, sudden quality regressions, cost spikes and provider failures. Logs must redact secrets and minimize personal data.

## 13. D4/D5/D6/D8/C8/C14/C15 integration

- **D3:** AI Orchestration module owns use cases and ports; provider SDKs remain adapters.
- **D4:** persist job/provenance/usage/validation metadata under AI module ownership; no provider secrets or unnecessary raw prompts.
- **D5:** expose versioned task endpoints using common envelopes, idempotency, authorization, stable error codes and runtime schemas.
- **D6:** require authenticated principal and server-side task/resource permissions; anonymous capabilities, if any, require separate abuse policy.
- **D8:** explicit locale and no silent content-language fallback; use exact locale rules and parity requirements.
- **C8:** localization remains a dedicated task pipeline and uses protected segment processing.
- **C14/C15:** AI creates draft/evidence only; C14 mandatory gates and C15 independent human decisions govern release.

## 14. Acceptance criteria and future test plan

D9 is complete at design scope when:
- AI task catalogue and prohibited authority actions are explicit.
- Provider adapter boundary is vendor-neutral and capability-gated.
- Request/response schemas and server-owned fields are defined.
- Prompt/context injection boundaries and least-privilege rules are explicit.
- Privacy classes, consent/retention open decisions and prohibited data are recorded.
- Validation, output safety, cost, quota, idempotency and resilience behavior are specified.
- D4/D5/D6/D8/C8/C14/C15 integration and human approval boundaries are defined.
- Persistence, audit, evaluation and operational metrics are mapped.
- Future test scenarios and unresolved decisions are documented.

Future tests (not executed):
1. Unknown task ID is rejected.
2. Unsupported locale is rejected.
3. Explicit user locale overrides device suggestion.
4. Unauthorized principal cannot invoke protected task.
5. Cross-user context reference is denied.
6. Unapproved curriculum topic reference is rejected.
7. Arbitrary URL/tool request is never dispatched.
8. Prompt injection inside lesson/code data cannot change trusted policy.
9. Provider response with invalid schema is rejected.
10. Oversized or truncated output is rejected.
11. Unknown output fields and authority-bearing fields are rejected.
12. Protected code/token alteration or omission is rejected.
13. Learner answer key is not exposed by hint task.
14. Model cannot set approval, publication, mastery or score.
15. Unsafe output is blocked from rendering/storage.
16. Sensitive data is redacted or blocked before provider call.
17. Provider/model not approved for data class is not selected.
18. Fallback to an unapproved provider is denied.
19. Budget is reserved and exhausted budgets fail closed.
20. Duplicate idempotency key does not create duplicate work/charge.
21. Transient provider failure retries only within configured bounds.
22. Policy refusal and schema failure are not retried as transient errors.
23. Provider outage returns stable unavailable status.
24. Usage is reconciled without logging secrets.
25. Prompt version change invalidates prior evaluation approval.
26. Model/provider change triggers required regression evaluation.
27. AI content draft cannot enter Published without C14/C15 evidence.
28. Content hash change invalidates affected approvals.
29. Locale mismatch does not silently fall back to another lesson locale.
30. Audit records actor, task, policy and outcome without excessive payload retention.
31. Raw prompts/completions are not retained when policy says metadata-only.
32. Output is rendered as escaped text/typed blocks, never executable HTML.
33. Per-user and global rate limits are enforced.
34. Safety/quality/cost alerts trigger on configured thresholds.
35. Cancellation and stale-job handling do not persist partial trusted output.

These are planned tests, not executed test results.

## 15. Open decisions and handoff

Deferred to later approval:
- Provider/model shortlist, contractual terms, data processing and region.
- Budget/currency, quotas, free-tier policy and premium entitlements.
- AI feature rollout and anonymous-use policy.
- Exact task-by-task output schemas and risk thresholds.
- Prompt ownership, authoring/review roles and evaluation-set governance.
- Raw prompt/completion retention and deletion schedule.
- Embedding/vector search need; not assumed in the baseline.
- Queue/worker choice and asynchronous processing thresholds.
- Provider failover policy and service-level objectives.
- Legal/privacy review for minors and cross-border processing.

**Next task: D10 — Design the progress engine.**
