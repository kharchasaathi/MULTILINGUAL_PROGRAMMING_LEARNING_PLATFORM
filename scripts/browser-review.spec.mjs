import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
test.use({ serviceWorkers: "block" });

// The curriculum index is loaded asynchronously after DOMContentLoaded.
// Wait for the complete set of course cards before interacting with delegated navigation.
async function waitForCurriculum(page) {
  const expected = await page.evaluate(async () =>
    (await fetch("/content/curriculum-index.json", { cache: "no-cache" })).json()
      .then(data => data.courses.length)
  );
  await expect(page.locator("#courseGrid .course-card")).toHaveCount(expected, { timeout: 15000 });
  await expect(page.locator("[data-course-nav]")).toHaveCount(expected, { timeout: 15000 });
}
const groups = {
  html: ["H16.1","H16.2","H16.3","H16.4","H16.5","H16.6","H16.7","H16.8","H16.9","H16.10"],
  css: ["C22.1","C22.2","C22.3","C22.4","C22.5","C22.6"],
  javascript: ["J24.1","J24.2","J24.3","J24.4","J24.5","J24.6","J24.7","J24.8","J24.9"],
  c: ["CL1.1","CL1.2","CL1.3","CL1.4","CL1.5","CL1.6","CL2.1","CL2.2","CL2.3","CL2.4","CL2.5","CL2.6","CL2.7","CL2.8","CL2.9","CL2.10"],
  python: ["PY1.1"]
};

test("homepage and lesson dialog have no serious or critical WCAG axe violations", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  await waitForCurriculum(page);
  await expect(page.locator("#courseGrid .course-card")).toHaveCount(await page.evaluate(async () => (await fetch("/content/curriculum-index.json")).json().then(data => data.courses.length)));
  const home = await new AxeBuilder({ page }).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  const seriousHome = home.violations.filter((item) => ["serious","critical"].includes(item.impact));
  expect(seriousHome, JSON.stringify(seriousHome.map(({ id, impact, description, nodes }) => ({ id, impact, description, count:nodes.length })), null, 2)).toEqual([]);

  await page.locator('[data-course-nav="html"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("COURSE LESSON");
  await dialog.locator('[data-topic-id="H16.1"]').click();
  await expect(dialog.locator(".lesson-template-title")).toContainText("H16.1");
  await expect(dialog.locator(".curriculum-back")).toBeVisible();
  await expect(dialog.locator(".curriculum-draft-notice")).toHaveCount(0);
  const lesson = await new AxeBuilder({ page }).include("#lessonDialog").withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  const seriousLesson = lesson.violations.filter((item) => ["serious","critical"].includes(item.impact));
  expect(seriousLesson, JSON.stringify(seriousLesson.map(({ id, impact, description, nodes }) => ({ id, impact, description, count:nodes.length })), null, 2)).toEqual([]);
});

test("landing-page HTML playground renders real output and its button interaction works", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  const frame = page.frameLocator("#previewFrame");
  await expect(page.locator(".preview-live")).toContainText("READY");
  await expect(frame.locator("h1")).toHaveText("Hello, CodeSaathi!");
  await expect(frame.locator("p")).toHaveText("I am learning to build for the web.");
  await expect(frame.getByRole("button", { name: "Click me" })).toBeVisible();
  await frame.getByRole("button", { name: "Click me" }).click();
  await expect(frame.locator("p")).toHaveText("I made this work!");
  await page.locator("#codeEditor").fill("<h1>Updated preview</h1><p>Second run works.</p>");
  await page.locator("#runCode").click();
  await expect(frame.locator("h1")).toHaveText("Updated preview");
  await expect(frame.locator("p")).toHaveText("Second run works.");
});


