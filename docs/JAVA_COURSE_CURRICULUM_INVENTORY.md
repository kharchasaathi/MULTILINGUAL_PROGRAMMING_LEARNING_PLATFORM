# CodeSaathi — Java Programming Course Curriculum Inventory

**Course ID:** `java`  
**Canonical language:** English (`en`)  
**Reference curriculum:** W3Schools Java Tutorial and Java Syllabus  
**Reference baseline checked:** 23 November 2026  
**Repository:** `kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM`  
**Working branch:** `feature/java-course-foundation`  
**Release base:** `release/v1-frontend` at `c9c63982782ef910571775d59911dc9b092074e7`

## Scope and authoring rules

- Keep Java as an independent course/tab; do not mix it with SQL, Python, C or C++.
- Preserve the repository lesson JSON contract and Understand, Explain, Practise stages.
- English first. Telugu translation is deferred until the English course is complete.
- W3Schools is the topic coverage and sequence reference only. Write original explanations, examples and assessments.
- Each lesson: five measurable objectives, five complete Java examples, guided and independent tasks, three hints and five topic-specific MCQs with explanations.
- Keep lesson JSON `status: "draft"` until editorial review and release approval.
- The existing browser playground does not execute Java. Java examples are validated with a JDK in CI; do not label them browser-playground runnable.
- Initial reproducible CI baseline: JDK 21.

## W3Schools syllabus mapping — 8 chapters, 58 modules

### JV1 — Getting started (6)
- JV1.1 — Java HOME
- JV1.2 — Java Introduction
- JV1.3 — Java Get Started
- JV1.4 — Java Syntax
- JV1.5 — Java Output
- JV1.6 — Java Comments

### JV2 — Variables and data types (7)
- JV2.1 — Java Variables
- JV2.2 — Java Data Types
- JV2.3 — Java Type Casting
- JV2.4 — Java Operators
- JV2.5 — Java Strings
- JV2.6 — Java Math
- JV2.7 — Java Booleans

### JV3 — Control flow (5)
- JV3.1 — Java If...Else
- JV3.2 — Java Switch
- JV3.3 — Java While Loop
- JV3.4 — Java For Loop
- JV3.5 — Java Break and Continue

### JV4 — Arrays and methods (6)
- JV4.1 — Java Arrays
- JV4.2 — Java Methods
- JV4.3 — Java Method Parameters
- JV4.4 — Java Method Overloading
- JV4.5 — Java Scope
- JV4.6 — Java Recursion

### JV5 — Object-oriented Java (14)
- JV5.1 — Java OOP
- JV5.2 — Java Classes/Objects
- JV5.3 — Java Class Attributes
- JV5.4 — Java Class Methods
- JV5.5 — Java Constructors
- JV5.6 — Java Modifiers
- JV5.7 — Java Encapsulation
- JV5.8 — Java Packages
- JV5.9 — Java Inheritance
- JV5.10 — Java Polymorphism
- JV5.11 — Java Inner Classes
- JV5.12 — Java Abstraction
- JV5.13 — Java Interface
- JV5.14 — Java Enums

### JV6 — Input, dates and collections (9)
- JV6.1 — Java User Input
- JV6.2 — Java Date
- JV6.3 — Java ArrayList
- JV6.4 — Java LinkedList
- JV6.5 — Java List Sorting
- JV6.6 — Java HashMap
- JV6.7 — Java HashSet
- JV6.8 — Java Iterator
- JV6.9 — Java Wrapper Classes

### JV7 — Exceptions, threads and lambdas (6)
- JV7.1 — Java Exceptions
- JV7.2 — Java Throw
- JV7.3 — Java Regular Expressions
- JV7.4 — Java Threads
- JV7.5 — Java Lambda
- JV7.6 — Java Advanced Sorting

### JV8 — File handling (5)
- JV8.1 — Java File Handling
- JV8.2 — Java Create Files
- JV8.3 — Java Write to Files
- JV8.4 — Java Read Files
- JV8.5 — Java Delete Files

## First batch status

