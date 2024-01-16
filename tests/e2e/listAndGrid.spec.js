const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Menu", async () => {
  let listAndGrid;
  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/sortable");
    listAndGrid = poManager.getListAndGrid();
  });
  test("item1 < item2", async () => {
    await listAndGrid.dragItemInList({ item1: 1, item2: 5 });
  });

  test("item1 > item 2", async () => {
    await listAndGrid.dragItemInList({ item1: 5, item2: 2 });
  });

  test("GRID: item1 > item 2", async () => {
    await listAndGrid.dragItemInList({
      item1: 5,
      item2: 2,
      listOrGrid: "grid",
    });
  });

  test("GRID: item1 < item 2", async () => {
    await listAndGrid.dragItemInList({
      item1: 1,
      item2: 4,
      listOrGrid: "grid",
    });
  });
});