test("lesson practice links close the dialog and navigate to the playground", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);

  // A lesson without runnable starter code must still open the practice area.
  await page.locator('[data-course-nav="foundation"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-topic-id="F0.1"]').click();
  const openPractice = dialog.locator(".lesson-practice-link");
  await expect(openPractice).toHaveText("Open the practice area");
  await openPractice.click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("#practice")).toBeInViewport();

  // A lesson with starter code must load and run it before navigating.
  await page.locator('[data-course-nav="html"]').click();
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-topic-id="H16.1"]').click();
  const loadStarter = dialog.locator(".lesson-practice-link");
  await expect(loadStarter).toContainText("starter code");
  await loadStarter.click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("#practice")).toBeInViewport();
  await expect(page.locator("#codeEditor")).toHaveValue(/Named and hexadecimal colours/);
  await expect(page.locator(".preview-live")).toContainText("READY");
  await expect(page.frameLocator("#previewFrame").locator("p")).toHaveText("Named and hexadecimal colours");
});

test("keyboard users can open and dismiss the curriculum dialog", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  const navButton = page.locator('[data-course-nav="html"]');
  await navButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#lessonDialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lessonDialog")).not.toBeVisible();
});

test("all ten courses render representative lessons and starter programs execute in Chromium", async ({ page }) => {
  test.setTimeout(180000);
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  await expect(page.locator("#courseGrid .course-card")).toHaveCount(await page.evaluate(async () => (await fetch("/content/curriculum-index.json")).json().then(data => data.courses.length)));

  // Exercise the shared lesson renderer and modal with one representative lesson per course.
  for (const [course, topicId] of [["foundation","F0.1"],["html","H16.1"],["css","C22.1"],["javascript","J24.1"],["c","CL1.1"],["cpp","CPP1.1"],["python","PY1.1"],["sql","SQL1.1"],["java","JV1.1"],["csharp","CSH1.6"]]) {
    await page.locator(`[data-course-nav="${course}"]`).click();
    const dialog = page.locator("#lessonDialog");
    await expect(dialog).toBeVisible();
    await dialog.locator(`[data-topic-id="${topicId}"]`).click();
    try {
      await expect(dialog.locator(".lesson-template-title")).toContainText(topicId);
    } catch (error) {
      const diagnostic = await dialog.locator("#lessonContent").innerText().catch(() => "No lesson container");
      throw new Error("Lesson render diagnostic for " + topicId + ": " + diagnostic.slice(0, 1200));
    }
    await expect(dialog.locator(".curriculum-back")).toBeVisible();
    await expect(dialog.locator(".curriculum-draft-notice")).toHaveCount(0);
    const lessonResponse = await page.request.get(`${baseURL}/content/en/${course}/${topicId}.json`);
    expect(lessonResponse.ok(), topicId + " lesson file").toBeTruthy();
    const lessonData = await lessonResponse.json();
    const expectedExamples = lessonData.examples || lessonData.stages?.explain?.examples || [];
    if (course === "java" || course === "csharp") expect(lessonData.practice?.playgroundMode, `${course} lessons must not use the web-language playground`).toBe("none");
    const expectedQuestions = lessonData.assessment?.questions || [];
    await expect(dialog.locator(".lesson-objectives-list li")).toHaveCount(lessonData.learningObjectives.length);
    await expect(dialog.locator(".lesson-example")).toHaveCount(expectedExamples.length);
    if (course === "cpp") {
      await expect(dialog.locator(".lesson-stage").nth(0)).toContainText("C++ is a general-purpose");
      await expect(dialog.locator(".lesson-hints li")).toHaveCount(lessonData.practise.hints.length);
      const firstQuestion = dialog.locator(".lesson-question").first();
      const correctAnswer = Number.isInteger(expectedQuestions[0].answer) ? expectedQuestions[0].options[expectedQuestions[0].answer] : expectedQuestions[0].answer;
      await firstQuestion.locator("label.lesson-answer-option").filter({ hasText: correctAnswer }).click();
      await expect(firstQuestion.locator(".lesson-question-feedback")).toContainText("Correct");
    }
    await expect(dialog.locator(".lesson-question")).toHaveCount(expectedQuestions.length);
    await expect(dialog.locator(".lesson-answer-option")).toHaveCount(expectedQuestions.reduce((total, question) => total + question.options.length, 0));
    await dialog.locator("#closeLesson").click();
  }

  // Execute a small representative starter set in Chromium; full content contracts are validated separately.
  for (const [course, topicIds] of Object.entries(groups)) {
    for (const topicId of topicIds.slice(0, 1)) {
      const response = await page.request.get(`${baseURL}/content/en/${course}/${topicId}.json`);
      expect(response.ok(), `${topicId} JSON response`).toBeTruthy();
      const lesson = await response.json();
      const { playgroundMode, starterCode } = lesson.practice;
      if (playgroundMode === "none") continue;
      expect(starterCode?.length, `${topicId} starter code`).toBeGreaterThan(10);
      await page.evaluate(({ code, mode }) => {
        const editor = document.querySelector("#codeEditor");
        editor.dataset.playgroundMode = mode;
        editor.value = code;
        document.querySelector("#runCode").click();
      }, { code: starterCode, mode: playgroundMode });
      await expect(page.locator(".preview-live"), topicId + " preview status").toContainText("READY");
      const preview = page.frameLocator("#previewFrame");
      await expect(preview.locator("body"), topicId + " preview body").not.toBeEmpty();
      if (playgroundMode === "javascript") {
        await expect(preview.locator("#playgroundConsole"), topicId + " console output").not.toContainText("Console output appears here.");
      }
      if (playgroundMode === "css") {
        await expect(preview.locator("style"), topicId + " CSS styles").toHaveCount(2);
      }
      if (topicId === "J24.9") {
        await preview.locator("#pad").click();
        await expect(preview.locator("#pad")).toHaveText("Activated by click or keyboard");
      }
    }
  }
  expect(pageErrors, "browser runtime errors").toEqual([]);
});

