# C3 — English-Native Teaching Rules

**Status:** Complete — English instructional and localization rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1 — Standard Lesson Structure  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive topic/source reference  
**Locale code:** `en`  
**Artifact:** `docs/C3_ENGLISH_NATIVE_TEACHING_RULES.md`

## 1. Purpose

Define how programming lessons are written and taught clearly and naturally in English. English is a teaching language in its own right, not merely the source text from which other language versions are translated. Lessons must be precise, readable, technically accurate and appropriate to the learner's level.

C3 specializes the shared C1 lesson structure. It does not change the approved curriculum, learning outcomes, code behavior, assessment policy or parity requirements.

## 2. English language standard

1. Use clear, contemporary, internationally understandable English.
2. Prefer plain English over unnecessarily formal, academic or decorative wording.
3. Use standard spelling and grammar consistently within a lesson. The project should select one English spelling convention for the platform and record it as an editorial setting before bulk content production; do not mix variants within one lesson.
4. Prefer active voice and direct sentences. Use passive voice only when the actor is unknown or irrelevant.
5. Keep most sentences focused on one idea. Break complex explanations into short paragraphs and ordered steps.
6. Define uncommon words and technical terms before relying on them.
7. Avoid idioms, regional slang, culturally narrow jokes and wordplay that may confuse international learners or translate poorly.
8. Address the learner consistently as **"you"**. Do not alternate between "you", "the student", "the user" and impersonal commands without a reason.
9. Use respectful, encouraging and neutral language. Never shame learners or imply that a concept is obvious or effortless.
10. Use concise, descriptive headings that communicate the purpose of each section.
11. Use numerals consistently for code values, numbered procedures, measurements and assessment scores.
12. Use punctuation and capitalization consistently, especially in headings, lists, inline code and quoted output.

## 3. Technical terminology policy

- Use the canonical technical term used by the selected programming language or W3Schools topic.
- Explain a term briefly at first meaningful use when it may be unfamiliar to the target level.
- Do not replace precise technical terms with vague everyday synonyms.
- Distinguish related concepts explicitly when their names are easily confused (for example, a value versus a variable, or a parameter versus an argument).
- Preserve exact capitalization and spelling for languages, APIs, keywords, identifiers, file names, commands, data types and error names.
- Do not invent alternate names for established APIs or syntax.
- Use one term consistently within a lesson and across related lessons. The cross-language canonical glossary and approved translations are governed by C9, not defined exhaustively here.
- Expand an abbreviation on first use when it is not universally familiar to the intended level; retain the standard abbreviation thereafter.

## 4. Teaching voice and explanation pattern

For a new concept, use this instructional progression:
1. State the concept in one plain-English sentence.
2. Explain why it matters within the selected topic.
3. Divide the explanation into manageable steps.
4. Show a minimal, original example.
5. Explain the important code and the expected result.
6. Ask the learner to predict, modify or create something.
7. Summarize the rule and a likely misconception.

Additional rules:
- Explain what a concept is before discussing how to use it.
- Introduce prerequisites before depending on them.
- Explain cause and effect: identify the input or condition, the operation performed and the resulting behavior.
- Use concrete examples and meaningful names.
- Use analogies sparingly; state their limits when an analogy could be misleading.
- Avoid unexplained jargon, filler introductions and repeated summaries.
- Do not assume a beginner understands a technical word merely because it appears in code.
- Increase precision and depth with B7–B10 level expectations without changing the core outcome.

## 5. Code and example fidelity

1. Keep code syntactically valid for the selected language and topic.
2. Never translate or silently alter keywords, identifiers required by APIs, operators, syntax, file names or literal values.
3. Use meaningful identifiers that help the learner understand the example. Explain non-obvious names in prose.
4. Label each code block with its programming language or format.
5. Present expected output separately and preserve exact spaces, punctuation, line breaks and capitalization.
6. Identify where the result appears: browser page, console, SQL result, or another relevant output surface.
7. Keep examples minimal before introducing additional complexity.
8. Write original examples; do not copy W3Schools explanations, code samples, exercise prompts, solutions or diagrams.
9. Record whether an example was actually executed and in what environment. Never claim execution or verification without evidence.
10. If a sample is illustrative and has not been run, label its execution status as not verified in authoring metadata.

## 6. Examples and context

- Use broadly understandable contexts such as lists, books, products, simple calculations, schedules and sample records.
- Do not assume the learner's country, culture, age, education, gender or occupation.
- Use fictional, non-sensitive sample data. Never include real learner or customer personal data.
- Explain domain-specific vocabulary when it is needed for the programming example.
- Avoid stereotypes, political/religious assumptions and culturally exclusionary references.
- Local examples may improve relevance, but they must not add curriculum topics outside the approved W3Schools scope.
- Keep names, dates, currencies and units internally consistent within an example.

## 7. C1 lesson structure and learner-facing labels

Use the exact C1 sequence. The English labels below are the canonical learner-facing labels for the `en` locale:

| C1 section | English label |
|---|---|
| Lesson header | Lesson overview |
| Learning outcome | What you will learn |
| Why this matters | Why it matters |
| Prerequisite check | Before you begin |
| Key terms | Key terms |
| Concept explanation | Understand the concept |
| Worked example | Worked example |
| Code walkthrough | Walk through the code |
| Guided practice | Guided practice |
| Independent practice | Try it yourself |
| Knowledge check | Check your understanding |
| Summary | Key takeaways |
| Completion check | Completion criteria |
| Next step | Next step |
| Source and attribution | Sources and attribution |

Keep stable metadata keys, IDs, API names and code tokens unchanged. Localize only learner-facing strings.

## 8. Instructions, questions, hints and feedback

- Write task instructions as direct, actionable steps.
- State the expected result or evidence for each substantial task.
- Avoid vague instructions such as "play around with this" unless the exploration goal and boundaries are stated.
- Ask one clear question at a time where possible.
- Avoid double negatives, ambiguous pronouns and unnecessary trick wording.
- Keep multiple-choice options grammatically parallel and mutually distinguishable.
- Ensure question wording does not reveal the answer accidentally.
- Provide feedback that identifies what is correct, what is missing and what to try next.
- Make incorrect-answer feedback specific, respectful and actionable.
- Use progressive hints: begin with a conceptual nudge, then a more specific direction, and reveal the full solution only according to the assessment policy.
- Preserve the same learning objective, difficulty, scoring and answer correctness across all language versions.

## 9. Grammar, readability and accessibility

Before approval:
- Check grammar, spelling, punctuation and consistency of the selected English spelling convention.
- Check sentence length, paragraph density and reading level against the learner's stage.
- Avoid unexplained abbreviations and ambiguous pronouns.
- Use headings in logical order and lists for genuine sequences or grouped items.
- Ensure inline code and long identifiers remain readable on narrow screens.
- Do not rely on color alone to communicate meaning.
- Provide meaningful text alternatives for instructional diagrams and non-text content.
- Ensure code blocks can be navigated and read without losing indentation or line order.
- Check keyboard navigation, focus order, contrast and responsive behavior.
- Keep visible instructions and assessment wording clear to assistive technology.

## 10. English review and publication workflow

A lesson is not approved merely because it is written in English. It must pass:
1. **Curriculum review:** maps to an approved B7–B10 module and W3Schools source URL.
2. **Technical review:** terminology, syntax, code and explanations are correct.
3. **English editorial review:** grammar, clarity, consistency, tone and readability.
4. **Pedagogy review:** explanation sequence, examples, hints and assessment support the learning outcome.
5. **Localization parity review:** compare against the shared lesson contract; no change to objective, difficulty, answer or scoring.
6. **Accessibility review:** structure, reading order, code presentation and responsive behavior are usable.
7. **Publication review:** version, reviewer identity, locale status and content history are recorded.

Suggested locale workflow: `Draft → English Review → Technical Review → Approved → Published`. Substantive changes return the locale to Draft or the appropriate review state. Overall content status and the `en` locale status must be tracked separately.

## 11. English-specific quality checklist

- [ ] English is clear, natural and internationally understandable.
- [ ] Learner is addressed consistently as "you".
- [ ] Spelling convention and technical capitalization are consistent.
- [ ] New or level-sensitive technical terms are explained at first use.
- [ ] Code, syntax, identifiers and expected output remain exact.
- [ ] Examples and practice content are original and within approved W3Schools scope.
- [ ] Instructions are actionable and expected evidence is clear.
- [ ] Questions and answer options are unambiguous.
- [ ] Hints are progressive and feedback is respectful and actionable.
- [ ] Reading level and explanation depth fit the selected B7–B10 level.
- [ ] Accessibility and mobile presentation are reviewed.
- [ ] Learning outcome, difficulty and assessment parity are preserved.
- [ ] Technical and English editorial reviews are recorded.
- [ ] Code execution status is reported honestly.

## 12. Acceptance criteria

C3 is complete when:
- English writing, spelling and editorial standards are documented.
- Teaching voice and repeatable explanation progression are defined.
- Technical terminology and code-fidelity rules are explicit.
- English learner-facing labels map to the C1 lesson sequence.
- Instructions, questions, hints and feedback rules are defined.
- Readability, accessibility, parity and publication reviews are documented.
- The specification does not expand the approved W3Schools curriculum.
- No lesson is claimed as authored, executed, reviewed or published by this specification task.

## 13. Scope boundary and handoff

C3 defines English-native teaching rules only. It does not create the complete technical glossary (C9), AI localization engine (C8), diagram standard (C10), code explanation specification (C11), exercise/quiz system (C12), mini-project system (C13) or final content evaluation and approval process (C14–C15).

**C3 is complete at English teaching-rule specification scope.**  
**Next task: C4 — Define Malayalam teaching rules.**
