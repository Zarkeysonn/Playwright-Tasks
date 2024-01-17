const { expect } = require("@playwright/test");

class ListAndGrid {
  constructor(page) {
    this.page = page;
    this.itemList = page.locator("#demo-tabpane-list > div > div"); //count 6 initially
    this.gridTab = page.locator("#demo-tab-grid");
  }

  async getCurrentList() {
    const itemListLocator = `#demo-tabpane-list > div > div`;
    const arrayAfter = [];

    const itemListAfter = await this.page.$$(itemListLocator);
    if (itemListAfter.length > 0) {
      for (const item1 of itemListAfter) {
        const text1 = await item1.innerText();
        arrayAfter.push(text1);
      }
    }
    return arrayAfter;
  }

  async getGridItemList() {
    const array = [];
    const itemListLocator = `#demo-tabpane-grid > div > div > div`;
    const itemList = await this.page.$$(itemListLocator);
    if (itemList.length > 0) {
      for (const item of itemList) {
        const text = await item.innerText();
        array.push(text);
      }
    } else {
      console.log("No items found with the specified locator.");
    }
    return array;
  }

  async getIndexOfItem(item, array) {
    var indexOfItem2AfterDrag;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) {
        indexOfItem2AfterDrag = i;
        break;
      }
    }
    return indexOfItem2AfterDrag;
  }

  async dragItemInList({ item1, item2, listOrGrid = "list" }) {
    switch (listOrGrid) {
      case "list":
        const locatorItem1 = await this.page.locator(
          `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item1})`
        );
        const itemText1 = await locatorItem1.textContent();
        const locatorItem2 = await this.page.locator(
          `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item2})`
        );
        const itemText2 = await locatorItem2.textContent();
        var listLocators = {
          locatorItem1,
          itemText1,
          locatorItem2,
          itemText2,
        };
        const arrayBefore = await this.getCurrentList();
        var index2Before = await this.getIndexOfItem(
          listLocators.itemText2,
          arrayBefore
        );
        await expect(listLocators.locatorItem1).toHaveText(
          listLocators.itemText1
        );
        await expect(listLocators.locatorItem2).toHaveText(
          listLocators.itemText2
        );
        await listLocators.locatorItem1.dragTo(listLocators.locatorItem2);
        const afterArray = await this.getCurrentList();
        var index2After = await this.getIndexOfItem(
          listLocators.itemText2,
          afterArray
        );
        var index1After = await this.getIndexOfItem(
          listLocators.itemText1,
          afterArray
        );
        break;
      case "grid":
        await this.gridTab.click();
        const gridLocatorItem1 = await this.page.locator(
          `#demo-tabpane-grid > div > div > div:nth-child(${item1})`
        );
        const gridItemText1 = await gridLocatorItem1.textContent();
        const gridLocatorItem2 = await this.page.locator(
          `#demo-tabpane-grid > div > div > div:nth-child(${item2})`
        );
        const gridItemText2 = await gridLocatorItem2.textContent();
        var gridLocators = {
          gridLocatorItem1,
          gridItemText1,
          gridLocatorItem2,
          gridItemText2,
        };
        const arrayBeforeGrid = await this.getGridItemList();
        var indexOfItem2BeforeDrag = await this.getIndexOfItem(
          gridLocators.gridItemText2,
          arrayBeforeGrid
        );
        await expect(gridLocators.gridLocatorItem1).toHaveText(
          gridLocators.gridItemText1
        );
        await expect(gridLocators.gridLocatorItem2).toHaveText(
          gridLocators.gridItemText2
        );
        await gridLocators.gridLocatorItem1.dragTo(
          gridLocators.gridLocatorItem2
        );
        var arrayAfterGrid = await this.getGridItemList();
        var index2AfterGrid = await this.getIndexOfItem(
          gridLocators.gridItemText2,
          arrayAfterGrid
        );
    }
    if (listOrGrid === "list") {
      if (item1 > item2) {
        expect(index2After).toEqual(index2Before + 1);
      } else {
        expect(index2After).toEqual(index2Before - 1);
      }
      await expect(await listLocators.locatorItem2).toHaveText(
        await listLocators.itemText1
      );
      expect(index1After).toEqual(index2Before);
    }
    if (listOrGrid === "grid") {
      if (item1 > item2) {
        expect(index2AfterGrid).toEqual(indexOfItem2BeforeDrag + 1);
      } else {
        expect(index2AfterGrid).toEqual(indexOfItem2BeforeDrag - 1);
      }
      await expect(await gridLocators.gridLocatorItem2).toHaveText(
        await gridLocators.gridItemText1
      );
    }
  }
}
module.exports = { ListAndGrid };
