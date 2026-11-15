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

  function runCode() {
    if (!editor || !frame) return;
    const documentInFrame = frame.contentDocument;
    if (!documentInFrame) return;

    if (previewStatus) previewStatus.textContent = "● RUNNING";
    try {
      const source = editor.value;
      const mode = editor.dataset.playgroundMode || "html";
      const isFullDocument = /^\s*(?:<!doctype\s+html\b[^>]*>\s*)?<html\b/i.test(source);
      if (isFullDocument || mode === "html" || mode === "combined") {
        const html = isFullDocument
          ? source
          : "<!doctype html><html><head><meta charset=\"utf-8\">" +
            "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
            "<style>body{font:16px Arial,sans-serif;padding:22px;color:#172033}" +
            "button{padding:9px 14px;border:0;border-radius:7px;background:#6558e8;" +
            "color:white;cursor:pointer}button:focus-visible{outline:3px solid #172033;" +
            "outline-offset:3px}</style></head><body>" + source + "</body></html>";
        documentInFrame.open();
        documentInFrame.write(html);
        documentInFrame.close();
      } else {
        documentInFrame.open();
        documentInFrame.write(
          "<!doctype html><html><head><meta charset=\"utf-8\">" +
          "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
          "<style>body{font:16px Arial,sans-serif;padding:22px;color:#172033}" +
          ".demo-card,.article,.alert{max-width:36rem;padding:1rem;border:1px solid #cbd5e1;border-radius:12px}" +
          ".button,button{padding:9px 14px;border:0;border-radius:7px;background:#3157a4;color:white;cursor:pointer}" +
          ".cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}" +
          ".card{padding:1rem;border:1px solid #cbd5e1;border-radius:8px}.article{column-count:1}.alert{margin-block:1rem}" +
          "button:focus-visible,a:focus-visible{outline:3px solid #172033;outline-offset:3px}" +
          "#playgroundConsole{white-space:pre-wrap;overflow-wrap:anywhere;margin:1rem 0 0;padding:12px;background:#101828;color:#e6edf7;border-radius:8px;min-height:2.5rem;font:12px/1.5 monospace}" +
          "</style></head><body><main class=\"demo-card\">" +
          "<h1>CodeSaathi preview</h1><p id=\"demoMessage\">Edit the code to see the result.</p>" +
          "<p id=\"status\">Status: waiting</p><div class=\"alert\">Sample alert banner</div>" +
          "<section class=\"article\"><h2>First section</h2><p>Sample article content for layout demonstrations.</p>" +
          "<h2>Second section</h2><p>More content for counters and columns.</p></section>" +
          "<ol class=\"steps\"><li>Plan</li><li>Build</li><li>Review</li></ol>" +
          "<div class=\"cards\"><article class=\"card\"><h2>Card one</h2></article><article class=\"card\"><h2>Card two</h2></article></div>" +
          "<button class=\"button\" id=\"demoButton\" type=\"button\">Test interaction</button>" +
          "<pre id=\"playgroundConsole\" role=\"status\" aria-live=\"polite\">Console output appears here.</pre>" +
          "</main></body></html>"
        );
        documentInFrame.close();
        if (mode === "css") {
          const style = documentInFrame.createElement("style");
          style.textContent = source;
          documentInFrame.head.appendChild(style);
        } else if (mode === "javascript") {
          const output = documentInFrame.getElementById("playgroundConsole");
          const writeOutput = (method, values) => {
            if (!output) return;
            const line = values.map(value => {
              if (typeof value === "string") return value;
              try { return JSON.stringify(value); } catch { return String(value); }
            }).join(" ");
            const current = output.textContent === "Console output appears here." ? "" : output.textContent;
            output.textContent = current + (current ? "\n" : "") + (method === "log" ? "" : method.toUpperCase() + ": ") + line;
          };
          ["log", "info", "warn", "error"].forEach(method => {
            documentInFrame.defaultView.console[method] = (...values) => writeOutput(method, values);
          });
          const script = documentInFrame.createElement("script");
          script.textContent = source;
          documentInFrame.body.appendChild(script);
        }
      }
      if (previewStatus) previewStatus.textContent = "● READY";
    } catch (error) {
      if (previewStatus) previewStatus.textContent = "● PREVIEW ERROR";
      console.error("CodeSaathi playground could not render the preview:", error);
    }
  }

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
