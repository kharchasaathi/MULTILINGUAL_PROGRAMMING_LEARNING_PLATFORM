(() => {
  "use strict";
  const API = "https://wandbox.org/api";
  const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodeSaathi!");
    }
}`;
  const $ = (selector) => document.querySelector(selector);
  const status = $("#javaStatus");
  const statusText = $("#javaStatusText");
  const versionText = $("#javaVersion");
  const compilerSelect = $("#javaCompiler");
  const editor = $("#javaCode");
  const input = $("#javaInput");
  const output = $("#javaOutput");
  const runButton = $("#runJava");
  const stopButton = $("#stopJava");
  const runState = $("#javaRunState");
  let compilers = [];
  let activeRequest = null;

  function setStatus(state, message) {
    status.dataset.state = state;
    statusText.textContent = message;
  }
  function setOutput(value, kind = "info") {
    output.textContent = value || "(No output)";
    output.dataset.kind = kind;
  }
  function decodeLessonCode() {
    const match = location.hash.match(/(?:^|#|&)code=([^&]+)/);
    if (!match) return;
    try {
      const token = match[1].replace(/-/g, "+").replace(/_/g, "/");
      const binary = atob(token);
      const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
      const state = JSON.parse(new TextDecoder().decode(bytes));
      if (state && state.language === "java" && typeof state.code === "string" && state.code.length <= 40000) {
        editor.value = state.code;
        if (typeof state.stdin === "string") input.value = state.stdin.slice(0, 8000);
      }
    } catch (error) {
      setOutput("The lesson code link could not be read. The starter program is ready.", "error");
    }
  }
  function compareVersions(a, b) {
    const av = (a.version || "").match(/\d+/g) || ["0"];
    const bv = (b.version || "").match(/\d+/g) || ["0"];
    for (let i = 0; i < Math.max(av.length, bv.length); i++) {
      const difference = Number(bv[i] || 0) - Number(av[i] || 0);
      if (difference) return difference;
    }
    return 0;
  }
  async function loadCompilers() {
    setStatus("loading", "Contacting Wandbox for available Java compilers…");
    try {
      const response = await fetch(API + "/list.json", { headers: { Accept: "application/json" }, cache: "no-store" });
      if (!response.ok) throw new Error("Compiler list request returned HTTP " + response.status);
      const all = await response.json();
      compilers = all.filter(item => String(item.language || "").toLowerCase() === "java" && item.name && item.version)
        .sort((a, b) => {
          const aStable = /head|experimental/i.test(a.version + " " + a.name) ? 1 : 0;
          const bStable = /head|experimental/i.test(b.version + " " + b.name) ? 1 : 0;
          return aStable - bStable || compareVersions(a, b);
        });
      if (!compilers.length) throw new Error("Wandbox did not list an available Java compiler.");
      compilerSelect.replaceChildren();
      compilers.forEach(compiler => {
        const option = document.createElement("option");
        option.value = compiler.name;
        option.textContent = (compiler["display-name"] || compiler.name) + " · " + compiler.version;
        compilerSelect.append(option);
      });
      const java21 = compilers.find(item => /(^|\D)21(\D|$)/.test(item.version));
      if (java21) compilerSelect.value = java21.name;
      compilerSelect.disabled = false;
      runButton.disabled = false;
      const selected = compilers.find(item => item.name === compilerSelect.value) || compilers[0];
      versionText.textContent = "Compiler: " + selected.version;
      setStatus("ready", "Java compiler list loaded. Your code runs on the external Wandbox service.");
    } catch (error) {
      compilerSelect.replaceChildren(new Option("Java compiler unavailable", ""));
      compilerSelect.disabled = true;
      runButton.disabled = true;
      versionText.textContent = "Compiler: unavailable";
      setStatus("error", "Could not load Java compilers. Check your connection and retry.");
      setOutput(error.message + "\n\nWandbox may be temporarily unavailable or block this network.", "error");
    }
  }
  compilerSelect.addEventListener("change", () => {
    const selected = compilers.find(item => item.name === compilerSelect.value);
    versionText.textContent = "Compiler: " + (selected?.version || "unavailable");
  });
  async function runJava() {
    const code = editor.value;
    if (!code.trim()) {
      setOutput("Write a Java program before selecting Run.", "error");
      return;
    }
    if (code.length > 40000 || input.value.length > 8000) {
      setOutput("Keep source code under 40 KB and standard input under 8 KB.", "error");
      return;
    }
    const compiler = compilers.find(item => item.name === compilerSelect.value);
    if (!compiler) {
      setOutput("No Java compiler is selected. Reload the compiler list and try again.", "error");
      return;
    }
    if (activeRequest) activeRequest.abort();
    activeRequest = new AbortController();
    runButton.disabled = true;
    stopButton.disabled = false;
    runState.textContent = "Compiling and running…";
    setStatus("loading", "Sending source to Wandbox. Please wait…");
    setOutput("Compiling Java source…", "info");
    const timeout = setTimeout(() => activeRequest?.abort(), 60000);
    try {
      const response = await fetch(API + "/compile.json", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          compiler: compiler.name,
          code,
          codes: [],
          stdin: input.value,
          options: "",
          "compiler-option-raw": "",
          "runtime-option-raw": "",
          title: "CodeSaathi Java Playground",
          description: "Student Java practice",
          save: false
        }),
        signal: activeRequest.signal
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Execution request returned HTTP " + response.status);
      const compileText = [result.compiler_error, result.compiler_message].filter(Boolean).join("\n").trim();
      const programText = [result.program_output, result.program_message, result.program_error].filter(Boolean).join("\n").trim();
      const success = String(result.status) === "0";
      const parts = [];
      if (compileText) parts.push("COMPILER\n" + compileText);
      if (programText) parts.push("PROGRAM\n" + programText);
      if (result.signal) parts.push("Process signal: " + result.signal);
      if (!parts.length) parts.push(success ? "Program completed with no output." : "The compiler did not return output.");
      setOutput(parts.join("\n\n"), success ? "success" : "error");
      runState.textContent = success ? "Finished" : "Compilation or runtime error";
      setStatus(success ? "ready" : "error", success ? "Execution finished using " + (result.compiler || compiler.name) + "." : "Java execution returned an error. Review the diagnostics.");
    } catch (error) {
      if (error.name === "AbortError") {
        setOutput("Execution was stopped or exceeded the 60-second request limit.", "error");
        runState.textContent = "Stopped";
        setStatus("error", "Execution stopped or timed out.");
      } else {
        setOutput(error.message + "\n\nThe external compiler may be unavailable. Try again later.", "error");
        runState.textContent = "Request failed";
        setStatus("error", "Could not complete the Java execution request.");
      }
    } finally {
      clearTimeout(timeout);
      activeRequest = null;
      runButton.disabled = !compilers.length;
      stopButton.disabled = true;
    }
  }
  runButton.addEventListener("click", runJava);
  stopButton.addEventListener("click", () => activeRequest?.abort());
  $("#resetJava").addEventListener("click", () => { editor.value = ""; input.value = ""; editor.focus(); });
  $("#restoreJava").addEventListener("click", () => { editor.value = DEFAULT_CODE; input.value = ""; editor.focus(); });
  $("#copyJava").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(editor.value);
      runState.textContent = "Code copied";
    } catch {
      editor.focus();
      editor.select();
      runState.textContent = "Select and copy the code";
    }
  });
  $("#clearJavaOutput").addEventListener("click", () => { setOutput("Output cleared."); runState.textContent = "Waiting"; });
  decodeLessonCode();
  loadCompilers();
})();
