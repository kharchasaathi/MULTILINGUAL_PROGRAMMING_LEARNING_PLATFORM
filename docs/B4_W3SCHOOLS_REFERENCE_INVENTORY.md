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


## 11. HTML global attributes and event handlers — batch 5 (2026-11-04)

Expanded `docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv` with:
- 18 individual global-attribute records from the W3Schools global attributes table.
- 71 individual event-handler records across window, form/focus, keyboard, mouse, drag/scroll, clipboard and media groups.

The W3Schools global-attribute table includes `accesskey`, `class`, `contenteditable`, `data-*`, `dir`, `draggable`, `enterkeyhint`, `hidden`, `id`, `inert`, `inputmode`, `lang`, `popover`, `spellcheck`, `style`, `tabindex`, `title` and `translate`. This is a source-specific snapshot. The WHATWG HTML Standard currently exposes additional global attributes (for example `autocapitalize`, `autofocus`, `nonce`, microdata attributes and `writingsuggestions`); the platform must keep W3Schools coverage and modern standards coverage distinguishable rather than silently mixing them.

The event handler names were normalized one per row from the W3Schools event reference. Applicability and status are not inferred from the event name alone: deprecated/obsolete items and event scope require a later standards/browser audit. The current register has not yet completed element-specific attribute rows or attribute-to-element relationships.


## 12. CSS member-register foundation — batch 6 (2026-11-04)

Created `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv` with 36 initial records:
- 15 reference-family records (properties, browser support, selectors, combinators, pseudo-classes/elements, at-rules, functions, animatable, fonts, units, colors, default values, entities and aural).
- 6 selector-type records (type, ID, universal, class, attribute and nesting selectors).
- 15 individual at-rule records, including `@container`, `@layer`, `@media`, `@property`, `@scope` and `@supports`.

The current W3Schools CSS index confirms the reference families and the CSS selector page confirms the selector categories. The dedicated at-rules page lists the 15 at-rules recorded here. The CSS properties index itself contains a much larger alphabetical list; individual property extraction is not yet complete.

Important data-quality note: only the CSS Properties, CSS Selectors and CSS At-rules destinations have been confirmed in this batch. Other CSS family URLs are provisional candidates and explicitly marked pending verification in the CSV. Do not use pending URLs as authoritative navigation links until checked.


## 13. CSS selector taxonomy expansion — batch 7 (2026-11-04)

Expanded `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv` by 44 records:
- 4 combinators: descendant, child, adjacent sibling and general sibling.
- 33 pseudo-class entries, including interaction, link, structural, language and form-validation states.
- 7 pseudo-elements: `::after`, `::before`, `::first-letter`, `::first-line`, `::marker`, `::placeholder`, `::selection`.

The selector names and basic groupings are based on the W3Schools CSS selector reference. This is a source snapshot, not a claim that the W3Schools list contains every current Selectors Level 4/5 selector. Modern selector additions and browser support require a separate standards compatibility pass. <https://www.w3schools.com/cssref/css_selectors.php>

CSS property extraction is still outstanding. The main W3Schools CSS Reference index is the intended source; its alphabetical property list is much larger than the current register. Do not infer a complete property count from this batch.


## 14. CSS property extraction — batch 8 (2026-11-04)

Added 121 individual CSS property records to `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv`, covering the alphabetical A–C segment from `accent-color` through `cursor`. Descriptions are concise catalog summaries, not copied tutorial prose. The `@charset` and other at-rules are tracked separately as at-rule records, not misclassified as CSS properties. The legacy `clip` property is marked deprecated in the source.

Source: W3Schools CSS Properties Reference, which presents the property directory alphabetically and links individual property pages. This batch is only the A–C segment; remaining alphabetical sections still need extraction and duplicate/alias reconciliation. <https://www.w3schools.com/cssref/index.php>

