/* CodeSaathi reusable three-stage lesson renderer.
 * Content is passed as data; text is inserted with textContent, not HTML parsing.
 */
(() => {
  "use strict";
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const OBJECTIVES_HEADINGS = Object.freeze({
    en: "What you will learn by the end of this lesson",
    te: "ఈ పాఠం పూర్తయ్యే సరికి మీరు ఏమి నేర్చుకుంటారు?",
    hi: "इस पाठ के अंत तक आप क्या सीखेंगे?"
  });
  const objectivesHeading = () => OBJECTIVES_HEADINGS[document.documentElement.lang] || OBJECTIVES_HEADINGS.en;

  const render = (container, lesson) => {
    if (!container || !lesson) return;
    container.replaceChildren();
    if (lesson.title) container.append(make("h3", "lesson-template-title", lesson.title));

    const objectives = Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives.filter(item => typeof item === "string" && item.trim()) : [];
    if (objectives.length) {
      const section = make("section", "lesson-objectives");
      section.append(make("span", "lesson-stage-label", "LEARNING OBJECTIVES"));
      section.append(make("h4", "", objectivesHeading()));
      const list = make("ol", "lesson-objectives-list");
      objectives.forEach(objective => list.append(make("li", "", objective)));
      section.append(list);
      container.append(section);
    }

    const stage1 = make("section", "lesson-stage");
    stage1.append(make("span", "lesson-stage-label", "STAGE 1 · UNDERSTAND"));
    stage1.append(make("h4", "", "Understand the idea"));
    stage1.append(make("p", "", lesson.understand || lesson.intro || "This lesson introduces the concept and the problem it helps solve."));
    if (lesson.context) stage1.append(make("p", "", lesson.context));

    const stage2 = make("section", "lesson-stage");
    stage2.append(make("span", "lesson-stage-label", "STAGE 2 · EXPLANATION"));
    stage2.append(make("h4", "", "See how it works"));
    stage2.append(make("p", "", lesson.explanation || "Read the example and connect each important part to the result it produces."));
    if (lesson.analogy) stage2.append(make("p", "", "A useful comparison: " + lesson.analogy));
    if (lesson.code) {
      const code = make("pre");
      code.append(make("code", "", lesson.code));
      stage2.append(code);
    }

    const stage3 = make("section", "lesson-stage");
    stage3.append(make("span", "lesson-stage-label", "STAGE 3 · WRITE, RUN, OBSERVE & PRACTISE"));
    stage3.append(make("h4", "", "Try it yourself"));
    stage3.append(make("p", "", lesson.practice || lesson.task || "Change the example and observe what happens."));
    const link = make("a", "lesson-practice-link", "Open the practice area");
    link.href = "#practice";
    stage3.append(link);

    if (lesson.quizQuestion) {
      const check = make("details", "lesson-knowledge-check");
      const summary = make("summary", "", "Knowledge check: " + lesson.quizQuestion);
      check.append(summary);
      check.append(make("p", "", "Think about your answer, then compare it with the explanation: " + (lesson.quizAnswer || "Review the example and identify the part responsible for the result.")));
      stage3.append(check);
    }

    container.append(stage1, stage2, stage3);
    if (lesson.onComplete) {
      const button = make("button", "lesson-complete", lesson.completeLabel || "Mark lesson complete");
      button.type = "button";
      button.id = "markLesson";
      button.addEventListener("click", lesson.onComplete);
      container.append(button);
    }
  };

  window.CodeSaathiLessonTemplate = Object.freeze({ render });
})();
