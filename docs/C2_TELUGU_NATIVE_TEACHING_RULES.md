# C2 — Telugu-Native Teaching Rules

**Status:** Complete — Telugu instructional and localization rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1 — Standard Lesson Structure  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools remains the exclusive topic/source reference  
**Locale code:** `te`  
**Artifacts:** `docs/C2_TELUGU_NATIVE_TEACHING_RULES.md`, `docs/templates/LESSON_TEMPLATE_TE.md`

## 1. Purpose

Define how programming lessons are written and taught naturally in Telugu. Telugu is the teaching language, not a word-for-word translation layer over English. The learner should understand the concept in Telugu while seeing the exact programming syntax and canonical technical names used in code and technical references.

C2 applies to Telugu lesson content across Beginner, Intermediate, Advanced and Professional levels. It specializes the shared lesson structure in C1; it does not change the learning outcomes, topic scope, assessment standard or code behavior.

## 2. Telugu language standard

1. Use clear, contemporary, standard Telugu that is broadly understandable across Telugu-speaking regions.
2. Prefer natural Telugu sentence order and phrasing. Do not preserve English sentence structure when it sounds unnatural in Telugu.
3. Use respectful, learner-friendly language. Address the learner consistently as **"మీరు"** in formal instructional prose; avoid switching unpredictably between "నువ్వు", "మీరు" and impersonal commands.
4. Prefer direct, concise sentences. Explain one idea per sentence or short paragraph.
5. Use familiar Telugu verbs such as "చూడండి", "గమనించండి", "రాయండి", "అమలు చేయండి", "పరీక్షించండి" and "వివరించండి" where they fit naturally.
6. Avoid unnecessary literary, archaic, highly Sanskritized or region-specific vocabulary when a simpler phrase is clearer.
7. Avoid slang, teasing, condescension, stereotypes and assumptions about the learner's age, education, gender, region or occupation.
8. Do not mix Telugu and English randomly. English technical terms are retained deliberately according to the terminology rules below.
9. Use Telugu punctuation and readable paragraphing consistently. Use Arabic numerals (0–9) for code-related values, numbered steps, measurements and assessment scores for consistency with technical notation.
10. Keep headings concise and action-oriented. A heading should tell the learner what they will understand or do.

## 3. Telugu-English technical terminology policy

Programming has canonical names that should remain recognizable across languages.

- On first occurrence, show the canonical English technical term followed by a short Telugu explanation. Example: **Variable (వేరియబుల్)** — విలువను నిల్వ చేయడానికి ఉపయోగించే పేరు పెట్టిన స్థానం.
- After first occurrence, use the canonical term consistently. Use a Telugu transliteration only when it improves readability and does not create a competing name.
- Preserve exact capitalization for language names, APIs, keywords, identifiers and product/technology names: `JavaScript`, `Python`, `HTML`, `CSS`, `SQL`, `DOM`, `JSON`, `API`.
- Do not translate reserved keywords or syntax, such as `if`, `else`, `for`, `while`, `function`, `return`, `class`, `SELECT` or `WHERE`.
- Do not invent Telugu equivalents for established identifiers, functions, methods, file extensions, command names or error names.
- Use one chosen Telugu explanation for a term throughout the course. If a term has multiple meanings, explain the meaning relevant to the current W3Schools topic.
- C2 establishes the usage policy, not the complete approved term dictionary. Canonical term entries and cross-language equivalents belong to C9.

### Preferred presentation pattern

| First-use format | Example |
|---|---|
| Canonical term + Telugu explanation | **Loop (లూప్)** — ఒకే పనిని అవసరమైనన్ని సార్లు మళ్లీ అమలు చేసే నిర్మాణం |
| Canonical term only after definition | "ఈ Loopలో condition ఎప్పుడు false అవుతుందో గమనించండి." |
| Exact code token | `for`, `while`, `break`, `continue` |
| Exact API/type/name | `document.querySelector()`, `Array`, `String` |

Do not present a transliteration as if it were executable code. Visually separate code tokens from explanatory Telugu prose.

## 4. Teaching voice and explanation pattern

