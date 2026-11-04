# B4 — W3Schools Reference Inventory

**Status:** In progress  
**Sole source:** https://www.w3schools.com/  
**Reference catalogue:** https://www.w3schools.com/references/  
**Branch:** `docs/project-foundation`

## 1. Binding scope

B4 follows W3Schools only. The W3Schools site itself is the source; do not verify its topics against another website or add topics from standards, vendors, memory, or general industry knowledge.

- Include only reference families and members shown by W3Schools.
- Preserve W3Schools names, categories, grouping, and labels.
- Keep tutorial chapters in B3 and exercises/practice material in B5 unless W3Schools explicitly presents an item as reference material.
- Do not add a language, framework, API, property, function, or syntax item merely because it exists elsewhere.
- Create original lessons and examples; do not copy W3Schools prose, examples, diagrams, or exercises.
- Keep linked sub-reference pages under their parent reference to avoid double-counting.

## 2. W3Schools References catalogue

The current working catalogue is represented in `docs/B4_REFERENCE_REGISTER.csv`. The W3Schools References index presents these 31 areas:

1. HTML
2. CSS
3. JavaScript
4. SQL
5. Python
6. Java
7. C
8. C++
9. Colors
10. PHP
11. HTML DOM
12. MySQL
13. W3.CSS
14. Bootstrap 3
15. Bootstrap 4
16. Node.js
17. Django
18. jQuery
19. Vue
20. Angular
21. Sass
22. XML
23. JSON
24. ASP
25. Icons
26. SVG
27. Canvas
28. Charsets
29. Emojis
30. AppML
31. W3.JS

HTML DOM is linked with JavaScript and must remain a child/sub-reference rather than a duplicate independent page. The register also records supporting HTML attribute, global attribute, event attribute, color, Canvas, and by-function pages as child references.

## 3. Active W3Schools member registers

- `docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv`
- `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv`
- `docs/B4_JS_DOM_REFERENCE_MEMBER_REGISTER.csv`
- `docs/B4_JS_REGEXP_PATTERN_SYNTAX_REGISTER.csv`
- `docs/B4_PYTHON_REFERENCE_MEMBER_REGISTER.csv`
- `docs/B4_PYTHON_KEYWORD_EXCEPTION_TYPE_REGISTER.csv`
- `docs/B4_SQL_REFERENCE_MEMBER_REGISTER.csv`
- `docs/B4_SQL_ADVANCED_DIALECT_REFERENCE_REGISTER.csv`
- `docs/B4_HTML_REFERENCE_FAMILY_CAPTURE.md` (HTML reference-family navigation capture)
- `docs/B4_HTML_REFERENCE_MEMBERS_CAPTURE_02.md` (HTML element/global-attribute capture; event list still partial)

Other W3Schools reference families still require their own member inventories. The current W3Schools homepage reference index labels this entry “Angular” (not “AngularJS”); retain the current displayed label in the catalogue. A catalogue URL alone does not mean that the family is fully inventoried.

## 4. Out-of-scope material removed

Removed from active B4 because it came from websites other than W3Schools or expanded beyond W3Schools' displayed reference taxonomy:
- External HTML accessibility/ARIA and standards applicability audits.
- External HTML element/event/attribute comparison and deep-verification files.
- CSS additions and descriptor audits sourced from MDN or other standards pages.
- JavaScript owner candidates sourced outside W3Schools.
- Python protocol and standard-library expansions sourced from Python.org.
- SQL vendor-specific dialect catalogues sourced from database vendors.
- External-source gap-candidate lists.

Do not restore these items to B4. If W3Schools itself later adds a reference entry, include it from the W3Schools page.

## 5. Completion criteria

B4 is complete when:
- The W3Schools References catalogue is represented without double-counting linked child references.
- Every selected W3Schools reference family has its displayed topics and members inventoried.
- Every retained member has a stable ID and W3Schools source URL.
- No non-W3Schools member or external-source audit is included in B4 coverage.
- CSV structure, IDs, duplicates, and parent/member relationships are consistent.
- Each family has a documented coverage decision and project sign-off.

No external standards comparison, vendor dialect matrix, or second-source verification is required.

## 6. Current status

B4 remains **IN PROGRESS**. Cleaned row counts are working inventory counts only, not proof that all W3Schools members or all catalogue families have been captured. See `docs/PROGRESS_TRACKER.md` and `docs/B4_ACCEPTANCE_GATE_MATRIX.csv`.

B5 remains blocked until B4 is accepted. Do not merge this branch into `main` before B4 approval.
