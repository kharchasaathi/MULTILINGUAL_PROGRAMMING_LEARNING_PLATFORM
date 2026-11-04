# Progress Tracker
Last updated: 2026-11-04

## Current execution position
- Current stage: B — Complete Curriculum Planning
- Current task: B4 — Inventory references
- Next action: Continue B4 — reconcile the 353-row CSS A–Z property register against the current source index; reconcile HTML element-specific attributes against WHATWG; finish JavaScript built-in member/source reconciliation (Iterator, Temporal, Proxy, Reflect, Typed Arrays, RegExp grammar and Error legacy members); expand/reconcile Python (729 curated rows) and SQL (564 curated rows) coverage; verify remaining URLs and run the final coverage audit. B3 catalogue audit is complete.
- Canonical checklist: [MASTER_STRUCTURE.md](MASTER_STRUCTURE.md)

## A — Project foundation
| Task | Status | Evidence |
|---|---|---|
| A1 Vision | Complete | Approved and documented |
| A2 Target students | Complete | Seven audience groups documented |
| A3 Platform goals | Complete | Product blueprint |
| A4 Six-language strategy | Complete | Telugu, English, Malayalam, Kannada, Tamil, Hindi |
| A5 Free/premium model | Complete | Initially free; future model undecided |
| A6 Success criteria | Complete | Product blueprint |
| A7 Master blueprint | Complete | docs/PROJECT_MASTER_BLUEPRINT.md |

## B — Curriculum planning
| Task | Status | Notes |
|---|---|---|
| B1 Categories | Complete | 15 curriculum families; 72 catalogue entries; detailed scope and limitations documented in docs/B1_W3SCHOOLS_CURRICULUM_INVENTORY.md |
| B2 Languages and technologies | Complete | 13 tutorial-scope programming languages, 7 editor-only extension candidates, plus separate markup/query/shell/data-format and technology registers; see docs/B2_PROGRAMMING_LANGUAGE_TECHNOLOGY_INVENTORY.md |
| B3 Tutorials | Complete | Final catalogue audit: 58 official Tutorials-index entries (12 HTML/CSS, 10 JavaScript, 23 Backend, 13 Data Analytics); wider global navigation separately classified; version tracks, learning paths, specialist resources, tools and legacy labels reconciled. Per-track chapter-tree evidence and limitations are recorded in docs/B3_TUTORIAL_TRACK_REGISTER.csv; no claim that every sidebar was fully captured. References/practice assets routed to B4/B5. |
| B4 References | In progress | Reference register has 37 entries; docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv contains 371 records (122 HTML index entries, 34 global-attribute records, 86 event-handler records, 14 event/reference family-group records, 115 element-specific HTML attribute records: 83 W3Schools-derived and 32 WHATWG supplemental). The 34 global-attribute records comprise 18 W3Schools-listed, 13 additional WHATWG HTML Living Standard entries, and 3 Shadow DOM global attributes (`part`, `exportparts`, `slot`). The 86 event-handler rows include 71 W3Schools-derived scope records and 15 WHATWG supplemental candidates; two `onerror` rows are intentionally owner/scope-qualified (Window and media), not duplicate IDs. Added docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv with 515 records (15 families, 6 selector types, 15 at-rules, 44 combinator/pseudo-class/pseudo-element records, 353 individual CSS property records A–Z before reconciliation, 82 CSS function records). HTML element-specific attribute mapping: 83 W3Schools-derived records plus 32 WHATWG supplemental candidates; targeted W3Schools gap-fill includes cite, data and form. W3Schools event-handler set has 71 scope records plus 15 WHATWG supplemental event handlers. Global-attribute mapping includes 18 W3Schools-listed records, 13 additional WHATWG HTML Living Standard attributes, and 3 Shadow DOM globals (`part`, `exportparts`, `slot`). `autofocus` is represented in both element-specific and global scope records, not as two separate attribute names. WHATWG applicability and legacy/conforming status checks remain in progress; ARIA `role`/`aria-*` and deprecated XHTML compatibility attributes are separately classified rather than silently counted as core HTML globals. JS/DOM member register currently has 894 total data records (7 reference families and 887 API/member records): 30 initial cross-object members, 35 Document, 49 Element, 31 Event properties, 22 Event Methods/Attributes/HTMLCollection/NodeList, 56 BOM, 76 Web API/API-related members, 44 Array, 8 CSSStyleDeclaration, 41 String core members, 13 deprecated String HTML wrapper methods, 47 Date, 22 Number, 42 Math, 23 Object, 12 Promise, 12 Map, 17 Set, 5 WeakMap, 4 WeakSet, 6 Boolean, 5 BigInt, 17 Symbol, 18 RegExp, 2 JSON, 12 Error (5 core members and 7 subtype identifiers), 6 Function, 16 Global, 11 Iterator, 13 Reflect and 13 Proxy handler-trap entries, 9 Temporal object/namespace records plus 120 Temporal member records, and 50 Typed Array records (12 types, 32 methods/static methods, 5 properties; note count detail to reconcile: type+method+property rows total 49, plus family-specific metadata classification). JSON, Error, Function and Global member tables were inventoried; Global duplicates are owner-qualified against Number static methods, eval() is flagged for untrusted-input risk, and legacy escape()/unescape() are deprecated. Error non-standard/browser-specific legacy members remain to be reconciled separately. RegExp pattern syntax has a separate 83-row register; source reconciliation for Temporal, Typed Arrays and RegExp grammar remains open, along with Proxy trap invariants and complete ECMAScript internal-operation review. Document table reconciliation and full API coverage remain pending; Python registers are created with 729 records across four files; SQL registers are created with 348 core records and 216 advanced/dialect-specific records. Broader source reconciliation and dialect coverage remain open. B4 completion percentage: NOT SCORED. The former 76–81% was an unweighted planning estimate without a frozen denominator or evidence-based acceptance gates; withdraw it and do not reuse it as measured progress. Publish a defensible percentage only after scope, per-family denominators, source-reconciliation gates and acceptance criteria are frozen. |
| B5 Examples and exercises | Not started | Map topics; create original teaching material |
| B6 Master topic checklist | Not started | |
| B7 Beginner | Not started | |
| B8 Intermediate | Not started | |
| B9 Advanced | Not started | |
| B10 Professional | Not started | |
| B11 Prerequisites | Not started | |
| B12 Coverage approval | Not started | |

