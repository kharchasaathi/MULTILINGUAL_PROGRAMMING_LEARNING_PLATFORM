# CodeSaathi Programming Foundations — Expanded Roadmap V1

## Purpose
Expand the existing Programming Foundations course without replacing or renumbering its 14 current topics. This roadmap adds language-agnostic programming concepts that learners should understand before and while learning HTML, CSS, JavaScript, C, and other programming courses.

## Continuity and implementation rules
- Preserve all existing F0.1–F0.7 and F1.1–F1.7 topics.
- These additions are curriculum plans only; do not create placeholder lesson files or add missing lesson paths to the curriculum index before the actual lesson JSON files exist.
- Inspect the live repository, current curriculum index, lesson schema, and existing Foundation lessons before every implementation batch.
- Use original explanations, code, exercises, and assessments. Do not copy W3Schools text or examples.
- Implement topic-by-topic in English first; review and validate before translations.
- Update the master inventory/progress tracker when implementation starts or a topic is verified.
- Only mark a topic complete after its content, schema, technical checks, index integration, and website verification appropriate to that batch are complete.

## Existing topics — preserve as-is
### F0 — Web and Working Environment
- F0.1 What is the web? Internet vs web; browser, website, web app
- F0.2 How a browser requests and displays a page
- F0.3 Files, folders, file extensions, paths
- F0.4 Text editor, browser developer tools, saving and refreshing
- F0.5 How HTML, CSS, and JavaScript work together
- F0.6 First project folder and safe working habits
- F0.7 Reading errors and debugging

### F1 — Programming Fundamentals
- F1.1 What is a program and source code
- F1.2 Syntax, meaning, statements, expressions
- F1.3 Values, names, variables
- F1.4 Input, processing, output
- F1.5 Algorithms and step-by-step thinking
- F1.6 Pseudocode and flowcharts
- F1.7 Debugging mindset and problem decomposition

---

# New topics to add

## F2 — Decisions and Control Flow
- F2.1 True/False and Boolean Logic
- F2.2 Comparison Operators and Conditions
- F2.3 Combining Conditions: AND, OR, NOT
- F2.4 Decision Branches: if / else concepts
- F2.5 Multiple-Branch Decisions
- F2.6 Nested Decisions and Decision Trees
- F2.7 Conditional Expressions and Choosing Between Alternatives
- F2.8 switch/match-style Selection Concepts
- F2.9 Control Flow, Branch Paths, and Tracing
- F2.10 Common Condition Bugs: Boundaries, Truthiness, and Incorrect Logic

## F3 — Repetition and Iteration
- F3.1 Why Loops Are Needed
- F3.2 Counter-Controlled and Condition-Controlled Loops
- F3.3 Pre-Test and Post-Test Loop Concepts
- F3.4 Loop Initialization, Condition, and Update
- F3.5 Nested Loops and Multi-Level Iteration
- F3.6 Break, Continue, and Early Exit
- F3.7 Infinite Loops and Termination Guarantees
- F3.8 Loop Tracing and Iteration Tables
- F3.9 Off-by-One Errors and Loop Boundaries
- F3.10 Choosing a Loop Strategy

## F4 — Data, Types, and Representation
- F4.1 What Data Is and How Programs Represent It
- F4.2 Primitive, Composite, and Reference-Type Concepts
- F4.3 Type Systems: Static, Dynamic, Strong, and Weak (with caveats)
- F4.4 Type Inference and Explicit Type Declaration
- F4.5 Converting, Parsing, and Validating Values
- F4.6 Numeric Data, Precision, Rounding, and Range
- F4.7 Text, Characters, Unicode, and Encoding Basics
- F4.8 Null, None, Missing, and Uninitialized Concepts
- F4.9 Constants, Mutability, and Immutability
- F4.10 Value Semantics vs Reference Semantics
- F4.11 Equality, Identity, and Comparison
- F4.12 Data Validation and Domain Constraints