B4 planning estimate (not an acceptance result): approximately 25–30% complete and 70–75% remaining. This estimate reflects that the catalogue baseline and initial HTML/CSS taxonomy exist, while full member-level extraction for all core references, full URL verification, standards comparison and final coverage audit remain incomplete. Recalculate after the remaining core member registers are built.

## 15. CSS property extraction — batch 9 (2026-11-04)

Added 64 individual CSS property records covering the D–I alphabetical segment (from `direction` through `isolation`) to `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv`. Each record carries the W3Schools CSS Properties Reference source URL and a concise catalogue description. At-rules beginning with `@` remain excluded from the property register because they are separately represented in the at-rule taxonomy.

Source: W3Schools CSS Properties Reference, alphabetical directory: https://www.w3schools.com/cssref/index.php

This batch does not complete D–Z. Remaining property groups include J–Z, followed by reconciliation of the index list against the normalized register, CSS Functions extraction, and URL/member-level audit.

## 16. CSS property extraction — batch 10 (2026-11-04)

Added 168 individual CSS property records from the J–Z portion of the W3Schools alphabetical CSS Properties Reference. The batch includes layout, margin/padding, masking, object fitting, overflow, scroll snapping, text, transform, transition, writing-mode and stacking-related entries. At-rules remain excluded from the property rows and are maintained in the separate at-rule register. Legacy/replacement relationships are noted where applicable (for example page-break-* and word-wrap).

Source: W3Schools CSS Properties Reference and its alphabetical property listing: https://www.w3schools.com/cssref/index.php. The source also separately lists at-rules interspersed alphabetically; those are not counted as properties.

The property-name register now requires a source-to-register reconciliation pass. This batch captures the remaining J–Z entries surfaced by the index, but does not itself certify the whole directory as complete. CSS Functions extraction and HTML/JS/Python/SQL reference member registers remain outstanding.

## 17. CSS Functions member extraction — batch 11 (2026-11-04)

Added 82 individual CSS function records to `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv`, using the current W3Schools CSS Functions Reference list. Function records use the distinct `css_function` member type and `CSS-FN-###` identifiers; they are not mixed with CSS property or at-rule records. The extraction includes mathematical, color, gradient, filter, shape, transform, grid, URL and custom-property functions. Paired spellings such as `rgb()/rgba()` and `hsl()/hsla()` are retained as separate searchable members because the source lists both forms.

Source: W3Schools CSS Functions Reference: https://www.w3schools.com/cssref/css_functions.php. The reference currently lists function names with concise descriptions. This is a source-index inventory, not a complete CSS Values and Units specification or a browser-support guarantee.

## 18. HTML element-specific attribute mapping — batch 12 (2026-11-04)

Added 79 individual `html_attribute` records to `docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv`. Each row stores the attribute name and the source table's “Belongs to” element mapping in the scope field. The extraction covers common form, media, image, link, table, list, metadata, object and interactive attributes. Attributes that W3Schools labels as not supported in HTML5 (including `align`, `bgcolor` and `border`) are retained with an explicit legacy note rather than presented as modern authoring guidance.

Source: W3Schools HTML Attribute Reference: https://www.w3schools.com/tags/ref_attributes.asp. The source table lists attribute-to-element applicability; this batch records a working subset of the table, not a claim that every row on the source page has been extracted. Global attributes and event-handler attributes remain separate record types to avoid double counting.

## 19. HTML attribute-reference reconciliation — batch 13 (2026-11-04)

Added the W3Schools-listed `color` attribute as an individual legacy HTML attribute record (HTML-ATTR-080). The source labels it as not supported in HTML5 and recommends CSS instead; it is retained for historical/reference completeness, not as current authoring guidance. Attributes categorized by W3Schools as Global Attributes are represented in the dedicated `html_global_attribute` register rather than duplicated as element-specific rows; reconciliation must still confirm the full source table and any overlaps.