test("C++ indexed quiz answers are mapped to the correct choice", async ({ page }) => {
  test.setTimeout(90000);
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  await page.locator('[data-course-nav="cpp"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-topic-id="CPP12.1"]').click();
  await expect(dialog.locator(".lesson-template-title")).toContainText("CPP12.1");
  const response = await page.request.get(`${baseURL}/content/en/cpp/CPP12.1.json`);
  const lesson = await response.json();
  await expect(dialog.locator(".lesson-question")).toHaveCount(lesson.assessment.questions.length, { timeout: 20000 });
  const firstQuestion = dialog.locator(".lesson-question").first();
  const correctAnswer = Number.isInteger(lesson.assessment.questions[0].answer)
    ? lesson.assessment.questions[0].options[lesson.assessment.questions[0].answer]
    : lesson.assessment.questions[0].answer;
  await firstQuestion.locator("label.lesson-answer-option").filter({ hasText: correctAnswer }).click();
  await expect(firstQuestion.locator(".lesson-question-feedback")).toContainText("Correct");
});


test("Python playground runs Pyodide in a worker with stdin, stderr, errors, stop and timeout", async ({ page }) => {
  test.setTimeout(240000);
  const nonGetRequests = [];
  page.on("request", request => {
    if (request.method() !== "GET" && request.method() !== "HEAD") nonGetRequests.push(request.url());
  });
  await page.goto(`${baseURL}/python-playground.html`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#runtimeStatus")).toHaveAttribute("data-state", "ready", { timeout: 180000 });
  await expect(page.locator("#pythonVersion")).toContainText("Python 3.14");

  await page.locator("#pythonCode").fill('print("worker output works")');
  await page.locator("#runPython").click();
  await expect(page.locator("#pythonOutput")).toContainText("worker output works", { timeout: 15000 });

  await page.locator("#pythonCode").fill('name = input("Name: ")\nscore = int(input("Score: "))\nprint(f"{name}: {score + 1}")');
  await page.locator("#pythonStdin").fill("Asha\n8");
  await page.locator("#runPython").click();
  await expect(page.locator("#pythonOutput")).toContainText("Asha: 9", { timeout: 15000 });

  await page.locator("#pythonCode").fill('import sys\nprint("warning stream", file=sys.stderr)');
  await page.locator("#runPython").click();
  await expect(page.locator("#pythonOutput .stderr")).toContainText("warning stream", { timeout: 15000 });

  await page.locator("#pythonCode").fill('raise ValueError("bad input")');
  await page.locator("#runPython").click();
  await expect(page.locator("#pythonOutput")).toContainText("ValueError", { timeout: 15000 });
  await expect(page.locator("#pythonOutput")).toContainText("bad input");

  await page.locator("#pythonCode").fill("");
  await page.locator("#runPython").click();
  await expect(page.locator("#pythonOutput")).toContainText("Enter some Python code");

  await page.locator("#pythonCode").fill("while True:\n    pass");
  await page.locator("#runPython").click();
  await expect(page.locator("#stopPython")).toBeEnabled();
  await page.locator("#stopPython").click();
  await expect(page.locator("#runtimeStatus")).toHaveAttribute("data-state", "ready", { timeout: 60000 });
  await expect(page.locator("#pythonOutput")).toContainText("stopped by the learner");

  await page.locator("#pythonCode").fill("while True:\n    pass");
  await page.locator("#runPython").click();
  await expect(page.locator("#runState")).toHaveText("Timed out", { timeout: 20000 });
  await expect(page.locator("#runtimeStatus")).toHaveAttribute("data-state", "ready", { timeout: 60000 });

  await page.locator("#resetPython").click();
  await expect(page.locator("#pythonCode")).toHaveValue('print("Hello, CodeSaathi!")');
  await page.locator("#pythonExample").selectOption("input");
  await expect(page.locator("#pythonStdin")).toHaveValue("Asha\n25");
  await page.locator("#restorePython").click();
  await expect(page.locator("#pythonCode")).toHaveValue('print("Hello, CodeSaathi!")');
  await page.locator("#clearPythonOutput").click();
  await expect(page.locator("#pythonOutput")).toHaveText("Output will appear here.");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#pythonCode")).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow, "mobile page should not overflow horizontally").toBe(false);
  expect(nonGetRequests, "learner code should not be sent using a non-GET request").toEqual([]);
});

test("Python lesson practice link opens its dedicated playground with the first lesson example", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  await page.locator('[data-course-nav="python"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-topic-id="PY1.1"]').click();
  const lessonResponse = await page.request.get(`${baseURL}/content/en/python/PY1.1.json`);
  expect(lessonResponse.ok()).toBeTruthy();
  const lesson = await lessonResponse.json();
  const expectedCode = lesson.stages.explain.examples[0].code;
  const link = dialog.locator(".lesson-practice-link");
  await expect(link).toHaveAttribute("href", /python-playground\.html#code=/);
  await expect(link).toContainText("Python Playground");
  const [playground] = await Promise.all([page.waitForEvent("popup"), link.click()]);
  await expect(playground.locator("#pythonCode")).toHaveValue(expectedCode);
  await expect(playground.locator("#runtimeStatus")).toHaveAttribute("data-state", "ready", { timeout: 180000 });
  await playground.close();
});

test("SQL Playground runs SQLite in a worker, persists locally, reports errors and resets safely", async ({ page }) => {
  test.setTimeout(180000);
  const nonGetRequests = [];
  page.on("request", request => {
    if (request.method() !== "GET" && request.method() !== "HEAD") nonGetRequests.push(request.url());
  });
  await page.goto(`${baseURL}/sql-playground.html`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "ready", { timeout: 120000 });
  await expect(page.locator("#sqlVersion")).toContainText("SQLite");

  // Foreign-key enforcement must be enabled for every fresh, restored and imported Playground connection.
  await page.locator("#sqlCode").fill("PRAGMA foreign_keys;");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("1", { timeout: 15000 });
  await page.locator("#sqlCode").fill("CREATE TABLE fk_parent (id INTEGER PRIMARY KEY); CREATE TABLE fk_child (parent_id INTEGER REFERENCES fk_parent(id)); INSERT INTO fk_child VALUES (99);");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("FOREIGN KEY constraint failed", { timeout: 15000 });

  const createAndQuery = "CREATE TABLE learners (learner_id INTEGER PRIMARY KEY, learner_name TEXT NOT NULL, score INTEGER NOT NULL); INSERT INTO learners (learner_name, score) VALUES ('Asha', 88), ('Ravi', 76); SELECT learner_name, score FROM learners ORDER BY score DESC;";
  await page.locator("#sqlCode").fill(createAndQuery);
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("Asha", { timeout: 20000 });
  await expect(page.locator("#sqlResults")).toContainText("88");
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "ready");

  // Verify positional and named prepared-statement parameters are bound as values.
  await page.locator("#sqlCode").fill("SELECT learner_name, score FROM learners WHERE learner_name = ?;");
  await page.locator("#sqlParams").fill('["Asha"]');
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("Asha", { timeout: 15000 });
  await expect(page.locator("#sqlResults")).toContainText("88");
  await expect(page.locator("#sqlResults")).not.toContainText("Ravi");

  await page.locator("#sqlCode").fill("SELECT learner_name, score FROM learners WHERE learner_name = :name;");
  await page.locator("#sqlParams").fill('{"\\u003aname":"Ravi"}');
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("Ravi", { timeout: 15000 });
  await expect(page.locator("#sqlResults")).toContainText("76");

  await page.locator("#sqlCode").fill("SELECT learner_name FROM learners WHERE learner_name = ?; SELECT score FROM learners;");
  await page.locator("#sqlParams").fill('["Asha"]');
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("exactly one SQL statement", { timeout: 15000 });
  await page.locator("#sqlParams").fill("");

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "ready", { timeout: 120000 });
  await page.locator("#sqlCode").fill("SELECT learner_name, score FROM learners ORDER BY learner_id;");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("Asha", { timeout: 20000 });
  await expect(page.locator("#sqlResults")).toContainText("Ravi");

  await page.locator("#sqlCode").fill("SELECT missing_column FROM learners;");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("SQL error:", { timeout: 15000 });
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "error");

  await page.locator("#sqlCode").fill("SELECT COUNT(*) AS learner_count FROM learners;");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("2", { timeout: 15000 });
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "ready");

  const exportPromise = page.waitForEvent("download");
  await page.locator("#exportSqlDatabase").click();
  const databaseDownload = await exportPromise;
  const exportedDatabasePath = await databaseDownload.path();
  expect(exportedDatabasePath).toBeTruthy();

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#resetSqlDatabase").click();
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "ready", { timeout: 15000 });
  await page.locator("#sqlCode").fill("SELECT COUNT(*) AS table_count FROM sqlite_master WHERE type = 'table' AND name = 'learners';");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("0", { timeout: 15000 });

  page.once("dialog", dialog => dialog.accept());
  await page.locator("#sqlDatabaseFile").setInputFiles(exportedDatabasePath);
  await expect(page.locator("#sqlStatus")).toHaveAttribute("data-state", "ready", { timeout: 20000 });
  await page.locator("#sqlCode").fill("SELECT learner_name, score FROM learners ORDER BY learner_id;");
  await page.locator("#runSql").click();
  await expect(page.locator("#sqlResults")).toContainText("Asha", { timeout: 15000 });
  await expect(page.locator("#sqlResults")).toContainText("Ravi");

  await page.locator("#sqlExample").selectOption("join");
  await expect(page.locator("#sqlCode")).toHaveValue(/JOIN/);
  await page.locator("#resetSqlCode").click();
  await expect(page.locator("#sqlCode")).toHaveValue(/CREATE TABLE learners/);

  // Execute every SQL3 lesson starter in the actual browser WebAssembly runtime.
  for (let topicNumber = 1; topicNumber <= 10; topicNumber += 1) {
    const topicId = "SQL3." + topicNumber;
    const response = await page.request.get(`${baseURL}/content/en/sql/${topicId}.json`);
    expect(response.ok(), topicId + " lesson JSON").toBeTruthy();
    const lesson = await response.json();
    await page.locator("#sqlCode").fill(lesson.practice.starterCode);
    await page.locator("#runSql").click();
    await expect(page.locator("#sqlStatus"), topicId + " browser SQLite execution").toHaveAttribute("data-state", "ready", { timeout: 20000 });
    await expect(page.locator("#sqlResults"), topicId + " should not return a SQL error").not.toContainText("SQL error:");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#sqlCode")).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow, "SQL Playground should not overflow horizontally on mobile").toBe(false);
  expect(nonGetRequests, "learner SQL should not be sent using a non-GET request").toEqual([]);
});

