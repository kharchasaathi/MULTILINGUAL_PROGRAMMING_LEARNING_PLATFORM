# C9 — Canonical Multilingual Technical Terminology Glossary

**Status:** Complete — glossary governance, data contract, seed register and six-locale workflow defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C8  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive curriculum scope and terminology reference  
**Artifacts:** `docs/C9_TECHNICAL_TERMINOLOGY_GLOSSARY.md`, `docs/C9_CANONICAL_TERM_REGISTER.csv`

## 1. Purpose

Establish one governed vocabulary for technical terms used in lessons, code explanations, diagrams, exercises, quizzes, navigation and AI-assisted localization. The glossary prevents inconsistent translations, ambiguous explanations and accidental translation of executable tokens.

This is a terminology governance specification and an initial canonical seed register. It is not a claim that six-language translations have been completed or native-reviewed.

## 2. Binding decisions

1. Every concept has one stable `term_id` and one canonical English technical label.
2. The canonical label, spelling and capitalization are stable identifiers for editorial use; localized display text may be added only through the review workflow.
3. English is both a supported teaching locale and the canonical terminology anchor. English explanations still require editorial review.
4. Each locale has its own preferred display form, concise native explanation, optional accepted variants, reviewer and approval state.
5. No AI-generated translation becomes approved automatically.
6. Code tokens, language keywords, API names, identifiers, operators, file extensions, literal output and exact error text are protected strings, not glossary translation targets.
7. Glossary scope is limited to concepts evidenced in the approved W3Schools-derived topic inventory. No external terminology source may expand the curriculum.
8. The glossary explains terminology; it does not define new lessons, add topics or change curriculum prerequisites.

## 3. Canonical record model

The CSV seed register defines the canonical term identity and source mapping. The locale records are maintained as one record per term and locale in the future content store, using this logical schema:

| Field | Requirement |
|---|---|
| `term_id` | Immutable unique ID, format `TERM-NNNN` |
| `canonical_en` | Exact canonical English label; preserve case |
| `definition_en` | Original concise definition, not copied from W3Schools |
| `category` | Broad glossary grouping |
| `source_topic_id` | Existing B6 checklist ID that supports the term |
| `source_url` | W3Schools URL only |
| `locale` | One of `te/en/ml/kn/ta/hi` |
| `preferred_display` | Native-approved display form; may retain English label |
| `localized_explanation` | Original explanation written for that locale |
| `accepted_variants` | Optional reviewed variants; never silently treated as preferred |
| `status` | `not_started`, `draft`, `in_review`, `approved`, `deprecated` |
| `reviewer_id`, `reviewed_at` | Required for approval |
| `glossary_version` | Version of the approved glossary snapshot |
| `change_note` | Reason for material change or deprecation |

The seed CSV intentionally records canonical concepts and locale readiness only. It does not fabricate preferred translations or imply review.

## 4. Locale policy

| Locale | Teaching rule source | Required review |
|---|---|---|
| `te` | C2 Telugu-native rules | Fluent Telugu reviewer with programming knowledge |
| `en` | C3 English-native rules | English technical editor |
| `ml` | C4 Malayalam-native rules | Fluent Malayalam reviewer with programming knowledge |
| `kn` | C5 Kannada-native rules | Fluent Kannada reviewer with programming knowledge |
| `ta` | C6 Tamil-native rules | Fluent Tamil reviewer with programming knowledge |
| `hi` | C7 Hindi-native rules | Fluent Hindi reviewer with programming knowledge |

A localized record may retain the canonical English term and provide a native-language explanation. Transliteration is optional and must not create a competing technical label. Do not force a literal translation when the English term is the clearest established learner-facing form.

## 5. First-use and repeat-use rules

- First use: show the canonical label with the approved localized display form or explanation. The exact presentation pattern follows C2–C7.
- Later use: use the approved preferred display consistently; do not alternate between unreviewed synonyms.
- If a term is not yet approved in a locale, retain the canonical English label and provide a clearly authored explanatory phrase only after locale-editor review. Until then, mark the content draft as glossary-blocked for publication.
- A term with multiple meanings must have context-specific records or a disambiguation note. Never merge distinct concepts merely because their labels match.
- UI labels, glossary entries and lesson prose must resolve to the same approved term record.

## 6. Protected-token policy

The following must remain byte-for-byte unchanged where they represent executable or exact technical content: source code, keywords, identifiers, function/method/property names, class names, selectors, operators, literal strings, file names/extensions, command text, URLs, API names and expected output.

