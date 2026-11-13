# CodeSaathi Frontend Foundation Architecture — Version 1.0

**Status:** Initial architecture baseline; implementation is incremental  
**Repository:** `kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM`  
**Branch:** `release/v1-frontend`

## 1. Existing implementation baseline

Inspected on 2026-11-13 from the active branch.

- `public/index.html`: single-page learner landing experience, course dialog, editor and preview iframe.
- `public/styles.css`: global responsive styling.
- `public/app.js`: course data, dialog rendering, local progress, editor execution and language selector.
- `firebase.json`: Firebase Hosting serves the `public` directory.
- Firebase Hosting deployment is already configured; do not repeat setup without evidence of a deployment problem.

The current frontend is a static single-page application. A multi-route architecture is not yet present in the inspected HTML/JS. Do not claim route persistence is tested until routes exist and have been exercised.

## 2. Foundation decisions to preserve

1. Keep the existing Firebase Hosting project and deployment workflow.
2. Continue with the current HTML/CSS/JavaScript frontend and Firebase Modular SDK direction; do not migrate frameworks without an explicit architecture decision.
3. Treat the site as a syllabus-oriented educational website, not a generic code-generation tool.
4. Preserve existing files and content. Prefer additive sections/modules; make targeted edits only where structured code requires them.
5. Keep curriculum source-of-truth in the master syllabus and per-subtopic progress in the CSV tracker.
6. Keep lesson authoring aligned with the three-stage teaching contract in `PRODUCT_DESIGN_AND_LEARNING_EXPERIENCE_SPEC.md`.
7. Keep learner code isolated from the parent application and its storage/authentication context.

## 3. Current language preference implementation

The existing UI has English and Telugu options. An additive language-preference section was appended to `public/app.js`:

- Preference key: `codesaathi.language.v1`
- Supported values in the current UI: `en`, `te`
- Invalid or unavailable values fall back to English.
- Preference is read during initialization and written on selection.
- Storage access is guarded so a browser storage exception does not prevent page interaction.

Only the currently translated `data-i18n` strings are translated. This does not mean the entire site or course content is translated. Malayalam, Kannada, Tamil and Hindi remain planned, not implemented.

The current page has no verified multi-route navigation. When course/lesson routes are introduced, they must use the same shared preference source rather than create separate page-local language states.

## 4. Incremental target structure

Introduce structure only as the relevant learner experience is implemented. Do not perform a large rewrite just to create folders.

Suggested responsibilities:

- `public/index.html`: application shell and semantic page landmarks.
- `public/styles.css`: shared tokens, layout, responsive and accessible component styles.
- `public/app.js`: small bootstrap/compatibility layer only as modules are extracted.
- `public/js/core/`: shared language preference, navigation, storage and application state.
- `public/js/curriculum/`: course, module, topic and lesson metadata.
- `public/js/lessons/`: reusable three-stage lesson rendering and lesson content loading.
- `public/js/playground/`: isolated HTML/CSS/JS editor and preview execution.
- `public/js/labs/`: CSS Colour Lab and CSS Property Playground.
- `public/js/progress/`: lesson completion, bookmarks, quizzes and local progress.
- `public/content/te/` and `public/content/en/`: original language-specific lesson content, organized by course/module.

These are target responsibilities, not claims that these folders or modules already exist. Add them when the corresponding feature is implemented.

## 5. File preservation and update method

- Fetch the latest file before editing.
- For curriculum and prose documents, append new uniquely identified sections where practical.
- For JavaScript, JSON, CSV and configuration files, preserve valid structure and make precise changes; do not blindly append syntax that would break the format.
- Do not replace an entire large file with a shortened version.
- Preserve existing sections and use stable IDs for topics and lessons.
- Split a file into linked modules only when size or maintainability justifies it.
- Record meaningful implementation milestones in the phase dashboard.

## 6. Phase 1 acceptance checkpoints

- Existing Hosting and repository workflow remain intact.
- Frontend baseline and responsibilities are documented.
- Shared language preference initializes from saved browser state and persists after selection.
- Unsupported/corrupt language values safely fall back to English.
- No claim is made that all content is translated or that multi-route persistence is complete before routes exist.
- The reusable lesson architecture is defined before lesson content is mass-produced.
- Focused syntax/smoke checks are run after relevant implementation; avoid excessive repetitive verification.

---
**End of initial frontend foundation architecture.**
