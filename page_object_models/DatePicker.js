import { expect } from "@playwright/test";
import moment from "moment";

class DatePicker {
  constructor(page) {
    this.page = page;
    this.datePicker = page.locator("#datePickerMonthYearInput"); // mm dd yyyy
    this.afterDatePicker = page.locator("#datePickerMonthYear");
    this.nextMonthButton = page.locator('[aria-label="Next Month"]');
    this.previousMonthButton = page.locator('[aria-label="Previous Month"]');
  }

  async selectDate(date, dateToSelect) {
    const mmYY = this.page.locator(
      '//*[@id="datePickerMonthYear"]/div[2]/div[2]/div/div/div[2]/div[1]/div[1]'
    );
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
  }

  async fillSecondDateWithFillMethod(date) {
    await this.datePicker.fill(date);
    expect(this.datePicker).toHaveValue(date);
  }
}
module.exports = { DatePicker };
