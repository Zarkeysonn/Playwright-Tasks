import { test, expect } from "../../modules/base";
import dragDropMssg from "../../fixtures/dragDrop.json";

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test.describe("Droppable page", async () => {
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/droppable");
  });
  test("Simple drag and drop", async ({ dragDrop }) => {
    await dragDrop.draggableToDropabble();
  });

  test("Acceptable drag", async ({ dragDrop }) => {
    const elements = await dragDrop.getAcceptableElementsBounds();
    await dragDrop.moveFromTo(
      elements.acceptableBound,
      elements.dropabbleAcceptableBound
    );
    await dragDrop.assertAcceptableDrag({});
  });

  test("Not acceptable drag", async ({ dragDrop }) => {
    const elements = await dragDrop.getAcceptableElementsBounds();
    await dragDrop.moveFromTo(
      elements.notAcceptableBound,
      elements.dropabbleAcceptableBound
    );
    await dragDrop.assertAcceptableDrag({ bool: false });
  });

  test("Prevent: drag to outter not greedy", async ({ dragDrop }) => {
    await dragDrop.preventTab.click();
    const elements = await dragDrop.getPreventElementsBounds();
    await dragDrop.moveFromToNotCentered(
      elements.dragBoxBound,
      elements.outterNotGreedyBound
    );
    await expect(dragDrop.innerNotGreedy).toHaveText(
      dragDropMssg.innerNotGreedy
    );
  });

  test("Prevent: drag to inner not greedy", async ({ dragDrop }) => {
    await dragDrop.preventTab.click();
    const elements = await dragDrop.getPreventElementsBounds();
    await dragDrop.moveFromTo(
      elements.dragBoxBound,
      elements.innerNotGreedyBound
    );
    await expect(dragDrop.innerNotGreedy).toHaveText(dragDropMssg.dropped);
  });

  test("Prevent: drag to inner greedy", async ({ dragDrop }) => {
    await dragDrop.preventTab.click();
    const elements = await dragDrop.getPreventElementsBounds();
    await dragDrop.moveFromTo(elements.dragBoxBound, elements.innerGreedyBound);
    await expect(dragDrop.innerGreedy).toHaveText(dragDropMssg.dropped);
  });

  test("Prevent: drag to outter greedy", async ({ dragDrop }) => {
    const elements = await dragDrop.getPreventElementsBounds();
    await dragDrop.moveFromToNotCentered(
      elements.dragBoxBound,
      elements.outterGreedyBound
    );
    await expect(dragDrop.outterGreedy).toHaveText(
      dragDropMssg.innerDroppedGreedy
    );
  });

  test("Revert: revertable", async ({ dragDrop }) => {
    const elementsBefore = await dragDrop.getRevertElementsBounds();
    await dragDrop.moveFromTo(
      elementsBefore.revertableBound,
      elementsBefore.revertDroppableBound
    );
    const elementsAfter = await dragDrop.getRevertElementsBounds();
    await expect(dragDrop.revertDroppable).toHaveText(dragDropMssg.dropped);
  });

  test("Revert: non-revertable", async ({ dragDrop }) => {
    const elementsBefore = await dragDrop.getRevertElementsBounds();
    await dragDrop.moveFromTo(
      elementsBefore.notRevertableBound,
      elementsBefore.revertDroppableBound
    );
    const elementsAfter = await dragDrop.getRevertElementsBounds();
    expect(await elementsBefore.notRevertableBound).not.toEqual(
      await elementsAfter.notRevertableBound
    );
    await expect(dragDrop.revertDroppable).toHaveText(dragDropMssg.dropped);
  });
});
