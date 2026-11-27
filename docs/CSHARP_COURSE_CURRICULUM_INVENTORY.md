# CodeSaathi C# Course Curriculum Inventory

- Course ID: `csharp`
- Working branch: `feature/csharp-course-foundation`
- Release base: `release/v1-frontend`
- Authoring language: English first; Telugu deferred until English review and technical validation are complete.
- Status: IN_PROGRESS — twenty-seven English draft lesson files (CSH1.1–CSH1.6, CSH2.1–CSH2.6, CSH3.1–CSH3.8 and CSH4.1–CSH4.7) are registered in the working-branch curriculum index and progress tracker; CSH1–CSH3 have passed the latest C# validation and browser-review gates; CSH4 validation is pending.
- Planned scope: 20 chapters, 148 lesson topics.
- W3Schools primary coverage baseline: 36 syllabus navigation entries (including HOME) and 53 exercise categories, checked 2026-11-25.
- Technical reference: Microsoft Learn C# documentation and language specification.
- Runtime baseline decision: .NET 10 LTS / C# 14 for reproducible course validation. .NET 11 / C# 15 is current STS as of this audit and may be covered in a clearly separated compatibility/update module after CI SDK availability is verified. Do not silently mix preview or unsupported language features into the LTS baseline.

## Module roadmap

### CSH1 — Getting Started with C#
- CSH1.1 — C# Course Overview
- CSH1.2 — What Is C#?
- CSH1.3 — C# and the .NET Platform
- CSH1.4 — Install and Verify the .NET SDK
- CSH1.5 — Create and Run a Console Project
- CSH1.6 — C# Program Structure and Top-Level Statements

### CSH2 — Variables, Constants and Naming
- CSH2.1 — Variables and Assignment
- CSH2.2 — Constants and Readonly Values
- CSH2.3 — Display Variables and Interpolation
- CSH2.4 — Multiple Variable Declarations
- CSH2.5 — Identifiers and Naming Rules
- CSH2.6 — Scope and Lifetime of Local Variables

### CSH3 — C# Type System
- CSH3.1 — Built-in Value Types
- CSH3.2 — Reference Types
- CSH3.3 — Numeric Types and Ranges
- CSH3.4 — Boolean and Character Types
- CSH3.5 — Strings as Reference Types
- CSH3.6 — Implicit and Explicit Conversions
- CSH3.7 — Parse, TryParse and Convert
- CSH3.8 — Nullable Value Types and Nullability

### CSH4 — Operators and Mathematics
- CSH4.1 — Arithmetic Operators
- CSH4.2 — Assignment Operators
- CSH4.3 — Comparison Operators
- CSH4.4 — Logical Operators
- CSH4.5 — Bitwise and Shift Operators
- CSH4.6 — Conditional and Null Operators
- CSH4.7 — Math Class and Numeric Operations

### CSH5 — Strings and Text Processing
- CSH5.1 — String Fundamentals
- CSH5.2 — Concatenation and Interpolation
- CSH5.3 — Accessing Characters and Substrings
- CSH5.4 — Searching and Comparing Strings
- CSH5.5 — String Methods and Immutability
- CSH5.6 — Escape Sequences and Verbatim Strings
- CSH5.7 — StringBuilder and Efficient Text Construction

### CSH6 — Console Input and Output
- CSH6.1 — Console Output and Formatting
- CSH6.2 — Reading Console Input
- CSH6.3 — Parsing and Validating User Input
- CSH6.4 — Standard Input, Output and Error
- CSH6.5 — Culture-Aware Numeric Input and Output

### CSH7 — Conditional Logic
- CSH7.1 — Boolean Conditions and If
- CSH7.2 — If and Else Branches
- CSH7.3 — Else If Chains
- CSH7.4 — Conditional Operator
- CSH7.5 — Switch Statements and Expressions
- CSH7.6 — Pattern Matching in Conditions

### CSH8 — Loops and Iteration
- CSH8.1 — While Loops
- CSH8.2 — Do While Loops
- CSH8.3 — For Loops
- CSH8.4 — Foreach Loops
- CSH8.5 — Break and Continue
- CSH8.6 — Nested Loops
- CSH8.7 — Loop Invariants and Safe Iteration

