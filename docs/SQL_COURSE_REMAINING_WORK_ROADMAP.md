# CodeSaathi SQL Course — Remaining Work Roadmap

Last audited: 2026-11-22

**User decision:** Telugu translation is explicitly deferred until the very end. Do not create or edit Telugu SQL lesson files until the user asks to begin that final phase.
Repository: kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM
Working branch: content/sql-course-foundation
Pull request: #13 (open; do not merge until release gates pass)
Current audited branch HEAD before this roadmap commit: 60e3e2c0189da3f51474f48123209b8ac9a8c809

## Verified current baseline

- 81 English SQL lesson JSON files are present across SQL1–SQL11.
- 81 SQL curriculum-index topics and 81 source-inventory records are present.
- The new `docs/SQL_W3SCHOOLS_COVERAGE_MATRIX.csv` maps 72 W3Schools navigation/reference topics to existing CodeSaathi lesson IDs:
  - 45 SQL Tutorial topics
  - 21 SQL Database topics
  - 2 SQL Reference topics (Data Types and Keywords)
- Mapping is a coverage index, not editorial sign-off. Every mapped lesson remains draft pending technical/editorial review.
- SQL examples: 405 executed; 300 expected result sets compared; 100 status-only examples executed; 792 database-state assertions; 2 runtime-dependent outputs pattern-checked; 3 expected-error examples; 405 MCQs.
- SQL Playground is implemented with browser-side SQLite. Final feature/security/browser audit remains pending.
- Telugu SQL lesson translations are not complete.
- No production deployment has been performed.

## Latest verified CI before this roadmap document

Commit `60e3e2c0189da3f51474f48123209b8ac9a8c809`:
- SQL Course Validation push run #45005256327: PASS.
- SQL Course Validation PR run #45005259384: PASS.
- F1.7 Curriculum Validation run #45005259408: PASS.
- Browser / Technical / Accessibility Review run #45005259509: PASS.
- Python Course Validation run #45005259414: PASS.

The roadmap-document commit itself must receive a fresh Actions run before its CI status can be called PASS.

## Work remaining — ordered release plan

### A. Complete the W3Schools topic audit
- [x] Build a 68-row topic-to-lesson mapping matrix for the current W3Schools SQL Tutorial, SQL Database and SQL Reference navigation.
- [ ] Verify every mapped lesson's detailed content against its individual W3Schools source page.
- [x] Add the standalone SQL Aggregate Functions overview to SQL6.1 and map all five aggregate lessons.
- [x] Add SQL Quick Reference and MySQL, SQL Server and MS Access function-reference records; explicitly mark these reference catalogs as partial rather than claiming exhaustive function coverage.
- [x] Correct SQL4.2–SQL4.7 inventory and coverage mappings against actual lesson titles; map DEFAULT to SQL4.2, UNIQUE to SQL4.3, PRIMARY KEY to SQL4.4, FOREIGN KEY to SQL4.5, CHECK to SQL4.6 and column/table-level constraints to SQL4.7.
- [ ] Check all 81 lesson files for title accuracy, learning objectives, three learning stages, examples, practice, MCQ explanations and dialect notes.
- [ ] Resolve remaining source-inventory `missing_coverage` notes; distinguish required tutorial concepts from optional advanced depth and dialect-specific extensions.
- [ ] Complete curated dialect function reference coverage; current MySQL, SQL Server and MS Access function mappings are explicitly partial.
- [ ] Verify that no W3Schools topic is missing and no CodeSaathi lesson duplicates another topic unnecessarily.

### B. Complete English lesson quality
- [ ] Technical review of all 81 lessons against official database-engine documentation where behaviour is dialect-specific.
- [ ] Execute and compare all runnable examples; add explicit state assertions for statements whose effects are not visible in a result set.
- [ ] Review destructive operations, transactions, SQL injection and privilege examples for safe teaching defaults.
- [ ] Complete independent editorial review; keep lesson status as draft until approved.

### C. Decide and author advanced supplementary SQL
These are supplementary curriculum candidates, not claims about W3Schools core navigation coverage. Add only after checking existing lessons and approving stable topic IDs:
- [ ] Transactions, isolation concepts, COMMIT, ROLLBACK and SAVEPOINT.
- [ ] Subqueries, correlated subqueries and common table expressions (CTEs).
- [ ] Recursive CTEs and hierarchical data.
- [ ] Window functions, ranking, LAG/LEAD and running aggregates.
- [ ] Advanced query plans, index design and performance tuning.
- [ ] Advanced dialect comparison (SQLite, MySQL, PostgreSQL, SQL Server and Oracle).
- [ ] Triggers, migration workflows and operational database maintenance.
- [ ] Practical projects and a database capstone.

### D. Telugu translation — deliberately deferred to the final phase
- [ ] Only after the user explicitly starts the final translation phase, translate the approved English lesson set into Telugu, preserving all lesson IDs and schema.
- [ ] Translate explanations, objectives, practice, hints, assessment questions and answer explanations.
- [ ] Preserve SQL syntax, identifiers and code output; localize only learner-facing prose.
- [ ] Validate Telugu JSON schema, lesson parity and content completeness.
- [ ] Run SQL content validation against translated lessons where supported.

### E. SQL Playground
- [ ] Verify worker isolation, safe execution limits and error handling.
- [ ] Test multi-statement execution, schema reset, sample datasets and database persistence.
- [ ] Verify import/export and explain the difference between browser-local SQLite and hosted server databases.
- [ ] Add parameter-binding practice only with a safe, explicit binding interface; do not simulate secure host-language binding with unsafe string concatenation.
- [ ] Run browser smoke, keyboard, accessibility, responsive and cross-browser checks.

### F. Learning experience integration
- [ ] Verify exercises, quizzes and lesson completion tracking for SQL.
- [ ] Verify progress, bookmarks, lesson history and language preference persistence.
- [ ] Add SQL projects and capstone evaluation criteria.
- [ ] Confirm all learning activities are linked to the correct curriculum-index topic IDs.

### G. Release gates
- [ ] Update curriculum index, source inventory, coverage matrix and progress tracker from verified evidence.
- [ ] Latest-head SQL validation PASS.
- [ ] Latest-head browser/accessibility/technical review PASS.
- [ ] Latest-head curriculum validation PASS.
- [ ] English editorial and Telugu parity review complete.
- [ ] Security, privacy, performance and regression checks complete.
- [ ] PR review and explicit release approval.
- [ ] Merge to `release/v1-frontend` only after all gates pass.
- [ ] Deploy and run production smoke tests only after merge approval.

## Important status rules

- `MAPPED` means a W3Schools navigation topic has a CodeSaathi lesson ID; it does not mean editorially complete.
- `VALIDATED` means the relevant automated checks passed on the exact commit under review; it does not mean translated or production-ready.
- A historical Actions PASS must never be reused as evidence for a newer commit.
- Keep PR #13 open and do not merge or deploy while any release gate remains unchecked.
