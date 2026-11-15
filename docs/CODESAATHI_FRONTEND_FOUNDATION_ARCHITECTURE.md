# CodeSaathi Frontend Foundation Architecture — Version 1.0

**Status:** Initial architecture baseline; implementation is incremental  
**Repository:** `kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM`  
**Branch:** `release/v1-frontend`

## 1. Existing implementation baseline

Inspected on 2026-11-13 from the active branch.

- `public/index.html`: single-page learner landing experience, course dialog, editor and preview iframe.
- `public/styles.css`: global responsive styling.
- `public/app.js`: landing-page shell interactions, mobile menu, dialog closing, playground execution and service-worker registration.
- `public/js/lessons/curriculum-loader.js`: curriculum index, course navigation, lesson fetching, fallback messaging and device-local completion progress.
- `public/js/lessons/lesson-template.js`: safe three-stage lesson rendering and assessment interactions.
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

The UI currently offers 23 language codes in `public/index.html`. Language preference is handled by `public/js/i18n.js`:

- Preference key: `codesaathi.language.v1`
- Supported values in the current UI: `en`, `te`, `hi`, `bn`, `mr`, `ta`, `kn`, `ml`, `gu`, `ur`, `pa`, `or`, `as`, `ne`, `brx`, `doi`, `ks`, `kok`, `mai`, `mni`, `sa`, `sat`, `sd`
- Invalid or unavailable values fall back to English.
- Preference is read during initialization and written on selection.
- Storage access is guarded so a browser storage exception does not prevent page interaction.

Only the currently translated landing-page strings are available in English and Telugu. Malayalam, Kannada, Tamil and Hindi are selectable and persisted, but show an explicit English fallback notice; their translations are not yet authored. This does not mean the entire site or course content is translated.

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

## Phase 1 update — six-language preference and lesson contract

- The language selector lists all six planned languages: English (`en`), Telugu (`te`), Malayalam (`ml`), Kannada (`kn`), Tamil (`ta`), and Hindi (`hi`).
- The selected language code is persisted using `codesaathi.language.v1`.
- Actual translated landing-page strings currently exist only for English and Telugu. Selecting Malayalam, Kannada, Tamil, or Hindi preserves the selected preference but displays an explicit English fallback notice. These languages must not be described as translated or released until their content is authored and reviewed.
- The browser document language follows the language of the content currently displayed, not merely the selected preference.
- A reusable renderer is implemented in `public/js/lessons/lesson-template.js` and is connected to the existing course lesson dialog. It presents the required three stages and uses DOM text nodes for lesson-provided content.
- The shared lesson content contract is defined in `public/content/lesson.schema.json`. It includes stable topic IDs, language, learning objectives, the three teaching stages, executable examples, practice, and assessment.
- The service worker cache version was advanced and the new lesson renderer was added to the app shell so returning visitors can receive the new module.

### Phase 1 implementation boundaries
The current course data is still a small introductory sample. The reusable template is in place, but complete syllabus lessons, genuine per-topic quizzes, fully translated course content, the universal isolated playground, and CSS labs remain separate implementation work. Do not infer their completion from the template.

## Verification snapshot — 2026-11-13
A focused repository structural check passed 12 of 12 assertions for the six-language selector, saved preference key, honest fallback notice, three-stage renderer, renderer integration, lesson completion hook retention, service-worker asset caching/order, JSON lesson schema validity, and documentation alignment.

The latest Firebase Hosting deployment is confirmed successful (GitHub Actions run #38). A real browser interaction test remains unverified because no browser/computer automation capability was available in the work session. Therefore Phase 1 remains IN PROGRESS until that runtime check is evidenced.


## Latest deployment verification — 2026-11-13

- GitHub Actions run #38 completed successfully; deploy job conclusion: `success`.
- Hosting deployment is confirmed. The live browser behaviour has not been independently exercised in this session.
- Phase 1's only remaining acceptance gate is the focused browser smoke check documented in the project phase dashboard.


## Implementation update — 2026-11-15

- Course cards and subject navigation are owned by the curriculum loader; the legacy duplicate hard-coded course renderer was removed from `public/app.js`.
- The lesson renderer now gates completion on correctly answering every available assessment question, keeps completion state visible when a lesson is reopened, and stores progress locally on the device.
- Lesson loading now ignores stale asynchronous responses after a learner changes course or returns to the course list.
- The global app script is limited to shell interactions and the isolated HTML playground.
- The language selector exposes 23 language codes, but the landing-page translation dictionary currently provides authored UI translations only for English and Telugu. Other selections must continue to show the explicit fallback notice. Do not describe all 23 languages as fully translated.
- These changes passed focused JavaScript syntax and lesson JSON/assessment integrity checks. Real browser interaction and latest live deployment verification remain pending.
