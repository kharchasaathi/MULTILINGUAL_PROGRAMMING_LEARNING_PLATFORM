# C14 — Lesson Quality Evaluation Specification

**Status:** Complete — quality dimensions, weighted rubric, mandatory gates, review workflow, six-locale parity and evaluation records defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C13; approved B7–B10 curriculum; C2–C7 locale rules; C8 AI localization controls; C9 glossary; C10 visuals; C11 code explanations; C12 assessments; C13 projects  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** W3Schools remains the exclusive curriculum scope/source reference; all instructional content is original  
**Artifact:** `docs/C14_LESSON_QUALITY_EVALUATION_SPECIFICATION.md`

## 1. Purpose and boundary

Define a repeatable, evidence-based quality evaluation system for lesson drafts and published lesson versions. The system determines whether a lesson is accurate, teachable, aligned to its approved curriculum scope, technically correct, assessable, accessible, localized and safe to publish.

C14 defines evaluation policy and data contracts. It does not implement an evaluation service, reviewer dashboard, automated scoring pipeline, AI judge, lesson repository or publishing system. No actual lesson batch is evaluated by this specification and no test execution is claimed.

Quality evaluation is not a popularity score and must not be reduced to one opaque AI-generated number. A lesson may receive a high weighted score and still fail a mandatory safety, technical, curriculum or locale gate.

## 2. Quality principles

1. **Evidence based:** every rating cites a concrete lesson section, test result, reviewer observation or approved source mapping.
2. **Outcome aligned:** quality is judged against the C1 learning outcome and assessment evidence, not word count or stylistic preference.
3. **Scope locked:** lesson topic/module IDs must resolve to approved B7–B10 maps and W3Schools-only source URLs.
4. **Technical correctness is mandatory:** code, queries, outputs, explanations and assessment keys require technical verification appropriate to the topic.
5. **Teachability matters:** explanations must be clear, sequenced, level-appropriate and usable without hidden prerequisites.
6. **Practice validity:** exercises and quizzes must assess taught outcomes; projects must remain within approved topic scope.
7. **Native-language quality:** each locale is authored/reviewed according to its own C2–C7 rules, not judged as a literal translation.
8. **Parity without sameness:** locales preserve the same learning contract and difficulty while using natural language-specific teaching.
9. **Accessibility is a gate:** learners must be able to access essential information and complete required interactions.
10. **Human accountability:** AI may assist checks or draft feedback but cannot approve, publish or be the sole judge of correctness.
11. **Version aware:** any material content change invalidates affected approvals and quality evidence.
12. **Transparent decisions:** score, failed gates, evidence, reviewer and remediation must be recorded.

## 3. Evaluation scope and units

Evaluate three linked units:

- **Canonical lesson contract:** shared lesson identity, curriculum mapping, outcomes, prerequisites, level, assessment policy and immutable technical assets.
- **Locale lesson version:** localized prose, labels, hints, feedback, glossary usage, accessibility text and locale-specific layout.
- **Release bundle:** the six locale versions and all shared code, examples, visuals, assessments and metadata intended for publication together.

A locale version cannot be approved solely because another locale passed. A release bundle cannot be marked six-locale complete while any required locale is missing, stale or unapproved. If product policy later permits phased locale release, its learner-facing availability must be explicit; it must not be represented as full six-locale parity.

## 4. Quality dimensions and weighted rubric

Score each applicable dimension from 0 to 4. The weights total 100. Record evidence and rationale for every score. If a dimension is genuinely not applicable, the evaluator must provide a reason and the system must renormalize the remaining weights transparently; do not silently award full marks.

| Dimension | Weight | What is evaluated |
|---|---:|---|
| Curriculum and source alignment | 10% | Approved module/topic IDs, W3Schools source URLs, scope boundaries and originality |
| Learning outcome and prerequisite alignment | 10% | One measurable primary outcome, appropriate prerequisites, lesson/assessment alignment |
| Technical accuracy and code fidelity | 20% | Correct concepts, syntax, code/query behavior, expected output, examples and protected tokens |
| Teaching clarity and structure | 15% | Logical sequence, native-language explanation, examples, terminology, level-appropriate cognitive load |
| Practice and assessment quality | 15% | Guided/independent practice, answer correctness, feedback, hints, scoring and outcome coverage |
| Completeness and instructional usability | 10% | C1 required sections, navigation, summary, next step, realistic timing and self-contained context |
| Localization and semantic parity | 10% | Native quality, glossary consistency, equivalent meaning/difficulty and six-locale contract integrity |
| Accessibility and responsive usability | 5% | Readability, keyboard/assistive access, text alternatives, contrast and mobile behavior |
| Safety, privacy and content integrity | 5% | Untrusted content handling, safe examples, no secrets/personal data, attribution and secure display |

