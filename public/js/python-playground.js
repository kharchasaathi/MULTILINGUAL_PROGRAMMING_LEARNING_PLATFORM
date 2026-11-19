(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const starter = 'print("Hello, CodeSaathi!")';
  const examples = {
    hello: { code: starter, stdin: "" },
    input: { code: 'name = input("Your name: ")\nage = int(input("Your age: "))\nprint(f"Hello {name}, next year you will be {age + 1}.")', stdin: "Asha\n25" },
    loop: { code: "total = 0\nfor number in range(1, 6):\n    total += number\nprint('Total:', total)", stdin: "" },
    function: { code: "def greet(name):\n    return f'Welcome, {name}! '\n\nprint(greet('CodeSaathi'))", stdin: "" },
    error: { code: "try:\n    value = int('not-a-number')\nexcept ValueError as error:\n    print(type(error).__name__)\n    print(error)", stdin: "" }
  };
  const editor = $("pythonCode");
  const stdin = $("pythonStdin");
  const output = $("pythonOutput");
  const status = $("runtimeStatus");
  const statusText = $("runtimeStatusText");
  const version = $("pythonVersion");
  const runButton = $("runPython");
  const stopButton = $("stopPython");
  const runState = $("runState");
  let worker = null;
  let ready = false;
  let running = false;
  let watchdog = null;
  let runId = 0;
  const TIMEOUT_MS = 10000;

  function appendOutput(text, kind = "") {
    if (output.textContent === "Output will appear here.") output.textContent = "";
    const span = document.createElement("span");
    if (kind) span.className = kind;
    span.textContent = text;
    output.append(span);
    output.scrollTop = output.scrollHeight;
  }
  function setStatus(message, state) {
    statusText.textContent = message;
    status.dataset.state = state;
  }
  function setRunning(value) {
    running = value;
    runButton.disabled = !ready || value;
    stopButton.disabled = !value;
    runState.textContent = value ? "Running…" : "Waiting";
  }
  function bootWorker() {
    ready = false;
    runButton.disabled = true;
    version.textContent = "Python version: loading";
    setStatus("Loading Python runtime…", "loading");
    try {
      worker = new Worker("/js/python-playground-worker.js", { type: "module", name: "codesaathi-python-runtime" });
    } catch (error) {
      setStatus("Could not start the Python worker: " + error.message, "error");
      return;
    }
    worker.onmessage = (event) => {
      const message = event.data || {};
      if (message.type === "ready") {
        ready = true;
        version.textContent = "Python " + message.version;
        setStatus("Python runtime ready", "ready");
        runButton.disabled = running;
        return;
      }
      if (message.runId !== runId) return;
      if (message.type === "stdout") appendOutput(message.text);
      if (message.type === "stderr") appendOutput(message.text, "stderr");
      if (message.type === "error") {
        appendOutput(message.message || "Python execution failed.", "stderr");
        if (message.stack) appendOutput("\n" + message.stack, "stderr");
      }
      if (message.type === "done") {
        clearTimeout(watchdog);
        watchdog = null;
        setRunning(false);
      }
      if (message.type === "init-error") {
        setStatus("Python runtime failed to load: " + message.message, "error");
        runButton.disabled = true;
      }
    };
    worker.onerror = (event) => {
      clearTimeout(watchdog);
      watchdog = null;
      setRunning(false);
      setStatus("Python worker error: " + (event.message || "Unknown worker error"), "error");
      appendOutput(event.message || "Worker failed.", "stderr");
    };
  }
  function restartWorker(reason) {
    clearTimeout(watchdog);
    watchdog = null;
    if (worker) worker.terminate();
    worker = null;
    ready = false;
    setRunning(false);
    if (reason) appendOutput(reason, "system");
    bootWorker();
  }
  function runCode() {
    if (!ready || running || !worker) return;
    const code = editor.value;
    if (!code.trim()) {
      output.textContent = "";
      appendOutput("Enter some Python code before running.", "system");
      return;
    }
    output.textContent = "";
    runId += 1;
    setRunning(true);
    appendOutput("▶ Running Python…\n", "system");
    worker.postMessage({ type: "run", runId, code, stdin: stdin.value });
    watchdog = setTimeout(() => {
      restartWorker("Execution stopped: the 10-second time limit was reached. The Python runtime is restarting.");
      runState.textContent = "Timed out";
    }, TIMEOUT_MS);
  }
  function stopCode() {
    if (!running) return;
    restartWorker("Execution stopped by the learner. The Python runtime is restarting.");
    runState.textContent = "Stopped";
  }
  runButton.addEventListener("click", runCode);
  stopButton.addEventListener("click", stopCode);
  $("resetPython").addEventListener("click", () => {
    editor.value = starter;
    stdin.value = "";
    output.textContent = "Output will appear here.";
    runState.textContent = "Waiting";
  });
  $("restorePython").addEventListener("click", () => {
    editor.value = starter;
    stdin.value = "";
    editor.focus();
  });
  $("clearPythonOutput").addEventListener("click", () => { output.textContent = "Output will appear here."; });
  $("copyPython").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(editor.value);
      runState.textContent = "Code copied";
    } catch {
      editor.focus();
      editor.select();
      runState.textContent = "Select and copy the code";
    }
  });
  $("pythonExample").addEventListener("change", (event) => {
    const example = examples[event.target.value];
    if (!example) return;
    editor.value = example.code;
    stdin.value = example.stdin;
    editor.focus();
  });
  editor.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runCode();
    }
  });
  window.addEventListener("beforeunload", () => {
    clearTimeout(watchdog);
    if (worker) worker.terminate();
  });
  bootWorker();
})();