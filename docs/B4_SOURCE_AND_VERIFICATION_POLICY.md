# B4 Source and Verification Policy

**Status:** Binding scope decision for B4  
**Sole reference source:** https://www.w3schools.com/  
**Working branch:** `docs/project-foundation`

## 1. Source boundary

B4 inventories the reference and lookup material for this learning platform using **W3Schools only**. W3Schools is the sole source for deciding which reference families, topics, members, labels, groupings, and URLs are in B4 scope.

Do not use WHATWG, W3C, MDN, ECMA, Python.org, database vendors, or any other external website to add, remove, rename, expand, or validate B4 inventory members. Cross-site comparison is not a B4 completion requirement.

## 2. W3Schools-only workflow

For each selected W3Schools reference page:
1. Record the exact W3Schools page title and URL.
2. Capture its visible categories, sub-reference families, topics, and individual members.
3. Preserve W3Schools naming, spelling, grouping, and scope.
4. Link every member row to its parent family and exact W3Schools source URL.
5. Record the W3Schools URL as the source pointer; do not run a second-source verification or compare the member against another website.
6. Preserve W3Schools' own grouping and labels; do not create additional verification work beyond following its displayed taxonomy.
7. Keep tutorial chapters (B3) and exercises, quizzes, challenges, and practice problems (B5) in their corresponding project stages unless W3Schools presents them as reference lookup material.

A W3Schools page is sufficient evidence for its own listed taxonomy. No second standards/vendor source is required to prove a W3Schools-listed member exists.

## 3. External and supplemental rows

Rows derived from non-W3Schools sites are out of B4 scope. Preserve them only as historical/supplemental candidates if useful; exclude them from W3Schools coverage, denominators, completion status, and acceptance evidence.

If provenance is unknown or a row cannot be tied to a W3Schools page, classify it as `SOURCE_UNCONFIRMED` and exclude it from verified counts until confirmed. Do not infer that a member is W3Schools-listed because it is common in a language or appears elsewhere.

## 4. Required dispositions

- `W3SCHOOLS_VERIFIED`: visibly listed on the cited W3Schools page.
- `W3SCHOOLS_LEGACY_LABEL`: listed by W3Schools with an obsolete/deprecated/unsupported/historical warning; preserve that warning.
- `W3SCHOOLS_GROUPED`: multiple members are grouped by W3Schools and grouping is retained transparently.
- `SOURCE_UNCONFIRMED`: not yet matched to a W3Schools page.
- `SUPPLEMENTAL_OUT_OF_SCOPE`: derived from another source; excluded from B4.
- `DUPLICATE_OR_ALIAS`: duplicate/alias disposition documented against the W3Schools entry.

## 5. Copyright

Record titles, names, URLs, categories, relationships, and short factual metadata. Do not bulk-copy W3Schools explanations, lesson prose, examples, diagrams, or exercises. Create original teaching material.

## 6. B4 acceptance criteria

B4 can be accepted only when:
- the W3Schools References catalogue and all selected reference families are inventoried;
- every in-scope topic/member has a stable ID, exact W3Schools URL, parent family, and source check evidence;
- all non-W3Schools rows are excluded from B4 counts and clearly classified;
- duplicates, aliases, grouped rows, malformed CSV rows, and unknown provenance are dispositioned;
- catalogue totals and member registers are consistent;
- exact W3Schools source URLs are recorded as pointers; no external-source verification is performed;
- each family has a documented coverage decision and reviewer sign-off;
- the acceptance matrix reflects evidence actually present.

No second-source verification, external standards audit, cross-vendor dialect matrix, or browser-compatibility audit is required for B4.

## 7. Guardrails

- Work only on `docs/project-foundation` until B4 sign-off.
- Do not merge `main` or start B5 before B4 acceptance.
- Never report a source check or test as passed unless executed and evidenced.
- Do not publish percentages without frozen W3Schools-only denominators.
- If W3Schools does not expose a detail, record the limitation; do not fill it from another website.
