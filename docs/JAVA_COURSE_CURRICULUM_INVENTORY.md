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
- Each lesson: five measurable objectives, two complete Java examples, guided and independent tasks, three hints and five topic-specific MCQs with explanations.
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
| JV1.1–JV1.6 | 6 | English draft authored; JDK CI validation pending |
| JV1.7–JV8.5 | 52 | Planned; not yet authored |

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
