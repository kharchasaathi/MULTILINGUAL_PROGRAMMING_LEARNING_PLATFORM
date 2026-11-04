# C10 — Diagrams and Visual Teaching Specification

**Status:** Complete — visual teaching system, diagram contracts, accessibility and six-locale parity defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1–C9  
**Supported locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools remains the exclusive curriculum topic/source reference  
**Artifacts:** `docs/C10_DIAGRAMS_AND_VISUAL_TEACHING.md`, `docs/C10_VISUAL_PATTERN_CATALOG.csv`

## 1. Purpose

Define how visual explanations help learners understand concepts, program flow, document structure, relationships, data and code behaviour. A visual is an instructional aid attached to a lesson outcome; it is not a separate curriculum topic and must not introduce technologies or concepts outside the approved W3Schools-derived scope.

C10 defines authoring and delivery contracts. It does not implement a diagram renderer, select a diagramming library or claim that diagrams have been authored for every lesson.

## 2. Design principles

1. **Outcome-led:** every visual answers a specific learner question and supports the lesson's primary outcome from C1.
2. **One visual, one job:** avoid diagrams that mix unrelated concepts or duplicate paragraphs without adding understanding.
3. **Source-bounded:** every instructional visual maps to an approved topic/module and W3Schools source URL. The visual format itself does not expand curriculum scope.
4. **Code truth:** any code, identifier, keyword, selector, SQL token, literal value and expected output shown in a visual must match the associated lesson code exactly.
5. **Native-language parity:** explanatory labels, captions, callouts and reading order are localized natively; code and protected tokens remain unchanged.
6. **Text-equivalent:** no essential fact is available only through colour, shape, animation or spatial position.
7. **Progressive complexity:** begin with a small overview, then reveal detail only when needed.
8. **Responsive first:** diagrams must remain readable on narrow mobile screens without requiring precision gestures.
9. **Accessible by design:** keyboard, screen-reader, contrast, motion and text alternatives are requirements, not later polish.
10. **Original work:** author original visuals. Do not copy W3Schools diagrams, screenshots, illustrations, page layouts or examples.

## 3. Approved visual pattern families

Use the catalog in `C10_VISUAL_PATTERN_CATALOG.csv` as the initial controlled pattern list.

| Pattern | Appropriate instructional use | Required companion |
|---|---|---|
| Concept map | Show a small set of related ideas and their labelled relationships | Ordered text outline |
| Hierarchy/tree | Show nested document or object structure | Indented text representation |
| Flowchart | Show decision paths, repetition or a bounded process | Step-by-step text path |
| Sequence/timeline | Show ordered events or stages in a lesson-supported process | Numbered event list |
| Table/matrix | Compare properties, syntax forms or cases already in scope | Properly structured HTML/data table |
| Annotated code panel | Connect selected code lines to explanations | Complete selectable code block |
| Input-process-output | Explain a transformation using lesson-supported values | Text description of each stage |
| Data/schema sketch | Show tables, columns and relationships within the SQL/database scope | Text/table description; relationship labels |
| Layout/box model sketch | Explain CSS layout or sizing concepts covered by the selected topic | Text labels and a numeric/structural explanation |
| State/value trace | Show how values change across a small code example | Step table with exact values |
| Screenshot/callout | Point out a specific UI or editor region when the lesson requires it | Text instructions and accessible description |

A visual pattern is allowed only when the underlying concepts are present in the approved lesson scope. Do not introduce UML, architecture notation, cloud diagrams, deployment topology, network protocols or other new curriculum subject matter merely because a diagram type exists.

## 4. Visual selection rules

Choose the simplest pattern that explains the learning objective:
- Use prose for a short definition or a single fact.
- Use a table for precise comparisons and repeated attributes.
- Use a flowchart only when branching or repetition is genuinely part of the lesson.
- Use a tree for nested structure, not for chronological order.
- Use a sequence/timeline only when order matters.
- Use annotated code when the learner must connect code regions to behaviour.
- Use a state/value trace when values change and the intermediate steps matter.
- Use a screenshot callout only when a real interface view is essential; never use a decorative screenshot.

Every visual record must state why the visual is better than prose alone. If it adds no instructional value, omit it.

