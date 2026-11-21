import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const index = JSON.parse(await readFile(resolve(root, "public/content/curriculum-index.json"), "utf8"));
assert.ok(index.courses?.includes("sql"), "SQL course must be registered");
const topics = index.topics.filter((item) => item.courseId === "sql");
assert.equal(topics.length, 5, "Expected the first five SQL foundation topics");
const topicIds = new Set();
const questionIds = new Set();
let examplesChecked = 0;
const pyRunner = [
  "import json, sqlite3, sys",
  "examples = json.loads(sys.argv[1])",
  "db = sqlite3.connect(':memory:')",
  "db.execute('PRAGMA foreign_keys = ON')",
  "for item in examples:",
  "    try:",
  "        db.executescript(item['code'])",
  "        if item['expectsError']:",
  "            raise AssertionError('Expected SQL error but statement succeeded: ' + item['id'])",
  "    except sqlite3.Error as exc:",
  "        if not item['expectsError']:",
  "            raise AssertionError(item['id'] + ': ' + str(exc)) from exc",
  "db.close()"
].join("\n");

for (const topic of topics) {
  assert.ok(topic.topicId && topic.moduleId, "Topic IDs are required");
  assert.ok(!topicIds.has(topic.topicId), "Duplicate SQL topic " + topic.topicId);
  topicIds.add(topic.topicId);
  const relative = topic.languages?.en;
  assert.ok(relative?.startsWith("/content/en/sql/"), topic.topicId + ": English lesson path");
  const lesson = JSON.parse(await readFile(resolve(root, "public", relative.slice(1)), "utf8"));
  assert.equal(lesson.courseId, "sql");
  assert.equal(lesson.moduleId, topic.moduleId);
  assert.equal(lesson.topicId, topic.topicId);
  assert.equal(lesson.language, "en");
  assert.equal(lesson.status, "draft");
  assert.ok(lesson.learningObjectives?.length >= 5);
  assert.ok(lesson.stages?.understand?.concept?.length > 50);
  assert.ok(lesson.stages?.understand?.whyItMatters?.length > 30);
  assert.ok(lesson.stages?.explain?.narrative?.length > 100);
  assert.ok(lesson.stages?.practise?.guidedTask?.length > 20);
  assert.ok(lesson.stages?.practise?.independentTask?.length > 20);
  assert.ok(lesson.stages?.practise?.hints?.length >= 3);
  assert.equal(lesson.practice?.playgroundMode, "none", "Playground remains disabled until runtime integration is verified");
  const examples = lesson.stages.explain.examples;
  assert.ok(examples?.length >= 5);
  for (const example of examples) {
    assert.ok(example.id && example.code?.trim());
    assert.ok(typeof example.expectedOutput === "string" && example.explanation?.length > 15);
    examplesChecked += 1;
  }
  const questions = lesson.assessment?.questions;
  assert.ok(questions?.length >= 5);
  for (const question of questions) {
    assert.ok(question.id && !questionIds.has(question.id), "Duplicate MCQ ID " + question.id);
    questionIds.add(question.id);
    assert.ok(question.options?.length >= 4);
    assert.ok(question.options.includes(question.answer));
    assert.ok(question.explanation?.length > 15);
  }
  const payload = examples.map((example) => ({
    id: example.id,
    code: example.code,
    expectsError: /^Error:/i.test(example.expectedOutput.trim())
  }));
  const run = spawnSync("python3", ["-c", pyRunner, JSON.stringify(payload)], { encoding: "utf8", timeout: 15000 });
  assert.equal(run.status, 0, topic.topicId + ": SQLite execution check failed: " + (run.stderr || run.stdout));
}
console.log("SQL foundation validation passed: " + topics.length + " lessons, " + examplesChecked + " SQLite-executed examples, " + questionIds.size + " MCQs.");
