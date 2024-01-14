const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Validate download and upload buttons", async () => {
  let poManager;
  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await page.goto("/upload-download");
  });
  test("download", async () => {
    const download = poManager.getUploadAndDownload();
    await download.downloadFile();
  });

  test("upload", async () => {
    const upload = poManager.getUploadAndDownload();
    await upload.uploadFile();
  });
});
