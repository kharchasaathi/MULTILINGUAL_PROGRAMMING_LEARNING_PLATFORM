# W3Schools-Aligned Course Expansion Roadmap

**Project:** CodeSaathi — MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM  
**Purpose:** Track the W3Schools-referenced course catalogue, identify gaps, and sequence future learning paths.  
**Status:** Planning note — not a statement that listed courses are already implemented.

## 1. Current course catalogue (release branch audit)

The curriculum index audit recorded these eight W3Schools-aligned course registrations:

| Course | Indexed topic entries |
|---|---:|
| HTML | 120 |
| CSS | 170 |
| JavaScript | 222 |
| C | 155 |
| C++ | 150 |
| Python | 284 |
| SQL | 151 |
| Java | 85 |
| **Total** | **1,337** |

These figures count entries in the curriculum index only. They do **not** prove that every lesson is fully authored, validated, translated, or deployed.

**Separate learning path:** Programming Foundations has a 172-topic expansion plan. It is a foundational curriculum, not an additional W3Schools tutorial course, so it is tracked separately.

**In progress / not yet released:** C# has a foundation branch and a draft pull request with five English draft lessons. Do not count C# as part of the eight released-branch registrations until its changes are reviewed, merged with approval, and verified on the release branch.

## 2. Planned course and learning-path expansion

The W3Schools catalogue includes programming languages as well as frameworks, libraries, databases, developer tools, and broader technology subjects. CodeSaathi must keep these as clearly labelled course types rather than presenting every item as a programming language.

### Priority 1 — Core programming languages
1. C# (continue the existing draft course; complete review and validation first)
2. PHP
3. TypeScript
4. Go
5. Kotlin
6. R
7. Swift
8. Rust

### Priority 2 — Frontend development
1. React
2. Angular
3. Vue.js
4. jQuery
5. Bootstrap
6. W3.CSS
7. Sass / SCSS

### Priority 3 — Backend development and databases
1. Node.js
2. ASP.NET
3. Django
4. MySQL
5. PostgreSQL
6. MongoDB

### Priority 4 — Computer science and data
1. Data Structures and Algorithms (DSA)
2. Artificial Intelligence (AI)
3. Generative AI
4. Machine Learning
5. Data Science
6. NumPy
7. Pandas
8. SciPy
9. Matplotlib
10. Statistics

### Priority 5 — Developer tools, cloud, and other technology subjects
1. Git
2. AWS / cloud fundamentals
3. Cybersecurity
4. XML
5. JSON
6. Bash / command-line fundamentals
7. Raspberry Pi
8. Excel
9. Google Sheets
10. Power BI
11. SVG and Canvas graphics
12. Web accessibility

This is a proposed CodeSaathi expansion backlog informed by the W3Schools catalogue categories; it is not a claim that W3Schools offers each item as a standalone course in exactly this form.

## 3. Recommended execution sequence

1. Finish the existing C# foundation and validate its lessons and examples.
2. Complete and quality-audit the current eight indexed courses before expanding the catalogue.
3. Add PHP and TypeScript as the next core-language courses.
4. Add React and Node.js as the first framework/runtime learning paths.
5. Add DSA as a cross-language computer-science path.
6. Expand into Go, Kotlin, R, Swift, Rust, then the remaining frontend/backend/data/tool subjects.
7. For each course, create a coverage matrix before lesson production; preserve topic IDs and the established lesson JSON schema.
8. Produce English content first, validate it, and only then begin Telugu and other language localization.
9. Require course-specific validation, runnable-example checks where applicable, CI review, and a progress-tracker update for every batch.

## 4. Course quality and release rules

- Use W3Schools only as a curriculum coverage reference; write original explanations, examples, diagrams, exercises, and assessments.
- Do not mass-copy W3Schools or other copyrighted material.
- Preserve the repository's existing curriculum structure, naming conventions, and lesson JSON schema.
- Keep programming languages, frameworks, libraries, databases, tools, and general subjects in separate catalogue categories.
- Do not mark a course complete based only on curriculum-index registration or file creation.
- Report separately: planned topics, indexed topics, authored lessons, structurally validated lessons, executable examples verified, translations reviewed, and deployed content.
- Inspect relevant GitHub Actions runs and previous-batch validation before starting each new batch.
- Do not merge pull requests or deploy without explicit approval.

## 5. Reference and maintenance

- Primary coverage reference: https://www.w3schools.com/tutorials/
- Additional catalogue reference: https://www.w3schools.com/
- Re-audit the W3Schools catalogue periodically because its tutorial catalogue can change.
- Update this roadmap and the curriculum progress tracker when priorities or verified repository status change.
