# B4 HTML Attribute Deep Verification Ledger

**Branch:** `docs/project-foundation`  
**Date:** 2026-11-04  
**Coverage:** 116 registered element-specific HTML attributes.  
**Decision:** OPEN — this is a controlled review ledger, not a claim of complete verification.

The existing applicability audit checks attribute owner scope against the WHATWG index. That is not equivalent to a normative review. This ledger separates five acceptance dimensions: normative semantics, value grammar, legacy/conformance status, security implications, and browser compatibility.

## Review rules

- `NOT_VERIFIED` and `NOT_STARTED` mean no pass is claimed.
- `PARTIAL` means the named primary source was inspected for a limited point; remaining evidence is open.
- Normative evidence must cite the relevant WHATWG element/attribute definition, algorithm or conformance requirement, not merely the non-normative index.
- Value grammar must record tokenization, case sensitivity, defaults, invalid-value behavior, numeric constraints and per-owner differences.
- Legacy classification must be per attribute-owner pair and distinguish current, obsolete-but-conforming, non-conforming and deprecated guidance.
- Security review must analyze the attribute in its element context and untrusted-data flow.
- Browser compatibility must include dated engine/version evidence and fallback behavior. Do not infer compatibility from the existence of a standard.

## Verified source findings in this pass

- WHATWG specifies `accept-charset` as an ASCII case-insensitive match for UTF-8 in form submission.
- WHATWG defines `sandbox` as a unique set of defined space-separated tokens and specifies the restrictions each token relaxes.
- Declarative Shadow DOM uses enumerated `shadowrootmode` and `shadowrootslotassignment` values, while related flags are boolean.
- MDN documents `fetchpriority` values `high`, `low`, and `auto`; actual scheduling impact is browser-dependent and overuse can degrade performance.
- WHATWG obsolete-features rules are owner-specific. Blanket labels such as “legacy” are insufficient: e.g. `charset` on `script` has a narrow obsolete-but-conforming exception, while other owner uses are obsolete/non-conforming.
- MDN XSS guidance stresses context-specific handling of attribute values; event-handler attributes and iframe `src` are particularly sensitive contexts.

## Row-level status

See `B4_HTML_ATTRIBUTE_DEEP_VERIFICATION.csv` for all 116 attributes. Only explicitly marked partial points have limited source evidence; all remaining dimensions stay open.

## Exit criteria

1. Exactly 116 unique attributes match the reference register.
2. All rows have exact normative references and semantics reviewed.
3. Value grammar, missing/invalid defaults and per-owner behavior are documented.
4. Legacy status is classified per attribute-owner pair.
5. Security implications and mitigations are reviewed per owner and data flow.
6. Browser compatibility has dated per-feature engine/version evidence and fallback notes.
7. All discrepancies with the owner-scope audit are dispositioned.
8. Independent reviewer sign-off is recorded.

**Current project decision:** B4 NOT ACCEPTED; B5 blocked; no merge to `main`.
