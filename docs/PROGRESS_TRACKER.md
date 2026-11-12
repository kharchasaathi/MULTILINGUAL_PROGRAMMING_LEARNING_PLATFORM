# Progress Tracker
Last updated: 2026-11-12 (E13 Task 01 inventory and Firebase identity-provider decision)

## Current execution position
- Current stage: E — Security Constitution
- Current task: E13 — Backup and recovery; Task 01 (authoritative data-store inventory and ownership) is IN PROGRESS. A 25-domain register and role-level ownership map are committed. Firebase Authentication is selected as the initial identity adapter with PostgreSQL as application system of record; external runtime discovery and owner confirmations remain open.
- AWS S3 paid-plan route was paused; Google Cloud Billing signup was blocked by account-security verification and no GCP Billing Account was created. Current off-site candidate is Backblaze B2 EU Central (`eu-central-003`); bucket `kharchasaathi-e13-backup-primary` exists as Private, SSE-B2 enabled, Keep all versions, Object Lock Disabled. See E13 runbook.
- Next action: implement and validate pgBackRest B2 stanza/base backup/WAL/PITR in an isolated environment; then complete approved Object Lock/retention, separate-region/account replication and restore, key escrow/rotation, real alert delivery, E11/E12 restore integrations, numeric RPO/RTO approval and repeated isolated restore drills. E14 remains blocked.
- Completed prior: E1–E10 security design baselines; E11 — Privacy and data protection (completed out of sequence at design scope).
- Canonical checklist: [MASTER_STRUCTURE.md](MASTER_STRUCTURE.md)

## A — Project foundation
| Task | Status | Evidence |
|---|---|---|
| A1 Vision | Complete | Approved and documented |
| A2 Target students | Complete | Seven audience groups documented |
| A3 Platform goals | Complete | Product blueprint |
| A4 Six-language strategy | Complete | Telugu, English, Malayalam, Kannada, Tamil, Hindi |
| A5 Free/premium model | Complete | Initially free; future model undecided |
| A6 Success criteria | Complete | Product blueprint |
| A7 Master blueprint | Complete | docs/PROJECT_MASTER_BLUEPRINT.md |

## B — Curriculum planning
| Task | Status | Notes |
|---|---|---|
| B1 Categories | Complete | 15 curriculum families; 72 catalogue entries; detailed scope and limitations documented in docs/B1_W3SCHOOLS_CURRICULUM_INVENTORY.md |
| B2 Languages and technologies | Complete | 13 tutorial-scope programming languages, 7 editor-only extension candidates, plus separate markup/query/shell/data-format and technology registers; see docs/B2_PROGRAMMING_LANGUAGE_TECHNOLOGY_INVENTORY.md |
| B3 Tutorials | Complete | Final catalogue audit: 58 official Tutorials-index entries (12 HTML/CSS, 10 JavaScript, 23 Backend, 13 Data Analytics); wider global navigation separately classified; version tracks, learning paths, specialist resources, tools and legacy labels reconciled. Per-track chapter-tree evidence and limitations are recorded in docs/B3_TUTORIAL_TRACK_REGISTER.csv; no claim that every sidebar was fully captured. References/practice assets routed to B4/B5. |
| B4 References | Complete (catalogue/link capture scope) | W3Schools reference index and available family/source links recorded in B4 registers. Per user's instruction, no external verification or approval workflow. This does not mean full page-text or every reference member was copied. |
| B5 Examples and exercises | Complete (catalogue/link capture scope) | W3Schools practice catalogue, HTML/SQL category labels, examples/exercises/quiz surfaces and 32 link records captured in docs/B5_W3SCHOOLS_EXAMPLES_EXERCISES_INDEX.md and docs/B5_PRACTICE_LINK_REGISTER.csv. |
| B6 Master topic checklist | Complete (master index scope) | `docs/B6_MASTER_TOPIC_CHECKLIST.csv` consolidates 3,232 uniquely identified rows: B3 tutorial tracks and 533 topic labels, B4 reference families and 2,519 W3Schools reference-member rows, plus B5 practice links. All source URLs are restricted to `www.w3schools.com`. This is an indexed master checklist; it does not claim that upstream B3/B4 source inventories are exhaustive. |
| B7 Beginner | Complete | Beginner scope, outcomes, web pathway, optional language tracks, practice rules, progression criteria and source map documented in `docs/B7_BEGINNER_LEVEL_CURRICULUM.md`; track/module mapping in `docs/B7_BEGINNER_LEVEL_MAP.csv`. |
| B8 Intermediate | Complete | Intermediate scope, outcomes, common web path, optional language tracks, SQL pathway and completion criteria in `docs/B8_INTERMEDIATE_LEVEL_CURRICULUM.md`; 27 module/extension rows in `docs/B8_INTERMEDIATE_LEVEL_MAP.csv`. |
| B9 Advanced | Complete | Advanced scope, DSA structures/algorithms/complexity, advanced JavaScript and Python pathways, SQL extensions, electives and capstone criteria in `docs/B9_ADVANCED_LEVEL_CURRICULUM.md`; 23 module/extension rows in `docs/B9_ADVANCED_LEVEL_MAP.csv`. |
| B10 Professional | Complete | Professional outcomes, specialization pathways, project lifecycle, portfolio deliverables, assessment rubric and completion criteria in `docs/B10_PROFESSIONAL_LEVEL_CURRICULUM.md`; 17 module rows in `docs/B10_PROFESSIONAL_LEVEL_MAP.csv`. |
| B11 Prerequisites | Complete | Prerequisite matrix and 70-edge dependency map across B7–B10; see `docs/B11_CURRICULUM_PREREQUISITE_MATRIX.md` and `docs/B11_PREREQUISITE_DEPENDENCY_MAP.csv`. |
| B12 Coverage approval | Complete (bounded approval) | B7–B10 curriculum framework approved with explicit coverage limitations; see `docs/B12_CURRICULUM_COVERAGE_APPROVAL.md` and `docs/B12_COVERAGE_GAP_REGISTER.csv`. |

## G — Project management and GitHub
| Task | Status | Evidence |
|---|---|---|
| G1 Private repository | Complete | Repository verified |
| G2 AGENTS.md | Complete | File committed on working branch |
| G3 Master blueprint | Complete | File committed on working branch |
| G4 Security constitution | Complete | File committed on working branch |
| G5 Engineering constitution | Complete | File committed on working branch |
| G6 Development roadmap | Complete | File committed on working branch |
| G7 Decision log | Complete | File committed on working branch |
| G8 Progress tracker | Complete | File committed on working branch |
| G9 Branches and pull requests | In progress | Working branch created; PR policy pending |
| G10 GitHub Actions | Not started | |
| G11 Automated tests | Not started | |
| G12 Deployment workflow | Not started | |
| G13 Backup/version control | In progress | Git history active; backup policy pending |

## Other workstreams
C–F and H–S remain pending as listed in MASTER_STRUCTURE.md.

## Evidence and reporting
Only mark tasks complete when artifacts exist and acceptance criteria are met. Draft inventories are not exhaustive verified coverage. No application tests are claimed as executed during this planning/documentation phase.

## B4 W3Schools-only cleanup snapshot (2026-11-04)

The owner confirmed that W3Schools is the exclusive curriculum source. Clearly external-source rows were removed from the core B4 registers; two registers sourced entirely outside W3Schools were deleted. Current working row counts (not completion claims):

| Register | Current rows |
|---|---:|
| HTML reference member register | 309 |
| CSS reference member register | 507 |
| JavaScript/DOM reference member register | 894 |
| Python reference member register | 171 |
| Python keyword/exception/type register | 100 |
| SQL core reference member register | 348 |
| SQL advanced reference member register | 148 |
| JavaScript RegExp syntax register | 42 |

Removed out-of-scope content includes non-W3Schools HTML event/attribute supplements, CSS additions not listed in W3Schools, MDN-only JavaScript owner candidates and RegExp syntax rows, Python.org-only type/protocol/standard-library rows, and non-W3Schools SQL dialect rows. Deleted the Python protocol and Python standard-library registers because their entries were sourced entirely outside W3Schools.

These are cleaned working counts only. They do not establish complete W3Schools coverage. B4 remains in progress; remaining W3Schools reference families still need inventory. B5 remains blocked. No merge to `main`.


## B4 source capture update (2026-11-05)

- Added `docs/B4_HTML_REFERENCE_MEMBERS_CAPTURE_02.md` from W3Schools HTML Elements, Global Attributes, and Event Attributes reference pages.
- Captured the HTML element-name set and 18 global attributes; event families and representative names are recorded, but a normalized complete event-member register remains pending.
- Updated `docs/B4_W3SCHOOLS_REFERENCE_INVENTORY.md` to match the current W3Schools index label “Angular”.
- B4 remains IN PROGRESS. The HTML attributes/events and remaining reference-family member inventories, source mapping, deduplication, and acceptance review are still outstanding. No B4 completion claim is made.


## B4 closure (2026-11-05) — user-directed reduced scope

The user clarified that this task is a straightforward W3Schools-only copy/link capture task, with no external verification and no separate approval/sign-off stage. B4 is therefore closed at **reference catalogue and source-link capture scope**. Evidence: `docs/B4_W3SCHOOLS_REFERENCE_INVENTORY.md`, `docs/B4_REFERENCE_REGISTER.csv`, `docs/B4_HTML_REFERENCE_FAMILY_CAPTURE.md`, and `docs/B4_HTML_REFERENCE_MEMBERS_CAPTURE_02.md`.

Scope boundary: this completion means the reference catalogue/family pointers and the existing working member registers are recorded. It does **not** mean full verbatim copying of W3Schools lesson pages or exhaustive member-by-member transcription for every family. B5 can now proceed. W3Schools remains the sole source.


