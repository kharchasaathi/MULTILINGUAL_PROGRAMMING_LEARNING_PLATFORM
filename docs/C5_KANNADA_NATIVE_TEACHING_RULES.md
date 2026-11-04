# C5 — Kannada-Native Teaching Rules

**Status:** Complete — Kannada instructional and localization rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1 — Standard Lesson Structure  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive topic/source reference  
**Locale code:** `kn`  
**Artifact:** `docs/C5_KANNADA_NATIVE_TEACHING_RULES.md`

## 1. Purpose

Define how programming lessons are written and taught naturally in Kannada. Kannada is the language of instruction, not a literal translation layer over English. Lessons should use clear, contemporary Kannada while preserving the exact technical terms, identifiers and syntax learners need to recognize in code.

C5 specializes the shared C1 lesson structure. It does not alter approved topics, learning outcomes, code behavior, assessment rules or six-language parity.

## 2. Kannada language standard

1. Use clear, contemporary standard Kannada that is broadly understandable across Kannada-speaking learners.
2. Prefer natural Kannada sentence structure; do not imitate English word order when it makes the explanation awkward.
3. Address the learner respectfully and consistently as **"ನೀವು"** in instructional prose. Do not switch unpredictably to informal singular address.
4. Use short, direct sentences and explain one main idea at a time.
5. Prefer familiar instructional verbs such as "ಗಮನಿಸಿ", "ನೋಡಿ", "ಬರೆಯಿರಿ", "ಪರಿಶೀಲಿಸಿ", "ಚಲಾಯಿಸಿ" and "ವಿವರಿಸಿ" where they sound natural in context.
6. Avoid unnecessarily literary, archaic, highly Sanskritized or strongly regional vocabulary when a simpler Kannada expression is clearer.
7. Avoid slang, mockery, condescension, stereotypes and assumptions about the learner's age, gender, region, education or background.
8. Do not mix Kannada and English arbitrarily. Retain English technical terms according to the policy below.
9. Use Kannada script for explanatory prose. Retain Latin script for canonical technical terms, code, identifiers, URLs and file names.
10. Use Arabic numerals (0–9) consistently for code values, numbered steps, measurements and assessment scores.
11. Use punctuation, spacing and concise descriptive headings consistently.

## 3. Kannada-English technical terminology policy

- At first meaningful use, show the canonical English technical term with a short Kannada explanation. Example: **Variable (ವೇರಿಯಬಲ್)** — ಒಂದು ಮೌಲ್ಯವನ್ನು ಸಂಗ್ರಹಿಸಲು ಬಳಸುವ ಹೆಸರಿರುವ ಸ್ಥಾನ.
- After first explanation, use the canonical English term consistently. A Kannada transliteration may be used sparingly when it helps reading, but must not become a competing technical name.
- Preserve exact spelling and capitalization for languages, APIs, keywords, identifiers, commands, file names, data types and error names: `JavaScript`, `Python`, `HTML`, `CSS`, `SQL`, `DOM`, `JSON`, `API`.
- Never translate reserved keywords or executable syntax such as `if`, `else`, `for`, `while`, `function`, `return`, `class`, `SELECT` or `WHERE`.
- Do not invent Kannada names for APIs, methods, properties, types or identifiers.
- Clearly distinguish related terms that learners may confuse; do not use one vague Kannada phrase for multiple technical concepts.
- Keep terminology consistent within and across lessons. C9 owns the complete multilingual glossary; C5 defines usage rules only.
- Do not transliterate technical names in a way that prevents learners from recognizing them in code editors, documentation or error messages.

### Preferred presentation

| First-use pattern | Example |
|---|---|
| English term + Kannada explanation | **Loop (ಲೂಪ್)** — ಸೂಚನೆಗಳನ್ನು ಪುನರಾವರ್ತಿಸಿ ಕಾರ್ಯಗತಗೊಳಿಸುವ ರಚನೆ |
| Canonical term after definition | "ಈ Loop ಯಾವಾಗ ಮುಗಿಯುತ್ತದೆ ಎಂಬುದನ್ನು ಗಮನಿಸಿ." |
| Exact code token | `for`, `while`, `break`, `continue` |
| Exact API or type | `document.querySelector()`, `Array`, `String` |