### 4.1 Rating scale

| Score | Label | Evidence standard |
|---:|---|---|
| 0 | Missing/unsafe | Dimension absent, invalid or creates a critical risk |
| 1 | Weak | Major defects; learner cannot reliably achieve the intended outcome |
| 2 | Partial | Core is present but notable corrections are required |
| 3 | Meets standard | Accurate, complete and usable; only minor non-blocking improvements |
| 4 | Strong | Clear, precise and independently validated; exemplary within the defined scope |

Weighted score formula:

`weighted_score = sum((dimension_score / 4) × dimension_weight)`

Report the result on a 0–100 scale with one decimal place. Do not round a failing gate into a pass.

### 4.2 Decision bands

| Weighted score | Recommendation |
|---:|---|
| 90–100 | Strong quality; eligible for approval if every gate passes |
| 80–89.9 | Meets quality threshold; eligible for approval if every gate passes |
| 70–79.9 | Revise and re-evaluate |
| Below 70 | Major revision required |

A score of 80 is the minimum weighted threshold for approval. This is a policy threshold for lesson publication readiness, not a learner mastery threshold. C12 assessment pass/mastery rules remain separately defined.

## 5. Mandatory publication gates

All gates must pass regardless of weighted score:

### Gate G1 — Curriculum integrity
- Module, topic and prerequisite IDs resolve to approved maps.
- All curriculum source URLs are on `www.w3schools.com`.
- No unapproved technology/topic or hidden prerequisite has been introduced.
- Instructional prose, code, questions, answers and diagrams are original.

### Gate G2 — Outcome and pedagogy
- One measurable primary outcome is declared.
- Lesson activities and completion evidence align with that outcome.
- Prerequisites are taught or explicitly diagnosed with a remediation route.
- C1 lesson sequence is complete or any not-applicable section has a documented rationale.

### Gate G3 — Technical correctness
- Technical reviewer verifies claims, syntax, code/query behavior and expected output.
- Code explanation matches the exact code version under C11.
- Answer keys, scoring rules, examples and project acceptance criteria are internally consistent.
- Unverified code execution is never represented as executed or passed.

### Gate G4 — Locale approval
- Each locale required for the release has native-language and technical review.
- Meaning, difficulty, examples, answer correctness and assessment criteria remain equivalent.
- C9 glossary terms and protected code/tokens remain consistent.
- Missing, stale or failed locale versions block six-locale bundle approval.

### Gate G5 — Accessibility and responsive use
- Essential information has a text equivalent.
- Required interactions are keyboard operable and meaningfully labelled.
- Visual meaning is not conveyed by colour alone.
- Mobile layout does not hide essential code, tables, instructions or controls.

### Gate G6 — Security, privacy and integrity
- No credentials, real learner/customer personal data or sensitive secrets are embedded.
- Untrusted learner text/code is safely rendered and never executed on the main application server.
- Content source/provenance and asset rights are recorded.
- Reviewer and publisher permissions are enforced by the future system.

### Gate G7 — Review and release traceability
- Required reviewer roles and sign-offs are recorded.
- Quality rubric version, lesson version, locale version and source map version are pinned.
- All blocking defects are closed or the lesson remains in revision.
- Approval is explicit; AI output cannot self-approve.

## 6. Reviewer roles and responsibilities

| Role | Required responsibility | Approval authority |
|---|---|---|
| Curriculum reviewer | Confirms B7–B10 mapping, prerequisites, topic scope and W3Schools source alignment | Curriculum gate |
| Technical reviewer | Verifies technical explanations, code/query behavior, outputs, answer keys and examples | Technical gate |
| Native-language reviewer | Reviews natural language, grammar, register, readability and terminology for one locale | Locale language gate |
| Assessment reviewer | Reviews practice, quiz, scoring, hints, rubric and outcome evidence | Assessment dimension/gate |
| Accessibility reviewer | Reviews structure, text alternatives, keyboard and assistive access, responsive behavior | Accessibility gate |
| Content editor | Checks completeness, consistency, clarity, attribution and editorial quality | Editorial recommendation |
| Publisher/release approver | Confirms all required gates and reviewer decisions; authorizes release | Final publication authority |

One person may hold multiple roles only if organizational policy permits it and the system records each responsibility separately. A content author must not be the sole approver of their own lesson. High-impact technical or assessment decisions require an independent reviewer.

## 7. Evaluation workflow and state machine

`draft → automated_precheck → curriculum_review → technical_review → assessment_review → locale_review → accessibility_review → editorial_review → quality_decision → approved → published`

