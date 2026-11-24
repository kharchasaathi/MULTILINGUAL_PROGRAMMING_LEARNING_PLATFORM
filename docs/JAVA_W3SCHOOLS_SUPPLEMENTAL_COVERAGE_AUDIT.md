# Java Course — W3Schools Supplemental Coverage Audit

**Date:** 24 November 2026  
**Branch:** `feature/java-course-foundation`  
**PR:** #246  
**Current validated head:** `6e2fd2393c7fa23dd1ec9f0c1e3e4902c9dcbf91`

## Verified baseline

- 58 English lesson JSON files exist under `public/content/en/java/`.
- The current 8-chapter / 58-module structure matches the W3Schools Java Syllabus module list.
- Current-head Java Course Validation #77, Java Playground Validation #13, and Browser Review #1509 passed.
- The 58-module syllabus match must not be represented as full coverage of every current Java Tutorial navigation section and nested subtopic.

## Scope distinction

W3Schools publishes both a compact 8-chapter / 58-module syllabus and a broader Java Tutorial navigation tree. Keep the 58 syllabus topics unchanged. Add missing material as supplemental lessons or explicit subtopics, with separate CodeSaathi IDs, rather than renaming or reordering existing JV1–JV8 IDs.

## Supplemental coverage to audit against existing lesson bodies

### A. Expand within existing lessons where pedagogically appropriate

- Syntax/output: statements, print text, print numbers.
- Variables/data types: identifiers, constants (`final`), numeric/boolean/character types, non-primitive types, `var`.
- Operators: arithmetic, assignment, comparison, logical operators, precedence.
- Strings: concatenation, numbers and strings, special characters, StringBuilder.
- Conditions and loops: else-if, shorthand if, nested conditions, logical conditions, do/while, nested loops, for-each.
- Arrays: traversal, multidimensional arrays.
- Methods: return values.
- Classes/OOP: `this`, `super`, access/non-access modifiers, anonymous classes, enum constructors, API/package usage.
- Exceptions: multiple exceptions, try-with-resources, debugging and error diagnosis.
- Collections: List/Set/Map abstractions, collection algorithms and sorting.
- File handling: file APIs and safe resource closure.

These are coverage checks, not claims that the existing lesson bodies definitely omit every item. Each existing lesson must be inspected before assigning a gap.

### B. Supplemental standalone topics visible in the current W3Schools Java Tutorial

1. Java Errors and Debugging
2. Multiple Exceptions and try-with-resources (if not sufficiently taught in JV7/JV8)
3. Java Problem Solving
4. Building the Logic
5. Test Cases
6. Java Projects / guided projects
7. Java I/O Streams
8. FileInputStream and FileOutputStream
9. BufferedReader and BufferedWriter
10. Java Data Structures overview
11. Java Collections overview
12. List, Set and Map interfaces
13. TreeSet and LinkedHashSet
14. TreeMap and LinkedHashMap
15. Java Algorithms
16. Java Generics
17. Java Annotations
18. Java Optional

## Recommended supplemental module plan

Keep JV1–JV8 intact and add a new supplemental sequence after JV8:

- JV9 — Errors, Debugging and Robust Exception Handling
- JV10 — Problem Solving, Logic Building and Test Cases
- JV11 — Java Projects
- JV12 — Java I/O Streams
- JV13 — Advanced Collections and Data Structures
- JV14 — Generics, Annotations and Optional

The above is a proposed coverage expansion, not yet authored or registered. Before authoring, compare each item with the 58 lesson JSON bodies and current W3Schools pages to avoid duplicate lessons. Add topic IDs only after the gap-by-gap mapping is approved internally and validated against repository naming conventions.

## Release and runtime controls

- Keep all new lessons in English first; Telugu translation remains deferred.
- Preserve the existing lesson JSON schema and three-stage Understand / Explain / Practise structure.
- Keep lesson status as `draft` until editorial review and release approval.
- Compile and execute runnable examples with the pinned JDK 21 CI toolchain.
- Java examples must not be sent to the HTML/CSS/JavaScript playground.
- Java Playground is a separate external compiler integration; its provider request and privacy limitations must remain visible.
- Do not merge PR #246 or deploy without explicit release authorization.

## Sources

- W3Schools Java Syllabus: https://www.w3schools.com/java/java_syllabus.asp
- W3Schools Java Tutorial navigation: https://www.w3schools.com/java/
- W3Schools Java Course catalogue: https://campus.w3schools.com/collections/course-catalog/products/java-course
