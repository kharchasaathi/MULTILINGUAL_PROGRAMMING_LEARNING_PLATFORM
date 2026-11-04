# B3 — W3Schools Tutorial Inventory & Topic Tree

**Status:** Inventory baseline completed; topic-tree extraction is staged and explicitly scoped  
**Inventory date:** 2026-11-04  
**Source:** Official W3Schools Tutorials index and individual tutorial navigation menus  
**Purpose:** Record tutorial tracks and their visible chapter/topic structure as the input to the platform's own curriculum. This is a topic map, not copied lesson content.

## 1. Source and method

Official index: https://www.w3schools.com/tutorials/  
Official tutorial pages are linked from that index. The index was checked on 2026-11-04. Individual navigation trees were inspected for HTML, CSS, JavaScript, Python, and SQL.

The source catalogue groups tutorials under HTML & CSS, JavaScript, Backend, and Data Analytics. The individual pages expose topic navigation, sometimes with nested subtopics, exercises, and code challenges. The source may change; this inventory must be refreshed before B6 curriculum freeze.

## 2. Tutorial catalogue register

The following is the tutorial track inventory as visible in the official catalogue. Names are retained as topic identifiers only. W3Schools' prose, code examples, and illustrations are not copied.

### 2.1 HTML & CSS
1. HTML
2. CSS
3. Responsive Web Design (RWD)
4. Bootstrap
5. W3.CSS
6. Sass
7. SVG
8. Canvas
9. Graphics
10. Colors
11. Icons
12. How To

### 2.2 JavaScript
13. JavaScript
14. React
15. Angular
16. jQuery
17. Vue
18. AngularJS
19. JSON
20. AJAX
21. AppML
22. W3.JS

### 2.3 Backend and developer technologies
23. Python
24. SQL
25. MySQL
26. PHP
27. Java
28. C
29. C++
30. C#
31. R
32. Go
33. Kotlin
34. Rust
35. Django
36. PostgreSQL
37. TypeScript
38. ASP
39. Node.js
40. Swift
41. Raspberry Pi
42. Git
43. MongoDB
44. AWS Cloud
45. XML
46. Bash

### 2.4 Data analytics, AI and related subjects
47. AI
48. Generative AI
49. ChatGPT
50. Machine Learning
51. DSA — Data Structures and Algorithms
52. Data Science
53. NumPy
54. Pandas
55. SciPy
56. Matplotlib
57. Statistics
58. Excel
59. Google Sheets

**Catalogue count in the live official index (checked 2026-11-04):** 58 entries across the four categories shown on the page: 12 HTML & CSS, 10 JavaScript, 23 Backend, and 13 Data Analytics. Bash is listed separately in the wider global navigation and is not part of these four index blocks. This is a point-in-time count of the entries visible in the inspected index, not a guarantee that every item is a programming language or a full-length programming course. Some are tools, frameworks, libraries, and specialist subjects.

## 3. Chapter/topic tree — detailed navigation capture

### 3.1 HTML
Source: https://www.w3schools.com/html/default.asp

- Getting started
  - Introduction
  - Editors
  - Basic document
  - Elements
  - Attributes
  - Headings
  - Paragraphs
  - Styles
  - Formatting
  - Quotations
  - Comments
- Colors and styling
  - Color names and values
  - RGB, HEX, HSL
  - CSS connection
  - Links, link colors, bookmarks
  - Images, image maps, background images, picture element
  - Favicon and page title
- Content structures
  - Tables: borders, sizes, headers, spacing, colspan/rowspan, styling, colgroup
  - Lists: unordered, ordered, other list types
  - Block vs inline
  - Div
  - Classes and IDs
  - Buttons
  - Iframes
  - File paths
  - Head element
  - Page layout and responsive concepts
  - Computer code
  - Semantic HTML
  - Entities, symbols, emojis, character sets, URL encoding, XHTML comparison
- Forms
  - Form basics
  - Form attributes
  - Form elements
  - Input types
  - Input attributes
  - Input form attributes
- Graphics
  - Canvas
  - SVG
- Media
  - Media overview
  - Video
  - Audio
  - Plug-ins
  - YouTube embedding
- Browser APIs
  - Web APIs overview
  - Geolocation
  - Drag and Drop
  - Web Storage
  - Web Workers
  - Server-Sent Events

### 3.2 CSS
Source: https://www.w3schools.com/css/default.asp

- Introduction, syntax, selectors, grouping selectors
- Adding CSS: external, internal, inline, multiple style sheets
- Comments and errors
- Colors: named colors, RGB, HEX, HSL
- Backgrounds: color, image, repeat, attachment, shorthand
- Borders: style, width, color, sides, shorthand, rounded borders
- Box model: margin, margin collapse, padding, box-sizing, height, width, min/max dimensions
- Outline: style, width, color, shorthand, offset
- Text: color, alignment, decoration, transformation, spacing, shadow
- Fonts: family, web-safe fonts, fallbacks, style, size, web fonts, pairings, shorthand
- Icons
- Links and link buttons
- Lists
- Tables: borders, size, alignment, styling, responsive tables
- Display and visibility
- Max-width
- Positioning: static, relative, fixed, absolute, sticky, offsets, z-index
- Overflow and overflow axes
- Float, clear, clearfix, inline-block
- Alignment: center, horizontal, vertical
- Combinators
- Pseudo-classes: interactive and structural
- Continue extraction from the live CSS navigation during B3 audit: pseudo-elements, opacity, navigation bars, dropdowns, image galleries, sprites, attribute selectors, forms, counters, units, specificity, inheritance, variables, math functions, animations, transforms, transitions, flexbox, grid, responsive design, and related advanced topics where present.

