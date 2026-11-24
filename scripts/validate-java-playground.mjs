import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile("public/java-playground.html", "utf8");
const js = await readFile("public/js/java-playground.js", "utf8");
const loader = await readFile("public/js/lessons/curriculum-loader.js", "utf8");
const index = await readFile("public/index.html", "utf8");
const sw = await readFile("public/sw.js", "utf8");

for (const id of ["javaCode","javaInput","javaCompiler","runJava","stopJava","javaOutput","javaStatus"]) {
  assert.ok(html.includes('id="' + id + '"'), "Java Playground contains " + id);
}
assert.ok(html.includes("wandbox.org") && html.includes("source and stdin are sent"), "Third-party execution disclosure is visible");
assert.ok(js.includes('API + "/list.json"'), "Java compiler list endpoint is configured");
assert.ok(js.includes('API + "/compile.json"'), "Java execution endpoint is configured");
assert.ok(js.includes("save: false"), "Student submissions are not saved as public permalinks");
assert.ok(js.includes("public\\\\s+class\\\\s+Main") && js.includes("class Main"), "Public Main is normalized for the provider fixed source filename");
assert.ok(js.includes("AbortController") && js.includes("60000"), "Execution requests can be cancelled and time limited");
assert.ok(js.includes("textContent"), "Compiler output is rendered as text");
assert.ok(!/\beval\s*\(|new Function\s*\(/.test(js), "No eval or Function constructor is used");
assert.ok(loader.includes("/java-playground.html#code="), "Java lesson practice links open the Java Playground with code");
assert.ok(index.includes('href="/java-playground.html"'), "Home navigation links to Java Playground");
assert.ok(sw.includes("/java-playground.html") && sw.includes("/js/java-playground.js"), "Java Playground assets are in the app shell");
console.log("Java Playground contract validation passed.");
