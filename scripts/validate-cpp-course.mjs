import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const index = await readJson("public/content/curriculum-index.json");
assert.ok(Array.isArray(index.courses) && index.courses.includes("cpp"), "C++ course is registered");
assert.ok(Array.isArray(index.topics), "curriculum topics are available");

const topics = index.topics.filter((topic) => topic.courseId === "cpp");
assert.equal(topics.length, 150, "expected 150 indexed C++ topics");
const topicIds = new Set();
const moduleIds = new Set();

for (const topic of topics) {
  assert.ok(topic.topicId, "every C++ topic has topicId");
  assert.ok(!topicIds.has(topic.topicId), "duplicate C++ topic ID: " + topic.topicId);
  topicIds.add(topic.topicId);
  assert.ok(topic.moduleId, topic.topicId + ": moduleId");
  moduleIds.add(topic.moduleId);

  const englishPath = topic.languages?.en;
  assert.ok(typeof englishPath === "string" && englishPath.startsWith("/content/en/cpp/"), topic.topicId + ": English lesson path");
  const absolutePath = resolve(root, "public", englishPath.slice(1));
  assert.ok(absolutePath.startsWith(resolve(root, "public") + "/"), topic.topicId + ": path stays in public directory");
  const lesson = await readJson(absolutePath);
  assert.equal(lesson.courseId, "cpp", topic.topicId + ": course ID");
  assert.equal(lesson.topicId, topic.topicId, topic.topicId + ": topic ID");
  assert.equal(lesson.language, "en", topic.topicId + ": language");
  assert.ok(lesson.stages?.understand?.concept?.length > 80, topic.topicId + ": concept content");
  assert.ok(lesson.practise?.guidedTask?.length > 25, topic.topicId + ": guided practice");
  assert.ok(lesson.practise?.independentTask?.length > 25, topic.topicId + ": independent practice");
  assert.ok(Array.isArray(lesson.practise?.hints) && lesson.practise.hints.length >= 3, topic.topicId + ": hints");
  assert.ok(Array.isArray(lesson.examples) && lesson.examples.length >= 2, topic.topicId + ": examples");
  for (const example of lesson.examples) {
    assert.ok(typeof example.code === "string" && example.code.length > 10, topic.topicId + ": example code");
    assert.ok(typeof example.explanation === "string" && example.explanation.trim().length > 5, topic.topicId + ": example explanation");
    assert.equal(typeof example.runnable, "boolean", topic.topicId + ": runnable flag must be explicit");
  }
  const questions = lesson.assessment?.questions;
  assert.ok(Array.isArray(questions) && questions.length >= 3, topic.topicId + ": quiz questions");
  const questionIds = new Set();
  for (const question of questions) {
    assert.ok(question.id, topic.topicId + ": question ID");
    assert.ok(!questionIds.has(question.id), topic.topicId + ": duplicate question ID");
    questionIds.add(question.id);
    assert.ok(Array.isArray(question.options) && question.options.length >= 3, topic.topicId + ": quiz options");
    assert.ok(question.options.includes(question.answer), topic.topicId + ": answer must be an option");
    assert.ok(question.explanation.trim().length > 5, topic.topicId + ": quiz explanation");
  }
  assert.equal(lesson.practice?.playgroundMode, "none", topic.topicId + ": C++ should not use HTML playground");
}

const loader = await readFile(resolve(root, "public/js/lessons/curriculum-loader.js"), "utf8");
assert.ok(loader.includes('cpp: ["C++ Programming"'), "C++ course metadata is registered in the loader");
assert.ok(loader.includes("lesson.examples") && loader.includes("lesson.practise"), "loader supports C++ lesson fields");
console.log("C++ curriculum validation passed: " + topics.length + " lessons across " + moduleIds.size + " modules.");
