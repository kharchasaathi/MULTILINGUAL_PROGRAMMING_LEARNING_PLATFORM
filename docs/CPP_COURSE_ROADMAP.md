# CodeSaathi C++ Course Roadmap

**Status:** Working scope baseline for the C++ expansion branch. This is a planning inventory, not a claim that all listed lessons are authored or validated. English-first authoring; Telugu and other translations follow. C++ lessons use `playgroundMode: none` until a dedicated C++ execution environment is approved and tested.

## Scope and counting
- CPP1 currently has 20 registered lesson topics (CPP1.1–CPP1.20).
- Proposed modules CPP2–CPP14 contain 10 planned topics each (130 additional topics).
- **Proposed scope total: 150 topics.**
- **Current draft-authored: 120 topics.**
- **Remaining to author under this scope: 30 topics.**
- Counts can be adjusted after a curriculum audit; this roadmap should be updated when topic IDs or scope change.

## CPP1 — Foundations and First Programs (20 topics)
Already registered in curriculum index. CPP1.1–CPP1.10 were previously created; CPP1.11–CPP1.20 were added in this batch. Technical compilation and editorial review remain pending.

## CPP2 — Variables, Constants and Data Types (10 topics — drafted in this batch)

**Drafted CPP2.1–CPP2.10:** Naming rules, declarations/definitions/scope, initialization forms, integer types, floating-point precision, char/bool, auto, const/constexpr, sizeof/limits, choosing types responsibly.\n- CPP2.1: Naming rules and identifiers\n- CPP2.2: Declaration, definition and scope basics\n- CPP2.3: Initialization forms in C++\n- CPP2.4: Fundamental integer types\n- CPP2.5: Floating-point types and precision\n- CPP2.6: Character and boolean types\n- CPP2.7: Type inference with auto\n- CPP2.8: const and constexpr basics\n- CPP2.9: Type sizes, limits and sizeof\n- CPP2.10: Choosing data types responsibly

## CPP3 — Operators and Expressions (10 topics — drafted in this batch)\n\n**Drafted CPP3.1–CPP3.10:** arithmetic and integer division, increment/decrement, compound assignment, comparisons, logical operators, bitwise operations, shifts, precedence, conditional operator, and safe expression evaluation.\n- CPP3.1: Arithmetic operators and integer division\n- CPP3.2: Increment and decrement\n- CPP3.3: Assignment and compound assignment\n- CPP3.4: Comparison operators\n- CPP3.5: Logical operators\n- CPP3.6: Bitwise operators\n- CPP3.7: Shift operations\n- CPP3.8: Precedence and associativity\n- CPP3.9: Conditional operator\n- CPP3.10: Expression evaluation and safe arithmetic

## CPP4 — Conditional Logic (10 topics — drafted in this batch)\n- CPP4.1: if statements\n- CPP4.2: if-else\n- CPP4.3: else-if chains\n- CPP4.4: Nested conditions\n- CPP4.5: switch statements\n- CPP4.6: Case labels and break\n- CPP4.7: default case\n- CPP4.8: Boolean expressions\n- CPP4.9: Input validation decisions\n- CPP4.10: Decision-based mini challenges

## CPP5 — Loops and Iteration (10 topics — drafted)\n\n**Drafted CPP5.1–CPP5.10:** while, do-while, for, range-based for, counters/boundaries, nested loops, break, continue, sentinel-controlled loops and iteration tracing.\n- CPP5.1: while loops and repeated execution\n- CPP5.2: do-while loops\n- CPP5.3: for loops and counter-controlled iteration\n- CPP5.4: range-based for loops\n- CPP5.5: loop counters, boundaries and off-by-one errors\n- CPP5.6: nested loops\n- CPP5.7: break and early exit\n- CPP5.8: continue and skipping an iteration\n- CPP5.9: sentinel-controlled loops\n- CPP5.10: iteration patterns and trace tables

## CPP6 — Functions and Modular Design (10 topics)\n- CPP6.1: Function declaration and definition\n- CPP6.2: Parameters and arguments\n- CPP6.3: Return values\n- CPP6.4: void functions\n- CPP6.5: Default arguments\n- CPP6.6: Overloading basics\n- CPP6.7: Scope and local variables\n- CPP6.8: Recursion introduction\n- CPP6.9: Header and source separation\n- CPP6.10: Function contracts and testing

## CPP7 — Arrays, Strings and Collections (10 topics — drafted)

**Actual file titles verified:**
- CPP7.1: Arrays — Declaration, Initialization and Indexing
- CPP7.2: Traversing Arrays with Loops
- CPP7.3: Modifying and Searching Array Elements
- CPP7.4: Multidimensional Arrays
- CPP7.5: std::array and Fixed-Size Collections
- CPP7.6: C-Style Strings and Null Terminators
- CPP7.7: std::string Basics
- CPP7.8: String Operations and Input
- CPP7.9: Vectors — Dynamic Collections
- CPP7.10: Choosing Arrays, Strings and Vectors

**Index mismatch noted:** the earlier roadmap description had several CPP7 topics assigned to different IDs than the current lesson files. This corrected listing reflects the file titles fetched from GitHub.
## CPP8 — Pointers, References and Memory (10 topics — drafted)

