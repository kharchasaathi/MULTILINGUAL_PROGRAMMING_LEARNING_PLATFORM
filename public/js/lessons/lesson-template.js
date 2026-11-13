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

  const render = (container, lesson) => {
    if (!container || !lesson) return;
    container.replaceChildren();

    const stage1 = make("section", "lesson-stage");
    stage1.append(make("span", "lesson-stage-label", "STAGE 1 · UNDERSTAND"));
    stage1.append(make("h4", "", "Understand the idea"));
    stage1.append(make("p", "", lesson.understand || lesson.intro || "This lesson introduces the concept and the problem it helps solve."));
    if (lesson.context) stage1.append(make("p", "", lesson.context));

    const stage2 = make("section", "lesson-stage");
    stage2.append(make("span", "lesson-stage-label", "STAGE 2 · HUMAN EXPLANATION"));
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
