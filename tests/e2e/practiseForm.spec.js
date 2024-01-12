const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test.only("Basic", async ({ page }) => {
  const poManager = new POManager(page);
  await page.goto("/automation-practice-form");
  const practiseForm = poManager.getPractiseForm();
  await practiseForm.fillPractiseFormAndValidateData({});
});
