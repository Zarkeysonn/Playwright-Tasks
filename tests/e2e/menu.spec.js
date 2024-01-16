const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Menu", async () => {
  let menu;
  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/menu#");
    menu = poManager.getMenu();
  });
  test("Date before this day", async () => {
    await menu.getToSubSubList();
  });
});