| Topic IDs | Lessons | Status |
|---|---:|---|
| JV1.1–JV1.6 | 6 | English draft expanded to five examples each; JDK 21 validation PASS on run #22 |
| JV2.1–JV2.7 | 7 | English draft expanded to five examples each; JDK 21 validation PASS on run #13 (47 examples across 13 lessons) |
| JV3.1–JV3.5 | 5 | English draft authored with five examples each; JDK 21 validation PASS on run #22 |
| JV4.1–JV4.6 | 6 | English draft authored; JDK 21 validation pending |
| JV5.1–JV5.14 | 14 | English draft authored; JDK 21 validation pending |
| JV6.1–JV6.9 | 9 | English drafts authored; MCQ mismatch in JV6.1 corrected; current-head JDK 21 revalidation pending |
| JV7.1–JV7.6 | 6 | English drafts authored; one regex MCQ answer typo corrected; current-head JDK 21 revalidation pending |
| JV8.1–JV8.5 | 5 | Planned; not yet authored |

## Runtime and release plan

1. Add a Java-specific validator that parses each lesson, checks metadata/content/assessment contracts and compiles/runs every example with a JDK.
2. Add a Java Course Validation workflow for pull requests touching Java lessons, index, tracker or validator.
3. Audit the browser lesson renderer for Java language display. Keep Java examples non-runnable in the HTML/CSS/JS editor unless a real Java runtime is integrated.
4. Decide the learner Java playground architecture separately: secure Java execution requires an isolated runtime service; never execute arbitrary Java in the parent page.
5. Author JV2–JV8 in batches, updating index and tracker as each batch is created and validated.
6. Complete independent editorial review and W3Schools coverage audit before release approval.
7. Translate to Telugu only after English course completion.

## Official reference

- W3Schools Java Syllabus: https://www.w3schools.com/java/java_syllabus.asp
- W3Schools Java Tutorial: https://www.w3schools.com/java/

The official syllabus currently groups the course into 8 chapters and 58 modules. This inventory preserves that order while using CodeSaathi topic IDs.


## JV2 batch source mapping and implementation record

| CodeSaathi topic | W3Schools reference | Lesson file | Current state |
|---|---|---|---|
| JV2.1 — Java Variables | https://www.w3schools.com/java/java_variables.asp | `public/content/en/java/JV2.1.json` | English draft authored; CI pending |
| JV2.2 — Java Data Types | https://www.w3schools.com/java/java_data_types.asp | `public/content/en/java/JV2.2.json` | English draft authored; CI pending |
| JV2.3 — Java Type Casting | https://www.w3schools.com/java/java_type_casting.asp | `public/content/en/java/JV2.3.json` | English draft authored; CI pending |
| JV2.4 — Java Operators | https://www.w3schools.com/java/java_operators.asp | `public/content/en/java/JV2.4.json` | English draft authored; CI pending |
| JV2.5 — Java Strings | https://www.w3schools.com/java/java_strings.asp | `public/content/en/java/JV2.5.json` | English draft authored; CI pending |
| JV2.6 — Java Math | https://www.w3schools.com/java/java_math.asp | `public/content/en/java/JV2.6.json` | English draft authored; CI pending |
| JV2.7 — Java Booleans | https://www.w3schools.com/java/java_booleans.asp | `public/content/en/java/JV2.7.json` | English draft authored; CI pending |

Each lesson contains five learning objectives, at least two original JDK-compatible examples with expected output, the three-stage lesson structure, guided and independent practice, three hints and five original MCQs. JV2.1–JV2.7 have now been expanded to five examples each; JV1.1–JV1.6 still need the same expansion before the validator can enforce a five-example minimum globally. Java examples remain `playgroundMode: none`; they are intended for the JDK validation workflow, not the web-language playground. Telugu translation remains deferred.


## JV2 example expansion — 24 November 2026

