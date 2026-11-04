# B11 — Curriculum Prerequisite Dependency Matrix

**Status:** Complete — prerequisite relationships identified across B7–B10  
**Exclusive curriculum source:** W3Schools  
**Inputs:** B7 Beginner, B8 Intermediate, B9 Advanced, B10 Professional curriculum and maps  
**Artifacts:** `docs/B11_CURRICULUM_PREREQUISITE_MATRIX.md`, `docs/B11_PREREQUISITE_DEPENDENCY_MAP.csv`

## 1. Purpose and rules

B11 identifies what a learner should know before entering a later module or specialization. It connects the existing B7–B10 maps; it does not add curriculum topics, expand source inventories, or require every learner to study every language or technology.

Dependency labels:
- **Required:** complete the named foundation before the dependent module.
- **Conditional:** required only when the learner selects the named pathway or feature.
- **Recommended:** useful preparation, but not a hard entry gate.
- **None:** no earlier curriculum module is required by this map.

A prerequisite is satisfied by demonstrated mastery of the named learning outcomes, not merely by opening a lesson. If a learner fails a prerequisite check, route them to the relevant earlier module, then return them to the blocked module. Do not reset unrelated completed tracks.

## 2. Global entry and progression gates

| Gate | Entry condition | If not met |
|---|---|---|
| B7 entry | No programming experience assumed; start with B7-001 orientation | Begin at B7-001 |
| B8 common entry | B7 foundations for the selected route: basic page structure/styling, one chosen language's variables/conditions/loops/functions, and basic SQL when the route uses SQL | Remediate only the missing B7 track/module |
| B9 DSA entry | B8 programming foundations in one selected implementation language; arrays/collections and functions must be understood | Return to the selected B7/B8 language modules |
| B9 JavaScript advanced entry | B8 JavaScript objects/collections and DOM/events; async topics for the async/DOM extension | Return to B8-JS modules |
| B9 SQL advanced entry | B8 SQL joins, grouping/conditional queries and database structure relevant to the selected advanced topic | Return to the relevant B8-SQL modules |
| B10 professional entry | B9 completion for the selected specialization, an independent intermediate project and an advanced capstone or equivalent mapped evidence | Complete only the missing selected-track work |
| B10 project sequence | Brief → plan → implementation → testing/improvement → portfolio documentation → assessment | Complete stages in order; preserve prior evidence |

B8's common bridge is a readiness check, not a requirement to complete every B7 language track. Likewise, B9 and B10 prerequisites are specialization-specific.

## 3. Track dependency matrix

### 3.1 Common web pathway

| Target | Required prior knowledge | Dependency |
|---|---|---|
| B7-005 CSS foundation | B7-002 to B7-004 HTML structure/content | Required in the default web pathway |
| B7-008 JavaScript foundation | B7-002 to B7-007 HTML/CSS page foundation | Required in the default web pathway |
| B8-WEB-01 Semantic HTML | B7 HTML foundation | Required |
| B8-WEB-02 HTML Forms | B8-WEB-01 | Required |
| B8-CSS-01 Advanced Selectors | B7 CSS foundation | Required |
| B8-CSS-02 Layout and Positioning | B8-CSS-01 | Required |
| B8-CSS-03 Flexbox and Grid | B8-CSS-02 | Required |
| B8-CSS-04 Responsive Design and Effects | B8-CSS-03 | Required |
| B8-JS-01 Objects and Collections | B7 JavaScript foundations | Required |
| B8-JS-02 DOM and Events | B8-JS-01 plus B7 HTML page structure | Required |
| B8-JS-03 Forms and Browser APIs | B8-JS-02 and B8-WEB-02 when handling HTML forms | Conditional for form-specific work |
| B8-JS-04 JSON and Async | B8-JS-01 and B8-JS-02 | Required |
| B9-JS-01 JavaScript Classes | B8 JavaScript foundations | Required |
| B9-JS-02 JavaScript Modules | B9-JS-01 and B8-JS-04 | Required |
| B9-JS-03 Asynchronous JavaScript | B8-JS-04 | Required |
| B9-JS-04 Browser DOM and Web APIs | B8-JS-02; B9-JS-03 for async browser/API work | Conditional by selected topic |
| B10-FE-01 Professional Frontend Core | B8 HTML/CSS/JS core and B9 JavaScript modules/async/DOM relevant to project | Required for frontend path |
| B10-FE-02 Frontend Advanced Extensions | B10-FE-01; select only a W3Schools-listed extension | Conditional |

### 3.2 Programming-language pathways

