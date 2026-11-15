import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";\ntest.use({ serviceWorkers: "block" });
const groups = {
  html: ["H16.1","H16.2","H16.3","H16.4","H16.5","H16.6","H16.7","H16.8","H16.9","H16.10"],
  css: ["C22.1","C22.2","C22.3","C22.4","C22.5","C22.6"],
  javascript: ["J24.1","J24.2","J24.3","J24.4","J24.5","J24.6","J24.7","J24.8","J24.9"]
};

test("homepage and lesson dialog have no serious or critical WCAG axe violations", async ({ page }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#courseGrid .course-card")).toHaveCount(4);
  const home = await new AxeBuilder({ page }).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  const seriousHome = home.violations.filter((item) => ["serious","critical"].includes(item.impact));
  expect(seriousHome, JSON.stringify(seriousHome.map(({ id, impact, description, nodes }) => ({ id, impact, description, count:nodes.length })), null, 2)).toEqual([]);

  await page.locator('[data-course-nav="html"]').click();
  const dialog = page.locator("#lessonDialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("COURSE LESSON");
  await dialog.locator('[data-topic-id="H16.1"]').click();
  await expect(dialog.locator(".lesson-template-title")).toContainText("H16.1");
  const lesson = await new AxeBuilder({ page }).include("#lessonDialog").withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  const seriousLesson = lesson.violations.filter((item) => ["serious","critical"].includes(item.impact));
  expect(seriousLesson, JSON.stringify(seriousLesson.map(({ id, impact, description, nodes }) => ({ id, impact, description, count:nodes.length })), null, 2)).toEqual([]);
});

test("keyboard users can open and dismiss the curriculum dialog", async ({ page }) => {
  await page.goto(baseURL);
  const navButton = page.locator('[data-course-nav="html"]');
  await navButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#lessonDialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#lessonDialog")).not.toBeVisible();
});

test("all 25 added lessons render and their runnable starter code executes in the preview", async ({ page }) => {
  test.setTimeout(180000);
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(baseURL);
  await expect(page.locator("#courseGrid .course-card")).toHaveCount(4);

  for (const [course, topicIds] of Object.entries(groups)) {
    await page.locator(`[data-course-nav="${course}"]`).click();
    const dialog = page.locator("#lessonDialog");
    await expect(dialog).toBeVisible();
    for (const topicId of topicIds) {
      await dialog.locator(`[data-topic-id="${topicId}"]`).click();
      await expect(dialog.locator(".lesson-template-title")).toContainText(topicId);\n      await expect(dialog.locator(".curriculum-back")).toBeVisible();\n      await expect(dialog.locator(".curriculum-draft-notice")).toBeVisible();
      await expect(dialog.locator(".lesson-objectives-list li")).toHaveCount(5);
      await expect(dialog.locator(".lesson-example")).toHaveCount(2);
      await expect(dialog.locator(".lesson-question")).toHaveCount(5);
      await expect(dialog.locator(".lesson-answer-option")).toHaveCount(15);
      const dataResponse = await page.request.get(`${baseURL}/content/en/${course}/${topicId}.json`);
      expect(dataResponse.ok(), `${topicId} JSON response`).toBeTruthy();
      const lesson = await dataResponse.json();
      if (lesson.practice.playgroundMode !== "none") {
        await dialog.locator(".lesson-practice-link").click();
        await expect(page.locator(".preview-live")).toContainText("READY");
        const preview = page.frameLocator("#previewFrame");
        await expect(preview.locator("body"), topicId + " preview body").not.toBeEmpty();
        if (lesson.practice.playgroundMode === "javascript") {
          await expect(preview.locator("#playgroundConsole")).not.toContainText("Console output appears here.");
        }
        if (lesson.practice.playgroundMode === "css") {
          await expect(preview.locator("style")).toHaveCount(2);
        }        if (topicId === "J24.9") {
          await preview.locator("#pad").click();
          await expect(preview.locator("#pad")).toHaveText("Activated by click or keyboard");
        }
      } else {
        await expect(dialog.locator(".lesson-practice-link")).toHaveText("Open the practice area");
      }
      await dialog.locator(".curriculum-back").click();
      await expect(dialog.locator(`[data-topic-id="${topicId}"]`)).toBeVisible();
    }
  }
  expect(pageErrors, "browser runtime errors").toEqual([]);
});
