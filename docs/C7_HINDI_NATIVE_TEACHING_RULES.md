# C7 — Hindi-Native Teaching Rules

**Status:** Complete — Hindi instructional and localization rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1 — Standard Lesson Structure  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive topic/source reference  
**Locale code:** `hi`  
**Artifact:** `docs/C7_HINDI_NATIVE_TEACHING_RULES.md`

## 1. Purpose

Define how programming lessons are written and taught naturally in Hindi. Hindi is the language of instruction, not a literal sentence-by-sentence translation of English. Lessons must use clear, contemporary Hindi while preserving the technical names and exact programming syntax learners need to recognize in code.

C7 specializes the shared C1 lesson structure. It does not change approved topics, learning outcomes, code behavior, assessment policy or six-language parity.

## 2. Hindi language standard

1. Use clear, contemporary standard Hindi that is broadly understandable to Hindi-speaking learners.
2. Prefer natural Hindi sentence structure; do not imitate English word order when it makes the explanation awkward.
3. Address the learner respectfully and consistently as **"आप"** in instructional prose. Do not switch unpredictably to informal "तुम" or "तू".
4. Prefer short, direct sentences. Explain one main idea at a time and split dense explanations into smaller paragraphs.
5. Use familiar instructional verbs such as "ध्यान दें", "देखें", "लिखें", "जाँचें", "चलाएँ" and "समझाएँ" where natural.
6. Avoid unnecessarily literary, archaic, overly Sanskritized or highly regional vocabulary when a simpler Hindi expression is clearer.
7. Avoid slang, mockery, condescension, stereotypes and assumptions about learner age, gender, region, education or background.
8. Do not mix Hindi and English arbitrarily. Retain English technical terms according to the terminology policy.
9. Use Devanagari for Hindi explanations. Retain Latin script for canonical technical terms, code, identifiers, URLs and file names.
10. Use Arabic numerals (0–9) consistently for code values, numbered steps, measurements and assessment scores.
11. Use punctuation, spacing and concise descriptive headings consistently.

## 3. Hindi-English technical terminology policy

- At first meaningful use, show the canonical English technical term with a short Hindi explanation. Example: **Variable (वेरिएबल / चर)** — किसी मान को संग्रहीत करने के लिए इस्तेमाल किया जाने वाला नामित स्थान.
- After first explanation, use the canonical English term consistently when it is the clearest technical reference. Use a Hindi equivalent only when it is natural, unambiguous and consistent with the approved glossary.
- Preserve exact spelling and capitalization for programming languages, APIs, keywords, identifiers, commands, file names, data types and error names: `JavaScript`, `Python`, `HTML`, `CSS`, `SQL`, `DOM`, `JSON`, `API`.
- Never translate reserved keywords or executable syntax such as `if`, `else`, `for`, `while`, `function`, `return`, `class`, `SELECT` or `WHERE`.
- Do not invent Hindi names for APIs, methods, properties, types or identifiers.
- Distinguish related technical concepts clearly; do not use one vague Hindi phrase for multiple meanings.
- Keep terminology consistent within and across lessons. C9 owns the complete multilingual glossary; C7 defines usage rules only.
- Avoid transliterations that make technical names hard to recognize in editors, documentation or error messages.

## 4. Teaching voice and explanation pattern

Introduce a new concept in this order:
1. State the idea in one simple Hindi sentence.
2. Explain why it matters within the selected approved topic.
3. Break the explanation into small, ordered steps.
4. Show a minimal, original example.
5. Explain the important code and expected result.
6. Ask the learner to predict, modify or create something.
7. Summarize the key rule and a likely misunderstanding.

Additional rules:
- Explain what a concept means before describing how to use it.
- Introduce prerequisites before relying on them.
- Explain cause and effect: input or condition, operation and resulting behavior.
- Use concrete examples and meaningful identifiers.
- Use analogies sparingly and explain their limits when they could mislead.
- Avoid unexplained jargon, filler introductions and unnecessary repetition.
- Do not assume a learner understands a technical term merely because it appears in code.
- Adjust explanation depth to B7–B10 without changing the shared learning outcome.

## 5. Code and example fidelity

1. Keep code valid for the selected programming language and approved topic.
2. Never translate or silently alter keywords, API identifiers, syntax, operators, file names or literal values.
3. Prefer meaningful identifiers and explain non-obvious names in Hindi prose.
4. Label each code block with its language or format.
5. Present expected output separately and preserve exact spaces, punctuation, line breaks and capitalization.
6. Identify the result surface when relevant, such as a browser page, console or SQL result.
7. Start with minimal examples and add complexity only when required by the learning outcome.
8. Write original examples. Do not copy W3Schools lesson prose, code samples, exercise prompts, answers or diagrams.
9. Record whether code was actually executed and in which environment. Never claim execution without evidence.
10. Mark unverified execution status clearly in authoring metadata.

## 6. Examples and learner context

- Use neutral, familiar contexts such as books, lists, products, simple calculations, schedules and sample records.
- Hindi names or text may be used where useful, but cultural or regional knowledge must not be required to understand the programming concept.
- Use fictional, non-sensitive sample data. Never include real learner or customer personal information.
- Explain domain-specific words before relying on them.
- Avoid stereotypes, political/religious assumptions and gendered role assumptions.
- Local context may clarify an approved topic but must not introduce curriculum outside the W3Schools-derived scope.
- Keep dates, currency, units and sample values consistent.
- Use Hindi strings deliberately when teaching text or Unicode handling; preserve exact text in expected output.

