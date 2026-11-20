import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const index = await readJson("public/content/curriculum-index.json");
assert.ok(index.courses?.includes("python"), "Python course must be registered");
const topics = index.topics.filter((topic) => topic.courseId === "python");
assert.ok(topics.length > 0, "Python topics must be indexed");

const ids = new Set();
const questionIds = new Set();
let examplesChecked = 0;
const pythonCommand = process.env.PYTHON || "python";

for (const topic of topics) {
  assert.ok(topic.topicId && topic.moduleId, "Every topic needs stable IDs");
  assert.ok(!ids.has(topic.topicId), "Duplicate Python topic: " + topic.topicId);
  ids.add(topic.topicId);
  const relative = topic.languages?.en;
  assert.ok(typeof relative === "string" && relative.startsWith("/content/en/python/"), topic.topicId + ": English path");
  const filePath = resolve(root, "public", relative.slice(1));
  assert.ok(filePath.startsWith(resolve(root, "public") + "/"), topic.topicId + ": path must remain under public");
  const lesson = await readJson(filePath);
  assert.equal(lesson.courseId, "python", topic.topicId + ": courseId");
  assert.equal(lesson.moduleId, topic.moduleId, topic.topicId + ": moduleId");
  assert.equal(lesson.topicId, topic.topicId, topic.topicId + ": topicId");
  assert.equal(lesson.language, "en", topic.topicId + ": language");
  assert.equal(lesson.status, "published", topic.topicId + ": published status");
  assert.ok(Array.isArray(lesson.learningObjectives) && lesson.learningObjectives.length >= 5, topic.topicId + ": objectives");
  assert.ok(lesson.stages?.understand?.concept?.length > 50, topic.topicId + ": understand");
  assert.ok(lesson.stages?.explain?.narrative?.length > 100, topic.topicId + ": explanation");
  assert.ok(lesson.stages?.practise?.guidedTask?.length > 20, topic.topicId + ": guided practice");
  assert.ok(lesson.stages?.practise?.independentTask?.length > 20, topic.topicId + ": independent practice");
  assert.ok(Array.isArray(lesson.stages.practise.hints) && lesson.stages.practise.hints.length >= 3, topic.topicId + ": hints");
  assert.equal(lesson.practice?.playgroundMode, "none", topic.topicId + ": playground remains disabled until runtime integration is verified");

  const examples = lesson.stages.explain.examples;
  assert.ok(Array.isArray(examples) && examples.length >= 5, topic.topicId + ": examples");
  for (const example of examples) {
    assert.ok(example.id && example.code?.trim().length > 0, topic.topicId + ": example code");
    assert.ok(typeof example.expectedOutput === "string" && typeof example.explanation === "string", topic.topicId + ": example output/explanation");
    const wrapper = [
      "import contextlib, io",
      "source = " + JSON.stringify(example.code),
      "buffer = io.StringIO()",
      "with contextlib.redirect_stdout(buffer):",
      "    exec(compile(source, " + JSON.stringify(topic.topicId + ":" + example.id) + ", " + JSON.stringify("exec") + "), {'__name__': '__main__'})",
      "actual = buffer.getvalue().rstrip('\\n')",
      "expected = " + JSON.stringify(example.expectedOutput),
      "if actual != expected:",
      "    print('EXPECTED=' + repr(expected))",
      "    print('ACTUAL=' + repr(actual))",
      "    raise SystemExit(2)"
    ].join("\n");
    const run = spawnSync(pythonCommand, ["-c", wrapper], { encoding: "utf8", timeout: 10000 });
    assert.equal(run.status, 0, topic.topicId + "/" + example.id + ": Python execution failed: " + (run.stderr || run.stdout));
    examplesChecked += 1;
  }

  const questions = lesson.assessment?.questions;
  assert.ok(Array.isArray(questions) && questions.length >= 5, topic.topicId + ": assessment");
  for (const question of questions) {
    assert.ok(question.id && !questionIds.has(question.id), topic.topicId + ": duplicate MCQ ID " + question.id);
    questionIds.add(question.id);
    assert.ok(Array.isArray(question.options) && question.options.length >= 4, topic.topicId + ": options");
    assert.ok(question.options.includes(question.answer), topic.topicId + ": answer must match an option");
    assert.ok(question.explanation?.length > 15, topic.topicId + ": MCQ explanation");
  }
}

console.log("Python course validation passed: " + topics.length + " topics, " + examplesChecked + " executed examples, " + questionIds.size + " MCQs.");
