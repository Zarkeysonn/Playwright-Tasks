const { expect } = require("@playwright/test");
import color from "../fixtures/color_values.json";
import dragDrop from "../fixtures/dragDrop.json";
import folderPath from "../fixtures/folderPath.json";
import data from "../fixtures/e2e_data.json";

export class DroppableAndDragabble {
  constructor(page) {
    this.page = page;
    this.draggable = page.locator("#draggable");
    this.dropabble = page.locator(
      'div[id="droppableExample-tabpane-simple"] div[id="droppable"]'
    );
    this.acceptable = page.locator("#acceptable");
    this.notAcceptable = page.locator("#notAcceptable");
    this.acceptableTab = page.locator("#droppableExample-tab-accept");
    this.dropabbleAcceptable = page.locator(
      'div[id="droppableExample-tabpane-accept"] div[id="droppable"]'
    );
    this.dragBox = page.locator("#dragBox");
    this.preventTab = page.locator("#droppableExample-tab-preventPropogation");
    this.outterNotGreedy = page.locator("#notGreedyDropBox");
    this.innerNotGreedy = page.locator("#notGreedyInnerDropBox");
    this.outterGreedy = page.locator("#greedyDropBox");
    this.innerGreedy = page.locator("#greedyDropBoxInner");
    this.revertTab = page.locator("#droppableExample-tab-revertable");
    this.revertable = page.locator("#revertable");
    this.notRevertable = page.locator("#notRevertable");
    this.revertDroppable = page.locator(
      'div[id="revertableDropContainer"] div[id="droppable"]'
    );
    this.dragMeSimple = page.locator("#dragBox");
    this.axisRestrictedTab = page.locator(
      "#draggableExample-tab-axisRestriction"
    );
    this.onlyX = page.locator("#restrictedX");
    this.onlyY = page.locator("#restrictedY");
    this.restrictedTab = page.locator(
      "#draggableExample-tab-containerRestriction"
    );
    this.restrictedWithinBox = page.locator("#containmentWrapper > div");
    this.restrictedContainmentWrapper = page.locator("#containmentWrapper");
    this.stickToCenter = page.locator("#cursorCenter");
    this.stickToLeft = page.locator("#cursorTopLeft");
    this.stickToBottom = page.locator("#cursorBottom");
  }