| Target | Required prior knowledge | Dependency |
|---|---|---|
| B8-PY-01 Advanced Functions | B7-012 and B7-013 Python foundations | Required |
| B8-PY-02 Modules and Iterators | B8-PY-01 | Required |
| B8-PY-03 JSON, RegEx and Packages | B8-PY-02 | Required |
| B8-PY-04 Errors and Files | B8-PY-02 | Required |
| B8-PY-05 Object-Oriented Python | B8-PY-01 | Required |
| B9-PY-01 Python DSA | B8 Python foundations; B8-PY-01 recommended | Required core language readiness |
| B9-PY-02 Python Data Structures | B9-PY-01 | Required |
| B9-PY-03 Python Algorithms | B9-PY-02 | Required |
| B8-LANG-01 Java Intermediate | B7-014 and B7-015 Java | Conditional |
| B8-LANG-02 C/C++ Intermediate | B7-016/B7-017 or B7-018/B7-019, matching the chosen language | Conditional |
| B8-LANG-03 C#/PHP Intermediate | Matching B7 C# or PHP foundation and logic modules | Conditional |
| B10-BE-01 Primary Language Specialization | B9 completion in the same selected language; B8 matching language path where mapped | Required for backend path |
| B10-BE-02 Backend Framework Extension | B10-BE-01 and the selected framework's relevant W3Schools language/core path | Conditional |

Only one primary language is needed for a learner's chosen path. The language tracks are alternatives, not a sequence in which Python, Java, C, C++, C# and PHP must all be completed.

### 3.3 SQL and database pathways

| Target | Required prior knowledge | Dependency |
|---|---|---|
| B8-SQL-01 Multi-table Queries | B7-024 SQL foundations; basic SELECT and filtering | Required |
| B8-SQL-02 Grouped and Conditional Queries | B8-SQL-01 | Required |
| B8-SQL-03 Database Structure | B7-024 and B7-025 SQL foundations/data changes | Required |
| B8-SQL-04 Indexes and Views | B8-SQL-03 | Required |
| B8-SQL-05 Stored Procedures and Safe Queries | B8-SQL-02 and B8-SQL-03 | Required |
| B8-EXT-02 Database Extensions | B8-SQL-01; B8-SQL-03 recommended for database-structure work | Conditional |
| B9-SQL-01 Advanced SQL Composition | B8-SQL-01 and B8-SQL-02 | Required |
| B9-SQL-02 Database Objects and Procedures | B8-SQL-03, B8-SQL-04 and B8-SQL-05 | Required |
| B10-DATA-01 Professional SQL | B9 SQL modules | Required for database path |
| B10-DATA-02 Database Specialization | B10-DATA-01 and selected W3Schools database track | Conditional |

SQL is not a universal requirement for frontend-only learners. It becomes a required pathway foundation when the learner selects database-backed work.

### 3.4 DSA and advanced topics

| Target | Required prior knowledge | Dependency |
|---|---|---|
| B9-DSA-01 DSA Foundations | B8 programming foundations in one selected language | Required |
| B9-DSA-02 Linear Structures | B9-DSA-01 | Required |
| B9-DSA-03 Stacks and Queues | B9-DSA-02 | Required |
| B9-DSA-04 Hash Structures | B9-DSA-02 | Required |
| B9-DSA-05 Trees | B9-DSA-03 | Required in current map sequence |
| B9-DSA-06 Graphs | B9-DSA-05 | Required in current map sequence |
| B9-DSA-07 Sorting Algorithms | B9-DSA-01 | Required |
| B9-DSA-08 Searching Algorithms | B9-DSA-07 | Required in current map sequence |
| B9-DSA-09 Graph Algorithms | B9-DSA-06 | Required |
| B9-DSA-10 Time Complexity | B9-DSA-07 and B9-DSA-08 | Required |
| B9-EXT-01 Advanced Language/Framework Extensions | B8 relevant core track | Conditional |
| B9-EXT-02 Data and AI Extensions | B8 programming foundations; choose relevant data topics | Conditional |
| B9-EXT-03 Cloud and Security Extensions | B8 programming foundations; selected W3Schools tutorial path | Conditional |

The DSA map uses its existing sequence and topic groupings. It does not impose DSA on every professional specialization unless the selected route or project requires it.

### 3.5 Professional specializations and shared project sequence

| Target | Required prior knowledge | Dependency |
|---|---|---|
| B10-PRO-01 Professional Readiness | B9 completion in the selected specialization; selected track prerequisites satisfied | Required |
| B10-FE-01 Frontend Core | B8 web core and relevant B9 JavaScript modules | Conditional: frontend |
| B10-BE-01 Backend Language | B9 matching language path | Conditional: backend |
| B10-DATA-01 Professional SQL | B9 SQL path | Conditional: database |
| B10-AN-01 Data Analysis Foundations | B8 programming/data foundations and selected W3Schools data topics | Conditional: analytics |
| B10-AN-02 Python Data Stack | B10-AN-01 and Python foundations; add only selected W3Schools topics | Conditional |
| B10-AN-03 AI/ML Electives | B10-AN-01; selected W3Schools AI/ML path | Conditional |
| B10-OPS-01 Git Project Workflow | Basic project work; W3Schools Git tutorial | Recommended |
| B10-OPS-02 Cloud/Security Electives | B9 foundations and selected W3Schools track | Conditional |
| B10-PRO-02 Project Planning | B10-PRO-01 | Required |
| B10-PRO-03 Project Implementation | B10-PRO-02 | Required |
| B10-PRO-04 Project Testing and Improvement | B10-PRO-03 | Required |
| B10-PRO-05 Portfolio Documentation | B10-PRO-04 | Required |
| B10-PRO-06 Professional Assessment | B10-PRO-05 | Required |

