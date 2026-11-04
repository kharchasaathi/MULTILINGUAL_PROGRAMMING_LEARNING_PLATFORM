# D2 — Frontend Architecture

**Status:** Complete — frontend architecture and interface contracts documented  
**Date:** 2026-11-05  
**Depends on:** D1 technology-stack decision; C1–C15 teaching/content contracts  
**Applications:** Next.js website/PWA first; Expo React Native Android client; future iOS client  
**Locales:** `te`, `en`, `ml`, `kn`, `ta`, `hi`

## 1. Purpose and boundary

D2 defines the frontend application boundaries, package responsibilities, navigation, rendering strategy, state ownership, API interaction, localization, accessibility, responsive behavior, error handling and frontend quality gates.

D2 is an architecture specification. It does not create application code, install dependencies, select a final component library, define backend endpoints or database schemas, implement authentication, publish a PWA, or package an Android/iOS app. D3–D15 refine backend, database, API, identity and module architecture.

## 2. Architecture decisions

1. **Website-first:** the Next.js App Router web application is the first production client and the primary responsive experience.
2. **PWA is a web capability:** installability and offline behavior belong to the web app; do not create a second PWA frontend.
3. **Native mobile is separate:** Expo React Native is the Android client and future iOS path. Share contracts, domain logic, validation and design tokens where safe; do not force DOM components into native screens.
4. **API is the boundary:** web and mobile communicate with NestJS through versioned REST/OpenAPI contracts. No direct browser/mobile database access.
5. **Feature-oriented organization:** group UI, hooks, schemas, queries and tests by product feature, with shared infrastructure in explicit packages.
6. **Server/client separation:** server components render public/read-mostly content and perform safe server-side composition; interactive controls and browser APIs stay in client components.
7. **No hidden authorization:** frontend route guards improve UX only. Backend authorization is authoritative for every protected operation.
8. **Accessible by default:** semantic HTML, keyboard operation, visible focus, responsive zoom/reflow and screen-reader labels are acceptance requirements, not later polish.
9. **Locale is explicit:** selected language is part of the route/user preference contract and must not be inferred from browser language after the learner has made a choice.
10. **No untrusted code execution in the client host or API:** editor/preview interactions are isolated by the later playground/sandbox design.

## 3. System context and runtime boundaries

```text
Learner / Author / Reviewer / Administrator
        |
        +-----------------------------+
        |                             |
  Web browser / PWA              Android / iOS
  Next.js App Router             Expo React Native
        |                             |
        +---------- HTTPS ------------+
                      |
             Versioned REST API
                NestJS backend
                      |
          Auth / domain / data / AI
          (detailed in D3–D14)
                      |
              PostgreSQL system
               of record

Static public assets may use a CDN/object store.
Untrusted learner code -> separate isolated execution service
(not the web app, mobile app, or API process).
```

### Trust boundaries

- Browser storage, URL parameters, form values, uploads, deep links and API responses are untrusted.
- Mobile device storage and deep-link parameters are untrusted.
- The frontend never embeds database credentials, AI provider secrets, signing secrets or privileged service tokens.
- Public content can be cached according to an explicit content version policy; private learner data and privileged review material are not cached by default.
- All role/ownership checks and publication decisions are repeated server-side.

## 4. Monorepo frontend package layout

Target layout (not yet created):

```text
apps/
  web/
    app/
      [locale]/
        (public)/
        (learner)/
        (authoring)/
        (review)/
        (admin)/
    src/
      features/
      components/
      server/
      client/
      styles/
      config/
      tests/
  mobile/
    app/
      (public)/
      (learner)/
    src/
      features/
      components/
      navigation/
      native/
      tests/
packages/
  contracts/
  validation/
  domain/
  api-client/
  i18n/
  design-tokens/
  test-utils/
```

### Package ownership

