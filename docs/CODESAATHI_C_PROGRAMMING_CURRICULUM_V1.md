# CodeSaathi C Programming Curriculum — Complete Coverage Roadmap

**Course ID:** `c`  
**Branch:** `release/v1-frontend`  
**Roadmap status:** MAPPED — English lesson authoring, validation and release are separate pending work  
**Coverage baseline:** W3Schools C Tutorial navigation, syllabus, examples, exercises, challenges, projects and reference families, checked on 16 November 2026  
**Official coverage sources:**  
- https://www.w3schools.com/C/  
- https://www.w3schools.com/c/c_syllabus.php  

## 1. Scope and source policy

This is the complete course roadmap and coverage map, not a statement that every topic already has a published lesson. The W3Schools C Tutorial is used as a topic-coverage reference. CodeSaathi must independently author its explanations, examples, diagrams, exercises, quizzes and projects; do not copy W3Schools lesson text, examples wholesale, or proprietary assets.

The course is designed to take a learner from first contact with C through practical program development, debugging, data structures, standard-library literacy and professional engineering habits. Where CodeSaathi adds depth beyond the visible W3Schools outline, that material is marked as a CodeSaathi extension.

## 2. Learning path and modules

### CL1 — C language foundations
- [ ] CL1.1 · Introduction to the C programming language: purpose, history, use cases and strengths/limitations
- [ ] CL1.2 · Set up a C compiler and development environment: compiler, editor, terminal and toolchain
- [ ] CL1.3 · C program structure and syntax: headers, declarations, `main`, braces and statements
- [ ] CL1.4 · Statements, blocks and expressions: evaluation and statement termination
- [ ] CL1.5 · Output with `printf` and formatted text: conversion specifications and newlines
- [ ] CL1.6 · Comments and readable source code: comment forms and documentation habits
- [ ] CL1.7 · Compile, link and run: source, preprocessing, object files, linking and executable
- [ ] CL1.8 · Hosted and freestanding implementations; target environment and portability (CodeSaathi extension)

### CL2 — Variables, types and values
- [ ] CL2.1 · Variables, declarations and initialization
- [ ] CL2.2 · Identifiers, naming, keywords and scope basics
- [ ] CL2.3 · Format specifiers and formatted input/output with `printf` and `scanf`
- [ ] CL2.4 · Fundamental data types and object sizes
- [ ] CL2.5 · Characters, character constants and character encoding basics
- [ ] CL2.6 · Integer types, ranges, signedness and integer promotions
- [ ] CL2.7 · Floating-point values, precision, rounding and representation
- [ ] CL2.8 · Type conversion, casts and usual arithmetic conversions
- [ ] CL2.9 · Constants, literals and `const`-qualified objects
- [ ] CL2.10 · Boolean conditions: `stdbool.h`, truth values and scalar conditions
- [ ] CL2.11 · Extended integer types and fixed-width integer families
- [ ] CL2.12 · Choosing types for correctness, range and portability (CodeSaathi extension)

### CL3 — Operators and control flow
- [ ] CL3.1 · Arithmetic operators, integer division and remainder
- [ ] CL3.2 · Assignment and compound assignment
- [ ] CL3.3 · Comparison and logical operators; short-circuit evaluation
- [ ] CL3.4 · Operator precedence, associativity and expression grouping
- [ ] CL3.5 · `if`, `else` and `else if` decisions
- [ ] CL3.6 · Nested conditions, logical conditions and conditional operator
- [ ] CL3.7 · `switch`, `case`, `default` and fall-through
- [ ] CL3.8 · `while` and `do-while` loops
- [ ] CL3.9 · `for` loops, nested loops and loop design
- [ ] CL3.10 · `break` and `continue`
- [ ] CL3.11 · Common control-flow errors, unreachable code and termination reasoning (CodeSaathi extension)