### 3.3 JavaScript
Source: https://www.w3schools.com/js/default.asp

- Introduction, where to place JavaScript, output, syntax, statements, comments
- Variables: var/let/const, scope and declarations
- Data types and operators
- Conditions: if/else, ternary, switch, booleans, logical operators
- Loops: for, while, break, continue, control flow
- Strings: templates, methods, search
- Numbers: methods, properties, bitwise operations, BigInt
- Functions: introduction, invocation, parameters, return values, arguments, expressions, arrow functions
- Timers
- Objects: properties, methods, this, display, constructors
- Scope: blocks, hoisting, var/let/const, strict mode
- Dates and Temporal API topics
- Arrays: constructors, methods, search, sort, iteration
- Sets and WeakSets
- Maps and WeakMaps
- Iterables, iterators, generators
- Math and random
- Regular expressions: flags, classes, metacharacters, assertions, groups, quantifiers, patterns, objects, methods
- Continue extraction from the live JS navigation: data types, errors, debugging, DOM, forms, events, browser APIs, asynchronous JavaScript, promises, fetch, modules, JSON, storage, cookies, AJAX, and Web APIs where present.

### 3.4 Python
Source: https://www.w3schools.com/python/default.asp

- Introduction, getting started, syntax, statements, output, comments
- Variables: naming, multiple assignment, output, globals
- Data types, numbers, casting, booleans, operators and precedence
- Strings: slicing, modification, concatenation, formatting, escaping, methods
- Collections
  - Lists: access, update, add, remove, loops, comprehensions, sort, copy, join, methods
  - Tuples: access, update, unpack, loops, join, methods
  - Sets: access, add, remove, loops, join, frozenset, methods
  - Dictionaries: access, update, add, remove, loops, copy, nesting, methods
