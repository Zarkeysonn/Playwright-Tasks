import { expect } from "@playwright/test";
import data from "../fixtures/e2e_data.json";

export class WebTables {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('[id="addNewRecordButton"]');
    this.table = page.locator('[role="grid"]');
    this.modalWindow = page.locator('[id="registration-form-modal"]');
    this.modalFirstName = page.locator('[id="firstName"]');
    this.modalLastName = page.locator('[id="lastName"]');
    this.modalEmail = page.locator('[id="userEmail"]');
    this.modalAge = page.locator('[id="age"]');
    this.modalSalary = page.locator('[id="salary"]');
    this.modalDepartment = page.locator('[id="department"]');
    this.modalSubmitButton = page.locator('[id="submit"]');
    this.tableRow = page.locator('[role="rowgroup"] div div div');
  }

  async getNumberOfTableRows() {
    const numOfRows = await this.page
      .locator('[role="rowgroup"] div div div')
      .count();
    return numOfRows;
  }

  async clickAddButton() {
    await this.addButton.click({ force: true });
  }

  async editFirstNameField({ text, successEdit = true }) {
    await expect(this.modalFirstName).toBeVisible();
    await this.modalFirstName.fill("");
    await this.modalFirstName.fill(text);
    await this.modalSubmitButton.click();
    if (successEdit == true) {
      await expect(this.modalWindow).not.toBeVisible();
      await expect(this.table).toContainText(text);
    } else {
      await expect(this.modalWindow).toBeVisible();
    }
  }

  async editRecordInTable(row) {
    await expect(this.table).toBeVisible();
    await this.page.locator(`[id="edit-record-${row}"]`).click({ force: true });
    await expect(this.modalWindow).toBeVisible();
  }

  async fillRegistrationFormAndSubmit({
    firstName = data.firstName,
    lastName = data.lastName,
    email = data.email,
    age = data.age,
    salary = data.salary,
    department = data.department,
    success = true,
  }) {
    const numOfRowsBefore = await this.getNumberOfTableRows();
    await this.clickAddButton();
    const modalRegistration = await this.modalWindow;
    expect(await modalRegistration).toBeVisible();
    await this.modalFirstName.type(firstName);
    await this.modalLastName.type(lastName);
    await this.modalEmail.type(email);
    await this.modalAge.type(age);
    await this.modalSalary.type(salary, { force: true });
    await this.modalDepartment.type(department);
    await this.modalSubmitButton.click();
    const numOFRowAfter = await this.getNumberOfTableRows();
    if (success == true) {
      await expect(modalRegistration).not.toBeVisible();
      expect(numOFRowAfter).toEqual(numOfRowsBefore + 1);
    } else {
      await expect(modalRegistration).toBeVisible();
      expect(numOFRowAfter).toEqual(numOfRowsBefore);
    }
  }
}
