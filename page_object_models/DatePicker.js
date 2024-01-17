import { expect } from "@playwright/test";
import moment from "moment";

class DatePicker {
  constructor(wpage) {
    this.wpage = wpage;
    this.datePicker = wpage.locator("#datePickerMonthYearInput"); // mm dd yyyy
    this.afterDatePicker = wpage.locator("#datePickerMonthYear");
    this.nextMonthButton = wpage.locator('[aria-label="Next Month"]');
    this.previousMonthButton = wpage.locator('[aria-label="Previous Month"]');
  }

  async selectDate(date, dateToSelect) {
    const mmYY = this.wpage.locator(
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
    await this.wpage.click(`//div[text()="${date}"]`);
  }

  async fillSecondDateWithFillMethod(date) {
    await this.datePicker.fill(date);
    expect(this.datePicker).toHaveValue(date);
  }
}
module.exports = { DatePicker };