## G — Project management and GitHub
| Task | Status | Evidence |
|---|---|---|
| G1 Private repository | Complete | Repository verified |
| G2 AGENTS.md | Complete | File committed on working branch |
| G3 Master blueprint | Complete | File committed on working branch |
| G4 Security constitution | Complete | File committed on working branch |
| G5 Engineering constitution | Complete | File committed on working branch |
| G6 Development roadmap | Complete | File committed on working branch |
| G7 Decision log | Complete | File committed on working branch |
| G8 Progress tracker | Complete | File committed on working branch |
| G9 Branches and pull requests | In progress | Working branch created; PR policy pending |
| G10 GitHub Actions | Not started | |
| G11 Automated tests | Not started | |
| G12 Deployment workflow | Not started | |
| G13 Backup/version control | In progress | Git history active; backup policy pending |

## Other workstreams
C–F and H–S remain pending as listed in MASTER_STRUCTURE.md.

## Evidence and reporting
Only mark tasks complete when artifacts exist and acceptance criteria are met. Draft inventories are not exhaustive verified coverage. No application tests are claimed as executed during this planning/documentation phase.

B4 JavaScript syntax supplement: 83 RegExp pattern-syntax records in `docs/B4_JS_REGEXP_PATTERN_SYNTAX_REGISTER.csv` (flags, character classes, metacharacters/escapes, assertions, groups, quantifiers and Unicode sets); separate from the 894-row JS/DOM member register. Source reconciliation and compatibility review remain open.

Python reference register created: 171 records (67 built-ins, 46 str methods, 11 list, 11 dict, 2 tuple, 16 set, 16 file/stream methods), IDs PYREF-001..PYREF-171. Initial core inventory only; Python keywords, exceptions, type/protocol members and module references remain open. Source references are recorded in `docs/B4_W3SCHOOLS_REFERENCE_INVENTORY.md`.

