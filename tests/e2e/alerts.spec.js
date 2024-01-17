import { test } from "../../modules/base";

test.describe("Handling different types of alerts", async () => {
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/alerts");
  });
  test("Instant alert dialog", async ({ alerts }) => {
    await alerts.handleInstantAlert();
  });

  test("Timer alert dialog", async ({ alerts }) => {
    await alerts.handleTimerAlert();
  });

  test("Confirm alert dialog", async ({ alerts }) => {
    await alerts.confirmAlert();
  });

  test("Prompt alert dialog", async ({ alerts }) => {
    await alerts.promptAlert("Zarko");
  });
});
