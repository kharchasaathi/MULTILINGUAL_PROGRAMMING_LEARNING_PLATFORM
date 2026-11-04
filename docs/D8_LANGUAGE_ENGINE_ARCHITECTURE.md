# D8 — Language Engine Architecture

**Status:** Complete — locale, language selection, localized-content delivery and parity architecture documented
**Date:** 2026-11-05
**Depends on:** A4; C1–C9; D1–D7
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`
**Baseline:** Next.js web/PWA, Expo React Native, NestJS modular monolith, PostgreSQL, REST/JSON `/api/v1`
**Scope:** Logical architecture and contracts. No locale runtime, translation corpus, AI provider, database migration or production localization service is implemented.

## 1. Purpose and boundaries

D8 defines how the platform selects, stores, resolves, validates, versions and delivers the six supported learning languages. It connects C1's shared lesson contract, C2–C7 native teaching rules, C8 AI-assisted localization, C9 canonical terminology, C15 human approval, D2 client behavior, D5 API conventions, D6 identity/preferences and D7 course delivery.

D8 is not a curriculum source and cannot add topics. W3Schools remains the exclusive curriculum-scope reference; original lesson content is authored by the platform. D8 does not claim that any lesson has been translated or reviewed. The current C9 register has seed canonical terms and all six locale statuses remain `not_started` unless explicitly updated by an approved content workflow.

## 2. Core decisions

1. **Fixed supported-locale allowlist:** `te`, `en`, `ml`, `kn`, `ta`, `hi`. Unknown locale values are rejected or handled by the explicit entry negotiation rule; they are never silently persisted.
2. **One locale-neutral content identity:** lesson, topic, module and assessment identity remain stable across locales. Localized representations are separate immutable versions attached to that identity.
3. **Explicit locale preference:** a learner's explicit selection outranks browser/device language. Browser/device language may be used only for first-visit suggestion/negotiation when no saved or route locale exists.
4. **No silent fallback for learning content:** if the requested lesson locale is not approved for the requested release, return a clear locale-unavailable state and available approved locales. Do not quietly show English or another language as if it were the requested language.
5. **UI fallback is distinct from lesson fallback:** interface chrome may use a documented fallback locale only when a translation key is missing and the fallback is visibly/consistently handled; lesson body, assessment wording, hints, expected prose output and glossary explanations require approved locale versions.
6. **Native writing, not sentence translation:** each locale follows its C2–C7 native teaching specification. Shared learning outcomes, scope, difficulty, assessment intent and code behavior remain equivalent.
7. **Protected technical payloads:** code, keywords, identifiers, commands, filenames, URLs, API names, literal output and exact error text are immutable protected segments unless a specific content schema marks a safe display-only field.
8. **Glossary is governed data:** C9 canonical term IDs and English anchors are stable. Localized terms/definitions require native review and approval; AI suggestions are drafts only.
9. **Locale readiness is release-gated:** each release declares required locales and per-locale approval status. A locale is learner-visible only when the release and all required content/assessment/glossary dependencies pass policy.
10. **Locale services do not own curriculum or mastery:** D8 resolves presentation language and parity evidence; D7 owns course structure, D10 owns progress/mastery, C12 owns assessment rules, C15 owns approval.
11. **Shared contracts, platform-specific UI:** web and native clients share locale IDs, message keys and validation contracts but render using their own platform-appropriate typography and accessibility capabilities.
12. **No claim of complete localization:** coverage is measured by approved content units and dependency parity, never by the existence of locale labels or a translated navigation menu.

## 3. Locale identity and resolution

### 3.1 Locale registry

| Locale | Language | Writing/script policy |
|---|---|---|
| `te` | Telugu | Telugu script for prose; Latin for canonical technical terms/code |
| `en` | English | Clear international English; spelling convention to be selected editorially |
| `ml` | Malayalam | Malayalam script for prose; Latin for canonical technical terms/code |
| `kn` | Kannada | Kannada script for prose; Latin for canonical technical terms/code |
| `ta` | Tamil | Tamil script for prose; Latin for canonical technical terms/code |
| `hi` | Hindi | Devanagari for prose; Latin for canonical technical terms/code |

The registry is an application-owned allowlist. Do not infer locale support from arbitrary BCP-47 tags or accept regional variants as separate content locales without a recorded product decision. A future display preference such as numeral formatting or script style must not create a new lesson locale.

### 3.2 Resolution precedence

For a normal page/content request:
1. Explicit valid locale in the route (e.g. `/{locale}/...`) is authoritative for that request.
2. Otherwise, an authenticated learner's saved locale preference (D6 learner preference) is used.
3. Otherwise, a valid first-visit locale choice stored in a privacy-reviewed client preference may be used.
4. Otherwise, negotiate from browser/device language by matching only the six supported locale identifiers; this is a suggestion, not a saved choice.
5. If no supported match exists, present the locale chooser using the product's configured default UI locale. The default locale is a product decision still open; do not assume English as an approved content fallback.

An explicit user selection updates the route and, for an authenticated learner, persists through the learner preference API. For anonymous users it may be retained in a first-party preference mechanism subject to privacy/security review. A route locale must never be silently overridden by a stale account preference.

### 3.3 Invalid and unavailable locale behavior

- Invalid route locale: return a stable not-found/invalid-locale response and offer the supported locale chooser; do not reinterpret unknown codes.
- Supported locale but missing UI message: use the approved UI fallback policy and record missing-key telemetry in development/operations.
- Supported locale but missing/unapproved lesson or assessment variant: return `LOCALE_CONTENT_UNAVAILABLE` with the requested locale and a list of approved available locales; user must explicitly choose another locale.
- Withdrawn/stale locale version: do not serve it as current; preserve prior release only for authorized audit/history.
- Locale disabled by policy: hide it from new selection but retain historical records.

## 4. Content and localization data model

### 4.1 Shared lesson contract vs localized payload

Shared, locale-neutral fields (C1):
- lesson ID, module/track/topic IDs, level and lesson type;
- primary learning outcome and prerequisite lesson IDs;
- estimated duration and assessment policy reference;
- content schema version, source URLs, shared code/example identifiers;
- release/version identity and protected technical payload references.

Localized fields:
- title and headings;
- explanatory prose, key-term explanations and examples' narrative;
- captions, alt text, diagram labels and transcripts;
- hints, question wording, feedback and learner-facing rubric wording;
- glossary preferred display term, native definition and approved variants;
- UI message strings and accessibility labels.

A localized lesson cannot change the shared learning outcome, curriculum scope, prerequisite graph, code behavior, assessment intent, difficulty or completion policy. If a native reviewer identifies a genuine pedagogical mismatch, submit a shared-contract change through the owning workflow rather than silently altering one locale.

### 4.2 Locale version record

Each localized content version includes:
- stable content identity and locale;
- immutable version number and content hash;
- source/shared lesson version hash;
- locale-rule version (C2–C7) and glossary version;
- protected-token manifest/version;
- author/generation provenance (human or AI-assisted; model/config identifiers where applicable);
- schema validation, technical validation, parity and quality evaluation evidence;
- native reviewer and required specialist approvals under C14/C15;
- state, timestamps, supersession and release references.

A localized version is stale when its shared lesson hash, protected token manifest, required glossary terms, diagram/assessment dependencies or relevant policy version changes. Stale content is not learner-visible in a new release until revalidated and approved.

## 5. Translation and native-authoring workflow

1. **Prepare source contract:** validate C1 lesson metadata, approved curriculum mapping, source URLs and shared outcome.
2. **Lock protected payloads:** extract code blocks, identifiers, commands, filenames, URLs, literal output, exact errors and approved token spans into a protected manifest.
3. **Resolve glossary:** load C9 canonical terms and approved locale entries; unresolved terms are explicitly flagged for author/reviewer.
4. **Author/adapt:** native writer or C8 AI assistant creates original target-language teaching content using the applicable C2–C7 rules. English is a supported authored locale, not an automatically privileged master for every pedagogical explanation.
5. **Structural validation:** validate C1 section order, required fields, locale code, schema, text direction, Unicode and content block types.
6. **Protected-token validation:** compare protected segments and code hashes exactly; detect missing, duplicated, reordered or modified tokens where order is significant.
7. **Parity validation:** compare shared outcomes, topic IDs, prerequisite IDs, lesson type, difficulty intent, assessment policy, exercise count/type, diagram references and code/output hashes.
8. **Technical/content review:** technical reviewer checks correctness; native-language reviewer checks naturalness and clarity; accessibility and assessment reviewers approve their assigned gates.
9. **Quality scoring:** run C14 rubric and mandatory gates; a numeric score cannot override a failed mandatory gate.
10. **C15 approval and release:** approve the exact immutable locale hash; publish only through a release manifest whose locale policy is satisfied.
11. **Monitor and revise:** learner feedback or glossary/source changes create a new candidate version; never overwrite a published locale artifact.

AI may draft, explain alternatives and propose terminology. It cannot decide source scope, mark a locale approved, pass a technical review, sign a human approval or publish.

## 6. Six-language parity contract

Parity is semantic and instructional, not word-for-word length equality.

Mandatory parity dimensions:
- same stable lesson and topic IDs;
- same primary learning outcome and supporting outcome intent;
- same level, difficulty intent, prerequisites and estimated workload range;
- same concept coverage and section requirements under C1;
- same code, identifiers, commands, expected output and technical behavior;
- same exercise/quiz count and type, learning objective and scoring policy;
- same answer correctness and acceptable response semantics;
- same diagram meaning, data flow, node relationships and accessibility information;
- same glossary concept identity and technical distinctions;
- same completion criteria and next-step eligibility.

Permitted localization differences:
- sentence structure, idiom, examples' narrative framing and explanatory sequence within C1;
- text length and paragraph boundaries;
- culturally neutral context substitutions that do not change the technical problem, answer, data assumptions or difficulty;
- native script punctuation and typography;
- explanatory transliteration where C2–C7 permit it and C9 glossary is consistent.

A parity failure must identify the exact shared field or content dependency that differs. It must not be hidden by a generic translation-complete flag.

## 7. Technical-token and code fidelity

Protected classes include:
- source code and code fences;
- programming language keywords, operators, types, API names and identifiers;
- command-line commands and literal arguments;
- filenames, extensions, paths, URLs and case-sensitive names;
- expected output, error messages and test fixtures where exact matching matters;
- JSON keys, schema identifiers and machine-readable values.

Validation rules:
- compare code payload hashes before and after localization;
- validate inline protected spans against their source manifest;
- do not translate identifiers, keywords, filenames or code comments unless a separate explicitly authored localized-comment variant is permitted and technical review confirms behavior is unchanged;
- never normalize case, whitespace or punctuation inside executable blocks unless the language-specific parser proves the transformation safe and the change is explicitly versioned;
- treat model output and imported files as untrusted; reject malformed markup, unexpected executable content and prompt-injection attempts in source/context;
- preserve reading order and screen-reader labels around code blocks without changing the code itself.

## 8. Glossary integration (C9)

- C9 owns canonical `term_id`, English label, source mapping and locale term governance.
- D8 consumes only approved locale entries for published lesson delivery; pending/unreviewed terms may appear in staff authoring tools with status labels, not learner-facing lessons.
- Every lesson references term IDs rather than embedding uncontrolled alternate spellings where feasible.
- A glossary update can mark dependent localized lessons stale and trigger targeted review; it does not automatically rewrite lesson text.
- Terms that are code tokens or identifiers are protected, not translated.
- Glossary parity checks verify meaning and distinction, not literal word similarity.
- Initial seed register is not a fully translated glossary. Locale statuses must remain honest until native review occurs.

## 9. Client architecture and language switching

### Web / PWA
- Locale is explicit in the route and all navigation links preserve it.
- Server-rendered pages resolve locale before rendering to avoid mixed-language hydration.
- Client-side switching preserves the current stable page/resource ID when the corresponding approved translation exists; otherwise it routes to a clear unavailable state/chooser.
- Public UI message bundles may be cached by locale and version. Lesson assets are cached only when the release and cache policy permit.
- Offline mode shows only previously cached approved locale content and identifies stale/offline state; it must not substitute another language.
- Never cache private drafts, reviewer comments, answer keys, account recovery data or private progress in a shared cache.

### Android / future iOS
- Store explicit learner locale preference through the authenticated preference contract; anonymous choice is device-local and privacy-reviewed.
- Use native text rendering, locale-aware accessibility labels and platform-appropriate font fallback.
- Deep links carry validated locale identifiers; unknown locale links show a chooser rather than silently rewriting the destination.
- Locale switching preserves navigation state where the same content identity has an approved localized version.
- Do not assume device language is the learner's chosen learning language after an explicit selection.

### Accessibility and typography
- Declare correct language metadata on web content and accessible labels.
- Support screen readers, keyboard navigation, dynamic text scaling, reflow and line wrapping for all scripts.
- Do not clip combining marks, vowel signs or conjuncts; validate font fallback and rendering on supported web/mobile targets.
- Do not encode meaning through color alone. Diagrams need locale-specific accessible descriptions with semantic parity.
- Test mixed-script text containing native prose plus Latin technical tokens, code and URLs.

## 10. API and persistence integration

D5 remains the wire-level authority. D8 requires:
- locale route/query/header values are validated against the six-locale allowlist;
- route locale outranks stored preference for the current request;
- responses identify requested locale, delivered locale, locale content version and release version;
- no silent fallback for lesson/assessment content;
- unavailable content returns stable `LOCALE_CONTENT_UNAVAILABLE` plus approved alternatives;
- learner preference reads/writes derive principal from D6 and use D5 concurrency/idempotency rules;
- staff-only locale review metadata is never returned to learner endpoints;
- cache keys include locale and release/version where content differs.

Logical endpoints requiring D5 reconciliation before implementation:
- `GET /locales` — supported locale registry and availability metadata;
- `GET /learners/me/preferences` / `PATCH /learners/me/preferences` — existing D5 learner preference contract, with D8 locale semantics;
- `GET /lessons/{lessonId}?locale={locale}` — existing D5 lesson contract, with exact requested/delivered locale semantics;
- staff-only locale-version and parity-review endpoints are governed by C15 and must be specified with D11/admin work.

D4 persistence refinement may include `locale_registry`, `localized_content_version`, `locale_dependency_fingerprint`, `locale_release_status` and `locale_message_bundle_version` if existing content locale version entities cannot express these fields. These are logical candidates, not approved migrations. Do not duplicate D6 learner preference or C9 glossary ownership.

## 11. Security, privacy and resilience

- Locale values are untrusted input; validate allowlist, encoding, length and route normalization.
- Prevent path traversal, cache poisoning, locale parameter confusion and cross-locale cache leakage.
- Do not expose unpublished translations, reviewer notes, AI prompts, model metadata containing secrets or private glossary review evidence.
- Validate imported translation files against strict schemas and reject embedded scripts/unsafe markup.
- Treat AI/source context as untrusted; protect system instructions and prevent retrieved text from changing workflow authority.
- Keep learner preference data minimal; do not infer ethnicity, nationality or identity from language choice.
- Locale-specific analytics must not be used to profile sensitive traits.
- Fail closed for missing approval or invalid release hashes; maintain last known approved release only where policy explicitly permits.
- Preserve audit evidence for locale approvals, fallback decisions, withdrawal and emergency content correction.

## 12. Acceptance criteria and future test plan

D8 is accepted as an architecture artifact when:
- the six-locale allowlist and resolution precedence are explicit;
- explicit user choice outranks browser/device negotiation;
- content fallback and UI fallback are separated;
- missing/unapproved lesson locale never silently substitutes another language;
- shared lesson contract and localized fields are separated;
- C2–C7 native rules, C8 AI boundaries, C9 glossary and C15 approval are integrated;
- protected code/token fidelity and semantic parity are testable;
- web/PWA/native behaviors and accessibility are specified;
- D4/D5 integration, security risks and open decisions are recorded.

Future tests (not executed in this planning task):
1. Accept exactly `te`, `en`, `ml`, `kn`, `ta`, `hi`; reject unsupported locale values.
2. Verify route locale takes precedence over saved preference.
3. Verify explicit learner selection takes precedence over browser/device language.
4. Verify first-visit negotiation never persists a choice without user consent.
5. Verify unknown locale route produces stable invalid-locale behavior.
6. Verify missing UI message follows approved UI fallback and emits a missing-key signal.
7. Verify missing/unapproved lesson locale returns `LOCALE_CONTENT_UNAVAILABLE`, never silent English fallback.
8. Verify response identifies requested/delivered locale, release and content version.
9. Verify locale switching preserves resource identity only when approved counterpart exists.
10. Verify all six locale versions retain identical shared lesson IDs/outcomes/prerequisites/policies.
11. Verify protected code blocks and hashes remain byte-identical.
12. Detect missing, modified, duplicated or reordered protected tokens.
13. Verify identifiers, keywords, filenames, URLs and literal output are not translated.
14. Verify exercise count/type/scoring and answer semantics parity.
15. Verify diagram structure and accessibility descriptions preserve meaning.
16. Verify locale-specific prose follows its C2–C7 rules and native reviewer approval.
17. Prevent AI output from changing curriculum scope, approving or publishing content.
18. Verify glossary terms are learner-visible only after locale approval.
19. Verify glossary updates mark dependent locale versions stale where required.
20. Verify C14 mandatory gates block publication regardless of score.
21. Verify C15 approvals are bound to exact localized content hashes.
22. Verify unpublished locale variants and reviewer comments never reach public endpoints.
23. Verify public cache keys isolate locale and release; private content is never shared-cached.
24. Verify offline PWA serves only cached approved content in the same locale and marks stale state.
25. Verify native deep links reject unsupported locales and do not silently rewrite.
26. Verify Telugu/Malayalam/Kannada/Tamil/Hindi mixed-script rendering with Latin technical tokens at supported font sizes.
27. Verify screen-reader language metadata and accessible labels match delivered locale.
28. Verify malicious markup, path traversal, malformed translation files and cache-poisoning inputs are rejected.
29. Verify learner locale preference writes enforce D6 ownership and D5 concurrency.
30. Verify locale withdrawal/rollback preserves historical audit and never serves withdrawn release as current.

## 13. Open decisions and handoff

Before implementation:
- Select the default UI locale for first-time users; do not infer a default content language.
- Define whether English spelling uses a single chosen convention and record it editorially.
- Define the exact UI-only fallback policy and missing-message threshold.
- Decide anonymous locale preference storage and retention after privacy review.
- Decide locale completeness policy per release (all six required vs explicitly published subset) without misrepresenting coverage.
- Define locale-specific font stack and minimum supported rendering targets during UI/UX implementation.
- Reconcile D5 OpenAPI response fields/error schema and D4 localized-content entity refinements.
- Define telemetry thresholds, stale dependency propagation and release rollback policy with C15/D14.

**Handoff:** D9 — Design the AI engine. No production locale runtime, translation corpus, AI provider integration, database migration, lesson localization or tests are claimed.
