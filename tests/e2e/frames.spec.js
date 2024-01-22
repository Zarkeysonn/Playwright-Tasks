import { test } from "../../modules/base";

test.describe("Validating frames", async () => {
  test("e2e frame1", async ({ wpage, frames }) => {
    await wpage.goto("/frames");
    await frames.getFrame1AndAssertContent();
  });

  test("e2e frame2", async ({ wpage, frames }) => {
    await wpage.goto("/frames");
    await frames.getFrame2AndAssertContent();
  });
});