test("SQL lesson practice links open the dedicated SQL Playground with lesson starter code", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  await page.locator('[data-course-nav="sql"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-topic-id="SQL3.1"]').click();
  const response = await page.request.get(`${baseURL}/content/en/sql/SQL3.1.json`);
  expect(response.ok()).toBeTruthy();
  const lesson = await response.json();
  const expectedCode = lesson.practice.starterCode;
  const link = dialog.locator(".lesson-practice-link");
  await expect(link).toHaveAttribute("href", /sql-playground\.html#code=/);
  await expect(link).toContainText("SQL Playground");
  const [playground] = await Promise.all([page.waitForEvent("popup"), link.click()]);
  await expect(playground.locator("#sqlCode")).toHaveValue(expectedCode);
  await expect(playground.locator("#sqlStatus")).toHaveAttribute("data-state", "ready", { timeout: 120000 });
  await playground.close();
});


test("SQL Practice Hub runs fill-in-the-blank, cumulative quiz and isolated code challenges", async ({ page }) => {
  test.setTimeout(180000);
  await page.goto(baseURL + "/sql-practice.html", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "SQL Practice Hub" })).toBeVisible();
  await page.getByRole("button", { name: "WHERE", exact: true }).click();
  await expect(page.locator("#blankFeedback")).toContainText("Correct");
  await page.reload();
  await expect(page.locator("#blankScore")).toContainText("1 correct");
  await expect(page.locator("#blankNext")).toBeEnabled();
  await page.locator("#blankNext").click();
  await page.getByRole("button", { name: "Cumulative quiz" }).click();
  await page.getByRole("button", { name: /Start 20-question quiz/ }).click();
  await expect(page.locator("#quizCounter")).toContainText("Question 1 of 20", { timeout: 120000 });
  await expect(page.locator("#quizOptions input").first()).toBeVisible();
  await page.locator("#quizOptions input").first().check();
  await expect(page.locator("#quizNext")).toBeEnabled();
  await page.getByRole("button", { name: "Final assessment" }).click();
  await page.getByRole("button", { name: /Start final assessment/ }).click();
  await expect(page.locator("#examCounter")).toContainText("Question 1 of 60", { timeout: 30000 });
  await expect(page.locator("#examTimer")).toContainText("60:00 remaining");
  await page.locator("#examOptions input").first().check();
  await expect(page.locator("#examNext")).toBeEnabled();
  await page.getByRole("button", { name: "SQL challenges" }).click();
  await expect(page.locator("#challengeCount")).toContainText("32 challenges");
  await page.getByRole("button", { name: /CH01/ }).click();
  await expect(page.locator("#checkChallenge")).toBeEnabled({ timeout: 30000 });
  await page.locator("#challengeSql").fill("SELECT customer_name, city, active FROM customers ORDER BY customer_id;");
  await page.locator("#checkChallenge").click();
  await expect(page.locator("#challengeFeedback")).toContainText("Correct", { timeout: 30000 });
  await page.locator("#challengeSql").fill("WITH attempted_write AS (SELECT 1) DELETE FROM customers RETURNING customer_id;");
  await page.locator("#checkChallenge").click();
  await expect(page.locator("#challengeOutput")).toContainText(/readonly|read-only/i, { timeout: 30000 });
});