| Package | Owns | Must not own |
|---|---|---|
| `apps/web` | Next.js routes/layouts, web-specific UI, server/client composition, web metadata, PWA integration | Database access, business-rule authority, secrets |
| `apps/mobile` | Native navigation/screens, platform permissions, native lifecycle and offline UI | Web DOM components, direct database access |
| `packages/contracts` | Versioned request/response/event types and stable IDs | Framework components or persistence implementations |
| `packages/validation` | Runtime schemas for route params, forms, API payloads and imported content | UI state or network side effects |
| `packages/domain` | Pure shared calculations and rules approved for client reuse | React, Next.js, React Native, ORM or provider SDK |
| `packages/api-client` | Typed API calls, serialization, request IDs, normalized transport errors | Authorization decisions or direct DB queries |
| `packages/i18n` | Locale identifiers, message typing, formatting helpers, locale fallback policy | Lesson translations or curriculum content |
| `packages/design-tokens` | Color, spacing, typography, radius, elevation and motion tokens | Platform-specific rendered components |
| `packages/test-utils` | Deterministic fixtures, builders and test helpers | Production runtime code |

Dependency rule: shared packages remain lower-level than applications. No circular package dependencies. A package cannot import an app. Domain and contracts must remain framework-neutral.

## 5. Web route and navigation architecture

The route registry is in `D2_FRONTEND_ROUTE_MATRIX.csv`. Route groups organize layouts and authorization-aware presentation; they do not grant permissions.

### Navigation models

**Public:** Home, curriculum/course catalogue, course/level overview, sign-in and help/legal pages when approved.

**Learner:** Dashboard, learning path, course/module/topic/lesson, practice, quiz/project, progress, profile and preferences.

**Authoring:** content list, lesson editor, locale draft editor, preview and submission. This area is hidden from learner navigation and protected by backend permissions.

**Review:** assigned queue, review package, locale review, quality evidence, comments/defects and decision history. Reviewer scope is enforced by the API.

**Administration:** users/roles, content lifecycle, release manifest, audit, configuration and incident/withdrawal views. Privileged operations require server authorization and appropriate confirmation.

### Route conventions

- Locale-prefixed routes use the stable locale codes `/te`, `/en`, `/ml`, `/kn`, `/ta`, `/hi`.
- Stable IDs, not translated titles, identify courses, modules, lessons and review records.
- Slugs are display/navigation aids only; changing a translated title must not break references.
- Unknown locale codes return a safe not-found or supported-locale selection path.
- Protected routes preserve a safe return path after authentication; validate return URLs to prevent open redirects.
- Deep links must resolve to the same permission checks as ordinary navigation.
- Do not include secrets, personal data, answer keys or authorization claims in URLs.

## 6. Rendering and component strategy

### Next.js

- Prefer Server Components for public catalogue/lesson reads and static composition when data access is safe and server-only.
- Use Client Components only for interactions requiring state, browser APIs, editors, media controls, forms or live UI updates.
- Keep client component boundaries small; do not mark entire route trees as client-rendered without a demonstrated need.
- Server-only modules must be isolated from client imports. Add build-time checks against secret-bearing/server-only imports in client bundles.
- Use loading, error and not-found boundaries at route/feature boundaries.
- Avoid placing privileged review data in static generation or public caches.

### React Native / Expo

- Use native navigation and controls appropriate to Android/iOS.
- Reuse API client, validation, domain rules, locale IDs, translation message definitions and design tokens.
- Implement native-specific keyboard, safe-area, accessibility, back-navigation, permission and offline lifecycle behavior.
- Do not assume web CSS, browser APIs, service workers or DOM-based editor widgets are available on native.

### Shared UI policy

Share design tokens and interaction specifications, not a universal DOM/native component library. Every cross-platform component must have platform-specific implementation and accessibility review. The final component library is deferred until H design-system work.

## 7. Frontend feature boundaries

