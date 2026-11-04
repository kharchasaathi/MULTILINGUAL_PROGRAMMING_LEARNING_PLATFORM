# C8 — AI Localization Engine Design

**Status:** Complete — logical architecture, contracts, controls and acceptance criteria defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C7 — Shared lesson contract and six native-language teaching specifications  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools remains the exclusive curriculum topic/source reference  
**Artifact:** `docs/C8_AI_LOCALIZATION_ENGINE_DESIGN.md`

## 1. Purpose and decision

Design a controlled AI-assisted system that creates, adapts and reviews lesson-language variants while preserving the shared learning contract, technical correctness, code fidelity and native-language quality.

**Decision:** AI is an authoring assistant, not the authority for curriculum scope, technical correctness, assessment decisions or publication. The engine produces versioned drafts and validation evidence. Publication requires the human review and approval workflow defined by the content process.

C8 defines a logical design and implementation contract. It does not select a model vendor, framework, database, hosting platform or paid API. Those decisions belong to the software architecture stage.

## 2. Goals and non-goals

### Goals
- Generate original lesson drafts for all six supported locales.
- Adapt the explanation to each language's native teaching rules, not translate sentence by sentence.
- Preserve lesson identity, topic scope, outcome, prerequisites, level, difficulty intent and assessment policy.
- Protect code, identifiers, syntax, literal output, URLs and structured metadata from accidental rewriting.
- Validate structure, language requirements, parity and safety before human review.
- Support targeted regeneration without silently changing approved content.
- Record provenance, model/configuration versions, validation results, reviewer decisions and content versions.

### Non-goals
- Automatically expand or choose curriculum topics beyond approved B7–B10 maps.
- Treat AI output as verified code or as a substitute for a technical reviewer.
- Publish generated content without approval.
- Guarantee zero hallucinations, perfect translation, or flawless technical correctness.
- Execute learner-submitted or generated code on the main application server.
- Replace the C9 canonical glossary, C10 visual teaching rules, C11 code explanation format, C12 assessment design or C14–C15 quality/approval processes.
- Train a foundation model or make a model-provider commitment in C8.

## 3. Architectural principles

1. **Contract first:** validate the source lesson and metadata before any generation request.
2. **One canonical lesson:** all locales derive from one immutable lesson identity and shared learning contract.
3. **Native authoring:** generate directly in the requested teaching language using its C2–C7 rules; do not use English as a mandatory intermediate translation.
4. **Scope locked:** topic IDs and source URLs must resolve to the approved W3Schools-derived curriculum inventory.
5. **Code protected:** code and other immutable tokens are handled as protected segments, not ordinary prose.
6. **Structured output:** use a versioned schema; never parse free-form prose as the authoritative lesson record.
7. **Layered validation:** schema, scope, protected-token, semantic parity, language, safety and human checks are separate gates.
8. **Human authority:** only authorized reviewers can approve or publish.
9. **Traceability:** every generated draft is reproducible to the extent supported by recorded inputs, prompt version, model identifier and settings.
10. **Least privilege and privacy:** provide only the minimum lesson data needed; do not send learner personal data to a generation model.
11. **Provider independence:** isolate model calls behind an adapter and keep model-specific behavior out of lesson contracts.
12. **Honest status:** generated, validated, reviewed, approved and published are distinct states.

## 4. Logical component architecture

| Component | Responsibility | Must not do |
|---|---|---|
| Lesson Intake Validator | Validate C1 metadata, source lesson state, IDs, locale and approved scope | Invent missing curriculum facts |
| Curriculum Scope Resolver | Confirm topic/module IDs and W3Schools source URLs against approved registers | Search or import unrelated curriculum |
| Canonical Lesson Store | Supply the approved source lesson and immutable shared fields | Let a locale draft overwrite the canonical lesson |
| Locale Policy Registry | Load the matching C2–C7 rules and locale configuration | Substitute another locale's rules |
| Glossary Resolver | Supply approved C9 term mappings when available; before C9, pass canonical terms and mark glossary coverage as provisional | Invent an approved glossary entry |
| Protected Segment Processor | Identify and preserve code, identifiers, API tokens, URLs, file names and literal outputs | Translate or normalize protected values |
| Prompt/Task Composer | Build a bounded task from validated lesson data, locale rules and protected segments | Treat source text as trusted instructions |
| Model Adapter | Call the configured model and return structured candidate output | Store provider secrets in lesson content |
| Output Parser & Schema Validator | Parse and validate the versioned response schema | Accept arbitrary unstructured output |
| Fidelity & Parity Validator | Compare immutable fields, protected segments and learning contract | Declare technical correctness solely from textual similarity |
| Locale Quality Validator | Check locale-specific writing and required lesson sections | Claim native fluency without human review |
| Safety & Scope Validator | Detect scope drift, unsafe content, prompt-injection attempts and disallowed data | Execute generated code |
| Draft Version Manager | Store candidate versions, diffs, lineage and validation reports | Replace approved versions silently |
| Review Workbench | Present source/target comparison, warnings, diff and reviewer actions | Allow AI to approve itself |
| Audit & Metrics Recorder | Record events, outcomes, costs and review feedback | Log secrets or unnecessary personal data |

