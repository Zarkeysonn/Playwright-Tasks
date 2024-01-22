const { expect } = require("@playwright/test");

export class UploadAndDownload {
  constructor(page) {
    this.page = page;
    this.downloadButton = page.locator("#downloadButton");
    this.uploadButton = page.locator("#uploadFile");
    this.uploadedFile = page.locator("#uploadedFilePath");
  }

  // click on download and save file in folder 'downloads'
  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadButton.click(),
    ]);
    const fileName = await download.suggestedFilename();
    await download.saveAs("./tests/downloads/" + fileName);
    expect(fileName).toBe("sampleFile.jpeg");
  }
  // click on upload file and assert that correct file is uploaded
  async uploadFile() {
    const fileName = "sampleFile.jpeg";
    await this.page.setInputFiles(
      "#uploadFile",
      `./tests/downloads/${fileName}`
    );
    await expect(this.uploadedFile).toBeVisible();
    await expect(this.uploadedFile).toContainText(fileName);
  }
}
