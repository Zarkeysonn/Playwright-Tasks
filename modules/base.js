import { chromium, test as baseTest } from "@playwright/test";
import { UserModules } from "../modules/UserModules";
import { BookModules } from "../modules/BookModules";
import { Alerts } from "../page_object_models/Alerts";
import { BrokenImageLinks } from "../page_object_models/BrokenImageLinks";
import { DatePicker } from "../page_object_models/DatePicker";
import { DroppableAndDragabble } from "../page_object_models/DroppableAndDragabble";
import { Frames } from "../page_object_models/Frames";
import { ListAndGrid } from "../page_object_models/ListAndGrid";
import { Menu } from "../page_object_models/Menu";
import { PractiseForm } from "../page_object_models/PractiseForm";
import { ProgressBar } from "../page_object_models/ProgressBar";
import { UploadAndDownload } from "../page_object_models/UploadAndDownload";
import { WebTables } from "../page_object_models/WebTables";
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
  alerts: async ({ wpage }, use) => {
    await use(new Alerts(wpage));
  },
  general: async ({ wpage }, use) => {
    await use(new General(wpage));
  },
  brokenImageLinks: async ({ wpage }, use) => {
    await use(new BrokenImageLinks(wpage));
  },
  datePicker: async ({ wpage }, use) => {
    await use(new DatePicker(wpage));
  },
  dragDrop: async ({ wpage }, use) => {
    await use(new DroppableAndDragabble(wpage));
  },
  frames: async ({ wpage }, use) => {
    await use(new Frames(wpage));
  },
  listAndGrid: async ({ wpage }, use) => {
    await use(new ListAndGrid(wpage));
  },
  menu: async ({ wpage }, use) => {
    await use(new Menu(wpage));
  },
  practiseForm: async ({ wpage }, use) => {
    await use(new PractiseForm(wpage));
  },
  progressBar: async ({ wpage }, use) => {
    await use(new ProgressBar(wpage));
  },
  uploadAndDownload: async ({ wpage }, use) => {
    await use(new UploadAndDownload(wpage));
  },
  webTables: async ({ wpage }, use) => {
    await use(new WebTables(wpage));
  },
});
export const test = testPages;
export const expect = testPages.expect;
