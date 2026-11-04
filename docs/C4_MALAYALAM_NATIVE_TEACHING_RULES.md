# C4 — Malayalam-Native Teaching Rules

**Status:** Complete — Malayalam instructional and localization rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1 — Standard Lesson Structure  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive topic/source reference  
**Locale code:** `ml`  
**Artifact:** `docs/C4_MALAYALAM_NATIVE_TEACHING_RULES.md`

## 1. Purpose

Define how programming lessons are written and taught naturally in Malayalam. Malayalam is the language of instruction, not a sentence-by-sentence translation of English. Lessons must use clear, contemporary Malayalam while retaining the exact technical terms and programming syntax learners encounter in code.

C4 specializes the shared C1 lesson structure. It does not change approved topics, learning outcomes, code behavior, assessment policy or six-language parity requirements.

## 2. Malayalam language standard

1. Use clear, contemporary, standard Malayalam that is broadly understandable across Kerala and Malayalam-speaking learner communities.
2. Prefer natural Malayalam sentence order and idiom. Do not reproduce English syntax when it makes the Malayalam sentence awkward.
3. Use a respectful, learner-friendly register. Address the learner consistently with **"നിങ്ങൾ"** in instructional prose; do not switch unpredictably to overly familiar forms.
4. Prefer short, direct sentences. Explain one main idea at a time and split dense explanations into smaller paragraphs.
5. Use familiar Malayalam verbs and instructions, such as "നോക്കൂ", "ശ്രദ്ധിക്കുക", "എഴുതുക", "പരിശോധിക്കുക", "പ്രവർത്തിപ്പിക്കുക" and "വിശദീകരിക്കുക", where contextually natural.
6. Avoid unnecessarily literary, archaic, highly Sanskritized or highly regional vocabulary when a simpler expression is clearer.
7. Avoid slang, mockery, condescension, stereotypes and assumptions about a learner's location, education, age, gender or background.
8. Do not mix Malayalam and English arbitrarily. Retain English technical words according to the terminology policy.
9. Use Malayalam script for explanatory prose. Retain Latin script for canonical technical terms, code, identifiers, URLs and file names.
10. Use Arabic numerals (0–9) consistently for code values, numbered steps, measurements and assessment scores.
11. Apply Malayalam punctuation and readable spacing consistently. Keep headings short and descriptive.

## 3. Malayalam-English technical terminology policy

- At first meaningful use, show the canonical English technical term with a concise Malayalam explanation. Example: **Variable (വേരിയബിൾ)** — ഒരു മൂല്യം സൂക്ഷിക്കാൻ ഉപയോഗിക്കുന്ന പേരുള്ള സ്ഥാനം.
- After the first explanation, use the canonical English term consistently. A Malayalam transliteration may be used sparingly when it improves readability, but must not become a competing technical name.
- Preserve exact spelling and capitalization for programming languages, APIs, keywords, identifiers, commands, file names, data types and error names: `JavaScript`, `Python`, `HTML`, `CSS`, `SQL`, `DOM`, `JSON`, `API`.
- Never translate reserved keywords or executable syntax such as `if`, `else`, `for`, `while`, `function`, `return`, `class`, `SELECT` or `WHERE`.
- Do not invent Malayalam equivalents for API names, methods, properties, types or identifiers.
- Explain distinctions between terms that learners may confuse. Do not use one Malayalam phrase for two different technical concepts without clarifying the difference.
- Keep term usage consistent within a lesson and across related lessons. The complete approved multilingual glossary belongs to C9; C4 defines usage rules only.
- Do not transliterate a technical name in a way that makes it difficult to identify in documentation, editors or error messages.

### Preferred presentation

| First-use pattern | Example |
|---|---|
| English term + Malayalam explanation | **Loop (ലൂപ്പ്)** — ഒരു നിർദ്ദേശം ആവർത്തിച്ച് പ്രവർത്തിപ്പിക്കുന്ന ഘടന |
| Canonical term after definition | "ഈ Loop എപ്പോൾ അവസാനിക്കുന്നു എന്ന് ശ്രദ്ധിക്കുക." |
| Exact code token | `for`, `while`, `break`, `continue` |
| Exact API or type | `document.querySelector()`, `Array`, `String` |

## 4. Teaching voice and explanation pattern

