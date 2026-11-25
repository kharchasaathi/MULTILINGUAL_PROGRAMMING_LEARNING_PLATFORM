import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const contentDir = resolve(root, "public/content/en/csharp");
const files = (await readdir(contentDir)).filter((name) => /^CSH\d+\.\d+\.json$/.test(name)).sort();
assert.ok(files.length > 0, "No C# lesson files found");
const topicIds = new Set();
const questionIds = new Set();
const exampleIds = new Set();
let examplesExecuted = 0;
let mcqsValidated = 0;

function runDotnet(args, cwd, timeout = 45000) {
  const result = spawnSync("dotnet", args, { cwd, encoding: "utf8", timeout, env: { ...process.env, DOTNET_NOLOGO: "1", DOTNET_CLI_TELEMETRY_OPTOUT: "1" } });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `dotnet ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

const sdkInfo = runDotnet(["--version"], root).trim();
assert.ok(/^10\./.test(sdkInfo), `Expected .NET 10 SDK baseline, found ${sdkInfo}`);
console.log(`C# validator using .NET SDK ${sdkInfo}`);

for (const file of files) {
  const lesson = JSON.parse(await readFile(join(contentDir, file), "utf8"));
  assert.equal(lesson.courseId, "csharp", `${file}: wrong courseId`);
  assert.equal(lesson.language, "en", `${file}: expected English lesson`);
  assert.equal(lesson.topicId, file.replace(".json", ""), `${file}: topicId mismatch`);
  assert.equal(lesson.id, `csharp.${lesson.topicId.toLowerCase()}.en`, `${file}: lesson id mismatch`);
  assert.equal(lesson.status, "draft", `${file}: lesson status must remain draft`);
  assert.equal(lesson.practice?.playgroundMode, "none", `${file}: C# must not use the web-language playground`);
  assert.ok(Array.isArray(lesson.learningObjectives) && lesson.learningObjectives.length >= 5, `${file}: needs at least five objectives`);
  for (const stage of ["understand", "explain", "practise"]) assert.ok(lesson.stages?.[stage], `${file}: missing ${stage} stage`);
  assert.ok(lesson.stages.understand.concept && lesson.stages.understand.whyItMatters, `${file}: incomplete Understand stage`);
  assert.ok(lesson.stages.explain.narrative, `${file}: missing explanation narrative`);
  const examples = lesson.stages.explain.examples;
  assert.ok(Array.isArray(examples) && examples.length >= 5, `${file}: needs at least five examples`);
  const questions = lesson.assessment?.questions;
  assert.ok(Array.isArray(questions) && questions.length >= 5, `${file}: needs at least five MCQs`);
  assert.ok(lesson.stages.practise.guidedTask && lesson.stages.practise.independentTask && lesson.stages.practise.hints?.length >= 3, `${file}: incomplete practice`);
  assert.ok(!topicIds.has(lesson.topicId), `Duplicate topic ID: ${lesson.topicId}`);
  topicIds.add(lesson.topicId);

  for (const example of examples) {
    assert.ok(example.id && !exampleIds.has(example.id), `Missing/duplicate example ID: ${example.id}`);
    exampleIds.add(example.id);
    assert.equal(example.language, "csharp", `${file}/${example.id}: expected csharp language`);
    assert.ok(example.code && example.expectedOutput !== undefined && example.explanation?.length > 30, `${file}/${example.id}: incomplete example`);
    assert.equal(example.runnable, true, `${file}/${example.id}: expected runnable example`);
    const dir = await mkdtemp(join(tmpdir(), "codesaathi-csharp-"));
    try {
      await writeFile(join(dir, "Example.csproj"), `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><LangVersion>14.0</LangVersion><ImplicitUsings>disable</ImplicitUsings><Nullable>enable</Nullable><TreatWarningsAsErrors>false</TreatWarningsAsErrors></PropertyGroup></Project>`);
      await writeFile(join(dir, "Program.cs"), example.code);
      const actual = runDotnet(["run", "--project", join(dir, "Example.csproj"), "--configuration", "Release"], dir).replace(/\r\n/g, "\n").trimEnd();
      const expected = String(example.expectedOutput).replace(/\r\n/g, "\n").trimEnd();
      assert.equal(actual, expected, `${file}/${example.id}: expected output mismatch`);
      examplesExecuted++;
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }

  for (const question of questions) {
    assert.ok(question.id && !questionIds.has(question.id), `Missing/duplicate MCQ ID: ${question.id}`);
    questionIds.add(question.id);
    assert.ok(question.prompt && Array.isArray(question.options) && question.options.length >= 4, `${file}/${question.id}: malformed question`);
    assert.ok(question.options.includes(question.answer), `${file}/${question.id}: answer is not one of the options`);
    assert.ok(question.explanation?.length > 20, `${file}/${question.id}: missing explanation`);
    mcqsValidated++;
  }
  console.log(`PASS ${lesson.topicId}: ${examples.length} examples, ${questions.length} MCQs`);
}

const index = JSON.parse(await readFile(resolve(root, "public/content/curriculum-index.json"), "utf8"));
assert.ok(index.courses.includes("csharp"), "C# course is not registered");
const indexed = index.topics.filter((item) => item.courseId === "csharp");
assert.equal(indexed.length, files.length, "C# curriculum index count does not match lesson files");
for (const item of indexed) {
  assert.ok(files.includes(`${item.topicId}.json`), `Missing indexed lesson file: ${item.topicId}`);
}
console.log(`C# validation PASS: ${files.length} lessons, ${examplesExecuted} examples executed, ${mcqsValidated} MCQs checked.`);
