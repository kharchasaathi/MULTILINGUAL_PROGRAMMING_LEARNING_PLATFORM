# Agent and Contributor Instructions

Read this file and relevant docs before changing the project.

## Required workflow
PLAN → DESIGN → REVIEW → IMPLEMENT → TEST → SECURITY CHECK → APPROVE → DOCUMENT → NEXT TASK

## Rules
1. Preserve approved product decisions; record material changes in docs/DECISION_LOG.md.
2. Do not implement a module before requirements, interfaces, and acceptance criteria are documented.
3. Every feature needs test cases. Never claim tests passed unless actually executed.
4. Never commit secrets, API keys, tokens, credentials, or production personal data.
5. Never execute untrusted learner code on the main application server.
6. Validate untrusted input at trust boundaries and enforce authorization server-side.
7. Use small, reviewable changes and focused commits.
8. Fix root causes, not symptoms.
9. Update docs/PROGRESS_TRACKER.md after meaningful milestones.
10. Preserve accessibility, responsiveness, localization parity, and privacy.
11. Use W3Schools public topic taxonomy only as a coverage reference; author original instructional content.
12. Teach natively in each language; preserve code syntax and maintain a consistent technical glossary.

## Definition of done
Requirements and acceptance criteria met; relevant tests executed and reported; security implications reviewed; documentation updated; limitations recorded.
