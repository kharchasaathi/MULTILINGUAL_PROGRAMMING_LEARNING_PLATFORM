# B4 — W3Schools Reference Inventory

**Status:** In progress — initial official reference catalogue captured  
**Audit date:** 2026-11-04  
**Primary source:** https://www.w3schools.com/references/  
**Purpose:** Identify official reference/documentation resources relevant to the platform curriculum. This is a catalogue and taxonomy, not a transcription of reference content.

## 1. Scope and rules

B4 records reference documentation (tag/API/property/function/keyword/class/attribute/charset/type references). Tutorial chapter trees remain in B3. Exercises, quizzes, challenges and practice problems belong to B5. Certificates, courses, bootcamps, editors and hosted services are not technical reference documents and are excluded.

W3Schools' reference landing page describes references as documentation explaining features, syntax, properties and functions. The page groups resources under HTML & CSS, JavaScript and Backend, while the broader site navigation also exposes reference collections such as HTML DOM, character sets and emojis. The catalogue is therefore split into:
- **Official reference catalogue:** entries explicitly linked from the references landing page.
- **Supporting reference families:** sub-reference pages or navigation resources that should be linked to a parent reference rather than counted as independent top-level references.
- **Not listed / not verified:** do not infer a dedicated W3Schools reference merely because a tutorial exists.

## 2. Official reference catalogue — top-level entries

### 2.1 HTML & CSS
1. HTML Tags Reference — https://www.w3schools.com/tags/default.asp
2. CSS Reference — https://www.w3schools.com/cssref/index.php
3. W3.CSS Reference — https://www.w3schools.com/w3css/w3css_references.asp
4. Bootstrap 3 Reference — https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp
5. Bootstrap 4 Reference — https://www.w3schools.com/bootstrap4/bootstrap_ref_all_classes.php
6. Color Names Reference — https://www.w3schools.com/colors/colors_names.asp
7. Icons Reference — https://www.w3schools.com/icons/icons_reference.asp
8. SVG Reference — https://www.w3schools.com/graphics/svg_reference.asp
9. Canvas Reference — https://www.w3schools.com/graphics/canvas_reference.asp
10. Sass Reference — https://www.w3schools.com/sass/sass_functions.php
11. UTF-8 Charset Reference — https://www.w3schools.com/charsets/ref_html_utf8.asp
12. UTF-8 Emojis Reference — https://www.w3schools.com/charsets/ref_emoji.asp

### 2.2 JavaScript
13. JavaScript Reference — https://www.w3schools.com/jsref/default.asp
14. HTML DOM Reference — https://www.w3schools.com/jsref/default.asp (HTML DOM is a section within the combined JavaScript and HTML DOM reference; retain as a linked sub-reference, not a duplicate top-level document)
15. jQuery Reference — https://www.w3schools.com/jquery/jquery_ref_overview.asp
16. Vue Reference — https://www.w3schools.com/vue/vue_ref_builtin-attributes.php (the linked landing item is the Vue built-in attributes reference; verify broader API coverage separately)
17. AngularJS Reference — https://www.w3schools.com/angularjs/angularjs_ref_directives.asp
18. JSON Reference — https://www.w3schools.com/jsref/jsref_obj_json.asp
19. AppML Reference — https://www.w3schools.com/appml/appml_reference.asp
20. W3.JS Reference — https://www.w3schools.com/w3js/w3js_references.asp

### 2.3 Backend
21. Python Reference — https://www.w3schools.com/python/python_reference.asp
22. SQL Keywords Reference — https://www.w3schools.com/sql/sql_ref_keywords.asp
23. MySQL Reference — https://www.w3schools.com/mysql/mysql_datatypes.asp (linked reference entry currently resolves to a data-types page; this is a partial entry point, not a claim of a complete MySQL reference index)
24. PHP Reference — https://www.w3schools.com/php/php_ref_overview.asp
25. Java Reference — https://www.w3schools.com/java/java_ref_reference.asp
26. C Reference — https://www.w3schools.com/c/c_ref_reference.php
27. C++ Reference — https://www.w3schools.com/cpp/cpp_ref_reference.asp
28. Django Reference — https://www.w3schools.com/django/django_ref_template_tags.php
29. ASP Reference — https://www.w3schools.com/asp/asp_ref_vbscript_functions.asp
30. Node.js Reference — https://www.w3schools.com/nodejs/nodejs_reference.asp
31. XML Reference — https://www.w3schools.com/xml/dom_nodetype.asp (specific reference entry point; broader XML reference coverage needs a dedicated pass)