Source: W3Schools HTML Attribute Reference: https://www.w3schools.com/tags/ref_attributes.asp. The search-visible source table explicitly identifies `color` as unsupported in HTML5. This batch is one verified addition, not completion of the attribute table.

## 20. HTML attribute-reference reconciliation — batch 14 (2026-11-04)

Added three element-specific attribute rows from the W3Schools HTML Attribute Reference table:
- `cite` — `blockquote`, `del`, `ins`, `q`
- `data` — `object`
- `form` — `button`, `fieldset`, `input`, `label`, `meter`, `object`, `output`, `select`, `textarea`

These were absent from the prior element-specific subset. The source also lists global attributes in the same master table; those continue to be classified in the separate global-attribute register and must be reconciled as a distinct category. This batch is a targeted gap-fill, not final source-table sign-off.

Source: W3Schools HTML Attribute Reference: https://www.w3schools.com/tags/ref_attributes.asp.

## 21. HTML Attribute Reference source reconciliation (2026-11-04)

The live W3Schools HTML Attribute Reference table was checked row-by-row against the member register. Its non-event, element-specific entries reconcile to 83 unique attribute names in `html_attribute`; the 18 Global Attributes are separately represented as `html_global_attribute`; event-handler rows are separately represented as `html_event_attribute` (71 records). This yields 172 attribute/event records across the three categories, with no intentional cross-category duplication. The HTML member register currently has 308 total records and 308 unique IDs. The legacy-only `align`, `bgcolor`, `border`, and `color` records remain explicitly marked as unsupported in HTML5 rather than recommended for modern use.

The reconciliation is limited to the current W3Schools reference table and its own categorization; it is not a claim of full WHATWG/MDN standard coverage or browser compatibility validation. Any discrepancy between W3Schools' event-handler table and modern standards is tracked for a later standards comparison.

Source: https://www.w3schools.com/tags/ref_attributes.asp (current page opened and inspected; table lines 431–608).

## 22. JavaScript/DOM member inventory — Document object batch 1 (2026-11-04)

Expanded `docs/B4_JS_DOM_REFERENCE_MEMBER_REGISTER.csv` with 35 Document-object properties and methods (JSREF-038 through JSREF-072). The batch covers focus state, document metadata, node creation/import, collections, document lifecycle, title/URL, and document writing APIs. Legacy or security-sensitive APIs are explicitly noted (including `createEvent()`, `domain`, `open()`, `write()`, and `writeln()`).

The W3Schools JavaScript Reference index groups HTML DOM Document as a reference object; the Document object page supplies the object-specific member list and descriptions. These entries are source-indexed and are not a browser-support compatibility matrix. Member counts are not yet exhaustive for all Document rows; a full source-to-register reconciliation is still required.

Sources:
- https://www.w3schools.com/jsref/default.asp
- https://www.w3schools.com/jsref/dom_obj_document.asp

## 23. JavaScript/DOM member inventory — Element object batch 1 (2026-11-04)

Added 49 Element-object properties and methods (JSREF-073 through JSREF-121) to `docs/B4_JS_DOM_REFERENCE_MEMBER_REGISTER.csv`. Entries cover element attributes, child relationships, node identity/position, content editing, layout geometry, scrolling, insertion/removal, and metadata. `insertAdjacentHTML()` and `outerHTML` carry explicit security notes because assigning untrusted markup can create injection risks.

The source is W3Schools' HTML DOM Element reference, revised January 2026. The current working register preserves the owner context as `HTML Element`; later passes must reconcile this shared Element list against the separate HTMLElement and specialized HTML element object pages. The source index includes both shared Element members and specialized APIs, so this is a first normalized batch, not an exhaustive full API claim.

Source: https://www.w3schools.com/jsref/dom_obj_all.asp

## 24. JavaScript/DOM member inventory — Event object properties batch 1 (2026-11-04)