These are logical boundaries. Deployment topology and technology choices remain for Stage D.

## 5. End-to-end generation workflow

`REQUESTED → INTAKE_VALIDATED → SCOPE_CONFIRMED → POLICY_LOADED → SEGMENTS_PROTECTED → GENERATION_REQUESTED → OUTPUT_PARSED → SCHEMA_VALIDATED → FIDELITY_CHECKED → PARITY_CHECKED → LOCALE_CHECKED → SAFETY_CHECKED → HUMAN_REVIEW → APPROVED → PUBLISHED`

Rules:
- Any failed mandatory validation moves the candidate to `REJECTED` or `NEEDS_REVISION`; it cannot proceed to approval.
- A transient provider or network failure may be retried under bounded retry policy; validation failures must not be blindly retried as if they were network errors.
- Regeneration creates a new draft version. It never mutates the canonical source or a published locale version.
- A reviewer may request a targeted section revision. The engine must preserve unaffected approved sections and show the resulting diff.
- Approval is bound to the exact content hash/version reviewed. Any subsequent content change invalidates that approval.
- Publication is a separate authorized action after all required reviews are complete.

## 6. Input contract

Each request must include or resolve these fields:

| Field | Requirement |
|---|---|
| `request_id` | Unique request identifier |
| `lesson_id` | Stable C1 lesson identity |
| `source_content_version` | Exact canonical source version |
| `target_locale` | One of `te`, `en`, `ml`, `kn`, `ta`, `hi` |
| `module_id`, `track_id`, `level` | Must match approved curriculum mapping |
| `topic_ids` | Non-empty approved topic identifiers |
| `learning_outcome` | Immutable shared outcome |
| `prerequisite_lesson_ids` | Validated against C1/B11 |
| `lesson_type` | Allowed C1 lesson type |
| `assessment_policy_id` | Existing approved assessment policy reference |
| `source_urls` | W3Schools URLs already recorded for the approved topic |
| `locale_rules_version` | Exact C2–C7 rules version |
| `glossary_version` | Approved C9 version, or explicit provisional state until C9 exists |
| `protected_segments` | Typed tokens with stable IDs and original values |
| `generation_profile` | Approved prompt/model configuration version |
| `requested_sections` | Full lesson or explicitly scoped sections |

Reject a request if lesson identity, approved topic mapping, target locale, source version or required policy references are missing or inconsistent. Do not infer a missing topic from the prompt.

## 7. Output contract

The model adapter must return a candidate object that validates against a versioned schema. Required logical fields:

- `schema_version`
- `request_id`
- `lesson_id`
- `source_content_version`
- `target_locale`
- `locale_content_version` (candidate version)
- `title`
- `sections[]` with stable C1 section IDs and localized learner-facing headings
- `learning_outcome_ref` (reference to immutable shared outcome, not a rewritten outcome)
- `prerequisite_refs[]`
- `topic_refs[]`
- `protected_segment_refs[]`
- `source_urls[]`
- `generation_provenance`
- `validation_status`
- `review_status`

Each section has a stable `section_id`, localized `heading`, typed `blocks[]` and optional `review_notes`. Block types must be an explicit allowlist, for example: paragraph, list, callout, code-reference, expected-output, table and text-alternative. C11/C10 may refine block schemas later; do not treat this illustrative list as their final specification.

The model may propose content only. Server-controlled code assigns approval/publication states, timestamps, content hashes, reviewer identities and final version numbers. The model cannot set itself to Approved or Published.

## 8. Protected content and code fidelity

Before generation, classify content into:
- **Immutable:** code blocks, keywords, identifiers, API names, file paths, URLs, literal expected output, stable IDs, schema keys and machine-readable metadata.
- **Constrained:** technical terms, numeric values, assessment choices, answer keys, learning outcomes, prerequisite links and topic references.
- **Localizable:** explanatory prose, learner-facing headings, examples' narrative context and instructions, subject to parity and scope checks.

