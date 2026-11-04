# C13 — Mini-Projects Specification

**Status:** Complete — project learning model, brief contract, milestones, deliverables, rubrics and locale parity defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C12; approved curriculum B7–B10 and prerequisite map B11  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** Only approved B7–B10 module/topic mappings; W3Schools is the exclusive curriculum reference  
**Artifacts:** `docs/C13_MINI_PROJECTS_SPECIFICATION.md`, `docs/C13_MINI_PROJECT_CATALOG.csv`

## 1. Purpose and boundary

Define a consistent project-based learning system that lets learners combine already taught concepts in a bounded, authentic task and produce inspectable evidence of learning. A mini-project is a structured learning activity, not an excuse to introduce a new framework, API, library, language feature or deployment platform.

C13 is a content and assessment specification. It does not implement a project workspace, code runner, submission service, automated grader, portfolio hosting or project content publishing. The catalog is a set of original project briefs at seed level, not completed lesson assets.

W3Schools alone defines curriculum scope. Each project maps to existing B7–B10 module IDs and W3Schools URLs. Project narratives, sample data, requirements, starter material and evaluation prompts must be original; never copy W3Schools examples, exercises, solutions, prose or diagrams. A broad module URL is a source pointer, not proof that every topic in that module is exhaustively inventoried.

## 2. Project design principles

1. **Outcome first:** every project assesses explicit C1 learning outcomes and C12 evidence types.
2. **Prerequisite aware:** project availability follows B11 hard gates and the learner's selected pathway.
3. **Scope bounded:** project requirements list included and excluded capabilities.
4. **Teach before build:** no required concept may appear before its lesson/prerequisite.
5. **Originality:** briefs, code, sample data, hints, tests and solutions are authored originally.
6. **Evidence over polish:** correctness and demonstrated reasoning matter more than visual decoration unless UI is an explicit outcome.
7. **Incremental delivery:** milestones produce reviewable artifacts and early feedback.
8. **Locale parity:** all six versions preserve requirements, difficulty, deliverables, constraints and rubric weights.
9. **Accessible by design:** project instructions and submitted artifacts must be navigable and perceivable.
10. **Safe by default:** treat submissions as untrusted; never run learner code on the main application server.
11. **Transparent evaluation:** publish rubric criteria and submission rules before work begins.
12. **No false completion:** draft briefs and catalog entries are not authored, reviewed or published project lessons.

## 3. Project progression by level

| Level | Project shape | Scaffolding | Expected evidence |
|---|---|---|---|
| Beginner (B7) | One small, bounded outcome using a single module or a short prerequisite chain | Guided brief, checklist, starter structure or partial hints where appropriate | Working small page/program/query, screenshots or sample output, short explanation |
| Intermediate (B8) | Connected features combining multiple completed modules in one selected track | Milestones, optional hints, interface/data outline, test prompts | Integrated artifact, feature-level checks, explanation of decisions and known limits |
| Advanced (B9) | Independent problem-solving, algorithmic or multi-component task | Minimal scaffold; explicit constraints and evaluation evidence | Design rationale, implementation, representative test cases, complexity or behavior analysis where in scope |
| Professional (B10) | Portfolio-oriented specialization project with lifecycle evidence | Learner-authored plan and milestone commitments; review checkpoints | Requirements, selected scope, implementation, test evidence, documentation, demo and retrospective |

Level describes expected independence and integration, not simply project size. A project must not be assigned above the learner's completed prerequisite path.

## 4. Project types

Use one primary type; optional secondary tags may be added.

- **Build:** create a small page, program, query set or data artifact.
- **Extend:** add a defined feature to an existing learner artifact.
- **Debug and improve:** diagnose seeded issues and document corrections.
- **Analyze:** inspect supplied code/data and produce a reasoned result.
- **Algorithm challenge:** implement and explain a bounded data structure or algorithm.
- **Portfolio capstone:** integrate a selected specialization and provide lifecycle evidence.

Do not label an activity a project if it is only a single recall question; use C12 exercises instead.

## 5. Canonical project brief contract

Every project record must contain the following fields:

| Field | Requirement |
|---|---|
| `project_id` | Stable, unique identifier; never reused |
| `title_key` | Locale title key, not translated title embedded in identity |
| `level`, `track` | One approved B7–B10 level and pathway |
| `module_ids`, `topic_ids` | Existing approved curriculum IDs only |
| `prerequisite_ids` | Required lesson/module/project dependencies |
| `primary_outcome_ids` | Measurable C1 outcomes demonstrated |
| `project_type` | Controlled project type |
| `brief_key` | Locale brief text key |
| `problem_context` | Original, culturally neutral task context |
| `scope_in`, `scope_out` | Explicit inclusions and exclusions |
| `constraints` | Allowed concepts, input/output and technical boundaries |
| `milestones` | Ordered milestone IDs, checkpoints and completion evidence |
| `deliverables` | Required artifact and evidence list |
| `acceptance_criteria` | Observable pass/fail or rubric-evidence statements |
| `rubric_id` | Versioned evaluation rubric |
| `estimated_minutes` | Planning estimate, not a deadline |
| `hint_policy_id` | Optional staged hints and reveal policy |
| `starter_asset_refs` | Versioned optional starter files; no hidden solution |
| `source_urls` | W3Schools source URLs mapped to included topics |
| `locale_status` | Per-locale draft/review/approved/published state |
| `content_version`, `status` | Version and lifecycle state |
| `created_at`, `updated_at` | Audit timestamps |

A project cannot be published if its module/topic IDs do not exist, prerequisites are unmet, an outcome is missing, source URLs are outside W3Schools, or any required locale is not approved.

## 6. Standard project brief sections

Every learner-facing brief follows this sequence:

1. Project title and level.
2. What you will demonstrate.
3. Problem statement and context.
4. Prerequisite readiness check.
5. Required features and explicit non-goals.
6. Input, output and interaction expectations.
7. Constraints and permitted curriculum concepts.
8. Milestones and checkpoint evidence.
9. Deliverables and submission format.
10. Acceptance criteria.
11. Evaluation rubric and scoring explanation.
12. Hints and support policy.
13. Accessibility and responsive expectations, when applicable to the mapped outcome.
14. Reflection prompts and known-limitations disclosure.
15. W3Schools source links and originality statement.

Briefs must be unambiguous and self-contained. Do not assume access to paid tools, proprietary datasets, personal accounts or a particular device. Avoid collecting real personal data; use fictional/sample data.

## 7. Milestone model

Use only milestones that add value to the selected project. A small beginner project may combine stages; advanced/professional projects may require separate evidence at each stage.

| Milestone | Learner action | Checkpoint evidence |
|---|---|---|
| M0 — Ready | Confirm prerequisites, scope and expected output | Readiness checklist |
| M1 — Understand | Restate the problem and identify inputs/outputs | Short plan or annotated brief |
| M2 — Design | Outline page/program/query structure within taught topics | Sketch, pseudocode, structure or query plan |
| M3 — Build | Implement one bounded feature at a time | Versioned working artifact |
| M4 — Verify | Check normal, boundary and invalid cases appropriate to scope | Test table, screenshots or recorded outputs |
| M5 — Explain | Explain key decisions and demonstrate the result | Walkthrough/demo and reflection |
| M6 — Improve (optional) | Address review feedback without expanding scope | Change summary and updated evidence |

Checkpoint feedback must identify satisfied criteria, gaps and the next actionable step. Do not reveal a complete solution by default.

## 8. Deliverables and submission contract

A project submission may include:
- source files or query text relevant to the mapped curriculum;
- a short README/usage note when appropriate;
- sample input and expected/observed output;
- test-case table and evidence of checks;
- screenshots or a short demonstration where visual behavior is assessed;
- design notes, algorithm explanation or complexity reasoning when required by the mapped outcome;
- known limitations and reflection.

Submission metadata must include `submission_id`, `project_id`, `project_version`, `learner_id`, `locale`, `artifact_refs`, `milestone_status`, `submitted_at`, `attempt_number` and `review_status`. Enforce ownership and reviewer permissions server-side. Preserve immutable submission versions; resubmission creates a new attempt rather than overwriting evidence.

Never require credentials, private account data or real customer data. Provide a clear retention/deletion policy before collecting learner artifacts.