## B5 closure (2026-11-05) — user-directed copy/link capture scope

The user specified W3Schools as the only source and requested no external verification or approval stage. B5 is closed at **practice catalogue, topic/category label, and link-mapping scope**.

Artifacts:
- `docs/B5_W3SCHOOLS_EXAMPLES_EXERCISES_INDEX.md`
- `docs/B5_PRACTICE_LINK_REGISTER.csv`

Captured W3Schools practice surfaces include Tryit/interactive examples, Examples, Exercises, Quizzes, Challenges, and Practice Problems. Topic exercise links and available HTML/SQL category labels are recorded. This does not claim that every W3Schools exercise prompt or code sample has been copied. B6 is next. W3Schools remains the exclusive source.


## B6 start (2026-11-05)

Created `docs/B6_MASTER_TOPIC_CHECKLIST.csv` on `docs/project-foundation`. It consolidates 181 existing records from the B3 tutorial register, B4 reference register, and B5 practice link register into one checklist index. Each row retains its source ID, topic label, category/domain, W3Schools URL, and source-register path. All coverage statuses are initialized as `Not started`; B6 remains in progress until the checklist is populated and reconciled at the intended topic scope. W3Schools remains the exclusive source; no external verification or approval stage was added.


## B6 closure (2026-11-05) — master checklist index scope

Expanded `docs/B6_MASTER_TOPIC_CHECKLIST.csv` from the initial 181-row cross-register index to 3,232 uniquely identified records. The consolidated file includes B3 tutorial-track records and 533 topic labels from the existing B3 topic-tree document; B4 reference-family records and 2,519 member records from the active HTML, CSS, JavaScript/DOM, JavaScript RegExp, Python, Python keyword/type, SQL, and SQL advanced registers; and B5 practice-link records. The CSV retains source IDs, source-register paths, category/parent fields, W3Schools URLs, and indexed status. A structural check confirmed zero duplicate checklist IDs and zero URLs outside `https://www.w3schools.com/`.

B6 is complete at **master checklist consolidation/index scope**. This does not upgrade the completeness of the underlying B3/B4 inventories or claim that every W3Schools topic has been exhaustively captured. No external source, external verification, or separate approval stage was used. Next task: B7 — Define Beginner level.


## B7 closure (2026-11-05) — beginner-level definition

Artifacts committed on `docs/project-foundation`:
- `docs/B7_BEGINNER_LEVEL_CURRICULUM.md`
- `docs/B7_BEGINNER_LEVEL_MAP.csv`

B7 defines the beginner learner profile, learning outcomes, default HTML → CSS → JavaScript pathway following W3Schools' Where To Start sequence, optional first-language beginner tracks (Python, Java, C, C++, C#, PHP), SQL foundations, beginner boundaries, practice/teaching rules, track-specific completion criteria, and progression handoff to B8. The CSV maps 25 beginner modules across the common, web, programming-language, and SQL tracks. W3Schools is the only curriculum source. The level definition does not claim exhaustive completion of upstream B3/B4 source inventories.

B7 is complete at **beginner-level scope and track-map definition**. Next task: B8 — Define Intermediate Level.


## B8 closure (2026-11-05) — intermediate-level definition

Artifacts committed on `docs/project-foundation`:
- `docs/B8_INTERMEDIATE_LEVEL_CURRICULUM.md`
- `docs/B8_INTERMEDIATE_LEVEL_MAP.csv`

B8 defines entry conditions, outcomes, common HTML/CSS/JavaScript intermediate modules, Python intermediate modules, SQL intermediate modules, optional W3Schools language tracks and framework/database extensions, practice expectations, completion criteria, and the handoff to B9. The CSV contains 27 module/extension rows. W3Schools remains the exclusive curriculum source. Optional tracks are not claimed to have exhaustive chapter maps; upstream B3/B4 inventory limitations remain unchanged.

B8 is complete at **intermediate-level scope and track-map definition**. Next task: B9 — Define Advanced Level.


## B9 closure (2026-11-05) — advanced-level definition

Artifacts committed on `docs/project-foundation`:
- `docs/B9_ADVANCED_LEVEL_CURRICULUM.md`
- `docs/B9_ADVANCED_LEVEL_MAP.csv`

B9 defines advanced entry requirements, outcomes, a detailed DSA pathway (data structures, sorting/searching, graph algorithms and time complexity), advanced JavaScript topics, Python DSA, advanced SQL/data extensions, optional W3Schools-listed subject tracks, practice expectations, capstone and completion criteria. The CSV contains 23 module/extension rows. W3Schools remains the exclusive curriculum source. Optional tracks are not claimed to have exhaustive chapter maps; upstream B3/B4 inventory limitations remain unchanged.

B9 is complete at **advanced-level scope and track-map definition**. Next task: B10 — Define Professional Level.


## B10 closure (2026-11-05) — professional-level definition

Artifacts committed on `docs/project-foundation`:
- `docs/B10_PROFESSIONAL_LEVEL_CURRICULUM.md`
- `docs/B10_PROFESSIONAL_LEVEL_MAP.csv`

B10 defines professional learning outcomes, frontend/backend/database/data-analytics specialization pathways, optional W3Schools-listed electives, project lifecycle, portfolio evidence, professional practice standards, assessment rubric and completion criteria. The CSV contains 17 module rows. W3Schools remains the exclusive curriculum source. This is a professional learning and portfolio definition, not a job guarantee, formal certification or full production engineering standard. Upstream B3/B4 inventory limitations remain unchanged.

B10 is complete at **professional-level scope and pathway-map definition**. Next task: B11 — Identify Prerequisites.


## B11 closure (2026-11-05) — prerequisite identification

Artifacts committed on `docs/project-foundation`:
- `docs/B11_CURRICULUM_PREREQUISITE_MATRIX.md`
- `docs/B11_PREREQUISITE_DEPENDENCY_MAP.csv`

B11 reconciles the B7–B10 learning paths into explicit global entry gates and track-specific prerequisites for the web, programming-language, SQL/database, DSA, data/AI and professional pathways. Dependencies are classified as Required, Conditional or Recommended. The matrix defines prerequisite remediation, track-specific unlocking, and the professional project sequence. The companion CSV records 70 dependency edges, using existing module IDs where available and named gates where upstream optional tracks are only catalogue-mapped.

W3Schools remains the exclusive curriculum source. No new curriculum topics or external sources were introduced. Conditional tracks are not universal requirements; upstream B3/B4 inventory and optional-track mapping limitations remain unchanged. B11 is complete at prerequisite-identification and dependency-map scope. Next task: B12 — Approve curriculum coverage.


## B12 closure (2026-11-05) — curriculum coverage approval with documented limits

Artifacts committed on `docs/project-foundation`:
- `docs/B12_CURRICULUM_COVERAGE_APPROVAL.md`
- `docs/B12_COVERAGE_GAP_REGISTER.csv`

Decision: **Approved with documented coverage limitations.** B7–B10 are approved as the initial W3Schools-derived curriculum framework and selected pathway definitions. The approval is not a claim of exhaustive W3Schools coverage, complete lesson mapping, six-language content completion or implementation.

The reconciliation records the evidence counts: B3 tutorial register 112 rows; B4 reference catalogue 37 rows; B5 practice-link register 32 rows; B6 master checklist 3,232 indexed rows; B7/B8/B9/B10 maps 25/27/23/17 rows; B11 dependency map 70 edges. B6 contains 111 tutorial-track records, and the B3 track `SUP-SPACES — Spaces` is absent from that checklist slice. All B6 rows are marked `Indexed`, which is not a lesson coverage/mastery state. Eight follow-up gaps are recorded in the B12 gap register and remain open.

W3Schools remains the sole curriculum source. No external source or exhaustive-coverage claim was added. B12 is complete at bounded curriculum-framework approval scope. Next stage: C — Teaching & Content Engine; next task: C1 — Define lesson structure.


## C1 closure (2026-11-05) — standard lesson structure

Artifacts committed on `docs/project-foundation`:
- `docs/C1_STANDARD_LESSON_STRUCTURE.md`
- `docs/templates/LESSON_TEMPLATE.md`

C1 defines a reusable lesson sequence, lesson types, B7–B10 teaching depth, six-language localization parity, lesson metadata, assessment/mastery states, remediation, authoring/review lifecycle, accessibility and responsive-content rules. The reusable template is ready for future lesson authoring. This is a specification/template milestone; no lesson has been authored, translated, executed or published by this task.

W3Schools remains the exclusive curriculum scope/source reference. Original instructional content is required. Next task: C2 — Define Telugu-native teaching rules.