test("C compiler embed exposes the browser-local compiler and direct fallback", async ({ page }) => {
  await page.goto(baseURL + "/c-compiler.html", { waitUntil: "domcontentloaded" });
  const frame = page.locator("#cCompilerFrame");
  await expect(frame).toHaveAttribute("src", /^https:\/\/nothing12-glitch\.github\.io\/cpp-forge\//, { timeout: 10000 });
  await expect(page.getByRole("link", { name: /open the C compiler directly/i })).toHaveAttribute("href", "https://nothing12-glitch.github.io/cpp-forge/");
  await expect(page.locator(".c-compiler-notice").nth(1)).toContainText("23 MB");
  const src = await frame.getAttribute("src");
  const token = new URL(src).hash.slice("#code=".length);
  const encodedState = JSON.parse(Buffer.from(token.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
  expect(encodedState.code).toContain('printf("Hello, CodeSaathi!\\n");');
  expect(await page.locator("body").innerText()).not.toContain("\\n");
});


test("SQL reference guide is accessible and responsive", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL + "/sql-reference.html", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "SQL Reference & Dialect Guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Data type families across databases" })).toBeVisible();
  for (const heading of ["SQL keyword catalogue", "MySQL function reference", "SQL Server function reference", "MS Access function reference"]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBeFalsy();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations.filter(item => ["critical", "serious"].includes(item.impact))).toEqual([]);
});