| Feature | Frontend responsibility | Backend authority |
|---|---|---|
| Identity/session | Sign-in/out screens, session lifecycle UX, safe expiry handling | Identity verification, session validity, recovery, MFA and authorization |
| Locale selection | Persist explicit preference; localized navigation and labels | Store account preference where authenticated; validate supported locale |
| Catalogue | Browse/search/filter presentation | Curriculum visibility, catalogue data and access rules |
| Learning path | Display module/topic/lesson progression and prerequisites | Prerequisite truth and progression eligibility |
| Lesson viewer | Render approved localized lesson blocks, code and visuals | Published version, locale availability and content authorization |
| Practice/assessment | Capture responses, hints and feedback presentation | Item validity, answer key, scoring, attempts and grading |
| Project workspace | Display brief, milestones, rubric and submission status | Submission persistence, evaluation and access control |
| Progress | Show progress and mastery state | Progress state, mastery policy and durable writes |
| AI tutor | Conversation UI, consent/limits and safe rendering | Provider access, prompt policy, quotas, safety and data minimization |
| Code playground | Editor and result presentation | Sandbox orchestration, execution limits and output filtering |
| Authoring/review | Editor, diff, comments, review queue and approval UI | Content versioning, role checks, workflow transitions and audit |
| Administration | Privileged workflow UI | All privileged authorization and business decisions |

## 8. API interaction contract

- Base path: `/api/v1` (subject to D5 contract approval).
- Transport: HTTPS JSON; OpenAPI is the contract source.
- API client is the only application-level transport entry point. Components do not scatter raw fetch calls.
- Validate route/form inputs before submission and validate response payloads at the client boundary.
- Normalize transport failures into stable categories: validation, unauthenticated, forbidden, not found, conflict, rate limited, unavailable and unexpected.
- Preserve server correlation/request IDs for support without exposing stack traces.
- Use request cancellation for obsolete search/navigation requests.
- Use idempotency keys for retryable mutations where duplicate submissions or purchases could cause harm.
- Never blindly retry non-idempotent mutations.
- Optimistic updates are limited to reversible low-risk interactions; authoritative server responses reconcile state.
- Handle stale version/conflict responses explicitly for lesson drafts, review decisions and submissions.
- API version and generated client compatibility must be checked in CI; detailed endpoints, schemas, pagination and error envelope are D5.

## 9. State ownership and data flow

| State type | Owner | Persistence |
|---|---|---|
| Route, selected tab, filters, pagination | URL when shareable; otherwise feature-local UI state | URL or ephemeral |
| Form draft | Form/feature component | Local until explicit save |
| Server resources | Query/cache layer in each app | Cache is disposable; backend remains authoritative |
| Session/auth state | Approved identity integration | Secure platform session mechanism; design in D6 |
| Learner locale preference | i18n preference controller | Local immediately; server profile sync when authenticated |
| Lesson content | API response keyed by immutable version/locale | Public cache only under approved policy |
| Editor unsaved draft | Editor feature state | Explicit draft save; safe recovery policy later |
| Review/approval state | Server workflow | Never authoritative in local state |
| Progress/assessment | Server-authoritative state with pending sync indicator if offline policy permits | Backend durable record |
| UI preferences | Platform preference store | Non-sensitive local preference storage |

Rules:
- Avoid a global state store until a concrete cross-feature need is documented.
- Do not duplicate server truth in multiple stores.
- Query cache keys include resource ID, locale and version where applicable.
- Invalidate or refetch after mutations; handle conflicts rather than silently overwriting.
- Do not store access tokens or sensitive review payloads in localStorage.
- Offline mutation queues are not enabled until D4/D5/D6 define conflict, idempotency and secure storage behavior.

## 10. Six-language frontend localization

Supported locale identifiers: `te`, `en`, `ml`, `kn`, `ta`, `hi`.

- UI message catalogues and learning-content locale versions are separate systems.
- Native-language rules C2–C7 and glossary C9 govern instructional content; UI labels must also receive native-language review.
- Default first visit may use a deterministic supported-language choice or a browser-language suggestion; never silently override an explicit learner choice.
- Store preference for anonymous sessions in non-sensitive local preference storage; synchronize to account profile after authentication.
- Use locale-aware number/date formatting and correct document language metadata.
- Apply correct text direction metadata (currently all six selected scripts are left-to-right); do not hardcode English labels inside localized navigation.
- Preserve code blocks, identifiers, URLs, commands and literal output unchanged.
- Missing UI message keys must fail in development/CI and have a controlled production fallback; do not silently present mixed-language screens as complete.
- A missing lesson locale must be clearly marked unavailable; do not substitute another locale while claiming the requested locale.
- Native review and parity checks apply to all six lesson locales before a six-locale release, per C15.

