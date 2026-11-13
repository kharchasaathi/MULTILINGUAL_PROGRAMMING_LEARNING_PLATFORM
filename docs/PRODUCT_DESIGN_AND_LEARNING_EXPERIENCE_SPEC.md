# CodeSaathi — Product Design & Learning Experience Specification

**Document status:** Active product requirement  
**Applies to:** First public release and subsequent versions  
**Repository:** `kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM`  
**Branch recorded:** `release/v1-frontend`

> This document is the durable source of truth for the learning experience. Future contributors and AI-assisted sessions must read it before changing lesson structure, navigation, language handling, or the code playground. Do not silently remove or weaken these requirements.

## 1. Product principle

CodeSaathi must teach learners to understand programming, not memorize definitions or copy code. Explanations should feel like a patient human teacher explaining an idea to a beginner. Use plain language, familiar real-world analogies, small steps, and concrete examples. Avoid textbook-like paraphrasing, unexplained jargon, and lists of definitions as the main teaching method.

W3Schools may be used as a topic-coverage reference. Do not copy its prose, examples, layout, branding, or protected content. Create original explanations, examples, exercises, diagrams, and projects.

## 2. Required three-stage lesson structure

Every concept lesson must follow these three stages in order. The labels may be adapted to the selected interface language, but the learning sequence must remain consistent.

### Stage 1 — Understand the idea and its story

- Begin with a simple explanation of what the concept is and what problem it solves.
- Include relevant history and evolution where it helps understanding.
- Explain what existed before the technology/concept, why a new solution was needed, the important milestones, and how it reached its present form.
- Explain origins of names when reliably documented.
- Distinguish historical facts from simplified analogies. Do not invent dates, people, motivations, or causal links.
- For programming languages, cover the language's origin, creator/team, initial purpose, predecessor technologies or approaches, major evolution milestones, standards/ecosystem, and naming story as appropriate.
- Example: a JavaScript history lesson should explain the early web's mostly static HTML pages, the need for browser-side interaction, relevant browser scripting alternatives of that era, JavaScript's creation at Netscape in 1995, its original name Mocha, subsequent LiveScript name, the JavaScript branding, and later standardization as ECMAScript. Explain carefully that JavaScript is not a version of Java; the name was a historical branding decision.

### Stage 2 — See how it works through a human explanation

- Explain one small, original example line by line or meaningful block by meaningful block.
- Use relatable analogies only where they clarify the underlying idea. Example: HTML is like the structural skeleton/framework of a building; CSS is like its appearance, paint, and arrangement; JavaScript is like the controls and actions that make parts respond.
- State where the analogy stops being accurate. An analogy is a bridge to understanding, not a substitute for the technical explanation.
- Explain what each important line does, why it is needed, what changes if it is removed or changed, and how the browser/runtime interprets it.
- Explain technical terms immediately in beginner-friendly language.
- Show the expected result and connect each visible result to the relevant code.
- Include common mistakes, why they happen, and how to recognize and fix them.
- Do not use generic theory paragraphs that merely restate definitions. Write as a clear teacher speaking directly to a learner.

### Stage 3 — Write, run, observe, and practise

- Provide an editable code playground for the lesson.
- Learners must be able to run the code and see the output live or by pressing Run.
- Show source code and rendered output together where screen size allows; on mobile, use clear tabs or stacked panels without hiding the output feature.
- Include Reset, Run, and a way to restore the lesson's starter code.
- Include a short guided task, an independent exercise, and a knowledge check/quiz.
- Give useful feedback: explain why an answer or code result is incorrect, not just mark it wrong.
- Include expected output or acceptance criteria for exercises.
- Store lesson completion and basic progress locally in the first frontend release; design the data model so it can later sync to an authenticated account.

## 3. Universal live-code and visual-output requirements

**This requirement applies to every programming topic and every code example—not only CSS.** Learners must be able to see what the code does.

