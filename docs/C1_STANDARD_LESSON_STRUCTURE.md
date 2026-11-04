# C1 — Standard Lesson Structure

**Status:** Complete — reusable lesson specification defined  
**Stage:** C — Teaching & Content Engine  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive topic/source reference  
**Supported learning languages:** Telugu, English, Malayalam, Kannada, Tamil, Hindi  
**Artifacts:** `docs/C1_STANDARD_LESSON_STRUCTURE.md`, `docs/templates/LESSON_TEMPLATE.md`

## 1. Purpose

Define one consistent, reusable structure for every platform lesson, regardless of programming language, learning level, specialization or UI platform. The structure separates:
- **Shared lesson identity and learning objective** — identical across all six language versions.
- **Localized teaching content** — naturally written for the selected learner language.
- **Technical source and scope** — limited to the approved W3Schools curriculum map.
- **Practice and assessment** — original platform-authored learning activities.

A lesson is a teachable unit within a module. A module may contain one or more lessons. A topic may be split into multiple lessons when a single lesson would overload the learner; do not force every topic into exactly one lesson.

## 2. Core design principles

1. **One lesson, one primary learning outcome.** Supporting objectives are allowed only when they directly enable the primary outcome.
2. **Prerequisite-aware.** Every lesson belongs to a mapped module and inherits its B11 prerequisites. A lesson may declare a more specific prerequisite only when it is supported by the approved map.
3. **Level-appropriate depth.** Beginner lessons teach small concepts with guided practice; later levels increase integration, independence and problem complexity.
4. **Language parity.** All six localized versions teach the same concept, use the same code behavior, preserve technical meaning and assess the same outcome.
5. **Original instruction.** W3Schools provides topic names, scope and source links. The platform authors its own explanations, examples, exercises, hints, solutions and diagrams.
6. **Code fidelity.** Programming syntax, identifiers, keywords, operators, file names, API names and literal output must not be translated or altered in ways that change execution.
7. **Practice before progression.** Each lesson includes an opportunity to apply the concept and a way to check understanding.
8. **Accessible and responsive.** Content must work on narrow mobile screens and support keyboard navigation, readable contrast, captions/transcripts where relevant, and meaningful text alternatives for diagrams.
9. **Honest completion.** Opening a lesson is not mastery. Track lesson viewed, practice attempted, assessment passed and mastery separately.
10. **No unsupported scope expansion.** Do not introduce curriculum topics or technologies absent from the approved W3Schools-derived scope.

## 3. Standard lesson sequence

Every published lesson uses the following sequence. A section may be marked not applicable only with a documented reason; do not silently omit required learning or assessment.

| Order | Section | Required content | Learner purpose |
|---:|---|---|---|
| 1 | Lesson header | Title, lesson ID, level, track, module, topic, language, estimated time, prerequisites, source link | Know what this lesson covers |
| 2 | Learning outcome | One measurable statement using an observable action | Know what success looks like |
| 3 | Why it matters | Short context and a practical use case from the selected topic | Connect concept to use |
| 4 | Prerequisite check | Brief recall question or diagnostic prompt linked to prior lesson(s) | Activate required knowledge |
| 5 | Key terms | Essential terms with concise, localized definitions and canonical technical terms | Understand vocabulary |
| 6 | Concept explanation | Step-by-step original explanation, small chunks, one idea at a time | Build understanding |
| 7 | Worked example | Original minimal example, expected output/result, and explanation | See the concept in action |
| 8 | Code walkthrough | Explain important lines/blocks, inputs, operations and output; preserve exact code | Read and reason about code |
| 9 | Guided practice | Small task with progressive hints; learner performs the key action | Practise with support |
| 10 | Independent practice | New task with changed context/data; no answer shown by default | Demonstrate independent use |
| 11 | Knowledge check | Short questions or prediction/debugging task tied to the outcome | Check conceptual understanding |
| 12 | Summary | Key takeaways and common mistakes | Consolidate learning |
| 13 | Completion check | Outcome-based rubric, pass threshold and retry/remediation route | Decide whether to progress |
| 14 | Next step | Next lesson/module and any prerequisite/remediation links | Continue the learning path |
| 15 | Source and attribution | W3Schools topic/reference URL(s), access date if captured, original-content attribution note | Trace curriculum scope |

