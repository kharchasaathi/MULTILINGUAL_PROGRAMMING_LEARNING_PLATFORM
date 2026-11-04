# C12 — Exercises and Quizzes Specification

**Status:** Complete — practice and assessment design, item contracts, feedback, scoring and six-locale parity defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C11  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools remains the exclusive curriculum topic/source reference  
**Artifact:** `docs/C12_EXERCISES_AND_QUIZZES_SPECIFICATION.md`

## 1. Purpose

Define a consistent practice and assessment system that helps learners retrieve knowledge, apply concepts, explain reasoning, identify mistakes and demonstrate lesson outcomes. Exercises and quizzes must assess only concepts taught in the approved lesson path and must not expand the W3Schools-based curriculum.

C12 is an assessment design specification. It does not implement a quiz engine, code grader, question bank or scoring service and does not claim that assessment content has been authored.

## 2. Assessment principles

1. **Outcome alignment:** every item maps to one or more measurable C1 lesson outcomes.
2. **Teach before test:** do not assess an unintroduced concept unless the item is explicitly a prerequisite diagnostic.
3. **Practice is formative by default:** practice supports learning through hints, retries and explanatory feedback.
4. **Assessment is evidence:** a score is evidence of a response to a defined item, not proof of broad professional competence.
5. **Fairness across locales:** all six language versions preserve concept, difficulty, evidence requirements, scoring and feedback intent.
6. **Original content:** author original prompts, code, data, distractors, hints, explanations and answer keys. Do not copy W3Schools examples, exercises, quiz questions, answers or explanations.
7. **Source bounded:** each item maps to an approved curriculum topic and W3Schools URL; source links do not authorize copying.
8. **Transparent rules:** learners should know what is being assessed, how many attempts are allowed and how scoring works before starting.
9. **Accessibility:** items must work with keyboard, assistive technology, zoom and mobile layouts.
10. **Secure evaluation:** treat learner answers and submitted code as untrusted input; never execute code on the main application server.

## 3. Learning activity taxonomy

Use one primary activity type per item. A lesson may combine types when they assess distinct aspects of the same outcome.

| Type | Learner action | Appropriate evidence |
|---|---|---|
| Recall | Retrieve a term, syntax form or fact taught in the lesson | Short answer or selection |
| Concept check | Distinguish correct and incorrect interpretations | Single/multiple selection |
| Prediction | Predict output, state change or branch path | Output or ordered choice |
| Code reading | Identify what a supplied code block does | Explanation or selection |
| Code completion | Fill a missing token or bounded code region | Exact/structured response |
| Code writing | Create a small solution to a defined prompt | Code submission reviewed by defined checks |
| Debugging | Locate and correct a seeded issue | Corrected code plus reason |
| Ordering | Put lesson steps or statements in a valid order | Ordered response |
| Matching | Pair terms, syntax, outputs or concepts | Pair mapping |
| Classification | Sort examples into taught categories | Category assignments |
| Data/query task | Interpret or write a lesson-scoped SQL query | Query text or result interpretation |
| Reflection/explanation | Explain why a result or approach is correct | Rubric-scored explanation |
| Mini review | Combine a small set of already taught skills | Multi-part task |

Do not use an activity type merely for variety. Select it because it produces evidence for the learning outcome.

## 4. Quiz formats

| Format | Use | Scoring notes |
|---|---|---|
| Single choice | One best answer | Exact keyed response |
| Multiple select | Several correct choices | Explicit partial-credit policy |
| True/false | Check a precise proposition | Avoid ambiguous or trick wording |
| Short answer | Term, value or brief explanation | Accepted answer set or rubric |
| Fill in the blank | Missing syntax/value | Normalize only safe, declared variations |
| Ordering | Sequence of steps or events | Exact or rubric-defined order |
| Matching | Relate items across two sets | Score pairs according to published rule |
| Code prediction | Predict output/state/branch | Compare against verified expected result |
| Code response | Write or repair code | Deterministic checks plus review where needed |
| Scenario response | Explain a decision using taught concepts | Analytic rubric |