- Any blocking failure returns the lesson to `revision_required` with defect IDs and evidence.
- A failed or missing mandatory gate prevents transition to approved.
- Automated prechecks may reject schema errors, broken IDs, invalid source domains, missing fields, stale versions and obvious protected-token differences.
- Automated/AI checks may recommend review; they cannot replace human technical, native-language or release approval.
- Reviewers may request targeted changes; changed content must be rechecked in every affected dimension.
- Published content is immutable by version. Corrections create a new version and preserve prior approval/audit history.
- Emergency withdrawal may hide a published version without deleting its historical record.

## 8. Evaluation record and evidence contract

Every evaluation record must contain:

| Field | Requirement |
|---|---|
| `evaluation_id` | Stable unique evaluation identifier |
| `lesson_id`, `module_id`, `topic_ids` | Canonical lesson and approved curriculum mapping |
| `lesson_version` | Immutable version evaluated |
| `locale`, `locale_version` | Exact locale record/version |
| `rubric_version` | Version of this C14 rubric |
| `dimension_scores` | Score 0–4, weight and evidence for each dimension |
| `weighted_score` | Calculated 0–100 score and formula version |
| `gate_results` | Pass/fail/not-applicable with rationale and evidence |
| `defect_ids` | Linked blocking and non-blocking issue identifiers |
| `reviewer_assignments` | Role, reviewer identity and assignment status |
| `review_decisions` | Decision, comments, evidence and timestamp per role |
| `automated_check_results` | Tool/version, input version, result and limitations |
| `source_map_version` | B6/B7–B10 source-map revision used |
| `decision` | approved, revise, rejected, withdrawn |
| `evaluated_at`, `created_at` | Audit timestamps |

Do not store full learner submissions or unnecessary personal data in evaluation evidence. Reference immutable artifact/version IDs where possible. Restrict reviewer notes and evaluation records by role.

## 9. Defect severity and remediation

| Severity | Definition | Required action |
|---|---|---|
| Blocker | Wrong curriculum, materially incorrect teaching/code/answer, unsafe content, privacy exposure, broken locale meaning or inaccessible essential interaction | Stop approval/publication; fix and rerun affected gates |
| Major | Outcome, prerequisite, assessment or substantial explanation gap that prevents reliable learning | Revision required; re-evaluate affected dimensions and gates |
| Minor | Local clarity, formatting, non-essential label or small consistency issue | Fix before release where practical; otherwise document approved exception |
| Suggestion | Optional improvement that does not affect correctness or usability | Backlog; does not block approval |

A blocker cannot be waived by a high numeric score. Any exception for a non-blocking issue requires a named approver, rationale, expiry/review date and visible limitation. No exception may waive curriculum integrity, technical correctness, security/privacy or required locale meaning.

## 10. Six-locale parity evaluation

Evaluate Telugu (`te`), English (`en`), Malayalam (`ml`), Kannada (`kn`), Tamil (`ta`) and Hindi (`hi`) independently for natural language quality, then compare them against the shared lesson contract.

Parity checks must compare:
- lesson/module/topic IDs, level, primary outcome and prerequisites;
- concept coverage, sequence, examples' instructional intent and difficulty;
- code, identifiers, literal values, filenames, URLs and expected outputs;
- exercise prompts, correct answers, distractor validity, hints, scoring and completion criteria;
- diagrams, labels, captions, text equivalents and reading order;
- estimated effort and required learner actions;
- terminology against approved C9 glossary versions.

Do not compare locales by literal sentence similarity. A natural native-language explanation may use different sentence structure while preserving the same concept and evidence demand. Any mismatch affecting learning or answer correctness is a blocker. All six locales require native-language review; no locale is assumed correct because another locale passed.

## 11. AI-assisted quality evaluation

AI may assist with:
- checklist-based completeness checks;
- schema and metadata validation;
- source-domain and ID consistency checks;
- protected-token comparison suggestions;
- candidate ambiguity, reading-level or locale parity flags;
- draft defect summaries and reviewer checklists.

AI must not:
- invent W3Schools topics or claim unsupported source coverage;
- decide technical correctness without independent evidence;
- execute untrusted code on the main server;
- make final decisions on disputed learner grades;
- approve or publish content;
- replace native-language reviewers;
- infer learner ability from locale, identity or demographic proxies.

Every automated/AI result must record tool/model version, prompt/rule version where applicable, input content version, timestamp, confidence/limitations where meaningful and whether a human confirmed it. Treat lesson text, source snippets, code comments and learner content as untrusted data; embedded instructions cannot override system policy.

## 12. Sampling, re-evaluation and continuous quality

