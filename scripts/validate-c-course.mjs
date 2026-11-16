import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = process.cwd();
const readJson = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));
const index = await readJson("public/content/curriculum-index.json");

assert.ok(Array.isArray(index.courses) && index.courses.includes("c"), "C course is registered");
assert.ok(Array.isArray(index.topics), "curriculum topics are available");

const topics = index.topics.filter((topic) => topic.courseId === "c");
assert.ok(topics.length > 0, "C course has registered topics");

const topicIds = new Set();
const moduleIds = new Set();
for (const topic of topics) {
  assert.ok(topic.topicId, "every C topic has a topicId");
  assert.ok(!topicIds.has(topic.topicId), "duplicate C topic ID: " + topic.topicId);
  topicIds.add(topic.topicId);
  assert.ok(topic.moduleId, topic.topicId + ": moduleId is present");
  moduleIds.add(topic.moduleId);

  const englishPath = topic.languages?.en;
  assert.ok(typeof englishPath === "string" && englishPath.startsWith("/content/"), topic.topicId + ": English lesson path is registered");
  const relativePath = englishPath.replace(/^\/+/, "");
  const absolutePath = resolve(root, "public", relativePath);
  assert.ok(absolutePath.startsWith(resolve(root, "public") + "/"), topic.topicId + ": lesson path must remain inside public/");

  const lesson = await readJson(absolutePath);
  assert.equal(lesson.courseId, "c", topic.topicId + ": courseId");
  assert.equal(lesson.topicId, topic.topicId, topic.topicId + ": topicId");
  assert.equal(lesson.language, "en", topic.topicId + ": language");
  assert.equal(lesson.status, "draft", topic.topicId + ": editorial status");
  assert.equal(lesson.practice?.playgroundMode, "none", topic.topicId + ": native C must not be sent to the HTML/JS iframe");
  assert.ok(lesson.stages?.understand, topic.topicId + ": understand stage exists");
  assert.ok(Array.isArray(lesson.stages?.explain?.examples) && lesson.stages.explain.examples.length >= 1, topic.topicId + ": at least one worked example");
  assert.ok(Array.isArray(lesson.assessment?.questions) && lesson.assessment.questions.length >= 3, topic.topicId + ": at least three assessment questions");
  for (const question of lesson.assessment.questions) {
    assert.ok(Array.isArray(question.options) && question.options.includes(question.answer), topic.topicId + ": assessment answer matches an option");
  }
}

const html = await readFile(join(root, "public/index.html"), "utf8");
const loader = await readFile(join(root, "public/js/lessons/curriculum-loader.js"), "utf8");
assert.ok(html.includes('data-course-nav="c"'), "C course tab exists");
assert.ok(loader.includes('c: ["C Programming"'), "C course card metadata exists");

console.log("C course validation passed: " + topics.length + " indexed English lessons across " + moduleIds.size + " modules; no fixed topic-count assumption.");
