const { expect } = require("@playwright/test");
import color from "../fixtures/color_values.json";
import dragDrop from "../fixtures/dragDrop.json";

class DroppableAndDragabble {
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
module.exports = { DroppableAndDragabble };