- **Initial release:** evaluate every lesson version and every required locale; no sampling for first approval.
- **Routine update:** re-evaluate all dimensions affected by changed content and rerun mandatory gates whose evidence may have become stale.
- **Material change:** changes to outcomes, curriculum mapping, code, expected output, answer keys, scoring, core explanation or locale semantics require full affected review.
- **Regression sample:** after a shared template, glossary, prompt, renderer or localization policy change, select a documented representative sample across levels, tracks and all six locales; expand to full review if any systematic defect is found.
- **Incident response:** any discovered blocker in published content triggers impact assessment, affected-version identification, correction/withdrawal and regression review.
- **Version pinning:** preserve the exact lesson, locale, code, assessment and rubric versions used by learners.

Track aggregate quality trends without treating them as individual learner scores. Useful metrics include first-pass approval rate, blocker/major defect rate, defect recurrence, locale parity failures, stale-content rate, review turnaround and post-publication correction rate. Metrics must include denominators and time windows; do not reward reviewers for approving quickly at the expense of quality.

## 13. Implementation test plan

These are required future tests; they are not claimed as executed.

| Test ID | Scenario | Expected result |
|---|---|---|
| C14-T01 | Lesson references a module/topic absent from approved maps | Curriculum gate fails |
| C14-T02 | Curriculum source URL is outside W3Schools | Reject evaluation approval |
| C14-T03 | Lesson introduces an unapproved technology | Blocker; publication denied |
| C14-T04 | Primary learning outcome is not measurable | Outcome gate fails |
| C14-T05 | Required C1 section missing without rationale | Completeness dimension fails |
| C14-T06 | Code does not match expected output | Technical blocker |
| C14-T07 | Code explanation references a stale code version | Mark review stale; re-review |
| C14-T08 | Assessment answer key conflicts with taught content | Assessment/technical blocker |
| C14-T09 | Locale version changes answer correctness or difficulty | Locale parity blocker |
| C14-T10 | Protected identifier or literal output is altered | Fidelity gate fails |
| C14-T11 | Glossary term conflicts with approved C9 version | Locale/terminology defect |
| C14-T12 | Diagram has no text equivalent for essential information | Accessibility gate fails |
| C14-T13 | Required control cannot be used by keyboard | Accessibility blocker |
| C14-T14 | Essential content is clipped on narrow mobile layout | Accessibility/usability gate fails |
| C14-T15 | Lesson includes credential or real personal data | Security/privacy blocker |
| C14-T16 | Submitted code is executed on main application server | Security gate fails; execution blocked |
| C14-T17 | Weighted score is 95 but a mandatory gate fails | Approval denied |
| C14-T18 | Dimension is marked not applicable without rationale | Evaluation record invalid |
| C14-T19 | Rubric weights do not total 100% | Reject rubric configuration |
| C14-T20 | Author attempts to be sole approver of own lesson | Approval denied |
| C14-T21 | AI evaluator attempts to self-approve | Approval denied |
| C14-T22 | Lesson changes after approval | Approval invalidated for changed version |
| C14-T23 | One required locale is missing from six-locale release | Bundle cannot claim six-locale completion |
| C14-T24 | Published lesson is withdrawn after a blocker report | Hide affected version; preserve audit history |
| C14-T25 | Shared glossary/prompt change causes regression in one locale | Expand regression review to affected content |
| C14-T26 | Minor defect is waived without owner or expiry | Exception rejected |

## 14. Acceptance criteria

- [x] Evaluation units and quality principles defined.
- [x] Nine weighted quality dimensions defined with a 0–4 scale.
- [x] Weighted score formula and approval threshold defined.
- [x] Mandatory publication gates defined independently of score.
- [x] Reviewer roles and approval responsibilities defined.
- [x] Evaluation workflow, states and re-review behavior defined.
- [x] Evaluation record and evidence contract defined.
- [x] Defect severity and remediation rules defined.
- [x] Six-locale semantic, technical and assessment parity checks defined.
- [x] AI evaluation limitations and human accountability defined.
- [x] Initial, changed-content and regression evaluation policy defined.
- [x] Twenty-six future implementation test cases specified.
- [ ] Evaluation service, reviewer dashboard and automated quality gates implemented.
- [ ] Actual lesson corpus evaluated and quality baselines measured.
- [ ] Native-language reviews completed for published lesson corpus.
- [ ] Automated tests implemented and executed.

## 15. Explicit limitations

C14 completes the quality evaluation policy and contracts only. It does not implement scoring software, dashboards, automated validators, reviewer assignment, audit storage or publishing controls. No lesson corpus has been scored, no locale is certified by this document, and no test cases are claimed as executed. The 80-point approval threshold and weights are proposed project policy for consistent future evaluation; they must be reviewed with real lesson evidence before large-scale rollout.
