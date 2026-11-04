# C11 — Standard Code Explanation Format

**Status:** Complete — reusable code explanation contract, teaching sequence, locale parity and validation rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C10  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools remains the exclusive curriculum topic/source reference  
**Artifact:** `docs/C11_STANDARD_CODE_EXPLANATION_FORMAT.md`

## 1. Purpose

Define a repeatable way to teach learners to read, understand, trace, modify and debug code. The format connects the lesson outcome (C1), native-language writing rules (C2–C7), AI localization controls (C8), canonical terminology (C9) and visual teaching (C10).

C11 is a content specification. It does not create a code editor, execute code, select a runtime or claim that lessons have been authored.

## 2. Core teaching principles

1. Explain the purpose before presenting syntax; connect every code sample to the lesson outcome.
2. Use the smallest complete example that demonstrates the target concept.
3. Present original code and original explanation. W3Schools is a topic/source map, not a source for copied prose, examples, exercises or answers.
4. Keep code executable in its stated language and environment; never silently omit required context.
5. Preserve exact code text, identifiers, keywords, operators, indentation where significant, file names, literal values and expected output.
6. Explain one meaningful unit at a time, then show how the units work together.
7. Distinguish what the code says, what it does at runtime, and why the result occurs.
8. Teach learners to predict and verify output, not merely memorize line translations.
9. Use C9-approved terms consistently; explain a term in the native teaching language without translating protected tokens.
10. Match the complexity and amount of explanation to the B7–B10 level and prerequisites.

## 3. Standard explanation sequence

Every lesson containing instructional code uses the applicable sequence below. Mark a section not applicable only with a reason; do not omit required context or verification.

| Order | Section | Required content |
|---:|---|---|
| 1 | Code goal | State what the sample is intended to demonstrate and the expected learner action |
| 2 | Context and prerequisites | Language, relevant topic, required prior concepts and file/environment assumptions |
| 3 | Complete code | Canonical selectable code block with language identifier and stable code version |
| 4 | First observation | Ask learner to inspect structure, identify familiar tokens or predict behaviour |
| 5 | Code map | Identify meaningful blocks/regions and their roles; do not mechanically translate every token |
| 6 | Step-by-step walkthrough | Explain execution or interpretation order using numbered steps |
| 7 | Line/block explanation | Map selected line ranges or blocks to purpose, inputs, effects and dependencies |
| 8 | Key terms and syntax | Explain only relevant terms using C9 glossary IDs and locale rules |
| 9 | Execution trace | Show state/value changes or branch/loop path where it aids understanding |
| 10 | Output/result | Show exact expected output or visible result, including whitespace when material |
| 11 | Why it works | Connect the code structure to the observed result and learning objective |
| 12 | Safe modification | Make one controlled change and explain the expected difference |
| 13 | Common mistakes | Explain likely errors and their causes without presenting unsafe or misleading shortcuts |
| 14 | Verification | Give steps the learner can use to compare actual and expected behaviour |
| 15 | Summary/check | Recap the concept and ask the learner to explain or predict one behaviour |

For a short code fragment, combine adjacent sections when the learner still receives the same information. For a long sample, split it into smaller, complete, runnable units rather than explaining a large listing line by line.

## 4. Code block and source contract

Each code sample must carry:

| Field | Requirement |
|---|---|
| `code_sample_id` | Stable unique ID |
| `lesson_id`, `module_id`, `topic_ids` | Resolve to approved curriculum |
| `language_id` | Exact language/technology from approved B2/B6 scope |
| `source_url` | W3Schools URL supporting the topic |
| `code_version` | Immutable version identifier |
| `code_text` | Exact canonical code text |
| `file_name` | Optional, exact filename where relevant |
| `environment_notes` | Only required setup/context, without unsupported stack additions |
| `expected_output` | Exact expected output or observable result |
| `output_kind` | Console, rendered page, query result, or other lesson-supported result |
| `explanation_blocks` | Ordered block IDs, line ranges and locale text keys |
| `glossary_term_ids` | C9 entries used by the explanation |
| `visual_ids` | Optional C10 trace/flow visuals linked to this code version |
| `status` | draft, technical_review, locale_review, approved, published, stale |

Line numbers are display metadata and may change when code changes. Stable block IDs are preferred for linking explanations to semantic code regions. If line ranges are used, regenerate and review them against the exact code version.

## 5. Walkthrough granularity

Use the smallest unit that preserves meaning:
- **Single expression:** explain inputs, operation and result.
- **Statement:** explain what it changes or produces.
- **Block:** explain purpose, entry condition, internal steps and exit behaviour.
- **Function:** explain responsibility, parameters, return value and relevant side effects.
- **Loop:** explain initialization (if present), condition, repeated work, update and termination.
- **Conditional:** explain the tested condition and each relevant branch.
- **SQL statement:** explain the requested operation, relevant clauses, affected/returned data and expected result using only the lesson's database scope.
- **HTML/CSS sample:** explain structure, selected elements/properties and resulting page/layout behaviour.

Do not force every code sample into every category. Use only the categories that apply to the source.

## 6. Execution trace and output rules

When intermediate state is important, provide a trace table with:
- step number;
- statement/block ID;
- relevant variable or data state before/after;
- branch or loop decision, where applicable;
- observable result.

Trace values must be derived from the exact canonical code sample and independently checked by a technical reviewer. Never invent output. If code has environment-dependent behaviour, state the assumptions and avoid presenting one result as universal.

