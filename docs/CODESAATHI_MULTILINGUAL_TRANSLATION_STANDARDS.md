# CodeSaathi — Multilingual Translation & Lesson Content Development Standards

Project: MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM (CodeSaathi)  
Repository: kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM  
English source folder: en  
Target language folders: as, bn, brx, doi, gu, hi, kn, kok, ks, mai, ml, mni, mr, ne, or, pa, sa, sat, sd, ta, te, ur

## 1. Purpose and principles

These notes define how CodeSaathi lessons are authored, localized, reviewed, validated and committed. The goal is not merely to translate English lessons. Learners should understand programming concepts in their preferred language, reason independently and apply concepts in practice.

- Preserve technical meaning, accuracy and teaching quality in all 23 languages.
- Give all languages equal educational importance and care.
- Write naturally for learners in each language; do not mechanically copy English sentence structure.
- Use simple, accessible language without reducing teaching depth.
- Use W3Schools only as a curriculum coverage reference. Do not mass-copy protected content; create original explanations, examples and diagrams.
- Preserve the repository's approved architecture, JSON schema, IDs, references, course IDs, module IDs and topic IDs.
- Keep lesson status as draft unless publication is explicitly authorized.
- Distinguish ChatGPT self-review from independent native-speaker review. Never claim independent review without evidence.

## 2. Three-stage lesson structure

Every lesson follows these teaching stages:

1. Stage 1 — Concept Understanding: establish what the concept means and the mental model the learner needs.
2. Stage 2 — Detailed Explanation: explain how and why it works, its parts, relationships, practical context and relevant step-by-step processes.
3. Stage 3 — Practice & Application: help learners apply the concept independently through guided and independent practice, questions and assessment.

Include these fields as appropriate to the lesson and existing schema: Learning Objectives, Prerequisites, Worked Examples, Practical Examples, Practice Tasks, Hints, Assessment Questions, Options, Correct Answers and Explanations.

The stages, objectives, practice and assessment must align.

## 3. Learning Objectives — mandatory quality standard

Learning Objectives are measurable learning outcomes, not topic labels or headings.

A strong objective clearly communicates what the learner will understand, identify, compare, explain, solve, implement or perform after the lesson. Where useful, include the concept's meaning and a practical context.

### 3.1 Objective quality checklist

- State the concept or skill to be learned clearly.
- Make the expected learner outcome explicit.
- Use an appropriate learning action such as understand, identify, compare, explain, apply or solve.
- Include a practical context or small example where it improves clarity.
- Do not combine unrelated outcomes unnecessarily.
- Do not duplicate an outcome using different wording.
- Align each objective with Stage 1, Stage 2, Stage 3 and assessment.
- Ensure learner achievement can be evaluated using the objective.

Avoid labels such as Internet, Web Browser or Web Server. Prefer complete outcomes explaining what the learner will understand or be able to do.

### 3.2 Objective count

- Include enough objectives to cover the lesson's important concepts and outcomes.
- Do not inflate the count by splitting one outcome unnecessarily.
- Do not omit important outcomes to meet a fixed count.
- There is no universal required number. F0.1 used 8; F1.5 and F1.6 used 20 because of their scope. These are examples, not global requirements.

### 3.3 Multilingual objective parity

- Represent every important English learning outcome in all other languages.
- Preserve scope, intent and level of detail, not necessarily sentence length.
- Use natural sentence structures in each language.
- Never reduce a complete objective to a short label in any language.
- Review objectives independently in every language; do not mechanically copy sentence structures.

## 4. Translation style — nativity, simplicity and depth

Translation is not word substitution. Each version should read as if a capable educator who speaks that language is naturally teaching the subject.

### 4.1 Nativity

- Use words and sentence patterns natural to the target language.
- Do not force English sentence order or grammar onto the target language.
- Avoid unnecessarily difficult or artificial vocabulary.
- Explain technical meaning in accessible language.
- Keep technical terms in English when that is clearer or standard for learners.
- Maintain consistent terminology for the same technical concept.
- Adapt phrasing and teaching style without changing technical meaning.

