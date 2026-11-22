# CodeSaathi SQL Course — Remaining Work Roadmap

Last audited: 2026-11-22

**User decision:** Telugu translation is explicitly deferred until the very end. Do not create or edit Telugu SQL lesson files until the user asks to begin that final phase.
Repository: kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM
Working branch: content/sql-course-foundation
Pull request: #13 (open; do not merge until release gates pass)
Current audited branch HEAD before this roadmap commit: 60e3e2c0189da3f51474f48123209b8ac9a8c809

## Verified current baseline

- 131 English SQL lesson JSON files are present across SQL1–SQL21 (81 original lessons across SQL1–SQL11, five-lesson supplementary modules SQL12–SQL21).
- 131 SQL curriculum-index topics, 136 source-inventory records and 131 SQL progress-tracker rows are present.
- `docs/SQL_W3SCHOOLS_EXERCISE_COVERAGE.csv` records 60 official exercise categories mapped to existing CodeSaathi topics. This is a mapping audit, not a claim that original exercise content is complete.
- `docs/SQL_W3SCHOOLS_CHALLENGE_COVERAGE.csv` maps all 32 currently listed W3Schools SQL Code Challenge categories to existing CodeSaathi topic IDs. The 32 original CodeSaathi challenge tasks are authored in `public/content/en/sql/sql-code-challenges.json`; reference solutions execute successfully in isolated SQLite databases (run #45009052445). Hidden tests, grading and UI integration remain pending.
- The new `docs/SQL_W3SCHOOLS_COVERAGE_MATRIX.csv` maps 72 W3Schools navigation/reference topics to existing CodeSaathi lesson IDs:
  - 45 SQL Tutorial topics
  - 21 SQL Database topics
  - 6 SQL Reference topics (Data Types, Keywords, Quick Reference, MySQL Functions, SQL Server Functions and MS Access Functions)
- Mapping is a coverage index, not editorial sign-off. Every mapped lesson remains draft pending technical/editorial review.
- Latest SQL validation PASS on commit `8325344b61574ae16014b121f6db2922af75b6ce` (run #45009364917): 131 lessons; 655 SQLite-executed examples; 405 expected outputs compared; 239 status-only examples; 944 database-state assertions; 7 runtime-dependent outputs checked by pattern; 4 expected-error examples; 655 MCQs. The same run also validates all 32 original SQL code challenges.
- SQL Playground is implemented with browser-side SQLite. Final feature/security/browser audit remains pending.
- Telugu SQL lesson translations are not complete.
- No production deployment has been performed.

## English editorial review progress (2026-11-22)

- Detailed technical/editorial explanations have been reviewed and expanded for 40 lessons across SQL12–SQL19 (five lessons per module). The updated explanations cover transaction safety, correlated and recursive queries, window frames and ranking, index/query-plan trade-offs, dialect portability, trigger semantics, schema migrations and the inventory/sales capstone.
- Corresponding progress-tracker review notes were updated. All 40 lessons remain `draft`; editorial review does not itself grant `VALIDATED`, `COMPLETED` or `DEPLOYED` status.
- The remaining 81 original lessons in SQL1–SQL11 still require detailed editorial/source-depth review. SQL20.1–SQL20.5 are new English security drafts; their automated SQLite examples and MCQs passed run #45009019323, while manual DBMS security/dialect review remains open.

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
- [x] Build a 72-row topic-to-lesson mapping matrix for the current W3Schools SQL Tutorial, SQL Database and SQL Reference navigation.
- [ ] Verify every mapped lesson's detailed content against its individual W3Schools source page.
- [x] Add the standalone SQL Aggregate Functions overview to SQL6.1 and map all five aggregate lessons.
- [x] Add SQL Quick Reference and MySQL, SQL Server and MS Access function-reference records; explicitly mark these reference catalogs as partial rather than claiming exhaustive function coverage.
- [x] Correct SQL4.2–SQL4.7 inventory and coverage mappings against actual lesson titles; map DEFAULT to SQL4.2, UNIQUE to SQL4.3, PRIMARY KEY to SQL4.4, FOREIGN KEY to SQL4.5, CHECK to SQL4.6 and column/table-level constraints to SQL4.7.
- [ ] Check all 126 lesson files for title accuracy, learning objectives, three learning stages, examples, practice, MCQ explanations and dialect notes.
- [ ] Resolve remaining source-inventory `missing_coverage` notes; distinguish required tutorial concepts from optional advanced depth and dialect-specific extensions.
- [ ] Complete curated dialect function reference coverage; current MySQL, SQL Server and MS Access function mappings are explicitly partial.
- [ ] Verify that no W3Schools topic is missing and no CodeSaathi lesson duplicates another topic unnecessarily.

### B. Complete English lesson quality
- [ ] Technical review of all 126 lessons against official database-engine documentation where behaviour is dialect-specific.
- [ ] Execute and compare all runnable examples; add explicit state assertions for statements whose effects are not visible in a result set.
- [ ] Review destructive operations, transactions, SQL injection and privilege examples for safe teaching defaults.
- [ ] Complete independent editorial review; keep lesson status as draft until approved.

### C. Advanced supplementary SQL
These are supplementary curriculum additions, not W3Schools core navigation topics.
- [x] SQL12.1–SQL12.5: Transactions, ACID, BEGIN/COMMIT, ROLLBACK, SAVEPOINT, SQLite transaction modes and concurrency boundaries. Five English draft lessons, 25 examples and 25 MCQs added; SQL validation PASS on commit `4b6f3e1`.
- [x] SQL13.1–SQL13.5: Subquery fundamentals, scalar/correlated subqueries, derived tables, CTEs and recursive CTEs. Five English draft lessons, 25 examples and 25 MCQs added; latest-head SQL validation pending.
- [x] SQL14.1–SQL14.5: Window functions, PARTITION BY, ranking functions, LAG/LEAD and window frames. Five English draft lessons, 25 examples and 25 MCQs added; latest-head SQL validation pending.
- [x] SQL15.1–SQL15.5: Index fundamentals, query plans, composite/partial/covering indexes, ANALYZE and PRAGMA optimize. Five English draft lessons, 25 examples and 25 MCQs added; latest-head SQL validation pending.
- [x] SQL16.1–SQL16.5: SQL dialects, data types, identity columns, date/time, NULL functions, concatenation and pagination differences. Five English draft lessons, 25 examples and 25 MCQs added; SQL validation PASS on commit `a00f32f`.
- [x] SQL17.1–SQL17.5: Trigger fundamentals, AFTER INSERT/UPDATE/DELETE, BEFORE validation with RAISE, recursion and safe maintenance. Five English draft lessons, 25 examples and 25 MCQs added; latest-head SQL validation pending.
- [x] SQL18.1–SQL18.5: Schema migration versioning, additive changes, backfills, transactional migrations, rollback planning, idempotency and validation. Five English draft lessons, 25 examples and 25 MCQs added; latest-head SQL validation pending.
- [x] SQL19.1–SQL19.5: Inventory/product modelling, customers/orders/order items, safe sale transactions, sales reporting and capstone validation. Five English draft capstone lessons, 25 examples and 25 MCQs added; latest-head SQL validation pending.
- [ ] SQL14: Window functions, ranking, LAG/LEAD and running aggregates.
- [ ] Recursive CTEs and hierarchical data.
- [x] English inventory-and-sales capstone lesson sequence drafted in SQL19.\n- [ ] Integrate SQL19 with the platform's project/capstone activity, rubric and learner-progress features.
- [ ] Real-world database projects and SQL capstone.
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
- [x] Add a safe, explicit prepared-statement parameter interface for one SQL statement, using JSON arrays or named-parameter objects; reject multi-statement parameterized input.
- [x] Add local SQLite database import alongside export, with a 20 MB limit and confirmation before replacing the current local database.
- [ ] Test parameter binding and database import/export in the latest browser run; verify malformed database files leave the existing database intact.
- [ ] Run browser smoke, keyboard, accessibility, responsive and cross-browser checks.

### F. W3Schools learning activities and platform integration
- [x] Map W3Schools syllabus, examples, exercises, quiz, code challenges, SQL editor, certification and study plan to CodeSaathi in `docs/SQL_W3SCHOOLS_ACTIVITIES_COVERAGE.csv`.
- [ ] Add fill-in-the-blank exercise type alongside MCQs.
- [ ] Build a cumulative SQL quiz flow with scoring, review and persistent progress.
- [ ] Integrate SQL code challenges with starter databases, hidden tests and auto-grading.
- [ ] Define an end-of-course certification-style assessment blueprint.
- [ ] Verify exercises, quizzes and lesson completion tracking for SQL.
- [ ] Verify progress, bookmarks, lesson history and language preference persistence.
- [ ] Integrate SQL19 capstone into the platform project activity, rubric and learner progress.
- [ ] Add SQL projects and capstone evaluation criteria.
- [ ] Confirm all learning activities are linked to the correct curriculum-index topic IDs.

### G. Release gates
- [x] Update curriculum index, source inventory, coverage matrix and progress tracker for SQL12 and the expanded reference mapping.
- [ ] Reconcile the final progress tracker and source inventory after all latest-head checks complete. SQL19.1–SQL19.5 English editorial review notes were updated in the tracker on commit `8317b494ef23bf4949fd9ac04dc86638ddda3d14`.
- [x] Latest SQL validation PASS on PR merge commit for head `396619aec9c2e506858c4f863ea5fba69fa91b7b` (run #45009019323).
- [ ] Latest browser/accessibility/technical review PASS (run #45009019306 was in progress at last check).
- [x] Latest curriculum validation PASS (F1.7 run #45008728265).
- [ ] English editorial review complete. Telugu parity is deferred until the user explicitly begins the final translation phase.
- [ ] Security, privacy, performance and regression checks complete.
- [ ] PR review and explicit release approval.
- [ ] Merge to `release/v1-frontend` only after all gates pass.
- [ ] Deploy and run production smoke tests only after merge approval.

## Important status rules

- `MAPPED` means a W3Schools navigation topic has a CodeSaathi lesson ID; it does not mean editorially complete.
- `VALIDATED` means the relevant automated checks passed on the exact commit under review; it does not mean translated or production-ready.
- A historical Actions PASS must never be reused as evidence for a newer commit.
- Keep PR #13 open and do not merge or deploy while any release gate remains unchecked.