## C — Teaching & Content Engine
| Task | Status | Evidence |
|---|---|---|
| C1 Lesson structure | Complete | `docs/C1_STANDARD_LESSON_STRUCTURE.md`; reusable authoring template: `docs/templates/LESSON_TEMPLATE.md`. |
| C2 Telugu-native teaching rules | Complete | Telugu language standard, teaching voice, technical terminology policy, code fidelity, examples, learner instructions, review and quality checklist in `docs/C2_TELUGU_NATIVE_TEACHING_RULES.md`. |
| C3 English teaching rules | Complete | English writing and spelling policy, teaching voice, terminology, code fidelity, examples, learner instructions, accessibility, parity and review checklist in `docs/C3_ENGLISH_NATIVE_TEACHING_RULES.md`. |
| C4 Malayalam teaching rules | Complete | Malayalam language standard, teaching voice, terminology, code fidelity, examples, learner instructions, typography, accessibility, parity and review checklist in `docs/C4_MALAYALAM_NATIVE_TEACHING_RULES.md`. |
| C5 Kannada teaching rules | Complete | Kannada language standard, teaching voice, terminology, code fidelity, examples, learner instructions, typography, accessibility, parity and review checklist in `docs/C5_KANNADA_NATIVE_TEACHING_RULES.md`. |
| C6 Tamil teaching rules | Complete | Tamil language standard, teaching voice, terminology, code fidelity, examples, learner instructions, typography, accessibility, parity and review checklist in `docs/C6_TAMIL_NATIVE_TEACHING_RULES.md`. |
| C7 Hindi teaching rules | Complete | Hindi language standard, teaching voice, terminology, code fidelity, examples, learner instructions, typography, accessibility, parity and review checklist in `docs/C7_HINDI_NATIVE_TEACHING_RULES.md`. |
| C8 AI Localization Engine | Complete | `docs/C8_AI_LOCALIZATION_ENGINE_DESIGN.md` — architecture, contracts, validation, security, review, versioning and test plan. |
| C9 Technical terminology glossary | Not started | |
| C10 Diagrams and visual teaching | Not started | |
| C11 Code explanation format | Not started | |
| C12 Exercises and quizzes | Not started | |
| C13 Mini-projects | Not started | |
| C14 Lesson quality evaluation | Not started | |
| C15 Content review and approval | Not started | |


## C2 closure (2026-11-05) — Telugu-native teaching rules

Artifact committed on `docs/project-foundation`:
- `docs/C2_TELUGU_NATIVE_TEACHING_RULES.md`

C2 defines standard Telugu prose, learner address and teaching voice, first-use technical term explanations, canonical English/code-token preservation, original code-example rules, familiar neutral example contexts, Telugu learner-facing lesson headings, task/question/hint/feedback wording, spelling/typography checks, six-language parity and Telugu-specific publication review. It specializes C1 without changing approved learning outcomes or W3Schools-only curriculum scope.

The task is complete at teaching-rule specification scope. No Telugu lesson has been authored, translated, technically executed, reviewed or published by this task. A separate Telugu lesson-template file was not created; the C1 reusable template remains the authoring base and the Telugu headings/rules are specified in the C2 document.

Next task: C3 — Define English teaching rules.


## C3 closure (2026-11-05) — English-native teaching rules

Artifact committed on `docs/project-foundation`:
- `docs/C3_ENGLISH_NATIVE_TEACHING_RULES.md`

C3 defines internationally understandable English writing standards, spelling consistency, learner address, instructional voice, technical terminology, exact code/output preservation, original examples, C1-aligned English lesson labels, actionable instructions, question and hint design, feedback, readability, accessibility, localization parity and editorial/technical publication reviews.

C3 is complete at English teaching-rule specification scope. No English lesson has been authored, executed, reviewed or published by this task. W3Schools remains the exclusive curriculum topic/source reference; original instructional content is required.

Next task: C4 — Define Malayalam teaching rules.


## C4 closure (2026-11-05) — Malayalam-native teaching rules

Artifact committed on `docs/project-foundation`:
- `docs/C4_MALAYALAM_NATIVE_TEACHING_RULES.md`

C4 defines contemporary Malayalam writing standards, consistent learner address, English technical terminology policy, exact code/output preservation, original examples, C1-aligned Malayalam lesson labels, instructions/questions/hints/feedback, Malayalam grammar and typography checks, glyph/mobile accessibility, six-language parity and language/technical publication reviews.

C4 is complete at Malayalam teaching-rule specification scope. No Malayalam lesson has been authored, translated, executed, reviewed or published by this task. W3Schools remains the exclusive curriculum topic/source reference; original instructional content is required.

Next task: C5 — Define Kannada teaching rules.


## C5 closure (2026-11-05) — Kannada-native teaching rules

Artifact committed on `docs/project-foundation`:
- `docs/C5_KANNADA_NATIVE_TEACHING_RULES.md`

C5 defines contemporary Kannada writing standards, consistent learner address, English technical terminology policy, exact code/output preservation, original examples, C1-aligned Kannada lesson labels, instructions/questions/hints/feedback, Kannada grammar and typography checks, glyph/mobile accessibility, six-language parity and language/technical publication reviews.

C5 is complete at Kannada teaching-rule specification scope. No Kannada lesson has been authored, translated, executed, reviewed or published by this task. W3Schools remains the exclusive curriculum topic/source reference; original instructional content is required.

Next task: C6 — Define Tamil teaching rules.


## C6 closure (2026-11-05) — Tamil-native teaching rules

Artifact committed on `docs/project-foundation`:
- `docs/C6_TAMIL_NATIVE_TEACHING_RULES.md`

C6 defines contemporary Tamil writing standards, consistent learner address, English technical terminology policy, exact code/output preservation, original examples, C1-aligned Tamil lesson labels, instructions/questions/hints/feedback, Tamil grammar and typography checks, glyph/mobile accessibility, six-language parity and language/technical publication reviews.

C6 is complete at Tamil teaching-rule specification scope. No Tamil lesson has been authored, translated, executed, reviewed or published by this task. W3Schools remains the exclusive curriculum topic/source reference; original instructional content is required.

Next task: C7 — Define Hindi teaching rules.


## C7 closure (2026-11-05) — Hindi-native teaching rules

Artifact committed on `docs/project-foundation`:
- `docs/C7_HINDI_NATIVE_TEACHING_RULES.md`

C7 defines contemporary Hindi writing standards, consistent respectful learner address, English technical terminology policy, exact code/output preservation, original examples, C1-aligned Hindi lesson labels, instructions/questions/hints/feedback, Hindi grammar and Devanagari typography checks, glyph/mobile accessibility, six-language parity and language/technical publication reviews.

C7 is complete at Hindi teaching-rule specification scope. No Hindi lesson has been authored, translated, executed, reviewed or published by this task. W3Schools remains the exclusive curriculum topic/source reference; original instructional content is required.

Next task: C8 — Design AI Localization Engine.


## C8 closure (2026-11-05) — AI Localization Engine design

Artifact: `docs/C8_AI_LOCALIZATION_ENGINE_DESIGN.md`.

C8 defines logical components, request/output contracts, six-locale ruleset mapping, protected code segments, scope and parity validation, prompt-injection and privacy controls, human review, versioning, failure handling, metrics and an 18-case implementation test plan.

Complete at design/specification scope only. No provider, framework or database selected; no production pipeline or model adapter implemented; no lessons generated or published. W3Schools remains the exclusive curriculum reference.

Next task: C9 — Define technical terminology glossary.


## C9 closure (2026-11-05) — Canonical multilingual technical terminology glossary

Artifacts committed on `docs/project-foundation`:
- `docs/C9_TECHNICAL_TERMINOLOGY_GLOSSARY.md`
- `docs/C9_CANONICAL_TERM_REGISTER.csv`

C9 defines stable term identity, canonical English labels, six-locale record requirements, first-use/repeat-use rules, ambiguity handling, protected code-token rules, human review and approval gates, versioning, audit/rollback, publication requirements and integration with the C8 AI localization design. The seed register contains 30 source-mapped foundational concepts. All six locale statuses are explicitly `not_started`; no translation or native review is claimed.

Complete at glossary governance and seed-register scope. Native-language translation/review, runtime glossary storage/service, automated validation and implementation tests remain pending. No tests are claimed as executed. W3Schools remains the exclusive curriculum source.

Next task: C10 — Define diagrams and visual teaching.


## C10 closure (2026-11-05) — Diagrams and visual teaching

Artifacts committed on `docs/project-foundation`:
- `docs/C10_DIAGRAMS_AND_VISUAL_TEACHING.md`
- `docs/C10_VISUAL_PATTERN_CATALOG.csv`

C10 defines outcome-led visual selection, a controlled pattern catalogue, visual metadata and structured content contract, six-locale semantic parity, responsive behaviour, text equivalents, keyboard and screen-reader access, contrast and colour-independent meaning, reduced-motion rules, code/data integrity, stale dependency handling, asset provenance, human review and security controls. The catalog contains 12 patterns mapped to W3Schools tutorial topic tracks.

Complete at specification and catalog scope. No renderer, visual authoring UI or production diagrams implemented; no lesson visuals localized or published. Eighteen future implementation test cases are specified but not executed. W3Schools remains the exclusive curriculum reference.

Next task: C11 — Define code explanation format.


## C12 — Exercises and quizzes closure (2026-11-05)
- **Status:** Complete at specification scope.
- **Evidence:** `docs/C12_EXERCISES_AND_QUIZZES_SPECIFICATION.md` defines activity and quiz taxonomies, difficulty, item contract, feedback/hints, scoring boundaries, locale parity, AI/human review, privacy/security and 20 future test cases.
- **Limitations:** No production question bank, quiz engine, grader, sandbox or localized question set implemented; test cases specified but not executed.

## C13 — Mini-projects closure (2026-11-05)
- **Status:** Complete at specification and seed-catalog scope.
- **Evidence:** `docs/C13_MINI_PROJECTS_SPECIFICATION.md` defines B7–B10 project progression, project types, brief metadata, learner-facing brief structure, milestones, submission/version contract, analytic rubric, hints, six-locale parity, AI/human review, lifecycle, accessibility, privacy/security and 22 future test cases.
- **Catalog:** `docs/C13_MINI_PROJECT_CATALOG.csv` contains 20 original seed briefs across Beginner, Intermediate, Advanced and Professional pathways. Catalog module IDs were checked against the B7–B10 maps and topic IDs were checked against the B6 master checklist.
- **Limitations:** Catalog entries remain draft seeds, not fully authored/published project lessons. No starter assets, locale translations/reviews, workspace, submission service, grading service or isolated code runner implemented. Test cases specified but not executed.