### 4.2 Simple language does not mean short content

Required approach: simple language + sufficiently detailed explanation + deep teaching.

For each important concept, explain as appropriate:
1. What the concept is.
2. Why it is needed.
3. How it works.
4. Its main parts.
5. How it relates to other concepts.
6. Where it is used in real situations.
7. How the learner can recognize or use it independently.

Use analogies, practical examples and step-by-step explanations where they genuinely help. Do not shorten an explanation merely to make the language simple.

### 4.3 Telugu-specific guidance

- Preserve the English source's meaning, technical accuracy and teaching quality.
- Avoid literal, word-for-word English-to-Telugu translation.
- Use natural, everyday Telugu suitable for beginners.
- Explain the topic from the learner's starting point.
- Add useful analogies, practical examples and step-by-step explanations where needed.
- Keep terms such as HTML, CSS, JavaScript, Browser, Server, URL, DNS, HTTP, API and DOM in English where appropriate.
- Align Telugu and English learning outcomes and teaching stages.
- Avoid unnecessary repetition.
- Make Stage 3 practical enough for learners to think and answer independently.
- Review questions, options, hints and explanations, not only paragraphs.
- Do not expose internal planning notes or unnecessary technical labels in student-facing content.

### 4.4 Rules for all 22 target languages

Apply the same quality expectations to Assamese (as), Bengali (bn), Bodo (brx), Dogri (doi), Gujarati (gu), Hindi (hi), Kannada (kn), Konkani (kok), Kashmiri (ks), Maithili (mai), Malayalam (ml), Manipuri (mni), Marathi (mr), Nepali (ne), Odia (or), Punjabi (pa), Sanskrit (sa), Santali (sat), Sindhi (sd), Tamil (ta), Telugu (te) and Urdu (ur).

- Preserve source meaning and technical accuracy.
- Use natural, learner-friendly language and sentence structure.
- Retain English technical terms where useful and appropriate.
- Adapt examples and explanation style when it improves comprehension, without changing the technical concept.
- Preserve equivalent learning outcomes, teaching flow, examples, practice and assessment coverage.
- Do not mechanically translate or copy sentence structures.
- Do not treat any language as low-priority or merely machine-translated.
- Maintain terminology consistency within each language.
- Review each language independently and correct unnatural or incomplete content.
- Word counts need not match; educational quality and completeness must.

## 5. Required lesson workflow

Follow this workflow for each lesson or question supplied by the user. Do not redo work that is already correct; inspect the current repository state first.

### Step 1 — Repository inspection

- Inspect the latest repository state and use the active branch specified by current project instructions (lesson work currently uses release/v1-frontend).
- Fetch the English source and Telugu lesson file.
- Inspect the other 21 target-language files when relevant.
- Identify completed, missing, empty, placeholder and incomplete content.
- Inspect the current JSON schema, application UI expectations and content structure.
- Do not rewrite correct content without a reason.

Expected lesson path pattern (verify before use): public/content/{lang}/foundation/{lesson-id}.json  
Examples: public/content/en/foundation/F1.6.json and public/content/te/foundation/F1.6.json.

### Step 2 — English source analysis

Read the complete English source and understand Stage 1, Stage 2, Stage 3, Learning Objectives, prerequisites, examples, practical examples, practice tasks, hints, assessment questions, options, correct answers and explanations.

If the English source itself appears to need improvement, explain the evidence and reason first. Do not make unnecessary source changes without authorization.

### Step 3 — Telugu content development

Inspect the existing Telugu file first. Improve it where necessary:
- Natural Telugu explanations with adequate depth.
- Clear technical concepts and useful analogies.
- Step-by-step and practical examples where appropriate.
- Complete learning outcomes.
- Coherent progression across all three stages.
- Useful practice tasks, hints and assessments.
- Accurate questions, options, answers and explanations.

Compare it with the English source to ensure meaning and teaching quality are not reduced.

### Step 4 — Complete the other 21 target languages