## 11. Responsive design and accessibility contract

Breakpoints are semantic layout ranges, not device-brand assumptions. Exact pixel values belong to H design-system work.

- Start with narrow-screen layouts; progressively enhance tablet and desktop.
- Reflow content without horizontal page scrolling at common mobile widths; code blocks and wide tables may have contained horizontal scrolling with clear affordance.
- Touch targets, spacing and focus indicators must be usable on touch devices.
- Support keyboard-only navigation, logical focus order, visible focus, skip links and accessible names.
- Use semantic headings, landmarks, buttons, links, form labels and status announcements.
- Do not rely on color alone for errors, correctness, progress or status.
- Respect text scaling/zoom and reduced-motion preferences.
- Provide text alternatives for diagrams and meaningful alt text for informative images; decorative assets are ignored by assistive technology.
- Code editor interactions require keyboard access and a usable non-editor fallback for core learning tasks.
- Test native screen readers and platform accessibility APIs on Android and iOS when those clients are built.
- Accessibility conformance target and audit methodology are formalized in H11; this document sets baseline requirements, not a certification claim.

## 12. PWA and offline strategy

- PWA installability is part of `apps/web`; manifest, icons, service worker and update UX are implemented later in P1–P4.
- Cache only the app shell and explicitly approved public/static assets/content versions.
- Do not cache admin/reviewer pages, answer keys, private learner records, authenticated API responses or sensitive submissions by default.
- Show offline status and content freshness; never imply a pending write was saved until confirmed.
- Initial offline mode is read-only for explicitly cached public learning content. Offline assessment, progress writes, project submission and review decisions are out of scope until conflict resolution, secure storage and idempotency are designed.
- Service worker updates must avoid silently replacing an active lesson/editor session; provide safe update/reload behavior.
- Cache invalidation follows content version and withdrawal signals; withdrawn content must not remain available indefinitely from stale caches.

## 13. Error, loading and empty-state behavior

Every data-backed feature defines:
- Initial loading state and skeleton/placeholder where helpful.
- Empty state with a clear next action.
- Validation state at field and form level.
- Retryable versus non-retryable error states.
- Session-expired behavior that preserves only safe navigation intent.
- Permission-denied and unavailable-locale states.
- Conflict/stale-version state for edits and submissions.
- Offline/network state with truthful save/sync status.

Do not expose stack traces, internal IDs that are not user-facing, SQL errors, tokens or provider responses. Errors must be actionable and localized.

## 14. Frontend security requirements

- Enforce CSP and secure headers in deployment design; exact directives in E2/network security tasks.
- Escape untrusted text; sanitize allowed rich content with a defined allowlist.
- Do not render raw AI output as trusted HTML.
- Avoid unsafe HTML injection APIs; isolate any approved rich-content renderer and test it.
- Validate all route params, query params, forms, upload metadata and API payloads.
- Use secure cookie/session patterns after D6; do not invent client-managed token storage.
- CSRF protection is required for cookie-authenticated state-changing requests.
- Prevent open redirects, clickjacking, XSS, unsafe deep links and accidental secret exposure.
- Apply rate limiting and abuse controls server-side.
- Hide answer keys and privileged review data from learner bundles and client caches.
- Frontend guards are not authorization. Backend checks every operation.
- No learner code executes in the Next.js/Expo application runtime.

## 15. Frontend testing strategy and acceptance cases

