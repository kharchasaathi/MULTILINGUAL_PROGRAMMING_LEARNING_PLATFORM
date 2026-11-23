import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const index = JSON.parse(await readFile(resolve(root, "public/content/curriculum-index.json"), "utf8"));
const sqlIds = new Set(index.topics.filter(topic => topic.courseId === "sql").map(topic => topic.topicId));
const text = await readFile(resolve(root, "docs/SQL_W3SCHOOLS_LEARNING_OUTCOME_MATRIX.csv"), "utf8");
const lines = text.trim().split(/\r?\n/);
assert.equal(lines[0], "outcome_id,official_learning_outcome,codesaathi_lesson_ids,lesson_count,mapping_status,review_note");
const rows = lines.slice(1).map(line => line.split(","));
assert.equal(rows.length, 10, "The W3Schools syllabus outcome matrix must contain 10 outcomes");
const seen = new Set();
for (const [outcomeId, outcome, lessonList, count, status] of rows) {
  assert.ok(outcomeId && !seen.has(outcomeId), "Outcome IDs must be present and unique");
  seen.add(outcomeId);
  assert.ok(outcome && lessonList, outcomeId + ": outcome and lesson mapping are required");
  const lessons = lessonList.split(";");
  assert.equal(Number(count), lessons.length, outcomeId + ": lesson_count must match mapped IDs");
  assert.ok(status === "MAPPED", outcomeId + ": mapping status must be MAPPED");
  for (const topicId of lessons) assert.ok(sqlIds.has(topicId), outcomeId + ": unknown SQL lesson topic " + topicId);
}
console.log(JSON.stringify({outcomes:rows.length, mappedLessonReferences:rows.reduce((sum,row)=>sum+row[2].split(";").length,0), sqlLessonInventory:sqlIds.size}, null, 2));