- HTML/CSS/JavaScript examples must have a working browser-based playground, not a static screenshot pretending to be interactive.
- Every lesson with executable code must include an appropriate live output/visualization panel. The output must correspond to the exact code shown in the editor.
- For HTML, show the rendered page. For CSS, show the styled element/page and update it as properties change. For JavaScript, show its visible effect and, where relevant, a console/output panel. For future languages or code that cannot run safely in a browser, provide a suitable sandbox/runtime or a clearly labelled simulated/expected output—never pretend a simulation is real execution.
- Show source code and rendered output together where screen size allows; on mobile, use clearly labelled Editor and Live Preview tabs or stacked panels. The output feature must remain easy to find.
- Support live update while typing where practical, with a Run button as a reliable explicit execution option. Debounce frequent updates to keep the interface responsive.
- Include Run, Reset, and Restore Starter Code controls where relevant.
- Clearly show errors and distinguish syntax/runtime errors from a valid but unexpected output.
- Render learner HTML/CSS/JavaScript in an isolated preview context, preferably a sandboxed iframe with the minimum required permissions. Do not give learner code access to the parent application's origin, authentication state, storage, or secrets.
- Do not use `eval()` or execute learner code in the main application window.
- Explain limitations of the playground where browser APIs, network requests, modules, or server-side features are not supported.
- Test the playground on mobile and desktop, including long code, malformed markup, JavaScript errors, and repeated Run/Reset actions.

## 4. CSS teaching and live colour laboratory

CSS must be taught visually and interactively. A learner should understand not only what a property means, but also what changing its value does to the page.

### 4.1 Human-friendly CSS explanations

- Explain CSS as the rules that control how HTML content looks and is arranged: colour, typography, spacing, borders, sizing, positioning, layout, and responsive behaviour.
- Use familiar comparisons such as a building's paint, materials, room arrangement, signboards, and lighting—but always connect the analogy back to the actual CSS property and browser behaviour.
- Explain selectors, declarations, properties, values, cascade, inheritance, specificity, box model, layout, and responsive design progressively.
- For every important property, explain what it changes, the common values, when to use it, what happens if it is omitted, and common mistakes.
- Include side-by-side before/after examples and show the exact CSS responsible for the visual difference.

### 4.2 Live colour picker with visible codes

- Provide an interactive colour lab for CSS colour topics.
- Learners can choose a colour using a colour picker and immediately see it applied to a preview element or mini webpage.
- Display the exact colour value beneath/alongside the swatch in useful formats such as HEX, RGB, and HSL. Example: a selected swatch must visibly show a code such as `#A8C686`, not just a colour name.
- Provide copyable code snippets for common CSS uses, including `color`, `background-color`, and `border-color`.
- Allow learners to edit the HEX/RGB/HSL value and see the preview update; validate invalid values and explain the problem.
- Include a palette of curated sample colours and shades (for example, sage green, warm ivory, lavender, and neutral tones) as teaching examples. These are learning swatches, not claims of official paint-brand catalog codes.
- If paint-brand colours such as Asian Paints are ever shown, distinguish the brand's official catalogue shade/code from a CSS HEX approximation. Never invent an official paint shade code or imply a CSS HEX value is the manufacturer's code.
- Demonstrate foreground/background contrast and explain readability and accessibility, not just aesthetics.
- Colour swatches must have text labels/codes and accessible controls; do not rely on colour alone.

### 4.3 CSS property playground

- Include a live preview card/page where learners can change CSS properties such as text colour, background, font size, padding, margin, border, border radius, width, display, flexbox/grid alignment, and responsive breakpoints.
- Show the editable CSS and the resulting visual output together.
- Provide guided presets for beginners and allow manual code editing for independent practice.
- Explain the visual effect of each changed value in plain language.
- Include Reset and Restore Example controls so learners can safely experiment.

## 5. Language selection must persist across the entire site

Language selection is a site-wide preference, not a page-local control.

- The selected language must remain active when the learner navigates to another page, opens a lesson, returns to the home page, or refreshes the browser.
- All pages must read from one shared language-preference source. Do not keep separate conflicting language states inside individual pages.
- For the frontend-only release, persist the preference in browser storage (for example, `localStorage`) and initialize the application from the saved value before rendering page content where practical.
- Update visible navigation, buttons, labels, lesson text, quiz text, and other translated interface strings consistently.
- If a particular lesson has not yet been translated, show a clear fallback indication and use the agreed fallback language; never silently pretend that untranslated content has changed language.
- Validate unsupported or corrupted stored values and fall back to the default language safely.
- Later, when accounts/backend are introduced, define how the preference syncs across devices and how account preference interacts with the current browser preference.
- Acceptance test: select Telugu, navigate through at least three different pages/lessons, refresh, and verify Telugu remains selected everywhere. Repeat for English and every language released.

