const { expect } = require("@playwright/test");

class ListAndGrid {
  constructor(page) {
    this.page = page;
    this.itemList = page.locator("#demo-tabpane-list > div > div"); //count 6 initially
    this.gridTab = page.locator("#demo-tab-grid");
  }

  async dragItemInList({ item1, item2, listOrGrid = "list" }) {
    switch (listOrGrid) {
      case "list":
        var locatorItem1 = await this.page.locator(
          `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item1})`
        );
        var itemText1 = await this.page
          .locator(
            `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item1})`
          )
          .textContent();

        var itemText2 = await this.page
          .locator(
            `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item2})`
          )
          .textContent();
        var locatorItem2 = await this.page.locator(
          `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item2})`
        );
        var arrayBefore = [];

        var itemListLocator = `#demo-tabpane-${listOrGrid} > div > div`;

        var itemList = await this.page.$$(itemListLocator);
        if (itemList.length > 0) {
          for (const item of itemList) {
            const text = await item.innerText();
            arrayBefore.push(text);
          }
        } else {
          console.log("No items found with the specified locator.");
        }

        var indexOfItem2BeforeDrag;
        for (let i = 0; i < arrayBefore.length; i++) {
          if (arrayBefore[i] === itemText2) {
            indexOfItem2BeforeDrag = i;
            break;
          }
        }

        await expect(locatorItem1).toHaveText(itemText1);
        await expect(locatorItem2).toHaveText(itemText2);
        await this.page
          .locator(
            `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item1})`
          )
          .dragTo(
            this.page.locator(
              `#demo-tabpane-${listOrGrid} > div > div:nth-child(${item2})`
            )
          );

        const arrayAfter = [];

        const itemListAfter = await this.page.$$(itemListLocator);
        if (itemListAfter.length > 0) {
          for (const item1 of itemListAfter) {
            const text1 = await item1.innerText();
            arrayAfter.push(text1);
          }
        }

        var indexOfItem2AfterDrag;
        for (let i = 0; i < arrayAfter.length; i++) {
          if (arrayAfter[i] === itemText2) {
            indexOfItem2AfterDrag = i;
            break;
          }
        }

        var indexOfItem1AfterDrag;
        for (let i = 0; i < arrayAfter.length; i++) {
          if (arrayAfter[i] === itemText1) {
            indexOfItem1AfterDrag = i;
            break;
          }
        }

        break;

      case "grid":
        await this.gridTab.click();
        locatorItem1 = await this.page.locator(
          `#demo-tabpane-${listOrGrid} > div > div > div:nth-child(${item1})`
        );
        itemText1 = await this.page
          .locator(
            `#demo-tabpane-${listOrGrid} > div > div > div:nth-child(${item1})`
          )
          .textContent();

        itemText2 = await this.page
          .locator(
            `#demo-tabpane-${listOrGrid} > div > div > div:nth-child(${item2})`
          )
          .textContent();
        locatorItem2 = await this.page.locator(
          `#demo-tabpane-${listOrGrid} > div > div > div:nth-child(${item2})`
        );
        arrayBefore = [];

        itemListLocator = `#demo-tabpane-${listOrGrid} > div > div > div`;

        itemList = await this.page.$$(itemListLocator);
        if (itemList.length > 0) {
          for (const item of itemList) {
            const text = await item.innerText();
            arrayBefore.push(text);
          }
        } else {
          console.log("No items found with the specified locator.");
        }

        var indexOfItem2BeforeDrag;
        for (let i = 0; i < arrayBefore.length; i++) {
          if (arrayBefore[i] === itemText2) {
            indexOfItem2BeforeDrag = i;
            break;
          }
        }

        await expect(locatorItem1).toHaveText(itemText1);
        await expect(locatorItem2).toHaveText(itemText2);
        await this.page
          .locator(
            `#demo-tabpane-${listOrGrid} > div > div > div:nth-child(${item1})`
          )
          .dragTo(
            this.page.locator(
              `#demo-tabpane-${listOrGrid} > div > div > div:nth-child(${item2})`
            )
          );

        var arrayAfterGrid = [];

        const itemListAfterGrid = await this.page.$$(itemListLocator);
        if (itemListAfterGrid.length > 0) {
          for (const item1 of itemListAfterGrid) {
            const text1 = await item1.innerText();
            arrayAfterGrid.push(text1);
          }
        }

        for (let i = 0; i < arrayAfterGrid.length; i++) {
          if (arrayAfterGrid[i] === itemText2) {
            indexOfItem2AfterDrag = i;
            break;
          }
        }

        for (let i = 0; i < arrayAfterGrid.length; i++) {
          if (arrayAfterGrid[i] === itemText1) {
            indexOfItem1AfterDrag = i;
            break;
          }
        }
        break;
    }

    if (item1 > item2) {
      expect(indexOfItem2AfterDrag).toEqual(indexOfItem2BeforeDrag + 1);
    } else {
      expect(indexOfItem2AfterDrag).toEqual(indexOfItem2BeforeDrag - 1);
    }
    expect(indexOfItem1AfterDrag).toEqual(indexOfItem2BeforeDrag);
    await expect(await locatorItem2).toHaveText(await itemText1);
  }
}
module.exports = { ListAndGrid };
