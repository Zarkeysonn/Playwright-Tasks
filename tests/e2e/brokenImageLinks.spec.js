import { test, expect } from "../../modules/base";

test.describe("Validate links and images", async () => {
  test("Check Specific Link in Playwright", async ({ wpage }) => {
    const urlToCheck = "https://the-internet.herokuapp.com/status_codes/500";
    const response = await wpage.goto(urlToCheck, { waitUntil: "load" });
    expect(response.status()).toBe(500, `Link is broken: ${urlToCheck}`);
  });

  test("Check if there are broken images on page", async ({
    wpage,
    brokenImageLinks,
  }) => {
    await wpage.goto("https://demoqa.com/broken");
    const image = await brokenImageLinks.brokenImage;
    const t = await brokenImageLinks.isImageBroken(image);
  });
});