- JV2.1–JV2.7 expanded from two to five original examples each (21 additional examples).
- Existing learning objectives, Understand/Explain/Practise content, MCQs, topic IDs, file paths, `status: draft`, and `playgroundMode: none` preserved.
- The validator now accepts lesson-specific example counts of at least two while legacy JV1 lessons are brought up to the five-example standard. This is a temporary compatibility gate; raise the global minimum to five after JV1 expansion.
- JDK 21 execution of the added examples is pending the next Java Course Validation workflow run.


### JV3 W3Schools source mapping

| CodeSaathi topic | W3Schools reference | Lesson file |
|---|---|---|
| JV3.1 — Java If...Else | https://www.w3schools.com/java/java_conditions.asp | `public/content/en/java/JV3.1.json` |
| JV3.2 — Java Switch | https://www.w3schools.com/java/java_switch.asp | `public/content/en/java/JV3.2.json` |
| JV3.3 — Java While Loop | https://www.w3schools.com/java/java_while_loop.asp | `public/content/en/java/JV3.3.json` |
| JV3.4 — Java For Loop | https://www.w3schools.com/java/java_for_loop.asp | `public/content/en/java/JV3.4.json` |
| JV3.5 — Java Break and Continue | https://www.w3schools.com/java/java_break.asp | `public/content/en/java/JV3.5.json` |


## JV1 quality expansion and JV3 authoring — 24 November 2026

- JV1.1–JV1.6 each expanded from two to five original examples (18 additional examples). Their JDK 21 execution on the updated head is pending.
- JV3.1–JV3.5 authored in English: If...Else, Switch, While Loop, For Loop, Break and Continue.
- Each JV3 lesson contains five objectives, five JDK-compatible examples with expected output, three-stage lesson content, guided and independent practice, hints, challenge and five topic-specific MCQs.
- JV3.2 covers both traditional switch statements and modern arrow-style switch expressions supported by JDK 21.
- Curriculum index and progress tracker now include JV3.1–JV3.5. Lessons remain `draft`; Telugu translation is deferred; Java examples remain `playgroundMode: none`.
- Java Course Validation run #22 PASS: 18 indexed English lessons, 90 examples compiled and executed with expected outputs, and 90 MCQs validated. Browser Review run #1454 PASS. The lessons remain DRAFT pending editorial and release approval.


## JV4 — Arrays and methods — 24 November 2026

| CodeSaathi topic | W3Schools reference | Lesson file | Current state |
|---|---|---|---|
| JV4.1 — Java Arrays | https://www.w3schools.com/java/java_arrays.asp | `public/content/en/java/JV4.1.json` | English draft authored; JDK 21 validation pending |
| JV4.2 — Java Methods | https://www.w3schools.com/java/java_methods.asp | `public/content/en/java/JV4.2.json` | English draft authored; JDK 21 validation pending |
| JV4.3 — Java Method Parameters | https://www.w3schools.com/java/java_method_parameters.asp | `public/content/en/java/JV4.3.json` | English draft authored; JDK 21 validation pending |
| JV4.4 — Java Method Overloading | https://www.w3schools.com/java/java_methods_overloading.asp | `public/content/en/java/JV4.4.json` | English draft authored; JDK 21 validation pending |
| JV4.5 — Java Scope | https://www.w3schools.com/java/java_scope.asp | `public/content/en/java/JV4.5.json` | English draft authored; JDK 21 validation pending |
| JV4.6 — Java Recursion | https://www.w3schools.com/java/java_recursion.asp | `public/content/en/java/JV4.6.json` | English draft authored; JDK 21 validation pending |

- Authored six original English lessons covering arrays, method declarations and calls, parameters/arguments, overloading, scope, and recursion.
- Each lesson contains five learning objectives, five complete standalone Java examples with expected output, the Understand/Explain/Practise structure, guided and independent tasks, three hints, a challenge and five topic-specific MCQs with explanations.
- All lessons remain `status: "draft"`; `practice.playgroundMode: "none"`; Telugu translation remains deferred.
- Curriculum index and progress tracker updated for JV4.1–JV4.6. JDK 21 execution and browser review are required before marking the batch validated.


## JV5 — Object-oriented Java — 24 November 2026