Python language supplement: `docs/B4_PYTHON_KEYWORD_EXCEPTION_TYPE_REGISTER.csv` contains 184 records (35 hard keywords, 4 soft keywords, 61 built-in exception/warning names, 61 built-in type members). Python reference scope is now 355 records across two registers; both remain initial inventories pending Python-version and source reconciliation.

Python protocol supplement: `docs/B4_PYTHON_ITERATOR_GENERATOR_DECORATOR_CONTEXT_MANAGER_REGISTER.csv` contains 115 records (iterator/async iterator, generator/async generator, decorator/function metadata, contextlib/context manager APIs and selected data-model special methods). Python registers now contain 470 rows across three files; this remains a curated inventory pending full Data Model and version reconciliation.

Python standard-library supplement: `docs/B4_PYTHON_STANDARD_LIBRARY_MODULE_REGISTER.csv` contains 259 records (12 modules and 247 selected member/type/constant entries: math, cmath, random, datetime, json, re, os, sys, pathlib, collections, itertools, functools). Python inventory total is now 729 rows across four Python CSV registers. This is curated coverage, not exhaustive; version/platform/security review remains open.

SQL reference register created: `docs/B4_SQL_REFERENCE_MEMBER_REGISTER.csv` contains 348 records (keywords/statements, data types by dialect, operators/predicates, constraints, clauses/set operators, aggregate functions, and MySQL string/numeric/date-time/advanced functions). Initial SQL batch only; transaction control, window functions, CTEs, stored-program dialects, JSON/spatial APIs and complete DBMS-specific catalogs remain open. SQL must be taught with explicit dialect labels.

Advanced SQL inventory added: `docs/B4_SQL_ADVANCED_DIALECT_REFERENCE_REGISTER.csv` contains 216 curated records covering transactions/isolation, window functions and frame syntax, CTE/recursive CTE concepts, SQL Server/T-SQL functions and MS Access expression functions. Dialect/version reconciliation and exhaustive coverage remain open.

B4 CSS function source audit (2026-11-04): all 82 normalized function member records in `docs/B4_CSS_REFERENCE_MEMBER_REGISTER.csv` were checked against the current W3Schools CSS Functions Reference. W3Schools presents 80 table rows because `hsl()/hsla()` and `rgb()/rgba()` are paired in two rows; the register correctly normalizes those pairs into four distinct function records. All 82 records now carry an explicit source-verification status. CSS property A–Z reconciliation remains pending.

B4 CSS property index reconciliation — first pass (2026-11-04): compared the register against the current W3Schools CSS Properties alphabetical index. The index interleaves at-rules with property names; the register correctly stores at-rules separately in the 15-row `at_rule` family. Seven existing `css_property` records (`font-language-override`, `font-synthesis`, `font-variant-alternates`, `font-variant-east-asian`, `font-variant-ligatures`, `font-variant-numeric`, `font-variant-position`) do not appear in the current W3Schools index text and have been reclassified as supplemental candidates pending independent standards verification. They are retained for broader curriculum scope and are not counted as W3Schools-listed coverage. This is a partial reconciliation only: full source-name set comparison, any other gaps, duplicate/property metadata checks, and final status classification remain pending.

B4 CSS property structural and standards cross-check (2026-11-04): parsed the 515-row CSS register and confirmed 353 `css_property` records with 353 unique names and no duplicate member IDs across the register. The first pass identified seven supplemental candidates; a subsequent source-index reread identified `line-break` as an eighth property absent from the current W3Schools index. All eight are retained as supplemental curriculum candidates and excluded from W3Schools-listed coverage; MDN independently documents `line-break` and the other seven. The 345 remaining property rows retain their existing W3Schools-listed labels, but a complete row-by-row source-name/metadata reconciliation and URL audit are still required before declaring the CSS property inventory fully reconciled.