## 4. Alternative and conditional paths

- **Default web route:** B7 orientation → HTML → CSS → JavaScript → relevant B8 web modules → relevant B9 JavaScript modules → B10 frontend path.
- **Single-language route:** B7 orientation → one selected language's beginner modules → matching B8 language path where mapped → B9 DSA or language-specific advanced modules → B10 backend/application path.
- **Database route:** B7 SQL → B8 SQL modules → B9 SQL modules → B10 database specialization. Add a programming-language path only when the chosen project needs it.
- **Data/analytics route:** B7 selected programming foundations → B8 programming/data foundations → selected B9 data/AI extension → B10 analytics path.
- **Framework route:** complete the relevant core web or language foundation first; then select one W3Schools-listed framework extension. Do not require every framework.
- **Git, cloud and cybersecurity:** supporting or elective tracks, not universal blockers for B8 or B9.

## 5. Prerequisite enforcement in the learning platform

For each module, store:
1. Module ID and track ID.
2. Prerequisite module IDs.
3. Dependency type: required, conditional or recommended.
4. Condition expression or selected-track key for conditional edges.
5. Mastery threshold reference for each prerequisite.
6. Remediation module ID(s).
7. Whether the dependency is a hard progression gate.

Progression logic:
- Required prerequisite not met → block entry and show the missing module(s).
- Conditional prerequisite → enforce only if the learner selected the matching path or feature.
- Recommended prerequisite not met → show a warning/recommendation; do not block.
- Prerequisite mastered → unlock the dependent module.
- A learner may use an approved diagnostic/placement assessment to demonstrate existing knowledge, but the assessment must measure the same mapped learning outcomes; it must not silently waive unrelated prerequisites.
- Preserve completed modules when a learner changes specialization; calculate only the new path's missing dependencies.

## 6. Dependency-map CSV conventions

The companion CSV is the normalized edge list. Each row represents one dependency edge, not a new lesson. `from_module_id` is the prerequisite and `to_module_id` is the dependent module. `dependency_type` is one of Required, Conditional or Recommended. Where an earlier map uses descriptive prerequisites instead of stable IDs, `from_module_id` is a named gate such as `GATE-B7-WEB-FOUNDATION` or `GATE-B8-SELECTED-LANGUAGE`; its definition is in this document. All source URLs are W3Schools URLs.

## 7. Gate definitions and limitations

- `GATE-B7-WEB-FOUNDATION`: B7-002 through B7-007, the HTML/CSS foundation.
- `GATE-B7-JAVASCRIPT-FOUNDATION`: B7-008 through B7-011.
- `GATE-B7-PYTHON-FOUNDATION`: B7-012 and B7-013.
- `GATE-B7-JAVA-FOUNDATION`: B7-014 and B7-015.
- `GATE-B7-C-FOUNDATION`: B7-016 and B7-017.
- `GATE-B7-CPP-FOUNDATION`: B7-018 and B7-019.
- `GATE-B7-CSHARP-FOUNDATION`: B7-020 and B7-021.
- `GATE-B7-PHP-FOUNDATION`: B7-022 and B7-023.
- `GATE-B7-SQL-FOUNDATION`: B7-024 and B7-025.
- `GATE-B8-SELECTED-LANGUAGE`: the completed B8 path for the learner's chosen implementation language.
- `GATE-B9-SELECTED-SPECIALIZATION`: required B9 modules for the selected B10 specialization.

Some B8/B9/B10 optional tracks are represented by catalogue-level links rather than exhaustive module IDs. Their prerequisite is therefore recorded as a conditional gate rather than fabricated chapter-level IDs. This work does not upgrade the completeness of B3/B4 inventories or the optional-track maps.

## 8. Completion criteria

B11 is complete when:
- B7–B10 progression gates are defined.
- Required, conditional and recommended dependencies are distinguished.
- Web, programming-language, SQL, DSA and professional specialization paths are connected.
- Remediation and track-specific unlocking rules are documented.
- The CSV edge list uses stable existing module IDs wherever available.
- No curriculum topic or source outside W3Schools has been introduced.

**B11 is complete at prerequisite-identification and dependency-map scope.** Next task: **B12 — Approve curriculum coverage**. B12 is the next planned curriculum task; it is not part of B11.
