import { expect } from "@playwright/test";
import { test } from "../../modules/base";
import data from "../../fixtures/e2e_data.json";

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test.describe("Dragabble page", async () => {
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/dragabble");
  });
  test("Simple drag", async ({ dragDrop }) => {
    await dragDrop.dragElement(dragDrop.dragMeSimple, 75, 100);
  });

  test("Only X axi drag", async ({ dragDrop }) => {
    await dragDrop.moveOnlyOnAxis({
      element: dragDrop.onlyX,
      axiValue: 150,
    });
  });

  test("Only Y axi drag", async ({ dragDrop }) => {
    await dragDrop.moveOnlyOnAxis({
      element: dragDrop.onlyY,
      axiValue: 150,
    });
  });

  test("Compare screenshots", async ({ dragDrop, wpage }) => {
    await dragDrop.restrictedTab.click({ force: true });
    await expect(dragDrop.restrictedContainmentWrapper).toBeVisible();
    await wpage.evaluate(() => document.fonts.ready);
    const beforeShow =
      await await dragDrop.restrictedContainmentWrapper.screenshot({
        path: "screenshotsFolder/screenshotBeforeRestricted.png",
      });
    const elementUnoBound = await dragDrop.restrictedWithinBox.boundingBox();
    const elementDueBound =
      await dragDrop.restrictedContainmentWrapper.boundingBox();
    await dragDrop.moveFromTo(elementUnoBound, elementDueBound);
    const afterShot = await wpage.screenshot({
      path: "screenshotsFolder/screenshotAfterRestricted.png",
    });
    expect(await beforeShow).not.toMatchSnapshot(await afterShot);
  });

  test("Move contained box outside of container", async ({ dragDrop }) => {
    await dragDrop.restrictedTab.click();
    await expect(dragDrop.restrictedContainmentWrapper).toBeVisible();
    const elementUnoBound = await dragDrop.restrictedWithinBox.boundingBox();
    await dragDrop.dragElement(dragDrop.restrictedWithinBox, 0, 25);
    const elBoundsAfterMove = await dragDrop.restrictedWithinBox.boundingBox();
    expect((await elBoundsAfterMove.y) - (await elementUnoBound.y)).toEqual(25);
    expect((await elBoundsAfterMove.x) - (await elementUnoBound.x)).toEqual(0);
  });

  test("Get stick to center cursor style", async ({ dragDrop, wpage }) => {
    await wpage.goto("/dragabble");
    await wpage.click("#draggableExample-tab-cursorStyle", { force: true });
    await dragDrop.getCurrentCursor({
      element: dragDrop.stickToCenter,
      expectedCursorStyle: data.cursor.move,
    });
  });

  test("Get stick top left cursor style", async ({ dragDrop, wpage }) => {
    await wpage.goto("dragabble");
    await wpage.click("#draggableExample-tab-cursorStyle", { force: true });
    await dragDrop.getCurrentCursor({
      element: dragDrop.stickToLeft,
      expectedCursorStyle: data.cursor.crosshair,
    });
  });

  test("Get stick to bottom cursor style", async ({ dragDrop, wpage }) => {
    await wpage.goto("/dragabble");
    await wpage.click("#draggableExample-tab-cursorStyle", { force: true });
    await dragDrop.getCurrentCursor({
      element: dragDrop.stickToBottom,
      expectedCursorStyle: data.cursor.auto,
    });
  });
});
