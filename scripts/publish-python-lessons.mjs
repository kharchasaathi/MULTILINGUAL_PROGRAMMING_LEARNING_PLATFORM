import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";

const directory = "public/content/en/python";
const files = (await readdir(directory)).filter(name => name.startsWith("PY") && name.endsWith(".json")).sort();
assert.equal(files.length, 284, "Expected exactly 284 indexed English Python lesson files");

let changed = 0;
for (const name of files) {
  const path = join(directory, name);
  const lesson = JSON.parse(await readFile(path, "utf8"));
  assert.equal(lesson.courseId, "python", name + ": courseId");
  assert.ok(lesson.topicId && lesson.moduleId, name + ": stable IDs");
  assert.equal(lesson.practice?.playgroundMode, "none", name + ": keep playground disabled until integration is verified");
  assert.ok(["draft", "published"].includes(lesson.status), name + ": unexpected editorial status");
  if (lesson.status !== "published") {
    lesson.status = "published";
    await writeFile(path, JSON.stringify(lesson, null, 2) + "\\n");
    changed++;
  }
}

const validatorPath = "scripts/validate-python-course.mjs";
let validator = await readFile(validatorPath, "utf8");
const before = 'assert.equal(lesson.status, "draft", topic.topicId + ": status");';
const after = 'assert.equal(lesson.status, "published", topic.topicId + ": published status");';
if (validator.includes(before)) validator = validator.replace(before, after);
else assert.ok(validator.includes(after), "Python validator must explicitly require published lessons");
await writeFile(validatorPath, validator);

console.log("Published " + changed + " Python lessons; verified " + files.length + " files. Playground remains disabled.");