## 5. Visual specification contract

Each authored visual must have the following metadata:

| Field | Requirement |
|---|---|
| `visual_id` | Stable unique ID, e.g. `VIS-0001` |
| `lesson_id` | Parent C1 lesson identity |
| `module_id`, `topic_ids` | Must resolve to approved B7–B10 curriculum maps |
| `pattern_type` | One controlled pattern from the catalog |
| `learning_purpose` | Learner question or misconception addressed |
| `source_urls` | W3Schools URLs supporting the topic |
| `source_code_ref` | Exact lesson code version/hash when code is visualized |
| `nodes_or_steps` | Structured content with stable IDs and explicit order |
| `edges_or_relations` | Explicit relationship labels; no meaning inferred from colour alone |
| `locale_text_keys` | Keys for title, labels, captions, callouts and alt description |
| `reading_order` | Deterministic linear order for keyboard and assistive technology |
| `text_equivalent` | Complete text representation of all essential information |
| `responsive_strategy` | Stack, wrap, scroll-with-alternative or simplify without loss |
| `motion_policy` | Static by default; animation only when it teaches change over time |
| `content_version`, `status` | Draft/review/approved/published lifecycle |

Node and edge IDs remain stable across locale variants so the same concept maps to the same position and relationship. Do not encode translated prose directly into structural IDs.

## 6. Six-language localization and parity

For `te`, `en`, `ml`, `kn`, `ta`, and `hi`:

- Translate titles, labels, captions, callouts, instructions and text alternatives using the locale rules in C2–C7.
- Resolve technical terms through the approved C9 glossary. Do not invent or silently approve new equivalents.
- Preserve node identity, relationship meaning, order, count, direction and conceptual emphasis across locales.
- Permit layout expansion and text wrapping for script/word-length differences; do not truncate labels or shrink text below accessible sizes.
- Reflow layout where necessary while retaining the same semantic reading order and relationships.
- Keep code, identifiers, syntax, literal output, file names and protected tokens unchanged.
- Review text in the actual target script and target device sizes; do not judge localization from English mockups alone.
- A locale may be marked complete only after native-language and technical review. An untranslated label is a visible gap, not an acceptable fallback for publication.

Visual parity means equivalent teaching meaning and task difficulty, not pixel-identical geometry.

## 7. Accessibility requirements

### Non-visual equivalent
- Provide a concise alt description that states the visual's purpose.
- Provide a full text equivalent for every essential node, edge, value, step and outcome.
- For complex visuals, provide a nearby structured list or table; a short alt attribute alone is insufficient.
- Keep the text equivalent synchronized with the visual version.

### Colour and shape
- Never use colour as the only indicator of meaning, status, correctness or path.
- Pair colour with text, shape, line style, labels or icons that have accessible names.
- Maintain sufficient text and non-text contrast in light and dark themes.
- Avoid red/green-only correctness distinctions and colour-only series identification.

### Keyboard and assistive technology
- Static diagrams should not create unnecessary focus stops.
- Interactive diagrams must support keyboard operation, visible focus, predictable focus order and a non-drag alternative.
- Expose meaningful title, description and grouped structure to assistive technologies.
- Do not make a canvas-only visual the sole representation; provide semantic DOM content or an equivalent structured alternative.

### Text and responsive layout
- Support zoom and text scaling without clipping.
- Use readable type sizes, line spacing and adequate touch targets for interactive controls.
- On narrow screens, stack or reflow. If horizontal scrolling is unavoidable, provide a linear text alternative and preserve context.
- Ensure labels do not overlap, collide or become illegible in Telugu, Malayalam, Kannada, Tamil and Devanagari scripts.

### Motion
- Static is the default.
- Animate only when change over time is the learning objective.
- Provide pause/stop controls for non-essential motion, respect reduced-motion preferences, and never flash rapidly.
- Do not autoplay an animation that blocks reading or assessment.

## 8. Code and data integrity

