# SQL Playground Security Review

**Review scope:** CodeSaathi browser SQL Playground and SQL Practice Hub challenge runner  
**Review date:** 2026-11-23  
**Status:** Implemented controls and automated configuration checks; not a formal penetration test.

## Architecture and data boundaries

- SQL is executed locally in a dedicated Web Worker using the pinned sql.js 1.16.0 WebAssembly runtime.
- The playground database is held in the browser. It does not connect to a production database or send learner SQL to a CodeSaathi backend.
- The worker disables fetch, XMLHttpRequest, WebSocket and EventSource after the SQL.js runtime has loaded.
- Database snapshots are persisted locally in IndexedDB. Practice scores and challenge progress are stored in localStorage.
- Challenge attempts use a fresh in-memory SQLite database for each attempt. The setup script runs before `PRAGMA query_only = ON`; learner statements are restricted to one read-only SELECT/WITH/EXPLAIN statement.

## Implemented controls verified by CI

| Control | Implementation | Verification |
|---|---|---|
| Worker isolation | Dedicated `sql-playground-worker.js` | Browser execution tests |
| Execution watchdog | 8-second UI watchdog terminates and restarts the worker | Browser timeout/stop tests |
| SQL input size | 50,000-character limit for general playground runs | Static security validator |
| Challenge input size | 20,000-character limit | Static security validator |
| Challenge result size | Maximum 1,000 rows | Static security validator |
| Displayed result size | At most 200 rows per result set | Static security validator |
| Imported database size | Maximum 20 MB | Static security validator |
| Network access from SQL worker | fetch/XHR/WebSocket/EventSource replaced with throwing handlers after runtime initialization | Static security validator |
| Challenge write protection | Fresh sandbox plus SQLite `query_only` mode; only one SELECT/WITH/EXPLAIN statement accepted | Browser negative test and static validator |
| Multi-statement challenge input | Rejected before execution | Static security validator |
| SQL parameter binding | Prepared-statement binding accepts JSON scalar values only | Existing worker validation and browser tests |
| Secrets boundary | No database credentials or production connection strings are provided to the browser worker | Architecture review |

## Residual risks and limitations

1. This is a client-side learning sandbox, not a secure production database service. Never place confidential or production data in it.
2. A browser worker and an 8-second watchdog reduce runaway execution, but do not provide a strict memory quota or a complete defence against every browser/WebAssembly resource-exhaustion case.
3. The SQL.js runtime and WASM are fetched from a version-pinned CDN at initialization. CDN availability and supply-chain integrity remain external dependencies.
4. IndexedDB/localStorage are user-controlled browser storage. Progress is local-only, can be cleared by the user and is not an identity-verified record.
5. Challenge expected rows and reference solutions are client-accessible. The challenge UI is for learning and practice, not secure examinations; hidden server-side tests and anti-cheat are not implemented.
6. Formal penetration testing, browser-specific memory stress testing and a full CSP/SRI review have not been performed.

## Release checks

- SQL lesson/example validation and 32 original challenge tests run in GitHub Actions.
- SQL Practice Hub browser tests cover fill-in-the-blank persistence, cumulative quiz, final assessment and isolated challenge execution.
- Browser Review runs axe checks for serious/critical accessibility issues on the SQL Playground, Practice Hub and Reference Guide.
- The C compiler is a separate external iframe integration and is outside this SQL security review.
