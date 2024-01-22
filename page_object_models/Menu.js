import color from "../fixtures/color_values.json";

const { expect } = require("@playwright/test");

export class Menu {
  constructor(page) {
    this.page = page;
    this.menu = page.locator('div [id="nav"]');
    this.mainItem1 = page.locator("#nav > li:nth-child(1)");
    this.mainItem2 = page.locator("#nav > li:nth-child(2)");
    this.mainItem3 = page.locator("#nav > li:nth-child(3)");
    this.subSubList = page.locator(
      "#nav > li:nth-child(2) > ul > li:nth-child(3)"
    );
    this.subSubListItem = page.locator(
      "#nav > li:nth-child(2) > ul > li:nth-child(3) > ul > li:nth-child(1)"
    );
  }

  async getToSubSubList() {
    await expect(this.mainItem1).toHaveCSS("color", color.menuItemColor);
    await expect(this.mainItem2).toHaveCSS("color", color.menuItemColor);
    await expect(this.subSubList).not.toBeVisible();
    await this.mainItem2.hover();
    await expect(this.mainItem1).toHaveCSS("color", color.menuItemColor);
    await expect(this.mainItem2).toHaveCSS(
      "background-Color",
      color.onHoverMenuItemColor
    );
    const subItem = await this.page.locator(
      "#nav > li:nth-child(2) > ul > li:nth-child(1) > a"
    );
    await expect(subItem).toBeVisible();
    await expect(this.subSubList).toHaveCSS("color", color.menuItemColor);
    await this.subSubList.hover();
    await expect(this.subSubList).toHaveCSS(
      "background-Color",
      color.onHoverMenuItemColor
    );
    await expect(this.subSubListItem).toBeVisible();
    await expect(this.subSubListItem).toHaveCSS("color", color.menuItemColor);
    await this.subSubListItem.hover();
    await expect(this.subSubList).toHaveCSS(
      "background-Color",
      color.onHoverMenuItemColor
    );
    await expect(this.subSubListItem).toHaveCSS(
      "background-Color",
      color.onHoverMenuItemColor
    );
  }
}
