import { expect } from "@playwright/test";
import data from "../fixtures/e2e_data.json";
import path from "path";
import { log } from "console";

class PractiseForm {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.mobileNumber = page.locator("#userNumber");
    this.dateOfBirth = page.locator("#dateOfBirthInput");
    this.chooseFile = page.locator('input[type="file"]');
    this.currentAddress = page.locator("#currentAddress");
    this.state = page.locator("#state");
    this.stateOption = page.locator("#react-select-3-option-0");
    this.city = page.locator("#city");
    this.cityOption = page.locator("#react-select-4-option-0");
    this.submitButton = page.locator("#submit");
    this.userForm = page.locator("#userForm");
    this.subjects = page.locator("#subjectsInput");
    this.table = page.locator("table");
  }

  async selectGender(num) {
    await this.page.evaluate(() => {
      window.scrollBy(0, 40);
    });
    await this.page
      .locator(`[id="gender-radio-${num}"]`)
      .click({ force: true });
    expect(
      await this.page.isChecked(`[id="gender-radio-${num}"]`)
    ).toBeTruthy();
  }

  async dateValue() {
    //
    const dateValu = await this.dateOfBirth.getAttribute("value");
    return dateValu;
  }

  async populateSubjects() {
    await this.subjects.focus();
    const element = await this.page.locator(".subjects-auto-complete__menu");
    await this.subjects.type("ma");
    await element.click();
  }

  async selectState() {
    await this.page.evaluate(() => {
      window.scrollBy(0, 60);
    });
    await this.state.click({ force: true });
    await this.stateOption.click();
  }

  async selectCity() {
    await this.city.click();
    await this.cityOption.click();
  }

  async selectHobbies(num) {
    const hobbies = await this.page
      .locator(`input[id="hobbies-checkbox-${num}"]`)
      .click({ force: true });
    expect(
      await this.page.isChecked(`input[id="hobbies-checkbox-${num}"]`)
    ).toBeTruthy();
  }

  async selectFile() {
    await this.chooseFile.setInputFiles(path.join(__dirname, "testFile.txt"));
  }

  async getMonthFullValue() {
    const dateString = await this.dateValue();
    const dateObject = new Date(dateString);
    const monthInFull = dateObject.toLocaleString("default", { month: "long" });
    return monthInFull;
  }

  async getDateInArray() {
    const dateString = await this.dateValue();
    const dateParts = dateString.split(" ");
    const [day, month, year] = dateParts;
    const resultArray = [day, month, year];
    return resultArray;
  }

  async fillPractiseFormAndValidateData({
    firstName = data.firstName,
    lastName = data.lastName,
    email = data.email,
    mobileNumber = data.mobileNumber,
    hobbies = 1,
    city = data.city,
  }) {
    await expect(this.userForm).toBeVisible();
    await this.firstName.type(firstName);
    const monthValue = await this.getMonthFullValue();
    console.log(monthValue);
    const date = await this.getDateInArray();
    await this.lastName.type(lastName);
    await this.selectGender(1);
    await this.email.type(email);
    await this.mobileNumber.type(mobileNumber);
    await this.populateSubjects();
    await this.selectHobbies(hobbies);
    await this.selectFile();
    await this.currentAddress.type(data.currentAddress);
    await this.selectState();
    await this.selectCity();
    await this.city.type(city);
    await this.submitButton.click({ force: true });
    await expect(this.table).toBeVisible();
    expect(await this.table).toContainText(data.firstName);
    expect(await this.table).toContainText(date[0]);
    expect(await this.table).toContainText(monthValue);
    expect(await this.table).toContainText(date[2]);
    expect(await this.table).toContainText(data.lastName);
    expect(await this.table).toContainText(data.subjects);
    expect(await this.table).toContainText(data.currentAddress);
    expect(await this.table).toContainText(data.stateAndCity);
  }
}
module.exports = { PractiseForm };