**Important:** the top-level reference landing page exposes a curated set, not a one-to-one reference for every tutorial. C, C++, Bootstrap, W3.CSS, jQuery, Django, JSON, Node.js, AngularJS, MySQL, Sass, SVG, Canvas, Colors, Icons, AppML, W3.JS, XML and ASP are explicitly visible in the landing page catalogue. C# and several newer tracks are not listed there. Do not invent missing reference pages.

## 3. Supporting reference families (sub-reference inventory)

### 3.1 HTML
The HTML reference page exposes:
- Elements/tags, ordered alphabetically and by category
- Browser support
- Attributes and global attributes
- Event attributes
- Colors and Canvas
- Audio/video
- Character sets, doctypes, URL encoding
- Language codes and country codes
- HTTP messages and methods
- PX-to-EM conversion and keyboard shortcuts

These are sub-reference families linked under HTML, not independent tutorial tracks.

### 3.2 CSS
The CSS reference is a broad lookup surface. Inventory the following sub-reference families for the platform's own schema:
- Properties and browser support
- Selectors, combinators, pseudo-classes, pseudo-elements
- At-rules and functions
- Animatable properties
- Web-safe fonts
- Units, colors, default values, entities and aural properties

The exact property list is large and should be extracted into a normalized machine-readable catalogue in a later B4 batch rather than copied into this overview.

### 3.3 JavaScript / HTML DOM
Treat the combined JS/HTML DOM reference as two linked domains:
- JavaScript built-ins: objects, constructors, properties, methods, statements, operators, functions, errors and browser APIs where present.
- HTML DOM: document/window, nodes, elements, collections, events, styles and DOM methods/properties.

### 3.4 SQL and database references
- SQL keyword reference is distinct from SQL tutorial and database how-to content.
- MySQL data types are currently the directly verified entry point; verify other MySQL reference families before declaring complete.
- SQL functions, data types, operators, statements and constraints should be normalized as reference families, not treated as tutorial lessons.

### 3.5 Framework/library references
For Bootstrap, W3.CSS, jQuery, Vue, AngularJS, Django, Node.js, Sass, AppML and W3.JS, keep the official reference landing/page separate from tutorial content. Record exact version and framework scope where applicable. Do not silently map Bootstrap 3/4 reference pages to Bootstrap 5.

## 4. Exclusions and gaps

- No dedicated reference link was visible in the official top-level reference catalogue for C#, R, Go, Kotlin, Rust, Swift, TypeScript, PostgreSQL, MongoDB, AWS Cloud, NumPy, Pandas, SciPy, Matplotlib, Statistics, Excel, Google Sheets, Generative AI, AI or DSA during this audit. This means “not listed in the inspected W3Schools reference index”, not that no documentation exists elsewhere.
- Bootstrap 5 has a tutorial and practice links, but the inspected reference index explicitly lists Bootstrap 3 and Bootstrap 4. Do not assume a Bootstrap 5 reference page.
- Angular is listed in the navigation, but the references landing page explicitly lists AngularJS, not a separate Angular reference.
- The references page currently groups the main catalogue into HTML & CSS, JavaScript and Backend. Data Analytics-specific reference pages are not presented as a separate section in the extracted index.
- Third-party official documentation (MDN, ECMAScript, Python docs, Java docs, vendor docs, etc.) may be considered in a later source policy; it must be clearly distinguished from W3Schools references.

## 5. B4 acceptance criteria

- [x] Official W3Schools References landing page located and inspected.
- [x] Top-level reference links grouped by domain.
- [x] Exact destination URLs recorded for the initial official catalogue.
- [x] Sub-reference families distinguished from top-level documents.
- [x] Tutorials, exercises, quizzes, tools and certificates excluded from reference counts.
- [x] Missing/not-listed reference coverage explicitly documented without inventing URLs.
- [ ] Verify every recorded URL and redirects.
- [ ] Capture full sub-reference taxonomies for HTML, CSS, JavaScript/DOM, SQL, Python and other core tracks.
- [ ] Build normalized topic/property/function/keyword registers.
- [ ] Review official vendor/standards references beyond W3Schools where required.

**B4 status: IN PROGRESS.** This first batch establishes the catalogue baseline only. It is not yet the complete reference taxonomy.

