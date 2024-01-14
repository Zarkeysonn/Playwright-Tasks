const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Validating frames", async () => {
  test("e2e frame1", async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/frames");
    const frames = poManager.getFrames();
    await frames.getFrame1AndAssertContent();
  });

  test("e2e frame2", async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/frames");
    const frames = poManager.getFrames();
    await frames.getFrame2AndAssertContent();
  });
});