### CL4 — Arrays, strings and character data
- [ ] CL4.1 · One-dimensional arrays and initialization
- [ ] CL4.2 · Array size, indexing, traversal and bounds
- [ ] CL4.3 · Array processing patterns: aggregate, search, count and transform
- [ ] CL4.4 · Multidimensional arrays and row/column traversal
- [ ] CL4.5 · C strings, character arrays and the null terminator
- [ ] CL4.6 · String literals, escape sequences and special characters
- [ ] CL4.7 · Standard string functions from `string.h`
- [ ] CL4.8 · Character classification/conversion and `ctype.h`
- [ ] CL4.9 · Arrays of strings and arrays of character pointers
- [ ] CL4.10 · Safe string input, capacity, truncation and termination
- [ ] CL4.11 · String and array boundary errors; avoiding buffer overflows (CodeSaathi extension)

### CL5 — User input, addresses and pointers
- [ ] CL5.1 · Reading user input and validating conversion results
- [ ] CL5.2 · Memory addresses and the address-of operator
- [ ] CL5.3 · Pointer declarations, initialization and dereferencing
- [ ] CL5.4 · Pointers and arrays; array-to-pointer conversion
- [ ] CL5.5 · Pointer arithmetic and valid traversal boundaries
- [ ] CL5.6 · Pointer to pointer and indirection levels
- [ ] CL5.7 · Null pointers, null pointer constants and safe checks
- [ ] CL5.8 · Pointer parameters and pass-by-address patterns
- [ ] CL5.9 · Pointer lifetime, dangling pointers and object validity (CodeSaathi extension)
- [ ] CL5.10 · `const` with pointers: pointer-to-const and const-pointer (CodeSaathi extension)

