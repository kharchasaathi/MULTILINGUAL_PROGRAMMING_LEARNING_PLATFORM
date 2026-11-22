import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const index = JSON.parse(await readFile(resolve(root, "public/content/curriculum-index.json"), "utf8"));
assert.ok(index.courses?.includes("sql"), "SQL course must be registered");
const topics = index.topics.filter((item) => item.courseId === "sql");
assert.ok(topics.length >= 43, "Expected the 43 SQL1 through SQL5 foundation topics plus subsequent modules");
for (const required of ["SQL1","SQL2","SQL3","SQL4","SQL5"]) assert.ok(topics.some((item) => item.moduleId === required), "Missing SQL foundation module " + required);
const topicIds = new Set();
const questionIds = new Set();
let examplesChecked = 0;
let outputsCompared = 0;
let statusOnlyExamples = 0;
let dynamicOutputs = 0;
const pyRunner = [
  "import json, re, sqlite3, sys",
  "examples = json.loads(sys.argv[1])",
  "db = sqlite3.connect(':memory:')",
  "db.execute('PRAGMA foreign_keys = ON')",
  "def statements(script):",
  "    pending = ''",
  "    for char in script:",
  "        pending += char",
  "        if char == ';' and sqlite3.complete_statement(pending):",
  "            if pending.strip(): yield pending.strip()",
  "            pending = ''",
  "    if pending.strip(): yield pending.strip()",
  "def cell(value):",
  "    if value is None: return 'NULL'",
  "    if isinstance(value, bytes): return '0x' + value.hex()",
  "    return str(value)",
  "def norm(value):",
  "    value = value.replace('\\r\\n', '\\n').replace('\\r', '\\n')",
  "    value = re.sub(r'\\s*\\|\\s*', '|', value)",
  "    value = re.sub(r'\\s*=\\s*', '=', value)",
  "    value = re.sub(r'\\s*;\\s*', ';', value)",
  "    return re.sub(r'\\s+', ' ', value).strip()",
  "def output_variants(columns, rows):",
  "    values = [[cell(v) for v in row] for row in rows]",
  "    if not values:",
  "        variants = {'(no rows)', 'no rows', 'no rows returned'}",
  "        variants.add(' | '.join(columns) + '\\n(no rows)')",
  "        return {norm(v) for v in variants}",
  "    row_pipe = [' | '.join(row) for row in values]",
  "    variants = {'; '.join(row_pipe)}",
  "    if len(columns) == 1:",
  "        variants.add('; '.join(row[0] for row in values))",
  "    if len(values) == 1 and len(columns) == 1:",
  "        variants.add(str(columns[0]) + ' = ' + values[0][0])",
  "    if len(columns) == 2:",
  "        variants.add('; '.join(row[0] + ' = ' + row[1] for row in values))",
  "    variants.add(' | '.join(columns) + '\\n' + '; '.join(row_pipe))",
  "    if len(columns) == 1:",
  "        variants.add(str(columns[0]) + '\\n' + '; '.join(row[0] for row in values))",
  "    return {norm(v) for v in variants}",
  "compared = 0",
  "skipped = 0",
  "dynamic = 0",
  "mismatches = []",
  "for item in examples:",
  "    last_columns = None",
  "    last_rows = None",
  "    try:",
  "        for statement in statements(item['code']):",
  "            cursor = db.execute(statement)",
  "            if cursor.description is not None:",
  "                last_columns = [column[0] for column in cursor.description]",
  "                last_rows = cursor.fetchall()",
  "        if item['expectsError']:",
  "            raise AssertionError('Expected SQL error but statement succeeded: ' + item['id'])",
  "    except sqlite3.Error as exc:",
  "        if not item['expectsError']:",
  "            raise AssertionError(item['id'] + ': ' + str(exc)) from exc",
  "        continue",
  "    if last_columns is None:",
  "        skipped += 1",
  "        continue",
  "    expected_text = item['expectedOutput'].strip()",
  "    expected = norm(expected_text)",
  "    actual = output_variants(last_columns, last_rows or [])",
  "    if 'version depends on runtime' in expected_text.lower():",
  "        observed = str((last_rows or [[None]])[0][0]) if last_rows else ''",
  "        if len(last_columns) == 1 and re.fullmatch(r'\\d+\\.\\d+(?:\\.\\d+)?', observed): dynamic += 1; continue",
  "    if expected_text.splitlines()[-1:] == ['Current UTC date']:",
  "        observed = str((last_rows or [[None]])[0][0]) if last_rows else ''",
  "        if len(last_columns) == 1 and re.fullmatch(r'\\d{4}-\\d{2}-\\d{2}', observed): dynamic += 1; continue",
  "    if expected not in actual:",
  "        mismatches.append({'id': item['id'], 'expected': item['expectedOutput'], 'columns': last_columns, 'rows': [[cell(v) for v in row] for row in (last_rows or [])], 'accepted': sorted(actual)[:4]})",
  "    else:",
  "        compared += 1",
  "db.close()",
  "print(json.dumps({'compared': compared, 'skipped': skipped, 'dynamic': dynamic, 'mismatches': mismatches}))"
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
  assert.equal(lesson.practice?.playgroundMode, "sql", "SQL lessons must use the dedicated SQL Playground");
  for (const [label, code] of [["starterCode", lesson.practice?.starterCode], ["resetCode", lesson.practice?.resetCode]]) {
    assert.ok(typeof code === "string" && code.trim(), topic.topicId + ": missing " + label);
    const starterRun = spawnSync("python3", ["-c", pyRunner, JSON.stringify([{ id: topic.topicId + "-" + label, code, expectedOutput: "", expectsError: false }])], { encoding: "utf8", timeout: 15000 });
    assert.equal(starterRun.status, 0, topic.topicId + ": " + label + " SQLite execution check failed: " + (starterRun.stderr || starterRun.stdout));
  }
  const examples = lesson.stages.explain.examples;
  assert.ok(examples?.length >= 5);
  for (const example of examples) {
    assert.ok(example.id && example.code?.trim());
    assert.ok(typeof example.expectedOutput === "string" && example.explanation?.length > 15);
    examplesChecked += 1;
  }
  const questions = lesson.assessment?.questions;
  assert.ok(questions?.length >= 5);
  const prompts = new Set();
  for (const question of questions) {
    assert.ok(question.id && !questionIds.has(question.id), "Duplicate MCQ ID " + question.id);
    assert.ok(question.prompt?.trim() && !prompts.has(question.prompt.trim()), "Duplicate or empty MCQ prompt in " + topic.topicId);
    prompts.add(question.prompt.trim());
    questionIds.add(question.id);
    assert.ok(question.options?.length >= 4);
    assert.equal(new Set(question.options).size, question.options.length, topic.topicId + ": duplicate MCQ options");
    assert.ok(question.options.includes(question.answer));
    assert.ok(question.explanation?.length > 15);
  }
  const payload = examples.map((example) => ({
    id: example.id,
    code: example.code,
    expectedOutput: example.expectedOutput,
    expectsError: /^Error:/i.test(example.expectedOutput.trim())
  }));
  const run = spawnSync("python3", ["-c", pyRunner, JSON.stringify(payload)], { encoding: "utf8", timeout: 15000 });
  assert.equal(run.status, 0, topic.topicId + ": SQLite execution/output check failed: " + (run.stderr || run.stdout));
  const result = JSON.parse(run.stdout);
  outputsCompared += result.compared;
  statusOnlyExamples += result.skipped;
  dynamicOutputs += result.dynamic;
  assert.equal(result.mismatches.length, 0, topic.topicId + ": expectedOutput mismatch: " + JSON.stringify(result.mismatches));
}
console.log("SQL course validation passed: " + topics.length + " lessons, " + examplesChecked + " SQLite-executed examples, " + outputsCompared + " expected outputs compared with actual result sets, " + statusOnlyExamples + " status-only examples, " + questionIds.size + " MCQs.");
