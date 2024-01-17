import { test } from "../../modules/base";

test.describe("Menu", async () => {
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/sortable");
  });
  test("LIST: item1 < item2", async ({ listAndGrid }) => {
    await listAndGrid.dragItemInList({ item1: 1, item2: 5 });
  });

  test("LIST: item1 > item 2", async ({ listAndGrid }) => {
    await listAndGrid.dragItemInList({ item1: 5, item2: 2 });
  });

  test("GRID: item1 > item 2", async ({ listAndGrid }) => {
    await listAndGrid.dragItemInList({
      item1: 5,
      item2: 2,
      listOrGrid: "grid",
    });
  });

  test("GRID: item1 < item 2", async ({ listAndGrid }) => {
    await listAndGrid.dragItemInList({
      item1: 1,
      item2: 8,
      listOrGrid: "grid",
    });
  });
});