## 4. Teaching voice and explanation pattern

Introduce each new concept in this order:
1. State the idea in one simple Kannada sentence.
2. Explain why it matters within the selected approved topic.
3. Break the concept into small, ordered steps.
4. Show a minimal, original example.
5. Explain the important code and expected result.
6. Ask the learner to predict, modify or create something.
7. Summarize the key rule and a likely misunderstanding.

Additional rules:
- Explain what the concept means before explaining how to use it.
- Introduce prerequisites before relying on them.
- Explain cause and effect clearly: input or condition, operation and resulting behavior.
- Use concrete examples and meaningful identifiers.
- Use analogies only when helpful and explain their limits if they could mislead.
- Avoid unexplained jargon, filler introductions and unnecessary repetition.
- Do not assume learners understand a technical term simply because it appears in a code block.
- Adjust depth to B7–B10 expectations without changing the shared learning outcome.

## 5. Code and example fidelity

1. Keep code valid for the selected programming language and approved topic.
2. Do not translate or silently alter keywords, API identifiers, syntax, operators, file names or literal values.
3. Prefer meaningful identifiers and explain non-obvious names in Kannada prose.
4. Label every code block with its language or format.
5. Present expected output separately and preserve exact spaces, punctuation, line breaks and capitalization.
6. Identify the result surface when relevant, such as a browser page, console or SQL result.
7. Start with minimal examples and add complexity only when required by the outcome.
8. Write original examples. Do not copy W3Schools lesson prose, code samples, exercise prompts, answers or diagrams.
9. Record whether code was actually executed and in which environment. Never claim execution without evidence.
10. Mark unverified execution status clearly in authoring metadata.

## 6. Examples and learner context

- Use neutral, familiar contexts such as books, lists, products, simple calculations, schedules and sample records.
- Kannada names or text may be used where useful, but local cultural knowledge must not be a prerequisite for understanding the programming concept.
- Use fictional, non-sensitive sample data. Never include real learner or customer personal information.
- Explain domain-specific words before relying on them.
- Avoid stereotypes, political/religious assumptions and gendered role assumptions.
- Local context may clarify an approved topic but must not introduce curriculum outside W3Schools-derived scope.
- Keep dates, currency, units and sample values consistent.
- Use Kannada strings deliberately when teaching text or Unicode handling; preserve their exact contents in expected output.

## 7. C1 lesson structure and Kannada learner-facing labels

Follow the C1 sequence. Use these Kannada labels consistently for the `kn` locale:

| C1 section | Kannada learner-facing label |
|---|---|
| Lesson header | ಪಾಠದ ವಿವರಗಳು |
| Learning outcome | ಈ ಪಾಠದ ನಂತರ ನೀವು ಮಾಡಬಲ್ಲದ್ದು |
| Why this matters | ಇದು ಏಕೆ ಉಪಯುಕ್ತ? |
| Prerequisite check | ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು |
| Key terms | ಪ್ರಮುಖ ಪದಗಳು |
| Concept explanation | ಪರಿಕಲ್ಪನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ |
| Worked example | ಉದಾಹರಣೆಯ ಮೂಲಕ ತಿಳಿದುಕೊಳ್ಳಿ |
| Code walkthrough | ಕೋಡ್ ಅನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ |
| Guided practice | ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಅಭ್ಯಾಸ |
| Independent practice | ನೀವೇ ಅಭ್ಯಾಸ ಮಾಡಿ |
| Knowledge check | ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ |
| Summary | ಮುಖ್ಯ ಅಂಶಗಳು |
| Completion check | ಪಾಠ ಪೂರ್ಣಗೊಳಿಸುವ ಮಾನದಂಡಗಳು |
| Next step | ಮುಂದಿನ ಹಂತ |
| Source and attribution | ಮೂಲ ಮತ್ತು ಉಲ್ಲೇಖ |

Keep metadata keys, IDs, API names and code tokens stable. Localize learner-facing strings only.

## 8. Instructions, questions, hints and feedback