Use the English source and improved Telugu content as references, while authoring each language naturally and independently. Complete all required fields in all 22 target-language files; do not stop after one or two languages.

### Step 5 — Empty and incomplete file completion

Identify and complete:
- Empty JSON files.
- Placeholder content.
- Missing learning objectives.
- Incomplete stage content.
- Missing examples, practice tasks or assessments.
- Missing fields in one language compared with the lesson's required structure.

Creating an empty file is not completion. Fill it with actual lesson content.

### Step 6 — Nativity self-review and correction

After drafting, read every language version again. Check naturalness, grammar, sentence structure, terminology, meaning, completeness, repetition, examples, objectives, questions, options, hints, answers and explanations. Correct issues before declaring the content batch complete.

This is ChatGPT self-review. Do not describe it as independent native-speaker review unless that review actually occurred. Do not block all work waiting for human review; complete the best possible self-review and record independent review as pending where applicable.

### Step 7 — Dedicated Learning Objectives review

Verify that all important concepts are covered; every objective is a complete learning outcome rather than a topic label; practical context is present where useful; outcomes are not duplicated; lesson stages teach the outcomes; practice and assessment can measure them; and all languages preserve equivalent scope and detail. Correct all affected language files when needed.

### Step 8 — JSON and content validation

Validate each of the 23 files individually for:
- JSON syntax and parsing.
- Existing schema and required keys.
- Correct array/object types.
- Learning objective completeness.
- IDs and references integrity.
- Completeness of all three teaching stages.
- Examples and practice tasks.
- Questions, options, answer keys and explanations.
- Language completeness.
- Empty or placeholder content.
- Duplicate or missing content.

Do not infer that all 23 files pass because one file passes.

### Step 9 — GitHub update and commit

Only after content and self-review are complete:
1. Update relevant JSON files without changing established schema or identifiers.
2. Fill required empty files.
3. Re-fetch updated files from GitHub and verify saved content.
4. Update the curriculum progress tracker.
5. Commit with a clear message and record the commit SHA.

Do not claim a lesson is fully complete if required 23-language content is incomplete.

### Step 10 — CI, deployment and live verification

Check separately, when applicable:
- GitHub Actions status.
- CI validation.
- Build status.
- Deployment status.
- Live website verification.

JSON validation does not prove application runtime testing. A GitHub commit does not prove deployment. Report a live update only after verifying the deployed site.

## 6. Lesson QA checklist

For each lesson, perform applicable checks:
- Meaning accuracy.
- Grammar and natural language.
- Nativity self-review.
- Technical accuracy.
- English-to-translation consistency.
- Learning objectives completeness.
- Alignment between objectives and lesson content.
- Teaching flow and three-stage consistency.
- Examples and practical examples quality.
- Practice tasks quality.
- Assessment and answer correctness.
- Questions, options and hints.
- Empty and incomplete file checks.
- JSON syntax and schema.
- IDs and references integrity.
- Completeness across all 23 languages.

Give learning objectives additional scrutiny: confirm they are measurable outcomes, taught by the stages, assessed by practice/questions and equivalent in scope across languages.

## 7. Repository and technical safety

- Treat the latest repository files as authoritative.
- Preserve completed work; do not restart it.
- Understand current architecture before editing.
- Do not change JSON schema, IDs, topic IDs, course IDs, module IDs or references without an approved reason and impact review.
- Do not delete unnecessary files.
- Avoid unrelated application-code changes while editing lesson content.
- Do not claim tests passed unless executed.
- Do not claim deployment or live updates without verification.
- Do not change lesson status from draft to published without authorization.
- Inspect how the existing schema and application UI consume learning objectives.
- If learningObjectives is an array of strings, preserve that structure unless a reviewed and approved architecture change is made.
- Verify all relevant changes before committing.
- Never report incomplete work as complete.

## 8. Progress tracking and reporting

Progress tracker path (verify current path and branch before editing): docs/CODESAATHI_CURRICULUM_PROGRESS_TRACKER.csv