### CL6 — Functions and program organization
- [ ] CL6.1 · Defining, calling and returning from functions
- [ ] CL6.2 · Parameters, arguments, return types and `void`
- [ ] CL6.3 · Pass-by-value and pointer-based updates (C's pass-by-value model)
- [ ] CL6.4 · Scope, lifetime, storage duration and linkage
- [ ] CL6.5 · Function declarations, prototypes and header declarations
- [ ] CL6.6 · Recursion, base cases and recursive progress
- [ ] CL6.7 · Math library functions and `math.h`
- [ ] CL6.8 · Inline functions and compiler considerations
- [ ] CL6.9 · Function pointers, callbacks and callback parameters
- [ ] CL6.10 · Decomposition, reusable functions and interface contracts (CodeSaathi extension)
- [ ] CL6.11 · Variadic functions and `stdarg.h` (CodeSaathi extension)

### CL7 — Files, structures, unions and enumerations
- [ ] CL7.1 · Creating and opening files; file modes and `fopen`
- [ ] CL7.2 · Writing text and formatted data to files
- [ ] CL7.3 · Reading files, EOF and stream error indicators
- [ ] CL7.4 · Structures, members and member access
- [ ] CL7.5 · Nested structures and arrays of structures
- [ ] CL7.6 · Structures and pointers; `->` member access
- [ ] CL7.7 · Unions and shared storage
- [ ] CL7.8 · `typedef` and readable type names
- [ ] CL7.9 · Structure padding, alignment and object representation
- [ ] CL7.10 · Enumerations, enum constants and underlying integer considerations
- [ ] CL7.11 · Struct assignment, comparison limitations and serialization cautions (CodeSaathi extension)
- [ ] CL7.12 · File errors, safe closing, buffering and portable text/binary modes (CodeSaathi extension)

### CL8 — Dynamic memory and error handling
- [ ] CL8.1 · Memory regions, allocation concepts and object lifetime
- [ ] CL8.2 · `malloc` and allocated storage
- [ ] CL8.3 · Accessing allocated memory safely and checking allocation results
- [ ] CL8.4 · `realloc`, resizing and preserving the original allocation on failure
- [ ] CL8.5 · `free`, ownership and release discipline
- [ ] CL8.6 · Dynamic arrays, structures and nested allocations
- [x] CL8.7 · Common memory mistakes: leaks, double-free, use-after-free and invalid free
- [x] CL8.8 · Compiler errors, warnings, link errors and runtime failures
- [x] CL8.9 · Debugging with breakpoints, watch expressions and diagnostics
- [x] CL8.10 · `NULL`, error handling and input validation
- [x] CL8.11 · Allocation-size overflow and defensive allocation patterns (CodeSaathi extension)
- [x] CL8.12 · Sanitizers, static analysis and memory-checking workflow (CodeSaathi extension)

### CL9 — C standard library, preprocessor and additional tools
- [ ] CL9.1 · Date and time functions from `time.h`
- [ ] CL9.2 · Pseudo-random numbers, seeding and limitations of `rand`
- [ ] CL9.3 · Macros, object-like/function-like macros and conditional compilation
- [ ] CL9.4 · Header files, declarations, include guards and organizing source files
- [ ] CL9.5 · Storage classes and storage-duration concepts
- [ ] CL9.6 · Bitwise operators, masks, shifts and bit manipulation
- [x] CL9.7 · Fixed-width integer types and format macros from `stdint.h`/`inttypes.h`
- [x] CL9.8 · Command-line arguments: `argc` and `argv`
- [x] CL9.9 · Environment access and process termination utilities (CodeSaathi extension)
- [x] CL9.10 · Build commands, compiler flags, warnings and language-standard selection (CodeSaathi extension)

### CL10 — Problem solving and data structures & algorithms
- [ ] CL10.1 · A systematic C problem-solving workflow
- [ ] CL10.2 · Building program logic and decomposing problems
- [ ] CL10.3 · Edge cases, invalid input and error paths
- [ ] CL10.4 · Designing, executing and interpreting test cases
- [ ] CL10.5 · Data structures and algorithm analysis introduction
- [ ] CL10.6 · Searching: linear search and binary search; preconditions
- [ ] CL10.7 · Sorting fundamentals and common sorting algorithms
- [ ] CL10.8 · Stacks: representation, push, pop, peek and overflow/underflow
- [ ] CL10.9 · Queues: enqueue, dequeue, front/rear and circular queues
- [ ] CL10.10 · Linked lists: nodes, traversal, insertion and deletion
- [ ] CL10.11 · Trees: terminology, representations and traversals
- [ ] CL10.12 · Hash tables: hashing, collisions and collision handling
- [ ] CL10.13 · Big O: time complexity, space complexity and growth rates
- [ ] CL10.14 · Choosing data structures based on operation requirements (CodeSaathi extension)
- [ ] CL10.15 · Testing data structures: invariants, boundary cases and randomized tests (CodeSaathi extension)

### CL11 — Practical projects and consolidation
- [ ] CL11.1 · C console calculator: input, validation, functions and switch
- [ ] CL11.2 · Student records: structures, arrays and file persistence
- [ ] CL11.3 · Dynamic inventory manager: allocation, search and update
- [ ] CL11.4 · Search and sort a dataset: algorithm comparison and test data
- [ ] CL11.5 · Final command-line data management project: modular source and robust errors
- [ ] CL11.6 · Project requirements, design, implementation, test plan and README (CodeSaathi extension)
- [ ] CL11.7 · Project review: portability, memory safety, maintainability and limitations (CodeSaathi extension)

### CL12 — C language and standard-library reference
- [ ] CL12.1 · C keywords, reserved identifiers and language tokens
- [ ] CL12.2 · `stdio.h`: streams, formatted I/O, character I/O and file operations
- [ ] CL12.3 · `stdlib.h`: conversion, allocation, sorting/searching and process utilities
- [ ] CL12.4 · `string.h`: string and memory functions
- [ ] CL12.5 · `math.h`: mathematical functions, domains and error considerations
- [ ] CL12.6 · `ctype.h`: character classification and conversion; unsigned-char precondition
- [ ] CL12.7 · `time.h`: calendar time, broken-down time and formatting
- [ ] CL12.8 · Reading function prototypes, parameters, return types and constraints
- [ ] CL12.9 · Standard headers and their responsibility boundaries (CodeSaathi extension)
- [ ] CL12.10 · Reference lookup practice: identify required header, signature and valid inputs

### CL13 — Exercises, quizzes, code challenges and study checkpoints
- [ ] CL13.1 · Topic-level knowledge checks and concept questions
- [ ] CL13.2 · Chapter exercises with progressive difficulty
- [ ] CL13.3 · Code challenges with input/output contracts
- [ ] CL13.4 · Practice problems combining multiple C concepts
- [ ] CL13.5 · C quiz: cumulative conceptual and code-reading assessment
- [ ] CL13.6 · Worked examples and real-life examples for each major topic
- [ ] CL13.7 · Study plan, milestones and revision checkpoints
- [ ] CL13.8 · Interview Q&A: explain code, diagnose bugs and justify design choices
- [ ] CL13.9 · Assessment answer explanations, hints and misconception feedback (CodeSaathi extension)

### CL14 — Professional C engineering foundations (CodeSaathi extension)
- [ ] CL14.1 · C language standards: historical versions and selecting a target standard
- [ ] CL14.2 · Defined, implementation-defined, unspecified and undefined behaviour
- [ ] CL14.3 · Integer overflow, signedness pitfalls and safe arithmetic
- [ ] CL14.4 · Effective type, aliasing basics and object representation
- [ ] CL14.5 · Translation units, declarations, definitions and external linkage
- [ ] CL14.6 · Preprocessor phase, macro hazards and include dependency management
- [ ] CL14.7 · Compiler warnings as an engineering feedback system
- [ ] CL14.8 · Portability across compilers, operating systems and architectures
- [ ] CL14.9 · Secure C basics: bounds, input trust, format strings and resource handling
- [ ] CL14.10 · Code review, version control, reproducible builds and release checks

## 3. W3Schools coverage crosswalk

The following maps the visible W3Schools C tutorial navigation and learning resources to CodeSaathi modules. The source is a coverage reference only; CodeSaathi lessons must be original.

| W3Schools learning area | CodeSaathi coverage |
|---|---|
| Intro, Get Started, Syntax, Statements, Output, Comments | CL1 |
| Variables, Format Specifiers, Data Types, Characters, Numbers, Decimal Precision, Memory Size, Extended Types, Type Conversion, Constants, Booleans | CL2 |
| Operators, Arithmetic, Assignment, Comparison, Logical, Precedence, If/Else, Short Hand If, Nested If, Switch, While, Do/While, For, Nested Loops, Break/Continue | CL3 |
| Arrays, Array Size, Array Loops, Multidimensional Arrays, Strings, Null Character, Special Characters, String Functions, Character Functions, Arrays of Strings | CL4 |
| User Input, Memory Address, Pointers, Pointers & Arrays, Pointer Arithmetic, Pointer to Pointer | CL5 |
| Functions, Function Parameters, Pass By Reference, Scope, Function Declaration, Math Functions, Inline Functions, Recursion, Function Pointers, Callback Functions | CL6 |
| Create Files, Write To Files, Read Files | CL7 |
| Structures, Structs Challenge, Nested Structures, Arrays of Structs, Structs & Pointers, Unions, typedef, Struct Padding, Enums | CL7 |
| Memory Management, Allocate Memory, Access Memory, Reallocate Memory, Deallocate Memory, Structs and Memory, Memory Example, Memory Mistakes | CL8 |
| Errors, Error Challenge, Debugging, NULL, Error Handling, Input Validation | CL8 |
| Problem Solving, Build the Logic, Edge Cases & Errors, Test Cases | CL10 |
| Date, Random Numbers, Macros, Organize Code, Storage Classes, Bitwise Operators, Fixed-width Integers, Command-Line Args | CL9 |
| DSA Intro, Searching, Sorting, Stacks, Queues, Linked Lists, Insert and Delete, Trees, Hash Tables, Big O | CL10 |
| Projects | CL11 |
| Keywords and stdio, stdlib, string, math, ctype, time references | CL12 |
| Examples, Real-Life Examples, Exercises, Quiz, Code Challenges, Practice Problems, Compiler, Syllabus, Study Plan, Interview Q&A | CL1–CL14, with explicit learner checks in CL13 |

## 4. Required lesson content contract

Every authored lesson must include, at minimum:
1. Measurable learning objectives and prerequisite knowledge.
2. A clear conceptual explanation that moves from beginner understanding to accurate technical detail.
3. Correct terminology, syntax rules and relevant standard-library/API details.
4. Independently authored worked examples with expected output or behaviour.
5. Step-by-step trace or memory/data-flow explanation where useful.
6. Guided practice, independent practice and progressively harder challenges.
7. Hints that guide reasoning without giving away every answer.
8. Assessment questions with correct answers and explanatory feedback.
9. Edge cases, common misconceptions, compiler diagnostics and safety/portability notes.
10. An explicit execution-environment statement: whether the example is runnable in the CodeSaathi C compiler and any limitations.

## 5. C compiler and execution environment

CodeSaathi has a dedicated C Compiler page at `/c-compiler.html`, linked from the main navigation and C course. It currently embeds the open-source cpp-forge browser compiler, based on Clang/LLVM/LLD compiled to WebAssembly/WASI. Compilation and program execution are intended to happen in the browser; this is not a CodeSaathi-hosted native compiler service.

The first use may download approximately 23 MB of compiler assets, which the browser may cache. The existing HTML/CSS/JavaScript playground remains separate and must never execute C source. C lessons must keep `playgroundMode: "none"` for that web playground; the dedicated C compiler is a separate tool.

The browser WASI runtime is not a native operating system. Do not promise unrestricted host filesystem, network or operating-system access. The compiler interface is currently hosted by the upstream project, not self-hosted by CodeSaathi.

**Compiler release gates — not yet verified as complete:**
- [ ] Deploy to Firebase Hosting and verify iframe embedding on the actual production origin.
- [ ] Verify Android/mobile layout and small-screen editor usability.
- [ ] Verify standard input, output, diagnostics and compilation failures.
- [ ] Verify execution timeout, worker termination and recovery after an infinite loop.
- [ ] Verify asset caching, offline/reload behaviour and browser compatibility.
- [ ] Review upstream version pinning, licence notices and whether to self-host a reviewed release.
- [ ] Test representative C standards and examples against the compiler's actual supported modes.

## 6. Roadmap completion versus course release

A roadmap checkbox is a planning item. It must remain unchecked until the corresponding lesson or learning asset exists and has been reviewed. A topic appearing in `public/content/curriculum-index.json` is not proof that the whole C syllabus is complete.

A lesson may be marked ready only after:
- content is authored in English and checked for accuracy and depth;
- examples compile and behave as documented where the environment supports them;
- assessment questions, options, answer keys and explanations are validated;
- the lesson schema and unique IDs pass automated checks;
- accessibility, navigation and mobile presentation are reviewed;
- translation work is tracked independently and does not silently inherit English completion.

## 7. Current verified repository status

- [x] Dedicated C compiler page and navigation entry exist in the repository.
- [x] C course loader has a separate compiler launch entry.
- [x] C lessons are configured not to use the HTML/CSS/JavaScript playground.
- [ ] Full C roadmap lessons are authored and indexed.
- [ ] Full W3Schools coverage audit is passed against released CodeSaathi lessons.
- [ ] English C lesson set receives final content and technical review.
- [ ] Telugu and other supported language files are translated and reviewed.
- [ ] Compiler production release gates are passed.

At the time of this roadmap update, the C curriculum index contains 16 English topic entries. This is not full course coverage. The roadmap above is the target coverage map; it does not claim that the additional topics have already been authored, indexed, translated, tested or deployed.

## 8. Change control

Preserve the existing course ID `c`, module/topic ID prefixes `CL1`–`CL14`, repository architecture and compiler separation. Add lessons in batches, validate each batch, then update the curriculum index and progress tracker. Do not mark planned topics complete merely to make the roadmap appear finished.
