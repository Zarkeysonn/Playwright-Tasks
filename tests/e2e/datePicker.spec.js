import { test } from "../../modules/base";

test.describe("Date picker", async () => {
  test.beforeEach(async ({ wpage }) => {
    await wpage.goto("/date-picker");
  });
  test("Date before this day", async ({ datePicker }) => {
    await datePicker.selectDate(27, "June 2022");
  });

  test("Date with fill method", async ({ datePicker }) => {
    await datePicker.fillSecondDateWithFillMethod("06/17/2021");
  });
});
