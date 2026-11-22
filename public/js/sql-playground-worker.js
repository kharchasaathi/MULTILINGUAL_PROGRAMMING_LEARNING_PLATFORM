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
function hasSqlContent(source) {
  let index = 0;
  while (index < source.length) {
    if (/\s/.test(source[index])) { index += 1; continue; }
    if (source.startsWith("--", index)) {
      const end = source.indexOf("\n", index + 2);
      index = end < 0 ? source.length : end + 1;
      continue;
    }
    if (source.startsWith("/*", index)) {
      const end = source.indexOf("*/", index + 2);
      index = end < 0 ? source.length : end + 2;
      continue;
    }
    return true;
  }
  return false;
}
function hasMultipleStatements(sql) {
  let quote = null;
  for (let index = 0; index < sql.length; index += 1) {
    const char = sql[index];
    if (quote) {
      if (char === quote) {
        if (sql[index + 1] === quote && quote !== "]") { index += 1; continue; }
        quote = null;
      } else if (quote === "]" && char === "]") quote = null;
      continue;
    }
    if (sql.startsWith("--", index)) {
      const end = sql.indexOf("\n", index + 2);
      index = end < 0 ? sql.length : end;
      continue;
    }
    if (sql.startsWith("/*", index)) {
      const end = sql.indexOf("*/", index + 2);
      index = end < 0 ? sql.length : end + 1;
      continue;
    }
    if (char === "'" || char === '"' || char === "`") { quote = char; continue; }
    if (char === "[") { quote = "]"; continue; }
    if (char === ";" && hasSqlContent(sql.slice(index + 1))) return true;
  }
  return false;
}
function normalizeBindings(params) {
  if (!Array.isArray(params) && (!params || Object.getPrototypeOf(params) !== Object.prototype)) {
    throw new Error("Bound parameters must be a JSON array or object.");
  }
  const values = Array.isArray(params) ? params : Object.values(params);
  if (values.some(value => value !== null && typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean")) {
    throw new Error("Each bound value must be a string, number, boolean or null.");
  }
  if (values.some(value => typeof value === "number" && !Number.isFinite(value))) {
    throw new Error("Bound numbers must be finite.");
  }
  if (Array.isArray(params)) return params.map(value => typeof value === "boolean" ? Number(value) : value);
  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, typeof value === "boolean" ? Number(value) : value]));
}
function runPrepared(code, params) {
  if (hasMultipleStatements(code)) throw new Error("Bound-parameter mode accepts exactly one SQL statement. Run multi-statement scripts with the parameter box empty.");
  const statement = db.prepare(code);
  try {
    const bound = statement.bind(normalizeBindings(params));
    if (bound === false) throw new Error("Could not bind the supplied parameters. Check placeholder names and values.");
    const columns = statement.getColumnNames();
    const values = [];
    while (statement.step()) values.push(statement.get());
    return columns.length ? [{ columns, totalRows: values.length, values: values.slice(0, 200).map(row => row.map(serializeValue)) }] : [];
  } finally {
    statement.free();
  }
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
      const resultSets = message.params === null || message.params === undefined
        ? db.exec(code).map(result => ({
            columns: result.columns,
            totalRows: result.values.length,
            values: result.values.slice(0, 200).map(row => row.map(serializeValue))
          }))
        : runPrepared(code, message.params);
      const changes = db.getRowsModified();
      const bytes = exportBytes();
      send("result", { runId: message.runId, resultSets, changes, bytes }, [bytes]);
      return;
    }
    if (message.type === "import") {
      if (!(message.bytes instanceof ArrayBuffer) || !message.bytes.byteLength) throw new Error("Choose a non-empty SQLite database file.");
      if (message.bytes.byteLength > 20 * 1024 * 1024) throw new Error("SQLite imports are limited to 20 MB.");
      const imported = new SQL.Database(new Uint8Array(message.bytes));
      const previous = db;
      db = imported;
      if (previous) previous.close();
      const bytes = exportBytes();
      send("import-done", { bytes }, [bytes]);
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