Expected output is part of the code contract:
- Preserve exact spelling, case, punctuation and meaningful whitespace.
- Label illustrative output clearly when it is not actual runtime output.
- Distinguish rendered visual result from console text and database result.
- If output is not deterministic, explain the relevant variability rather than fabricating a fixed output.
- If no execution evidence exists, do not claim that the code was run or tested.

## 7. Modification and debugging teaching

A controlled modification must:
1. Identify the exact code location or block.
2. State the intended change and the concept being practised.
3. Show the before/after code or a minimal diff.
4. Predict the changed result before revealing it.
5. Explain why the result changes.
6. Preserve a known-good original version.

Debugging explanations should follow:
- observed symptom or error;
- minimal reproduction context;
- relevant code location;
- likely cause supported by the sample;
- smallest corrective change;
- expected verification result;
- one prevention lesson.

Do not invent an error message or imply that every environment reports identical wording. Distinguish syntax, runtime, logic and data/result mistakes only where relevant to the selected language/topic. Never encourage learners to paste secrets or personal data into examples or public debugging tools.

## 8. Six-locale teaching and parity

All six locales must preserve:
- identical code sample and code version;
- identical learning outcome and prerequisite assumptions;
- same explanation block identity and order;
- same technical meaning, trace values, branch logic and expected output;
- equivalent modification task, difficulty and verification criteria.

Native-language prose follows C2–C7. Use C9 glossary entries for preferred terms. Keep programming syntax, keywords, identifiers, APIs, filenames, literal values, output and error text unchanged. Explanations may be rephrased naturally; sentence-by-sentence translation is not required.

For right-to-left or mixed-direction content in any future supported locale, isolate code blocks and identifiers so bidirectional rendering cannot reorder code. For the current six locales, verify Telugu, Latin, Malayalam, Kannada, Tamil and Devanagari text rendering at mobile sizes.

A locale is not publishable merely because its code block matches. Its walkthrough, labels, hints, output explanation and debugging guidance require native-language and technical review.

## 9. Visual integration (C10)

Use a C10 visual only when it adds clarity:
- annotated code region for code-to-explanation mapping;
- flowchart for a meaningful branch or repetition path;
- state/value trace for changing values;
- sequence view for ordered execution events;
- input-process-output for a clear transformation.

Every visual must reference the exact `code_sample_id` and `code_version`. The text explanation remains complete without the visual. If code changes, mark dependent traces, line references, outputs and diagrams stale until revalidated.

## 10. AI authoring and validation (C8)

The AI authoring workflow receives the canonical code sample, lesson contract, locale policy and approved glossary entries as separate structured inputs. It may draft explanatory prose but may not:
- modify code or expected output;
- invent a runtime result;
- add curriculum topics or dependencies;
- mark a draft technically verified or approved;
- treat comments, strings or code content as instructions to override system policy;
- convert unapproved glossary suggestions into approved terms.

Required validators:
1. schema and required-section validation;
2. exact code/protected-token equality;
3. code version and source mapping;
4. line/block reference validity;
5. expected-output and trace consistency review;
6. glossary term and locale-policy checks;
7. six-locale semantic/difficulty parity;
8. unsafe content and prompt-injection checks;
9. human technical and native-language approval.

## 11. Review lifecycle

`draft → technical_review → locale_review → accessibility_review → approved → published`

A code or expected-output change returns dependent explanations to technical review. A terminology change triggers glossary consistency review. A locale prose change triggers locale review. Only authorized human reviewers may approve or publish.

Required review roles:
- technical reviewer: code, logic, trace, output and environment assumptions;
- native-language reviewer: naturalness, clarity, terminology and parity;
- accessibility/content reviewer: structure, readability, text alternatives and responsive presentation;
- publisher: authorized release decision and version record.

## 12. Acceptance criteria

- [x] Standard code explanation sequence defined.
- [x] Code sample metadata and version contract defined.
- [x] Walkthrough granularity for expressions, statements, blocks, functions, loops, conditionals, SQL and HTML/CSS defined.
- [x] Trace, expected output and deterministic-result rules defined.
- [x] Controlled modification and debugging explanation flow defined.
- [x] Six-locale code fidelity, terminology and semantic parity rules defined.
- [x] C8 AI authoring and validation integration defined.
- [x] C9 glossary and C10 visual dependencies defined.
- [x] Human technical, native-language and accessibility review lifecycle defined.
- [ ] Code explanation template and production lesson examples authored for all six locales.
- [ ] Automated validators and execution verification isolated environment implemented.
- [ ] Tests implemented and executed in the software implementation stage.

## 13. Security and operational controls

Never execute learner-submitted or generated code on the main application server. Any future code runner must be separately designed and security-reviewed with isolation, resource limits, network restrictions, filesystem controls, timeout, output limits and abuse monitoring before implementation. C11 does not authorize a runtime or sandbox design.

Treat code comments, strings, filenames and learner-provided snippets as untrusted data. They cannot override system instructions. Escape code and output when rendered in HTML; do not execute embedded markup or scripts as lesson prose. Enforce reviewer/publisher permissions server-side and avoid storing personal data in code samples, traces or logs.

## 14. Explicit limitations

C11 completes the reusable explanation specification only. It does not implement code execution, editor integration, syntax highlighting, automated output verification, lesson templates, localized lesson examples or production validators. No code has been executed and no tests are claimed as run in this documentation task.