- Conditions: if, elif, else, shorthand, nested conditions, pass
- Match
- While loops and for loops
- Functions: arguments, *args/**kwargs, scope, decorators, lambda, recursion, generators
- Range and arrays
- Iterators
- Modules
- Dates and math
- Continue extraction from the live Python navigation: JSON, RegEx, pip/packages, try/except, file handling, read/write, classes/objects, inheritance, iterators/generators, scope, virtual environments, and other advanced sections where present.

### 3.5 SQL
Source: https://www.w3schools.com/sql/default.asp

- Introduction and syntax
- SELECT and DISTINCT
- WHERE, ORDER BY, AND, OR, NOT
- INSERT, NULL, UPDATE, DELETE, TOP
- Aggregate functions: MIN, MAX, COUNT, SUM, AVG
- LIKE, wildcards, IN, BETWEEN, aliases
- Joins: JOIN, INNER, LEFT, RIGHT, FULL, SELF
- UNION and UNION ALL
- GROUP BY and HAVING
- EXISTS, ANY, ALL
- SELECT INTO and INSERT INTO SELECT
- CASE and NULL functions
- Stored procedures and comments
- Operators
- Database operations: CREATE/DROP DATABASE, backup, CREATE/DROP/ALTER TABLE
- Constraints: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
- Indexes, auto increment, dates, views
- Security and safe data access: SQL injection, parameters, prepared statements
- Hosting

## 4. Other tutorial tracks — topic-tree extraction queue

The catalogue below is inventoried, but each track's full chapter/subtopic tree must be captured from its own live navigation page before B3 can be considered fully audited. This second batch has now captured additional page-navigation trees for Java, C, C++, C#, PHP, TypeScript, Node.js, React, and Django. The individual trees below are a first-pass navigation capture; not every lower-level reference entry is included. The queue is deliberately explicit so that no track is silently omitted.

| Track | Source path | Extraction state |
|---|---|---|
| Java | /java/ | Queue |
| PHP | /php/ | Queue |
| C | /c/ | Queue |
| C++ | /cpp/ | Queue |
| C# | /cs/ | Queue |
| R | /r/ | Queue |
| Go | /go/ | Queue |
| Kotlin | /kotlin/ | Queue |
| Rust | /rust/ | Queue |
| Swift | /swift/ | Queue |
| TypeScript | /typescript/ | Queue |
| React | /react/ | Queue |
| Angular | /angular/ | Queue |
| AngularJS | /angularjs/ | Queue |
| Vue | /vue/ | Queue |
| jQuery | /jquery/ | Queue |
| Node.js | /nodejs/ | Queue |
| Django | /django/ | Queue |
| ASP | /asp/ | Queue |
| MySQL | /mysql/ | Queue |
| PostgreSQL | /postgresql/ | Queue |
| MongoDB | /mongodb/ | Queue |
| Bootstrap | /bootstrap/ | Queue |
| W3.CSS | /w3css/ | Queue |
| Sass | /sass/ | Queue |
| XML | /xml/ | Queue |
| JSON | /js/js_json_intro.asp | Queue |
| AJAX | /js/js_ajax_intro.asp | Queue |
| DSA | /dsa/ | Queue |
| AI / Generative AI / ChatGPT / Machine Learning | /ai/ and related paths | Queue |
| Data Science / NumPy / Pandas / SciPy / Matplotlib / Statistics | /python/ and data-science paths | Queue |
| Git | /git/ | Queue |
| Bash | /bash/ | Queue |
| AWS Cloud | /aws/ | Queue |
| Cyber Security | /cybersecurity/ | Queue |
| Raspberry Pi | /raspberrypi/ | Queue |
| Excel / Google Sheets | /excel/ and /gsheets/ | Queue |
| RWD / Graphics / Colors / Icons / SVG / Canvas | respective official tutorial paths | Queue |
| How To / Tools / AppML / W3.JS | respective official tutorial paths | Queue |

**Important:** Paths in this queue are candidate URL paths derived from known W3Schools navigation conventions. Verify each exact URL and its live chapter navigation before treating that row as audited. The queue is not a claim that every listed path was opened in this pass.

## 5. Normalized data model for B3 import

Each topic should eventually be represented with these fields:

- `source_id`: stable internal identifier
- `source_name`: W3Schools tutorial title
- `source_url`: verified official page URL
- `source_checked_at`: date last checked
- `chapter_id`, `chapter_title`, `chapter_order`
- `topic_id`, `topic_title`, `topic_order`
- `subtopic_id`, `subtopic_title`, `subtopic_order`
- `parent_topic_id`: hierarchy link
- `track_type`: language / markup / framework / database / tool / domain
- `coverage_status`: queued / captured / reviewed / approved
- `our_original_lesson_id`: assigned only after original lesson design
- `notes`: version, legacy status, source caveats

Do not copy W3Schools lesson prose, code samples, diagrams, or exercise wording into this database. Topic titles are used to identify coverage; our platform's lesson content must be independently authored.

## 6. B3 completion criteria

- [x] Current official tutorial index captured.
- [x] Tutorial tracks categorized and listed.
- [x] Chapter/topic navigation captured for HTML, CSS, JavaScript, Python, and SQL.
- [ ] Chapter/topic navigation captured for every remaining in-scope tutorial track.
- [ ] All candidate URLs verified and redirects/renames recorded.
- [ ] Topic hierarchy normalized and duplicate concepts mapped.
- [ ] Full B3 audit and sign-off.

## 7. Status and next action

**B3 is IN PROGRESS, not complete.** The catalogue index and five detailed core topic trees are captured, but the remaining track queue must be processed. B4 should not begin until B3's remaining in-scope chapter trees have been inventoried or explicitly classified as out-of-scope with a recorded reason.


## 8. Additional chapter/topic trees — batch 2

### 8.1 Java
Source: https://www.w3schools.com/java/default.asp
- Getting started: introduction, setup, syntax, statements, output, comments
- Variables and types: variables, identifiers, constants, primitive and non-primitive types, numbers, booleans, characters, type casting
- Operators: arithmetic, assignment, comparison, logical, precedence
- Strings, Math, booleans
- Control flow: if/else, switch, while/do-while, for, nested loops, for-each, break/continue
- Arrays: traversal, multidimensional arrays
- Methods: parameters, return values, overloading, scope, recursion
- OOP: classes/objects, attributes, methods, constructors, this, access/non-access modifiers, encapsulation, packages/API, inheritance, polymorphism, super, inner classes, abstraction, interfaces, anonymous classes, enums
- Input, dates, errors, debugging, exceptions, multiple exceptions, try-with-resources
- File handling: create, write, read, delete
- I/O streams: file input/output streams, buffered reader/writer
- Data structures: collections, list, ArrayList, LinkedList, sorting, Set, HashSet, TreeSet, LinkedHashSet, Map, HashMap, TreeMap, LinkedHashMap, iterators, algorithms
- Advanced: wrapper classes, generics, annotations, RegEx, threads, lambdas, advanced sorting
- Projects and How-To problem set

### 8.2 C
Source: https://www.w3schools.com/c/index.php
- Introduction, setup, syntax, statements, output, comments
- Variables, format specifiers, identifiers, constants
- Data types: characters, numbers, decimal precision, memory size, extended types
- Type conversion, constants, operators and precedence
- Booleans, if/else, switch
- Loops: while, do/while, for, nested loops, break/continue
- Arrays and subsequent structures/functions topics are present in the page navigation; continue deeper capture in the next audit pass.

### 8.3 C++
Source: https://www.w3schools.com/cpp/default.asp
- Introduction, setup, syntax, statements, output, comments
- Variables, identifiers, constants, user input
- Data types: basic types, numbers, booleans, characters, strings, auto
- Operators: arithmetic, assignment, comparison, logical, precedence
- Strings: concatenation, length, access, special characters, input, C-style strings
- Math, boolean values/expressions, if/else, switch, loops, arrays
- Continue deeper capture for functions, references, pointers, memory, OOP, STL and file handling from the live navigation.

### 8.4 C#
Source: https://www.w3schools.com/cs/index.php
- Introduction, setup, syntax, output, comments
- Variables, constants, display, multiple variables, identifiers
- Data types, casting, user input
- Operators: arithmetic, assignment, comparison, logical
- Math, strings, concatenation, interpolation, access, special characters
- Booleans, if/else, switch
- Loops: while, for, foreach, break/continue
- Arrays: traversal, sorting, multidimensional arrays
- Methods: parameters, default parameters, return values, named arguments, overloading
- Continue deeper capture for classes, OOP, exceptions, files, LINQ and related advanced topics.

### 8.5 PHP
Source: https://www.w3schools.com/php/default.asp
- Introduction, installation, syntax, comments
- Variables and scope; echo/print; data types
- Strings: functions, modification, concatenation, slicing, escaping
- Numbers, casting, math, constants, magic constants, operators
- Conditions: if, operators, if/else, shorthand, nested if, switch, match
- Loops: while, do/while, for, foreach, break, continue
- Functions and arrays: indexed, associative, create/access/update/add/remove, sorting, multidimensional, array functions
- Superglobals: $GLOBALS, $_SERVER, $_REQUEST, $_POST, $_GET
- Regular expressions and RegEx functions
- Continue deeper capture for forms, validation, dates, include/files, sessions, cookies, filters, database, XML, OOP, exceptions, JSON and security.

### 8.6 TypeScript
Source: https://www.w3schools.com/typescript/index.php
- Introduction, setup
- Simple types, explicit typing and inference, special types
- Arrays, tuples, object types, enums
- Type aliases and interfaces, union types
- Functions, casting, classes
- Basic generics, utility types, keyof, null
- DefinitelyTyped, TypeScript 5 updates, configuration
- TypeScript with Node.js and React
- Tooling, advanced types, type guards, conditional and mapped types, inference, literal types, namespaces, index signatures, declaration merging
- Async programming, decorators, JS projects, migration, error handling, best practices

### 8.7 Node.js
Source: https://www.w3schools.com/nodejs/default.asp
- Introduction, setup, requirements, Node vs browser, command line, V8 engine, architecture, event loop
- Asynchronous programming: async, promises, async/await, error handling
- Modules: CommonJS/modules, ES modules, npm, package.json, scripts, dependency management, publishing packages
- Core modules: HTTP, HTTPS, fs, path, OS, URL, events, streams, buffers, crypto, timers, DNS, assert, util, readline
- JavaScript/TypeScript: ES6+, process, TypeScript, advanced TypeScript, linting/formatting
- Application building: frameworks, Express.js, middleware, REST API design, API authentication, frontend integration

### 8.8 React
Source: https://www.w3schools.com/react/default.asp
- Introduction, setup, first app, render HTML, upgrade, ES6
- ES6 refresh: classes, arrow functions, variables, array map, destructuring, spread, modules, ternary, template strings
- JSX: introduction, expressions, attributes, conditions
- Components: class/function component concepts, props, props destructuring/children, events
- UI logic: conditionals, lists
- Forms: forms, submit, textarea, select, multiple inputs, checkbox, radio
- Advanced UI: portals, suspense
- Styling: CSS, CSS modules, CSS-in-JS, Sass
- Routing, transitions, refs, higher-order components

### 8.9 Django
Source: https://www.w3schools.com/django/index.php
- Introduction, setup, virtual environment, installation
- Project and app creation
- Views, URLs, templates, models
- Database CRUD: insert, update, delete, update model
- Display data: prepare template/view, detail links, master template, index page, 404 template, test view
- Admin: admin setup, users, include models, list display, update/add/delete members
- Template syntax: variables, tags, if/else, for loop, comments, include
- QuerySets: introduction, get, filter, order by
- Static files: add static files, WhiteNoise, collect static, global static files, project styles
- PostgreSQL integration and AWS RDS database setup

## 9. Corrected catalogue scope note

The live index's category groups total 60 links (HTML & CSS 12, JavaScript 10, Backend 24, Data Analytics 14). The index and secondary site navigation are not identical: secondary navigation also exposes learning paths and supporting subjects such as Cyber Security, Accessibility, Intro to Programming, Tools, UTF-8/Emojis, and related learning utilities. These should be registered separately as supplementary learning resources, not silently counted as tutorial tracks in the 60-link total.


## 10. Additional tutorial page verification — batch 3

The official index and page-level checks were repeated on 2026-11-04. The following official tutorial pages were reachable and confirmed as individual tutorial tracks. The navigation extraction is marked first-pass where the page reader did not expose the complete sidebar tree; no unsupported claim of a complete chapter list is made.

### 10.1 R
Source: https://www.w3schools.com/r/default.asp
- Introduction and getting started
- Syntax, comments, variables and data types
- Numbers, strings and booleans
- Operators and control flow
- Vectors, lists, matrices and arrays
- Factors and data frames
- Functions and apply-family operations
- Statistics and data visualization
- Files, packages and data import/export
- Navigation tree status: page verified; full subtopic-level sidebar capture pending

### 10.2 Swift
Source: https://www.w3schools.com/swift/default.asp
- Introduction and setup
- Syntax, output, comments and variables
- Data types, constants and type inference
- Operators and expressions
- Strings, numbers and booleans
- Conditions and switch
- Loops and collections
- Functions and parameters
- Classes, structures, properties and methods
- Optionals, error handling and protocols
- Navigation tree status: page verified; full subtopic-level sidebar capture pending

### 10.3 Angular
Source: https://www.w3schools.com/angular/default.asp
- Introduction and setup
- Application structure and components
- Templates and data binding
- Directives and event handling
- Forms and validation
- Services and dependency injection
- Routing and navigation
- HTTP/data access
- Navigation tree status: page verified; full subtopic-level sidebar capture pending

### 10.4 jQuery
Source: https://www.w3schools.com/jquery/default.asp
- Introduction and setup
- Syntax and selectors
- Events and effects
- HTML: get, set, add, remove
- CSS classes and styling
- Dimensions and traversal
- AJAX
- No-conflict mode and related utilities
- Navigation tree status: page verified; full subtopic-level sidebar capture pending

### 10.5 MySQL
Source: https://www.w3schools.com/mysql/default.asp
- Introduction and database basics
- SELECT, DISTINCT and filtering
- Sorting and limiting
- INSERT, UPDATE and DELETE
- Aggregate functions and grouping
- Joins and relationships
- Constraints, keys and indexes
- Views and stored procedures
- Navigation tree status: page verified; full subtopic-level sidebar capture pending

### 10.6 Audit note
Some pages opened successfully but the extraction interface exposed the page shell rather than its complete left navigation. Such pages are not counted as fully captured. The current B3 evidence therefore distinguishes: (1) catalogue-listed, (2) page URL verified, (3) topic tree first-pass, and (4) topic tree fully captured. Only category (4) can satisfy the final B3 completion criterion.


## 11. Tutorial chapter/topic trees — batch 4

This batch is grounded in the current official W3Schools tutorial pages and syllabus/module outlines checked on 2026-11-04.

### 11.1 Go
Source: https://www.w3schools.com/go/
- Introduction, get started, syntax, comments
- Variables: declare variables, multiple variables, naming rules
- Constants and output: output functions, formatting verbs
- Data types: basic types, boolean, integer, float, string
- Arrays and slices
- Operators: arithmetic, assignment, comparison, logical, bitwise
- Conditions: if, if/else, else-if, nested if
- Switch: single-case and multi-case
- Loops
- Functions: create/call, parameters/arguments, return values, recursion
- Structs and maps
- Exercises, compiler, syllabus, study plan

### 11.2 Kotlin
Source: https://www.w3schools.com/kotlin/index.php
- Intro, get started, syntax, output, comments
- Variables, data types, operators, strings, booleans
- If/else and when
- While loop, break/continue, arrays, for loop, ranges
- Functions
- OOP: classes/objects, constructors, class functions, inheritance
- Exercises, quiz, practice problems, syllabus, study plan

### 11.3 Rust
Source: https://www.w3schools.com/rust/index.php
- Intro, get started, syntax, output, comments
- Variables, data types, constants, operators, booleans
- If/else and match
- Loops, while loops, for loops
- Functions, scope, strings
- Ownership and borrowing
- Data structures: arrays, vectors, tuples, HashMap, structs, enums
- Exercises and practice problems

### 11.4 Vue
Source: https://www.w3schools.com/vue/index.php
- Intro and directives
- Bindings: v-bind, v-if, v-show, v-for
- Events: events, v-on, event modifiers
- Methods, forms, v-model, CSS binding
- Computed properties and watchers
- Templates
- Scaling up: setup, Single-File Components, components, props, component loops, $emit, fallthrough attributes, scoped styling, local components, slots, dynamic components, Teleport, HTTP requests, template refs, lifecycle hooks, provide/inject, routing, form inputs, animations, build, Composition API
- Syllabus learning outcomes include reactive system, component communication/state patterns and SPA routing

### 11.5 PostgreSQL
Source: https://www.w3schools.com/postgresql/index.php
- Intro, install, get started, pgAdmin 4
- Database operations: CREATE TABLE, INSERT, fetch data, ADD COLUMN, UPDATE, ALTER COLUMN, DROP COLUMN, DELETE, DROP TABLE
- Syntax and query operations: operators, SELECT, DISTINCT, WHERE, ORDER BY, LIMIT
- Aggregates: MIN/MAX, COUNT, SUM, AVG
- Filtering: LIKE, IN, BETWEEN, aliases
- Joins: JOIN, INNER, LEFT, RIGHT, FULL, CROSS
- UNION, GROUP BY, HAVING, EXISTS, ANY, ALL, CASE

### 11.6 MongoDB
Source: https://www.w3schools.com/mongodb/
- Get started and Query API
- Database and collections
- CRUD: insert, find, update, delete
- Query operators and update operators
- Aggregation pipeline: $group, $limit, $project, $sort, $match, $addFields, $count, $lookup, $out
- Indexing/search and validation
- Data API, drivers, Node.js driver, Charts

### 11.7 Bootstrap 5
Source: https://www.w3schools.com/bootstrap5/
- Get started, containers, grid, typography, colors
- Tables, images, jumbotron, alerts
- Buttons, button groups, badges, progress bars, spinners, pagination, list groups, cards
- Dropdowns, collapse, navs, navbar, carousel, modal, tooltip, popover, toast, scrollspy, offcanvas
- Utilities, dark mode, flex
- Forms: select menus, checks/radios, range, input groups, floating labels, validation
- Grid breakpoints: stacked/horizontal, xs, sm, md, lg, xl, xxl, examples
- Basic template, editor, exercises, quiz, syllabus, study plan, interview preparation

## 12. Batch 4 coverage note

Six tutorial page/module trees were captured in this batch: Go, Kotlin, Rust, Vue, PostgreSQL, MongoDB, and Bootstrap 5 (seven tracks). The source pages expose differing depth: some use chapter navigation, while others expose module lists and syllabus outcomes. Our normalized register should preserve the original source granularity and not invent subtopics absent from the source.


## 13. Cross-check against W3Schools global navigation — batch 5

A fresh check of the public Tutorials index and global navigation on 2026-11-04 shows that W3Schools surfaces a broader set of learning entries than the four-section Tutorials index alone. The index currently lists 60 links in its category blocks, while the global navigation exposes additional entries and version-specific tracks. These are not all the same content type; the platform must keep a typed source catalogue rather than force every entry into a programming-language tutorial.

### 13.1 Additional/versioned tutorial entries to track separately
- Bootstrap 3
- Bootstrap 4
- Bootstrap 5 (already registered)
- Cyber Security
- Intro to Programming
- Intro to HTML & CSS
- Bash
- Tools
- UTF-8 / Emojis
- Accessibility
- Spaces
- Typing Speed Test
- Code Game
- Code Editor
- Web Templates
- ChatGPT-3.5
- ChatGPT-4
- Google Bard (legacy entry; verify availability and current status before inclusion in active curriculum)

### 13.2 Additional global-nav entries already represented or needing alias resolution
- Gen AI — map to Generative AI only after confirming the current official destination.
- Colors, Icons, SVG, Canvas, Graphics, AJAX, AppML, W3.JS, RWD, Raspberry Pi — map to existing topic tracks where the page is a subtopic/resource, but preserve their own source URL and relationship.
- AWS — map to AWS Cloud only after URL and content equivalence is verified.
- XML, JSON, Git, DSA, Data Science, NumPy, Pandas, SciPy, Matplotlib, Statistics, Google Sheets — already represented in the broader register; exact track/page URL and type still require verification.

### 13.3 Scope correction
Do not treat “60” as the total number of all W3Schools learning resources. It is only the number of links shown in the four main category blocks in the current Tutorials index result. The global navigation is broader and contains additional versions, learning paths, tools, games, and legacy AI entries. B3 must report both counts separately after every entry has been reconciled.

### 13.4 Source links
- Tutorials index: https://www.w3schools.com/tutorials/
- Global navigation: https://nav.w3schools.com/
- HTML tutorial navigation example: https://www.w3schools.com/html/
- Integrated HTML & CSS track: https://www.w3schools.com/htmlcss/

## 14. Batch 5 completion status
- [x] Rechecked current Tutorials index.
- [x] Compared it with global navigation entries.
- [x] Added versioned and supplementary resource candidates to the register.
- [ ] Verify each additional entry's exact destination, current availability, and content type.
- [ ] Resolve aliases and legacy entries without double-counting.
- [ ] Complete all remaining chapter/topic trees.


## 15. Global navigation reconciliation — batch 6

A current crawl of the official Tutorials index, the W3Schools global navigation, and the tutorial directory shows an important distinction:

- The four-category Tutorials index presents its own curated list.
- The global navigation presents a wider catalogue including Bootstrap 3/4/5, Gen AI, Cyber Security, Bash, introductory learning paths, and tools.
- The video/tutorial directory separately groups tutorial cards, references, exercises, quizzes, challenges, and practice problems.

Therefore the earlier “60” count is valid only for the four-category index snapshot; it is not the total W3Schools learning catalogue. The global navigation catalogue should be counted separately after URL deduplication.

### 15.1 Newly reconciled curriculum tracks

#### Bootstrap 3
Source: https://www.w3schools.com/bootstrap/
- Getting started, containers, grid system, typography
- Tables, images, jumbotron, wells, alerts
- Buttons, button groups, glyphicons, badges, progress bars
- Pagination, list groups, panels, dropdowns
- Collapse, tabs/pills, navbar, forms, inputs, carousel, modal, tooltip, popover, scrollspy
- Grid breakpoints and responsive layouts

#### Bootstrap 4
Source: https://www.w3schools.com/bootstrap4/
- Getting started, containers, grid, typography, colors
- Tables, images, jumbotron, alerts
- Buttons, button groups, badges, progress bars, spinners
- Pagination, list groups, cards, dropdowns, collapse
- Navs, navbar, carousel, modal, tooltip, popover, toast, scrollspy
- Utilities, flex, forms, input groups, custom controls, validation
- Grid breakpoints and responsive layout patterns

#### Bash
Source: https://www.w3schools.com/bash/
- Introduction and setup
- Shell commands and script files
- Variables and arguments
- Input/output and comments
- Conditions and loops
- Functions
- Arrays and strings
- Exit status and command chaining
- Navigation tree needs full verification; topics above are a first-pass scope outline, not a claim of complete source sidebar capture.

#### Cyber Security
Source: https://www.w3schools.com/cybersecurity/
- Introduction and security fundamentals
- Threats, vulnerabilities and attack concepts
- Authentication and authorization concepts
- Encryption and secure communication
- Web security and common risks
- Defensive practices and security awareness
- First-pass track outline only; exact chapter tree and page availability require final verification.

#### Generative AI
Source: https://www.w3schools.com/gen_ai/
- Introduction and generative AI concepts
- Models and prompting
- Text, image and other content generation concepts
- Responsible use, limitations and verification
- First-pass track outline only; exact chapter tree requires final verification.

#### Intro to HTML & CSS
Source: https://www.w3schools.com/htmlcss/
- Web page foundations
- HTML structure and content
- CSS styling and layout
- Combining HTML and CSS
- Responsive design concepts
- First-pass track outline; map topic IDs to HTML/CSS tracks to avoid duplicate lessons.

#### Intro to Programming
Source: https://www.w3schools.com/
- Programming concepts and problem solving
- Algorithms, sequence, selection and iteration
- Variables, values, expressions and data types
- Functions and decomposition
- Debugging and testing
- Entry destination is currently resolved through global navigation, but a dedicated canonical tutorial URL was not verified in this pass.

### 15.2 Catalogue governance rules
1. Preserve the source's exact track title and canonical URL.
2. Assign one content type: language, markup, framework, database, domain course, learning path, reference, exercise, quiz, challenge, tool, or legacy.
3. Keep versioned frameworks as separate tracks where the source maintains separate tutorials (e.g., Bootstrap 3/4/5).
4. Do not count a tool or reference as a tutorial course.
5. Record aliases and redirects instead of duplicating tracks.
6. A page is “tree captured” only after its visible navigation/module list is fully inspected. First-pass topic outlines remain provisional.


## 16. Official source re-check and integrated HTML/CSS syllabus — batch 7

Checked the live official pages on 2026-11-04:
- Tutorials index: https://www.w3schools.com/tutorials/
- Global navigation: https://nav.w3schools.com/
- Integrated HTML & CSS track: https://www.w3schools.com/htmlcss/

### 16.1 Integrated HTML & CSS course — verified chapter/module map
The official HTML & CSS track currently exposes these modules:
1. Introduction
2. Environment Setup
3. First Web Page
4. Workflow & Tools
5. HTML & CSS Foundations
   - Essentials
   - Document Structure
   - Text Content
   - Lists & Tables
   - Links & Navigation
   - Images & Media
   - Forms & Validation
   - Reusable Components
6. Styling Core
   - Styling Essentials
   - Selectors & Specificity
   - Cascade & Inheritance
   - Typography
   - Colors & Backgrounds
   - Box Model
7. Layout Fundamentals
   - Positioning & Z-Index
   - Flexbox
   - CSS Grid
   - Layout Patterns
   - Responsive Design
   - Responsive Components
8. Enhancements
   - Custom Properties
   - Calc & Functions
   - Transitions
   - Transforms
   - Animations
   - Effects & Filters
9. Quality
   - Accessibility
   - Design Systems
   - Performance
   - Debugging & Testing
   - Tooling & Automation
10. Practice & Exams
   - Landing Page Project
   - Exercises
   - Quiz

This is a dedicated learning path with its own curated sequence. It overlaps HTML and CSS topic domains but should remain a separate path record linked to canonical HTML/CSS lesson nodes rather than duplicating the underlying lessons.

### 16.2 Reference and practice catalogues — keep outside B3 tutorial count
The official W3Schools navigation separately exposes:
- References (language/API reference collections)
- Exercises
- Quizzes
- Challenges
- Practice Problems
These are related learning assets and will be inventoried in B4/B5, not counted as tutorial tracks in B3.

### 16.3 Corrected counting rule
The “60” number previously recorded refers to the four category blocks from the Tutorials index snapshot, not a definitive all-time or global catalogue total. The global navigation includes additional tracks and resources, and the main page now advertises “40+” in its condensed all-languages presentation. Future progress reports must quote the exact source view and date, not present 60 as the total W3Schools catalogue.

### 16.4 Remaining B3 audit work
- Verify exact canonical URLs for every global-navigation entry.
- Separate tutorial courses, version tracks, learning paths, references, exercises, and tools.
- Capture complete chapter/module trees for all tutorial courses.
- Resolve legacy entries (ChatGPT-3.5, ChatGPT-4, Google Bard) as active, renamed, or retired based on destination evidence.
- Mark complete only after all in-scope entries have a verified URL and a fully captured source navigation tree, or an explicit documented exclusion.


## 17. Source-grounded navigation audit — batch 8

Checked official pages on 2026-11-04. This section supersedes any earlier provisional outline where the live page exposes a more specific menu.

### 17.1 PHP — detailed navigation captured
Source: https://www.w3schools.com/php/
- Introduction: PHP Intro, Install, Syntax, Comments, multiline comments
- Variables: variables, scope
- Output and types: Echo/Print, Data Types
- Strings: string functions, modify, concatenate, slice, escape characters
- Numbers, casting, math, constants, magic constants, operators
- Conditions: If, If operators, If/Else, shorthand if, nested if, Switch, Match
- Loops: while, do-while, for, foreach, break, continue
- Functions
- Arrays: indexed, associative, create, access, update, add, remove, sorting, multidimensional, array functions
- Superglobals: $GLOBALS, $_SERVER, $_REQUEST, $_POST, $_GET
- RegEx and RegEx functions
- Forms: form handling, validation, required fields, URL/e-mail, complete form
- Advanced: date/time, include, file handling, open/read, create/write, upload, cookies, sessions, filters, advanced filters, callbacks, JSON, exceptions
- OOP: classes/objects, constructor/destructor, access modifiers, inheritance, constants, abstract classes, interfaces, traits, static methods/properties, namespaces, iterables
- MySQL database: connect, create DB/table, insert, last ID, multiple insert, prepared statements, select, where, order, delete, update, limit
- PHP reference categories: Array, Calendar, Date, Directory, Error, Exception, Filesystem, Filter, FTP, JSON, Keywords, Libxml, Mail, Math, Misc, MySQLi, Network, Output Control, RegEx, SimpleXML, Stream, String, Variable Handling, XML Parser, Zip, Timezones

### 17.2 CSS — verified visible navigation sections
Source: https://www.w3schools.com/css/
- Introduction, Syntax, Selectors, Grouping Selectors, Code Challenge
- How To: external, internal, inline, multiple style sheets
- Comments, Errors
- Colors: RGB/RGBA, HEX/HEXA, HSL/HSLA
- Backgrounds: color, image, repeat, attachment, shorthand
- Borders: style, width, color, sides, shorthand, rounded borders
- Margins and margin collapse
- Flexbox: intro, container, justify-content, align-items, items, responsive
- Grid: intro, container, tracks, gaps, alignment, items, named grid items, alignment, order, 12-column layout
- @supports
- Responsive Web Design: RWD intro
- Note: this current extracted menu is not a complete CSS property/reference catalogue; CSS reference topics are tracked separately under B4.

### 17.3 HTML & CSS integrated path — source confirms separate sequence
Source: https://www.w3schools.com/htmlcss/
- Introduction, Environment Setup, First Web Page, Workflow & Tools
- Foundations: Essentials, Document Structure, Text Content, Lists & Tables, Links & Navigation, Images & Media, Forms & Validation, Reusable Components
- Styling Core: Styling Essentials, Selectors & Specificity, Cascade & Inheritance, Typography, Colors & Backgrounds, Box Model
- Layout: Positioning & Z-Index, Flexbox, CSS Grid, Layout Patterns, Responsive Design, Responsive Components
- Enhancements: Custom Properties, Calc & Functions, Transitions, Transforms, Animations, Effects & Filters
- Quality: Accessibility, Design Systems, Performance, Debugging & Testing, Tooling & Automation
- Practice & Exams: Landing Page Project, Exercises, Quiz

### 17.4 JavaScript and Python extraction limitation
- JavaScript page checked: https://www.w3schools.com/js/ . The page confirms a tutorial and points to examples, exercises, quiz and reference, but the extracted page view did not expose the left-side chapter tree. Keep the detailed tree as pending until that navigation is fully captured.
- Python page checked: https://www.w3schools.com/python/ . The extracted page view exposed the early chapters (Intro, Get Started, Syntax, Statements, Output, Comments, Variables and subtopics, Data Types, Numbers, Casting, Strings and string subtopics) and links to File Handling and Database Handling. The remaining menu tree requires a dedicated extraction pass.

### 17.5 Reference boundary
The CSS page explicitly separates CSS Reference from CSS Tutorial and lists reference collections (properties, browser support, selectors, combinators, pseudo-classes, pseudo-elements, at-rules, functions, animatable, web-safe fonts, units, colors, default values, entities, aural). These are B4 reference inventory items, not B3 tutorial chapters.

## 18. Quality correction to earlier B3 drafts
Earlier B3 batches included some first-pass topic outlines inferred from general curriculum knowledge where the live navigation extraction was incomplete. Those outlines are useful as coverage prompts only, not verified W3Schools source trees. The status field in the CSV must remain “first-pass”, “queued”, or “pending” until the exact source navigation has been inspected. No draft outline is to be treated as an authoritative source transcript.


## 19. Count and evidence reconciliation — batch 9

Rechecked the live official Tutorials index on 2026-11-04 and recounted each category item individually. The correct four-block total is **58**, not 60 or 59: HTML & CSS 12, JavaScript 10, Backend 23, Data Analytics 13. Bash is visible in the wider global navigation but is not listed in those four category blocks, so it is retained as a separate supplementary track in the register rather than inserted into the four-block count.

The register's first five legacy rows also overstated navigation capture. Current evidence states: HTML detailed tree recorded; CSS visible menu captured but additional topics remain pending; JavaScript page verified but full sidebar not extracted; Python early menu only; SQL detailed tree recorded. The CSV status values are corrected to reflect this distinction. Draft topic outlines are not treated as fully captured source trees.


## 20. SQL and Bootstrap 5 source navigation — batch 10

Checked official tutorial pages on 2026-11-04:

### 20.1 SQL — chapter navigation captured
Source: https://www.w3schools.com/sql/default.asp

**SQL Tutorial navigation**
- Foundations: Intro, Syntax
- Querying: SELECT, SELECT DISTINCT, WHERE, ORDER BY, AND, OR, NOT, NULL values, TOP
- Data changes: INSERT INTO, UPDATE, DELETE, INSERT INTO SELECT
- Filtering and expressions: LIKE, wildcards, IN, BETWEEN, aliases, CASE, NULL functions, operators
- Aggregation: aggregate functions, MIN, MAX, COUNT, SUM, AVG
- Relationships and set operations: JOINs (INNER, LEFT, RIGHT, FULL, SELF), UNION, UNION ALL, GROUP BY, HAVING, EXISTS, ANY, ALL
- Database objects and advanced topics: SELECT INTO, stored procedures, comments

**SQL Database navigation**
- Create DB, Drop DB, Backup DB
- Create Table, Drop Table, Alter Table
- Constraints: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
- Create Index, Auto Increment, Dates, Views
- SQL Injection, Parameters, Prepared Statements, Hosting

**Boundary:** SQL Exercises, Examples, Quiz, Syllabus and SQL reference collections are related assets but are not tutorial chapters; route them to B4/B5 or the relevant curriculum planning task. The live navigation explicitly separates the SQL Tutorial, SQL Database, SQL Cert and SQL References groups.

### 20.2 Bootstrap 5 — current visible menu captured
Source: https://www.w3schools.com/bootstrap5/
- Getting started, containers, grid basics, typography, colors (text and background)
- Tables, images, jumbotron, alerts
- Buttons, button groups, badges, progress bars, spinners
- Pagination, list groups, cards, dropdowns, collapse
- Navs, navbar, carousel, modal, tooltip, popover, toast, scrollspy, offcanvas
- Utilities, dark mode, flex
- Forms: forms, select menus, checks/radios, range, input groups, floating labels, validation
- Grid system and responsive breakpoints: stacked/horizontal, XS, SM, MD, LG, XL, XXL, examples
- Separate supporting assets: basic template, editor, exercises, quiz, syllabus, study plan, interview prep

The supporting assets above are not merged into the tutorial chapter count. Bootstrap 5 also explicitly distinguishes itself from Bootstrap 3 and 4; keep version tracks separate.

### 20.3 Evidence and completion status
The official SQL tutorial extraction exposes both SQL Tutorial and SQL Database navigation groups. The Bootstrap 5 extraction exposes its main component, form and grid groups. These two track menus are now recorded as source-captured for this audit pass. This does not mean the whole B3 register is complete; the remaining tracks still require canonical URL verification and menu capture.