Added 31 Event and specialized event-object properties (JSREF-122 through JSREF-152). Owner context is retained for Event, MouseEvent, KeyboardEvent, InputEvent, ClipboardEvent and WheelEvent. The W3Schools Event Properties index contains repeated names with specialized owners (for example modifier keys and `relatedTarget`); this batch normalizes the selected common properties with combined owner context rather than duplicating identical names.

The source also lists HTML event types, event object families and event methods separately. Those are distinct taxonomies and will be inventoried in separate batches; this batch must not be interpreted as full Event API coverage.

Source: https://www.w3schools.com/jsref/dom_obj_event.asp (Event Properties index and Event Object sections).

## 25. JavaScript/DOM reference expansion — Event Methods, Attributes, HTMLCollection and NodeList (2026-11-04)

Added 22 owner-qualified members (JSREF-153 through JSREF-174) from four dedicated W3Schools reference pages:
- Event Methods: 5 methods, including `stopImmediatePropagation()` (source spelling corrected from the previous provisional `stopImmidiatePropagation` in search-index text).
- HTML Attributes: 7 NamedNodeMap/Attr members.
- HTMLCollection: 3 members.
- NodeList: 6 members.

Important semantic distinction recorded for teaching: HTMLCollection is live; NodeList is often static, but `childNodes` returns a live NodeList. `querySelectorAll()` returns a static NodeList. The member register records owner context because names such as `item()` and `length` recur across different interfaces.

Sources:
- https://www.w3schools.com/jsref/dom_obj_event_methods.asp
- https://www.w3schools.com/jsref/dom_obj_attributes.asp
- https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp
- https://www.w3schools.com/jsref/dom_obj_html_nodelist.asp

## 26. JavaScript BOM member inventory — Window, History, Location, Navigator and Screen (2026-11-04)

Added 56 BOM members (JSREF-175 through JSREF-230) across five owner contexts:
- Window: 30 properties/methods
- History: 4 members
- Location: 12 members
- Navigator: 4 members
- Screen: 6 members

The entries preserve owner context where common names recur (for example `length`, `name`, `width`, `assign()`/navigation operations). Notes flag deprecated Window status properties, privacy/permission constraints for geolocation, and the limitations of using user-agent strings for feature detection. History `pushState()` and `replaceState()` are recorded as same-origin session-history operations that do not themselves load a new document. Screen and outer-window dimensions are reference members, not reliable indicators of layout viewport dimensions.

Sources:
- https://www.w3schools.com/jsref/obj_window.asp
- https://www.w3schools.com/js/js_window_history.asp
- https://www.w3schools.com/jsref/prop_win_location.asp
- https://www.w3schools.com/jsref/prop_win_navigator.asp
- https://www.w3schools.com/jsref/obj_screen.asp

This is a member inventory batch, not a browser compatibility test or exhaustive modern Web API inventory.

## 27. JavaScript Web API member inventory — Console, Storage, Geolocation, Fullscreen and Fetch (2026-11-04)

Added 33 API members (JSREF-231 through JSREF-263) across five W3Schools Web API reference pages:
- Console: 15 methods
- Storage: 6 properties/methods
- Geolocation: 7 properties/methods
- Fullscreen: 4 properties/methods
- Fetch: 1 global method

Owner context is preserved for duplicate names such as `clear()` and `length`. Geolocation entries are flagged as permission-gated and HTTPS/secure-context dependent. Storage entries are noted as origin-scoped and subject to browser restrictions. Fetch is recorded as an asynchronous resource request returning a Promise resolving to a Response; the Fetch API's broader Request/Response members remain to be inventoried separately.

Sources:
- https://www.w3schools.com/jsref/api_console.asp
- https://www.w3schools.com/jsref/api_storage.asp
- https://www.w3schools.com/jsref/api_geolocation.asp
- https://www.w3schools.com/jsref/api_fullscreen.asp
- https://www.w3schools.com/jsref/api_fetch.asp

