# Engineering Constitution

## Architecture
Prefer modular boundaries and explicit contracts. Document APIs, data models, events, ownership, and failure behavior. Keep domain logic independent of UI where practical. Use migrations and compatibility plans for schema changes.

## Code quality
Use typed implementation where it materially reduces defects. Enforce formatting, linting, type checks, and consistent naming in CI. Validate at system boundaries. Handle errors explicitly; never expose stack traces. Minimize and review dependencies.

## Testing
Unit tests for domain logic; integration tests for database/API/service boundaries; E2E tests for critical learner journeys; regression tests for defects; security, accessibility, and performance tests where relevant. Tests should be repeatable and isolated.

## Delivery
Use focused branches and reviewable pull requests. CI must run required checks before merge. Keep commits descriptive. Use staged deployment, health checks, monitoring, and rollback. Never report a check as passed without execution evidence.

## Content
Document decisions and trade-offs. Keep roadmap and progress tracker current. Curriculum requires technical and native-language review. Create original examples and diagrams and track provenance.

## Definition of done
Acceptance criteria met, tests executed and reported, security reviewed, documentation updated, known limitations recorded.
