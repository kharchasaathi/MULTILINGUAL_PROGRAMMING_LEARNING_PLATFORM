/* CodeSaathi landing-page interactions.
 * Course cards and lesson navigation are owned by curriculum-loader.js.
 * This file owns only the global shell and the isolated HTML playground.
 */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);

  const editor = $("#codeEditor");
  const frame = $("#previewFrame");
  const runButton = $("#runCode");
  const previewStatus = $(".preview-live");
  let previewRunId = 0;

  function runCode() {
    if (!editor || !frame) return;
    if (previewStatus) previewStatus.textContent = "● RUNNING";
    try {
      const source = editor.value;
      const mode = editor.dataset.playgroundMode || "html";
      const runId = ++previewRunId;
      const readyScript = '<script>parent.postMessage({type:"codesaathi-preview-ready",runId:' + runId + '}, "*");</script>';
      const isFullDocument = /^\s*(?:<!doctype\s+html\b[^>]*>\s*)?<html\b/i.test(source);
      const fixtureStyles = "<style>body{font:16px Arial,sans-serif;padding:22px;color:#172033}" +
        ".demo-card,.article,.alert{max-width:36rem;padding:1rem;border:1px solid #cbd5e1;border-radius:12px}" +
        ".button,button{padding:9px 14px;border:0;border-radius:7px;background:#3157a4;color:white;cursor:pointer}" +
        ".cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}" +
        ".card{padding:1rem;border:1px solid #cbd5e1;border-radius:8px}.article{column-count:1}.alert{margin-block:1rem}" +
        "button:focus-visible,a:focus-visible{outline:3px solid #172033;outline-offset:3px}" +
        "#playgroundConsole{white-space:pre-wrap;overflow-wrap:anywhere;margin:1rem 0 0;padding:12px;background:#101828;color:#e6edf7;border-radius:8px;min-height:2.5rem;font:12px/1.5 monospace}</style>";
      const fixtureBody = "<main class=\"demo-card\"><h1>CodeSaathi preview</h1>" +
        "<p id=\"demoMessage\">Edit the code to see the result.</p><p id=\"status\">Status: waiting</p>" +
        "<div class=\"alert\">Sample alert banner</div><section class=\"article\">" +
        "<h2>First section</h2><p>Sample article content for layout demonstrations.</p>" +
        "<h2>Second section</h2><p>More content for counters and columns.</p></section>" +
        "<ol class=\"steps\"><li>Plan</li><li>Build</li><li>Review</li></ol>" +
        "<div class=\"cards\"><article class=\"card\"><h2>Card one</h2></article>" +
        "<article class=\"card\"><h2>Card two</h2></article></div>" +
        "<button class=\"button\" id=\"demoButton\" type=\"button\">Test interaction</button>" +
        "<pre id=\"playgroundConsole\" role=\"status\" aria-live=\"polite\">Console output appears here.</pre></main>";
      let html;
      if (isFullDocument || mode === "html" || mode === "combined") {
        if (isFullDocument) {
          html = /<\/body\s*>/i.test(source) ? source.replace(/<\/body\s*>/i, readyScript + "</body>") : source + readyScript;
        } else {
          html = "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
            fixtureStyles + "</head><body>" + source + readyScript + "</body></html>";
        }
      } else {
        const customCss = mode === "css" ? "<style>" + source.replace(/<\/style/gi, "<\\/style") + "</style>" : "";
        const consoleBootstrap = "(function(){var output=document.getElementById('playgroundConsole');" +
          "['log','info','warn','error'].forEach(function(method){console[method]=function(){if(!output)return;" +
          "var line=Array.prototype.map.call(arguments,function(value){if(typeof value==='string')return value;" +
          "try{return JSON.stringify(value)}catch(error){return String(value)}}).join(' ');" +
          "var current=output.textContent==='Console output appears here.'?'':output.textContent;" +
          "output.textContent=current+(current?'\\n':'')+(method==='log'?'':method.toUpperCase()+': ')+line;};});})();";
        const customScript = mode === "javascript" ? "<script>" + consoleBootstrap + "\n" + source.replace(/<\/script/gi, "<\\/script") + "</script>" : "";
        html = "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
          fixtureStyles + customCss + "</head><body>" + fixtureBody + customScript + readyScript + "</body></html>";
      }
      frame.srcdoc = html;
    } catch (error) {
      if (previewStatus) previewStatus.textContent = "● PREVIEW ERROR";
      console.error("CodeSaathi playground could not render the preview:", error);
    }
  }
  window.addEventListener("message", event => {
    if (event.source !== frame?.contentWindow) return;
    const data = event.data;
    if (!data || data.type !== "codesaathi-preview-ready" || data.runId !== previewRunId) return;
    if (previewStatus) previewStatus.textContent = "● READY";
  });
  runButton?.addEventListener("click", runCode);

  const closeLessonButton = $("#closeLesson");
  const lessonDialog = $("#lessonDialog");
  closeLessonButton?.addEventListener("click", () => {
    if (lessonDialog?.open) lessonDialog.close();
  });

  lessonDialog?.addEventListener("click", event => {
    if (event.target === lessonDialog) lessonDialog.close();
  });

  const startButton = $("#startHeader");
  startButton?.addEventListener("click", () => {
    $("#courses")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const menuButton = $("#menuToggle");
  const primaryNavigation = $("#primaryNavigation");
  if (menuButton && primaryNavigation) {
    const closeMenu = () => {
      primaryNavigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    };

    menuButton.addEventListener("click", () => {
      const isOpen = primaryNavigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuButton.textContent = isOpen ? "×" : "☰";
    });

    primaryNavigation.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (!primaryNavigation.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });
  }

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  if (editor && frame) runCode();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(error => {
        console.warn("CodeSaathi offline support could not be registered:", error);
      });
    });
  }
})();
