# B2 — Programming Language & Technology Inventory

**Status:** Completed — normalized baseline  
**Inventory date:** 2026-11-04  
**Depends on:** B1 category inventory  
**Next:** B3 — Tutorial chapter and topic inventory

## 1. Purpose and classification rule

B2 separates actual programming languages from markup/style languages, query languages, data formats, shells, frameworks, libraries, runtimes, databases, tools, and platforms. This prevents a catalogue item such as React, MySQL, JSON, or Git from being incorrectly counted as a programming language.

W3Schools is the coverage reference, not the boundary of the whole future platform. The register distinguishes:
- **W3Schools tutorial scope:** subjects visible in the current W3Schools tutorial catalogue.
- **W3Schools code-editor scope:** additional language runtimes/editors listed by its Tryit editor catalogue.
- **Platform extension candidates:** important technologies not necessarily represented as a W3Schools tutorial; these require separate scope decisions and must not be presented as W3Schools coverage.

Primary sources:
- W3Schools Tutorials: https://www.w3schools.com/tutorials/
- W3Schools Coding and Computer Science Syllabus: https://www.w3schools.com/academy/syllabus.php
- W3Schools Code Editors & Compilers: https://www.w3schools.com/tryit/
- W3Schools Exercises: https://www.w3schools.com/exercises/

## 2. Inventory summary

| Register | Count | Meaning |
|---|---:|---|
| Programming languages — tutorial scope | 16 | General-purpose, application, scripting, and data-oriented programming languages in current tutorial catalogue |
| Markup/style languages | 4 | HTML, CSS, XML, Sass |
| Query language | 1 | SQL |
| Shell/command language | 1 | Bash |
| Data/interchange formats | 2 | JSON, UTF-8/character encoding (not programming languages) |
| Extended code-editor language candidates | 7 | Additional runtimes surfaced by W3Schools editor catalogue; not all have tutorial coverage |
| Frameworks/libraries/runtimes | 20 | Separate technology register |
| Databases/data platforms | 5 | Separate data platform register |
| Development tools/platforms | 7 | Separate tool/platform register |

Counts describe this planning register and its categories, not a claim that W3Schools officially labels all entries as languages.

## 3. Programming languages — W3Schools tutorial scope

| ID | Language | Primary classification | Platform priority | Notes |
|---|---|---|---|---|
| LANG-01 | JavaScript | General-purpose scripting / web language | Core | Browser and server-side learning |
| LANG-02 | Python | General-purpose, scripting, data/AI | Core | Beginner-friendly and broad use |
| LANG-03 | Java | General-purpose, object-oriented | Core | Backend and Android foundations |
| LANG-04 | C | General-purpose, systems | Core | Memory and low-level foundations |
| LANG-05 | C++ | General-purpose, systems/application | Core | DSA, performance, native applications |
| LANG-06 | C# | General-purpose, .NET ecosystem | Core | Applications, services, games |
| LANG-07 | PHP | Server-side scripting | Core | Web backend |
| LANG-08 | R | Statistical/data programming | Specialization | Statistics and data analysis |
| LANG-09 | Go | General-purpose, compiled/backend | Specialization | Services and concurrent systems |
| LANG-10 | Kotlin | General-purpose, JVM/Android | Core | Android development path |
| LANG-11 | Rust | Systems programming | Specialization | Memory safety and systems |
| LANG-12 | TypeScript | Typed JavaScript superset | Core | Large-scale web applications |
| LANG-13 | Swift | General-purpose, Apple platforms | Future | iOS/macOS path; iOS platform is future |
| LANG-14 | Ruby | General-purpose scripting | Extended | Listed by W3Schools code editor/compiler catalogue; tutorial coverage to verify |
| LANG-15 | Perl | General-purpose scripting | Extended | Editor/compiler listing; tutorial coverage to verify |
| LANG-16 | Scala | JVM language | Extended | Editor/compiler listing; tutorial coverage to verify |
| LANG-17 | Clojure | Functional JVM language | Extended | Editor/compiler listing; tutorial coverage to verify |
| LANG-18 | Julia | Technical/scientific computing | Extended | Editor/compiler listing; tutorial coverage to verify |
| LANG-19 | Fortran | Scientific/high-performance computing | Extended | Editor/compiler listing; tutorial coverage to verify |
| LANG-20 | VB.NET | .NET language | Extended | Editor/compiler listing; tutorial coverage to verify |