B4 CSS property audit correction (2026-11-04): the current W3Schools CSS Properties index (https://www.w3schools.com/cssref/index.php) was reopened and the alphabetical list reread. In addition to the seven font-related supplemental candidates, `line-break` is also absent from the index and is now explicitly marked `Supplemental candidate — absent from current W3Schools CSS Properties index; standards verified` in the CSS register. MDN's current `line-break` entry confirms it is a standard CSS property (https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-break). The supplemental count is therefore eight, not seven; do not count these eight as W3Schools-listed items.

B4 HTML WHATWG comparison — initial gap scan (2026-11-04): opened the current WHATWG HTML Living Standard index (updated 4 November 2026; https://html.spec.whatwg.org/multipage/indices.html). Its element index confirms representative existing mappings such as `cite` on `blockquote`, `del`, `ins` and `q`, and `data` on `object`. The standard also lists newer/specialized attributes not present in the 83-row W3Schools-derived attribute register, including `command`, `commandfor`, `blocking`, `fetchpriority`, `alpha`, `colorspace` and `closedby`. These are gap candidates for a separate WHATWG supplemental inventory, not errors to silently merge into the W3Schools source count. The HTML attribute reconciliation remains open; the event-handler list also needs a separate WHATWG comparison.


B4 HTML event-handler supplement (2026-11-04): added 15 event-handler records absent from the current W3Schools event-attributes register after comparing against the WHATWG HTML Living Standard event-handler index: `onauxclick`, `onbeforeinput`, `onbeforematch`, `onbeforetoggle`, `oncancel`, `onclose`, `oncommand`, `oncontextlost`, `oncontextrestored`, `onlanguagechange`, `onmessageerror`, `onpageswap`, `onpagereveal`, `onrejectionhandled`, and `onunhandledrejection`. These are marked WHATWG supplemental and are not counted as W3Schools-listed coverage. HTML register total is now 355 records, including 86 event-handler rows. Full event-handler applicability, global-attribute and element-attribute reconciliation against WHATWG remains open.


B4 HTML element-attribute supplemental batch (2026-11-04): added 32 WHATWG-indexed element-specific attribute records (`HTML-ATTR-084` through `HTML-ATTR-115`) to `docs/B4_HTML_REFERENCE_MEMBER_REGISTER.csv`: `abbr`, `allow`, `allowfullscreen`, `alpha`, `as`, `blocking`, `closedby`, `colorspace`, `command`, `commandfor`, `decoding`, `fetchpriority`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`, `imagesizes`, `imagesrcset`, `loading`, `minlength`, `nomodule`, `ping`, `playsinline`, `referrerpolicy`, six declarative-shadow-root attributes, `span`, and `integrity`. They are marked WHATWG supplemental, excluded from W3Schools-listed counts, and linked to the current WHATWG index. HTML register now contains 355 rows total, including 115 element-specific attribute rows (83 W3Schools-derived + 32 WHATWG supplemental), 86 event-handler rows, 18 global attributes, 122 element index rows and 7 reference families. This is a gap-fill batch, not a complete WHATWG attribute reconciliation: the remaining full index comparison, global-attribute mapping, applicability/version checks and legacy-vs-conforming classification remain open.


B4 HTML global-attribute audit — standards supplement (2026-11-04): compared the 18 W3Schools global-attribute rows with the current WHATWG HTML Living Standard global-attribute list and added 13 missing global-attribute scope records: `autocapitalize`, `autocorrect`, `autofocus`, `headingoffset`, `headingreset`, `is`, `itemid`, `itemprop`, `itemref`, `itemscope`, `itemtype`, `nonce`, and `writingsuggestions`. Added three Shadow DOM global attributes (`part`, `exportparts`, `slot`) using MDN/CSS Shadow specifications. HTML global-attribute records now total 34 (18 W3Schools-listed + 13 WHATWG HTML additions + 3 Shadow DOM supplemental). `autofocus` already exists as an element-specific W3Schools row; its separate global-scope row records broader applicability and must not be treated as a second distinct attribute name. The existing `class`, `id` and `data-*` rows are retained. ARIA `role`/`aria-*` and deprecated XHTML compatibility attributes are not folded into the core HTML global count. Full attribute applicability, browser support and conformance classification still require audit.