  async getCurrentCursor({ element, expectedCursorStyle = data.cursor.auto }) {
    if (element) {
      const elementBound = await element.boundingBox();
      await this.page.mouse.move(elementBound.x, elementBound.y);
      await this.page.mouse.down();
      await this.page.mouse.move(elementBound.x + 15, elementBound.y);
      const cursorStyle = await this.page.evaluate(() => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        return computedStyle.cursor;
      });
      expect(await element).toBeVisible();
      expect(await cursorStyle).toBe(expectedCursorStyle);
    }
  }

  async getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
  }

  async moveOnlyOnAxis({ element, axiValue }) {
    await this.axisRestrictedTab.click();
    const elementBoundBeforeDrag = await element.boundingBox();
    await expect(this.onlyX).toBeVisible();
    if (element === this.onlyX) {
      await this.page.screenshot({
        path: folderPath.beforeAxiX,
      });
      await this.page.mouse.move(
        await elementBoundBeforeDrag.x,
        await elementBoundBeforeDrag.y
      );
      await this.page.mouse.down();
      await this.page.mouse.move(
        (await elementBoundBeforeDrag.x) + axiValue,
        await elementBoundBeforeDrag.y
      );
      await this.page.mouse.up();
      await this.page.screenshot({
        path: folderPath.afterAxiX,
      });
    } else {
      await this.page.screenshot({
        path: folderPath.beforeAxiY,
      });
      await this.page.mouse.move(
        await elementBoundBeforeDrag.x,
        await elementBoundBeforeDrag.y
      );
      await this.page.mouse.down();
      await this.page.mouse.move(
        await elementBoundBeforeDrag.x,
        (await elementBoundBeforeDrag.y) + axiValue
      );
      await this.page.mouse.up();
      await this.page.screenshot({
        path: folderPath.afterAxiY,
      });
      const elementBoundAfterDrag = await element.boundingBox();
      if (element === this.onlyX) {
        expect(await elementBoundAfterDrag.x).toEqual(
          (await elementBoundBeforeDrag.x) + axiValue
        );
      } else {
        expect(await elementBoundAfterDrag.y).toEqual(
          (await elementBoundBeforeDrag.y) + axiValue
        );
      }
    }
  }

  async getRevertElementsBounds() {
    await this.revertTab.click();
    await expect(this.revertable).toBeVisible();
    await expect(this.notRevertable).toBeVisible();
    await expect(this.revertDroppable).toBeVisible();
    if (this.revertable && this.notRevertable && this.dropabbleAcceptable) {
      var revertableBound = await this.revertable.boundingBox();
      var notRevertableBound = await this.notRevertable.boundingBox();
      var revertDroppableBound = await this.revertDroppable.boundingBox();
    }
    return { revertableBound, notRevertableBound, revertDroppableBound };
  }

  async moveFromTo(obj1, obj2) {
    await this.page.mouse.move(
      (await obj1.x) + (await obj1.width) / 2,
      (await obj1.y) + (await obj1.height) / 2
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      (await obj2.x) + (await obj2.width) / 2,
      (await obj2.y) + (await obj2.height) / 2
    );
    await this.page.mouse.up();
  }

  async moveFromToNotCentered(obj1, obj2) {
    await this.page.mouse.move(await obj1.x, await obj1.y);
    await this.page.mouse.down();
    await this.page.mouse.move(await obj2.x, await obj2.y);
    await this.page.mouse.up();
  }

  async dragElement(element, xValue, yValue) {
    const elementBoundBeforeDrag = await element.boundingBox();
    await this.page.screenshot({
      path: folderPath.dragElementBefore,
    });
    await this.page.mouse.move(
      await elementBoundBeforeDrag.x,
      await elementBoundBeforeDrag.y
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      (await elementBoundBeforeDrag.x) + xValue,
      (await elementBoundBeforeDrag.y) + yValue
    );
    const elementBoundAfterDrag = await element.boundingBox();
    await this.page.screenshot({
      path: folderPath.dragElementAfter,
    });
    await this.page.mouse.up();
    expect(await elementBoundBeforeDrag).not.toEqual(
      await elementBoundAfterDrag
    );
  }

  async getAcceptableElementsBounds() {
    await this.acceptableTab.click();
    await expect(this.acceptable).toBeVisible();
    await expect(this.notAcceptable).toBeVisible();
    await expect(this.dropabbleAcceptable).toBeVisible();
    if (this.acceptable && this.notAcceptable && this.dropabbleAcceptable) {
      var acceptableBound = await this.acceptable.boundingBox();
      var notAcceptableBound = await this.notAcceptable.boundingBox();
      var dropabbleAcceptableBound =
        await this.dropabbleAcceptable.boundingBox();
    }
    return { acceptableBound, notAcceptableBound, dropabbleAcceptableBound };
  }

  async getPreventElementsBounds() {
    await this.preventTab.click();
    await expect(this.dragBox).toBeVisible();
    await expect(this.outterNotGreedy).toBeVisible();
    await expect(this.innerNotGreedy).toBeVisible();
    await expect(this.outterGreedy).toBeVisible();
    await expect(this.innerGreedy).toBeVisible();
    if (this.outterNotGreedy && this.innerNotGreedy) {
      var dragBoxBound = await this.dragBox.boundingBox();
      var outterNotGreedyBound = await this.outterNotGreedy.boundingBox();
      var innerNotGreedyBound = await this.innerNotGreedy.boundingBox();
      var outterGreedyBound = await this.outterGreedy.boundingBox();
      var innerGreedyBound = await this.innerGreedy.boundingBox();
    }
    return {
      dragBoxBound,
      outterNotGreedyBound,
      innerNotGreedyBound,
      outterGreedyBound,
      innerGreedyBound,
    };
  }

  async assertAcceptableDrag({ bool = true }) {
    await this.acceptableTab.click();
    if (bool) {
      await expect(await this.dropabbleAcceptable).toHaveText(dragDrop.dropped);
      await expect(this.dropabbleAcceptable).toHaveCSS(
        "background-Color",
        color.steelBlue
      );
    } else {
      await expect(await this.dropabbleAcceptable).toHaveText(
        dragDrop.dropHere
      );
      await expect(await this.dropabbleAcceptable).toHaveCSS(
        "background-Color",
        color.white
      );
    }
  }

  async draggableToDropabble() {
    if (this.draggable && this.dropabble) {
      const draggableBound = await this.draggable.boundingBox();
      const dropabbleBound = await this.dropabble.boundingBox();
      await expect(await this.dropabble).toHaveText(dragDrop.dropHere);
      await expect(await this.dropabble).toHaveCSS(
        "background-Color",
        color.white
      );
      if (draggableBound && dropabbleBound) {
        await this.moveFromTo(draggableBound, dropabbleBound);
        await expect(await this.dropabble).toHaveCSS(
          "background-Color",
          color.steelBlue
        );
        await expect(await this.dropabble).toHaveText(dragDrop.dropped);
      } else {
        throw new Error("No Element");
      }
    }
  }
}