## C14 — Lesson quality evaluation closure (2026-11-05)
- **Status:** Complete at evaluation-policy and rubric-contract scope.
- **Evidence:** `docs/C14_LESSON_QUALITY_EVALUATION_SPECIFICATION.md` defines nine weighted quality dimensions, 0–4 evidence scale, 80/100 approval threshold, independent mandatory gates, reviewer roles, evaluation workflow, evidence contract, defect severity, six-locale parity, AI limitations, regression policy and 26 future test cases.
- **Rubric:** `docs/C14_LESSON_QUALITY_RUBRIC.csv` records the nine dimensions and weights (total 100%).
- **Limitations:** No evaluation service, reviewer dashboard, automated validators, audit store or publication control implemented. No lesson corpus scored and no tests executed. The rubric threshold/weights are proposed policy pending validation against real lesson evidence.


## C — Teaching and content engine

| Task | Status | Evidence |
|---|---|---|
| C15 Content review and approval | Complete (workflow specification scope) | `docs/C15_CONTENT_REVIEW_AND_APPROVAL_WORKFLOW.md` defines reviewer roles, separation of duties, submission package, queues, state transitions, revision/dispute handling, six-locale approval, C14 gate integration, release controls, audit, withdrawal/rollback, data contracts, security/privacy/accessibility and 28 future implementation tests. `docs/C15_REVIEW_WORKFLOW_STATE_MACHINE.csv` records transition guards and audit events. No production workflow service, UI, role enforcement, publisher or rollback tooling is implemented; tests are specified, not executed. |

## C15 closure and handoff (2026-11-05)

- C15 is complete at governance and workflow specification scope.
- C14 remains the quality rubric; C15 consumes its mandatory gates and version-bound evaluation evidence.
- All six locales require independent native-language review for a six-locale release; partial locale release must be explicit and policy-authorized.
- Queue targets are provisional and require staffing/capacity validation. C14's proposed score threshold requires calibration on representative lessons.
- Production schemas, authorization, workflow automation, audit storage, notifications and publication controls remain Stage D/implementation work.
- **Next task: D1 — Select technology stack.**


## D — Software architecture

| Task | Status | Evidence |
|---|---|---|
| D1 Technology stack | Complete (baseline selection scope) | `docs/D1_TECHNOLOGY_STACK_DECISION.md` and `docs/D1_TECHNOLOGY_STACK_MATRIX.csv` select a TypeScript-first modular monorepo: Next.js App Router web/PWA, NestJS API, PostgreSQL + Prisma ORM 7 stable, Expo React Native mobile, REST/OpenAPI, pnpm/Turborepo, test toolchain and vendor-neutral operational interfaces. D-0003 recorded in `docs/DECISION_LOG.md`. Hosting, identity, AI, sandbox, storage and payment providers remain deferred. No application code or infrastructure was created; no tests were run. |

## D1 closure and handoff (2026-11-05)

- D1 is complete at baseline technology-stack selection scope.
- The initial backend shape is a modular monolith; microservices, Redis and message brokers are deferred until justified by measured requirements.
- Prisma ORM 7 stable is the baseline; Prisma ORM 8 prerelease is not selected. Compatible stable versions will be pinned at implementation time.
- Hosting/region, authentication, AI provider/budget, code sandbox provider/runtimes, object-storage vendor, payment, retention and SLO decisions remain open for their relevant architecture/security tasks.
- Untrusted learner code must never execute in the web or API application process. Sandbox design and security gates remain mandatory.
- The D1 decision is a documented baseline, not a production implementation or deployment claim.
- **Next task: D2 — Design frontend architecture.**


## D — Software architecture

| Task | Status | Evidence |
|---|---|---|
| D1 Technology stack | Complete (baseline selection scope) | `docs/D1_TECHNOLOGY_STACK_DECISION.md` and `docs/D1_TECHNOLOGY_STACK_MATRIX.csv`; D-0003 recorded in `docs/DECISION_LOG.md`. Hosting, identity, AI and sandbox providers remain deferred. |
| D2 Frontend architecture | Complete (architecture specification scope) | `docs/D2_FRONTEND_ARCHITECTURE.md` defines Next.js web/PWA and Expo native boundaries, monorepo packages, navigation/access classes, server/client rendering, feature ownership, API/state contracts, six-locale behavior, responsive/accessibility requirements, PWA/offline policy, frontend security and 24 future test cases. `docs/D2_FRONTEND_ROUTE_MATRIX.csv` records 20 web/mobile route entries. No app code or tests were executed. |

## D2 closure and handoff (2026-11-05)

- D2 is complete at frontend architecture specification scope; no application directories, components, routes, dependencies or PWA/mobile builds were implemented.
- Web and PWA share the Next.js app; Expo React Native is the separate native client. Shared contracts/domain/validation/i18n/design tokens do not imply shared DOM/native UI components.
- Backend authorization remains authoritative; frontend route guards are UX only. No direct client database access is allowed.
- Offline support is initially read-only for explicitly cached public content. Assessment/progress/project/review writes remain disabled offline until conflict, secure storage and idempotency rules are designed.
- Accessibility and security requirements are specified, not certified or penetration-tested. Twenty-four future tests are documented, not executed.
- **Next task: D3 — Design backend architecture.**


## D3 — Backend architecture closure (2026-11-05)

- **Status:** Complete at logical architecture and module-boundary specification scope.
- **Artifacts:** `docs/D3_BACKEND_ARCHITECTURE.md` defines the NestJS modular-monolith runtime, layering/dependency rules, request lifecycle, data/transaction policy, provider ports, async-work constraints, authorization, error/resilience model, configuration, observability, performance and 24 future implementation tests. `docs/D3_BACKEND_MODULE_MATRIX.csv` records 14 module ownership/dependency boundaries.
- **Key controls:** PostgreSQL remains authoritative; API owns authorization and business invariants; module-private repositories are not accessed cross-module; AI output remains draft and cannot approve/publish; review decisions remain hash-bound; learner code is never executed in the API process.
- **Deferred:** D4 schemas/migrations; D5 exact API contracts; D6 identity/session design; queue/broker/worker technology; hosting, AI, storage, notification, payment and sandbox providers; retention and SLOs.
- **Limitations:** No NestJS application code, database schema, migrations, endpoint implementation, queue, provider integration or deployment was created. Test cases are specified, not executed.
- **Next task:** D4 — Design PostgreSQL database architecture and data ownership.


## D4 — Database architecture closure (2026-11-05)

- **Status:** Complete at logical PostgreSQL data architecture and recovery-requirements scope.
- **Artifacts:** `docs/D4_DATABASE_ARCHITECTURE.md` defines module-owned relational data groups, key/relationship conventions, integrity constraints, indexes, transaction/concurrency/idempotency rules, migration governance, privacy classification, retention decision gates, and backup/restore/disaster-recovery requirements. `docs/D4_DATABASE_ENTITY_MATRIX.csv` catalogs 40 logical entities with ownership, keys, important relationships, constraints and sensitivity.
- **Key controls:** PostgreSQL remains the system of record; one initial database with module-prefixed table ownership; UUID identifiers; immutable lesson/locale/review/release versions; hash-bound approvals; server-side authorization; short transactions; no client database access.
- **Deferred:** Exact Prisma/SQL names and migrations; D5 API contracts; D6 identity/roles; billing and notification persistence; hosting/database region; key management; retention durations; legal deletion policy; RPO/RTO/SLO targets; partitioning and row-level security.
- **Limitations:** No database instance, Prisma schema, SQL migration, seed data, backup job or restore drill was created. The 26 database tests are specified, not executed. No retention duration or recovery objective is invented.
- **Next task:** D5 — Design versioned REST API contracts and OpenAPI schemas.


## D6 closure (2026-11-05) — authentication and identity architecture

Artifacts committed on `docs/project-foundation`:
- `docs/D6_AUTHENTICATION_AND_IDENTITY_ARCHITECTURE.md`
- `docs/D6_AUTHORIZATION_POLICY_MATRIX.csv`

D6 defines provider-neutral identity-to-principal mapping, account lifecycle, web/native authentication and session decision gates, server-side deny-by-default authorization, scoped roles/permissions, C15 separation-of-duties, D4 persistence alignment, D5 API integration, security threats and 26 future test scenarios. Provider, protocol transport, session store, MFA/recovery methods, verification vendor, key management and retention remain open decisions. No production authentication code, provider integration, migration or tests are claimed; tests are specified, not executed. Next: D7 — Design the course engine.


## D7 closure (2026-11-05) — course engine architecture

Artifacts committed on `docs/project-foundation`:
- `docs/D7_COURSE_ENGINE_ARCHITECTURE.md`
- `docs/D7_COURSE_ENTITY_MATRIX.csv`
- `docs/D7_COURSE_LIFECYCLE_STATE_MACHINE.csv`

D7 defines the track/level/module/chapter/topic/lesson hierarchy, Curriculum vs Content ownership, W3Schools source provenance, optional chapter policy, B11 prerequisite graph evaluation and remediation, track-specific learner pathway selection, immutable catalogue releases, C15 publication gates, D4/D5 integration and security controls. 26 future test scenarios are specified but not executed. The B7–B12 framework and recorded B11 edges are preserved; source inventory limitations remain. No application code, migrations, API deployment, lesson import or learner progress implementation is claimed. Next: D8 — Design the language engine.


## D8 closure (2026-11-05) — language engine architecture

Artifacts committed on `docs/project-foundation`:
- `docs/D8_LANGUAGE_ENGINE_ARCHITECTURE.md`
- `docs/D8_SUPPORTED_LOCALE_REGISTRY.csv`
- `docs/D8_LOCALIZATION_PARITY_MATRIX.csv`
- Decision D-0006 in `docs/DECISION_LOG.md`