Use this order when introducing a new concept:
1. State the idea in one plain Telugu sentence.
2. Explain why the learner needs it in the selected W3Schools topic.
3. Break the concept into small steps.
4. Show an original, minimal example.
5. Explain what the code does and what output/result to expect.
6. Ask the learner to predict, change or create something.
7. Summarize the rule and the most likely mistake.

Writing rules:
- Explain the "what" before the "how", and the "how" before exceptions or advanced detail.
- Use concrete examples with simple values and meaningful names.
- Define unfamiliar terms before using them repeatedly.
- Use comparisons only when the two concepts are genuinely comparable; state where the comparison stops being accurate.
- Explain cause and effect explicitly: what input or condition changes, what code runs, and what result follows.
- Prefer active voice and specific instructions.
- Do not use unexplained English phrases as a substitute for teaching.
- Do not pad lessons with repeated introductions or motivational filler.
- Never assume a learner already knows an English technical term because it appears in the code.

## 5. Telugu code-example rules

1. Code must remain valid in the language being taught. Do not translate keywords, identifiers required by an API, syntax, file names or literal output.
2. Prefer simple, meaningful English identifiers in code, because the learner must recognize common code conventions and source syntax. Explain each important identifier in Telugu.
3. Telugu text may appear in output strings or comments only when the example is specifically teaching text, strings, Unicode or localization, or when Telugu output makes the example clearer without changing the topic.
4. Keep code comments consistent: if comments are included for a Telugu lesson, write the explanatory comments in Telugu while preserving code tokens. Do not translate comments embedded in a source sample that must remain byte-for-byte unchanged.
5. Show the programming language label for every code block.
6. Show expected output separately from source code. Preserve exact spaces, punctuation, line breaks and capitalization in expected output.
7. Explain whether a displayed result is console output, browser output, SQL result rows or another result surface.
8. Use small examples first. Add complexity only when the learning outcome requires it.
9. Do not claim a code sample was executed unless execution evidence exists. Mark unexecuted examples as **Execution not verified** in authoring metadata.
10. Do not copy W3Schools code examples. Author an independent example that teaches the same approved topic.

## 6. Examples and learner context

- Use neutral, familiar contexts such as books, marks, products, lists, simple calculations, schedules or sample records.
- Keep names, currency, dates and cultural references understandable without assuming a particular community or region.
- Use Indian examples where useful, but do not make every example about India or presume the learner lives in a specific state.
- Use sample data that is fictional and non-sensitive. Never use real learner personal information.
- Avoid stereotypes, political/religious assumptions, caste/community references or gendered role assumptions.
- Explain any unfamiliar domain word before using it in a programming example.
- Keep example content within the approved W3Schools topic scope; familiar context must not introduce a new curriculum technology.

## 7. Telugu lesson structure specialization

Use the C1 sequence and render the learner-facing section headings in Telugu consistently:

| C1 section | Telugu learner-facing label |
|---|---|
| Lesson header | పాఠం వివరాలు |
| Learning outcome | ఈ పాఠం తర్వాత మీరు చేయగలిగేది |
| Why this matters | ఇది ఎందుకు ఉపయోగపడుతుంది? |
| Prerequisite check | ముందుగా తెలుసుకోవాల్సినవి |
| Key terms | ముఖ్యమైన పదాలు |
| Concept explanation | భావనను అర్థం చేసుకుందాం |
| Worked example | ఉదాహరణతో చూద్దాం |
| Code walkthrough | కోడ్‌ను అర్థం చేసుకుందాం |
| Guided practice | సూచనలతో సాధన |
| Independent practice | స్వయంగా సాధన చేయండి |
| Knowledge check | మీ అవగాహనను పరీక్షించండి |
| Summary | ముఖ్యాంశాలు |
| Completion check | పాఠం పూర్తి చేసే ప్రమాణాలు |
| Next step | తదుపరి దశ |
| Source and attribution | మూల సమాచారం |

The authoring metadata may keep stable English field keys and IDs. Only learner-facing text is localized.

## 8. Telugu instructions, questions and feedback