## 9. Evaluation rubric

Use an analytic rubric. Default weights below are a starting policy and may be adjusted per project only when the brief publishes the changed weights before the learner starts.

| Criterion | Default weight | Evidence |
|---|---:|---|
| Requirement coverage | 20% | Required features and scope compliance |
| Technical correctness | 25% | Output/behavior matches acceptance criteria |
| Concept application | 15% | Correct use and explanation of taught concepts |
| Structure and clarity | 10% | Readable organization appropriate to level |
| Verification | 15% | Relevant normal/boundary/invalid checks and evidence |
| Explanation and documentation | 10% | Accurate walkthrough, usage and limitations |
| Accessibility/usability | 5% | Applicable interaction, labels, readability and responsive checks |

For algorithm or query projects, project-specific rubric wording may replace irrelevant presentation criteria while preserving a published total of 100%. Never penalize a learner for an optional feature not required by the brief. Aesthetic preference must not substitute for objective criteria.

Rubric scale:
- **0 — Not evidenced:** criterion absent or evidence unusable.
- **1 — Emerging:** substantial gaps; partial understanding shown.
- **2 — Developing:** core requirement partly met; some errors remain.
- **3 — Meets:** requirement met with correct, sufficient evidence.
- **4 — Strong:** accurate, clear and independently justified within scope.

Weighted score is descriptive evidence, not automatic proof of mastery. C14 defines cross-project quality and mastery policy. Human review is required for open-ended reasoning and disputed outcomes. AI may assist feedback drafting but cannot be the sole authority for high-impact grading.

## 10. Hints, feedback and learner support

- Hint 1 points to the relevant taught concept or brief section.
- Hint 2 narrows the next step or suggests a decomposition.
- Hint 3 gives a more explicit direction without exposing the full answer unless the reveal policy permits it.
- Milestone feedback is specific, respectful and tied to rubric evidence.
- Provide a solution walkthrough only after the configured learning policy; keep it distinct from the learner's submission.
- Hints and feedback must be independently localized and reviewed in all six locales.
- Do not use locale-specific idioms, stereotypes or assumed local resources as hidden clues.

## 11. Six-locale project parity

For Telugu, English, Malayalam, Kannada, Tamil and Hindi:
- Keep project ID, level, track, outcomes, scope, constraints, milestones, deliverables, acceptance criteria and rubric weights identical.
- Localize brief, instructions, hints, feedback and rubric descriptions naturally under C2–C7.
- Use approved C9 glossary terms consistently.
- Preserve code, identifiers, file names, literal values, query syntax, sample outputs and protected technical tokens.
- Keep task difficulty, cognitive demand and expected effort equivalent; translation length must not alter the task.
- Validate that localized examples do not accidentally change requirements or imply different valid solutions.
- Require technical review and native-language review for each locale.
- A missing or parity-failing locale remains unavailable; do not silently substitute another language or publish partial content as complete.

## 12. AI-assisted project authoring

C8 may draft original briefs, milestones, test prompts, hints and rubric descriptions from approved curriculum and lesson outcomes. AI is not allowed to:
- add topics or dependencies absent from B7–B11;
- invent a W3Schools source URL or claim an unverified topic is covered;
- copy or closely paraphrase W3Schools protected learning content;
- generate hidden requirements that are not in the brief;
- approve its own content or grade high-impact outcomes autonomously;
- expose starter assets containing complete solutions when scaffolding is intended.

Required validation: schema, IDs, prerequisite graph, source domain, scope, outcome coverage, milestone order, acceptance criteria, rubric arithmetic, locale parity, protected-token integrity, accessibility, privacy, originality and human sign-off.

## 13. Project lifecycle and versioning

`draft → curriculum_review → technical_review → locale_review → accessibility_review → assessment_review → approved → published → retired`

- Every change creates a versioned revision.
- Changes to scope, requirements, starter assets, expected output, rubric or scoring invalidate prior approvals.
- Published learner submissions remain linked to the exact project/rubric version used.
- Retiring a project must not erase historical submissions or evidence.
- Only authorized roles may approve or publish; enforce authorization server-side.
- Record reviewer identity, decision, timestamp and reason in an audit trail.

