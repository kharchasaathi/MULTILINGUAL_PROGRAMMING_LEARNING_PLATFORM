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
