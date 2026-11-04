# C6 — Tamil-Native Teaching Rules

**Status:** Complete — Tamil instructional rules defined  
**Stage:** C — Teaching & Content Engine  
**Depends on:** C1 — Standard Lesson Structure  
**Curriculum boundary:** Approved B7–B10 pathways; W3Schools is the exclusive topic/source reference  
**Locale:** `ta`

## 1. Purpose

Define natural Tamil teaching standards for programming lessons. Tamil is the language of instruction, not a literal translation layer over English. This specification specializes C1 without changing approved topics, learning outcomes, code behavior, assessment policy or six-language parity.

## 2. Tamil language standard

1. Use clear, contemporary standard Tamil that is broadly understandable.
2. Prefer natural Tamil sentence structure; do not imitate English word order when it sounds awkward.
3. Address learners respectfully and consistently as **"நீங்கள்"**.
4. Use short, direct sentences and explain one main idea at a time.
5. Prefer clear instructional verbs such as "கவனிக்கவும்", "பார்க்கவும்", "எழுதவும்", "சோதிக்கவும்", "இயக்கவும்" and "விளக்கவும்".
6. Avoid archaic, unnecessarily literary, highly regional or overly formal wording when simpler Tamil is clearer.
7. Avoid slang, mockery, stereotypes and assumptions about learner age, gender, location or education.
8. Use Tamil script for explanations; retain Latin script for canonical technical terms, code, identifiers, URLs and file names.
9. Use Arabic numerals (0–9) for code values, numbered steps, measurements and scores.
10. Apply punctuation, spacing and concise headings consistently.

## 3. Technical terminology

- At first meaningful use, show the canonical English technical term with a short Tamil explanation. Example: **Variable (மாறி)** — ஒரு மதிப்பைச் சேமிக்கப் பயன்படும் பெயரிடப்பட்ட இடம்.
- Thereafter use the canonical English term consistently when it is the clearest technical reference.
- Preserve exact spelling and capitalization for language names, APIs, keywords, identifiers, commands, file names, types and error names: `JavaScript`, `Python`, `HTML`, `CSS`, `SQL`, `DOM`, `JSON`, `API`.
- Never translate executable syntax such as `if`, `else`, `for`, `while`, `function`, `return`, `class`, `SELECT` or `WHERE`.
- Do not invent Tamil names for APIs, methods, properties or identifiers.
- Distinguish related technical concepts clearly; do not use one vague equivalent for different meanings.
- Keep terms consistent. C9 owns the complete multilingual glossary; C6 defines usage rules only.

## 4. Teaching voice and explanation pattern

Introduce a concept in this order:
1. State the idea in one simple Tamil sentence.
2. Explain why it matters in the approved topic.
3. Break it into small, ordered steps.
4. Show a minimal, original example.
5. Explain the important code and expected result.
6. Ask the learner to predict, modify or create something.
7. Summarize the key rule and a likely misunderstanding.

Explain what a concept means before how to use it. Introduce prerequisites before relying on them. Explain cause and effect explicitly. Use meaningful examples and identifiers. Avoid unexplained jargon, filler and unnecessary repetition. Adjust depth to B7–B10 without changing the shared learning outcome.

## 5. Code and example fidelity

1. Keep code valid for the selected language and approved topic.
2. Never translate or silently alter keywords, API identifiers, syntax, operators, file names or literal values.
3. Label each code block with its language or format.
4. Show expected output separately and preserve exact spaces, punctuation, line breaks and capitalization.
5. Identify the output surface when relevant, such as browser, console or SQL result.
6. Write original examples. Do not copy W3Schools prose, code, exercises, answers or diagrams.
7. Record whether code was actually executed and in which environment. Never claim execution without evidence.
8. Mark unverified execution status in authoring metadata.

## 6. Examples and learner context

Use neutral contexts such as books, lists, products, calculations, schedules and sample records. Tamil names or strings may be used when useful, but cultural knowledge must not be required to understand the concept. Use fictional, non-sensitive data. Explain domain words before relying on them. Avoid stereotypes and political, religious or gender assumptions. Local context must not add curriculum outside W3Schools scope.

## 7. C1 lesson sequence — Tamil labels