- Give one action per instruction where possible.
- Use a clear imperative form and specify the expected result.
- For multi-step tasks, number the steps and keep their order explicit.
- Ask questions in direct Telugu. Avoid double negatives and ambiguous wording.
- In multiple-choice questions, make every option grammatically parallel and mutually distinguishable.
- Do not use a translation that accidentally reveals the answer through grammatical gender, length or a repeated keyword.
- Feedback must identify what is correct, what needs improvement and what the learner should try next.
- Incorrect-answer feedback must be respectful and specific; avoid "చాలా సులభం", "ఇది కూడా తెలియదా" or blame-oriented wording.
- Hints should become more specific progressively without immediately exposing the full solution.
- Keep the technical meaning, difficulty and scoring identical to the other five language versions.

## 9. Telugu grammar, spelling and typography checks

Before language approval:
- Check spelling, sandhi/word joining and sentence readability.
- Avoid inconsistent spellings of the same technical term within one lesson.
- Use Telugu script for Telugu explanatory prose; retain Latin script for canonical technical terms, code and URLs.
- Avoid excessive parenthetical English text.
- Use quotation marks consistently for literal text and learner-entered strings.
- Ensure Telugu glyphs render correctly on Android, web and narrow screens; do not rely on a particular font being installed.
- Check line wrapping around inline code, punctuation, numerals and English terms.
- Ensure code blocks are not converted to Telugu numerals or altered by text processing.

## 10. Localization parity and review workflow

A Telugu lesson is not publishable merely because it has been translated. It must pass all of these reviews:

1. **Curriculum review:** lesson maps to an approved B7–B10 module and W3Schools source URL.
2. **Technical review:** code, syntax, outputs and explanations are correct for the selected topic.
3. **Telugu language review:** natural Telugu, spelling, terminology consistency and readability.
4. **Pedagogy review:** explanation sequence, examples, hints and assessment support the same learning outcome.
5. **Parity review:** compare against the canonical lesson to ensure no objective, example behavior, difficulty, answer or scoring change.
6. **Accessibility review:** headings, reading order, code presentation, focus, contrast and text alternatives remain usable.
7. **Publication review:** version, reviewer identity, approval status and content history are recorded.

Recommended language-specific states: `Draft → Telugu Review → Technical Review → Approved → Published`. A lesson may return to Draft after any substantive correction. Store the overall content state separately from the `te` locale state.

## 11. Telugu-specific quality checklist

- [ ] Telugu prose is natural, clear and respectful.
- [ ] Learner is addressed consistently using "మీరు".
- [ ] Every new technical term is explained at first use.
- [ ] Canonical English technical names are consistent with the glossary policy.
- [ ] Code, keywords, identifiers, syntax and expected output remain exact.
- [ ] Example is original and within the approved W3Schools topic scope.
- [ ] Instructions are direct and each task has a clear expected result.
- [ ] Hints guide without revealing the full answer prematurely.
- [ ] Questions and options are unambiguous and grammatically parallel.
- [ ] Feedback is specific, supportive and actionable.
- [ ] Telugu spelling, punctuation, glyph rendering and mobile wrapping are checked.
- [ ] Technical meaning, learning outcome, difficulty and assessment parity are preserved.
- [ ] Technical and Telugu language reviews are recorded.
- [ ] Execution status is stated honestly.

## 12. Acceptance criteria

C2 is complete when:
- Telugu writing standard and teaching voice are defined.
- Telugu-English terminology handling and code fidelity are explicit.
- A repeatable Telugu explanation sequence is documented.
- Learner instructions, questions, hints and feedback rules are defined.
- Telugu-specific lesson headings and authoring template exist.
- Language, technical, pedagogy and parity review requirements are documented.
- The rules specialize C1 without changing approved curriculum scope.
- No lesson is claimed as translated, reviewed, executed or published by this specification task.

## 13. Scope boundary and handoff

C2 defines Telugu-native teaching rules only. It does not define the complete glossary (C9), AI localization engine (C8), diagram standard (C10), code explanation specification (C11), exercise/quiz system (C12), mini-project system (C13) or final content approval process (C14–C15).

**C2 is complete at Telugu teaching-rule and authoring-template specification scope.**  
**Next task: C3 — Define English teaching rules.**
