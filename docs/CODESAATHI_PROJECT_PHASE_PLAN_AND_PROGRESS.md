# CodeSaathi — Project Phases & Progress Dashboard

**Repository:** `kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM`  
**Working branch:** `release/v1-frontend`  
**Purpose:** Single source of truth for project phase, completed work, current work, and remaining work.

## Working rules
- Work in practical, deliverable-focused phases.
- Update this dashboard after each meaningful phase or milestone.
- Do not spend disproportionate time on repetitive verification, excessive documentation, or elaborate testing.
- Use sensible baseline checks: syntax/build checks and a quick smoke test for changed functionality. Add deeper tests only where a real risk or bug warrants them.
- Standard curriculum coverage should be based on common college-level HTML/CSS/JavaScript syllabi and mainstream web standards. Do not delay progress by repeatedly debating ordinary topics.
- Do not mark a feature or phase complete until the corresponding work is actually committed and the essential user-visible behaviour works.
- Keep requirements separate from implementation status.
- Do not silently change previously agreed product requirements.

## Overall phase roadmap

| Phase | Scope | Status | Completion evidence / remaining work |
|---|---|---|---|
| 0. Product direction | CodeSaathi identity, target learners, ₹1 concept, first-release scope | COMPLETE | Product direction established in conversation; confirm pricing/payment implementation separately |
| 1. Foundation & architecture | Repository, static frontend, hosting baseline, design requirements, course architecture | IN PROGRESS | Website is live on Firebase Hosting; design specification and curriculum baseline exist. Need inspect/fix current frontend architecture and route structure |
| 2. Complete curriculum | Foundation + HTML + CSS + JavaScript + projects, lessons, exercises, assessments | IN PROGRESS | Master syllabus baseline created and expanded. Detailed lesson map, topic tracker, and all lesson content remain |
| 3. Core learning experience | Navigation, persistent language preference, course/module/lesson pages, responsive UI | NOT STARTED | Existing language selector does not persist across pages; fix and make shared site-wide state |
| 4. Universal live playground | HTML, CSS, JS and combined editor/output; run/reset; isolated preview; errors | NOT STARTED | Must implement actual runnable preview for all executable examples |
| 5. CSS visual laboratories | Colour picker and HEX/RGB/HSL codes; typography, box model, flex, grid, responsive labs | NOT STARTED | Requirements captured; implementation pending |
| 6. Learning activities | Guided practice, independent exercises, quizzes, explanations, local progress/history/bookmarks | NOT STARTED | Implement after core lesson/playground structure |
| 7. Course content production | Write, illustrate, translate, review and publish full Foundation/HTML/CSS/JS lessons | NOT STARTED | Produce lessons incrementally, starting with foundation and HTML; no course-completion claims before content exists |
| 8. Projects & capstone | Progressive projects, final integrated website project, rubrics | NOT STARTED | Build after prerequisite lessons |
| 9. Release readiness | Responsive/accessibility smoke checks, content QA, hosting deployment, basic analytics/feedback if needed | NOT STARTED | Keep checks focused and proportional; launch after core learner journey works |
| 10. Payment & account capabilities | ₹1 payment flow, verified entitlements, accounts/cloud sync/admin publishing | DEFERRED | Static frontend cannot securely verify payments; add trusted backend/hosted payment flow when core learning release is ready |

## Current progress snapshot

**Current phase:** Phase 1 — Foundation & architecture, while Phase 2 — Curriculum completion is active in parallel.  
**Immediate next task:** Convert the expanded master syllabus into a complete topic-level tracker, then start building the core lesson template and shared language preference.  
**Current learner-facing state:** The Firebase-hosted site is live, but the full curriculum and promised interactive learning experience are not yet complete.

### Confirmed completed deliverables
- Firebase Hosting deployment succeeded for the CodeSaathi site (GitHub Actions run #11 was shown successful by the user).
- GitHub OIDC workflow for Firebase Hosting deployment was updated to use keyless authentication.
- `docs/PRODUCT_DESIGN_AND_LEARNING_EXPERIENCE_SPEC.md` records the agreed teaching method, language persistence, universal live output, CSS visual labs, and independent original content rules.
- `docs/CODESAATHI_CURRICULUM_MASTER_SYLLABUS_V1.md` records Foundation, HTML, CSS, JavaScript, extended coverage, projects, and quality gates.
- `docs/CODESAATHI_CURRICULUM_PROGRESS_TRACKER.csv` provides an initial topic progress tracker (requires expansion to all detailed subtopics).

### Known outstanding items
1. Expand tracker to every syllabus subtopic (not only module headings).
2. Inspect and fix global language persistence across routes and refresh.
3. Implement reusable three-stage lesson template.
4. Implement safe universal live code editor/output for HTML, CSS, JavaScript and combined examples.
5. Implement CSS colour/property visual labs.
6. Create complete original Foundation, HTML, CSS, JavaScript lessons in Telugu and English.
7. Add exercises, quizzes, lesson history/bookmarks and local progress.
8. Build and complete projects and capstone.
9. Deploy and smoke-test the integrated learner journey.
10. Decide and implement secure ₹1 payment/access model; do not fake payment verification in client code.

## Progress reporting format

After each meaningful work session, update:
- **Current phase**
- **Last completed milestone**
- **Work completed in this session**
- **Remaining tasks in the current phase**
- **Next concrete task**
- **Blocker (only if real)**

Use honest status values: `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `COMPLETE`, `DEFERRED`.

## Current status
- Roadmap established.
- Curriculum scope exists but topic-level authoring and tracker expansion remain.
- Website is live, but this is not yet a completed course platform.
- No claims of full syllabus, lesson, payment, or playground completion until implemented.

## Phase 1 work log — 2026-11-13

### Completed in this session
- Inspected the current learner frontend files: `public/index.html`, `public/app.js`, `public/styles.css`, and `firebase.json`.
- Confirmed the current learner experience is a static single-page frontend; multi-route navigation is not yet implemented.
- Expanded `docs/CODESAATHI_CURRICULUM_PROGRESS_TRACKER.csv` by appending 540 previously untracked syllabus subtopics. The existing 14 detailed Foundation rows were preserved, giving 554 detailed subtopics represented in the tracker. Existing module summary rows were also retained.
- Added an additive language preference implementation to the end of `public/app.js`. It stores the selected English/Telugu preference under `codesaathi.language.v1`, restores it on page initialization, validates stored values, and falls back to English.
- Added `docs/CODESAATHI_FRONTEND_FOUNDATION_ARCHITECTURE.md` to record the actual frontend baseline, decisions to preserve, incremental target structure, and Phase 1 acceptance checkpoints.

### Evidence / commits
- Curriculum tracker expansion: `361d79b6d3357927cbbbfb1e95e2653dcc9fddba`
- Language preference implementation: `e182fd784e9acb8275613da394c636eb5772bf6b`
- Frontend foundation architecture: `dc4475fe8fd6f0f29f51bd9aab8c51863ffe560b`

### Current status
- Phase 1 — IN PROGRESS.
- Phase 2 — IN PROGRESS; detailed topic tracker now includes 554 syllabus subtopics, but lessons are not yet authored.
- Language preference code is committed, but runtime/browser verification has not yet been performed. Multi-route persistence remains pending because the inspected frontend currently has no multi-route system.
- Reusable lesson template and shared lesson-content structure remain pending.

### Next concrete tasks
1. Perform a focused browser/syntax smoke check for language preference initialization and persistence; fix only any observed issue.
2. Define and implement the reusable three-stage lesson template without rewriting the existing site wholesale.
3. Establish the shared curriculum/lesson metadata shape and begin the Foundation lesson pathway.
