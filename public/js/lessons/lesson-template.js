/* CodeSaathi reusable three-stage lesson renderer.
 * Lesson content is data and is always inserted with textContent, never parsed as HTML.
 */
(() => {
  "use strict";
  const make = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const OBJECTIVES_HEADINGS = Object.freeze({
    en: "What you will learn by the end of this lesson",
    te: "ఈ పాఠం పూర్తయ్యే సరికి మీరు ఏమి నేర్చుకుంటారు?",
    hi: "इस पाठ के अंत तक आप क्या सीखेंगे?"
  });
  const labels = Object.freeze({
    en: { understand:"Understand the idea", explain:"See how it works", practise:"Try it yourself", examples:"Worked examples", hints:"Helpful hints", assessment:"Check your understanding", choose:"Choose one answer", correct:"Correct. Well done!", incorrect:"Not quite. Review the explanation and try again.", answer:"Correct answer: ", explanation:"Explanation: ", expected:"What to notice: ", practiceLink:"Open the practice area" },
    te: { understand:"భావనను అర్థం చేసుకోండి", explain:"ఇది ఎలా పనిచేస్తుందో చూడండి", practise:"మీరు స్వయంగా ప్రయత్నించండి", examples:"వివరించిన ఉదాహరణలు", hints:"సహాయక సూచనలు", assessment:"మీ అవగాహనను పరీక్షించుకోండి", choose:"ఒక సమాధానాన్ని ఎంచుకోండి", correct:"సరైన సమాధానం. బాగా చేశారు!", incorrect:"ఇది సరైన సమాధానం కాదు. వివరణను పరిశీలించి మళ్లీ ప్రయత్నించండి.", answer:"సరైన సమాధానం: ", explanation:"వివరణ: ", expected:"గమనించాల్సిన విషయం: ", practiceLink:"అభ్యాస విభాగాన్ని తెరవండి" }
  });
  const currentLabels = () => labels[document.documentElement.lang] || labels.en;
  const render = (container, lesson) => {
    if (!container || !lesson) return;
    container.replaceChildren();
    const t = currentLabels();
    if (lesson.title) container.append(make("h3", "lesson-template-title", lesson.title));
    const objectives = Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives.filter(item => typeof item === "string" && item.trim()) : [];
    if (objectives.length) {
      const section = make("section", "lesson-objectives");
      section.append(make("span", "lesson-stage-label", "LEARNING OBJECTIVES"));
      section.append(make("h4", "", OBJECTIVES_HEADINGS[document.documentElement.lang] || OBJECTIVES_HEADINGS.en));
      const list = make("ol", "lesson-objectives-list");
      objectives.forEach(item => list.append(make("li", "", item)));
      section.append(list);
      container.append(section);
    }
    const stage1 = make("section", "lesson-stage");
    stage1.append(make("span", "lesson-stage-label", "STAGE 1 · UNDERSTAND"));
    stage1.append(make("h4", "", t.understand));
    stage1.append(make("p", "", lesson.understand || lesson.intro || "This lesson introduces the concept and the problem it helps solve."));
    if (lesson.context) stage1.append(make("p", "", lesson.context));
    const stage2 = make("section", "lesson-stage");
    stage2.append(make("span", "lesson-stage-label", "STAGE 2 · EXPLANATION"));
    stage2.append(make("h4", "", t.explain));
    if (lesson.explanation) stage2.append(make("p", "", lesson.explanation));
    if (lesson.analogy) stage2.append(make("p", "", "A useful comparison: " + lesson.analogy));
    const examples = Array.isArray(lesson.examples) ? lesson.examples : [];
    if (examples.length) {
      stage2.append(make("h4", "lesson-subheading", t.examples));
      examples.forEach((example, index) => {
        const card = make("article", "lesson-example");
        card.append(make("h5", "", example.title || ("Example " + (index + 1))));
        if (example.code) {
          const pre = make("pre");
          pre.append(make("code", "", example.code));
          card.append(pre);
        }
        if (example.explanation) card.append(make("p", "", example.explanation));
        if (example.expectedOutput) card.append(make("p", "lesson-example-output", t.expected + example.expectedOutput));
        stage2.append(card);
      });
    } else if (lesson.code) {
      const code = make("pre");
      code.append(make("code", "", lesson.code));
      stage2.append(code);
    }
    const stage3 = make("section", "lesson-stage");
    stage3.append(make("span", "lesson-stage-label", "STAGE 3 · WRITE, RUN, OBSERVE & PRACTISE"));
    stage3.append(make("h4", "", t.practise));
    stage3.append(make("p", "", lesson.practice || lesson.task || "Change the example and observe what happens."));
    const link = make("a", "lesson-practice-link", t.practiceLink);
    link.href = "#practice";
    stage3.append(link);
    if (Array.isArray(lesson.hints) && lesson.hints.length) {
      stage3.append(make("h4", "lesson-subheading", t.hints));
      const list = make("ul", "lesson-hints");
      lesson.hints.forEach(hint => list.append(make("li", "", hint)));
      stage3.append(list);
    }
    container.append(stage1, stage2, stage3);
    const questions = Array.isArray(lesson.questions) ? lesson.questions : [];
    if (questions.length) {
      const assessment = make("section", "lesson-stage lesson-assessment");
      assessment.append(make("span", "lesson-stage-label", "ASSESSMENT"));
      assessment.append(make("h4", "", t.assessment));
      questions.forEach((question, questionIndex) => {
        const item = make("fieldset", "lesson-question");
        item.append(make("legend", "", (questionIndex + 1) + ". " + question.prompt));
        item.append(make("p", "lesson-question-instruction", t.choose));
        const feedback = make("div", "lesson-question-feedback");
        feedback.setAttribute("aria-live", "polite");
        (question.options || []).forEach(option => {
          const label = make("label", "lesson-answer-option");
          const input = make("input");
          input.type = "radio";
          input.name = "lesson-question-" + questionIndex;
          input.value = option;
          input.addEventListener("change", () => {
            const isCorrect = option === question.answer;
            feedback.className = "lesson-question-feedback " + (isCorrect ? "is-correct" : "is-incorrect");
            feedback.textContent = (isCorrect ? t.correct : t.incorrect) + " " + t.answer + question.answer + " " + t.explanation + (question.explanation || "");
          });
          label.append(input, document.createTextNode(" "), make("span", "", option));
          item.append(label);
        });
        item.append(feedback);
        assessment.append(item);
      });
      container.append(assessment);
    }
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