Use clear wording and plausible distractors. Distractors must reflect common misconceptions, not trick learners through obscure phrasing. Avoid double negatives, hidden assumptions, culturally specific references and irrelevant reading complexity.

## 5. Difficulty model

Difficulty is assigned to the item based on the learner action and evidence, not the length of the prompt alone.

| Band | Characteristics |
|---|---|
| D1 — Identify | Recognize a taught term, syntax item or basic result |
| D2 — Explain | Describe meaning, purpose or a simple relationship |
| D3 — Apply | Use a taught concept in a familiar, bounded context |
| D4 — Analyze | Trace, compare, debug or explain a multi-step example |
| D5 — Integrate | Combine multiple already taught concepts in a new but curriculum-bounded task |

Difficulty bands are shared across locales. Translation length or script complexity must not make one locale's item harder. Do not use D5 to introduce a topic that is not in the learner's approved path.

## 6. Exercise metadata contract

Every item must have:

| Field | Requirement |
|---|---|
| `item_id` | Stable unique ID |
| `lesson_id`, `module_id`, `topic_ids` | Approved C1/B7–B10 mapping |
| `outcome_ids` | Measurable learning outcome(s) assessed |
| `item_type`, `format` | Controlled taxonomy values |
| `difficulty` | D1–D5 |
| `prompt_key` | Locale-specific prompt text key |
| `stimulus_ref` | Optional code/data/visual reference and version |
| `response_schema` | Expected response type and constraints |
| `answer_key_ref` | Protected reference to answer/rubric |
| `scoring_policy_id` | Versioned scoring policy |
| `feedback_keys` | Correct, incorrect, partial and retry feedback |
| `hint_policy_id` | Hint sequence and attempt rules |
| `attempt_policy_id` | Allowed attempts and retry behavior |
| `source_urls` | W3Schools topic source URLs |
| `locale_status` | Per-locale draft/review/approved state |
| `content_version`, `status` | Version and lifecycle state |

Do not place answer keys, hidden test cases or grading secrets in public client payloads. Keep authoring and learner-delivery representations separate.

## 7. Item authoring requirements

Every item includes:
1. The outcome it assesses.
2. The learner-facing prompt with all necessary context.
3. Any stimulus (code, table, visual or scenario) with its own version.
4. The expected response type and constraints.
5. The correct answer or scoring rubric in protected authoring data.
6. The rationale for the correct answer.
7. Plausible distractor rationale where applicable.
8. Feedback for correct, incorrect and partially correct responses.
9. Hint sequence, if hints are enabled.
10. Difficulty, estimated time and attempt policy.
11. Locale-specific wording and review status.
12. Source topic mapping and originality confirmation.

Questions must be answerable from taught material and supplied context. Do not rely on undocumented environment details, unspecified browser/runtime versions or outside knowledge.

## 8. Hints and feedback

### Hint ladder
- Hint 1: direct attention to the relevant concept or part of the prompt.
- Hint 2: narrow the problem or remind the learner of a relevant rule.
- Hint 3: provide a more explicit next step without simply revealing the full answer, unless the item policy allows a solution reveal after attempts.

Hints must not change the problem, reveal protected answer keys prematurely or introduce untaught concepts.

### Feedback categories
- **Correct:** confirm what was correct and explain the underlying reason.
- **Incorrect:** identify the misconception or relevant concept without shaming the learner.
- **Partially correct:** identify satisfied and missing criteria separately.
- **Retry:** give a specific next action.
- **Solution reveal:** provide the worked reasoning after the configured attempt/learning policy permits it.

Feedback should teach, not merely say “right” or “wrong”. Avoid revealing hidden tests, private answer keys or implementation details that enable gaming the grader.

## 9. Scoring and mastery