## F5 — Collections and Data Structures
- F5.1 Why Collections Are Needed
- F5.2 Arrays and Indexed Sequences
- F5.3 Lists and Dynamic Sequences
- F5.4 Strings as Data Sequences
- F5.5 Sets and Unique Values
- F5.6 Key-Value Maps and Dictionaries
- F5.7 Records, Structs, and Grouped Data
- F5.8 Nested Collections and Multidimensional Data
- F5.9 Choosing a Collection for a Problem
- F5.10 Traversing, Searching, Updating, and Removing Collection Items
- F5.11 Collection Size, Capacity, and Growth Concepts
- F5.12 Collection Boundaries and Safe Access

## F6 — Functions and Modular Programming
- F6.1 Why Functions and Modules Matter
- F6.2 Defining, Calling, and Naming Functions
- F6.3 Parameters, Arguments, and Return Values
- F6.4 Local, Global, and Module Scope
- F6.5 Function Contracts: Inputs, Outputs, Preconditions, Postconditions
- F6.6 Pure Functions and Side Effects
- F6.7 Decomposition and Reusable Components
- F6.8 Recursion and Base Cases
- F6.9 Call Stack and Function Execution
- F6.10 Libraries, Modules, Imports, and Dependency Concepts
- F6.11 API Boundaries and Separation of Concerns
- F6.12 Avoiding Duplication and Designing Cohesive Functions

## F7 — Memory, Execution, and Data Flow
- F7.1 How a Program Executes: Instructions and State
- F7.2 State Changes and State Transitions
- F7.3 Memory Concepts: Storage, Address, and Value
- F7.4 Stack and Heap Concepts (language/runtime-dependent)
- F7.5 Lifetime, Scope, and Resource Ownership Concepts
- F7.6 References, Pointers, and Indirection (language-neutral introduction)
- F7.7 Copying, Sharing, and Aliasing
- F7.8 Data Flow Between Functions and Components
- F7.9 Resource Management and Cleanup
- F7.10 Memory/Resource Bugs: Leaks, Invalid Access, and Stale References

## F8 — Programming Paradigms and Design Approaches
- F8.1 What Is a Programming Paradigm?
- F8.2 Procedural Programming
- F8.3 Object-Oriented Programming: Objects and Classes
- F8.4 Encapsulation and Abstraction
- F8.5 Inheritance and Composition
- F8.6 Polymorphism and Interfaces
- F8.7 Functional Programming Basics
- F8.8 Declarative vs Imperative Programming
- F8.9 Event-Driven Programming
- F8.10 Choosing a Paradigm and Combining Approaches

## F9 — Errors, Testing, and Quality
- F9.1 Syntax, Compile-Time, Runtime, and Logic Errors
- F9.2 Exceptions, Error Values, and Failure Signals
- F9.3 Handling Errors vs Hiding Errors
- F9.4 Defensive Programming and Input Validation
- F9.5 Testing Fundamentals and Testable Requirements
- F9.6 Unit, Integration, and End-to-End Testing
- F9.7 Test Cases, Expected Results, and Assertions
- F9.8 Boundary, Negative, and Edge-Case Testing
- F9.9 Regression Testing
- F9.10 Debugging with Reproducible Steps and Evidence
- F9.11 Logging and Diagnostics
- F9.12 Code Review and Quality Checks

## F10 — Problem Solving and Algorithmic Thinking
- F10.1 Understand Requirements and Identify Constraints
- F10.2 Break Problems into Smaller Tasks
- F10.3 Identify Inputs, Outputs, State, and Side Effects
- F10.4 Build a Step-by-Step Solution
- F10.5 Trace Tables and Dry Runs
- F10.6 Work Backward and Use Examples
- F10.7 Brute Force and Improve the Approach
- F10.8 Search and Sorting as Problem-Solving Patterns
- F10.9 Time and Space Complexity Intuition
- F10.10 Big O Fundamentals
- F10.11 Trade-Offs: Time, Memory, Simplicity, and Readability
- F10.12 Proving/Checking Correctness with Invariants and Cases