## 7. C1 lesson structure and Hindi learner-facing labels

Follow the C1 sequence. Use these Hindi labels consistently for the `hi` locale:

| C1 section | Hindi learner-facing label |
|---|---|
| Lesson header | पाठ का विवरण |
| Learning outcome | इस पाठ के बाद आप क्या कर पाएँगे |
| Why this matters | यह क्यों उपयोगी है? |
| Prerequisite check | शुरू करने से पहले |
| Key terms | मुख्य शब्द |
| Concept explanation | अवधारणा को समझें |
| Worked example | उदाहरण से समझें |
| Code walkthrough | कोड को समझें |
| Guided practice | मार्गदर्शन के साथ अभ्यास |
| Independent practice | स्वयं अभ्यास करें |
| Knowledge check | अपनी समझ जाँचें |
| Summary | मुख्य बातें |
| Completion check | पाठ पूरा करने के मानदंड |
| Next step | अगला चरण |
| Source and attribution | स्रोत और श्रेय |

Keep metadata keys, IDs, API names and code tokens stable. Localize learner-facing strings only.

## 8. Instructions, questions, hints and feedback

- Write each instruction as a clear action and state the expected result or evidence.
- Number multi-step tasks in the order they should be completed.
- Avoid vague directions unless the goal and constraints are explicit.
- Ask direct questions; avoid double negatives, ambiguous references and unnecessary trick wording.
- Keep multiple-choice options grammatically parallel and clearly distinguishable.
- Ensure wording does not accidentally reveal the answer.
- Feedback must explain what is correct, what is missing and what the learner should try next.
- Incorrect-answer feedback must be respectful, specific and actionable.
- Use progressive hints: begin with a conceptual clue, then a more focused clue; reveal the full solution only as allowed by the assessment policy.
- Preserve the same learning outcome, difficulty, scoring and answer correctness across all six language versions.

## 9. Hindi grammar, typography and accessibility

Before language approval:
- Check Hindi spelling, grammar, sentence flow, punctuation and consistency of Devanagari usage.
- Keep technical transliterations and Hindi equivalents consistent; avoid multiple spellings for the same term in one course.
- Use Devanagari for Hindi prose and Latin script for canonical technical terms, code and URLs.
- Avoid unnecessary English clauses embedded in Hindi sentences.
- Check spacing around punctuation, parentheses, numerals and inline code.
- Verify Devanagari glyph rendering on web, Android and narrow screens; do not rely on a particular font being installed.
- Check line wrapping around long English terms, URLs and identifiers.
- Ensure text processing never changes code, identifiers or numeric literals.
- Use logical headings, readable contrast, keyboard navigation and meaningful text alternatives.
- Do not communicate meaning through color alone.
- Preserve code indentation and reading order for assistive technology.

## 10. Hindi review and publication workflow

A lesson is not ready for publication merely because Hindi text exists. It must pass:

1. **Curriculum review:** maps to an approved B7–B10 module and W3Schools source URL.
2. **Technical review:** terminology, code, syntax, output and explanation are correct.
3. **Hindi language review:** natural usage, spelling, grammar, readability and consistent register.
4. **Pedagogy review:** explanations, examples, hints and assessment support the same outcome.
5. **Parity review:** preserve objective, difficulty, answer and scoring across locales.
6. **Accessibility review:** headings, reading order, code presentation, glyph rendering and responsive behavior are usable.
7. **Publication review:** content version, reviewer identity, locale status and history are recorded.

Suggested locale workflow: `Draft → Hindi Review → Technical Review → Approved → Published`. Substantive corrections return the locale to Draft or the appropriate review state. Track overall content status separately from the `hi` locale status.

## 11. Hindi-specific quality checklist

- [ ] Hindi prose is natural, clear and respectful.
- [ ] Learner address and register are consistent.
- [ ] New technical terms are explained at first meaningful use.
- [ ] Canonical English terms and Hindi equivalents are consistent.
- [ ] Code, keywords, identifiers, syntax and expected output remain exact.
- [ ] Examples and practice content are original and within approved W3Schools scope.
- [ ] Instructions are actionable and expected evidence is clear.
- [ ] Questions and answer options are unambiguous.
- [ ] Hints are progressive and feedback is specific and respectful.
- [ ] Spelling, grammar, typography and Devanagari glyph rendering are checked.
- [ ] Mobile layout and accessibility are reviewed.
- [ ] Learning outcome, difficulty and assessment parity are preserved.
- [ ] Technical and Hindi language reviews are recorded.
- [ ] Code execution status is stated honestly.

## 12. Acceptance criteria

C7 is complete when:
- Hindi language and editorial standards are documented.
- Teaching voice and repeatable explanation progression are defined.
- Hindi-English terminology and code-fidelity rules are explicit.
- Hindi learner-facing labels map to every C1 lesson section.
- Instructions, questions, hints and feedback rules are defined.
- Typography, accessibility, parity and publication review requirements are documented.
- The specification does not expand approved W3Schools curriculum scope.
- No lesson is claimed as authored, translated, executed, reviewed or published by this specification task.

## 13. Scope boundary and handoff

C7 defines Hindi-native teaching rules only. It does not create the complete multilingual glossary (C9), AI localization engine (C8), diagram standard (C10), code explanation specification (C11), exercise/quiz system (C12), mini-project system (C13) or final lesson evaluation and approval process (C14–C15).

**C7 is complete at Hindi teaching-rule specification scope.**  
**Next task: C8 — Design AI Localization Engine.**