- Each item uses an explicit, versioned scoring policy.
- Default objective scoring is binary only when the answer is unambiguous.
- Partial credit is permitted only when criteria are explicit before the attempt.
- Rubric-scored answers use defined criteria and reviewer guidance.
- Do not silently penalize spelling, punctuation or whitespace when they are not part of the assessed concept.
- When exact syntax is the learning target, syntax rules may be scored explicitly and must be communicated.
- Separate first-attempt score, final score, hints used, attempts and completion status in analytics.
- A retry may support learning but must not overwrite the original attempt record.
- Lesson completion, quiz pass and mastery are separate states.
- Mastery thresholds must be defined by the later C14 quality/evaluation policy; C12 does not invent a universal pass percentage.
- Do not compare raw scores across different item sets unless the assessment design establishes comparability.

## 10. Answer validation contracts

Validation must match response type:

- Choice: compare stable option IDs, not translated display strings.
- Multiple select: compare selected option IDs using the published partial-credit policy.
- Short answer: use a declared accepted-answer set and safe normalization; do not silently accept semantically different answers.
- Numeric/value answer: define precision, units and tolerance where applicable.
- Code completion: validate the intended token/region and relevant syntax constraints.
- Code writing/debugging: use isolated execution only after the separate sandbox design and security approval; otherwise use static, deterministic checks or human review.
- Ordering/matching: compare structured IDs and explicit scoring rules.
- Explanation/reflection: use an analytic rubric with human review where reliable automatic scoring is not established.

Never treat AI-generated grading as authoritative by itself. Record grader version, policy version and evidence. Provide a review/appeal path for disputed high-impact assessment outcomes.

## 11. Six-locale assessment parity

For Telugu, English, Malayalam, Kannada, Tamil and Hindi:
- Keep item ID, outcome mapping, stimulus, answer logic, difficulty, scoring and attempt policy identical.
- Localize prompt, instructions, hints, feedback and rubric descriptions naturally under C2–C7.
- Use approved C9 glossary entries consistently.
- Preserve code, identifiers, literal values, expected output and protected technical strings.
- Ensure distractors remain equally plausible and do not accidentally become clues or multiple-correct answers after localization.
- Recheck wordplay, idioms, number formats, punctuation, script rendering and layout in the target locale.
- A native reviewer and a technical reviewer must approve each locale version.
- If a prompt cannot be made equivalent without changing assessed meaning, hold that locale item for review; do not publish a weaker or harder substitute.

## 12. Quiz assembly and sequencing

A quiz blueprint defines:
- target outcomes and topic scope;
- number of items by activity type and difficulty;
- allowed item pool and locale status;
- scoring and attempt policy;
- time guidance, if time is pedagogically necessary;
- pass/mastery policy reference;
- randomization constraints.

Randomization must preserve item validity and difficulty distribution. Do not randomize code lines, ordered steps, matching relationships or answer options when doing so changes meaning. If options are shuffled, keep stable IDs and verify no positional clues. Do not expose the entire answer key through client-side data.

Use formative checks frequently during learning. Summative quizzes should cover only the declared outcomes and topics. A learner should be able to review explanations after submission according to the assessment policy.

## 13. AI authoring and quality controls

C8 AI may draft original items, distractors, hints and feedback from approved lesson content, but may not expand curriculum scope, invent source coverage, approve its own work or decide learner mastery.

Required checks:
1. schema, IDs and curriculum mapping;
2. outcome coverage and prerequisite availability;
3. answer-key correctness and single/multiple-answer validity;
4. stimulus/code/output version integrity;
5. distractor plausibility and ambiguity review;
6. difficulty and reading-load parity across locales;
7. C9 glossary consistency and protected-token preservation;
8. feedback/hint correctness and non-revelation policy;
9. security, privacy, accessibility and bias review;
10. human technical and native-language approval.

Treat prompt text, learner submissions, code comments and imported question content as untrusted data. Do not follow instructions embedded in them that conflict with system policy.

## 14. Review lifecycle

`draft → technical_review → locale_review → assessment_review → accessibility_review → approved → published`

