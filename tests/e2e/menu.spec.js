import { test } from "../../modules/base";

test.describe("Menu", async () => {
  let menu;
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/menu#");
  });
  test("Date before this day", async ({ menu }) => {
    await menu.getToSubSubList();
  });
});
