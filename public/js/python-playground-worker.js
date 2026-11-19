import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pyodide.mjs";

let pyodidePromise;
let inputLines = [];
let inputIndex = 0;
let activeRunId = 0;
let stdoutDecoder = new TextDecoder();
let stderrDecoder = new TextDecoder();

function send(type, payload = {}) {
  self.postMessage({ type, ...payload });
}
function readInput() {
  if (inputIndex < inputLines.length) return inputLines[inputIndex++];
  return "";
}
function blockNetworkApis() {
  const blocked = () => Promise.reject(new Error("Network access is disabled in this playground."));
  try { self.fetch = blocked; } catch {}
  try {
    self.XMLHttpRequest = class {
      open() { throw new Error("Network access is disabled in this playground."); }
      send() { throw new Error("Network access is disabled in this playground."); }
    };
  } catch {}
  try { self.WebSocket = class { constructor() { throw new Error("Network access is disabled in this playground."); } }; } catch {}
  try { self.EventSource = class { constructor() { throw new Error("Network access is disabled in this playground."); } }; } catch {}
}
async function initialize() {
  const pyodide = await loadPyodide({
    stdin: readInput,
    stdout: undefined,
    stderr: undefined
  });
  pyodide.setStdout({ write(buffer) {
    const text = stdoutDecoder.decode(buffer, { stream: true });
    if (text) send("stdout", { runId: activeRunId, text });
    return buffer.length;
  } });
  pyodide.setStderr({ write(buffer) {
    const text = stderrDecoder.decode(buffer, { stream: true });
    if (text) send("stderr", { runId: activeRunId, text });
    return buffer.length;
  } });
  blockNetworkApis();
  const pythonVersion = pyodide.runPython("import sys; sys.version.split()[0]");
  return { pyodide, pythonVersion };
}
pyodidePromise = initialize();
pyodidePromise.then(({ pythonVersion }) => send("ready", { version: pythonVersion }))
  .catch((error) => send("init-error", { message: error?.message || String(error) }));

self.addEventListener("message", async (event) => {
  const message = event.data || {};
  if (message.type !== "run") return;
  const { runId, code } = message;
  activeRunId = runId;
  try {
    const { pyodide } = await pyodidePromise;
    inputLines = String(message.stdin || "").replace(/\r/g, "").split("\n");
    inputIndex = 0;
    stdoutDecoder = new TextDecoder();
    stderrDecoder = new TextDecoder();
    await pyodide.runPythonAsync(String(code), { filename: "codesaathi_playground.py" });
    const stdoutTail = stdoutDecoder.decode();
    const stderrTail = stderrDecoder.decode();
    if (stdoutTail) send("stdout", { runId: activeRunId, text: stdoutTail });
    if (stderrTail) send("stderr", { runId: activeRunId, text: stderrTail });
  } catch (error) {
    send("error", { runId, message: error?.message || String(error), stack: error?.stack || "" });
  } finally {
    send("done", { runId });
  }
});