| CodeSaathi topic | W3Schools reference | Lesson file | Current state |
|---|---|---|---|
| JV5.1 — Java OOP | https://www.w3schools.com/java/java_oop.asp | `public/content/en/java/JV5.1.json` | English draft authored; JDK 21 validation pending |
| JV5.2 — Java Classes/Objects | https://www.w3schools.com/java/java_classes.asp | `public/content/en/java/JV5.2.json` | English draft authored; JDK 21 validation pending |
| JV5.3 — Java Class Attributes | https://www.w3schools.com/java/java_class_attributes.asp | `public/content/en/java/JV5.3.json` | English draft authored; JDK 21 validation pending |
| JV5.4 — Java Class Methods | https://www.w3schools.com/java/java_class_methods.asp | `public/content/en/java/JV5.4.json` | English draft authored; JDK 21 validation pending |
| JV5.5 — Java Constructors | https://www.w3schools.com/java/java_constructors.asp | `public/content/en/java/JV5.5.json` | English draft authored; JDK 21 validation pending |
| JV5.6 — Java Modifiers | https://www.w3schools.com/java/java_modifiers.asp | `public/content/en/java/JV5.6.json` | English draft authored; JDK 21 validation pending |
| JV5.7 — Java Encapsulation | https://www.w3schools.com/java/java_encapsulation.asp | `public/content/en/java/JV5.7.json` | English draft authored; JDK 21 validation pending |
| JV5.8 — Java Packages | https://www.w3schools.com/java/java_packages.asp | `public/content/en/java/JV5.8.json` | English draft authored; JDK 21 validation pending |
| JV5.9 — Java Inheritance | https://www.w3schools.com/java/java_inheritance.asp | `public/content/en/java/JV5.9.json` | English draft authored; JDK 21 validation pending |
| JV5.10 — Java Polymorphism | https://www.w3schools.com/java/java_polymorphism.asp | `public/content/en/java/JV5.10.json` | English draft authored; JDK 21 validation pending |
| JV5.11 — Java Inner Classes | https://www.w3schools.com/java/java_inner_classes.asp | `public/content/en/java/JV5.11.json` | English draft authored; JDK 21 validation pending |
| JV5.12 — Java Abstraction | https://www.w3schools.com/java/java_abstract.asp | `public/content/en/java/JV5.12.json` | English draft authored; JDK 21 validation pending |
| JV5.13 — Java Interface | https://www.w3schools.com/java/java_interface.asp | `public/content/en/java/JV5.13.json` | English draft authored; JDK 21 validation pending |
| JV5.14 — Java Enums | https://www.w3schools.com/java/java_enums.asp | `public/content/en/java/JV5.14.json` | English draft authored; JDK 21 validation pending |

- Authored fourteen original English lessons covering OOP foundations, classes/objects, fields, class methods, constructors, modifiers, encapsulation, packages, inheritance, polymorphism, inner classes, abstraction, interfaces and enums.
- Each lesson includes five measurable objectives, five standalone Java examples with expected output, Understand/Explain/Practise stages, guided and independent practice, three hints, a challenge and five topic-specific MCQs with explanations.
- All lessons remain `status: "draft"`; `practice.playgroundMode: "none"`; Telugu translation remains deferred.
- Curriculum index and progress tracker updated for JV5.1–JV5.14. JDK 21 validation and browser review are pending.

## JV6 — Input, dates and collections — 24 November 2026

