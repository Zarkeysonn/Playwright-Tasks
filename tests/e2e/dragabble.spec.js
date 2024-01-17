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
    await wpage.goto("/dragabble");
  });
  test("smoke", async ({ dragDrop }) => {
    //
  });
});
