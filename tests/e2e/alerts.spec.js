const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Handling different types of alerts", async () => {
  let poManager;
  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await page.goto("/alerts");
  });
  test("Instant alert dialog", async () => {
    const instantAlert = await poManager.getAlerts();
    await instantAlert.handleInstantAlert();
  });

  test("Timer alert dialog", async () => {
    const timerAlert = await poManager.getAlerts();
    await timerAlert.handleTimerAlert();
  });

  test("Confirm alert dialog", async () => {
    const confirmAlert = await poManager.getAlerts();
    await confirmAlert.confirmAlert();
  });

  test("Prompt alert dialog", async () => {
    const promptAlert = await poManager.getAlerts();
    await promptAlert.promptAlert("Zarko");
  });
});
