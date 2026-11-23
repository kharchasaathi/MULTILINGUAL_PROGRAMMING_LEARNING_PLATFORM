import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const index = JSON.parse(await readFile(resolve(root, "public/content/curriculum-index.json"), "utf8"));
const lessonTopics = index.topics.filter(topic => topic.courseId === "sql" && topic.languages?.en);
const practice = JSON.parse(await readFile(resolve(root, "public/content/en/sql/sql-practice-bank.json"), "utf8"));
const challengeBank = JSON.parse(await readFile(resolve(root, "public/content/en/sql/sql-code-challenges.json"), "utf8"));
assert.equal(practice.courseId, "sql");
assert.equal(practice.language, "en");
assert.ok(Array.isArray(practice.exercises) && practice.exercises.length >= 60, "At least 60 fill-in-the-blank exercises are required");
const exerciseIds = new Set();
for (const item of practice.exercises) {
  assert.ok(item.id && !exerciseIds.has(item.id), "Exercise IDs must be unique");
  exerciseIds.add(item.id);
  assert.ok(item.prompt?.includes("____"), item.id + ": prompt must contain a blank");
  assert.ok(Array.isArray(item.options) && item.options.length >= 3, item.id + ": options are required");
  assert.equal(new Set(item.options).size, item.options.length, item.id + ": options must be unique");
  assert.ok(item.options.includes(item.answer), item.id + ": answer must be one of the options");
  assert.ok(item.hint?.length > 8 && item.explanation?.length > 12, item.id + ": hint and explanation are required");
}
assert.ok(lessonTopics.length >= 150, "SQL English lesson inventory is unexpectedly small");
assert.ok(challengeBank.challenges.length >= 30, "SQL learner challenges are required");
const topicIds = new Set(lessonTopics.map(topic => topic.topicId));
for (const challenge of challengeBank.challenges) {
  assert.ok(topicIds.has(challenge.topicId), challenge.id + ": challenge must map to a SQL lesson");
  assert.ok(Array.isArray(challenge.expectedRows), challenge.id + ": expected rows must be present");
  assert.ok(challenge.solutionSql?.trim(), challenge.id + ": reference solution is required");
}
let quizQuestions = 0;
for (const topic of lessonTopics) {
  const lesson = JSON.parse(await readFile(resolve(root, "public", topic.languages.en.slice(1)), "utf8"));
  for (const question of lesson.assessment?.questions || []) {
    const answer = Number.isInteger(question.answer) ? question.options?.[question.answer] : question.answer;
    assert.ok(question.prompt && Array.isArray(question.options) && question.options.includes(answer), topic.topicId + ": malformed cumulative quiz question");
    quizQuestions += 1;
  }
}
assert.ok(quizQuestions >= 100, "The cumulative quiz requires a broad lesson question bank");
const page = await readFile(resolve(root, "public/sql-practice.html"), "utf8");
const script = await readFile(resolve(root, "public/js/sql-practice.js"), "utf8");
assert.ok(page.includes("/js/sql-practice.js"), "Practice page must load its client script");
assert.ok(script.includes("challenge-check") && script.includes("codesaathi-sql-last-quiz"), "Practice interactions and local quiz history must be wired");
assert.ok(script.includes("codesaathi-sql-final-assessment") && script.includes("slice(0,60)") && script.includes("3600"), "The 60-question, 60-minute final assessment must be wired");
assert.ok(page.includes("id=\"examPanel\""), "The final assessment panel must be present");
console.log(JSON.stringify({ lessonTopics: lessonTopics.length, fillBlankExercises: practice.exercises.length, cumulativeQuizQuestions: quizQuestions, codeChallenges: challengeBank.challenges.length }, null, 2));
