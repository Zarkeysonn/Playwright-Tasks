import { expect } from "@playwright/test";
import moment from "moment";

export class DatePicker {
  constructor(page) {
    this.page = page;
    this.datePicker = page.locator("#datePickerMonthYearInput"); // mm dd yyyy
    this.afterDatePicker = page.locator("#datePickerMonthYear");
    this.nextMonthButton = page.locator('[aria-label="Next Month"]');
    this.previousMonthButton = page.locator('[aria-label="Previous Month"]');
  }

  async selectDate(date, dateToSelect) {
    await this.datePicker.click();
    const mmYY = this.page.locator(`.react-datepicker__current-month`);
    await expect(await mmYY).toBeVisible();
    this.datePicker.click();
    const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
    while ((await mmYY.textContent()) != dateToSelect) {
      if (thisMonth) {
        await this.previousMonthButton.click();
      } else {
        await this.nextMonthButton.click();
      }
    }
    await this.page.click(`//div[text()="${date}"]`);
    await await this.page.pause();
    await expect(await mmYY).not.toBeVisible();
    await expect(this.datePicker).not.toBeEmpty();
  }

  async getCurrentDate() {
    const options = { year: "numeric", month: "long" };
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", options);
  }

  async fillSecondDateWithFillMethod(date) {
    await this.datePicker.fill(date);
    expect(this.datePicker).toHaveValue(date);
  }
}