| CodeSaathi topic | W3Schools reference | Lesson file | Current state |
|---|---|---|---|
| JV6.1 — Java User Input | https://www.w3schools.com/java/java_user_input.asp | `public/content/en/java/JV6.1.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.2 — Java Date | https://www.w3schools.com/java/java_date.asp | `public/content/en/java/JV6.2.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.3 — Java ArrayList | https://www.w3schools.com/java/java_arraylist.asp | `public/content/en/java/JV6.3.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.4 — Java LinkedList | https://www.w3schools.com/java/java_linkedlist.asp | `public/content/en/java/JV6.4.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.5 — Java List Sorting | https://www.w3schools.com/java/java_list_sort.asp | `public/content/en/java/JV6.5.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.6 — Java HashMap | https://www.w3schools.com/java/java_hashmap.asp | `public/content/en/java/JV6.6.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.7 — Java HashSet | https://www.w3schools.com/java/java_hashset.asp | `public/content/en/java/JV6.7.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.8 — Java Iterator | https://www.w3schools.com/java/java_iterator.asp | `public/content/en/java/JV6.8.json` | English draft authored; current-head JDK 21 validation pending |
| JV6.9 — Java Wrapper Classes | https://www.w3schools.com/java/java_wrapper_classes.asp | `public/content/en/java/JV6.9.json` | English draft authored; current-head JDK 21 validation pending |

- Authored nine original English lessons for console input, modern date APIs, ArrayList, LinkedList, list sorting, HashMap, HashSet, Iterator and wrapper classes.
- Each lesson contains five measurable objectives, five standalone Java examples with expected output, Understand/Explain/Practise stages, guided and independent practice, three hints, a challenge and five topic-specific MCQs with explanations.
- All lessons remain `status: "draft"`; `practice.playgroundMode: "none"`; Telugu translation remains deferred.
- Curriculum index and progress tracker include JV6.1–JV6.9. The first JDK 21 run caught a JV6.1 MCQ answer-option mismatch; the option set was corrected in commit `c49e41a`. Re-run JDK 21 execution and browser review on the latest indexed commit before marking the batch validated.

## JV7 — Exceptions, threads and lambdas — 24 November 2026

| CodeSaathi topic | W3Schools reference | Lesson file | Current state |
|---|---|---|---|
| JV7.1 — Java Exceptions | https://www.w3schools.com/java/java_try_catch.asp | `public/content/en/java/JV7.1.json` | English draft authored; current-head JDK 21 validation pending |
| JV7.2 — Java Throw | https://www.w3schools.com/java/java_throw.asp | `public/content/en/java/JV7.2.json` | English draft authored; current-head JDK 21 validation pending |
| JV7.3 — Java Regular Expressions | https://www.w3schools.com/java/java_regex.asp | `public/content/en/java/JV7.3.json` | English draft authored; current-head JDK 21 validation pending |
| JV7.4 — Java Threads | https://www.w3schools.com/java/java_threads.asp | `public/content/en/java/JV7.4.json` | English draft authored; current-head JDK 21 validation pending |
| JV7.5 — Java Lambda | https://www.w3schools.com/java/java_lambda.asp | `public/content/en/java/JV7.5.json` | English draft authored; current-head JDK 21 validation pending |
| JV7.6 — Java Advanced Sorting | https://www.w3schools.com/java/java_sort.asp | `public/content/en/java/JV7.6.json` | English draft authored; current-head JDK 21 validation pending |

- Authored six original English lessons covering exception handling, explicit throwing and declarations, regular expressions, threads, lambda expressions and advanced comparator sorting.
- Each lesson includes five measurable objectives, five standalone Java examples with expected output, Understand/Explain/Practise stages, guided and independent practice, three hints, a challenge and five topic-specific MCQs with explanations.
- All JV7 lessons remain `status: "draft"`; `practice.playgroundMode: "none"`; Telugu translation remains deferred.
- Curriculum index and progress tracker include JV7.1–JV7.6. A pre-validation contract audit found and corrected a trailing-space mismatch in JV7.3's plus-quantifier MCQ answer. Run JDK 21 and browser validation on the latest PR head before marking validated.

## JV8 — File handling — 24 November 2026