D8 defines the six-locale allowlist (Telugu, English, Malayalam, Kannada, Tamil and Hindi), locale-resolution precedence, explicit language selection, separate UI and learning-content fallback policies, shared lesson identity with immutable localized versions, protected code/token fidelity, C2–C7 language-rule and C9 glossary integration, AI draft-only authority, semantic/parity validation, C15 human approval, web/PWA/native behavior, accessibility, caching, privacy/security and 30 future test scenarios.

D8 is complete at architecture/specification scope only. No translation corpus, runtime language service, provider, database migration or production implementation was created. C9 locale translation statuses remain unchanged. Test scenarios are specified, not executed. Open decisions (including default UI locale, fallback policy, preference retention, fonts and release completeness) remain recorded in the architecture document.

**Next task: D9 — Design the AI engine.**


## D9 closure (2026-11-05) — AI engine architecture

Artifacts: `docs/D9_AI_ENGINE_ARCHITECTURE.md`, `docs/D9_AI_TASK_AND_CAPABILITY_MATRIX.csv`, `docs/D9_AI_DATA_CONTRACT_MATRIX.csv`; decision D-0007 in `docs/DECISION_LOG.md`.

D9 defines bounded AI task classes, provider-neutral adapters, versioned contracts, prompt/context governance, injection and output-safety controls, privacy/data classification, budgets/quotas/idempotency, validation, audit/usage, evaluation metrics and integration with D4/D5/D6/D8 and C8/C14/C15. AI cannot expand approved W3Schools curriculum, execute code, decide mastery/scoring, grant permissions, approve content or publish. Instructional drafts require C14 evidence and C15 hash-bound human approval.

Complete at architecture/specification scope only. No provider/model, region, budget, runtime, API endpoint, migration or evaluation corpus was selected or implemented. 35 future test scenarios are specified, not executed. Provider privacy/retention terms, consent, region, quotas and budget remain open.

**Next task: D10 — Design the progress engine.**


## D10 closure (2026-11-05) — learner progress engine

Artifacts committed on `docs/project-foundation`:
- `docs/D10_PROGRESS_ENGINE_ARCHITECTURE.md`
- `docs/D10_PROGRESS_EVENT_CATALOG.csv`
- `docs/D10_PROGRESS_DATA_CONTRACT_MATRIX.csv`
- `docs/D10_PROGRESS_WORKFLOW_STATE_MACHINE.csv`
- Decision D-0008 in `docs/DECISION_LOG.md`

D10 defines append-only, server-authoritative and version-bound learner evidence; pathway selection/enrolment; distinct activity, completion and mastery states; versioned completion/mastery policies; D7 prerequisite evaluation; C12 assessment and C13 project evidence boundaries; idempotent ingestion; rebuildable projections; stale/recalculation behavior; D4/D5/D6 integration; privacy/security controls and 35 future test scenarios.

No universal mastery threshold or completion percentage is invented. Offline authoritative writes remain disabled. Completion/mastery policy values, cross-version evidence reuse, retention, exact API routes and projection worker/SLO choices remain open.

D10 is complete at logical architecture/specification scope only. No application code, database migration, API implementation or executed tests are claimed. Test scenarios are specified, not executed.

**Next task: D11 — Design the admin panel.**


## D11 closure (2026-11-05) — admin panel

Artifacts committed on `docs/project-foundation`:
- `docs/D11_ADMIN_PANEL_ARCHITECTURE.md`
- `docs/D11_ADMIN_PERMISSION_MATRIX.csv`
- `docs/D11_ADMIN_DATA_CONTRACT_MATRIX.csv`
- `docs/D11_ADMIN_WORKSPACE_MATRIX.csv`
- Decision D-0009 in `docs/DECISION_LOG.md`

D11 defines the protected admin workspace and 13 operational workspaces; proposed role catalogue and permission families; backend-enforced deny-by-default authorization; C15 author/reviewer/publisher separation; C14 release gates; learner support privacy; read-only D10 progress diagnostics; D8 localization and D9 AI operations; access grants, audit, security, accessibility and 35 future test scenarios.

Final role-grant authority, MFA/dual-control, break-glass expiry, privacy/retention, exact API routes, queue SLAs and analytics thresholds remain open.

D11 is complete at logical architecture/specification scope only. No admin UI, backend endpoint, database migration, permission seed or executed tests are claimed. Test scenarios are specified, not executed.

**Next task: D12 — Design the payment architecture.**


## D12 closure (2026-11-05) — payment architecture

Artifacts committed on `docs/project-foundation`:
- `docs/D12_PAYMENT_ARCHITECTURE.md`
- `docs/D12_PAYMENT_STATE_MACHINE.csv`
- `docs/D12_PAYMENT_DATA_CONTRACT_MATRIX.csv`
- Decision D-0010 in `docs/DECISION_LOG.md`

D12 defines the free-first commercial boundary; versioned plans/prices and immutable order snapshots; provider-hosted checkout; payment, refund and optional subscription lifecycles; raw-body webhook verification; idempotency; reconciliation; entitlement separation; financial data integrity; D11 operational controls; security/compliance gates and 40 future test scenarios.

Gateway, merchant entity/markets, prices, GST/tax, recurring mandates, refund rules, PCI scope, retention, exact D5 schemas and provider SLA remain open.

D12 is complete at provider-neutral architecture/specification scope only. No gateway, merchant account, payment UI/API, database migration, live transaction or executed tests are claimed. Test scenarios are specified, not executed.

**Next task: D13 — Design module communication.**


## D13 closure — 2026-11-05
D13 Module Communication architecture is complete at specification scope. Evidence: docs/D13_MODULE_COMMUNICATION_ARCHITECTURE.md and decision D-0011. It defines module ownership, sync ports, event envelopes, outbox/inbox, at-least-once delivery, idempotency, ordering, retries, quarantine, replay, sagas, security and observability. No broker, worker, migration, endpoint or runtime is implemented; tests are specified, not executed. Next: D14 — end-to-end system data flow.


## D14 closure (2026-11-05) — end-to-end system data flow

- **Status:** Complete at logical end-to-end data-flow and contract specification scope.
- **Evidence:** `docs/D14_END_TO_END_SYSTEM_DATA_FLOW.md`; decision D-0012 in `docs/DECISION_LOG.md`.
- **Coverage:** Registration/authentication; course selection and published content delivery; lesson/exercise/assessment/progress; learner AI Tutor and AI-assisted authoring/localization; payment/refund/subscription and separate entitlement; admin review/approval/publishing; notifications; error handling, recovery, reconciliation and audit.
- **Architecture controls:** Explicit module ownership and trust boundaries; D5/D13 contract alignment; source-of-truth and version rules; idempotency and at-least-once delivery; pending/unknown outcome handling; failure classification; privacy, security and observability requirements.
- **Future tests:** 56 acceptance scenarios specified. They have not been executed.
- **Limitations:** No application code, API endpoint, database migration, provider integration, worker, notification channel, entitlement implementation, deployment or production test is claimed. Deferred choices remain assigned to the relevant architecture/security/quality tasks.
- **Next task:** D15 — Approve system architecture.


## D15 closure (2026-11-05) — system architecture review and conditional approval

- **Status:** Complete — conditionally approved as the logical architecture baseline.
- **Evidence:** `docs/D15_SYSTEM_ARCHITECTURE_APPROVAL.md`; decision D-0013 in `docs/DECISION_LOG.md`.
- **Reviewed:** D1–D14 and supporting D3 module matrix, D4 entity matrix, D5 API endpoint matrix, D6–D13 architecture documents, D14 data flow, AGENTS.md, Engineering Constitution and Security Constitution.
- **Reconciliations committed:** Removed Assessment/Progress dependency cycle; explicitly represented Project, Payment and Entitlement boundaries; separated internal principal from external identity link; added logical consumer inbox receipt; reconciled D12 billing route candidates into D5; clarified progress write as append-only evidence ingestion.
- **Approval:** Approved to proceed to Stage E security design and Stage F quality engineering. Not production-ready and not approval to begin implementation or enable payment, AI provider, publishing or code execution.
- **Mandatory gates:** GATE-01–GATE-15 remain tracked in D15. Project/notification/billing/identity persistence consolidation, exact wire schemas, provider choices, privacy/retention, sandbox, worker operations, backup/restore and CI/release evidence remain pending.
- **Tests:** 35 future architecture verification scenarios specified; none executed by this review.
- **Next task:** E1 — Threat modelling.


## E1 closure (2026-11-05) — system security threat modelling

- **Status:** Complete — architecture-level threat model documented.
- **Evidence:** `docs/E1_SYSTEM_SECURITY_THREAT_MODEL.md`, `docs/E1_THREAT_REGISTER.csv`, updated `docs/SECURITY_CONSTITUTION.md`; decision E-0001 in `docs/DECISION_LOG.md`.
- **Inputs:** D1–D15, D6 identity, D9 AI, D11 admin, D12 payment, D13 module communication, D14 end-to-end data flow and current Security/Engineering Constitutions.
- **Coverage:** Scope/assumptions; 7 logical trust boundaries; 20 baseline assets and classifications; threat actors/abuse cases; STRIDE by boundary; 30 threat records with inherent scores, owners, treatments and provisional residual ratings; D15 GATE-01–GATE-15 mapping; monitoring indicators; non-acceptance rules; 24 future verification scenarios.
- **Critical guardrail:** Sandbox escape is Critical inherent / High provisional residual. Code execution remains disabled until E9, L13–L15 and E15 approval.
- **Other unresolved risks:** Account takeover, IDOR, payment/webhook integrity, CI/CD compromise, privacy/retention and backup recovery remain open until owner stages provide implementation evidence.
- **Verification boundary:** Design-time documentation only. No code, provider, network control, security test, penetration test, scan, restore drill or production control was executed or validated.
- **Next task:** E2 — Network protection.


