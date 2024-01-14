const { expect } = require("@playwright/test");

class Frames {
  constructor(page) {
    this.page = page;
  }

  async getFrame1AndAssertContent() {
    const frame = this.page.frameLocator("#frame1");
    const frameContentLocator = await frame.locator("h1");
    expect(await frameContentLocator).toBeVisible();
    const frameContent = await frameContentLocator.textContent();
    expect(await frameContent).not.toBe("");
    await expect(frameContentLocator).toContainText(frameContent);
  }

  async getFrame2AndAssertContent() {
    const frame1 = this.page.frameLocator("#frame2");
    const frameContentLocator = await frame1.locator("h1");
    expect(await frameContentLocator).toBeVisible();
    const frameContent = await frameContentLocator.textContent();
    expect(await frameContent).not.toBe("");
    await expect(frameContentLocator).toContainText(frameContent);
  }
}
module.exports = { Frames };
