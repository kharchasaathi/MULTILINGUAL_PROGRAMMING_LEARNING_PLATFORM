import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
const root = process.cwd();
const index = JSON.parse(await readFile(join(root,"public/content/curriculum-index.json"),"utf8"));
assert.ok(index.courses.includes("c"),"C course is registered");
const topics = index.topics.filter(x=>x.courseId==="c");
assert.equal(topics.length,6,"initial C lesson batch is registered");
for (const topic of topics) {
  assert.equal(topic.languages.en, `/content/en/c/${topic.topicId}.json`);
  const lesson=JSON.parse(await readFile(join(root,`public/content/en/c/${topic.topicId}.json`),"utf8"));
  assert.equal(lesson.courseId,"c");
  assert.equal(lesson.topicId,topic.topicId);
  assert.equal(lesson.language,"en");
  assert.equal(lesson.status,"draft");
  assert.equal(lesson.practice.playgroundMode,"none","native C must not be sent to the HTML/JS iframe");
  assert.equal(lesson.stages.explain.examples.length,2);
  assert.ok(lesson.assessment.questions.length>=5);
}
const html=await readFile(join(root,"public/index.html"),"utf8");
const loader=await readFile(join(root,"public/js/lessons/curriculum-loader.js"),"utf8");
assert.ok(html.includes('data-course-nav="c"'),"C course tab exists");
assert.ok(loader.includes('c: ["C Programming"'),"C course card metadata exists");
console.log(`C course validation passed: ${topics.length} authored English lessons; 104-topic roadmap is documented separately.`);