| C1 section | Tamil learner-facing label |
|---|---|
| Lesson header | பாட விவரங்கள் |
| Learning outcome | இந்தப் பாடத்தின் முடிவில் நீங்கள் செய்யக்கூடியவை |
| Why this matters | இது ஏன் முக்கியம்? |
| Prerequisite check | தொடங்குவதற்கு முன் |
| Key terms | முக்கிய சொற்கள் |
| Concept explanation | கருத்தைப் புரிந்துகொள்வோம் |
| Worked example | எடுத்துக்காட்டின் மூலம் பார்ப்போம் |
| Code walkthrough | Code-ஐப் புரிந்துகொள்வோம் |
| Guided practice | வழிகாட்டுதலுடன் பயிற்சி |
| Independent practice | நீங்களே பயிற்சி செய்யுங்கள் |
| Knowledge check | உங்கள் புரிதலைச் சரிபார்க்கவும் |
| Summary | முக்கிய குறிப்புகள் |
| Completion check | பாடத்தை முடிப்பதற்கான அளவுகோல்கள் |
| Next step | அடுத்த படி |
| Source and attribution | ஆதாரம் மற்றும் மேற்கோள் |

Keep metadata keys, IDs, API names and code tokens stable. Localize learner-facing strings only.

## 8. Instructions, questions and feedback

- Give direct instructions and state the expected result or evidence.
- Number multi-step tasks in completion order.
- Avoid double negatives, ambiguous references and unnecessary trick questions.
- Keep multiple-choice options grammatically parallel and distinguishable.
- Ensure wording does not accidentally reveal the answer.
- Feedback must state what is correct, what is missing and what to try next.
- Incorrect-answer feedback must be respectful and actionable.
- Use progressive hints; reveal the complete solution only as allowed by the assessment policy.
- Preserve the same outcome, difficulty, scoring and answer correctness across all six locales.

## 9. Tamil typography and accessibility

Check spelling, grammar, word joining, punctuation and natural sentence flow. Keep technical transliterations consistent. Verify Tamil glyph rendering on web, Android and narrow screens; do not rely on a specific installed font. Check wrapping around English terms, URLs and inline code. Ensure text processing never changes code or numeric literals. Use logical headings, readable contrast, keyboard navigation and meaningful text alternatives. Do not rely on color alone. Preserve code indentation and reading order.

## 10. Review and publication

Every Tamil lesson must pass:
1. Curriculum review against an approved B7–B10 module and W3Schools source URL.
2. Technical review of terminology, code, syntax and output.
3. Tamil language review of natural usage, spelling, grammar and readability.
4. Pedagogy review of explanation, examples, hints and assessment.
5. Parity review of outcome, difficulty, answer and scoring.
6. Accessibility review of structure, glyph rendering and responsive behavior.
7. Publication review recording version, reviewers, locale status and history.

Suggested locale workflow: `Draft → Tamil Review → Technical Review → Approved → Published`. Track overall content status separately from the `ta` locale status.

## 11. Quality checklist

- [ ] Tamil prose is natural, clear and respectful.
- [ ] Learner address is consistent.
- [ ] New technical terms are explained at first meaningful use.
- [ ] Canonical English terms are consistent.
- [ ] Code, syntax, identifiers and expected output remain exact.
- [ ] Examples and practice are original and within approved W3Schools scope.
- [ ] Instructions and expected evidence are clear.
- [ ] Questions are unambiguous; hints are progressive.
- [ ] Feedback is specific and respectful.
- [ ] Spelling, grammar, typography and Tamil glyph rendering are checked.
- [ ] Mobile and accessibility review is complete.
- [ ] Learning outcome, difficulty and assessment parity are preserved.
- [ ] Technical and Tamil language reviews are recorded.
- [ ] Execution status is honest.

## 12. Acceptance criteria

C6 is complete when Tamil language standards, teaching voice, terminology and code-fidelity rules, C1-aligned labels, instruction and feedback rules, typography/accessibility checks, parity and review requirements are documented. This specification does not expand W3Schools curriculum scope. No lesson is claimed as authored, executed, reviewed or published by this task.

## 13. Scope and handoff

C6 defines Tamil-native teaching rules only. It does not create the complete glossary (C9), AI localization engine (C8), diagram standard (C10), code explanation format (C11), exercise/quiz system (C12), mini-project system (C13) or final quality/approval process (C14–C15).

**C6 is complete at Tamil teaching-rule specification scope.**  
**Next task: C7 — Define Hindi teaching rules.**