## E2 closure (2026-11-05) — network protection

- **Status:** Complete at provider-neutral network security design/specification scope.
- **Evidence:** `docs/E2_NETWORK_PROTECTION_ARCHITECTURE.md`, `docs/E2_NETWORK_CONTROL_MATRIX.csv` (32 controls), `docs/E2_NETWORK_VERIFICATION_CATALOG.csv` (30 future scenarios); decision E-0002 in `docs/DECISION_LOG.md`.
- **Coverage:** Eight logical zones; public ingress and origin protection; TLS/certificate lifecycle; east-west/data/worker access; default-deny egress; SSRF, metadata and DNS protections; provider callback boundary; environment/CI/admin isolation; future sandbox network isolation; DoS controls; telemetry, incident containment and fail-closed behavior.
- **Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 evidence/approval.
- **Verification boundary:** Documentation review only. No network configuration, firewall/DNS/TLS change, infrastructure scan, penetration test or production control validation is claimed. All 30 scenarios are specified, not executed.
- **Next task:** E3 — security design.


E3 milestone recorded in E3 artifacts.


## E4 closure (2026-11-05) — identity and authentication security

- **Status:** Complete at provider-neutral security requirements and verification-design scope; implementation pending.
- **Evidence:** docs/E4_IDENTITY_AUTHENTICATION_SECURITY.md; docs/E4_IDENTITY_AUTHENTICATION_CONTROL_MATRIX.csv (42 controls); docs/E4_IDENTITY_AUTHENTICATION_VERIFICATION_CATALOG.csv (48 future scenarios); decision E-0004.
- **Coverage:** Identity lifecycle and linking; OIDC/OAuth validation, state/nonce/PKCE; credential and password safeguards; MFA/recovery; session/token expiry, rotation and revocation; server-resolved principal handoff; service identities; abuse resistance; audit; web/PWA/native client boundaries.
- **Deferred:** Provider, credential ownership, MFA baseline, token/session transport and lifetime, key management, recovery policy and revocation objective remain unselected pending review.
- **Verification boundary:** Design only. No identity provider, endpoint, credential store, MFA, session control, penetration test or runtime scenario was executed or verified. All 48 scenarios are future tests.
- **Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- **Next task:** E5 — authorization and role hardening.


## E5 closure (2026-11-05) — authorization and role security

- **Status:** Complete at policy, permission vocabulary, role matrix and verification-design scope; implementation pending.
- **Evidence:** docs/E5_AUTHORIZATION_ROLE_SECURITY_ARCHITECTURE.md; docs/E5_PERMISSION_CATALOG.csv (44 permission identifiers); docs/E5_ROLE_PERMISSION_MATRIX.csv (15 candidate roles); docs/E5_AUTHORIZATION_CONTROL_MATRIX.csv (50 controls); docs/E5_AUTHORIZATION_VERIFICATION_CATALOG.csv (55 future scenarios); decision E-0005.
- **Coverage:** Deny-by-default policy contract; hybrid RBAC and contextual attributes; object/tenant/field scope; separation of duties; grant lifecycle; privileged/break-glass access; cache invalidation/revocation; service identities; asynchronous authorization; audit and admin enforcement.
- **Verification boundary:** Design only. No policy engine, role seed, endpoint guard, migration, access review or test was implemented or executed. All 55 scenarios are future tests.
- **Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- **Next task:** E6 — database security hardening.


## E6 closure (2026-11-05) — database security hardening

- **Status:** Complete at database security architecture and verification-design scope; implementation pending.
- **Evidence:** docs/E6_DATABASE_SECURITY_HARDENING.md; docs/E6_DATABASE_SECURITY_CONTROL_MATRIX.csv (58 controls); docs/E6_DATABASE_SECURITY_VERIFICATION_CATALOG.csv (52 future scenarios); decision E-0006.
- **Coverage:** Least-privilege database identities; PostgreSQL grants/default privileges; privileged functions/search_path; tenant/RLS design; query safety; integrity; TLS/encryption/key management; migration separation; encrypted backup/PITR and restore; audit, monitoring, derived stores and data lifecycle.
- **Verification boundary:** Design only. No database instance/configuration, SQL/Prisma migration, roles, RLS, encryption, credentials, backup/restore, scan or test was implemented or executed. All 52 scenarios are future tests.
- **Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- **Next task:** E7 — data protection and privacy security.


## E11 closure (2026-11-05) — privacy and data protection (completed out of sequence)

- **Status:** Complete at privacy architecture and verification-design scope; implementation and legal review pending.
- **Canonical mapping:** The earlier E7 label was incorrect. E7 is API security; privacy and data protection is E11. The E11 artifacts below are the authoritative canonical copies.
- **Evidence:** docs/E11_DATA_PROTECTION_PRIVACY_SECURITY.md; docs/E11_PRIVACY_CONTROL_MATRIX.csv (48 controls); docs/E11_PRIVACY_VERIFICATION_CATALOG.csv (38 future scenarios); decision E-0007.
- **Coverage:** Data inventory/classification, purpose and lawful basis, consent/withdrawal, notices and rights requests, minimization, processors/transfers, AI data governance, child-user safeguards, retention/deletion, legal holds and privacy incident response.
- **Verification boundary:** Design only. No legal opinion, DPIA, consent UI, privacy notice, processor contract, retention/deletion workflow, rights request, incident exercise or privacy test is claimed. All 38 scenarios are future tests.
- **Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- **Next task:** E7 — API security (not yet complete).


## E7 closure (2026-11-05) — API security

- **Status:** Complete at API security architecture, control catalogue and verification-design scope; implementation and verification pending.
- **Evidence:** `docs/E7_API_SECURITY_ARCHITECTURE.md`; `docs/E7_API_SECURITY_CONTROL_MATRIX.csv` (59 controls); `docs/E7_API_SECURITY_VERIFICATION_CATALOG.csv` (56 future scenarios); decision E-0008.
- **Coverage:** Route inventory and OpenAPI governance; E4 authentication and E5 object/function/property authorization; strict request schemas and safe response DTOs; BOLA/IDOR/BFLA and mass assignment; rate limits, quotas, idempotency and concurrency; CORS/CSRF; webhook signature/replay/durable inbox; upload/download/export safety; D12 payment, D11 admin, D13 async events; E11 privacy-aware telemetry and CI release gates.
- **Verification boundary:** Design only. No endpoint, API gateway/WAF, auth guard, policy engine, rate limiter, webhook handler, upload scanner, production setting, scan or test was implemented or executed. All 56 scenarios are future tests.
- **Critical guardrail:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- **Next task:** E8 — AI prompt injection protection.


## E8 closure — AI prompt injection protection (2026-11-05)
- Complete at architecture, control catalogue and verification-design scope only.
- Evidence: `docs/E8_AI_PROMPT_INJECTION_PROTECTION.md`; 65 controls in `docs/E8_AI_SECURITY_CONTROL_MATRIX.csv`; 60 future scenarios in `docs/E8_AI_SECURITY_VERIFICATION_CATALOG.csv`; decision E-0009.
- Covers direct/indirect injection, RAG provenance and ACLs, tool allowlists, deterministic authorization, output validation, cross-user isolation, privacy, multilingual/multimodal evaluation and abuse controls.
- No provider, runtime mitigation, tool broker, retrieval ACL, evaluator or test is implemented or executed. Scenarios are future tests.
- AI remains no-tool by default pending implementation and E14/E15 gates. Learner code execution remains disabled pending E9, L13-L15 and E15.
- Next: E9 — code execution sandbox security.


## E9 closure — Code execution sandbox security (2026-11-05)
- **Status:** Complete at architecture, control catalogue and verification-design scope; implementation and enablement prohibited pending gates.
- **Evidence:** `docs/E9_CODE_EXECUTION_SANDBOX_SECURITY.md`; 70 controls in `docs/E9_SANDBOX_SECURITY_CONTROL_MATRIX.csv`; 60 future scenarios in `docs/E9_SANDBOX_SECURITY_VERIFICATION_CATALOG.csv`; decision E-0010.
- **Coverage:** Dedicated execution trust zone; strong isolation candidate; disposable per-job runtime; server-owned job envelope/state machine; least-privilege identity; default-deny IPv4/IPv6 networking; hard CPU/memory/PID/disk/output limits; artifact quarantine; signed image supply chain; assessment/privacy safeguards; monitoring, kill switch and recovery.
- **Verification boundary:** Design only. No sandbox runtime, VM/container, scheduler, network policy, image pipeline, quotas, endpoint, scanner or test was implemented or executed. All 60 scenarios are future tests.
- **Hard gate:** Code execution remains disabled until L13–L15 readiness, E14 independent test evidence and explicit E15 approval.
- **Next task:** E10 — payment security.


## E10 closure — Payment security (2026-11-05)

- Complete at architecture, control-catalogue and verification-design scope only; implementation and independent verification pending.
- Evidence: `docs/E10_PAYMENT_SECURITY_ARCHITECTURE.md`; 59 controls in `docs/E10_PAYMENT_SECURITY_CONTROL_MATRIX.csv`; 55 future scenarios in `docs/E10_PAYMENT_SECURITY_VERIFICATION_CATALOG.csv`; decision E-0011.
- No gateway, endpoint, migration, credential, live payment, PCI assessment or runtime control is implemented. All 55 scenarios are future tests.
- Live payment acceptance requires provider/legal/finance review, E14 independent evidence and E15 explicit approval. E11 was completed out of sequence. Next: E12 — Audit logging.


