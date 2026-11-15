import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const locales = ["as","bn","brx","doi","gu","hi","kn","kok","ks","mai","ml","mni","mr","ne","or","pa","sa","sat","sd","ta","te","ur","en"];
const readJson = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));

const index = await readJson("public/content/curriculum-index.json");
const topic = index.topics.find((item) => item.topicId === "F1.7");
assert.ok(topic, "F1.7 must be registered in the curriculum index");

for (const locale of locales) {
  const path = `public/content/${locale}/foundation/F1.7.json`;
  const lesson = await readJson(path);
  assert.equal(lesson.topicId, "F1.7", `${locale}: topicId`);
  assert.equal(lesson.language, locale, `${locale}: language tag`);
  assert.equal(lesson.status, "draft", `${locale}: lesson must remain draft`);
  assert.equal(lesson.learningObjectives?.length, 14, `${locale}: learning objectives`);
  assert.deepEqual(Object.keys(lesson.stages), ["understand", "explain", "practise"], `${locale}: stage contract`);
  assert.equal(topic.languages?.[locale], `/content/${locale}/foundation/F1.7.json`, `${locale}: index path`);

  const examples = lesson.stages.explain.examples;
  const expectedExampleIds = locale === "en"
    ? ["f1.7-concept", "f1.7-hypothesis", "f1.7-data-boundaries", "f1.7-regression", "f1.7-observability"]
    : ["f1.7-concept", "f1.7-hypothesis"];
  assert.equal(examples?.length, expectedExampleIds.length, `${locale}: worked examples`);
  assert.deepEqual(examples.map((item) => item.id), expectedExampleIds, `${locale}: example IDs`);
  for (const example of examples) {
    assert.equal(example.language, locale, `${locale}: example language`);
    assert.equal(example.runnable, false, `${locale}: examples are diagnostic scenarios, not executable programs`);
    assert.ok(example.code.includes("\n"), `${locale}: example lines must be real line breaks`);
    assert.ok(!example.code.includes("\\n"), `${locale}: example must not contain escaped literal line-break text`);
    assert.ok(example.explanation?.length > 30, `${locale}: example explanation`);
    assert.ok(example.expectedOutput?.length > 20, `${locale}: example expected output`);
  }
  assert.ok(examples[0].code.startsWith("FEATURE:"), `${locale}: decomposition example`);
  assert.ok(examples[1].code.startsWith("EXPECTED:"), `${locale}: hypothesis example`);

  const practice = lesson.stages.practise;
  assert.ok(practice.guidedTask?.length > 30, `${locale}: guided task`);
  assert.ok(practice.independentTask?.length > 30, `${locale}: independent task`);
  assert.equal(practice.hints?.length, 5, `${locale}: hints`);
  assert.equal(lesson.practice?.playgroundMode, "none", `${locale}: no runnable starter code expected`);

  const questions = lesson.assessment?.questions;
  assert.equal(questions?.length, locale === "en" ? 7 : 5, `${locale}: assessment count`);
  for (const question of questions) {
    assert.equal(question.options?.length, 3, `${locale}: assessment options`);
    assert.ok(question.options.includes(question.answer), `${locale}: answer must match an option`);
    assert.ok(question.explanation?.length > 20, `${locale}: answer explanation`);
  }
}

const loader = await readFile(join(root, "public/js/lessons/curriculum-loader.js"), "utf8");
const renderer = await readFile(join(root, "public/js/lessons/lesson-template.js"), "utf8");
const serviceWorker = await readFile(join(root, "public/sw.js"), "utf8");
assert.ok(loader.includes("examples,"), "curriculum loader must pass every worked example");
assert.ok(loader.includes("hints: practice.hints || []"), "curriculum loader must pass practice hints");
assert.ok(loader.includes("questions,"), "curriculum loader must pass the complete assessment");
assert.ok(!loader.includes("questions.slice(1)"), "legacy duplicate static assessment must be removed");
assert.ok(renderer.includes("lesson-example"), "renderer must render worked examples");
assert.ok(renderer.includes("lesson-answer-option"), "renderer must render selectable assessment options");
assert.ok(renderer.includes("lesson-question-feedback"), "renderer must show assessment feedback");
assert.ok(serviceWorker.includes('const CACHE_NAME = "codesaathi-v6";'), "service worker cache must be bumped for the updated lesson UI");
const app = await readFile(join(root, "public/app.js"), "utf8");
const html = await readFile(join(root, "public/index.html"), "utf8");
assert.ok(html.includes('sandbox="allow-scripts"'), "playground iframe must remain sandboxed without same-origin access");
assert.ok(html.includes('role="status" aria-live="polite"'), "preview status must be announced accessibly");
assert.ok(loader.includes("editor.dataset.playgroundMode = mode"), "lesson loader must pass the selected playground mode");
assert.ok(app.includes('mode === "css"'), "playground must support CSS mode");
assert.ok(app.includes('mode === "javascript"'), "playground must support JavaScript mode");
assert.ok(app.includes('mode === "combined"'), "playground must support combined mode");
assert.ok(html.includes('sandbox="allow-scripts"'), "playground iframe must remain sandboxed");
assert.ok(app.includes("frame.srcdoc = html"), "playground must render through the sandboxed iframe srcdoc");

console.log(`F1.7 validation passed: ${locales.length} locales; regional lessons retain 2 examples/5 questions, while English has 5 examples/7 questions.`);
