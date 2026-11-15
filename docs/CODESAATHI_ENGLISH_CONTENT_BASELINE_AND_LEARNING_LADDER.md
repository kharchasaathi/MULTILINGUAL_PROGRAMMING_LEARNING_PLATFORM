# CodeSaathi English Content Baseline and Learning Ladder

**Branch:** `release/v1-frontend`
**Scope:** Programming Foundations, HTML, CSS and JavaScript
**Authoring language:** English first
**Release state:** Draft content is not published or approved merely because it is committed.

## Existing draft content — repository baseline

At the inspected branch head, the English content files are already present in the Git tree and therefore already version-controlled; there is no separate uncommitted working directory exposed by the GitHub repository connection to stage. Do not rewrite or recommit unchanged files merely to create duplicate commits.

| Course | Existing English lesson JSON files |
|---|---:|
| Programming Foundations | 14 |
| HTML | 110 |
| CSS | 164 |
| JavaScript | 213 |
| **Total** | **501** |

The existing course files and their IDs must be preserved. Existing statuses remain unchanged until the relevant quality gates are met. This baseline records file presence, not a claim that all 501 lessons have been technically reviewed or are launch-ready.

## Required learning progression in every topic

Each topic should teach the same idea at increasing depth. Use the existing lesson contract and stable IDs; do not create duplicate beginner and advanced copies of the same topic.

### Level 1 — Basic / school-friendly introduction
- Start with familiar language and a concrete everyday example.
- Define new words before using them.
- Explain what the concept is, what problem it solves and where a learner encounters it.
- Use a tiny example and show the expected result.
- Avoid unexplained abbreviations and assume no prior programming knowledge.

### Level 2 — Beginner / guided implementation
- Introduce correct technical vocabulary and the smallest useful syntax.
- Explain each important token, element, attribute, property, value, operator or statement.
- Show how to save, run and inspect the result.
- Give a guided task with hints and common beginner mistakes.

### Level 3 — Intermediate / practical developer
- Combine concepts into realistic page and application features.
- Explain dependencies, data flow, browser behaviour, DOM/CSS interactions and maintainable project structure.
- Cover common edge cases and debugging methods using observable evidence.
- Include independent exercises and scenario-based assessments.

### Level 4 — Advanced / engineering practice
- Explain relevant standards, browser/platform behaviour, trade-offs and failure modes.
- Cover accessibility, security, performance, compatibility and maintainability where relevant.
- Compare viable implementation approaches and explain when each is appropriate.
- Include tests, diagnostics, refactoring and constraints from real projects.

### Level 5 — Professional developer / production readiness
- Apply the concept in a multi-file, integrated project or production-like feature.
- Explain architecture decisions, code review concerns, testing strategy and operational implications.
- Identify what must be enforced on the server rather than trusted to browser code.
- Provide a completion rubric, extension task and evidence a developer should inspect before release.

## How this maps to the existing three lesson stages

- `stages.understand`: primarily Level 1, with accurate terminology introduced gently.
- `stages.explain`: Levels 2–4, with progressively richer worked examples and technical reasoning.
- `stages.practise`: Levels 2–5, from guided exercise to independent production-style task.
- `practice`: runnable starter/reset code only when the topic can be demonstrated safely in the supported playground.
- `assessment`: questions must test understanding and decisions, not only recall; each answer must exactly match one option.

Every topic need not force all five levels into every sentence. The sequence should be visible across its three stages, examples, tasks and assessment. A tiny introductory topic may be short, but its prerequisite chain must eventually lead to advanced and professional application in later topics.

## Course-specific destination

### Programming Foundations
Progress from computer/program/source-code vocabulary and simple instructions to variables, values, expressions, control flow, functions, data structures, decomposition, debugging, algorithms, testing, version control and project reasoning. Explain language-independent ideas before tying them to HTML/CSS/JavaScript examples.

### HTML
Progress from elements, tags and attributes to document structure, text, links, images, lists, tables, forms, semantic landmarks, media, metadata, SVG, accessibility, validation, form submission and production document architecture.

### CSS
Progress from selectors and declarations to cascade, specificity, inheritance, values/units, box model, typography, flow, Flexbox, Grid, responsive design, custom properties, pseudo-classes/elements, animation, architecture, accessibility and performance.

### JavaScript
Progress from statements, values and variables to operators, control flow, functions, arrays, objects, DOM, events, errors, modules, asynchronous JavaScript, promises, fetch, storage, security, testing and maintainable application architecture.

## Authoring and validation rules

1. Work in the order Foundations → HTML → CSS → JavaScript.
2. Audit and improve existing lesson files before inventing replacement IDs.
3. Preserve `id`, `courseId`, `moduleId`, `topicId`, prerequisite relationships and the established JSON contract unless a separately reviewed migration is required.
4. Use original explanations and examples. W3Schools is a coverage reference, not text to copy.
5. Validate JSON, unique IDs, answer-option integrity, examples, runnable output and stage completeness after each batch.
6. Keep lessons in `draft` until technical, pedagogical, accessibility and runtime evidence is recorded.
7. Do not translate new content until the English source has passed review.
8. Do not claim browser testing, native-speaker review or release readiness without evidence.

## Current first-pass expanded lessons

- `foundation/F0.1.json`
- `foundation/F0.2.json`
- `html/H2.1.json`
- `css/C2.1.json`
- `javascript/J2.1.json`

These first-pass expansions are a starting batch, not completion of the remaining curriculum.