Use clear states: Completed, In Progress and Pending.

If translation is complete but native-speaker review, application integration or runtime verification remains pending, do not label the entire lesson fully complete.

After each lesson, report in Telugu:
1. Lesson ID and topic name.
2. Number of language files updated and language codes.
3. Changes to Stage 1, Stage 2 and Stage 3.
4. Learning objective changes, count and coverage.
5. Examples and practical examples changes.
6. Practice tasks and hints changes.
7. Questions, options, answers and explanations changes.
8. Nativity self-review results.
9. Translation issues corrected.
10. Empty/incomplete files completed.
11. JSON validation results, with actual counts.
12. GitHub commit message and SHA.
13. GitHub Actions / CI status.
14. Deployment status.
15. Live website verification status.
16. Remaining pending tasks.

Clearly separate completed, in-progress and pending items.

## 9. Recorded lesson history and continuation baseline

The following are historical completion claims from the supplied project continuity record. Verify current branch, files and tracker before relying on them as current repository state.

### F0.1 — What is the Web? Internet, Browsers and Websites
- Content exists in all 23 language folders.
- Eight detailed learning objectives were added across all 23 languages.
- Structural checks were performed for JSON structure, main content fields, objectives, examples and assessment.
- Status was kept as draft.
- Do not redo this lesson from scratch. Reinspect only if a current task requires verification.

The eight recorded outcomes cover:
1. Internet and interconnected networks/devices.
2. The World Wide Web and how it uses the Internet.
3. Differences and relationships between the Internet and Web.
4. Browser requests and interpretation of HTML, CSS and JavaScript.
5. Websites and related pages/resources.
6. Website versus web application with practical examples.
7. Browser/server/website request-response relationship.
8. DNS, network communication, server response and browser rendering from address to page.

### F1.5 — Algorithms and Step-by-Step Thinking
- Recorded content in all 23 languages.
- 20 detailed learning objectives, 4 worked examples, 5 practice hints and 6 assessment questions per language.
- Structural and content completeness checks were reported.
- Status: draft.

### F1.6 — Pseudocode and Flowcharts
- Recorded content in all 23 languages.
- 20 detailed learning objectives, 4 worked examples, 5 practice hints and 6 assessment questions per language.
- Guided and independent practice tasks were included.
- Localization self-review covered concept example steps, parity outputs, flowchart labels and selected terminology corrections.
- Standard pseudocode keywords (START, INPUT, IF, ELSE, OUTPUT, WHILE) and canonical flowchart shape names (Oval, Parallelogram, Diamond) were retained in English for technical recognition.
- Reported validation: 23/23 JSON parse/structural checks; 460/460 objectives; 92/92 worked examples; 115/115 hints; 138/138 assessment questions; 23/23 answer-key checks; 23/23 guided/independent practice distinctness checks.
- Status: draft.
- Tracker commit recorded: ac876a2d5320f33766f3a85c43c4e2b1da32a913.
- Tracker: docs/CODESAATHI_CURRICULUM_PROGRESS_TRACKER.csv.
- Still recorded as pending: independent native-speaker review, application integration verification, runtime/browser verification.

### Continuation rule
Do not redo F0.1, F1.5 or F1.6 from scratch. Inspect the current active branch and progress tracker, then continue from the next genuinely incomplete lesson.

## 10. New-chat resume procedure

When this continuity note is used in a new chat:
1. Read this note and the Master Project Structure.
2. Inspect the latest repository state and active lesson-work branch (release/v1-frontend unless repository/project instructions have changed).
3. Read the curriculum progress tracker.
4. Verify recorded completed work against actual files and commits.
5. Identify the next incomplete lesson.
6. Fetch the English source, Telugu file and all relevant language files.
7. Continue using the workflow above.
8. Preserve existing work and report evidence, validation, commit, CI, deployment and pending status.

**Final objective:** provide genuinely effective programming education in all 23 languages through clear natural language, detailed teaching, accurate learning outcomes, practical learning, careful self-review and verifiable repository updates.