## F11 — Software Design and Maintainability
- F11.1 Readability and Naming
- F11.2 Formatting and Consistent Style
- F11.3 Comments, Documentation, and When Not to Comment
- F11.4 Separation of Concerns
- F11.5 Cohesion and Coupling
- F11.6 Abstraction and Encapsulation
- F11.7 Reuse vs Premature Generalization
- F11.8 Maintainability and Change-Friendly Design
- F11.9 Refactoring Without Changing Behaviour
- F11.10 Design Smells and Common Anti-Patterns
- F11.11 Basic Architecture: Layers and Responsibilities
- F11.12 Requirements, Design, Implementation, and Review Cycle

## F12 — Development Workflow and Collaboration
- F12.1 Development Lifecycle: Plan, Build, Test, Improve
- F12.2 Project Structure and File Organization
- F12.3 Version Control Concepts
- F12.4 Git: Working Tree, Changes, Commits
- F12.5 Branches, Merging, and Conflict Concepts
- F12.6 Code Reviews and Collaborative Work
- F12.7 Dependencies and Package Management
- F12.8 Build, Run, and Environment Configuration
- F12.9 Documentation and README Practices
- F12.10 Reproducibility and Environment Differences
- F12.11 Releases, Versioning, and Change Logs
- F12.12 Responsible Use of Third-Party Code and Licenses

## F13 — Security, Privacy, and Safe Programming
- F13.1 Security Mindset and Threat Awareness
- F13.2 Trust Boundaries and Untrusted Input
- F13.3 Validation, Sanitization, and Encoding (different purposes)
- F13.4 Secrets, Credentials, and Safe Configuration
- F13.5 Authentication vs Authorization
- F13.6 Least Privilege and Access Control
- F13.7 Common Vulnerability Concepts: Injection and Unsafe Input Handling
- F13.8 Data Privacy and Minimization
- F13.9 Safe Error Messages and Information Disclosure
- F13.10 Dependency and Supply-Chain Risk Basics
- F13.11 Secure Defaults and Defensive Design
- F13.12 Security Review Checklist for Beginner Projects

## F14 — APIs, Formats, and Application Communication
- F14.1 What an API Is and Why It Exists
- F14.2 Client, Server, and Service Responsibilities
- F14.3 Request and Response Concepts
- F14.4 HTTP Fundamentals and Methods
- F14.5 Status Codes and Failure Responses
- F14.6 JSON and Structured Data
- F14.7 Serialization and Deserialization
- F14.8 Parsing vs Validation
- F14.9 API Authentication Concepts
- F14.10 Rate Limits, Retries, and Timeouts
- F14.11 Asynchronous Communication Concepts
- F14.12 Designing Reliable API Consumption

## F15 — Practical Foundations Projects
- F15.1 Build a Command-Line Calculator
- F15.2 Input Validation and Menu-Based Program
- F15.3 Expense/Record Tracker Using Collections
- F15.4 Search and Filter a Dataset
- F15.5 Refactor a Monolithic Program into Functions/Modules
- F15.6 Add Error Handling and Test Cases to an Existing Program
- F15.7 Build a Small API Consumer Using Structured Data
- F15.8 Final Multi-Concept Foundations Project
- F15.9 Project Requirements, Design, Test, and Review
- F15.10 Final Foundations Knowledge Assessment

---

## Summary
- Existing topics: 14 (F0.1–F0.7 and F1.1–F1.7), preserved.
- New planned modules: F2–F15.
- New topic count: 158 planned topics.
- Expanded Foundations curriculum total: 172 planned topics, before any further inventory discovery.
- This is a roadmap count, not a completed lesson count.
- New topic files, curriculum-index entries, and learner-visible navigation should be added only as actual lessons are authored and validated.
