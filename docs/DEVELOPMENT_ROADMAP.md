# Development Roadmap

## Phase 0 — Foundation
- [x] Product direction agreed: audience, six languages, website-first, initially free.
- [x] Private GitHub repository created and connected.
- [x] Commit baseline governance documents (AGENTS.md, project blueprint, security/engineering constitutions, roadmap, decision log, progress tracker) on `docs/project-foundation`; branch/PR and CI conventions remain pending under G9–G12.

## Phase 1 — Curriculum discovery
- [x] B1 Verify W3Schools categories and build category-level inventory (15 families, 72 entries; see docs/B1_W3SCHOOLS_CURRICULUM_INVENTORY.md).
- [x] B2 Normalize languages, technologies, frameworks, runtimes, databases, tools, and platforms (see docs/B2_PROGRAMMING_LANGUAGE_TECHNOLOGY_INVENTORY.md).
- [x] B3 Inventory tutorial chapters and topic trees (catalogue audit complete; see docs/B3_W3SCHOOLS_TUTORIAL_INVENTORY.md and docs/B3_TUTORIAL_TRACK_REGISTER.csv; detailed chapter-tree limitations are documented).
- [ ] B4 Inventory reference sections and API coverage.
- [ ] B5 Map example/exercise themes without copying source examples.
- [ ] B6 Create canonical master topic checklist.
- [ ] B7–B10 Define Beginner, Intermediate, Advanced, Professional levels.
- [ ] B11 Map prerequisites and dependencies.
- [ ] B12 Review gaps and baseline curriculum coverage.

## Phase 2 — Teaching/content system
Define lesson schema, six native-language standards, glossary, diagrams, code walkthroughs, exercises, quizzes, projects, and review workflow.

## Phase 3 — Architecture/security
Select stack and hosting based on requirements. Design frontend/backend/database/API, identity, course/language/progress/AI/admin modules, threat model, privacy, and isolated code execution. Review before implementation.

## Phase 4 — UX and web foundation
Brand and design system; accessible responsive layouts; navigation; catalogue; lesson experience; search; profile/dashboard; admin/content workflows.

## Phase 5 — Learning engine
Curriculum data model, prerequisites, lesson delivery, exercises, assessments, projects, progress, achievements, certificates.

## Phase 6 — AI and code tools
Constrained AI tutor, localization/quality evaluation, cost controls, playground, AST analyzer. Do not enable untrusted execution until sandbox gates pass.

## Phase 7 — Multilingual quality and audit
Native-language review, parity checks, functional/UI/browser/mobile/database/API/AI/sandbox/security/performance/accessibility/regression testing.

## Phase 8 — PWA, Android, launch
Offline/install support, Android packaging/tests, hosting/backend, domain/DNS/HTTPS, final release checks, public launch.

## Phase 9 — Monetization and growth
Evaluate premium/institutional offerings, payments, invoices, usage limits, analytics only after free product value and operating costs are understood. Maintain courses, security, and platform.

## Release rule
No production release without acceptance criteria, required quality gates, security review, monitoring, backup, and rollback readiness.