## E12 closure — Audit logging (2026-11-05)

- Complete at architecture, control-catalogue and verification-design scope; implementation and operational validation pending.
- Evidence: `docs/E12_AUDIT_LOGGING_SECURITY_ARCHITECTURE.md`; 59 controls in `docs/E12_AUDIT_LOGGING_CONTROL_MATRIX.csv`; 55 future scenarios in `docs/E12_AUDIT_LOGGING_VERIFICATION_CATALOG.csv`; decision E-0012.
- Defines versioned audit event envelope, server-side event production, durable transactional audit/outbox, append-only integrity, least-privilege writers/readers, privacy-safe redaction, retention/legal hold, access/export auditing, alert ownership, pipeline health, forensic preservation and incident response.
- No collector, SIEM, WORM store, schema, retention job, dashboard, alert or runtime control is implemented. All 55 scenarios are future tests; none executed.
- Production reliance requires E11 retention/legal review, E13 backup/recovery, E14 independent tests and E15 explicit approval. Next: E13 — Backup and recovery.


## E13 — Backup and recovery (REOPENED; implementation hardening in progress, 2026-11-05)

- Previous E13 closure was premature: the initial mock-only utility did not prove recoverability. E13 is explicitly reopened; E14 must not start yet.
- Hardened implementation committed: atomic staging/publication, restrictive permissions, strict manifest/checksum validation, tamper detection test, age decryption preflight, isolated-target attestation and non-destructive restore into a newly provisioned empty database.
- Added a real PostgreSQL + age end-to-end integration test and a dedicated GitHub Actions service-container job. Mocked tests, Bash syntax checks and the real PostgreSQL 16 + age encryption/decryption + restore/data round-trip all passed in GitHub Actions run 23 (both jobs successful; commit `f171716a51d8d78845bb381c143a874e7eb2e88c`).
- Evidence: `ops/backup/backup-postgres.sh`, `verify-backup.sh`, `restore-postgres.sh`, `test-backup-scripts.sh`, `test-backup-integration.sh`, `README.md`, `.github/workflows/e13-backup-utility.yml`.
- Still not production-complete: WAL archiving/PITR, immutable off-host copies, provider/KMS or key escrow, scheduled backups and freshness alerts, object/event/audit consistency, E11 deletion/legal-hold replay, E12 audit integration, approved RPO/RTO and recurring isolated restore drills. These require infrastructure/provider decisions and owner approvals.
- **Status:** IN PROGRESS. Do not mark E13 complete or proceed to E14 until all mandatory E13 acceptance gates are evidenced.
- **Next action:** implement and validate PITR/WAL recovery, immutable off-host copies, key escrow, scheduling/alerts, E11/E12 integration, approved RPO/RTO and recurring isolated restore drills; then obtain owner approval for external provider dependencies.
\n\n## E13 historical AWS S3 exploration (superseded; 2026-11-05)\n\n- AWS S3 was evaluated but not provisioned. It is not the current selected provider; Backblaze B2 EU Central is the current off-site target.\n- Added `ops/backup/publish-s3-backup.sh`: preflight checks bucket versioning, Object Lock enabled, all four S3 Block Public Access flags, required customer-managed KMS key and explicit per-object retention; uploads encrypted artifact, checksum and manifest. It does not provision AWS resources.\n- Added `ops/backup/test-s3-publish.sh`: mocked AWS CLI contract test only. Live AWS behavior is not yet tested.\n- Added S3 usage/security notes to `ops/backup/README.md` and E13 architecture.\n- Proposed 30-day Object Lock retention is not approved policy. Governance mode is the default; Compliance mode requires legal/security approval.\n- The AWS-specific publisher and templates are retained as unselected historical reference material. Do not provision AWS resources for E13 unless a later architecture and cost decision explicitly reselects AWS.\n- E13 remains IN PROGRESS; E14 remains blocked. No production backup or DR readiness claim.\n

## E13 implementation update — PITR, monitoring and restore gates (2026-11-05)

- Added pgBackRest configuration example, PostgreSQL WAL archive settings example, serialized backup wrapper, backup freshness monitor, proposed cron schedule and historical AWS replication/lifecycle templates. The active pgBackRest example now targets Backblaze B2.
- Added `docs/E13_OPERATIONAL_BACKUP_PITR_RUNBOOK.md` covering the selected B2 topology, pgBackRest bootstrap, WAL/PITR drill, key custody, E11/E12 restore gates and acceptance evidence.
- Added `ops/backup/post-restore-gates.sh`; it fails closed unless dual approval, cross-system reconciliation, application smoke test, code-execution-disabled attestation and executable E11/E12 hooks are present.
- GitHub Actions run 57: AWS reference publisher contract, JSON template validation, Bash syntax, freshness/scheduling/recovery-gate tests and mocked backup tests passed. Real PostgreSQL+age integration also passed in the same run.
- No live AWS resources, IAM/KMS, B2 replication, pgBackRest stanza, PostgreSQL WAL archiving, scheduled production job, alert service, key escrow or real E11/E12 hooks have been provisioned. No live PITR/restore drill or RPO/RTO measurement has occurred.
- Object Lock retention on a live pgBackRest repository requires a disposable-bucket test because retention may block repository pruning. The immutable DR copy must be separately administered and replication/restore tested.
- **E13 remains IN PROGRESS; E14 remains blocked.**


## Product decision — freemium subscription direction (2026-11-05)

- **Approved direction:** Free website + free-to-download Android app + optional low-cost Premium subscription; institutional plans may be evaluated later.
- **Price hypotheses only:** ₹49/month, ₹129/quarter and ₹399/year. Not approved launch prices; unit economics and willingness-to-pay validation are required.
- **Premium candidates:** expanded learning/practice access, higher isolated code-run quotas, advanced projects/assessments, capped AI Tutor usage and Code Structure Analyzer.
- **Guardrails:** no unlimited AI/code execution; enforce quotas server-side and apply budgets, rate limits, sandbox resource ceilings, alerts and kill switches.
- **Still pending:** exact Free/Premium entitlements, quotas, price validation, billing provider, Play billing policy review, tax/compliance review and implementation in stage R.
- This product decision does not change E13 status or acceptance gates. E13 remains IN PROGRESS; E14 remains blocked.


## E13 Backblaze B2 implementation update (2026-11-05)

- Backblaze B2 EU Central bucket kharchasaathi-e13-backup-primary created by owner. Observed: Private, default SSE-B2 enabled, Keep all versions, Object Lock Disabled, zero files at creation.
- Added guarded B2 S3-compatible logical backup publisher and mocked contract tests: ops/backup/publish-b2-backup.sh and ops/backup/test-b2-publish.sh.
- Added dedicated GitHub Actions workflow .github/workflows/e13-b2-contract.yml; B2 publisher + exact-version remote-verifier mock tests passed in run 9.
- Updated pgBackRest config example to B2 endpoint/region and B2 Application Key placeholders; updated E13 runbook, README, architecture and control matrix.
- Important capability differences: no AWS IAM roles, S3 Block Public Access or SSE-KMS; use bucket-restricted B2 Application Keys, private ACL, SSE-B2 plus client-side encryption. B2 versioning is always on. Object Lock is one-way enablement and still disabled on the created bucket. Cloud Replication uses B2 console/Native API and requires a separate B2 account per region.
- Not yet done: live upload/download/remote checksum verification, Object Lock retention test, second-region/account and replication, live pgBackRest stanza/base backup/WAL/PITR, key escrow/rotation, alert delivery, actual E11/E12 restore integrations, approved numeric RPO/RTO and isolated restore drills.
- **E13 remains IN PROGRESS. E14 remains BLOCKED.**


### E13 CI verification — Backblaze B2 and regression suite (2026-11-05)

- Backblaze B2 contract workflow run #7 passed: https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/42003199163. It validates Bash syntax and mocked upload, versioning, private ACL, SSE-B2, Object Lock retention arguments and public-bucket rejection. No real B2 credentials or network upload are used.
- Existing E13 regression workflow for commit ebc836921e50c031a2b103a7334b2bca9b8c6d66 completed all three jobs successfully: mocked tests, mocked S3 contract/operations gates, and real PostgreSQL 16 + age encrypted logical backup/restore round-trip. Workflow: https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/42003198872.
- These CI results do not validate B2 service behavior, pgBackRest S3 compatibility, remote restore, Object Lock service retention, Cloud Replication, key custody, live WAL/PITR, alert delivery or E11/E12 production integration.
- E13 remains IN PROGRESS; E14 remains BLOCKED.


## E13 B2 remote-verification implementation update (2026-11-05)

- Added optional mode-0600 local VersionId evidence log to `publish-b2-backup.sh`. The log is reset before each upload attempt so partial failures cannot silently reuse a previous successful set of VersionIds.
- Added `verify-b2-backup.sh`: downloads the exact B2 object versions for encrypted artifact, SHA-256 sidecar and manifest; compares remote metadata with local copies; recomputes SHA-256 over downloaded bytes.
- Added `test-b2-verify.sh`: mocked exact-version download and remote-tamper rejection.
- Updated the B2 CI workflow to validate both scripts and run publisher + remote-verifier mocked tests.
- B2 workflow run #9 passed: https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/42008265312. The workflow uses mocked AWS CLI responses; it does not authenticate to Backblaze or transfer real data.
- E13 regression workflow on commit `ff0c3f7ea6ac72f13b45d7f192c16c5e08450b2f` passed all three jobs (mocked tests, mocked S3/operations contracts, PostgreSQL 16 + age integration): https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/42008163263.
- Split B2 credentials by trust boundary: current `e13-backup-writer` key is for `postgres/` logical exports only. A separate `pgbackrest/` key is required for physical repository/WAL storage. Do not reuse the current prefix-restricted key for pgBackRest.
- **Still open:** live B2 upload/download verification with owner-held credentials; separate pgBackRest key; live pgBackRest compatibility, base backup/WAL/PITR; approved Object Lock/retention; separate-region/account replica; key escrow/rotation; real alert delivery; E11/E12 restore integrations; approved RPO/RTO and isolated restore drill.
- **E13 remains IN PROGRESS; E14 remains BLOCKED.**