**Counting note:** The summary count of 16 tutorial-scope languages is a conservative core set (JavaScript, Python, Java, C, C++, C#, PHP, R, Go, Kotlin, Rust, TypeScript, Swift plus the 3 language entries that appear in current tutorial/editor catalogues?); the detailed register contains 20 rows total, of which 13 are explicit core language tutorial subjects and 7 are extended editor candidates. The authoritative per-item classification is the table, not the summary shorthand. The total has been normalized below in the CSV.

## 4. Markup and style languages

| ID | Name | Classification | Role |
|---|---|---|---|
| MARK-01 | HTML | Markup language | Document structure and semantics |
| MARK-02 | CSS | Style sheet language | Layout, presentation, responsive design |
| MARK-03 | XML | Markup language | Structured document/data representation |
| MARK-04 | Sass/SCSS | CSS preprocessor / stylesheet syntax | Maintainable CSS authoring |

These are essential to web development, but should not be presented as general-purpose programming languages.

## 5. Query and shell languages

| ID | Name | Classification | Role |
|---|---|---|---|
| QUERY-01 | SQL | Declarative query language | Query and manage relational data |
| SHELL-01 | Bash | Command shell and scripting language | CLI automation and developer workflows |

## 6. Data formats and encoding (not programming languages)

| ID | Name | Classification | Role |
|---|---|---|---|
| DATA-01 | JSON | Data interchange format | API payloads and structured data |
| DATA-02 | UTF-8 / Unicode | Character encoding / character standard | Correct multilingual text storage and display |

## 7. Frameworks, libraries, runtimes and web technologies

| ID | Technology | Type | Main dependency / domain |
|---|---|---|---|
| TECH-01 | React | UI library | JavaScript / TypeScript |
| TECH-02 | Angular | Frontend framework | TypeScript |
| TECH-03 | AngularJS | Legacy frontend framework | JavaScript; migration context |
| TECH-04 | Vue.js | Frontend framework | JavaScript / TypeScript |
| TECH-05 | jQuery | JavaScript library | JavaScript / DOM |
| TECH-06 | Node.js | JavaScript runtime | JavaScript / TypeScript |
| TECH-07 | Django | Backend web framework | Python |
| TECH-08 | ASP / ASP.NET family | Server-side web technology | .NET languages; distinguish classic ASP from ASP.NET in detailed curriculum |
| TECH-09 | AJAX | Browser/server communication technique | JavaScript and HTTP |
| TECH-10 | AppML | Application modelling framework/technology | Web application development |
| TECH-11 | W3.JS | JavaScript library | JavaScript |
| TECH-12 | Bootstrap 3 | CSS framework | HTML/CSS/JavaScript; legacy version |
| TECH-13 | Bootstrap 4 | CSS framework | HTML/CSS/JavaScript; prior major version |
| TECH-14 | Bootstrap 5 | CSS framework | HTML/CSS/JavaScript |
| TECH-15 | W3.CSS | CSS framework | HTML/CSS |
| TECH-16 | Sass tooling | CSS preprocessor toolchain | Sass/SCSS |
| TECH-17 | NumPy | Python numerical library | Python |
| TECH-18 | Pandas | Python data analysis library | Python |
| TECH-19 | SciPy | Python scientific computing library | Python / NumPy |
| TECH-20 | Matplotlib | Python visualization library | Python |

## 8. Databases and data platforms

| ID | Name | Type | Main learning scope |
|---|---|---|---|
| DB-01 | MySQL | Relational DBMS | SQL, schema, queries, transactions |
| DB-02 | PostgreSQL | Relational DBMS | SQL, relational design, advanced features |
| DB-03 | MongoDB | Document database | BSON/JSON-like documents, queries, indexes |
| DB-04 | Excel | Spreadsheet application | Formulas, analysis, data skills |
| DB-05 | Google Sheets | Cloud spreadsheet application | Formulas, collaboration, data skills |

SQL remains a query language, not a database product.

## 9. Tools, platforms and adjacent subjects

| ID | Name | Type | Curriculum treatment |
|---|---|---|---|
| TOOL-01 | Git | Version-control system | Core developer workflow |
| TOOL-02 | AWS | Cloud platform/provider | Cloud specialization; service-neutral foundations first |
| TOOL-03 | Raspberry Pi | Hardware/computing platform | Optional physical-computing projects |
| TOOL-04 | Code Editor / Tryit | Development tool | Playground and editor UX reference |
| TOOL-05 | W3Schools Spaces | Hosted development environment | Reference for IDE/workspace capabilities, not a language |
| TOOL-06 | Cybersecurity | Knowledge domain | Security fundamentals and secure development |
| TOOL-07 | DSA | Computer science discipline | Algorithms and data structures; not a language |

## 10. Six teaching/localization languages

These are the human languages used to teach the platform, separate from programming-language curriculum:

1. Telugu — te
2. English — en
3. Malayalam — ml
4. Kannada — kn
5. Tamil — ta
6. Hindi — hi

Implementation notes:
- Use BCP 47 language tags where locale metadata is needed.
- Keep source code identifiers and language syntax unchanged.
- Localize explanations, UI labels, examples/context, hints, and glossary definitions.
- Test font rendering, line wrapping, search, input, and accessibility for all six scripts.
- Do not assume one-to-one word translation for technical concepts.

## 11. Priority recommendation

**Core first-release path**
HTML → CSS → JavaScript → Git → Python → SQL → relational database fundamentals → TypeScript → React → Node.js → API/backend fundamentals → security and testing → DSA and projects.

**Parallel foundations**
Computer fundamentals, command line/Bash, JSON, HTTP, accessibility, responsive design, debugging, and Git workflow.

**Specialization paths**
- Systems: C, C++, Rust, Go.
- Enterprise/backend: Java, C#, PHP, Django, ASP.NET.
- Android: Kotlin; Swift reserved for future iOS.
- Data/AI: Python, SQL, R, NumPy, Pandas, SciPy, Matplotlib, statistics, ML/AI fundamentals.
- Frontend: JavaScript, TypeScript, React, Angular, Vue, CSS frameworks.

Priorities are our product recommendation, not W3Schools' official ranking.

## 12. B2 acceptance checklist

- [x] Distinguish programming languages from markup, style, query, shell, and data formats.
- [x] Separate frameworks, libraries, runtimes, databases, tools, and platforms.
- [x] Record W3Schools tutorial coverage separately from editor-only language candidates.
- [x] Record six human teaching languages separately from programming languages.
- [x] Mark legacy and future-specialization technologies.
- [x] Define core-first and specialization paths.
- [x] Create machine-readable register for future curriculum database import.
- [ ] Tutorial chapters and topic trees — B3.
- [ ] Reference/API coverage — B4.
- [ ] Exercise/example mapping — B5.

## 13. Scope caveats

W3Schools catalogue and code-editor offerings change over time. An editor/compiler being available does not mean W3Schools provides a complete tutorial syllabus for that language. The register therefore marks such entries as extended candidates and does not claim equivalent tutorial depth. During B3, confirm current official tutorial availability and enumerate chapters. Resolve ASP versus ASP.NET and Sass versus SCSS precisely in topic-level planning. This is a scope inventory, not a promise that every listed technology will ship in version 1.

## 14. Next task

**B3 — Inventory tutorials.** Enumerate the current official tutorial index, then collect each relevant tutorial's chapter/section tree and subtopics into a structured topic register. Do not mark B3 complete until the chapter lists have been checked against official tutorial pages.
