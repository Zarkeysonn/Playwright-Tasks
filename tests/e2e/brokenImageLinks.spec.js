const { test, expect } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Validate links and images", async () => {
  test("Check Specific Link in Playwright", async ({ page }) => {
    const urlToCheck = "https://the-internet.herokuapp.com/status_codes/500";
    const response = await page.goto(urlToCheck, { waitUntil: "load" });
    expect(response.status()).toBe(500, `Link is broken: ${urlToCheck}`);
  });

  test("Check if there are broken images on page", async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("https://demoqa.com/broken");
    const brokenImageLinks = await poManager.getBrokenImageLinks();
    const image = await brokenImageLinks.brokenImage;
    const t = await brokenImageLinks.isImageBroken(image);
  });
});