Introduce a new concept using this progression:
1. State the idea in one simple Malayalam sentence.
2. Explain why it is useful within the selected approved topic.
3. Break the explanation into small, ordered steps.
4. Show a minimal, original example.
5. Explain the important code and the expected result.
6. Ask the learner to predict, change or create something.
7. Summarize the key rule and a common misunderstanding.

Additional rules:
- Explain what a concept means before explaining how to use it.
- Introduce required prior knowledge before relying on it.
- Make cause and effect explicit: input or condition, operation and resulting behavior.
- Use concrete examples and meaningful identifiers.
- Use analogies sparingly and explain where an analogy stops being accurate.
- Avoid unexplained jargon, filler introductions and repeated explanations.
- Do not assume that a learner understands a technical term just because it appears in a code block.
- Adjust explanation depth to B7–B10 without changing the shared learning outcome.

## 5. Code and example fidelity

1. Keep all code valid for the selected programming language and approved topic.
2. Do not translate or silently alter keywords, identifiers required by APIs, syntax, operators, file names or literal values.
3. Prefer meaningful identifiers and explain non-obvious names in Malayalam prose.
4. Label every code block with its language or format.
5. Present expected output separately; preserve exact spaces, punctuation, line breaks and capitalization.
6. Identify the result surface where relevant, such as a browser page, console or SQL result.
7. Begin with small examples and add complexity only when required by the learning outcome.
8. Write original examples. Do not copy W3Schools lesson prose, code examples, exercises, answers or diagrams.
9. Record whether a code sample was actually executed and in which environment. Never claim execution without evidence.
10. If execution has not been verified, record that status clearly in lesson authoring metadata.

## 6. Examples and learner context

- Use neutral, familiar contexts such as books, lists, products, simple calculations, schedules and sample records.
- Examples may use Malayalam names or text when useful, but should not make local cultural knowledge a prerequisite for understanding the programming concept.
- Use fictional, non-sensitive sample data. Never include real learner or customer personal information.
- Explain domain-specific vocabulary before relying on it.
- Avoid stereotypes, political or religious assumptions, and gendered role assumptions.
- Use local context only to clarify an approved topic; do not introduce curriculum topics outside the W3Schools-derived scope.
- Keep dates, currency, units and sample values consistent within each example.
- When teaching Unicode or text handling, Malayalam strings may be used as deliberate sample data; preserve the exact string in the expected output.

## 7. C1 lesson structure and Malayalam learner-facing labels

Follow the C1 lesson sequence. Use these Malayalam labels consistently for the `ml` locale:

| C1 section | Malayalam learner-facing label |
|---|---|
| Lesson header | പാഠത്തിന്റെ വിവരങ്ങൾ |
| Learning outcome | ഈ പാഠം കഴിഞ്ഞാൽ നിങ്ങൾക്ക് ചെയ്യാനാകുന്നത് |
| Why this matters | ഇത് എന്തുകൊണ്ട് പ്രയോജനകരമാണ്? |
| Prerequisite check | തുടങ്ങുന്നതിന് മുമ്പ് |
| Key terms | പ്രധാന പദങ്ങൾ |
| Concept explanation | ആശയം മനസ്സിലാക്കാം |
| Worked example | ഉദാഹരണത്തിലൂടെ നോക്കാം |
| Code walkthrough | കോഡ് വിശദമായി നോക്കാം |
| Guided practice | നിർദ്ദേശങ്ങളോടെയുള്ള പരിശീലനം |
| Independent practice | സ്വയം പരിശീലിക്കുക |
| Knowledge check | നിങ്ങളുടെ അറിവ് പരിശോധിക്കാം |
| Summary | പ്രധാന കാര്യങ്ങൾ |
| Completion check | പാഠം പൂർത്തിയാക്കാനുള്ള മാനദണ്ഡങ്ങൾ |
| Next step | അടുത്ത ഘട്ടം |
| Source and attribution | ഉറവിടവും അംഗീകാരവും |

Stable metadata keys, IDs, API names and code tokens remain unchanged. Localize learner-facing text only.

## 8. Instructions, questions, hints and feedback

