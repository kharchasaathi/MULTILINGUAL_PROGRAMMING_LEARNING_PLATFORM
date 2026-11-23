import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const index = JSON.parse(await readFile(join(root, "public/content/curriculum-index.json"), "utf8"));
assert.ok(index.courses.includes("java"), "Java course is registered");
const topics = index.topics.filter((item) => item.courseId === "java");
assert.ok(topics.length > 0, "Java lessons are indexed");
assert.equal(new Set(topics.map((item) => item.topicId)).size, topics.length, "Java topic IDs are unique");

const normalize = (value) => value.replace(/\r\n/g, "\n").trimEnd();
let examplesExecuted = 0;
let questionsValidated = 0;

for (const topic of topics) {
  const relative = topic.languages?.en;
  assert.ok(relative?.startsWith("/content/en/java/"), `${topic.topicId}: English path is in Java directory`);
  const lesson = JSON.parse(await readFile(join(root, "public", relative.replace(/^\//, "")), "utf8"));
  assert.equal(lesson.courseId, "java", `${topic.topicId}: courseId`);
  assert.equal(lesson.moduleId, topic.moduleId, `${topic.topicId}: moduleId`);
  assert.equal(lesson.topicId, topic.topicId, `${topic.topicId}: topicId`);
  assert.equal(lesson.language, "en", `${topic.topicId}: English canonical lesson`);
  assert.equal(lesson.status, "draft", `${topic.topicId}: draft until editorial approval`);
  assert.equal(lesson.learningObjectives?.length, 5, `${topic.topicId}: five objectives`);
  assert.ok(lesson.learningObjectives.every((value) => typeof value === "string" && value.length > 20), `${topic.topicId}: objective quality`);
  assert.ok(lesson.stages?.understand?.concept?.length > 100, `${topic.topicId}: Understand concept`);
  assert.ok(lesson.stages?.understand?.whyItMatters?.length > 30, `${topic.topicId}: relevance`);
  assert.ok(lesson.stages?.explain?.narrative?.length > 100, `${topic.topicId}: Explain narrative`);
  assert.ok(lesson.stages?.practise?.guidedTask?.length > 30, `${topic.topicId}: guided task`);
  assert.ok(lesson.stages?.practise?.independentTask?.length > 30, `${topic.topicId}: independent task`);
  assert.equal(lesson.stages?.practise?.hints?.length, 3, `${topic.topicId}: three hints`);
  assert.ok(lesson.stages?.practise?.challenge?.length > 30, `${topic.topicId}: challenge`);
  assert.equal(lesson.practice?.playgroundMode, "none", `${topic.topicId}: Java does not use the web-language playground`);
  assert.ok(lesson.stages?.explain?.examples?.length >= 2, `${topic.topicId}: at least two examples`);
  for (const example of lesson.stages.explain.examples) {
    assert.equal(example.language, "java", `${topic.topicId}: Java example language`);
    assert.ok(example.code?.includes("public class Main"), `${topic.topicId}: standalone Main class`);
    assert.ok(example.code?.includes("public static void main"), `${topic.topicId}: executable entry point`);
    assert.equal(example.runnable, false, `${topic.topicId}: no false browser runnable flag`);
    assert.ok(example.explanation?.length > 30, `${topic.topicId}: example explanation`);
    const dir = await mkdtemp(join(tmpdir(), "codesaathi-java-"));
    try {
      await writeFile(join(dir, "Main.java"), example.code, "utf8");
      const compile = spawnSync("javac", ["-encoding", "UTF-8", "-d", dir, "Main.java"], { cwd: dir, encoding: "utf8", timeout: 10000, maxBuffer: 1024 * 1024 });
      assert.equal(compile.status, 0, `${topic.topicId}/${example.id}: javac failed\n${compile.stdout}\n${compile.stderr}`);
      const execute = spawnSync("java", ["-Xms16m", "-Xmx64m", "-XX:ActiveProcessorCount=1", "-cp", dir, "Main"], { cwd: dir, encoding: "utf8", timeout: 5000, maxBuffer: 1024 * 1024 });
      assert.equal(execute.status, 0, `${topic.topicId}/${example.id}: java failed\n${execute.stdout}\n${execute.stderr}`);
      assert.equal(normalize(execute.stdout), normalize(example.expectedOutput ?? ""), `${topic.topicId}/${example.id}: expected output mismatch`);
      examplesExecuted++;
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }
  const questions = lesson.assessment?.questions;
  assert.equal(questions?.length, 5, `${topic.topicId}: five MCQs`);
  const ids = new Set();
  for (const question of questions) {
    assert.ok(question.id && !ids.has(question.id), `${topic.topicId}: unique question ID`);
    ids.add(question.id);
    assert.ok(question.prompt?.length > 15, `${topic.topicId}: question prompt`);
    assert.equal(question.options?.length, 4, `${topic.topicId}: four answer options`);
    assert.ok(question.options.includes(question.answer), `${topic.topicId}: answer is one of the options`);
    assert.ok(question.explanation?.length > 20, `${topic.topicId}: answer explanation`);
    questionsValidated++;
  }
}
console.log(`Java Course Validation passed: ${topics.length} indexed English lessons, ${examplesExecuted} JDK-compiled and executed examples, ${questionsValidated} MCQs.`);