## 14. Accessibility, privacy and security

- Briefs must have clear heading hierarchy, plain language, keyboard-accessible controls and readable mobile layouts.
- Do not communicate success/failure through colour alone.
- Images and diagrams need text alternatives; videos need captions/transcripts where used.
- Avoid timed projects unless timing is essential and an accessible alternative is defined.
- Treat uploaded files, code, comments, filenames and free text as untrusted.
- Validate file type, size and content at trust boundaries; store artifacts outside executable application paths.
- Render submitted code as escaped text; never execute it merely by displaying it.
- Never run learner code on the main application server. A future execution service requires separate sandbox design, threat modelling, isolation, resource/network/filesystem controls, timeouts, output limits and security approval.
- Restrict artifact access to the learner and authorized reviewers; use least privilege and audit access.
- Minimize analytics and avoid logging full source files or personal data by default.

## 15. Implementation test plan

These are required future tests; they are not claimed as executed.

| Test ID | Scenario | Expected result |
|---|---|---|
| C13-T01 | Project references unknown module/topic ID | Reject publication |
| C13-T02 | Project maps to topic outside approved B7–B10 scope | Reject publication |
| C13-T03 | Required prerequisite hard gate is incomplete | Keep project locked |
| C13-T04 | Project has no measurable outcome | Reject brief |
| C13-T05 | Source URL is not on www.w3schools.com | Reject source mapping |
| C13-T06 | Scope includes an untaught technology | Fail curriculum review |
| C13-T07 | Acceptance criterion cannot be observed | Fail brief review |
| C13-T08 | Milestone order skips required design/build dependency | Fail milestone validation |
| C13-T09 | Rubric weights do not total 100% | Reject rubric |
| C13-T10 | Locale version changes a requirement or rubric weight | Fail parity review |
| C13-T11 | Code token or expected output changes during localization | Fail protected-token validation |
| C13-T12 | Starter asset accidentally exposes full solution | Fail content review |
| C13-T13 | Learner submits malformed/oversized artifact | Reject safely |
| C13-T14 | Learner attempts to read another learner's submission | Deny authorization |
| C13-T15 | Resubmission overwrites earlier evidence | Fail version integrity |
| C13-T16 | Submitted code is rendered in learner view | Escape as text; do not execute |
| C13-T17 | Project attempts main-server code execution | Block execution |
| C13-T18 | Keyboard-only learner completes project submission | All required controls operable |
| C13-T19 | Screen reader cannot identify project milestone state | Fail accessibility review |
| C13-T20 | AI-generated brief self-approves or grades as sole authority | Reject approval/result |
| C13-T21 | Retired project has historical submissions | Preserve read-only historical linkage |
| C13-T22 | Published project changes after learner starts | Pin learner to original version or explicit migration |

## 16. Acceptance criteria

- [x] Project progression for B7–B10 defined.
- [x] Project types and scope boundaries defined.
- [x] Canonical project brief metadata contract defined.
- [x] Standard learner-facing brief sections defined.
- [x] Milestone and checkpoint model defined.
- [x] Deliverables and immutable submission-version contract defined.
- [x] Analytic rubric, scale and scoring boundaries defined.
- [x] Hints and milestone feedback policy defined.
- [x] Six-locale semantic/difficulty/rubric parity defined.
- [x] C8 AI authoring controls and human approval lifecycle defined.
- [x] Accessibility, privacy and code-execution security requirements defined.
- [x] Twenty-two future implementation test cases specified.
- [x] Seed project catalog created with approved module IDs and W3Schools source URLs.
- [ ] Full learner-facing project briefs authored and reviewed in all six locales.
- [ ] Project workspace, submission service, rubric engine and isolated execution service implemented.
- [ ] Automated tests implemented and executed.

## 17. Explicit limitations

C13 completes the project-learning specification and seed catalog only. Catalog records are brief concepts and mapping seeds, not fully authored or published project lessons. No starter assets, localized project content, project workspace, submission workflow, grading service, code runner or portfolio service has been implemented. No learner code has been executed and no tests are claimed as run. Curriculum scope remains bounded to the approved B7–B10 maps and W3Schools source URLs.
