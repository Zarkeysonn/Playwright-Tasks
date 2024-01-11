import { chromium, test as baseTest } from "@playwright/test";
import { UserModules } from "../modules/UserModules";
import { BookModules } from "../modules/BookModules";
const testPages = baseTest.extend({
  wpage: [
    async ({}, use, testInfo) => {
      // Configure LambdaTest platform for cross-browser testing
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await page.close();
      await context.close();
      await browser.close();
    },
    { auto: "true" },
  ],
  userModules: async ({ wpage }, use) => {
    await use(new UserModules(wpage));
  },
  bookModules: async ({ wpage }, use) => {
    await use(new BookModules(wpage));
  },
  general: async ({ wpage }, use) => {
    await use(new General(wpage));
  },
});
export const test = testPages;
export const expect = testPages.expect;
