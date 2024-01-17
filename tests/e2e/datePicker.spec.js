import { test } from "../../modules/base";

//const { test } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Date picker", async () => {
  //let datePicker;
  test.beforeEach(async ({ wpage }) => {
    //const poManager = new POManager(page);
    await wpage.goto("/date-picker");
    // datePicker = poManager.getDatePicker();
  });
  test("Date before this day", async ({ datePicker }) => {
    await datePicker.selectDate(17, "June 2023");
  });

  test("Date with fill method", async () => {
    await datePicker.fillSecondDateWithFillMethod("06/17/2021");
  });
});
