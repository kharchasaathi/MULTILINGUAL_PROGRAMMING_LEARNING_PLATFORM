/* CodeSaathi curriculum loader v1.
 * Loads authored lesson JSON by stable topic ID and selected language.
 * Content is rendered as text; lesson JSON is never inserted as HTML.
 */
(() => {
  "use strict";
  const INDEX_URL = "/content/curriculum-index.json";
  const LANGUAGE_KEY = "codesaathi.language.v1";
  const PROGRESS_KEY = "codesaathi.curriculum.progress.v1";
  const $ = (selector, root = document) => root.querySelector(selector);
  const text = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  let index = null;
  let activeCourse = null;
  let loadSequence = 0;
  const getLanguage = () => {
    try { return localStorage.getItem(LANGUAGE_KEY) || "en"; } catch { return "en"; }
  };
  const readProgress = () => {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; }
  };
  const saveProgress = (topicId) => {
    const progress = readProgress();
    progress[topicId] = { completed: true, completedAt: new Date().toISOString() };
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch {}
  };
  const topicsFor = (courseId) => index.topics.filter(item => item.courseId === courseId);
  const courseNames = {
    foundation: ["Programming Foundations", "CORE CONCEPTS", "Understand computers, programs and problem-solving before writing code.", "F"],
    html: ["HTML", "STRUCTURE", "Build meaningful, accessible document structure for the web.", "HTML"],
    css: ["CSS", "PRESENTATION", "Control layout, typography, colour and responsive design.", "CSS"],
    javascript: ["JavaScript", "INTERACTION", "Build interactive behaviour, logic and dynamic web experiences.", "JS"]
  };

  function renderCourseCards() {
    const grid = $("#courseGrid");
    if (!grid) return;
    grid.replaceChildren();
    const progress = readProgress();
    index.courses.forEach(courseId => {
      const meta = courseNames[courseId];
      const items = topicsFor(courseId);
      const completed = items.filter(item => progress[item.topicId]?.completed).length;
      const card = text("article", "course-card");
      const top = text("div", "course-top");
      top.append(text("span", "course-icon " + (courseId === "html" ? "icon-html" : courseId === "css" ? "icon-css" : ""), meta[3]));
      top.append(text("span", "course-number", String(items.length).padStart(2, "0") + " TOPICS"));
      card.append(top, text("h3", "", meta[0]), text("p", "", meta[2]));
      const metaLine = text("div", "course-meta", items.length + " authored lesson topics · English and Telugu drafts");
      card.append(metaLine);
      const footer = text("div", "course-footer");
      footer.append(text("span", "course-price", "FREE PREVIEW"));
      const button = text("button", "course-open", "Explore curriculum ↗");
      button.type = "button";
      button.dataset.curriculumCourse = courseId;
      footer.append(button);
      card.append(footer, text("small", "progress-note", completed + " of " + items.length + " completed"));
      grid.append(card);
    });
  }

  function showCourse(courseId) {
    loadSequence += 1;
    activeCourse = courseId;
    const meta = courseNames[courseId];
    const topics = topicsFor(courseId);
    const container = $("#lessonContent");
    container.replaceChildren();
    container.append(text("div", "eyebrow", meta[1] + " · " + topics.length + " TOPICS"));
    const courseHeading = text("h2", "", meta[0] + " curriculum");
    container.append(courseHeading);
    container.append(text("p", "", meta[2]));
    const completed = readProgress();
    const modules = new Map();
    topics.forEach(topic => {
      if (!modules.has(topic.moduleId)) modules.set(topic.moduleId, []);
      modules.get(topic.moduleId).push(topic);
    });
    document.querySelectorAll("[data-course-nav]").forEach(button => {
      const selected = button.dataset.courseNav === courseId;
      button.classList.toggle("is-active", selected);
      if (selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    modules.forEach((moduleTopics, moduleId) => {
      const section = text("section", "curriculum-module");
      section.append(text("h3", "", moduleId + " · " + moduleTopics.length + " topics"));
      const list = text("div", "curriculum-topic-list");
      moduleTopics.forEach(topic => {
        const button = text("button", "curriculum-topic-button", (completed[topic.topicId]?.completed ? "✓ " : "○ ") + (topic.title || topic.topicId));
        button.type = "button";
        button.dataset.topicId = topic.topicId;
        button.addEventListener("click", () => loadTopic(topic));
        list.append(button);
      });
      section.append(list);
      container.append(section);
    });
    $("#lessonDialog").showModal();
  }

  async function loadTopic(topic) {
    const container = $("#lessonContent");
    const language = getLanguage();
    const requestedPath = topic.languages[language];
    const actualLanguage = requestedPath ? language : "en";
    const path = requestedPath || topic.languages.en;
    const sequence = ++loadSequence;
    if (!path) {
      container.replaceChildren(text("p", "curriculum-error", "This lesson has not been authored in the selected language yet."));
      return;
    }
    const loading = text("p", "curriculum-loading", "Loading " + topic.topicId + "…");
    container.replaceChildren(loading);
    try {
      const response = await fetch(path, { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const lesson = await response.json();
      if (sequence !== loadSequence) return;
      if (!lesson || lesson.topicId !== topic.topicId || !lesson.stages || !lesson.stages.understand || !lesson.stages.explain || !lesson.stages.practise) {
        throw new Error("Lesson content does not match the expected contract.");
      }
      renderLesson(lesson, actualLanguage !== language);
    } catch (error) {
      if (sequence !== loadSequence) return;
      container.replaceChildren(text("p", "curriculum-error", "Could not load this lesson (" + topic.topicId + "). Please retry. " + error.message));
    }
  }

  function renderLesson(lesson, usedFallback) {
    const container = $("#lessonContent");
    container.replaceChildren();
    const back = text("button", "curriculum-back", "← Back to " + (courseNames[activeCourse]?.[0] || "curriculum"));
    back.type = "button";
    back.addEventListener("click", () => showCourse(activeCourse));
    const notices = [];
    if (usedFallback) {
      notices.push(text("p", "curriculum-fallback", "This topic is not yet translated into the selected language. Showing the English lesson instead."));
    }
    // Editorial workflow status stays in lesson metadata; do not expose internal draft labels in the learner UI.
    const understand = lesson.stages.understand;
    const explain = lesson.stages.explain;
    const practice = lesson.stages.practise;
    const examples = Array.isArray(explain.examples) ? explain.examples : [];
    const code = lesson.practice?.starterCode || "";
    const questions = lesson.assessment?.questions || [];
    const onComplete = () => {
      saveProgress(lesson.topicId);
      const button = $("#markLesson", container);
      if (button) { button.textContent = "✓ Lesson saved"; button.disabled = true; }
      renderCourseCards();
    };
    window.CodeSaathiLessonTemplate.render(container, {
      title: lesson.topicId + " · " + lesson.title,
      learningObjectives: lesson.learningObjectives,
      understand: [understand.concept, understand.whyItMatters].filter(Boolean).join("\n\n"),
      context: [understand.history, understand.analogyLimit].filter(Boolean).join("\n\n"),
      explanation: explain.narrative || "",
      analogy: understand.analogy,
      examples,
      code,
      practice: "Guided: " + (practice.guidedTask || "") + "\n\nIndependent: " + (practice.independentTask || ""),
      hints: practice.hints || [],
      questions,
      onComplete
    });
    container.prepend(back, ...notices);
    if (readProgress()[lesson.topicId]?.completed) {
      const completedButton = $("#markLesson", container);
      if (completedButton) {
        completedButton.textContent = "✓ Lesson saved";
        completedButton.disabled = true;
        completedButton.setAttribute("aria-disabled", "true");
      }
    }
const link = $(".lesson-practice-link", container);
    if (link) {
      link.addEventListener("click", event => {
        event.preventDefault();
        if (code) {
          const editor = $("#codeEditor");
          if (editor) {
            const mode = lesson.practice?.playgroundMode || "html";
            editor.dataset.playgroundMode = mode;
            editor.setAttribute("aria-label", mode === "css" ? "CSS code editor" : mode === "javascript" ? "JavaScript code editor" : mode === "combined" ? "Combined HTML CSS JavaScript code editor" : "HTML code editor");
            editor.value = code;
            const fileLabel = $(".editor-toolbar span");
            if (fileLabel) {
              fileLabel.textContent = mode === "css" ? "styles.css" : mode === "javascript" ? "app.js" : mode === "combined" ? "index.html + styles + script" : "index.html";
            }
            $("#runCode")?.click();
          }
        }
        $("#lessonDialog")?.close();
        $("#practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      link.textContent = code ? "Load this lesson's starter code in the playground" : "Open the practice area";
    }
    container.scrollTop = 0;
  }

  async function init() {
    const grid = $("#courseGrid");
    if (!grid || !$("#lessonDialog") || !window.CodeSaathiLessonTemplate) return;
    try {
      const response = await fetch(INDEX_URL, { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      index = await response.json();
      if (index.version !== 1 || !Array.isArray(index.topics)) throw new Error("Unsupported curriculum index version.");
      renderCourseCards();
      const subjectNavigation = $("#subjectNavigation");
      subjectNavigation?.addEventListener("click", event => {
        const button = event.target.closest("[data-course-nav]");
        if (!button) return;
        showCourse(button.dataset.courseNav);
      });
      grid.addEventListener("click", event => {
        const button = event.target.closest("[data-curriculum-course]");
        if (!button) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        showCourse(button.dataset.curriculumCourse);
      }, true);
    } catch (error) {
      console.error("CodeSaathi curriculum could not initialize:", error);
      const notice = text("p", "curriculum-error", "The curriculum could not be loaded. Check your connection and reload the page to try again.");
      grid.prepend(notice);
      document.querySelectorAll("[data-course-nav]").forEach(button => { button.disabled = true; });
    }
  }
  init();
})();