This batch covers five API pages only. Canvas, MediaQueryList, Validation, and the full Fetch Request/Response surfaces remain pending.


## 28. JavaScript Web API expansion — Canvas, MediaQueryList, Validation and Fetch Response (2026-11-04)

Added 43 API/member records (JSREF-264 through JSREF-306):
- MediaQueryList: 5 records — `matches`, `media`, legacy `addListener()`/`removeListener()`, and the `change` event. The modern event-listener pattern is preferred; legacy listener methods are retained for reference compatibility.
- Constraint Validation: 14 records — `checkValidity()`, `setCustomValidity()`, `validity`, `validationMessage`, `willValidate`, and nine ValidityState flags.
- Fetch Response: 9 records — `ok`, `status`, `statusText`, `url`, `text()`, `json()`, `blob()`, `bytes()`, and `arrayBuffer()`.
- CanvasRenderingContext2D: 15 foundational drawing/path/text/image methods, including `fillRect()`, `beginPath()`, `lineTo()`, `arc()`, `fillText()`, and `drawImage()`.

The JavaScript register now contains 306 data records: 7 reference-family records and 299 API/member records. This batch extends the Web API coverage; it does not claim that the complete Canvas 2D interface, Fetch Request/Response interfaces, or all modern browser APIs are exhaustively captured. Canvas work remains a selected foundational method pass and needs full table reconciliation.

Source pages:
- https://www.w3schools.com/jsref/api_canvas.asp
- https://www.w3schools.com/jsref/api_mediaquerylist.asp
- https://www.w3schools.com/js/js_validation_api.asp
- https://www.w3schools.com/js/js_asynC_fetch.asp

Source note: the Canvas reference's older graphics URL resolves to the current JavaScript Canvas API page. W3Schools' Fullscreen reference labels `fullscreenEnabled()` as a method; retain that source label for traceability but flag it for standards/API-shape review because current DOM usage exposes `document.fullscreenEnabled` as a property.


## 29. JavaScript built-in Array and DOM CSSStyleDeclaration members (2026-11-04)

Added 52 owner-qualified records (JSREF-307 through JSREF-358):
- Array: 44 members from the W3Schools complete Array reference, including iteration, transformation, searching, copying, mutation and static factory operations. Modern copying methods (`toReversed()`, `toSorted()`, `toSpliced()`, and `with()`) are explicitly described as non-mutating; older mutating methods remain distinguished in their notes.
- CSSStyleDeclaration: 8 members — properties `cssText`, `length`, `parentRule`; methods `getPropertyPriority()`, `getPropertyValue()`, `item()`, `removeProperty()`, and `setProperty()`.

The JavaScript register now contains 358 data records: 7 reference-family records and 351 API/member records. The CSSStyleDeclaration entries are distinct from the large CSS property register: they describe the DOM interface used to read and manipulate an element's inline style declarations. The Array pass captures the members listed in the current W3Schools Array reference; it does not mean every built-in JavaScript object family is complete.

Sources:
- https://www.w3schools.com/jsref/jsref_obj_array.asp
- https://www.w3schools.com/jsref/obj_cssstyledeclaration.asp
- https://www.w3schools.com/jsref/prop_html_style.asp
- https://www.w3schools.com/jsref/default.asp

Coverage note: the combined JavaScript reference index (revised June 2026) enumerates additional object families including Boolean, Date, Error, Function, Global, Iterator, JSON, Map, Math, Number, Object, Promise, Proxy, Reflect, RegExp, Set, String, Temporal and Typed Array. These remain to be inventoried member-by-member, with owner-qualified duplicate names and source reconciliation.


## 30. JavaScript String and Date built-in reference members (2026-11-04)

