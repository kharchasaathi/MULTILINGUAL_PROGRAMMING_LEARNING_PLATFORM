# CodeSaathi Java Playground — Runtime Decision

## Current implementation

- Standalone page: `public/java-playground.html`
- Browser controller: `public/js/java-playground.js`
- Lesson integration: Java lesson practice links pass the first authored Java example through a base64url hash payload.
- Compiler discovery: Wandbox `GET https://wandbox.org/api/list.json`; Java compilers are discovered at runtime and sorted by stable version.
- Execution: Wandbox `POST https://wandbox.org/api/compile.json`, including source and optional standard input.
- Public permalink saving is disabled (`save: false`).
- Source and stdin are sent to Wandbox, not to a CodeSaathi-owned server. Learners are warned not to submit secrets or personal/confidential data.
- The page has source/stdin size limits, a 60-second request timeout, AbortController cancellation, text-only output rendering, and no eval/Function execution in the page.

## Important limitations

1. Wandbox is a third-party execution service. Its availability, compiler versions, capacity, rate limits and sandbox limits are outside CodeSaathi's control.
2. This implementation is a browser client integration, not a CodeSaathi-hosted Java execution backend.
3. The compiler version is discovered dynamically; it must not be represented as Temurin JDK 21. The dedicated Java CI remains the authoritative Temurin JDK 21 validation.
4. The browser can only offer the standard-input text supplied before execution. Interactive stdin after the program starts is not implemented.
5. Multi-file Java projects, packages with directory trees, external dependencies, build tools and persistent file storage are not implemented in this first version.

## Production hardening roadmap

For sustained student usage, deploy a CodeSaathi-controlled execution service or a self-hosted Piston instance behind an authenticated/rate-limited API gateway. Run each compilation in an isolated container with CPU, memory, wall-clock, process-count and filesystem limits; disable outbound networking; enforce per-user quotas; add abuse monitoring; and keep compiler versions pinned. Never expose runner administration endpoints or secrets to the browser.

## Validation

- Static contract: `scripts/validate-java-playground.mjs`
- Browser checks: Java Playground page load, mocked compiler discovery/execution, lesson-to-playground source transfer, mobile layout and accessibility.
- Live Wandbox execution must be tested separately because external availability and browser network policy can vary.
