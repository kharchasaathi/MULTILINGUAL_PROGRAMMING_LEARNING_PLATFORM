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
      documentInFrame.open();
      documentInFrame.write(
        "<!doctype html><html><head><meta charset=\"utf-8\">" +
        "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" +
        "<style>body{font:16px Arial,sans-serif;padding:22px;color:#172033}" +
        "button{padding:9px 14px;border:0;border-radius:7px;background:#6558e8;" +
        "color:white;cursor:pointer}button:focus-visible{outline:3px solid #172033;" +
        "outline-offset:3px}</style></head><body>" +
        editor.value +
        "</body></html>"
      );
      documentInFrame.close();
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