### CSH9 — Arrays and Multidimensional Data
- CSH9.1 — Array Fundamentals
- CSH9.2 — Access and Update Array Elements
- CSH9.3 — Loop Through Arrays
- CSH9.4 — Search and Sort Arrays
- CSH9.5 — Multidimensional Arrays
- CSH9.6 — Jagged Arrays
- CSH9.7 — Array Copying, Ranges and Spans Overview

### CSH10 — Methods and Program Organization
- CSH10.1 — Defining and Calling Methods
- CSH10.2 — Parameters and Arguments
- CSH10.3 — Default and Named Arguments
- CSH10.4 — Return Values and Expression Bodies
- CSH10.5 — Method Overloading
- CSH10.6 — Value, ref, out and in Parameters
- CSH10.7 — Local Functions and Recursion
- CSH10.8 — Optional Parameters and API Design

### CSH11 — Object-Oriented Foundations
- CSH11.1 — OOP Principles in C#
- CSH11.2 — Classes and Objects
- CSH11.3 — Fields and Class Members
- CSH11.4 — Constructors and Object Initialization
- CSH11.5 — Static Members and Static Classes
- CSH11.6 — Access Modifiers and Encapsulation
- CSH11.7 — Properties and Init Accessors
- CSH11.8 — this, Object Initializers and Nested Types

### CSH12 — Inheritance and Polymorphism
- CSH12.1 — Inheritance Fundamentals
- CSH12.2 — Base and Derived Constructors
- CSH12.3 — Virtual, Override and New
- CSH12.4 — Abstract Classes and Members
- CSH12.5 — Interfaces and Contracts
- CSH12.6 — Implementing Multiple Interfaces
- CSH12.7 — Polymorphism and Runtime Dispatch
- CSH12.8 — Composition versus Inheritance

### CSH13 — Enums, Structs, Records and Value Design
- CSH13.1 — Enumerations
- CSH13.2 — Structs and Value Semantics
- CSH13.3 — Record Classes and Record Structs
- CSH13.4 — Tuples and Deconstruction
- CSH13.5 — Nullable Reference Types
- CSH13.6 — Pattern Matching and Switch Expressions
- CSH13.7 — Immutability and Equality
- CSH13.8 — C# 14 Language Features and Compatibility

### CSH14 — Collections and Generics
- CSH14.1 — Generic Type Fundamentals
- CSH14.2 — List and Collection Operations
- CSH14.3 — Dictionary and Keyed Lookup
- CSH14.4 — HashSet and Set Operations
- CSH14.5 — Queue and Stack
- CSH14.6 — IEnumerable and Iteration Contracts
- CSH14.7 — Generic Methods and Constraints
- CSH14.8 — Collection Expressions and ReadOnly Collections

### CSH15 — Exceptions, Debugging and Diagnostics
- CSH15.1 — Exception Fundamentals
- CSH15.2 — Try, Catch and Finally
- CSH15.3 — Multiple Catch Blocks and Filters
- CSH15.4 — Throwing and Custom Exceptions
- CSH15.5 — Exception Design and Safe Recovery
- CSH15.6 — Debugging with Visual Studio and dotnet CLI
- CSH15.7 — Logging, Diagnostics and Assertions

### CSH16 — Files, Streams and Serialization
- CSH16.1 — File and Directory Basics
- CSH16.2 — Create, Write, Append and Read Text Files
- CSH16.3 — File Paths and Cross-Platform Safety
- CSH16.4 — Streams and Resource Disposal
- CSH16.5 — Binary Files and Memory Streams
- CSH16.6 — JSON Serialization and Deserialization
- CSH16.7 — Asynchronous File I/O
- CSH16.8 — File-System Error Handling and Security

### CSH17 — Delegates, Events and Functional C#
- CSH17.1 — Delegates and Method References
- CSH17.2 — Built-in Action and Func Delegates
- CSH17.3 — Lambda Expressions
- CSH17.4 — Events and Event Publishers
- CSH17.5 — Event Subscription and Unsubscription
- CSH17.6 — Anonymous Methods and Closures
- CSH17.7 — Extension Methods and C# 14 Extension Members
- CSH17.8 — Expression Trees Fundamentals