- Visualized code must reference a specific lesson code version; do not independently retype code fragments when they can be derived from the canonical lesson source.
- Highlighting must not alter code text or imply that syntax is optional.
- Flow arrows and step labels must describe actual execution order and conditions.
- Data tables, traces and schema sketches must use the same values and names as the lesson example.
- If source code changes, mark dependent visuals stale and require revalidation.
- Never execute learner-submitted code in a privileged rendering environment to produce a diagram. Any future execution-based visualization requires a separately reviewed, isolated sandbox design under the security and architecture stages.

## 9. Authoring workflow and lifecycle

`planned → draft → technical_review → locale_review → accessibility_review → approved → published`

A material source-code or concept change moves dependent visuals back to review. Approval requires:
1. Learning purpose and approved curriculum mapping.
2. Correct concept, relationships, labels, sequence and code/data values.
3. C9 glossary consistency.
4. Six-locale semantic parity for each published locale.
5. Complete text equivalent and accessibility review.
6. Responsive checks at supported breakpoints and target scripts.
7. Reviewer identity, timestamps, source/code version and change note.
8. No copied third-party visual assets or unlicensed screenshots.

The lesson owner cannot waive a failed accessibility or technical correctness check without a documented exception approved through the future C15 governance process. No AI-generated visual is published without human review.

## 10. Validation and test plan

The following are required test cases for future implementation; they are not claimed as executed:

| Test ID | Scenario | Expected result |
|---|---|---|
| C10-T01 | Visual has no lesson/module/topic mapping | Reject publication |
| C10-T02 | Source URL is outside W3Schools | Reject curriculum mapping |
| C10-T03 | Missing purpose or text equivalent | Fail validation |
| C10-T04 | Locale changes node/edge meaning | Fail parity review |
| C10-T05 | Code token differs from canonical lesson code | Mark stale and fail technical review |
| C10-T06 | Diagram uses colour as sole meaning | Fail accessibility review |
| C10-T07 | Keyboard-only access to interactive diagram | All functions available without pointer |
| C10-T08 | Screen-reader reading order | Matches declared semantic order |
| C10-T09 | Narrow viewport and text zoom | No lost content; alternative available |
| C10-T10 | Long labels in all six scripts | No clipping, overlap or unreadable scaling |
| C10-T11 | Reduced-motion preference enabled | Non-essential animation disabled |
| C10-T12 | Source lesson version changes | Dependent visual marked stale |
| C10-T13 | AI prompt includes instruction embedded in diagram text | Treated as untrusted content, not system instruction |
| C10-T14 | Diagram references unapproved glossary term | Block or route to glossary review |
| C10-T15 | Visual and text equivalent versions differ | Fail synchronization check |
| C10-T16 | Screenshot has no permission/provenance | Reject asset |
| C10-T17 | Diagram is purely decorative | Exclude from instructional content or mark decorative accessibly |
| C10-T18 | Static diagram receives unnecessary keyboard focus | Fail interaction/accessibility check |

## 11. Security, privacy and asset governance

Treat diagram labels, uploaded screenshots, SVG content and AI-generated descriptions as untrusted input. Sanitize supported markup, disallow script execution and unsafe external references, validate asset types and sizes, and enforce author/reviewer permissions server-side. Do not embed learner personal data in visuals. Store provenance and licensing/permission metadata for every non-original asset. Prefer original vector or semantic HTML renderings over copied screenshots.

## 12. Acceptance criteria

- [x] Controlled visual pattern catalogue created.
- [x] Selection rules and curriculum boundary defined.
- [x] Stable visual metadata and structured content contract defined.
- [x] Six-locale localization and semantic parity requirements defined.
- [x] Accessibility, keyboard, screen-reader, contrast, responsive and motion requirements defined.
- [x] Code/data integrity and stale dependency behavior defined.
- [x] Human review lifecycle and asset governance defined.
- [x] Eighteen future implementation test cases specified.
- [x] W3Schools-only source boundary preserved.
- [ ] Diagram renderer, visual authoring UI and semantic output implemented.
- [ ] Actual lesson diagrams created, localized and reviewed.
- [ ] Automated accessibility, responsive and parity tests implemented and executed.

## 13. Explicit limitations

C10 completes the visual teaching specification and initial pattern catalog only. It does not implement a renderer, select a diagram library, create production lesson diagrams, provide translated visual assets or execute automated tests. Those tasks belong to later architecture, implementation and content-production stages.
