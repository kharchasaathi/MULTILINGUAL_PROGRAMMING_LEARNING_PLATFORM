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
let expectedErrors = 0;
let statusStateAssertions = 0;
const pyRunner = [
  "import json, re, sqlite3, sys",
  "examples = json.loads(sys.argv[1])",
  "db = sqlite3.connect(':memory:', isolation_level=None)",
  "db.execute('PRAGMA foreign_keys = ON')",
  "def statements(script):",
  "    pending = ''",
  "    for char in script:",
  "        pending += char",
  "        if char == ';' and sqlite3.complete_statement(pending):",
  "            if pending.strip(): yield pending.strip()",
  "            pending = ''",
  "    if pending.strip(): yield pending.strip()",
  "def schema_snapshot():",
  "    snapshot = []",
  "    for _, schema, _ in db.execute('PRAGMA database_list').fetchall():",
  "        quoted = chr(34) + schema.replace(chr(34), chr(34) * 2) + chr(34)",
  "        objects = tuple(db.execute('SELECT type,name,tbl_name,sql FROM ' + quoted + '.sqlite_schema ORDER BY type,name').fetchall())",
  "        snapshot.append((schema, objects))",
  "    return tuple(snapshot)",
  "def cell(value):",
  "    if value is None: return 'NULL'",
  "    if isinstance(value, bytes): return '0x' + value.hex()",
  "    return str(value)",
  "def norm(value):",
  "    value = value.replace(chr(92) + 'n', chr(10)).replace(chr(92) + 'r', chr(13))",
  "    value = value.replace('\\r\\n', '\\n').replace('\\r', '\\n')",
  "    value = re.sub(r'\\s*\\|\\s*', '|', value)",
  "    value = re.sub(r'\\s*=\\s*', '=', value)",
  "    value = re.sub(r'\\s*;\\s*', ';', value)",
  "    return re.sub(r'\\s+', ' ', value).strip()",
  "def output_variants(columns, rows):",
  "    values = [[cell(v) for v in row] for row in rows]",
  "    if not values:",
  "        variants = {'(no rows)', 'no rows', 'No rows', 'no rows returned', '0 rows'}",
  "        variants.add(' | '.join(columns) + '\\n(no rows)')",
  "        return {norm(v) for v in variants}",
  "    row_pipe = [' | '.join(row) for row in values]",
  "    variants = {'; '.join(row_pipe), '\\n'.join(row_pipe)}",
  "    if len(columns) == 1:",
  "        variants.add('; '.join(row[0] for row in values))",
  "        variants.add(str(columns[0]) + ': ' + '; '.join(row[0] for row in values))",
  "        variants.add('\\n'.join(row[0] for row in values))",
  "    if len(values) == 1:",
  "        variants.update(str(name) + ' = ' + value for name, value in zip(columns, values[0]))",
  "    if len(columns) == 2:",
  "        variants.add('; '.join(row[0] + ' = ' + row[1] for row in values))",
  "    variants.add(' | '.join(columns) + '\\n' + '; '.join(row_pipe))",
  "    variants.add(' | '.join(columns) + '\\n' + '\\n'.join(row_pipe))",
  "    if len(columns) == 1:",
  "        variants.add(str(columns[0]) + '\\n' + '; '.join(row[0] for row in values))",
  "    normalized = {norm(v) for v in variants}",
  "    normalized.update(norm(re.sub(r'(?<![\\w.])(-?\\d+)\\.0+(?!\\d)', r'\\1', v)) for v in variants)",
  "    return normalized",
  "compared = 0",
  "skipped = 0",
  "dynamic = 0",
  "expected_errors = 0",
  "status_state_assertions = 0",
  "mismatches = []",
  "for item in examples:",
  "    result_sets = []",
  "    statement_list = list(statements(item['code']))",
  "    if item.get('parameters') is not None:",
  "        assert len(statement_list) == 1, item['id'] + \" bound-parameter examples must contain exactly one statement\"",
  "    try:",
  "        for statement in statement_list:",
  "            before_changes = db.total_changes",
  "            before_schema = schema_snapshot()",
  "            cursor = db.execute(statement, item['parameters']) if item.get('parameters') is not None else db.execute(statement)",
  "            if cursor.description is not None:",
  "                result_sets.append(([column[0] for column in cursor.description], cursor.fetchall()))",
  "            has_result = cursor.description is not None",
  "            cursor.close()",
  "            if not has_result and not item['expectsError']:",
  "                upper = statement.strip().upper()",
  "                after_schema = schema_snapshot()",
  "                changed = db.total_changes - before_changes",
  "                normalized_statement = re.sub(r\"^\s*(?:(?:--[^\n]*(?:\n|$))|(?:/\*.*?\*/\s*))*\", \"\", statement, flags=re.S)",
  "                if re.match(r\"^(CREATE|DROP|ALTER|REINDEX)\\b\", normalized_statement, re.I):",
  "                    assert after_schema != before_schema or \"IF EXISTS\" in upper or \"IF NOT EXISTS\" in upper, item['id'] + \" schema operation did not produce or confirm the requested state\"",
  "                    status_state_assertions += 1",
  "                elif re.search(r\"\\b(ATTACH|DETACH)\\b\", upper):",
  "                    assert after_schema != before_schema, item['id'] + \" database attachment state did not change\"",
  "                    status_state_assertions += 1",
  "                elif re.search(r\"\\b(INSERT|UPDATE|DELETE|REPLACE)\\b\", upper):",
  "                    expected_zero = bool(re.search(r\"\\b0\\s+rows?\\b\", item['expectedOutput'], re.I))",
  "                    assert changed > 0 or expected_zero, item['id'] + \" data operation did not change rows\"",
  "                    status_state_assertions += 1",
  "        if item['expectsError']:",
  "            raise AssertionError('Expected SQL error but statement succeeded: ' + item['id'])",
  "    except sqlite3.Error as exc:",
  "        if not item['expectsError']:",
  "            raise AssertionError(item['id'] + ': ' + str(exc)) from exc",
  "        expected_errors += 1",
  "        continue",
  "    if not result_sets:",
  "        skipped += 1",
  "        continue",
  "    expected_text = item['expectedOutput'].strip()",
  "    expected = norm(expected_text)",
  "    expected_pattern = item.get('expectedPattern')",
  "    if expected_pattern:",
  "        observed = repr(result_sets)",
  "        if re.search(expected_pattern, observed, re.I):",
  "            dynamic += 1",
  "            continue",
  "        mismatches.append({'id': item['id'], 'expectedPattern': expected_pattern, 'observed': observed})",
  "        continue",
  "    actual = set()",
  "    combined_rows = []",
  "    for columns, rows in result_sets:",
  "        actual.update(output_variants(columns, rows))",
  "        for row in rows:",
  "            actual.update(output_variants(columns, [row]))",
  "            combined_rows.append(' | '.join(cell(v) for v in row))",
  "    if combined_rows: actual.add(norm('; '.join(combined_rows)))",
  "    if 'version depends on runtime' in expected_text.lower():",
  "        observed = str(result_sets[-1][1][0][0]) if result_sets[-1][1] else ''",
  "        if len(result_sets[-1][0]) == 1 and re.fullmatch(r'\\d+\\.\\d+(?:\\.\\d+)?', observed): dynamic += 1; continue",
  "    if expected_text.splitlines()[-1:] == ['Current UTC date']:",
  "        observed = str(result_sets[-1][1][0][0]) if result_sets[-1][1] else ''",
  "        if len(result_sets[-1][0]) == 1 and re.fullmatch(r'\\d{4}-\\d{2}-\\d{2}', observed): dynamic += 1; continue",
  "    key_values = [norm(token) for token in re.findall(r'[A-Za-z_][A-Za-z0-9_]*\\s*=\\s*(?:NULL|[-+]?\\d+(?:\\.\\d+)?|[A-Za-z][A-Za-z0-9 _-]*)', expected_text)]",
  "    matches = expected in actual or (bool(key_values) and all(token in actual for token in key_values))",
  "    if not matches:",
  "        mismatches.append({'id': item['id'], 'expected': item['expectedOutput'], 'resultSets': [{'columns': cols, 'rows': [[cell(v) for v in row] for row in rows]} for cols, rows in result_sets], 'accepted': sorted(actual)[:8]})",
  "    else:",
  "        compared += 1",
  "db.close()",
  "print(json.dumps({'compared': compared, 'skipped': skipped, 'dynamic': dynamic, 'expected_errors': expected_errors, 'status_state_assertions': status_state_assertions, 'mismatches': mismatches}))"
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
    expectsError: /^Error:/i.test(example.expectedOutput.trim()),
    parameters: example.parameters ?? null,
    expectedPattern: example.expectedPattern ?? null,
  }));
  const run = spawnSync("python3", ["-c", pyRunner, JSON.stringify(payload)], { encoding: "utf8", timeout: 15000 });
  assert.equal(run.status, 0, topic.topicId + ": SQLite execution/output check failed: " + (run.stderr || run.stdout));
  const result = JSON.parse(run.stdout);
  outputsCompared += result.compared;
  statusOnlyExamples += result.skipped;
  dynamicOutputs += result.dynamic;
  expectedErrors += result.expected_errors;
  statusStateAssertions += result.status_state_assertions;
  assert.equal(result.mismatches.length, 0, topic.topicId + ": expectedOutput mismatch: " + JSON.stringify(result.mismatches));
}
console.log("SQL course validation passed: " + topics.length + " lessons, " + examplesChecked + " SQLite-executed examples, " + outputsCompared + " expected outputs compared with actual result sets, " + statusOnlyExamples + " status-only examples, " + statusStateAssertions + " database-state assertions for status-only statements, " + dynamicOutputs + " runtime-dependent outputs checked by pattern, " + expectedErrors + " expected-error examples, " + questionIds.size + " MCQs.");