### CSH18 — Language Integrated Query (LINQ)
- CSH18.1 — LINQ Fundamentals and Query Sources
- CSH18.2 — Filtering and Projection
- CSH18.3 — Ordering and Grouping
- CSH18.4 — Aggregation and Quantifiers
- CSH18.5 — Joins and Group Joins
- CSH18.6 — Query Syntax and Method Syntax
- CSH18.7 — Deferred and Immediate Execution
- CSH18.8 — LINQ Performance and IQueryable Boundaries

### CSH19 — Asynchronous and Concurrent Programming
- CSH19.1 — Tasks and Threading Fundamentals
- CSH19.2 — async and await
- CSH19.3 — Task, Task<T> and Return Values
- CSH19.4 — Cancellation Tokens and Timeouts
- CSH19.5 — Concurrent Collections and Synchronization
- CSH19.6 — Race Conditions and Thread Safety
- CSH19.7 — Parallel Programming and PLINQ
- CSH19.8 — Async Streams and IAsyncEnumerable

### CSH20 — Professional .NET Application Engineering
- CSH20.1 — Solution and Project Structure
- CSH20.2 — NuGet Packages and Dependency Management
- CSH20.3 — Configuration and Environment Settings
- CSH20.4 — Dependency Injection Fundamentals
- CSH20.5 — Unit Testing and Testable Design
- CSH20.6 — HTTP Clients and API Integration
- CSH20.7 — Database Access and Parameterized Queries
- CSH20.8 — Secure Coding, Secrets and Input Validation
- CSH20.9 — Performance, Allocation and Benchmarking
- CSH20.10 — Capstone: Build, Test and Package a .NET Application

## Authoring contract

Each English lesson must preserve the CodeSaathi lesson schema and include:
- five or more measurable learning objectives;
- Understand, Explain and Practise stages;
- detailed concept and technical explanations, real-world analogy and limitations;
- at least five original, complete C# examples with expected output and per-example explanation;
- guided and independent practice, progressive tasks, hints and validation criteria;
- at least five topic-specific MCQs with unique IDs and answer explanations;
- version/TFM notes where syntax or runtime APIs differ;
- `practice.playgroundMode: "none"` until a dedicated safe C# execution service is implemented and security-reviewed.

Lesson status remains `draft` until all required gates are evidenced. Authored, structurally valid, compiled, executed, browser-reviewed and deployed are separate states.

## Validation policy

- Pin .NET SDK/runtime to .NET 10 LTS and its default C# 14 language version for the initial course baseline.
- Compile and execute every runnable example using the .NET SDK in isolated temporary projects/directories.
- Compare deterministic expected output; mark nondeterministic/concurrency examples as invariant- or state-assertion tests rather than fixed-output comparisons.
- Validate JSON schema, IDs, duplicate IDs, objective/example/question minimums, answer-option membership, index paths and tracker consistency.
- Keep examples self-contained and avoid network, file-system, process, environment-secret or unbounded resource access unless the lesson is specifically about that API and its sandbox policy explicitly permits it.
- No production deployment or merge without explicit user authorization.

## Current working-branch integration findings (2026-11-26)

- `csharp` is registered in `public/content/curriculum-index.json`.
- Twelve English draft lesson files are authored: CSH1.1–CSH1.6 and CSH2.1–CSH2.6.
- Twelve C# rows are registered in the progress tracker and curriculum index.
- C# Validation #22 on commit `54decc5` passed CSH1.1–CSH1.6 (30 examples executed and 30 MCQs checked) using .NET SDK `10.0.404` / C# 14. CSH2.1–CSH2.6 still require their own validation run.
- Browser Review #1628 failed 4 accessibility tests due to the shared brand link's `aria-label` not matching its visible accessible text; 12 tests passed. The brand label was removed from the four affected HTML pages, and a dedicated regression test was added. Latest rerun is pending.
- The C# lesson renderer replaces the generic practice link with a .NET 10 local-project instruction and preserves `playgroundMode: none`; browser contract assertions cover this.
- PR #266 remains Draft/Open; no merge or production deployment is authorized.
- Existing C, C++, Java, Python and SQL content remains outside the C# authoring scope.


## CI troubleshooting and current verification — 2026-11-26