Added 101 records (JSREF-359 through JSREF-459):
- String: 41 core properties/methods, including modern methods such as `at()`, `matchAll()`, `replaceAll()`, `isWellFormed()` and `toWellFormed()`; also 13 legacy HTML wrapper methods, explicitly tagged deprecated/non-standard and not recommended for modern teaching.
- Date: 47 constructors/properties/methods, covering local-time and UTC getters/setters, timestamp operations, parsing, serialization and locale formatting.

Date source URL normalized to the W3Schools Date Reference page. String methods return new strings rather than mutating the original string; legacy HTML wrappers are preserved for reference completeness but will be taught with a deprecation warning and modern CSS/DOM alternatives.

The JavaScript register now contains 459 data records: 7 reference-family records and 452 API/member records. This is not yet a full built-in object inventory: Number, Math, Object, Promise, Map, Set, WeakMap/WeakSet, RegExp, JSON, Error, Function, Global, Iterator, Temporal, Typed Arrays and other reference families remain.

Sources:
- https://www.w3schools.com/jsref/jsref_obj_string.asp
- https://www.w3schools.com/jS/js_date_reference.asp
- https://www.w3schools.com/jsref/default.asp

Coverage and editorial notes:
- The String reference includes older HTML wrapper methods; they are retained only as legacy reference entries, not as recommended techniques.
- Date local-time methods and UTC methods are kept as separate member entries to avoid hiding timezone semantics.
- W3Schools reference pages can contain legacy/deprecated members alongside current APIs; source capture does not imply recommendation for new code.


## 31. JavaScript Number, Math and Object built-in reference members (2026-11-04)

Added 87 owner-qualified records (JSREF-460 through JSREF-546):
- Number: 22 properties and methods, including numeric limits/constants, safe-integer checks, parsing helpers, formatting and primitive conversion.
- Math: 42 methods/constants, including trigonometric and hyperbolic functions, logarithms, rounding, powers, random generation and mathematical constants.
- Object: 23 entries from the Object reference, including property definition/inspection, copying, freezing/sealing, key/value/entry enumeration and prototype-related members.

Editorial distinctions retained:
- Number static methods such as `isFinite()`, `isInteger()`, `isNaN()`, `isSafeInteger()`, `parseFloat()` and `parseInt()` are recorded under the Number owner; global conversion/parsing functions remain separate global entries.
- `Object.delete` is listed in the W3Schools Object reference index but is an operator concept, not an Object static method; it is recorded with a clarifying note rather than misrepresented as a callable method.
- `Object.toString()` and `Object.valueOf()` are inherited instance methods, distinguished from static Object methods in their notes.
- Math functions operate on JavaScript Number values; `Math.random()` is pseudo-random and must not be used for security-sensitive token generation.

The JavaScript register now contains 546 data records: 7 reference-family records and 539 API/member records. Number, Math and Object reference lists have been inventoried; the remaining object families include Boolean, BigInt, Symbol, Promise, Map, Set, WeakMap, WeakSet, RegExp, JSON, Error, Function, Global, Iterator, Temporal, Proxy, Reflect and Typed Arrays.

Sources:
- https://www.w3schools.com/jsref/jsref_obj_number.asp
- https://www.w3schools.com/jsref/jsref_obj_Math.asp
- https://www.w3schools.com/js/js_object_reference.asp
- https://www.w3schools.com/Jsref/default.asp


## 32. JavaScript Promise, Map, Set, WeakMap and WeakSet members (2026-11-04)

Added 50 owner-qualified records (JSREF-547 through JSREF-596):
- Promise: 12 entries — constructor, three instance methods and eight static methods, including newer `try()` and `withResolvers()`.
- Map: 12 entries — constructor, core collection methods, `size`, and `groupBy()`.
- Set: 17 entries — constructor, `size`, core iteration/mutation methods, and modern set-composition/relationship methods (`difference()`, `intersection()`, `symmetricDifference()`, `union()`, `isDisjointFrom()`, `isSubsetOf()`, `isSupersetOf()`).
- WeakMap: 5 entries — constructor, `delete()`, `get()`, `has()`, `set()`.
- WeakSet: 4 entries — constructor, `add()`, `delete()`, `has()`.

