(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const starter = 'print("Hello, CodeSaathi!")';
  let lessonStarter = starter;
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
      if (message.type === "init-error") {
        setStatus("Python runtime failed to load: " + message.message, "error");
        runButton.disabled = true;
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
    editor.value = lessonStarter;
    stdin.value = "";
    output.textContent = "Output will appear here.";
    runState.textContent = "Waiting";
  });
  $("restorePython").addEventListener("click", () => {
    editor.value = lessonStarter;
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
    lessonStarter = example.code;
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
  async function loadLinkedLessonExample() {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const codeToken = hashParams.get("code");
    if (codeToken) {
      try {
        const base64 = codeToken.replace(/-/g, "+").replace(/_/g, "/");
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
        const state = JSON.parse(new TextDecoder().decode(bytes));
        if (state.language !== "python" || typeof state.code !== "string" || !state.code.trim() || state.code.length > 200000) {
          throw new Error("Invalid Python lesson code state");
        }
        editor.value = state.code;
        lessonStarter = state.code;
        stdin.value = typeof state.stdin === "string" ? state.stdin : "";
        runState.textContent = "Lesson example loaded";
        document.title = "Python Lesson Playground — CodeSaathi";
        return;
      } catch (error) {
        appendOutput("Could not read the linked lesson code: " + error.message, "system");
      }
    }
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get("topic");
    if (!topicId || !/^PY\d+\.\d+$/.test(topicId)) return;
    try {
      const response = await fetch("/content/en/python/" + topicId + ".json", { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const lesson = await response.json();
      if (lesson.courseId !== "python" || lesson.topicId !== topicId) throw new Error("Lesson identity mismatch");
      const example = lesson.stages?.explain?.examples?.[0];
      if (typeof example?.code !== "string" || !example.code.trim()) throw new Error("No runnable lesson example is available");
      editor.value = example.code;
      lessonStarter = example.code;
      runState.textContent = topicId + " example loaded";
      document.title = topicId + " Python Playground — CodeSaathi";
    } catch (error) {
      appendOutput("Could not load the lesson example: " + error.message, "system");
    }
  }
  loadLinkedLessonExample();
  bootWorker();
})();