- C# Validation #38 on an intermediate CSH2 commit failed after all six CSH1 lessons passed. The first CSH2 example did not import `System`; the isolated validator intentionally disables implicit usings, so `Console` was unresolved.
- Corrected the CSH2.1–CSH2.6 example snippets by adding explicit `using System;` imports wherever required. The C# lesson validator was not weakened and implicit usings remain disabled, preserving a strict self-contained-example check.
- Added a browser-review test that opens all six CSH2 lessons through the C# curriculum and checks lesson rendering, objectives, examples, MCQs and the absence of a browser playground.
- Latest branch head at this audit: `8b94ed7bceefe84bf010e535c3cbaa544837a26a`.
- C# Validation #51 and Browser Review #1642 are queued for that exact head; no PASS is claimed until their completed results and logs are inspected.
- PR #266 remains Draft/Open. No merge or production deployment has been performed or authorized.


## CSH3 authoring batch — 2026-11-27

- Authored CSH3.1–CSH3.8 in English and registered all eight lessons in the curriculum index and progress tracker.
- Topics: Built-in Value Types; Reference Types; Numeric Types and Ranges; Boolean and Character Types; Strings as Reference Types; Implicit and Explicit Conversions; Parse, TryParse and Convert; Nullable Value Types and Nullability.
- Each lesson contains five learning objectives, five original runnable examples with expected output and explanations, guided and independent practice, hints, a challenge, validation criteria, and five topic-specific MCQs.
- Every C# example includes explicit imports where required; nullable analysis remains enabled; all examples use .NET 10 / C# 14 and `playgroundMode: none`.
- W3Schools C# Data Types and Type Casting matrix entries now map to the new CSH3 lesson files. Exercise-level coverage remains subject to detailed audit.
- Latest C# Validation #53 and Browser Review #1644 passed on the pre-CSH3 head `2ed36a3`: 12 lessons, 60 examples executed, 60 MCQs checked; 18 browser tests passed. The new CSH3 content requires a fresh validation run on the new head.
- PR #266 remains Draft/Open. No merge or production deployment has been performed.


## CSH3 integration and latest CI record — 2026-11-27

- Current authored scope is twenty English draft lessons: CSH1.1–CSH1.6, CSH2.1–CSH2.6 and CSH3.1–CSH3.8.
- C# Validation #53 passed on pre-CSH3 head `2ed36a3237e3e5d67c69e49f8e`: all 12 CSH1/CSH2 lessons, 60 examples executed, 60 MCQs checked.
- Browser Review #1644 passed on that pre-CSH3 head: 18 browser tests passed, including all six CSH2 lessons.
- Browser fixes included checking every visible brand link rather than a strict ambiguous locator, and aligning SQL Practice's accessible name with its visible text.
- CSH3.1–CSH3.8 are now registered in the curriculum index and progress tracker; W3Schools Data Types and Type Casting entries map to the relevant new lessons.
- Browser regression coverage has been expanded to all fourteen CSH2/CSH3 lessons. Latest-head validation is pending and must be inspected before marking the CSH3 batch validated.
- PR #266 remains Draft/Open; no merge or production deployment has been performed.


## CSH4 authoring batch — 2026-11-27

- Authored CSH4.1–CSH4.7 in English and registered all seven lessons in the curriculum index and progress tracker.
- Topics: Arithmetic Operators; Assignment Operators; Comparison Operators; Logical Operators; Bitwise and Shift Operators; Conditional and Null Operators; Math Class and Numeric Operations.
- Each lesson contains five measurable objectives, five original runnable examples with expected output and explanations, guided and independent practice, hints, a challenge, validation criteria, and five topic-specific MCQs.
- Examples target .NET 10 / C# 14 and preserve `practice.playgroundMode: \"none\"`.
- W3Schools C# Operators and C# Math entries map to the new CSH4 lessons; full lesson validation and browser review are pending.
- Latest confirmed C# Validation #79 and Browser Review #1657 passed on commit `3f022d17a2132cbe706d163576152392c3062350` for the prior 20-lesson head. CSH4 content is newer and must not be marked validated until new CI runs pass.
- PR #266 remains Draft/Open; no merge or production deployment has been performed or authorized.