| CodeSaathi topic | W3Schools reference | Lesson file | Current state |
|---|---|---|---|
| JV8.1 — Java File Handling | https://www.w3schools.com/java/java_files.asp | `public/content/en/java/JV8.1.json` | English draft authored; current-head JDK 21 validation pending |
| JV8.2 — Java Create Files | https://www.w3schools.com/java/java_files.asp | `public/content/en/java/JV8.2.json` | English draft authored; current-head JDK 21 validation pending |
| JV8.3 — Java Write to Files | https://www.w3schools.com/java/java_files.asp | `public/content/en/java/JV8.3.json` | English draft authored; current-head JDK 21 validation pending |
| JV8.4 — Java Read Files | https://www.w3schools.com/java/java_files.asp | `public/content/en/java/JV8.4.json` | English draft authored; current-head JDK 21 validation pending |
| JV8.5 — Java Delete Files | https://www.w3schools.com/java/java_files.asp | `public/content/en/java/JV8.5.json` | English draft authored; current-head JDK 21 validation pending |

- Authored five original English lessons covering file-path metadata, file and directory creation, writing and appending text, reading whole files and lines, and safe deletion.
- Each lesson contains five measurable objectives, five standalone Java examples with expected output, Understand/Explain/Practise stages, guided and independent practice, three hints, a challenge and five topic-specific MCQs with explanations.
- All lessons remain `status: "draft"`; `practice.playgroundMode: "none"`; Telugu translation remains deferred.
- Curriculum index and progress tracker now include JV8.1–JV8.5. JDK 21 execution and browser review are required on the latest PR head before marking the English curriculum validated.


## Current reconciled status — 24 November 2026

This section supersedes earlier historical batch-status rows above where they say JV8 was planned or not authored.

- JV1.1–JV8.5: all 58 English lesson JSON files now exist.
- The 58 topics align to the W3Schools Java Syllabus module list.
- All 58 remain drafts pending editorial review and release approval.
- Current Java Course Validation #78, Java Playground Validation #14 and Browser Review #1510 passed on the previous audit-document head.
- A separate lesson-by-lesson supplemental coverage audit is maintained at `docs/JAVA_W3SCHOOLS_SUPPLEMENTAL_COVERAGE_AUDIT.md`.
- The broader W3Schools Java Tutorial contains supplemental areas beyond the 58-module syllabus. The audit identifies missing/partial areas and proposes JV9–JV14 (27 lessons) without changing JV1–JV8 IDs.
- Supplemental lessons have not yet been authored or registered. Existing lesson expansions are also pending for the subtopics explicitly marked partial/gap in the audit.
- The latest audit commit must pass all relevant current-head Actions before it can be called validated.


## Supplemental curriculum update — 24 November 2026

- Added and indexed 27 English draft lessons across JV9–JV14.
- Java curriculum index now contains 85 topics (58 original syllabus lessons + 27 supplemental entries).
- The progress tracker contains the 27 supplemental topics with English draft and Telugu-deferred status.
- All new lessons use the existing schema, three-stage structure, five objectives, five example records, five MCQs and `playgroundMode: "none"`.
- The 27 supplemental lessons now contain topic-specific JDK 21 examples, five focused MCQs with answer explanations, and applied guided/independent/challenge tasks.
- JV13.6 complexity/equality examples were strengthened; JV14.3 custom annotation examples were corrected to use legal member annotation declarations and explicit retention behavior.
- JDK 21 compilation/execution across all 85 indexed English lessons is still pending current-head CI; do not mark lessons validated until the Java workflow passes.
- The supplemental lessons are drafts, not published lessons. No Telugu translations have been created.
- Do not claim the expanded Java curriculum is editorially complete until the code examples, exercises and MCQs have passed independent review.


## Follow-up content-quality correction — 24 November 2026

- The 27 supplemental English draft lesson files JV9.1–JV14.4 are present and registered in `public/content/curriculum-index.json` (85 Java topics total).
- All 27 supplemental lessons now have topic-specific five-question MCQ banks; generic placeholder assessment questions were replaced.
- Each supplemental lesson retains five example records, the Understand / Explain / Practise stages, five learning objectives, and `practice.playgroundMode: "none"`.
- Example code and expected outputs still require current-head JDK 21 compile-and-execute validation. Automated Actions are pending; do not mark these lessons validated until they pass.
- The supplemental lessons remain English drafts. Telugu translation remains deferred, and release approval is still pending.
