# E8 — AI Prompt Injection Protection Architecture

**Status:** Complete at security architecture, control catalogue and verification-design scope; implementation pending  
**Date:** 2026-11-05  
**Decision:** E-0009  
**Authority:** D9 AI Engine; C8 localization; C14 quality evaluation; C15 review; D5 API; D6 identity; D11 admin; D13 module communication; E1–E7; E11 privacy  
**Scope boundary:** Provider-neutral design for AI orchestration, retrieval, tools and generated outputs. No model/provider, prompt firewall, classifier, agent runtime, tool integration, production policy or security test is implemented or validated.

## 1. Purpose and security objective

Protect learners, authors, reviewers, platform data and privileged workflows from direct and indirect prompt injection, context poisoning, data exfiltration, unauthorized tool use and unsafe generated content. D9 remains the AI capability and authority boundary: the model is an untrusted probabilistic processor, never a source of policy, identity, permission, curriculum authority, assessment truth, approval or publication authority.

Prompt injection cannot be solved reliably by a single system prompt, keyword filter, model refusal or classifier. E8 therefore uses defense in depth: minimize what the model can see and do; separate trusted policy from untrusted content; authorize tools outside the model; validate every input/output; isolate user and task context; require deterministic and human gates for consequential actions; and monitor abuse.

## 2. Scope and trust boundaries

Applies to learner AI Tutor/explanation/hint flows, authoring and localization drafts, retrieval-augmented generation (RAG), document and code context, conversation memory, tool/function calls, provider adapters, asynchronous AI jobs, admin AI operations and evaluation pipelines.

Trust boundaries:
1. Client/API to AI orchestration: user prompts, attachments and client metadata are untrusted.
2. Orchestrator to policy/context builder: only server-authorized task context may cross.
3. Retrieval/index to model context: retrieved documents, chunks, metadata and citations are untrusted data even when sourced from platform content.
4. Model/provider to orchestrator: text, structured output, refusal labels, tool calls and confidence are untrusted.
5. Orchestrator to tools/domain modules: model proposals are not authorization; deterministic policy and E5 checks govern execution.
6. AI output to learner/author/reviewer: output requires task-specific validation, provenance and appropriate human review.
7. Logs/evaluation/telemetry: prompts and outputs may contain personal, confidential or malicious content and inherit E11 obligations.

## 3. Non-negotiable invariants

1. System/developer policy and server-side authorization are not overridable by user prompts, retrieved text, tool output, code comments, metadata or model-generated instructions.
2. Treat all user-provided and externally retrieved material as data, never as executable policy. Quoting or labeling content does not make it safe.
3. The model has no ambient credentials, database access, filesystem access, network access or unrestricted tool capability.
4. Every tool call is a proposal. A deterministic server-side broker validates schema, task, principal, permission, resource scope, arguments, quotas and current state before dispatch.
5. No AI call can grant roles, change permissions, approve/review/publish content, set authoritative grades/mastery, alter payments/entitlements, delete accounts or execute learner code.
6. Separate data by principal, tenant, task and purpose. Never place another user's private context in a prompt or shared memory without explicit authorized purpose.
7. Retrieve only the minimum authorized context; enforce access control before retrieval and again before returning citations/snippets.
8. Treat retrieved content, citations, OCR, transcripts, code, HTML, Markdown, comments, metadata, images and tool results as potentially adversarial.
9. Validate structured outputs against strict schemas and domain invariants; reject unexpected fields, tool names, arguments, URLs, markup and unsupported claims.
10. Do not rely on model refusal, self-assessment, confidence or prompt wording as a security control.
11. Fail closed on policy uncertainty, authorization failure, malformed output, provider ambiguity or unavailable validation.
12. No sensitive prompts or outputs are retained or shared with providers beyond documented purpose, minimization, E11 review and configured policy.

## 4. Instruction hierarchy and context construction

- Keep immutable application policy, task contract and tool policy in server-owned configuration outside user-editable content stores.
- Construct each request from a typed task envelope: task ID, authenticated principal reference, permitted capability, locale, content/version references, data classification, output schema, token/cost limits, expiry and correlation ID.
- Separate trusted instruction fields from untrusted content fields in the provider adapter. Use explicit delimiters and provenance labels for readability, but never treat delimiters as a security boundary.
- Never concatenate retrieved text into privileged instructions or allow content to redefine system policy, tool permissions, data scope, output schema or task objective.
- Exclude previous conversation turns unless needed, authorized, recent and within the same principal/task boundary. Do not let user-controlled memory persist as policy.
- Do not include secrets, access tokens, API keys, internal system prompts, hidden chain-of-thought, other-user records or unrestricted database rows in context.
- Apply context budgets, source caps, recency/version rules and deterministic truncation; fail safely rather than silently dropping trusted policy or authorization metadata.

## 5. Retrieval and document-ingestion defenses

- Apply E5 authorization and E11 purpose checks before search, vector retrieval, reranking, citation resolution and snippet delivery. A vector similarity score is not an access decision.
- Partition or filter indexes by tenant/principal/classification where required; metadata filters are defense in depth, not sole authorization.
- Store provenance: source owner, source ID/version/hash, classification, ingestion time, trust class and permitted task/use. Unknown provenance is excluded from sensitive tasks.
- Treat uploaded PDFs, documents, webpages, code repositories, lesson drafts, comments, OCR and extracted metadata as hostile. Scan/quarantine files under E7/E3 controls before indexing.
- Detect and flag instruction-like content, hidden text, suspicious metadata and source poisoning as risk signals; do not rely on detection to establish safety.
- Prevent unauthorized index writes, poisoning, stale ACLs and cross-tenant embedding leakage. Re-check current source access when generating citations or returning retrieved excerpts.
- Retrieved source text cannot authorize tools, expand data scope, change a learner's role or bypass C15 review.