A glossary entry may explain a protected token in native prose but may not rename or rewrite it. If a localized explanation appears to require changing a protected token, the token remains unchanged and the explanation is rewritten.

## 7. Status lifecycle and approval gates

`not_started → draft → in_review → approved`

An approved entry may later move to `deprecated`; it is never silently overwritten. A replacement receives a new version and a recorded successor relation.

Approval requires all of the following:
1. Source topic and URL resolve to the approved B6 inventory and use `www.w3schools.com`.
2. Canonical label and original English definition are technically clear.
3. Native preferred display and explanation are reviewed by a qualified locale reviewer.
4. Meaning matches the canonical concept; no unsupported scope or altered code token.
5. First-use, repeat-use and ambiguity behavior are specified.
6. Reviewer identity, review timestamp, glossary version and change note are recorded.
7. Six-locale parity is checked for concept identity, not forced word-for-word equivalence.

No self-approval by the generating model. An AI proposal remains `draft` until a human reviewer approves it. A missing locale entry is a visible gap, not permission to invent a translation at render time.

## 8. Versioning and change control

- Use semantic glossary versions: MAJOR for breaking identity/schema changes, MINOR for new approved terms or locale records, PATCH for non-breaking editorial corrections.
- `term_id` is immutable and never reused.
- Canonical label changes require a decision note, impact scan and version increment.
- Deprecation retains the old record, reason, date and successor term where applicable.
- Lessons store the glossary version used at approval. A newer glossary version triggers a terminology impact check; it does not silently mutate published lesson snapshots.
- Keep an audit trail of proposer, reviewer, timestamps, before/after values, reason and affected lesson IDs.
- Rollback restores a prior approved snapshot; it must not erase audit history.

## 9. AI localization integration

C8's prompt composer receives only approved glossary entries for the requested locale plus protected-token declarations. The model must:
- use approved preferred forms consistently;
- preserve canonical terms when no approved localized form exists;
- never invent an approved equivalent or accepted variant;
- return unresolved terms as structured glossary queries;
- leave code and protected tokens untouched.

The validator checks term-ID consistency, preferred-form consistency, protected-token equality and unsupported synonym introduction. A glossary miss routes to editorial review; it does not trigger automatic dictionary expansion.

## 10. Data quality and publication rules

- Every published technical term must resolve to a non-deprecated glossary record.
- Every published localized lesson must use the glossary snapshot recorded in its content metadata.
- All six locales must teach the same concept and preserve code behavior; locale completeness is tracked independently.
- Terms that are not relevant to a locale's lesson need not be forced into that lesson.
- Search/indexing may include reviewed accepted variants, but display uses only the preferred form.
- Accessibility: preserve readable script rendering, avoid unexplained transliteration-only labels, and ensure glossary links have meaningful accessible names.

## 11. Initial canonical seed register

`C9_CANONICAL_TERM_REGISTER.csv` contains 30 foundational concepts mapped to existing B6 W3Schools topic IDs and source URLs. Locale readiness is deliberately marked `not_started` for all six locales. This creates a traceable starting queue without falsely claiming native translation approval.

The seed is not an exhaustive dictionary. Additional terms are added only when they occur in approved curriculum content and can be mapped to a W3Schools source topic.

## 12. Acceptance criteria

- [x] Stable canonical term identity and data fields defined.
- [x] Six locale policies and reviewer qualifications defined.
- [x] First-use, repeat-use, ambiguity and missing-term behavior defined.
- [x] Code/protected-token invariants defined.
- [x] Draft/review/approval/deprecation lifecycle defined.
- [x] Versioning, audit and rollback rules defined.
- [x] C8 AI integration and validation responsibilities defined.
- [x] Initial source-mapped seed register created without fabricated translations.
- [x] Exclusive W3Schools source boundary preserved.
- [ ] Native-language term translations reviewed and approved.
- [ ] Runtime glossary service, storage and validators implemented and tested in the software implementation stages.

## 13. Security, privacy and operational considerations

Glossary records are editorial content, not executable instructions. Treat imported or AI-proposed term text as untrusted input: validate schema and length, encode on output, reject markup/script payloads where unsupported, and enforce reviewer authorization server-side. Do not include learner personal data in glossary prompts or audit records. Keep reviewer identities to internal identifiers rather than public personal details.

## 14. Explicit limitations

C9 completes the glossary design and creates the canonical seed queue. It does not complete six-language translation, native review, runtime integration, automated tests, lesson localization or publication. No tests are claimed as executed in this documentation task.