## 6. Sources checked
- W3Schools References landing page: https://www.w3schools.com/references/
- HTML Tags Reference: https://www.w3schools.com/tags/default.asp
- CSS Reference: https://www.w3schools.com/cssref/index.php
- JavaScript and HTML DOM Reference: https://www.w3schools.com/jsref/default.asp
- Python Reference: https://www.w3schools.com/python/python_reference.asp
- SQL Keywords Reference: https://www.w3schools.com/sql/sql_ref_keywords.asp
- PHP Reference: https://www.w3schools.com/php/php_ref_overview.asp
- Java Reference: https://www.w3schools.com/java/java_ref_reference.asp
- C Reference: https://www.w3schools.com/c/c_ref_reference.php
- C++ Reference: https://www.w3schools.com/cpp/cpp_ref_reference.asp
- Bootstrap 3 Classes Reference: https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp


## 7. Verified taxonomy expansion — batch 1 (2026-11-04)

This batch records the visible taxonomy exposed by the current W3Schools reference landing pages. It is a family-level inventory, not a full row-by-row extraction of every CSS property, DOM member or SQL keyword.

### 7.1 CSS reference families — landing-page confirmation

The CSS reference index advertises the following distinct reference families:
1. CSS Properties
2. CSS Browser Support
3. CSS Selectors
4. CSS Combinators
5. CSS Pseudo-classes
6. CSS Pseudo-elements
7. CSS At-rules
8. CSS Functions
9. CSS Animatable
10. CSS Web Safe Fonts
11. CSS Units
12. PX-to-EM Conversion
13. CSS Colors
14. CSS Default Values
15. CSS Entities
16. CSS Aural

The current At-rules reference visibly includes: `@charset`, `@container`, `@counter-style`, `@font-face`, `@font-palette-values`, `@import`, `@keyframes`, `@layer`, `@media`, `@namespace`, `@page`, `@property`, `@scope`, `@starting-style` and `@supports`. Store these as at-rule records, not CSS properties.

### 7.2 JavaScript and HTML DOM — current index taxonomy

The combined JavaScript/HTML DOM reference currently exposes these JavaScript primitive types: String, Number, Boolean, BigInt, Symbol, undefined and null.

Object/method/property reference groups include: Array, Boolean, Classes, Date, Error, Function, Global, Iterator, JSON, Map, Math, Number, Object, Operators, Precedence, Promise, Proxy, Reflect, RegExp, Set, Statements, String, Temporal and Typed Array.

Window object groups: Window, History, Location, Navigator and Screen.

HTML DOM groups: Document, Element, Attributes, Events, Event Objects, Collection and Style.

Web API groups: Canvas, Console, Fetch, Fullscreen, Geolocation, History, MediaQuery, Storage and Validation.

HTML element reference coverage is also linked from this combined index. Keep it cross-linked to the HTML Tags reference rather than counting each element twice.

### 7.3 Python reference taxonomy

The Python reference index exposes:
- Core reference families: Built-in Functions, String Methods, List Methods, Dictionary Methods, Tuple Methods, Set Methods, File Methods, Keywords, Exceptions and Glossary.
- Module reference families: Random, Requests, Math and CMath on the compact reference landing page.
- The wider Python navigation additionally exposes the Standard Library Modules reference, including modules such as json, keyword, locale, logging, math and multiprocessing. Treat the standard-library module catalogue as a separate sub-reference collection.

### 7.4 SQL keyword reference

The SQL Keywords reference is a reserved-keyword lookup table. The currently visible catalogue includes command/statement families (SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, TRUNCATE), filtering and sorting (WHERE, DISTINCT, ORDER BY, GROUP BY, HAVING, LIMIT, TOP), joins (JOIN, INNER/LEFT/RIGHT/FULL OUTER JOIN), set operations (UNION, UNION ALL), constraints and keys (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, DEFAULT, NOT NULL), and predicates/operators (AND, OR, NOT, IN, EXISTS, BETWEEN, LIKE, IS NULL). Preserve the full keyword list as individual records in the later normalized SQL register; this summary is illustrative, not exhaustive.

### 7.5 Source URLs and verification notes

- CSS reference/tutorial index and its advertised families: https://www.w3schools.com/css/
- CSS At-rules reference: https://www.w3schools.com/cssref/css_ref_atrules.php
- JavaScript and HTML DOM reference: https://www.w3schools.com/jsref/default.asp
- Python reference: https://www.w3schools.com/python/python_reference.asp
- Python built-in functions: https://www.w3schools.com/python/python_ref_functions.asp
- Python keywords: https://www.w3schools.com/python/python_ref_keywords.asp
- Python standard-library modules: https://www.w3schools.com/python/python_ref_modules.asp
- SQL Keywords reference: https://www.w3schools.com/sql/sql_ref_keywords.asp

