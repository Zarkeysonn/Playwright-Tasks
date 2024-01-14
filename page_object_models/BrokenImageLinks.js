import { expect } from "@playwright/test";

class BrokenImageLinks {
  constructor(page) {
    this.page = page;
    this.brokenImage = page.locator('[src="/images/Toolsqa_1.jpg"]');
  }

  async isImageBroken() {
    const image = await this.page.waitForSelector(
      '[src="/images/Toolsqa_1.jpg"]'
    );
    if (image) {
      const naturalWidth = await image.getProperty("naturalWidth");
      const width = await naturalWidth.jsonValue();

      return width > 50 ? false : true;
    }
  }
}

module.exports = { BrokenImageLinks };
