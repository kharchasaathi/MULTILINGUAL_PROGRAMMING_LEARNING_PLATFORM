import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const bank = JSON.parse(await readFile(resolve(root, "public/content/en/sql/sql-code-challenges.json"), "utf8"));
const index = JSON.parse(await readFile(resolve(root, "public/content/curriculum-index.json"), "utf8"));
const lessonIds = new Set(index.topics.filter((item) => item.courseId === "sql").map((item) => item.topicId));
assert.equal(bank.courseId, "sql", "Challenge bank must belong to SQL");
assert.equal(bank.language, "en", "Challenge bank must be English-first");
assert.ok(bank.challenges.length >= 30, "Expected at least 30 original SQL challenges");
const ids = new Set();
for (const challenge of bank.challenges) {
  assert.ok(!ids.has(challenge.id), "Duplicate challenge ID: " + challenge.id);
  ids.add(challenge.id);
  assert.ok(lessonIds.has(challenge.topicId), challenge.id + ": topic must map to a SQL lesson");
  assert.ok(challenge.prompt && challenge.solutionSql && challenge.expectedRows, challenge.id + ": prompt, solution and expected rows are required");
}
const py = String.raw`import json, sqlite3, sys
bank = json.load(sys.stdin)
mismatches = []
for item in bank["challenges"]:
    db = sqlite3.connect(":memory:")
    db.execute("PRAGMA foreign_keys = ON")
    db.executescript(bank["dataset"]["setupSql"])
    try:
        cursor = db.execute(item["solutionSql"])
        if cursor.description is None:
            mismatches.append({"id": item["id"], "error": "solution did not return a result set"})
            continue
        actual = [list(row) for row in cursor.fetchall()]
        expected = item["expectedRows"]
        if actual != expected:
            mismatches.append({"id": item["id"], "expected": expected, "actual": actual})
    except Exception as exc:
        mismatches.append({"id": item["id"], "error": str(exc)})
    finally:
        db.close()
print(json.dumps({"checked": len(bank["challenges"]), "mismatches": mismatches}))
`;
const run = spawnSync("python3", ["-c", py], { input: JSON.stringify(bank), encoding: "utf8", timeout: 30000 });
assert.equal(run.status, 0, "SQL challenge SQLite execution failed: " + (run.stderr || run.stdout));
const result = JSON.parse(run.stdout);
assert.equal(result.mismatches.length, 0, "SQL challenge expected-output mismatches: " + JSON.stringify(result.mismatches));
console.log("SQL code challenge validation passed: " + result.checked + " original challenges executed in isolated SQLite databases.");
