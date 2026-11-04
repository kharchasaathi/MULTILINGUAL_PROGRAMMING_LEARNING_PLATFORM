# B4 Source and Verification Policy

**Status:** Adopted working rule for B4 inventory execution  
**Primary curriculum source:** https://www.w3schools.com/  
**Branch:** `docs/project-foundation`

## 1. Purpose

B4 inventories the curriculum and reference surface that the product intends to teach, using W3Schools as its primary curriculum taxonomy and learning/reference source. B4 is not intended to recreate every external standards body's full conformance test suite.

## 2. W3Schools-first rule

For every W3Schools tutorial/reference family in scope:

1. Capture the official W3Schools page URL and page title.
2. Inventory its visible topic/member taxonomy at the level needed by the platform.
3. Preserve W3Schools terminology and scope, while recording the date/source page.
4. Check that each captured URL resolves and that the inventory row maps to the correct W3Schools page/member.
5. Record source gaps or ambiguous groupings instead of silently inventing members.

The inventory is considered source-faithful when the listed W3Schools members, names, grouping, and links match the current source page. Do not re-audit every item against WHATWG/W3C/ECMA/Python/SQL standards merely to prove that it exists on W3Schools.

## 3. Limited accuracy safeguard (not a second full inventory)

Use authoritative standards or vendor documentation only when one of these triggers occurs:

- W3Schools explicitly marks an item unsupported, obsolete, deprecated, or historical;
- the topic has a known security/safety consequence (for example HTML injection, iframe sandbox, URL handling, authentication, SQL injection, unsafe evaluation);
- a source conflict or material ambiguity is found;
- browser/runtime/version behavior is part of the lesson's promised outcome;
- the platform is about to present the item as current, universal, or production-safe.

For these triggered cases, record a short discrepancy/accuracy note and a targeted source link. Do not expand a triggered check into a full standards audit of every sibling item.

## 4. Supplemental material

Non-W3Schools additions must be clearly labeled `SUPPLEMENTAL`, include their source and reason for inclusion, and remain outside W3Schools-derived coverage counts. Do not silently mix supplemental standards members into the W3Schools inventory.

## 5. Copyright and content handling

Inventory page titles, topic/member names, URLs, short factual metadata and our own explanations. Do not bulk-copy W3Schools lesson prose, examples, diagrams or exercises. Create original explanations and code examples, and link/cite the source where appropriate.

## 6. Acceptance criteria for B4

B4 source-inventory acceptance is based on:

- every in-scope W3Schools tutorial/reference family has a source URL and inventory scope;
- every in-scope page/member is represented once with stable ID and source provenance;
- duplicate IDs, malformed rows, unresolved source links and unclassified supplemental rows are resolved;
- known legacy/security/version-sensitive caveats are flagged using targeted authoritative references;
- each family has a documented coverage decision and reviewer sign-off;
- the acceptance matrix accurately distinguishes `COMPLETE`, `PARTIAL`, `NOT_STARTED`, and `NOT_APPLICABLE`.

B4 does **not** require 100% standards-level normative semantics, grammar, security and browser-version audits for all W3Schools members. Those belong to lesson-authoring QA and targeted high-risk review, unless the project explicitly adds them to scope.

## 7. Execution guardrails

- Work only on `docs/project-foundation` until B4 sign-off.
- Do not merge `main` or start B5 before B4 acceptance.
- Never report a test or source check as passed unless actually executed and evidenced.
- Keep the denominator fixed and evidence-backed before publishing percentages.