**Actual file titles verified:**
- CPP8.1: Pointers, Addresses and Pointer Declarations
- CPP8.2: Dereferencing and Null Pointers
- CPP8.3: Pointers and Arrays
- CPP8.4: Pointer Arithmetic and Bounds
- CPP8.5: Pointers to const and const Pointers
- CPP8.6: References and Aliasing
- CPP8.7: Passing Data by Pointer or Reference
- CPP8.8: Dynamic Memory and Ownership Basics
- CPP8.9: Smart Pointers — unique_ptr and shared_ptr
- CPP8.10: Object Lifetime, Dangling References and Safe Memory

**Index mismatch noted:** the previous roadmap IDs described several concepts in different positions than the existing lesson files. This listing is aligned to the current GitHub titles.
## CPP9 — Structs, Classes and Encapsulation (10 topics — drafted)

**Actual file titles verified:**
- CPP9.1: Defining Structs and Creating Objects
- CPP9.2: Struct Members and Member Access
- CPP9.3: Struct Initialization and Aggregate Values
- CPP9.4: Structs with Functions
- CPP9.5: Nested Structs and Composition
- CPP9.6: Classes — Data and Member Functions
- CPP9.7: Access Specifiers — public and private
- CPP9.8: Constructors and Member Initialization
- CPP9.9: Encapsulation and Validation
- CPP9.10: Structs vs Classes and Design Practice

**Index mismatch noted:** the roadmap's previous sequence (class basics, constructors, destructors, etc.) was not aligned with the actual file names.
## CPP10 — Object-Oriented Programming (10 topics — drafted)

**Actual file titles verified:**
- CPP10.1: Object-Oriented Programming Principles
- CPP10.2: Class Interfaces and Responsibilities
- CPP10.3: Constructors, Destructors and Object Lifecycle
- CPP10.4: this Pointer and Member Access
- CPP10.5: Static Data Members and Static Methods
- CPP10.6: Inheritance Basics and Base Classes
- CPP10.7: Derived Classes and Access Modes
- CPP10.8: Overriding and Virtual Functions
- CPP10.9: Polymorphism Through Base References
- CPP10.10: OOP Design Practice and Review
## CPP11 — Templates and Generic Programming (10 topics — drafted)

**Actual file titles verified:**
- CPP11.1: Function Templates and Type Parameters
- CPP11.2: Template Argument Deduction
- CPP11.3: Multiple Template Parameters
- CPP11.4: Non-Type Template Parameters
- CPP11.5: Class Templates
- CPP11.6: Class Template Member Functions
- CPP11.7: Template Specialization Basics
- CPP11.8: Generic Programming and Reusable Algorithms
- CPP11.9: Constraints and Concepts Introduction
- CPP11.10: Templates — Testing and Design Practice
## CPP12 — Standard Library and Algorithms (10 topics)

**Actual file titles verified:**
- CPP12.1: Standard Library Overview and Headers
- CPP12.2: vector Operations and Capacity
- CPP12.3: Associative Containers — map and set
- CPP12.4: Unordered Containers and Hashing
- CPP12.5: Sequence Containers — deque, list and array
- CPP12.6: Iterators and Iterator Safety
- CPP12.7: Sorting and Searching with Algorithms
- CPP12.8: Transform, Count, Find and Reverse
- CPP12.9: Numeric Algorithms and Accumulation
- CPP12.10: Choosing Containers and Algorithm Complexity
## CPP13 — Files, Exceptions and Robust Programs (10 topics)

**Actual file titles verified:**
- CPP13.1: File Streams and Stream States
- CPP13.2: Reading Text Files with getline
- CPP13.3: Writing, Appending and File Modes
- CPP13.4: Filesystem Paths and Directory Operations
- CPP13.5: Parsing Records and Input Validation
- CPP13.6: Exception Basics — try, throw and catch
- CPP13.7: Standard Exceptions and Custom Error Types
- CPP13.8: Error Handling and Exception Safety
- CPP13.9: RAII and Resource Cleanup
- CPP13.10: Robust File and Exception Handling Practice
## CPP14 — Modern C++, Testing and Projects (10 topics)

**Actual file titles verified:**
- CPP14.1: Modern C++ Versions and Compatibility
- CPP14.2: Uniform Initialization and Type Deduction
- CPP14.3: Lambda Expressions and Capture Safety
- CPP14.4: Structured Bindings
- CPP14.5: optional, variant and string_view
- CPP14.6: constexpr and Compile-Time Computation
- CPP14.7: Move Semantics and Value Categories
- CPP14.8: Testing, Assertions and Debugging
- CPP14.9: Build Organization and Code Quality
- CPP14.10: Practical Projects, Capstone and Portfolio

**Index mismatch noted:** the prior roadmap had different topics assigned to CPP14 IDs; the above now matches the lesson file titles.
## Lesson standard
Each lesson should include 5 learning objectives, Understand and explanatory content, 5 original examples, guided and independent practice, 5 hints, 5 topic-specific MCQs with valid answer keys, unique IDs, prerequisites, and no HTML/CSS/JS playground. Mark status draft until editorial and technical review are completed.
