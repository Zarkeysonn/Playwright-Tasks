import { test } from "../../modules/base";

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test("Basic progress bar", async ({ wpage, progressBar }) => {
  await wpage.goto("/progress-bar");
  await progressBar.startThenResetProgressBar();
});
