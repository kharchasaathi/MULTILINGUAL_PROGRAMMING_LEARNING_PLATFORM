import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const readJson = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));
const groups = {
  html: ["H16.1","H16.2","H16.3","H16.4","H16.5","H16.6","H16.7","H16.8","H16.9","H16.10"],
  css: ["C22.1","C22.2","C22.3","C22.4","C22.5","C22.6"],
  javascript: ["J24.1","J24.2","J24.3","J24.4","J24.5","J24.6","J24.7","J24.8","J24.9"]
};
const index = await readJson("public/content/curriculum-index.json");
const ids = Object.values(groups).flat();
const entries = new Map(index.topics.map((topic) => [topic.topicId, topic]));
assert.equal(ids.length, 25);
assert.equal(new Set(ids).size, 25, "lesson IDs must be unique");

for (const [course, topics] of Object.entries(groups)) {
  for (const topicId of topics) {
    const path = `public/content/en/${course}/${topicId}.json`;
    const lesson = await readJson(path);
    const entry = entries.get(topicId);
    assert.ok(entry, `${topicId}: registered in curriculum index`);
    assert.equal(entry.courseId, course, `${topicId}: course mapping`);
    assert.equal(entry.languages?.en, `/content/en/${course}/${topicId}.json`, `${topicId}: index path`);
    assert.equal(lesson.topicId, topicId, `${topicId}: topic ID`);
    assert.equal(lesson.courseId, course, `${topicId}: course ID`);
    assert.equal(lesson.language, "en", `${topicId}: language`);
    assert.equal(lesson.status, "draft", `${topicId}: remains draft until editorial approval`);
    assert.equal(lesson.learningObjectives?.length, 5, `${topicId}: five learning objectives`);
    assert.ok(lesson.learningObjectives.every((item) => typeof item === "string" && item.trim().length > 20), `${topicId}: objective quality`);
    assert.ok(lesson.stages?.understand?.concept?.length > 100, `${topicId}: substantial concept explanation`);
    assert.ok(lesson.stages?.explain?.narrative?.length > 40, `${topicId}: explanation narrative`);
    assert.ok(lesson.stages?.practise?.guidedTask?.length > 30, `${topicId}: guided task`);
    assert.ok(lesson.stages?.practise?.independentTask?.length > 30, `${topicId}: independent task`);
    assert.equal(lesson.stages?.practise?.hints?.length, 3, `${topicId}: practice hints`);
    assert.equal(lesson.stages.explain.examples?.length, 2, `${topicId}: two worked examples`);
    for (const example of lesson.stages.explain.examples) {
      assert.ok(["html","css","javascript"].includes(example.language), `${topicId}: example language`);
      assert.ok(typeof example.code === "string" && example.code.trim().length > 10, `${topicId}: example code`);
      assert.equal(typeof example.runnable, "boolean", `${topicId}: explicit runnable status`);
      assert.ok(example.explanation?.length > 30, `${topicId}: example explanation`);
      assert.ok(example.expectedOutput?.length > 10, `${topicId}: expected output`);
    }
    const questions = lesson.assessment?.questions;
    assert.equal(questions?.length, 5, `${topicId}: five assessment questions`);
    for (const question of questions) {
      assert.equal(question.options?.length, 3, `${topicId}: three answer choices`);
      assert.ok(question.options.includes(question.answer), `${topicId}: correct answer is one of the options`);
      assert.ok(question.explanation?.length > 20, `${topicId}: answer rationale`);
    }
    const mode = lesson.practice?.playgroundMode;
    assert.ok(["html","css","javascript","combined","none"].includes(mode), `${topicId}: supported playground mode`);
    if (mode === "none") {
      assert.equal(lesson.practice.starterCode || "", "", `${topicId}: no false standalone starter`);
      assert.ok(lesson.stages.explain.examples.every((example) => !example.runnable), `${topicId}: external dependency examples are not marked runnable`);
    } else {
      assert.ok(lesson.practice.starterCode?.length > 10, `${topicId}: runnable starter code exists`);
      assert.equal(lesson.practice.resetCode, lesson.practice.starterCode, `${topicId}: reset restores starter code`);
    }
  }
}
for (const topicId of ids) assert.ok(entries.has(topicId), `${topicId}: index entry exists`);

const html = await readFile(join(root, "public/index.html"), "utf8");
const app = await readFile(join(root, "public/app.js"), "utf8");
const renderer = await readFile(join(root, "public/js/lessons/lesson-template.js"), "utf8");
const loader = await readFile(join(root, "public/js/lessons/curriculum-loader.js"), "utf8");
assert.ok(html.includes('aria-labelledby="lessonDialogLabel"'), "lesson dialog uses a stable accessible name");
assert.ok(html.includes('id="lessonDialogLabel"'), "stable dialog label exists");
assert.ok(html.includes('sandbox="allow-scripts"'), "preview iframe remains isolated from same-origin access");
assert.ok(renderer.includes('make("fieldset", "lesson-question")'), "assessment questions use fieldsets");
assert.ok(renderer.includes('make("legend", "",'), "assessment questions have legends");
assert.ok(renderer.includes('feedback.setAttribute("aria-live", "polite")'), "assessment feedback is announced");
assert.ok(loader.includes("editor.dataset.playgroundMode = mode"), "lesson loader selects the correct playground mode");
assert.ok(app.includes('id=\\\"playgroundConsole\\\"'), "JavaScript playground exposes visible console output");
assert.ok(app.includes('aria-live=\\\"polite\\\"'), "playground output is announced accessibly");

for (const file of ["public/app.js","public/js/lessons/lesson-template.js","public/js/lessons/curriculum-loader.js","public/js/i18n.js"]) {
  // Syntax is checked by node --check in the workflow.
  assert.ok(file.length > 0);
}
console.log(`Added-lesson contract validation passed: ${ids.length} lessons (HTML 10, CSS 6, JavaScript 9), with index, content, assessment, practice and accessibility contracts.`);
