(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const starter = $("sqlCode").value;
  let lessonStarter = starter;
  const samples = {
    starter,
    filter: "CREATE TABLE products (product_id INTEGER PRIMARY KEY, product_name TEXT, price REAL);\nINSERT INTO products VALUES (1, 'Notebook', 45.0), (2, 'Pen', 10.0), (3, 'Folder', 25.0);\nSELECT product_name, price FROM products WHERE price >= 20 ORDER BY price DESC;",
    update: "CREATE TABLE inventory (item_id INTEGER PRIMARY KEY, item_name TEXT, quantity INTEGER);\nINSERT INTO inventory VALUES (1, 'Notebook', 12), (2, 'Pen', 30);\nUPDATE inventory SET quantity = quantity + 5 WHERE item_id = 1;\nSELECT * FROM inventory ORDER BY item_id;",
    join: "CREATE TABLE departments (department_id INTEGER PRIMARY KEY, department_name TEXT);\nCREATE TABLE employees (employee_id INTEGER PRIMARY KEY, employee_name TEXT, department_id INTEGER);\nINSERT INTO departments VALUES (1, 'Support'), (2, 'Sales');\nINSERT INTO employees VALUES (10, 'Asha', 1), (11, 'Ravi', 2);\nSELECT e.employee_name, d.department_name FROM employees AS e JOIN departments AS d ON e.department_id = d.department_id;",
    constraint: "CREATE TABLE registrations (registration_id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, age INTEGER CHECK (age >= 18));\nINSERT INTO registrations (email, age) VALUES ('asha@example.test', 22);\nSELECT * FROM registrations;"
  };
  const editor = $("sqlCode");
  const results = $("sqlResults");
  const status = $("sqlStatus");
  const statusText = $("sqlStatusText");
  const version = $("sqlVersion");
  const runButton = $("runSql");
  const stopButton = $("stopSql");
  const resetDbButton = $("resetSqlDatabase");
  const exportButton = $("exportSqlDatabase");
  const runState = $("sqlRunState");
  let worker = null;
  let ready = false;
  let running = false;
  let runId = 0;
  let watchdog = null;
  let databaseBytes = null;
  const TIMEOUT_MS = 8000;
  const DB_NAME = "codesaathi-sql-playground";
  const DB_STORE = "snapshots";
  function setStatus(message, state) {
    statusText.textContent = message;
    status.dataset.state = state;
  }
  function setRunning(value) {
    running = value;
    runButton.disabled = !ready || value;
    stopButton.disabled = !value;
    resetDbButton.disabled = !ready || value;
    exportButton.disabled = !ready || value;
    runState.textContent = value ? "Running…" : "Waiting";
  }
  function openStore() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Could not open local database storage."));
    });
  }
  async function readSnapshot() {
    const store = await openStore();
    try {
      return await new Promise((resolve, reject) => {
        const request = store.transaction(DB_STORE, "readonly").objectStore(DB_STORE).get("main");
        request.onsuccess = () => resolve(request.result ? new Uint8Array(request.result) : null);
        request.onerror = () => reject(request.error);
      });
    } finally { store.close(); }
  }
  async function saveSnapshot(bytes) {
    if (!bytes) return;
    const store = await openStore();
    try {
      const copy = bytes.slice(0);
      await new Promise((resolve, reject) => {
        const transaction = store.transaction(DB_STORE, "readwrite");
        transaction.objectStore(DB_STORE).put(copy, "main");
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error || new Error("Local database save was cancelled."));
      });
      databaseBytes = new Uint8Array(copy);
    } finally { store.close(); }
  }
  function clearResults(message = "Run a query to see results here.") {
    results.replaceChildren();
    const p = document.createElement("p");
    p.className = "sql-empty";
    p.textContent = message;
    results.append(p);
  }
  function appendMessage(message, kind = "sql-message") {
    const p = document.createElement("p");
    p.className = kind;
    p.textContent = message;
    results.append(p);
  }
  function renderResultSets(resultSets, changes) {
    results.replaceChildren();
    if (!resultSets.length) {
      appendMessage(changes ? "Statement executed. Rows changed: " + changes : "Statement executed successfully. No rows were returned.");
      return;
    }
    resultSets.forEach((set, index) => {
      const section = document.createElement("section");
      section.className = "sql-result";
      const heading = document.createElement("h3");
      heading.textContent = "Result set " + (index + 1) + " · " + set.totalRows + " row(s)" + (set.totalRows > set.values.length ? " · showing first " + set.values.length : "");
      section.append(heading);
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      set.columns.forEach(column => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = String(column);
        headerRow.append(th);
      });
      thead.append(headerRow);
      table.append(thead);
      const tbody = document.createElement("tbody");
      set.values.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(value => {
          const td = document.createElement("td");
          td.textContent = value === null ? "NULL" : String(value);
          tr.append(td);
        });
        tbody.append(tr);
      });
      table.append(tbody);
      section.append(table);
      results.append(section);
    });
    if (changes) appendMessage("Rows changed by the last statement: " + changes);
  }
  function terminateWorker() {
    if (worker) worker.terminate();
    worker = null;
    ready = false;
    clearTimeout(watchdog);
    watchdog = null;
    setRunning(false);
  }
  async function bootWorker() {
    terminateWorker();
    setStatus("Loading SQLite WebAssembly runtime…", "loading");
    version.textContent = "SQLite: loading";
    try {
      databaseBytes = await readSnapshot();
    } catch (error) {
      setStatus("Local storage unavailable: " + error.message, "error");
      appendMessage("This browser could not open IndexedDB. The SQL runtime cannot preserve local changes.", "sql-error");
      return;
    }
    try {
      worker = new Worker("/js/sql-playground-worker.js", { name: "codesaathi-sql-runtime" });
    } catch (error) {
      setStatus("Could not start the SQL worker: " + error.message, "error");
      return;
    }
    worker.onmessage = async event => {
      const message = event.data || {};
      if (message.type === "ready") {
        ready = true;
        version.textContent = "SQLite " + message.version;
        setStatus(message.restored ? "SQLite ready · restored local database" : "SQLite ready · new local database", "ready");
        setRunning(false);
        return;
      }
      if (message.runId !== undefined && message.runId !== runId) return;
      if (message.type === "result") {
        clearTimeout(watchdog);
        watchdog = null;
        if (message.bytes) {
          try { await saveSnapshot(message.bytes); }
          catch (error) { appendMessage("Query ran, but the local save failed: " + error.message, "sql-error"); }
        }
        renderResultSets(message.resultSets || [], message.changes || 0);
        setRunning(false);
        return;
      }
      if (message.type === "error") {
        clearTimeout(watchdog);
        watchdog = null;
        if (message.bytes) {
          try { await saveSnapshot(message.bytes); } catch {}
        }
        appendMessage("SQL error: " + message.message, "sql-error");
        setStatus("Query returned an error", "error");
        setRunning(false);
        return;
      }
      if (message.type === "reset-done") {
        if (message.bytes) await saveSnapshot(message.bytes);
        clearResults("Local database reset. Run a statement to create tables.");
        setStatus("SQLite ready · empty local database", "ready");
        setRunning(false);
        return;
      }
      if (message.type === "export-done") {
        if (!message.bytes) return;
        const blob = new Blob([message.bytes], { type: "application/vnd.sqlite3" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "codesaathi-learning.sqlite";
        anchor.click();
        URL.revokeObjectURL(url);
        runState.textContent = "Database exported";
      }
    };
    worker.onerror = event => {
      setStatus("SQL worker error: " + (event.message || "Unknown worker error"), "error");
      appendMessage(event.message || "The SQL worker failed.", "sql-error");
      terminateWorker();
    };
    worker.postMessage({ type: "init", bytes: databaseBytes ? databaseBytes.buffer.slice(0) : null }, databaseBytes ? [databaseBytes.buffer] : []);
  }
  function runCode() {
    if (!ready || running || !worker) return;
    const code = editor.value;
    if (!code.trim()) {
      clearResults("Enter an SQL statement before running.");
      return;
    }
    if (code.length > 50000) {
      clearResults("SQL input is limited to 50,000 characters per run.");
      return;
    }
    clearResults("Executing SQL…");
    runId += 1;
    setRunning(true);
    worker.postMessage({ type: "run", runId, code });
    watchdog = setTimeout(() => {
      terminateWorker();
      setStatus("Query stopped after the 8-second time limit. Restarting from the last saved database snapshot.", "error");
      appendMessage("Execution timed out. Any unsaved changes from this run were discarded.", "sql-error");
      bootWorker();
      runState.textContent = "Timed out";
    }, TIMEOUT_MS);
  }
  function stopCode() {
    if (!running) return;
    terminateWorker();
    setStatus("Query stopped. Reloading the last saved local database.", "loading");
    appendMessage("Execution stopped. The worker was terminated; unsaved changes were discarded.", "sql-empty");
    bootWorker();
    runState.textContent = "Stopped";
  }
  runButton.addEventListener("click", runCode);
  stopButton.addEventListener("click", stopCode);
  $("resetSqlCode").addEventListener("click", () => {
    editor.value = starter;
    editor.focus();
  });
  $("restoreSqlCode").addEventListener("click", () => {
    editor.value = lessonStarter;
    editor.focus();
  });
  $("clearSqlOutput").addEventListener("click", () => clearResults());
  $("copySqlCode").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(editor.value);
      runState.textContent = "SQL copied";
    } catch {
      editor.focus();
      editor.select();
      runState.textContent = "Select and copy the SQL";
    }
  });
  $("sqlExample").addEventListener("change", event => {
    if (samples[event.target.value]) editor.value = samples[event.target.value];
    editor.focus();
  });
  resetDbButton.addEventListener("click", () => {
    if (!ready || running || !window.confirm("Reset the local SQL database? All saved tables and rows in this browser will be removed.")) return;
    clearResults("Resetting local database…");
    worker.postMessage({ type: "reset" });
  });
  exportButton.addEventListener("click", () => {
    if (ready && !running) worker.postMessage({ type: "export" });
  });
  editor.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runCode();
    }
  });
  async function loadLinkedLesson() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get("code");
    if (token) {
      try {
        const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
        const state = JSON.parse(new TextDecoder().decode(bytes));
        if (state.language !== "sql" || typeof state.code !== "string" || !state.code.trim() || state.code.length > 50000) throw new Error("Invalid SQL lesson code state");
        editor.value = state.code;
        lessonStarter = state.code;
        document.title = (state.topicId ? state.topicId + " " : "") + "SQL Playground — CodeSaathi";
        runState.textContent = state.topicId ? state.topicId + " lesson example loaded" : "Lesson example loaded";
        return;
      } catch (error) {
        appendMessage("Could not read the linked lesson code: " + error.message, "sql-error");
      }
    }
    const topicId = new URLSearchParams(window.location.search).get("topic");
    if (!topicId || !/^SQL\d+\.\d+$/.test(topicId)) return;
    try {
      const response = await fetch("/content/en/sql/" + topicId + ".json", { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const lesson = await response.json();
      if (lesson.courseId !== "sql" || lesson.topicId !== topicId) throw new Error("Lesson identity mismatch");
      const code = lesson.practice?.starterCode || lesson.stages?.explain?.examples?.[0]?.code;
      if (typeof code !== "string" || !code.trim()) throw new Error("No SQL starter code is available");
      editor.value = code;
      lessonStarter = code;
      runState.textContent = topicId + " example loaded";
      document.title = topicId + " SQL Playground — CodeSaathi";
    } catch (error) {
      appendMessage("Could not load the lesson example: " + error.message, "sql-error");
    }
  }
  window.addEventListener("beforeunload", terminateWorker);
  loadLinkedLesson();
  bootWorker();
})();