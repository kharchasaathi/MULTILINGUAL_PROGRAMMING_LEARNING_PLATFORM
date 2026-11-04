# B4 Source and Verification Policy

**Status:** Binding scope decision for B4  
**Authoritative and exclusive reference source:** https://www.w3schools.com/  
**Working branch:** `docs/project-foundation`

## 1. Purpose and source boundary

B4 inventories the reference and lookup material that this learning platform will use, following **W3Schools only**. For B4, W3Schools is the sole source of truth for deciding which reference families, topics, members, labels, groupings, and source URLs are in scope.

Do not use WHATWG, W3C, MDN, ECMA, Python.org, vendor documentation, database-vendor documentation, Wikipedia, GitHub projects, or any other external website to add, remove, rename, validate, or expand B4 curriculum inventory members. Do not perform cross-site comparison as a B4 completion requirement.

## 2. Required W3Schools-only workflow

For each in-scope W3Schools reference page:

1. Record the exact W3Schools page title and URL.
2. Capture its visible categories, sub-reference families, topics, and individual members at the level exposed by that page.
3. Preserve the W3Schools spelling, naming, grouping, and scope.
4. Record the parent reference family and the exact W3Schools source URL for every row.
5. Check that the W3Schools URL opens and that the row is visibly present on that W3Schools page.
6. Record a source-page date/check date and a concise disposition for any ambiguous, grouped, duplicate, legacy, or unavailable entry.
7. Keep tutorial chapters (B3) and exercises, quizzes, challenges, and practice problems (B5) out of B4 unless W3Schools explicitly presents them as part of a reference lookup.

A W3Schools page is sufficient evidence for its own listed taxonomy. Do not require a second standards or vendor source to prove that a W3Schools-listed member exists.

## 3. Supplemental and external-source records

Existing rows derived from non-W3Schools sites are **out of B4 scope**. Preserve them only as clearly marked historical/supplemental candidates if useful; do not count them in W3Schools coverage, denominators, completion status, or acceptance evidence. Do not silently blend them with W3Schools-derived rows.

If a row's provenance is unknown or cannot be tied to a W3Schools page, classify it as `SOURCE_UNCONFIRMED` and exclude it from the W3Schools-verified count until its presence on W3Schools is confirmed. Do not infer that a member is W3Schools-listed merely because it is common in the language or appears on another website.

## 4. Status labels

Use these consistent dispositions:
- `W3SCHOOLS_VERIFIED`: the member is visibly listed on the cited W3Schools page.
- `W3SCHOOLS_LEGACY_LABEL`: W3Schools lists it but marks it obsolete, deprecated, unsupported, or historical; retain the source label and note the W3Schools warning.
- `W3SCHOOLS_GROUPED`: W3Schools groups multiple members in one entry and the register preserves that grouping transparently.
- `SOURCE_UNCONFIRMED`: not yet matched to a W3Schools page.
- `SUPPLEMENTAL_OUT_OF_SCOPE`: derived from another source; excluded from B4 coverage.
- `DUPLICATE_OR_ALIAS`: duplicate/alias disposition documented against the W3Schools source entry.

## 5. Copyright and content handling

Record titles, names, URLs, categories, relationships, and short factual metadata. Do not bulk-copy W3Schools explanations, lesson prose, code examples, diagrams, or exercises. The platform must create original explanations, examples, diagrams, and translations.

## 6. B4 acceptance criteria

B4 can be accepted only when:
- the W3Schools References catalogue and all selected W3Schools reference families are inventoried;
- every in-scope W3Schools topic/member is represented with a stable ID, exact W3Schools URL, parent family, and source check evidence;
- all non-W3Schools rows are excluded from B4 counts and clearly classified as out of scope;
- duplicates, aliases, grouped rows, malformed CSV rows, and unknown provenance are dispositioned;
- the catalogue and member registers have consistent totals and family links;
- all applicable W3Schools URLs are checked;
- each family has a documented coverage decision and reviewer sign-off;
- the acceptance matrix reflects evidence actually present in the repository.

No external standards audit, cross-vendor dialect matrix, or full browser-compatibility audit is required for B4.

## 7. Execution guardrails

- Work only on `docs/project-foundation` until B4 sign-off.
- Do not merge `main` or start B5 before B4 acceptance.
- Never report a source check or test as passed unless it was actually executed and evidenced.
- Do not publish percentages without frozen W3Schools-only denominators.
- When the W3Schools source does not expose a detail, record that limitation; do not fill it from another website.