- Write each instruction as a clear action and state the expected result or evidence.
- Number multi-step tasks in the order they should be completed.
- Avoid vague directions unless the goal and constraints are explicit.
- Ask direct questions; avoid double negatives, ambiguous references and trick wording.
- Keep multiple-choice options grammatically parallel and clearly distinguishable.
- Ensure grammar, option length or repeated terms do not accidentally reveal the answer.
- Feedback must say what is correct, what is missing and what the learner should try next.
- Incorrect-answer feedback must be respectful, specific and actionable.
- Use progressive hints: start with a conceptual clue, then a more focused clue; reveal the full solution only as allowed by the assessment policy.
- Preserve learning outcome, difficulty, scoring and answer correctness across all six language versions.

## 9. Kannada grammar, typography and accessibility

Before language approval:
- Check Kannada spelling, grammar, word joining, punctuation and natural sentence flow.
- Keep Kannada transliterations of technical terms consistent; avoid multiple spellings for the same term in one course.
- Use Kannada script for explanatory prose and Latin script for canonical technical terms, code and URLs.
- Avoid unnecessary English clauses inside Kannada sentences.
- Check spacing around punctuation, parentheses, numerals and inline code.
- Verify Kannada glyph rendering on web, Android and narrow screens; do not rely on a particular font being installed.
- Check line wrapping around long English terms, URLs and identifiers.
- Ensure text processing never changes code, identifiers or numeric literals.
- Use logical headings, readable contrast, keyboard navigation and meaningful text alternatives.
- Do not communicate meaning through color alone.
- Preserve code indentation and reading order for assistive technology.

## 10. Kannada review and publication workflow

A lesson is not ready for publication merely because Kannada text exists. It must pass:

1. **Curriculum review:** maps to an approved B7–B10 module and W3Schools source URL.
2. **Technical review:** terminology, code, syntax, output and explanation are correct.
3. **Kannada language review:** natural usage, spelling, grammar, readability and consistent register.
4. **Pedagogy review:** explanations, examples, hints and assessment support the same outcome.
5. **Parity review:** preserve objective, difficulty, answer and scoring across locales.
6. **Accessibility review:** headings, reading order, code presentation, glyph rendering and responsive behavior are usable.
7. **Publication review:** content version, reviewer identity, locale status and history are recorded.

Suggested locale workflow: `Draft → Kannada Review → Technical Review → Approved → Published`. Substantive corrections return the locale to Draft or the appropriate review state. Track overall content status separately from the `kn` locale status.

## 11. Kannada-specific quality checklist

- [ ] Kannada prose is natural, clear and respectful.
- [ ] Learner address and register are consistent.
- [ ] New technical terms are explained at first meaningful use.
- [ ] Canonical English terms and Kannada transliterations are consistent.
- [ ] Code, keywords, identifiers, syntax and expected output remain exact.
- [ ] Examples and practice content are original and within approved W3Schools scope.
- [ ] Instructions are actionable and expected evidence is clear.
- [ ] Questions and answer options are unambiguous.
- [ ] Hints are progressive and feedback is specific and respectful.
- [ ] Spelling, grammar, typography and Kannada glyph rendering are checked.
- [ ] Mobile layout and accessibility are reviewed.
- [ ] Learning outcome, difficulty and assessment parity are preserved.
- [ ] Technical and Kannada language reviews are recorded.
- [ ] Code execution status is stated honestly.

## 12. Acceptance criteria

C5 is complete when:
- Kannada language and editorial standards are documented.
- Teaching voice and repeatable explanation progression are defined.
- Kannada-English terminology and code-fidelity rules are explicit.
- Kannada learner-facing labels map to every C1 lesson section.
- Instructions, questions, hints and feedback rules are defined.
- Typography, accessibility, parity and publication review requirements are documented.
- The specification does not expand approved W3Schools curriculum scope.
- No lesson is claimed as authored, translated, executed, reviewed or published by this specification task.

## 13. Scope boundary and handoff

C5 defines Kannada-native teaching rules only. It does not create the complete multilingual glossary (C9), AI localization engine (C8), diagram standard (C10), code explanation specification (C11), exercise/quiz system (C12), mini-project system (C13) or final lesson evaluation and approval process (C14–C15).

**C5 is complete at Kannada teaching-rule specification scope.**  
**Next task: C6 — Define Tamil teaching rules.**
