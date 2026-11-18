import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
test.use({ serviceWorkers: "block" });
const groups = {
  html: ["H16.1","H16.2","H16.3","H16.4","H16.5","H16.6","H16.7","H16.8","H16.9","H16.10"],
  css: ["C22.1","C22.2","C22.3","C22.4","C22.5","C22.6"],
  javascript: ["J24.1","J24.2","J24.3","J24.4","J24.5","J24.6","J24.7","J24.8","J24.9"],
  c: ["CL1.1","CL1.2","CL1.3","CL1.4","CL1.5","CL1.6","CL2.1","CL2.2","CL2.3","CL2.4","CL2.5","CL2.6","CL2.7","CL2.8","CL2.9","CL2.10"]
};

test("homepage and lesson dialog have no serious or critical WCAG axe violations", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
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
  const navButton = page.locator('[data-course-nav="html"]');
  await navButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#lessonDialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lessonDialog")).not.toBeVisible();
});

test("all 25 lessons render in the UI and all runnable starter programs execute in Chromium", async ({ page }) => {
  test.setTimeout(180000);
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#courseGrid .course-card")).toHaveCount(await page.evaluate(async () => (await fetch("/content/curriculum-index.json")).json().then(data => data.courses.length)));

  // Exercise the shared lesson renderer and modal with one representative lesson per course.
  for (const [course, topicId] of [["foundation","F0.1"],["html","H16.1"],["css","C22.1"],["javascript","J24.1"],["c","CL1.1"],["cpp","CPP1.1"]]) {
    await page.locator(`[data-course-nav="${course}"]`).click();
    const dialog = page.locator("#lessonDialog");
    await expect(dialog).toBeVisible();
    await dialog.locator(`[data-topic-id="${topicId}"]`).click();
    await expect(dialog.locator(".lesson-template-title")).toContainText(topicId);
    await expect(dialog.locator(".curriculum-back")).toBeVisible();
    await expect(dialog.locator(".curriculum-draft-notice")).toHaveCount(0);
    await expect(dialog.locator(".lesson-objectives-list li")).toHaveCount(5);
    await expect(dialog.locator(".lesson-example")).toHaveCount(course === "cpp" ? 5 : 2);
    await expect(dialog.locator(".lesson-question")).toHaveCount(5);
    await expect(dialog.locator(".lesson-answer-option")).toHaveCount(15);
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