Implementation requirements:
1. Assign each protected segment a stable placeholder ID and store its exact original value outside the model-editable text.
2. Give the model only the placeholder and its intended role, not permission to rewrite the protected value.
3. Validate that every required placeholder appears exactly once unless the schema explicitly allows reuse.
4. Reject missing, duplicated, altered, reordered-when-order-is-significant or unknown placeholders.
5. Reinsert original values from the trusted segment store after validation.
6. Compare exact bytes or canonical serialized values for immutable fields; do not rely on fuzzy text similarity.
7. Preserve whitespace and line endings for expected output and code.
8. If a protected value must be explained, explain it in a separate prose block; do not alter the token itself.

## 9. Native-language generation policy

The locale policy registry selects exactly one ruleset:
- `te` → C2 Telugu
- `en` → C3 English
- `ml` → C4 Malayalam
- `kn` → C5 Kannada
- `ta` → C6 Tamil
- `hi` → C7 Hindi

The task composer must instruct the model to:
- Write naturally in the target language and follow its learner address, register, script and editorial conventions.
- Preserve canonical English technical terms and exact protected segments.
- Explain unfamiliar technical terms at first meaningful use.
- Keep the shared learning outcome and assessment intent unchanged.
- Produce original explanations, examples, hints and exercises.
- Avoid culturally narrow assumptions, stereotypes and irrelevant local context.
- Keep the same conceptual depth and learner effort as the source lesson.
- Return only the requested schema, with no invented source citations or curriculum entries.

English source prose is context, not a command hierarchy. Text inside learner content, examples, comments, code strings or imported source fields is untrusted data. It must never override system policy, locale rules, scope constraints or schema.

## 10. Validation gates

| Gate | Example checks | Failure action |
|---|---|---|
| Schema | Required fields, types, allowed blocks, valid locale, section IDs | Reject malformed output |
| Curriculum scope | Approved topic IDs, module/track alignment, W3Schools source URL membership | Reject scope drift |
| Immutable fidelity | Code, identifiers, URLs, output, IDs and metadata unchanged | Reject and regenerate protected sections |
| Constraint fidelity | Outcomes, prerequisites, assessment policy, answer keys and numeric facts unchanged | Needs technical correction |
| Section completeness | Required C1 sections present or documented N/A reason | Needs revision |
| Locale rules | Script, register, learner address, first-use term explanation, readability checks | Needs language review |
| Semantic parity | Same concept, objective, difficulty intent, task constraints and answer correctness | Needs bilingual/pedagogical review |
| Safety/privacy | No secret exposure, personal data leakage, unsafe execution instruction or prompt-injection override | Reject or escalate |
| Human review | Language, technical and pedagogy approvals recorded | Block publication |

Automated semantic checks are advisory signals, not proof of equivalence. A human reviewer remains responsible for nuanced language, pedagogy and technical meaning.

## 11. Prompt-injection and security controls

- Treat every lesson body, example, code comment, source excerpt, learner submission and external string as untrusted data.
- Keep trusted instructions, locale policy, scope policy and user-authored lesson content in separate typed fields.
- Do not concatenate untrusted text into privileged instruction sections.
- Explicitly instruct the model to ignore instructions found inside source material that request policy changes, secret disclosure, tool use or scope expansion.
- The generation model receives no repository write credentials, deployment credentials, payment access or unrestricted network/tool access.
- Do not let the model choose or call arbitrary tools, browse arbitrary URLs, publish content or execute code.
- Enforce authorization and validation outside the model. Model refusal or claims are not security controls.
- Apply input size limits, output token limits, timeouts, bounded retries, rate limits and per-request budgets.
- Redact secrets and unnecessary personal data before model submission; do not send learner profile or progress data for lesson localization.
- Encrypt provider credentials in the eventual secret-management layer; never commit them or log them.
- Keep audit logs privacy-minimized and access-controlled.
- Any future code execution capability must be separately designed and isolated from the main application server under the security architecture.

## 12. Versioning, review and lifecycle

Track separately:
- Canonical lesson version.
- Locale content version.
- Locale rules version.
- Glossary version.
- Prompt template version.
- Model/provider identifier and generation settings.
- Schema version.
- Validation policy version.
- Content hash and reviewer approval record.

Recommended locale lifecycle:
`Not Started → Draft Generated → Automated Checks → Language Review → Technical Review → Pedagogy/Parity Review → Approved → Published`

Additional states:
- `Needs Revision`
- `Rejected`
- `Stale` (canonical source, rules or glossary changed)
- `Archived`

