# CodeSaathi launch scope and interaction audit

**Branch:** `release/v1-frontend`  
**Working scope:** English Programming Foundations, HTML, CSS and JavaScript only  
**Status:** IN PROGRESS — initial content expansion and mobile navigation correction committed; full audit remains open.

## Scope locked
- Pre-launch courses: Programming Foundations, HTML, CSS and JavaScript.
- New standalone courses are deferred until after launch.
- English is the authoring source of truth for new work. Existing regional files are preserved but are not the current authoring target.
- Existing course, module and topic IDs and the three-stage lesson contract are preserved.
- Lessons remain draft until all release evidence exists.

## Content work committed in this pass
- `public/content/en/foundation/F0.1.json`: expanded into a technical introduction to internet/Web architecture, DNS, URL anatomy, HTTP request/response, browser processing and Network-panel investigation.
- `public/content/en/html/H2.1.json`: expanded into a complete document setup and inspection lesson covering standards mode, metadata, encoding, viewport, source vs DOM and local project paths.
- `public/content/en/css/C2.1.json`: expanded into a comparison of inline/internal/external CSS, URL resolution, cascade debugging and reusable stylesheet practice.
- `public/content/en/javascript/J2.1.json`: expanded into script loading and execution semantics, parser timing, defer/async/modules, DOM access and event listeners.

These are the first representative expanded lessons, not a claim that all existing English lesson files are now professionally complete.

## Interaction inventory
| Control / interaction | Current intended behaviour | Audit status |
|---|---|---|
| Brand and in-page navigation links | Navigate to page sections | Present in markup; browser verification pending |
| Start learning | Scroll to course section | Handler present |
| Language selector | Persist selected locale and apply available UI translation/fallback | Handler present; full multilingual content is outside current authoring scope |
| Core course navigation bar | Open the selected Foundations, HTML, CSS or JavaScript curriculum; retain selected state | Buttons and event delegation implemented; browser verification pending |
| Mobile menu toggle | Open/close primary navigation; close on link selection, outside click and Escape; update ARIA state | Handler and responsive CSS added in this pass; browser verification pending |
| Course card action | Open selected course curriculum dialog | Curriculum loader handler present |
| Topic buttons | Load selected topic lesson | Handler present |
| Back to course | Return to selected course topic list | Handler present |
| Lesson practice link | Load lesson starter code into playground and run | Handler present; mode-specific editor limitations need separate verification |
| Assessment answers | Provide immediate answer feedback | Radio change handlers present |
| Mark lesson complete | Save local completion state and update button/course progress | Handler present; storage is device-local |
| Run code | Execute current editor content in sandboxed preview iframe | Handler present; sandbox and example-by-example runtime verification pending |
| Close lesson | Close native dialog | Handler present; native Escape behaviour is provided by dialog |

## Remaining work — do not mark complete
1. Expand and technically review the remaining English lessons systematically across all four in-scope courses.
2. Compare the topic inventory against W3Schools coverage and record genuine missing subtopics without adding unrelated courses.
3. Audit the complete set of visible controls at desktop and mobile widths; verify keyboard operation, focus, accessible names and empty/error states.
4. Verify HTML, CSS, JavaScript and combined playground execution modes. Confirm CSS and JavaScript examples run in an appropriate isolated context rather than treating every snippet as an arbitrary HTML fragment.
5. Run JSON Schema validation, answer-option integrity checks, JavaScript syntax checks, browser runtime tests and deployment smoke tests.
6. Confirm the mobile navigation and course/lesson flows in a real browser before claiming the interaction audit complete.

**No release approval is implied by this report.**


## Implementation update — 2026-11-15

### English curriculum depth added in this pass
- Foundations F0.2–F0.7 and F1.1 were expanded while preserving topic IDs, the three-stage lesson contract and draft status.
- HTML H1.1, CSS C1.1 and JavaScript J1.1 were expanded as representative professional-depth entry lessons.
- Added worked examples, practical tasks and assessment items. Answer-to-option integrity, unique question IDs and required stage presence were checked for the updated Foundations set and the three representative language-course lessons.
- The expanded lessons are original CodeSaathi explanations and examples. They are not a claim that all W3Schools coverage has been mapped or that the complete 554-topic English curriculum has been upgraded.

### Interaction implementation changes
- Removed the duplicate hard-coded course-card/course-dialog renderer from `public/app.js`. Course cards, course navigation, topic loading and lesson rendering now have one owner: `public/js/lessons/curriculum-loader.js`.
- Kept `public/app.js` focused on the landing-page shell, mobile menu, dialog closing, start-to-courses scrolling, playground execution and service-worker registration.
- Lesson completion now requires every assessment question in that lesson to be answered correctly. Incorrect answers no longer reveal the correct answer immediately.
- Completion is persisted locally and the course-card progress count is refreshed. Previously completed lessons retain their completed state when reopened.
- Added stale-request protection so a slower previous lesson response cannot overwrite a more recently selected course or topic.
- Added a visible disabled state and keyboard focus style for the lesson-completion control.
- The playground remains inside a sandboxed iframe; it does not receive same-origin access to the parent application.

### Focused checks performed
- JSON parse and lesson-contract checks: F0.1–F0.7 and F1.1.
- Assessment answer-option integrity and unique question ID checks: all checked lessons passed.
- JavaScript syntax checks: `public/app.js`, `public/js/lessons/curriculum-loader.js`, and `public/js/lessons/lesson-template.js` passed.
- GitHub Actions curriculum validation for F1.7 passed after the frontend changes.

### Still open — do not claim release readiness
1. Expand and review the remaining English topic files across Programming Foundations, HTML, CSS and JavaScript; this pass only upgrades the topics listed above.
2. Complete the W3Schools topic/subtopic coverage matrix and identify missing subtopics without copying protected wording.
3. Add and test proper HTML, CSS, JavaScript and combined playground modes; the current landing playground is an HTML-fragment preview and must not be represented as a complete multi-language editor.
4. Perform real browser smoke tests at desktop and mobile widths, including keyboard navigation, dialog focus, course selection, language selection, quiz completion, local progress persistence and playground isolation.
5. Verify the latest Firebase Hosting deployment and exercise the live site before calling the interaction audit complete.
6. Keep all lessons in draft until editorial and technical review evidence is complete.

**Current status remains IN PROGRESS. No release approval is implied.**
