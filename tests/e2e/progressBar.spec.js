const { test, expect } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test("Basic progress bar", async ({ page }) => {
  const poManager = new POManager(page);
  await page.goto("/progress-bar");
  const progressBar = poManager.getProgressBar();
  await progressBar.startThenResetProgressBar();
});
