# B4 Second-Pass Verification Report

**Branch:** `docs/project-foundation`  
**Audit date:** 2026-11-04  
**Decision:** **B4 NOT ACCEPTED — B5 remains blocked.**  
**Purpose:** Record a repository-backed second-pass consistency check. This report does not convert inventory presence into standards completeness.

## 1. Verification performed in this pass

The following files were fetched from the working branch and parsed as CSV. Header shape, data-row count, and unique member/record IDs were checked.

| Register | Data rows | Duplicate IDs |
|---|---:|---:|
| HTML reference member register | 373 | 0 |
| HTML accessibility register | 151 | 0 |
| CSS reference member register | 515 | 0 |
| SQL core register | 348 | 0 |
| SQL advanced/dialect register | 216 | 0 |
| Python standard-library module register (after correction) | 258 | Not separately rechecked for duplicate IDs in this pass |
| JavaScript/DOM register | 906 | Not separately rechecked for duplicate IDs in this pass |

The HTML attribute-applicability audit has 17 data records (16 attribute checks plus one historical missing-member resolution). The HTML event-handler audit has 86 linked rows, but its row statuses explicitly remain `INVENTORY_LINKED_REVIEW_PENDING`; this is not proof of target/dispatch semantics.

## 2. Defect corrected

The Python standard-library register contained a non-reference row:
- `PYMOD-259, module_member, Placeholder, functools, ...`

That row was removed. The register now contains 258 selected member rows across its currently curated module scope. The acceptance matrix was updated from 247 to 258 and the JavaScript/DOM denominator was corrected from 894 to 906. Both changed files were fetched again from GitHub after writing:
- Python register: 258 data rows; no `Placeholder` row remains.
- Acceptance matrix: JavaScript/DOM source-inventory denominator reads 906; Python selected-entry count reads 258.

## 3. Remaining acceptance blockers

### HTML
- Only 16 of 116 element-specific attribute rows have been audited; 100 remain.
- The 17-row conformance exception file is not a complete classification of all 122 source-index rows.
- All 86 event-handler rows still require event-specific target, interface, bubbling/cancellation, security and compatibility review.
- The ARIA inventory contains 94 role tokens and 54 `aria_attribute`-typed rows, but per-role required/supported/prohibited states, accessible-name rules, ownership/context constraints and keyboard patterns remain unaudited.

### CSS
- 515 records exist, but a full property/function/selector source reconciliation is not evidenced.
- The 15/15 W3Schools at-rule name match is only a transcription check. MDN/CSSWG at-rules, descriptors, syntax, standards status, deprecation and browser support remain open.
- All-row source URL and compatibility validation is not evidenced.

### JavaScript / DOM
- The 906-row register includes 12 owner-family candidate rows that explicitly say member-level reconciliation is pending.
- The 24-owner audit has 12 present owner labels and 12 missing-owner candidates; neither owner presence nor a candidate row proves member completeness.
- RegExp grammar, typed-array subtotals, Proxy/Reflect invariants, ECMAScript edition status, browser/runtime support, deprecated APIs and DOM/Web API boundaries remain open.
- The acceptance matrix's former 894-row denominator is corrected to 906; the inventory still has not passed a complete semantic/source audit.

### Python
- The four core Python registers are curated inventories, not a complete Python 3.14 language/library reference.
- The standard-library register covers 12 module roots and 258 selected entries after removing the placeholder. The 81+ gap candidates are not yet scope-approved or reconciled.
- Version, platform availability, signatures, deprecation and security review remain open.

### SQL
- The 348 core and 216 advanced/dialect records are curated inventories.
- Five DBMS source families are registered, but feature-by-feature syntax/behavior/version mapping is not complete.
- No universal-SQL claim should be made for dialect-specific syntax; transaction behavior, data types, functions, reserved words and compatibility need DBMS/version evidence.

### Cross-cutting
- The 37-source catalogue has not had a complete URL fetch/title/scope/version pass.
- The 29-gate acceptance matrix still contains PARTIAL and NOT_STARTED gates, no family sign-offs, and no final B4 QA approval.
- This pass did not execute automated application tests, security tests, browser compatibility tests, or an exhaustive all-file duplicate/provenance scan.

## 4. Evidence-based exit decision

B4 cannot be marked complete while any required gate remains PARTIAL or NOT_STARTED. The inventory is substantial, but source reconciliation, semantic applicability, version/deprecation, URL verification, QA evidence and family sign-off are still incomplete. Do not start B5 and do not merge `main`.

## 5. Required next work to reach B4 acceptance

1. Freeze the authoritative source/version snapshot and scope for every family.
2. Complete row-level source reconciliation and semantic audits, recording explicit dispositions for every discrepancy.
3. Normalize all member counts and remove placeholders/grouped/syntax/foreign-namespace rows from curriculum denominators.
4. Validate every source URL and record source title, scope, version/date and status.
5. Run cross-file ID/reference/schema checks across every B4 CSV, then a second clean verification pass.
6. Obtain family-level acceptance sign-off and update the gate matrix only from attached evidence.

**No percentage is reported:** the current acceptance matrix does not yet have a defensible, frozen weighted denominator.

## 6. Follow-up source-gap work after the initial second pass (2026-11-04)

The initial second-pass snapshot above is retained as historical evidence. Subsequent source review produced these additional changes:

- **CSS:** expanded the register from 515 to **554 rows**: seven MDN at-rule candidates (`@color-profile`, `@custom-media`, `@document`, `@font-feature-values`, `@function`, `@position-try`, `@view-transition`) and 32 owner-qualified at-rule descriptors. Added `docs/B4_CSS_AT_RULE_DESCRIPTOR_AUDIT.csv`. The at-rule source audit now has 22 rows (15 W3Schools name matches + 7 MDN candidates); the descriptor audit has 32 rows. The seven candidate at-rules and 32 descriptors are still pending standards maturity, deprecation, syntax and browser-support review. The MDN reference itself enumerates these at-rules and nested descriptors; CSS Syntax also notes that `@charset` is a legacy byte-sequence mechanism rather than a normal at-rule definition. See https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules and https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax.
- **Python:** expanded the Python 3.14 gap-candidate list from 83 to **91** after comparing with the current 3.14.10 Standard Library and Module Index. Added `string.templatelib`, `compression.zstd`, `os.path`, `annotationlib`, `concurrent.interpreters`, `dbm.sqlite3`, `ctypes.wintypes`, `curses.ascii`, `curses.panel` and `curses.textpad`. These are candidates for scope review, not automatically accepted curriculum requirements. See https://docs.python.org/3.14/library/index.html and https://docs.python.org/3.14/py-modindex.html.
- **Second-pass re-fetch:** CSS member register: 554 rows, zero duplicate IDs; CSS at-rule source audit: 22 rows, zero duplicate IDs; CSS descriptor audit: 32 rows, zero duplicate IDs; Python gap candidates: 91 rows, zero duplicate IDs; acceptance matrix: 29 rows, zero duplicate IDs. Python standard-library module register: 258 rows, no placeholder row, zero duplicate IDs.

These additions increase inventory coverage but do not satisfy the outstanding semantic, version, source-URL, browser/runtime, cross-file provenance, test and family sign-off gates. B4 remains NOT ACCEPTED; B5 remains blocked; no merge to `main`.