The JavaScript register now contains 596 data records: 7 reference-family records and 589 API/member records. Weak collections are explicitly documented as non-enumerable collections without a `size` property; their keys/values are object-only as appropriate, and weak references do not keep otherwise-unreachable objects alive.

Source coverage and verification notes:
- Promise methods were cross-checked against the W3Schools Promise Object reference (Revised December 2025), including `Promise.try()` and `Promise.withResolvers()`.
- Map and Set member lists were cross-checked against their W3Schools reference tables. The newer Set composition methods are included because the current reference lists them.
- WeakMap and WeakSet entries are a normalized member inventory based on the W3Schools constructor/reference navigation and weak-collection documentation; the exact dedicated member-reference URL coverage needs a follow-up URL/content verification pass. They are not claimed as a separately verified complete member table.
- `Map.groupBy()` and Set composition methods are modern ECMAScript additions; browser/runtime support needs to be included in future lesson metadata rather than assumed universal.

Sources:
- https://www.w3schools.com/jsref/jsref_obj_promise.asp
- https://www.w3schools.com/jsref/jsref_obj_map.asp
- https://www.w3schools.com/jsref/jsref_obj_set.asp
- https://www.w3schools.com/jsref/jsref_construct_map.asp
- https://www.w3schools.com/jsref/jsref_construct_weakset.asp
- https://www.w3schools.com/js/js_sets_weak.asp
- https://www.w3schools.com/jsref/default.asp


## 33. JavaScript Boolean, BigInt, Symbol and RegExp reference members (2026-11-04)

Added 46 owner-qualified records (JSREF-597 through JSREF-642):
- Boolean: 6 entries — Boolean conversion/call, wrapper constructor, constructor/prototype and primitive conversion methods.
- BigInt: 5 entries — BigInt conversion, `asIntN()`, `asUintN()`, `toString()`, and `valueOf()`.
- Symbol: 17 entries — `Symbol()`, registry methods `for()`/`keyFor()`, the `description` getter, and well-known Symbol keys including `iterator`, `asyncIterator`, `toPrimitive`, `toStringTag`, and `species`.
- RegExp: 18 entries — constructor, 12 properties, legacy `compile()`, `escape()`, `exec()`, `test()`, and `toString()`.

The JavaScript register now contains 642 data records: 7 reference-family records and 635 API/member records. Editorial notes distinguish primitive factories from wrapper objects, and well-known Symbol keys from ordinary instance methods. `new Boolean()` is retained for reference completeness but discouraged in normal Boolean logic. `new RegExp()` is the constructor form; `RegExp.escape()` is a static method. RegExp `compile()` is marked deprecated.

Source verification:
- W3Schools' current complete JavaScript reference index lists Boolean's constructor/prototype/toString/valueOf, BigInt's toString/valueOf, Symbol as a primitive family, and the RegExp member index including `dotAll`, `escape()`, `flags`, `hasIndices`, `unicodeSets`, and other flags/properties.
- W3Schools' reference index provides the family/member cross-reference; dedicated page paths for Boolean, BigInt and Symbol should still be checked individually before final URL acceptance.
- The current RegExp member index is supported by the W3Schools JavaScript reference index; a separate final pass must confirm every direct member URL and reconcile any newer ECMAScript additions.

Sources:
- https://www.w3schools.com/Jsref/jsref_reference.asp
- https://www.w3schools.com/Jsref/default.asp
- https://www.w3schools.com/jsref/jsref_obj_regexp.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

Coverage limitation: this batch captures the member lists visible in the W3Schools reference index, not the full grammar of RegExp patterns/modifiers. Pattern tokens, character classes, assertions, quantifiers and flags need a separate syntax inventory (they are reference topics, not RegExp object members).
