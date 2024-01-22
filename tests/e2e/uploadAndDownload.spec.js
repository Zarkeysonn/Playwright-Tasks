import { test } from "../../modules/base";

test.describe("Validate download and upload buttons", async () => {
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/upload-download");
  });
  test("download", async ({ uploadAndDownload }) => {
    await uploadAndDownload.downloadFile();
  });

  test("upload", async ({ uploadAndDownload }) => {
    await uploadAndDownload.uploadFile();
  });
});
