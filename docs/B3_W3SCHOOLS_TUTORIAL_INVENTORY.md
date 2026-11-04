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

**Catalogue count in this captured index:** 59 tutorial tracks. This is a point-in-time count of the links visible in the inspected index, not a guarantee that every item is a programming language or a full-length programming course. Some are tools, frameworks, libraries, and specialist subjects.

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

The catalogue below is inventoried, but each track's full chapter/subtopic tree must be captured from its own live navigation page before B3 can be considered fully audited. The queue is deliberately explicit so that no track is silently omitted.

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