## 6. Content quality and curriculum

- First release priority: HTML, CSS, and JavaScript.
- Build a complete, coherent beginner-to-practical curriculum, not a handful of showcase lessons.
- Maintain a topic/subtopic coverage map against the agreed W3Schools reference scope. Record each topic as planned, drafted, reviewed, implemented, and tested.
- Each lesson should include: learning goals, prerequisite knowledge, Stage 1, Stage 2, Stage 3, common mistakes, practice, quiz, and completion criteria.
- Use original examples that build progressively toward useful projects.
- Keep HTML, CSS, and JavaScript concepts connected. For example, show how HTML structure, CSS presentation, and JavaScript behavior work together in one small project.
- Telugu and English are the initial language priorities. Other planned languages must remain part of the product's long-term language architecture; do not hard-code the application around only two languages.
- Do not claim a course is complete until its topic coverage, lessons, exercises, and quality checks have evidence.

## 7. Interface and navigation

- Maintain a consistent site header, course navigation, lesson navigation, and language selector across routes.
- The selected language must be visibly identifiable on every page.
- Provide clear course/module/topic navigation and show the learner's current location.
- Keep the mobile experience first-class: readable text, touch-friendly controls, no horizontal overflow, and an accessible editor/output layout.
- Preserve CodeSaathi's own visual identity. Do not reproduce W3Schools' logo, colors, page layout, or distinctive UI.
- Provide accessible labels, keyboard navigation, visible focus states, sufficient contrast, and semantic HTML.

## 8. First-release implementation boundaries

- The initial learning experience can run as a static browser application using HTML, CSS, and JavaScript.
- Local storage may hold language preference, bookmarks, and basic progress for the first release.
- Do not represent local-only progress as a secure account or cloud backup.
- A browser-only application cannot securely verify a ₹1 payment, protect paid content from client-side tampering, or synchronize progress across devices. Payment verification and durable account-based entitlements require a trusted backend or a suitable hosted payment/access service. Keep these concerns explicit; do not fake payment verification in frontend code.
- Add backend, authentication, payment automation, cloud progress sync, and admin publishing when the product requirements and operational readiness justify them. Do not block the core learning experience on premature infrastructure.

## 9. Definition of done for a lesson

A lesson is not complete merely because its page renders. It is complete only when:

1. All three stages are present and follow the required teaching approach.
2. Historical claims are checked and clearly distinguished from analogy.
3. The example is original, correct, and explained in human-friendly language.
4. The playground actually runs and displays the result safely.
5. Every executable code example has an appropriate live output or an honestly labelled alternative.
6. CSS colour lessons include interactive swatches and visible/copyable colour codes.
7. CSS property lessons visibly update a live preview when code or values change.
8. Exercises and quiz have useful feedback and expected outcomes.
9. The lesson works on mobile and desktop.
10. The selected site language persists through navigation and refresh.
11. Accessibility, navigation, and relevant automated/manual checks pass.
12. Topic coverage status is updated with evidence.

## 10. Required regression checks

- Language preference survives route changes, refresh, and opening a lesson directly.
- Every released language label corresponds to actual translated UI/content or an explicit fallback.
- Run, Reset, and starter-code restore work repeatedly.
- Learner code cannot access the parent page's DOM, origin storage, or application secrets.
- Preview output updates after code changes and does not become stale after navigation.
- CSS colour picker changes preview and synchronizes HEX/RGB/HSL display and generated snippets.
- CSS property controls and manual editor changes update the same preview consistently.
- Invalid colour values and malformed code produce understandable feedback.
- Mobile layout has no unintended horizontal scrolling.
- Browser back/forward navigation preserves the expected page and language state.
- No lesson is marked complete while required stages or checks are missing.

## 11. Change control

- Treat this document as a product requirement, not optional suggestions.
- Before changing lesson design or language behavior, update this document and the relevant tests together.
- If a future request conflicts with this specification, call out the conflict and ask for a decision rather than silently discarding an existing requirement.
- Keep implementation status separate from requirements: a requirement written here is not proof that the feature has been implemented.
- Update the document as the product evolves, preserving the history of meaningful decisions in Git commits.

---
**End of specification.**