Required test layers:
- Unit tests: pure formatting, route/locale resolution, validators, state reducers and feature rules.
- Component tests: accessible names, keyboard behavior, form validation, loading/error/empty states and responsive variants.
- API-client tests: request serialization, schema validation, auth expiry, normalized errors, cancellation and idempotency metadata.
- Browser E2E: public navigation, locale switching, lesson view, learner progress, restricted routes and review workflows.
- Mobile tests: native navigation, back behavior, safe areas, locale, offline indicators and accessibility.
- Visual/responsive checks: narrow mobile, tablet and desktop; zoom/text scaling.
- Security tests: XSS payload rendering, open redirects, route authorization UX, sensitive cache exclusion and source-map/secret leakage checks.
- Accessibility tests: automated checks plus keyboard and screen-reader manual checks.

Required future test cases (not executed by D2):

| ID | Scenario | Expected result |
|---|---|---|
| D2-T01 | Visit each supported locale root | Correct locale metadata and navigation render |
| D2-T02 | Unknown locale in URL | Safe not-found or locale chooser; no silent English assumption |
| D2-T03 | Learner changes locale | Preference persists and route remains on equivalent stable resource when available |
| D2-T04 | Requested lesson locale unavailable | Explicit unavailable state; no false fallback |
| D2-T05 | Mobile viewport loads course page | Content reflows without page-level horizontal overflow |
| D2-T06 | Keyboard-only navigation | All primary actions operable and focus visible |
| D2-T07 | Screen reader visits lesson | Heading hierarchy, landmarks and controls are announced meaningfully |
| D2-T08 | API returns malformed payload | Client boundary rejects/normalizes; UI fails safely |
| D2-T09 | API returns 401/403 | Safe session/permission state; no protected data shown |
| D2-T10 | Deep link targets restricted review page | Backend authorization remains authoritative |
| D2-T11 | URL contains external return target | Open redirect is rejected |
| D2-T12 | AI response contains HTML/script payload | Rendered as safe text or sanitized approved content |
| D2-T13 | Reviewer data is requested by learner role | No sensitive data in response, cache or rendered bundle |
| D2-T14 | User is offline while opening uncached lesson | Clear unavailable state; no false cached content claim |
| D2-T15 | Offline user attempts assessment submit | Submission blocked or clearly queued only if later approved policy supports it |
| D2-T16 | Service worker has stale withdrawn content | Cache invalidation/update policy prevents indefinite stale serving |
| D2-T17 | Search request is superseded | Previous request cancelled/ignored; stale results do not overwrite current results |
| D2-T18 | Mutation is retried | Idempotency contract prevents duplicate effect where required |
| D2-T19 | Lesson content changes while open | Version state is shown; unsaved work is not silently discarded |
| D2-T20 | Native Android back navigation | Navigation returns to expected prior screen without losing confirmed work |
| D2-T21 | Large text/zoom is enabled | Core content and controls remain usable |
| D2-T22 | Locale script contains complex glyphs | Font/rendering fallback preserves readable text |
| D2-T23 | Client bundle is inspected | No database/provider secrets or privileged server modules included |
| D2-T24 | User signs out on shared device | Protected screens/cache are cleared according to D6 session policy |

Acceptance criteria:
- Web, PWA and native client responsibilities are separated.
- Monorepo package ownership and dependency direction are explicit.
- Route groups and stable-ID conventions are defined.
- Server/client rendering boundaries are explicit.
- API client and state ownership rules are defined.
- Six-language UI/content behavior is explicit.
- Responsive, accessibility, offline, error and security requirements are documented.
- Frontend test plan and acceptance cases exist.
- No implementation, deployment, accessibility certification or test pass is claimed.

## 16. Open decisions and handoff

Deferred to later tasks:
- D3 backend module boundaries and provider adapters.
- D4 database entities, relationships, indexes and migration policy.
- D5 concrete REST endpoints, request/response schemas, pagination and error envelope.
- D6 authentication/session/CSRF/recovery and role integration.
- D7–D11 course, language, AI, progress and admin module contracts.
- D13–D14 module communication and end-to-end data flow.
- H1–H12 visual identity, design tokens, typography, breakpoints, component library and accessibility approval.
- I1–I14 actual web app setup and implementation.
- P1–P4 manifest, service worker, offline and installation implementation.
- Android/iOS native packaging and device validation.

**D2 is complete at frontend architecture specification scope.**  
**Next task: D3 — Design backend architecture.**