## E13 live B2 smoke workflow prepared (2026-11-05)

- Added manually triggered `.github/workflows/e13-b2-live-smoke.yml`. It creates a synthetic age-encrypted artifact with no production data, uploads it to `postgres/e13-live-smoke/`, downloads the exact returned object versions and verifies SHA-256.
- The workflow intentionally requires temporary GitHub Actions secrets. Before running, owner must create a temporary B2 key restricted to bucket + prefix `postgres/e13-live-smoke/`, Read and Write, 3,600-second expiry; add its ID/secret as `B2_TEST_APPLICATION_KEY_ID` and `B2_TEST_APPLICATION_KEY`; run the workflow manually; then delete both GitHub secrets and revoke the temporary B2 key.
- The existing long-lived `e13-backup-writer` key must not be copied into GitHub Actions. It remains local/secret-manager only.
- **Superseded by the successful run recorded below:** workflow run #3 completed successfully. Temporary GitHub repository secrets were deleted and the temporary B2 key was revoked after the run. No production data was uploaded.


## E13 live Backblaze B2 smoke-test evidence (2026-11-05)

- **PASS:** GitHub Actions run #3, workflow "E13 Backblaze B2 live smoke test": https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/42019191955
- Job `b2-live-smoke` completed successfully. Checkout of `docs/project-foundation`, age installation, synthetic encrypted fixture creation, live B2 upload, exact returned VersionId downloads and remote SHA-256 verification all passed.
- The test uploaded only a synthetic text fixture encrypted with a one-time age identity. No production database or customer data was used. This proves the tested B2 S3-compatible path for this synthetic artifact only; it does not prove pgBackRest, PostgreSQL consistency, WAL/PITR, Object Lock, replication, key escrow, alerting or production disaster recovery.
- The temporary GitHub repository secrets `B2_TEST_APPLICATION_KEY_ID` and `B2_TEST_APPLICATION_KEY` were deleted after the test, and the temporary `e13-live-smoke` B2 Application Key was revoked. The separate long-lived `e13-backup-writer` key was intentionally retained and must remain out of GitHub Actions.
- Environment `e13-b2-live-smoke` remains configured; it contains no environment secrets. The manual workflow definition is on `main` so GitHub can expose workflow_dispatch, and it checks out the implementation branch `docs/project-foundation`.
- **E13 remains IN PROGRESS; E14 remains BLOCKED** until every mandatory acceptance gate in the E13 runbook is evidenced and approved.


## E13 initial data-store inventory (2026-11-12)

- Added `docs/E13_DATA_STORE_AND_BACKUP_COVERAGE_INVENTORY.md` after inspecting the recursive working-branch tree, D3/D4 architecture, E13 control matrix/runbook, and owner-provided Firebase Console screenshots.
- Confirmed the approved planning baseline remains NestJS + PostgreSQL/Prisma; no live PostgreSQL instance was identified, and no Prisma schema/migrations or Firebase application configuration (firebase.json, .firebaserc, Firestore/Storage rules) was found in the inspected branch.
- Firebase Console evidence: Email/Password and Google Authentication providers are enabled; Firestore and Realtime Database show database-creation onboarding; Storage shows a billing/Blaze upgrade gate; Hosting shows Get started. These screens do not prove runtime integration or a deployed data store.
- **Billing decision:** Firebase Blaze is not required for E13 as currently designed. E13 uses PostgreSQL plus Backblaze B2; Firebase Storage is not an approved E13 dependency. Do not upgrade or create Firebase resources until a separate architecture decision, usage estimate, budget alerts and billing-owner approval exist.
- Inventory remains initial/evidence-bounded, not a complete cloud-account audit. Owner confirmations and runtime discovery remain open. E13 IN PROGRESS; E14 BLOCKED.


## E13 Task 01 — Authoritative data-store inventory and ownership (2026-11-12)

- **Status: IN PROGRESS — documentation baseline committed; owner sign-off and runtime discovery pending.**
- Added `docs/E13_AUTHORITATIVE_DATA_STORE_REGISTER.csv` with 25 records covering PostgreSQL logical domains, identity, learner/profile, curriculum/content/review, assessment, progress, AI metadata, asset metadata and bytes, audit, outbox/inbox, notifications, payments, entitlements, search, caches, source/CI, B2 backup artifacts, telemetry, secrets, privacy tombstones/legal holds, sandbox artifacts and third-party provider records.
- Each register row records authoritative system/provider boundary, observed evidence, deployed/planned status, E11-aligned classification, accountable owner role, operational custodian, backup/recovery requirement, reconciliation dependencies and outstanding confirmation.
- Reconciled the register against D3 backend module ownership, D4 PostgreSQL entity and recovery design, D12 payment data contracts, E11 privacy controls, E12 audit architecture, E13 runbook/control matrix and the inspected working-branch tree.
- Confirmed planning architecture: PostgreSQL remains the system of record; Prisma 7 is planned; object bytes require a provider-neutral object-storage adapter. Backblaze B2 is currently the E13 backup artifact destination only, not an approved product-media store.
- Repository scan did not find a live app runtime, Prisma schema/migrations, Firebase project config/rules, deployed Firestore/Realtime Database, product asset bucket, payment gateway, queue, search index or telemetry deployment. This is repository-bounded evidence, not a cloud-account audit.
- Firebase Authentication console screenshots show Email/Password and Google provider configuration, but runtime adoption and existing user accounts are unconfirmed. Firestore/Realtime Database/Storage/Hosting onboarding screens do not establish deployed services.
- Updated BKP-001 and BKP-027 in `docs/E13_BACKUP_RECOVERY_CONTROL_MATRIX.csv` to point to the new inventory and explicitly retain pending owner/runtime confirmation.
- **Owner confirmations required to close Task 01:** (1) Firebase Auth production or experiment and whether real accounts exist; (2) PostgreSQL remains sole authoritative application DB and whether any live DB exists; (3) B2 is only for backup artifacts and whether product media exists elsewhere; (4) disclose any other connected providers/cloud/local stores not represented; (5) confirm role-level owners.
- No credentials or secrets are requested. E13 remains IN PROGRESS; E14 remains BLOCKED.

## D6 / E4 identity-provider decision — 2026-11-12

- **Decision:** Firebase Authentication selected as the initial managed identity provider; D6's provider-neutral adapter boundary is retained.
- **Application source of truth:** PostgreSQL remains authoritative for internal principals, learner/profile data, curriculum, progress, roles/permissions, subscriptions, audit and business records. Firebase Auth manages authentication credentials and supported sign-in/recovery only.
- **Scope exclusion:** This decision does not select or require Firestore, Realtime Database, Firebase Storage, Firebase Hosting/App Hosting, or Firebase Blaze.
- **Security requirements:** NestJS server-side verification of Firebase ID tokens; exact issuer/UID mapping to internal principal; no email-based auto-linking; Admin SDK secrets only in managed server-side secret storage; E4/E7 review of web session and native token transport before production.
- **Artifacts updated:** D6_AUTHENTICATION_AND_IDENTITY_ARCHITECTURE.md; E4_IDENTITY_AUTHENTICATION_SECURITY.md; E13_AUTHORITATIVE_DATA_STORE_REGISTER.csv; E13_DATA_STORE_AND_BACKUP_COVERAGE_INVENTORY.md.
- **Implementation status:** Architecture decision only. No Firebase app integration, user migration, production auth code, Firestore/Storage provisioning or billing upgrade performed.
- **Next identity action:** Safely inspect the current Firebase project for existing accounts and non-secret project configuration before linking it to application runtime. Do not delete or overwrite existing identities.
- E13 Task 01 remains IN PROGRESS until external runtime discovery and named/role owner confirmations are complete; E13 overall remains IN PROGRESS and E14 remains BLOCKED.

## E13 Task 01 reconciliation update (2026-11-12)

- Reconciled the full D4 relational entity matrix against the authoritative E13 data-store register.
- Added `docs/E13_D4_ENTITY_TO_BACKUP_DOMAIN_CROSSWALK.csv`: all 39 D4 entities map to an existing E13 backup domain (39/39; no unmapped or extra entities in the crosswalk).
- Confirmed D4 `asset_object` represents metadata only; object bytes remain a distinct external storage domain (DS-011). D3 Projects/Playground artifacts remain represented in DS-024.
- Corrected DS-002 so PostgreSQL identity principals/external links are marked `PLANNED_NOT_DEPLOYED`, and Firebase Authentication is recorded separately as the selected initial identity provider (DS-003). The stale question asking whether Firebase Auth is production or experiment has been removed; runtime account discovery remains open.
- Updated BKP-001 with entity-level reconciliation evidence.
- **Task 01 remains IN PROGRESS**: 39/39 entity mapping and repository-level inventory are complete; external cloud/local runtime discovery, existing Firebase account inventory, named accountable owners and owner sign-off remain unverified. No production infrastructure was changed.


- 2026-11-12: Added `docs/E13_TASK01_RUNTIME_DISCOVERY_EVIDENCE_PACK.md` with read-only cloud/local runtime discovery scope, safe evidence handling, owner confirmation outcomes and objective Task 01 closure criteria. No credentials requested; no cloud resource changed. Task 01 remains IN PROGRESS pending external evidence.
