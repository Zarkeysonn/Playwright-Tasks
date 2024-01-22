import { test } from "../../modules/base";

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test.only("Basic", async ({ wpage, practiseForm }) => {
  await wpage.goto("/automation-practice-form");
  await practiseForm.fillPractiseFormAndValidateData({});
});