### Section behavior

- **Worked example:** provide the problem/context, original code or query where relevant, expected result, and explanation. Code must be independently authored; do not paste W3Schools examples.
- **Code walkthrough:** explain intent and behavior, not every punctuation mark mechanically. Explain only the lines necessary for the learning outcome.
- **Guided practice:** reveal hints progressively. A hint should guide reasoning, not immediately disclose the full solution.
- **Independent practice:** change names, values, data or scenario from the worked example. Do not copy W3Schools exercise prompts.
- **Knowledge check:** assess the stated outcome, not trivia unrelated to the lesson.
- **Completion check:** record evidence and mastery separately from lesson viewing.

## 4. Lesson types

Use the same base structure with a type-specific emphasis:

| Lesson type | Main emphasis | Required evidence |
|---|---|---|
| Concept | Meaning, syntax, rules and small examples | Learner explains or identifies the concept |
| Code-along | Sequential construction and explanation | Learner completes the implementation steps |
| Practice | Guided then independent application | Submitted attempt and feedback |
| Debugging | Observe incorrect behavior, identify cause, correct it | Explanation of cause and corrected result |
| Reference | Organized lookup of a W3Schools-listed item/family | Accurate definition, syntax/usage and source pointer |
| Review | Connect previously taught outcomes | Mixed retrieval check |
| Project | Apply multiple mapped topics to a bounded deliverable | Project artifact and rubric evidence |
| Assessment | Measure defined outcomes without teaching the answer | Score, item-level evidence and remediation |

Not every module needs every lesson type. The module plan selects types based on the topic and level.

## 5. Level-specific teaching depth

| Level | Explanation and examples | Practice | Assessment expectation |
|---|---|---|---|
| Beginner (B7) | Plain language, short steps, small examples, explicit terminology | Highly guided first, then one small independent change | Recognize, explain, modify and produce a small outcome |
| Intermediate (B8) | Connect related concepts, show structured examples and common failure cases | Guided combination followed by independent task | Build and explain a connected feature or data task |
| Advanced (B9) | Compare approaches within the mapped topic, reason about algorithms/data structures and complexity where applicable | Less scaffolding; multi-step problem solving | Select, implement, compare and justify a solution |
| Professional (B10) | Apply selected pathway topics to a defined project and explain decisions | Independent specialization project | Evidence-based project/portfolio rubric; no job or certification guarantee |

Difficulty changes the depth and independence, not the identity of the learning objective across translations.

## 6. Six-language localization contract

Each lesson has one canonical lesson record and up to six localized content records:
- `te` — Telugu
- `en` — English
- `ml` — Malayalam
- `kn` — Kannada
- `ta` — Tamil
- `hi` — Hindi

Localization requirements:
- Write naturally for native readers; avoid word-for-word machine translation.
- Preserve the same lesson ID, module ID, learning outcome meaning, example behavior, task difficulty, hints, answer correctness and assessment rubric.
- Keep code, keywords, identifiers, syntax, command names, filenames and literal output unchanged unless the lesson explicitly teaches a text/string localization topic.
- Use canonical technical terms consistently; add a localized explanation at first use rather than inventing a different technical meaning.
- Do not translate code comments or user-interface strings inconsistently within a single lesson.
- Keep diagrams, examples, assessment item IDs and expected outputs aligned across language versions.
- If a language version is incomplete, mark it unavailable/draft. Do not silently show another language as if it were the requested translation.
- Record translator/editor and review status per language. Translation completion does not imply technical review completion.

## 7. Lesson metadata contract

Every lesson record must contain the following fields before publication:

| Field | Requirement |
|---|---|
| `lesson_id` | Stable, unique ID; never reuse after deletion |
| `module_id` | Existing B7–B10 module ID or approved future module ID |
| `track_id` | W3Schools-derived learning track |
| `level` | Beginner, Intermediate, Advanced or Professional |
| `topic_ids` | One or more B6 checklist IDs when a matching record exists |
| `lesson_type` | One of the defined lesson types |
| `title_key` | Stable title key shared across translations |
| `primary_outcome` | One measurable learner outcome |
| `prerequisite_lesson_ids` | Existing lesson IDs; must align with B11 module dependencies |
| `estimated_minutes` | Positive integer estimate; not a completion timer |
| `source_urls` | W3Schools URLs only |
| `content_version` | Versioned revision identifier |
| `status` | Draft, In Review, Approved, Published, Archived |
| `language_status` | Per-language Draft, In Review, Approved, Published or Unavailable |
| `assessment_policy_id` | Reference to the configured outcome assessment policy |
| `created_at`, `updated_at` | System-managed timestamps |

Do not use display titles or translated text as primary identifiers. A lesson ID remains stable when its title is translated or revised.

## 8. Assessment and completion model

Track these states independently:
1. **Not started**
2. **Viewed** — lesson content opened; not evidence of mastery.
3. **In progress** — practice or knowledge check attempted.
4. **Submitted** — required response/artifact submitted.
5. **Passed** — configured assessment threshold achieved.
6. **Mastered** — required outcome evidence achieved under the module's mastery policy.
7. **Needs review** — learner did not meet the threshold and has a remediation path.

Assessment rules:
- Questions and tasks must map to the lesson's primary outcome.
- Store score, attempt number, submission time, feedback and item-level outcome evidence where applicable.
- Do not expose answer keys before submission when the task is intended to assess independent understanding.
- Allow retries with useful feedback and an appropriate alternate practice task.
- A passed quiz alone must not imply mastery of a coding outcome if the outcome requires writing or modifying code.
- Lesson completion and module completion are separate. Module progression must also enforce B11 prerequisites and module-level criteria.

## 9. Content authoring and review lifecycle

`Draft → Technical Review → Language Review → Accessibility Review → Approved → Published → Revised/Archived`

Required checks before publication:
- Topic and technology are within the approved W3Schools scope.
- Source URL and module mapping are present.
- Learning outcome is measurable and matches the content and assessment.
- Code examples are original, syntactically checked in the relevant execution environment before publication, and have expected outputs recorded.
- Exercises are original and do not reproduce W3Schools prompts/answers.
- All enabled translations preserve the same learning outcome and technical correctness.
- Images/diagrams have text alternatives and are usable on mobile.
- Prerequisite and next-step links resolve to valid platform lesson/module IDs.
- Content version and reviewer records are stored.

If code has not actually been executed, mark it as not execution-verified. Never claim tests passed without recorded execution evidence.

## 10. Accessibility and responsive content rules

- Use semantic headings in hierarchical order.
- Keep paragraphs and instruction steps short.
- Make code blocks horizontally scrollable without breaking the page layout.
- Provide copyable code and a clear indication of the language.
- Do not rely on color alone to communicate correctness or errors.
- Provide keyboard-operable controls and visible focus states.
- Add meaningful alt text or a text explanation for instructional diagrams.
- Provide captions or transcripts for instructional audio/video when used.
- Preserve readable text sizing and spacing on small screens.
- Keep interactive examples safe: never execute untrusted learner code on the main application server.

## 11. Acceptance criteria for C1

C1 is complete when:
- A single lesson sequence is defined and reusable across topics and levels.
- Lesson types and level-specific teaching depth are defined.
- Six-language parity rules preserve technical correctness.
- Required metadata and lesson status fields are specified.
- Practice, assessment, mastery and remediation are separated.
- Source, copyright, accessibility, responsive and content-review rules are explicit.
- A copyable authoring template exists.
- No lesson content is falsely claimed as authored, translated, tested or published by this design document.

## 12. Scope boundaries and handoff

C1 defines the standard structure only. It does not yet define:
- Native teaching rules for each individual language (C2–C7).
- AI localization engine behavior (C8).
- Canonical glossary data model/content (C9).
- Diagram and visual-teaching standards (C10).
- Detailed code explanation format (C11).
- Exercise/quiz specifications (C12).
- Mini-project specifications (C13).
- Lesson quality scoring and approval workflow detail (C14–C15).

**C1 is complete at lesson-structure specification scope.** Next task: **C2 — Define Telugu-native teaching rules**.
