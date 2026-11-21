"use strict";
const SQL_JS_URL = "https://cdn.jsdelivr.net/npm/sql.js@1.16.0/dist/sql-wasm.js";
const SQL_WASM_BASE = "https://cdn.jsdelivr.net/npm/sql.js@1.16.0/dist/";
let SQL = null;
let db = null;
let initPromise = null;
function send(type, payload = {}, transfer = []) {
  self.postMessage({ type, ...payload }, transfer);
}
function initRuntime() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    importScripts(SQL_JS_URL);
    SQL = await self.initSqlJs({ locateFile: file => SQL_WASM_BASE + file });
    // The WebAssembly binary has loaded. SQL statements have no JavaScript/network bridge.
    const blocked = () => { throw new Error("Network access is disabled in the SQL playground."); };
    try { self.fetch = blocked; } catch {}
    try { self.XMLHttpRequest = class { open() { blocked(); } send() { blocked(); } }; } catch {}
    try { self.WebSocket = class { constructor() { blocked(); } }; } catch {}
    try { self.EventSource = class { constructor() { blocked(); } }; } catch {}
    return SQL;
  })();
  return initPromise;
}
function exportBytes() {
  const bytes = db.export();
  const copy = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return copy;
}
function serializeValue(value) {
  if (value instanceof Uint8Array) {
    return "0x" + Array.from(value, byte => byte.toString(16).padStart(2, "0")).join("");
  }
  if (typeof value === "bigint") return value.toString();
  return value;
}
self.addEventListener("message", async event => {
  const message = event.data || {};
  try {
    await initRuntime();
    if (message.type === "init") {
      db = message.bytes ? new SQL.Database(new Uint8Array(message.bytes)) : new SQL.Database();
      send("ready", { version: SQL.version?.libVersion || "SQLite", restored: Boolean(message.bytes) });
      return;
    }
    if (!db) throw new Error("The SQL database is not initialized.");
    if (message.type === "run") {
      const code = String(message.code || "");
      if (!code.trim()) throw new Error("Enter an SQL statement before running.");
      if (code.length > 50000) throw new Error("SQL input is limited to 50,000 characters per run.");
      const resultSets = db.exec(code).map(result => ({
        columns: result.columns,
        totalRows: result.values.length,
        values: result.values.slice(0, 200).map(row => row.map(serializeValue))
      }));
      const changes = db.getRowsModified();
      const bytes = exportBytes();
      send("result", { runId: message.runId, resultSets, changes, bytes }, [bytes]);
      return;
    }
    if (message.type === "reset") {
      db.close();
      db = new SQL.Database();
      const bytes = exportBytes();
      send("reset-done", { bytes }, [bytes]);
      return;
    }
    if (message.type === "export") {
      const bytes = exportBytes();
      send("export-done", { bytes }, [bytes]);
    }
  } catch (error) {
    const payload = { runId: message.runId, message: error?.message || String(error) };
    if (message.type === "run" && db) {
      try {
        const bytes = exportBytes();
        payload.bytes = bytes;
        send("error", payload, [bytes]);
        return;
      } catch {}
    }
    send("error", payload);
  }
});