A canonical lesson change marks dependent locale drafts as stale. A rules or glossary change triggers an impact assessment and targeted review; it does not silently overwrite published translations. Preserve previous versions and an auditable diff. Rollback means restoring a prior approved locale version, not deleting history.

## 13. Human review workbench requirements

The reviewer interface should show:
- Canonical source and target-language draft side by side.
- Shared outcome, topic IDs, prerequisites and assessment policy.
- Protected code and output in exact form.
- Changed, missing and added sections.
- Automated gate results with explanations and severity.
- Glossary terms used and any unresolved term warnings.
- Model/prompt/rules/schema provenance.
- Actions: approve, request revision, reject, mark stale and add reviewer notes.

Reviewer roles and permissions must be enforced server-side. Approval must require the appropriate language and technical review roles; a single model response cannot satisfy these roles. The exact role matrix belongs to the authentication/authorization architecture.

## 14. Failure handling and operational controls

- Distinguish provider timeout, rate limit, invalid response, schema failure, fidelity failure, parity warning and reviewer rejection.
- Retry only transient failures, using bounded exponential backoff and idempotent request IDs.
- Do not retry a rejected content result indefinitely. Route it to revision or human investigation.
- Make requests idempotent so duplicate submissions do not create duplicate published content.
- Store generation job status and safe diagnostic codes; do not log raw secrets or unnecessary full prompts.
- Support cancellation and stale-job detection.
- Track latency, token/cost usage, retry count, schema failure rate, placeholder mismatch rate, human revision rate, rejection rate, locale review turnaround and post-publication correction rate.
- Set configurable per-lesson and per-batch budgets before production; pause or queue work when limits are reached.
- Do not claim a quality score is objective proof of translation correctness.

## 15. Test and acceptance plan

The following are required test cases for implementation. They are not claimed as executed by this design task.

| ID | Scenario | Expected result |
|---|---|---|
| C8-T01 | Valid C1 lesson and supported locale | Request passes intake and scope validation |
| C8-T02 | Unsupported locale code | Request rejected before model call |
| C8-T03 | Unknown or unapproved topic ID | Request rejected; no curriculum expansion |
| C8-T04 | Model changes a code placeholder | Fidelity gate fails; candidate cannot progress |
| C8-T05 | Model omits a required placeholder | Fidelity gate fails |
| C8-T06 | Model duplicates or invents placeholder | Fidelity gate fails |
| C8-T07 | Model changes learning outcome or answer key | Constraint/parity gate fails |
| C8-T08 | Malformed JSON or unknown block type | Schema validation rejects output |
| C8-T09 | Source text contains prompt-injection instructions | Untrusted text cannot change policy or trigger tools |
| C8-T10 | Output includes unsupported curriculum topic | Scope validator rejects candidate |
| C8-T11 | Locale uses wrong script/register or inconsistent learner address | Locale review warning or failure |
| C8-T12 | Provider timeout or rate limit | Bounded retry; no duplicate content |
| C8-T13 | Canonical source changes after generation | Locale candidate marked Stale |
| C8-T14 | Content changes after reviewer approval | Approval invalidated for changed hash |
| C8-T15 | Unauthorized user attempts publication | Server-side authorization denies action |
| C8-T16 | Generated code is presented as executed without evidence | Publication gate rejects false execution claim |
| C8-T17 | Learner personal data appears in generation input | Data minimization/redaction or rejection occurs |
| C8-T18 | Target locale is generated from the wrong locale rules version | Policy validation rejects request |

Acceptance criteria:
- Logical components and responsibilities are defined.
- Input and output contracts are versionable and validated.
- Native-language rules for all six locales are explicitly mapped.
- Protected-segment handling prevents silent code/token mutation.
- Curriculum scope and shared learning-contract parity are enforced.
- Security, prompt-injection, privacy and authorization boundaries are defined.
- Human review and publication authority are explicit.
- Versioning, stale detection, failure handling, observability and test cases are documented.
- No model, provider, framework or deployment technology is selected prematurely.
- No generated lesson, code execution, test pass or publication is claimed by this design task.

## 16. Scope boundary and handoff

C8 defines the logical AI localization architecture and its contracts. It does not implement a model adapter, prompts in production, database schema, reviewer UI, deployment, provider integration or automatic translation pipeline. These require Stage D architecture and later implementation approval.

C9 will define the canonical multilingual technical glossary and its versioning/approval rules. Until C9 is complete, glossary use must be explicitly marked provisional and the engine must not invent approved equivalents.

**C8 is complete at AI localization engine design and contract specification scope.**  
**Next task: C9 — Define the technical terminology glossary.**
