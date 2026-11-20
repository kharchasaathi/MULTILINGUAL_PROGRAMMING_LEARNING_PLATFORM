# Python Course — W3Schools Coverage Audit

Audit date: 2026-11-20  
Reference: [W3Schools Python Syllabus](https://www.w3schools.com/python/python_syllabus.asp), [Python Tutorial](https://www.w3schools.com/python/default.asp), and the linked library tutorials.

## Baseline

- Curriculum index: **283 English Python lesson entries** across PY1–PY34.
- Source inventory: reconciled to **283 Python rows**, including PY15.9 file deletion, PY9.7 tuple methods and PY11.8 frozenset.
- Progress tracker: reconciled to **283 Python rows**.
- Five worked examples and five topic-specific MCQs are the authoring target per lesson (1,415 expected each at this baseline); CI execution is the authority for validated counts.
- All lessons remain draft. Telugu translation and lesson-renderer/playground integration remain pending.

## W3Schools 8-chapter / 45-module mapping

| Chapter | W3Schools module | Current CodeSaathi mapping | Audit status |
|---|---|---|---|
| 1 Getting started | Python HOME | PY1.1 | Mapped; subtopic review pending |
| 1 Getting started | Python Intro | PY1.1 | Mapped; subtopic review pending |
| 1 Getting started | Python Get Started | PY1.2 | Mapped; subtopic review pending |
| 1 Getting started | Python Syntax | PY1.3–PY1.4 | Mapped; subtopic review pending |
| 1 Getting started | Python Comments | PY1.5 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Variables | PY1.6 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Data Types | PY1.7; PY3.1–PY3.5 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Numbers | PY1.8; PY18 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Casting | PY1.9 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Strings | PY12 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Booleans | PY3.4 | Mapped; subtopic review pending |
| 2 Variables and data types | Python Operators | PY4 | Mapped; subtopic review pending |
| 3 Collections | Python Lists | PY8 | Mapped; subtopic review pending |
| 3 Collections | Python Tuples | PY9.1–PY9.7 | Tuple construction, access, update patterns, unpacking, iteration, joining, count() and index() mapped; broader exercise-level review pending |
| 3 Collections | Python Sets | PY11.1–PY11.8 | Set creation, operations, methods and immutable frozenset mapped; detailed subtopic review pending |
| 3 Collections | Python Dictionaries | PY10 | Mapped; subtopic review pending |
| 4 Control flow and functions | Python If...Else | PY5 | Mapped; subtopic review pending |
| 4 Control flow and functions | Python While Loops | PY6.1 | Mapped; subtopic review pending |
| 4 Control flow and functions | Python For Loops | PY6.2–PY6.8 | Mapped; subtopic review pending |
| 4 Control flow and functions | Python Functions | PY7; PY22 | Mapped; subtopic review pending |
| 4 Control flow and functions | Python Lambda | PY7.8 | Mapped; subtopic review pending |
| 4 Control flow and functions | Python Arrays | PY27 | Mapped; subtopic review pending |
| 5 Object-oriented Python | Python Classes/Objects | PY26 | Mapped; class methods, properties, encapsulation, inner classes and magic-method families included; subtopic review pending |
| 5 Object-oriented Python | Python Inheritance | PY26.7 | Mapped; subtopic review pending |
| 5 Object-oriented Python | Python Iterators | PY13; PY22.1–PY22.3 | Mapped; subtopic review pending |
| 5 Object-oriented Python | Python Polymorphism | PY26.8 | Mapped; subtopic review pending |
| 5 Object-oriented Python | Python Scope | PY7.7; PY22.5 | Mapped; subtopic review pending |
| 5 Object-oriented Python | Python Modules | PY16 | Mapped; subtopic review pending |
| 6 Dates, math, JSON and regex | Python Dates | PY17 | Mapped; subtopic review pending |
| 6 Dates, math, JSON and regex | Python Math | PY18 | Mapped; subtopic review pending |
| 6 Dates, math, JSON and regex | Python JSON | PY15.8; PY23.5–PY23.6 | Mapped; subtopic review pending |
| 6 Dates, math, JSON and regex | Python RegEx | PY19 | Mapped; subtopic review pending |
| 6 Dates, math, JSON and regex | Python PIP | PY20 | Mapped; subtopic review pending |
| 7 Errors, input and files | Python Try...Except | PY14 | Mapped; subtopic review pending |
| 7 Errors, input and files | Python User Input | PY2 | Mapped; subtopic review pending |
| 7 Errors, input and files | Python String Formatting | PY12.5 | Mapped; subtopic review pending |
| 7 Errors, input and files | Python File Handling | PY15.1–PY15.9 | File read/write/CSV/JSON and Delete Files mapped; detailed subtopic review pending |
| 8 Data science and web libraries | Python NumPy | PY29–PY31; related PY25 coverage | Mapped; subtopic review pending |
| 8 Data science and web libraries | Python Pandas | PY25; PY32 | Mapped; subtopic review pending |
| 8 Data science and web libraries | Python SciPy | PY33 | Mapped; pinned-dependency example execution passed in Python CI |
| 8 Data science and web libraries | Python Django | Separate Django Tutorial tab/course | Not authored yet |
| 8 Data science and web libraries | Python Matplotlib | PY25.7; PY28; PY34.1–PY34.10 | **Core sequence authored; pinned-dependency example execution passed in Python CI** |
| 8 Data science and web libraries | Python Machine Learning | Separate Machine Learning Tutorial tab/course | Not authored yet |
| 8 Data science and web libraries | Python MySQL | Separate MySQL Tutorial tab/course; Python connector integration | Not authored yet |
| 8 Data science and web libraries | Python MongoDB | Separate MongoDB Tutorial tab/course; Python driver integration | Not authored yet |

## Separate tutorial / tab policy

W3Schools also lists Django, MySQL, MongoDB and Machine Learning as distinct tutorial destinations in its tutorial catalogue. CodeSaathi will keep these as separate course tabs rather than folding their full syllabi into Python lesson modules. The Python course may provide short orientation and prerequisite links, while each dedicated course owns its own curriculum, exercises, projects and progress.

- Django → separate Django course
- MySQL → separate MySQL course, with Python database integration lessons where appropriate
- MongoDB → separate MongoDB course, with Python driver integration lessons where appropriate
- Machine Learning → separate Machine Learning course, with Python/NumPy/Pandas/Matplotlib prerequisites

## Confirmed gaps / next work

1. Validate the new PY34.1–PY34.10 Matplotlib lessons (50 examples and 50 MCQs) and review the broader Matplotlib subtopic coverage. Existing Histograms, Pie Charts and Subplots remain in place.
2. Run a detailed subtopic-level check for every one of the 45 W3Schools syllabus modules; the mapping above is a navigation map, not proof that every page subtopic is complete.
3. Verify NumPy, Pandas and SciPy examples against the pinned CI environment. The Python workflow now installs SciPy explicitly for PY33.
4. Build separate Django, Machine Learning, MySQL and MongoDB course tabs/curricula; do not duplicate their full content inside Python.
5. Keep lessons in draft until CI, editorial review, translation, renderer integration and release checks pass.

## Important counting rule

The 283 figure is the current indexed English lesson count, **not** a percentage-complete claim. A defensible overall percentage requires the page/subtopic inventory to be fully enumerated, deduplicated and mapped. The 45-module W3Schools syllabus and its deeper page subtopics must not be treated as 45 lessons.