test("SQL Playground and Practice Hub pass serious accessibility checks", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/sql-playground.html", "/sql-practice.html"]) {
    await page.goto(baseURL + path, { waitUntil: "domcontentloaded" });
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(result.violations.filter(item => ["critical", "serious"].includes(item.impact))).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBeFalsy();
  }
});


test("Java Playground discovers a compiler, runs with stdin, and receives lesson code", async ({ page }) => {
  const compilerList = [{ name: "wandbox-java", language: "Java", version: "21.0.1", "display-name": "OpenJDK 21" }];
  await page.context().route("https://wandbox.org/api/**", async route => {
    if (route.request().url().endsWith("/list.json")) {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(compilerList) });
      return;
    }
    if (route.request().url().endsWith("/compile.json")) {
      const body = route.request().postDataJSON();
      expect(body.compiler).toBe("wandbox-java");
      expect(body.stdin).toBe("Ada");
      expect(body.save).toBe(false);
      expect(body.code).toContain("Scanner");
      expect(body.code).toContain("class Main");
      expect(body.code).not.toContain("public class Main");
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({
        status: "0", compiler: "wandbox-java", compiler_message: "", program_output: "Hello, Ada!", program_message: "", program_error: ""
      }) });
      return;
    }
    await route.continue();
  });

  await page.goto(baseURL + "/java-playground.html", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#javaStatus")).toHaveAttribute("data-state", "ready");
  await expect(page.locator("#javaCompiler")).toHaveValue("wandbox-java");
  const source = ["import java.util.Scanner;", 'public class Main { public static void main(String[] args) { Scanner in = new Scanner(System.in); System.out.println("Hello, " + in.nextLine() + "!"); } }'].join(String.fromCharCode(10));
  await page.locator("#javaCode").fill(source);
  await page.locator("#javaInput").fill("Ada");
  await page.locator("#runJava").click();
  await expect(page.locator("#javaOutput")).toContainText("Hello, Ada!");
  await expect(page.locator("#javaStatus")).toHaveAttribute("data-state", "ready");

  await page.setViewportSize({ width: 390, height: 844 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "Java Playground should not overflow on mobile").toBe(false);
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(accessibility.violations.filter(item => ["serious","critical"].includes(item.impact))).toEqual([]);
});

test("Java lesson practice link opens Java Playground with its first example", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForCurriculum(page);
  await page.locator('[data-course-nav="java"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-topic-id="JV1.2"]').click();
  const lesson = await (await page.request.get(baseURL + "/content/en/java/JV1.2.json")).json();
  const expected = lesson.stages.explain.examples.find(example => example.code)?.code;
  const link = dialog.locator(".lesson-practice-link");
  expect(await link.getAttribute("href")).toContain("/java-playground.html#code=");
  await expect(link).toContainText("Java Playground");
  const [playground] = await Promise.all([page.waitForEvent("popup"), link.click()]);
  await expect(playground.locator("#javaCode")).toHaveValue(expected);
  await playground.close();
});