## 6. Tool and action security

- Maintain a server-owned allowlist of tools per AI task. Default is no tools; expose only the smallest read-only capability required.
- Tool schemas are strict, typed, bounded and versioned. Reject unknown tool names, extra arguments, malformed identifiers, arbitrary URLs, path fragments and free-form command strings.
- Broker each call through a deterministic policy enforcement point: resolve principal; validate task capability; evaluate E5 permission and object ownership; check tenant and state; apply rate/size/time quotas; log decision; invoke the owning module's application port.
- Tool outputs return as untrusted data and cannot issue new instructions or authorize follow-on actions. Limit tool-call depth, count, fan-out and total wall-clock/cost budget.
- No shell, SQL, browser automation, arbitrary HTTP, filesystem, secret-store, deployment, payment, account-management or code-execution tool is available to general learner/author AI tasks.
- Any future write-capable tool requires a separately approved use case, explicit user intent/confirmation where appropriate, least-privilege scoped capability, idempotency, human approval for high impact, reversible workflow and E15 gate.
- Model-suggested URLs or fetch destinations must pass E2 SSRF controls; model output cannot bypass network allowlists.

## 7. Output handling and content safety

- Parse structured output with strict schemas; reject malformed JSON, duplicate keys, unexpected properties, oversized output and invalid enum values.
- Validate lesson/topic references against approved B7–B12 curriculum identifiers and source versions; model-generated IDs or citations are not authoritative.
- Validate localization using C8 glossary, protected-token/code fidelity and locale rules. Model output remains a draft pending C14/C15 checks and human review.
- Escape output for the destination context; sanitize supported Markdown/HTML and URLs; disallow scripts, event handlers, unsafe embeds and dangerous link schemes.
- Never render raw model HTML or execute generated code. Code explanations and examples are inert content unless a separately approved sandbox workflow permits execution after E9/L13–L15/E15.
- Treat model claims, citations, factual assertions, grades and confidence as unverified. Use deterministic validators and authoritative records; do not let generated output mutate assessment scores, mastery, publication or entitlements.
- Mark AI-generated drafts and preserve model/provider, prompt-template, policy, schema, source and reviewer provenance.

## 8. Data protection and cross-user isolation

- Minimize prompt data to fields necessary for the task; pseudonymize learner references where possible.
- Never include authentication factors, tokens, payment secrets, full private profiles or another learner's records in model context.
- Do not use one user's private prompt/output as another user's retrieval context, memory or training/evaluation sample without documented authority and approved safeguards.
- Apply provider-specific retention/training controls only after due diligence; do not assume zero retention or no training by default.
- Define prompt/output retention, access, deletion, legal hold, region and transfer controls under E11 before launch.
- Redact prompts and outputs from logs by default; store content only when necessary, access-controlled, encrypted and retention-bound.

## 9. Abuse resistance and operational safeguards

- Apply per-principal, task and provider rate, token, concurrency and cost budgets; protect against recursive tool loops, repeated retries, context stuffing and denial-of-wallet.
- Use bounded timeouts, cancellation, circuit breakers and safe fallback. Provider outage never causes a less restrictive policy.
- Separate staging/evaluation datasets from production learner data. Use synthetic or approved minimized fixtures for adversarial testing.
- Record minimal security telemetry: task/template/policy version, principal pseudonymous reference, source IDs, tool decision, validator result, token/cost band, provider outcome and correlation ID. Avoid raw sensitive prompt content.
- Alert on cross-user retrieval denials, suspicious instruction patterns, repeated tool-policy denials, unusual export attempts, schema failures, token/cost spikes and policy drift.
- Provide an incident path to disable a task/tool/provider, revoke credentials, quarantine poisoned sources, invalidate affected indexes and preserve minimal evidence.

## 10. Evaluation and release gates

Build a versioned adversarial evaluation suite covering direct and indirect injection, retrieval poisoning, cross-user leakage, tool misuse, exfiltration, jailbreaks, multilingual and obfuscated attacks, multimodal hidden instructions, unsafe output, refusal regressions and denial-of-wallet. Include both attack and benign-control cases to measure false positives and task utility.

Evaluate each supported locale (Telugu, English, Malayalam, Kannada, Tamil, Hindi), task, model/provider, prompt-template and tool-policy version. Use deterministic assertions for access boundaries, tool permissions, schema validity, source scope and prohibited side effects; use human review for semantic quality. A model judge alone is insufficient.

Release gate: threat review; approved data-flow and provider assessment; tool inventory and permissions; retrieval ACL tests; cross-tenant isolation tests; prompt/output schema tests; adversarial regression suite; privacy review; budget/abuse tests; monitoring/kill-switch drill; human review workflow; rollback plan; E14 evidence and E15 approval. Any critical cross-user disclosure or unauthorized side effect blocks release.

## 11. Deferred decisions

AI provider/model and hosting; prompt-template registry and signing/versioning; retrieval/vector store and ACL implementation; classifier/detector use; tool registry and approval authority; provider retention/training/region terms; per-task budgets and thresholds; memory policy; content scanning vendors; telemetry retention; supported multimodal inputs; incident ownership and SLOs. Resolve before production AI enablement.

## 12. Completion boundary and hard gates

E8 completes architecture, controls and future verification design only. No prompt firewall, classifier, retrieval ACL, tool broker, provider setting, redaction pipeline, evaluator, adversarial test or runtime mitigation is claimed as implemented. General AI tasks must remain least-privilege and no-tool by default until E8 controls are implemented and E14/E15 gates are satisfied. Learner code execution remains disabled until E9, L13–L15 and E15 approval.
