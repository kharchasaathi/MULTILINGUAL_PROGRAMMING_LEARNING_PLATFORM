# CodeSaathi SQL Playground Runtime Decision

## Decision

Use **sql.js 1.16.0** (SQLite compiled to WebAssembly) for the first SQL teaching runtime. Load the pinned build from jsDelivr inside a dedicated classic Web Worker. Use a local SQLite database per browser profile, with exported database snapshots stored in IndexedDB.

## Why this is the first implementation

| Option | Strengths | Trade-offs for the current static CodeSaathi app |
|---|---|---|
| sql.js 1.16.0 | Small API surface; straightforward `initSqlJs()`, `new SQL.Database()`, `db.exec()` and `db.export()`; can import/export SQLite database bytes; runs fully in-browser | Database is memory-resident while the worker is alive; persistence must be implemented by the application; the default build loads a separate Wasm file |
| Official SQLite WASM/JS | First-party SQLite project; richer JS API variants; documented worker and OPFS persistence options | More integration choices and setup; greater implementation surface than needed for the first learner-facing SQL editor |

The sql.js documentation explicitly describes the database as in-memory and exposes export/import APIs. The default build loads a separate Wasm file and supports `locateFile`; the inline build embeds Wasm but increases the JavaScript bundle size. The official SQLite WASM project documents browser-focused APIs and OPFS storage support. See the links below.

## Runtime boundaries

- SQL executes in a dedicated Web Worker so a long-running query does not block the page's main thread.
- The worker exposes SQLite query execution only; it does not expose a JavaScript evaluation API to learner SQL.
- No remote database server is contacted and learner SQL is not posted to an execution endpoint.
- Database snapshots are stored in IndexedDB on the current browser profile and can be exported as a SQLite file.
- The worker is restarted after a stop or timeout. The last successfully saved snapshot is restored.
- The UI limits each SQL input to 50,000 characters, displays at most 200 rows per result set and applies an 8-second worker watchdog.
- This is a learning sandbox, not a hardened multi-tenant security boundary. Browser memory is not strictly capped. Learners must not enter secrets or private records.

## Compatibility and learning scope

The runtime is **SQLite**, not MySQL, SQL Server, PostgreSQL or Oracle. Lessons must label dialect-specific behaviour. For example, SQLite does not implement server-style `CREATE DATABASE` or `USE`; an application opens a database file and SQL can use `ATTACH DATABASE` for an additional schema. SQLite's `INTEGER PRIMARY KEY` and optional `AUTOINCREMENT` behaviour must not be presented as universal identity syntax.

## Persistence and offline limitation

IndexedDB stores the exported database bytes locally; it does not sync data across devices or accounts. The current runtime is fetched from a pinned CDN URL, so the first load requires network access. The current service worker caches the same-origin playground page and scripts, but does not yet vendor or cache the cross-origin sql.js JavaScript/Wasm files. Therefore full offline SQL execution is **not claimed**.

## Follow-up before release

1. **Passed:** Browser Review #1029 verified the pinned CDN build in Chromium, including mobile layout.
2. **Passed:** Browser Review #1029 verified IndexedDB persistence across reload, reset, SQL errors, worker initialization and lesson code transfer. File export is implemented but still needs a manual downloaded-file/open test.
3. Review memory limits, large result sets and transaction behaviour before enabling the playground for larger projects.
4. Decide whether to vendor the pinned runtime assets or extend the service-worker strategy for offline use.
5. **Passed:** SQL1–SQL3 lessons use `playgroundMode: sql`; every SQL3 lesson starter executed in the browser runtime during Browser Review #1029.

## References

- sql.js API documentation: https://sql.js.org/documentation/
- sql.js package and browser builds: https://www.npmjs.com/package/sql.js
- Official SQLite WebAssembly documentation: https://sqlite.org/wasm/doc/trunk/index.md
- Official SQLite WebAssembly goals and storage notes: https://sqlite.org/wasm/doc/trunk/about.md