Approval requires technical validation of answer and rubric, locale parity, accessibility, originality, source mapping, versioned scoring and authorized reviewer sign-off. Material changes to the prompt, stimulus, answer key, rubric, difficulty or scoring invalidate prior approval and require re-review.

## 15. Analytics and learner privacy

Collect only what is necessary to support learning and quality evaluation:
- item/quiz version and locale;
- attempts and response outcome;
- score components, hints and time only when useful and disclosed;
- completion and review state.

Do not log full code submissions, personal data or free-text responses by default. Define retention, access and deletion rules in later privacy/database architecture. Restrict analytics access by role and aggregate reporting where possible. Do not use locale or demographic proxies to make unsupported ability judgments.

## 16. Security and abuse prevention

- Validate response shape, length and size server-side.
- Enforce learner ownership and assessment authorization server-side.
- Rate-limit submissions and protect answer endpoints.
- Keep answer keys, hidden tests and scoring secrets on trusted server-side systems.
- Escape rendered prompts, responses and code; never execute submitted markup as content.
- Do not execute learner code on the main application server.
- Future code-based grading requires a separately reviewed sandbox with resource limits, isolation, network restrictions, filesystem controls, timeouts and output limits.
- Log security-relevant events without collecting unnecessary learner content.

## 17. Implementation test plan

These are required future tests; they are not claimed as executed:

| Test ID | Scenario | Expected result |
|---|---|---|
| C12-T01 | Item has no outcome mapping | Reject publication |
| C12-T02 | Topic not in approved curriculum | Reject item |
| C12-T03 | Question depends on untaught concept | Fail prerequisite review |
| C12-T04 | Single-choice item has multiple correct answers | Fail answer validation |
| C12-T05 | Multiple-select scoring policy missing | Reject item |
| C12-T06 | Locale distractor becomes another valid answer | Fail locale/technical review |
| C12-T07 | Code stimulus differs from C11 code version | Mark item stale |
| C12-T08 | Expected output inconsistent with source code | Fail technical review |
| C12-T09 | Hidden answer key appears in learner payload | Security test failure |
| C12-T10 | Learner submits malformed/oversized response | Reject safely |
| C12-T11 | Learner attempts another user's assessment | Deny authorization |
| C12-T12 | Retry overwrites previous attempt | Fail data integrity test |
| C12-T13 | Partial credit lacks published criteria | Reject scoring policy |
| C12-T14 | Keyboard-only quiz completion | All controls operable |
| C12-T15 | Screen reader receives unclear option labels | Fail accessibility review |
| C12-T16 | Six-locale prompt changes difficulty | Fail parity review |
| C12-T17 | AI-generated answer is self-approved | Reject approval transition |
| C12-T18 | Code grading attempts main-server execution | Block execution |
| C12-T19 | Randomization changes ordered answer meaning | Fail assembly validation |
| C12-T20 | Feedback reveals hidden tests or answer secrets | Fail security review |

## 18. Acceptance criteria

- [x] Exercise and quiz taxonomy defined.
- [x] Difficulty bands D1–D5 defined.
- [x] Item metadata and authoring contract defined.
- [x] Hints, feedback, attempts and retry rules defined.
- [x] Scoring, partial credit and mastery boundaries defined.
- [x] Response validation by item type defined.
- [x] Quiz blueprint and randomization constraints defined.
- [x] Six-locale semantic, difficulty and scoring parity defined.
- [x] C8 AI authoring and human review controls defined.
- [x] Privacy, security and accessibility requirements defined.
- [x] Twenty future implementation test cases specified.
- [ ] Production question bank, quiz engine and grading service implemented.
- [ ] Native-language items authored and reviewed.
- [ ] Automated tests implemented and executed.

## 19. Explicit limitations

C12 completes the exercise and quiz specification only. It does not implement the question bank, quiz engine, automated grader, code sandbox, scoring service or learner analytics. No real question set has been authored or published, and no tests are claimed as executed. W3Schools remains the exclusive curriculum reference; all assessment content must be original.