- Write each instruction as a clear action. State what the learner should do and what result or evidence is expected.
- For multi-step tasks, use numbered steps in the correct order.
- Avoid vague directions such as "try something" unless the goal and constraints are clear.
- Ask direct questions. Avoid double negatives, ambiguous references and unnecessarily tricky wording.
- In multiple-choice questions, keep options grammatically parallel and clearly distinguishable.
- Do not let grammar, option length or repeated wording unintentionally reveal the correct answer.
- Feedback should identify what is correct, what is missing and what the learner can do next.
- Incorrect-answer feedback must remain respectful and specific; never shame the learner.
- Use progressive hints: start with a conceptual clue, then a more focused clue, and reveal a complete solution only as allowed by the assessment policy.
- Preserve the same learning objective, difficulty, scoring and answer correctness in all six language versions.

## 9. Malayalam grammar, typography and accessibility

Before language approval:
- Check spelling, grammar, word joining, punctuation and natural sentence flow.
- Check consistency of Malayalam technical transliterations; avoid multiple spellings for the same term in one course.
- Ensure Malayalam prose uses Malayalam script, while canonical technical tokens and code remain in Latin script.
- Avoid unnecessary English clauses embedded in Malayalam sentences.
- Check spacing around punctuation, parentheses, numerals and inline code.
- Ensure Malayalam glyphs render correctly on web, Android and narrow screens; do not rely on a particular device font being installed.
- Check line wrapping around long English terms, URLs and code identifiers.
- Ensure text processing does not convert code, identifiers or numeric literals.
- Use logical headings, readable contrast, keyboard navigation and meaningful text alternatives.
- Do not communicate meaning through color alone.
- Verify that code indentation and reading order remain intact for assistive technology.

## 10. Malayalam review and publication workflow

A lesson is not ready for publication merely because Malayalam text exists. It must pass:

1. **Curriculum review:** maps to an approved B7–B10 module and W3Schools source URL.
2. **Technical review:** terminology, code, syntax, output and explanation are correct.
3. **Malayalam language review:** natural usage, spelling, grammar, readability and consistent register.
4. **Pedagogy review:** explanations, examples, hints and assessment support the same outcome.
5. **Parity review:** compare with the shared lesson contract; preserve objective, difficulty, answer and scoring.
6. **Accessibility review:** headings, reading order, code presentation, glyph rendering and responsive behavior are usable.
7. **Publication review:** content version, reviewer identity, locale status and history are recorded.

Suggested locale workflow: `Draft → Malayalam Review → Technical Review → Approved → Published`. Substantive corrections return the locale to Draft or the appropriate review state. Track overall content status separately from the `ml` locale status.

## 11. Malayalam-specific quality checklist

- [ ] Malayalam prose is natural, clear and respectful.
- [ ] Learner address and register are consistent.
- [ ] New technical terms are explained at first meaningful use.
- [ ] Canonical English technical names and transliterations are consistent.
- [ ] Code, keywords, identifiers, syntax and expected output remain exact.
- [ ] Examples and practice content are original and within approved W3Schools scope.
- [ ] Instructions are actionable and expected evidence is clear.
- [ ] Questions and answer options are unambiguous.
- [ ] Hints are progressive and feedback is specific and respectful.
- [ ] Spelling, grammar, typography and Malayalam glyph rendering are checked.
- [ ] Mobile layout and accessibility are reviewed.
- [ ] Learning outcome, difficulty and assessment parity are preserved.
- [ ] Technical and Malayalam language reviews are recorded.
- [ ] Code execution status is stated honestly.

## 12. Acceptance criteria

C4 is complete when:
- Malayalam language and editorial standards are documented.
- Teaching voice and a repeatable explanation progression are defined.
- Malayalam-English terminology and code-fidelity rules are explicit.
- Malayalam learner-facing labels map to every C1 lesson section.
- Instructions, questions, hints and feedback rules are defined.
- Typography, accessibility, parity and publication review requirements are documented.
- The specification does not expand the approved W3Schools curriculum.
- No lesson is claimed as authored, translated, executed, reviewed or published by this specification task.

## 13. Scope boundary and handoff

C4 defines Malayalam-native teaching rules only. It does not create the complete multilingual glossary (C9), AI localization engine (C8), diagram standard (C10), code explanation specification (C11), exercise/quiz system (C12), mini-project system (C13) or final lesson evaluation and approval process (C14–C15).

**C4 is complete at Malayalam teaching-rule specification scope.**  
**Next task: C5 — Define Kannada teaching rules.**