Verification note: the CSS family list was confirmed on the current CSS reference index; the at-rule list on the dedicated At-rules page; the JS/DOM groups on the combined reference page; Python groups on the Python reference/navigation; and SQL families on the keyword table. This does not yet verify every individual member page or every catalogue URL in the CSV.


## 8. HTML reference taxonomy expansion — batch 2 (2026-11-04)

### 8.1 HTML reference families

The HTML Tags Reference links a set of supporting lookup families. Keep these attached to the HTML reference parent:
- Element/tag directory: alphabetical listing and category-based listing.
- Browser support matrix for HTML elements.
- Element-specific attributes and global attributes.
- Event-handler attributes.
- Color names and Canvas reference.
- Audio and video reference families.
- Character sets and encoding.
- Doctypes and URL encoding.
- Language codes and country codes.
- HTTP messages and HTTP methods.
- PX-to-EM conversion and keyboard shortcuts.

### 8.2 Verified supporting HTML reference pages

The following destinations were opened and resolved as W3Schools reference pages during this batch:
- HTML Attributes: https://www.w3schools.com/tags/ref_attributes.asp
- HTML Global Attributes: https://www.w3schools.com/tags/ref_standardattributes.asp
- HTML Event Attributes: https://www.w3schools.com/tags/ref_eventattributes.asp
- HTML Color Names: https://www.w3schools.com/tags/ref_colornames.asp
- HTML Canvas Reference: https://www.w3schools.com/tags/ref_canvas.asp
- HTML Reference by Function: https://www.w3schools.com/tags/ref_byfunc.asp

These are supporting reference pages, not additional top-level items in the 31-row catalogue. The HTML reference landing and its supporting pages were verified to resolve; individual tag/attribute/event rows still need extraction into a normalized CSV register.

### 8.3 Normalization rules for the forthcoming HTML member register

Use separate record types and stable IDs:
- `html_element`: one row per element; retain semantic category and browser-support source.
- `html_attribute`: one row per attribute; retain applicable element(s), global/specific classification and value type where stated.
- `html_event_attribute`: one row per event handler attribute; link its event category and applicable element scope.
- `html_reference_family`: one row per lookup family (audio, video, charset, doctype, URL encoding, language/country codes, HTTP, keyboard shortcuts, conversion).
- Avoid treating obsolete/deprecated elements as recommended current practice; preserve status notes when the source marks them.
- Do not copy explanatory prose or examples; record names, classifications, relationships and source URLs only.

### 8.4 Scope limitation

This batch confirms reference-page destinations and family structure. It does not yet claim a complete element list, attribute list, event list, browser compatibility matrix or full HTML Living Standard coverage.


## 9. HTML member-register progress — batch 3 (2026-11-04)

Created `docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv` as the first machine-readable supporting taxonomy register. It currently contains 14 records: seven HTML reference-family records and seven grouped event-family records. Event names are retained as source groupings rather than falsely represented as a fully normalized one-event-per-row inventory.

The event groups cover window, form/focus, keyboard, mouse, drag/scroll, clipboard and media events. The source labels `onmousewheel` deprecated; preserve that warning for later standards review. The source list is a W3Schools teaching reference and should not be treated as the current normative browser-platform specification.

The register also distinguishes verified family landing pages from pending destination checks for additional families. Individual HTML element rows, individual attribute rows, global-attribute rows, per-event rows, element-to-attribute relationships and browser-support values remain outstanding.


## 10. HTML element member extraction — batch 4 (2026-11-04)

Expanded `docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv` with 122 individual `html_element` records based on the current W3Schools alphabetical HTML tag index. The index includes the comment and doctype entries, element names, and the grouped heading entry `h1-h6`; therefore 122 register rows should not be interpreted as 122 distinct HTML element names.

The source explicitly labels legacy entries including `acronym`, `applet`, `basefont`, `big`, `center`, `dir`, `font`, `frame`, `frameset`, `noframes`, `strike` and `tt` as not supported in HTML5. These are retained for historical/reference completeness and must be clearly separated from recommended modern HTML in teaching content.

This is the W3Schools index snapshot, not an assertion that it equals the complete current WHATWG HTML Living Standard element set. Next extraction: per-element attributes and global attributes, then one-row-per-event records and classification by semantic category.
