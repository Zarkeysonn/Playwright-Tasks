import data from "../fixtures/e2e_data.json";

class WebTables {
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
  }

  async getNumberOfTableRows() {
    const numOfRows = await this.page
      .locator('[role="rowgroup"] div div div')
      .count();
    return numOfRows;
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async editRecordInTable(row) {
    await this.page.locator(`[id="edit-record-${row}"]`).click({ force: true });
  }

  async fillModalRegistrationForm({
    firstName = data.firstName,
    lastName = data.lastName,
    email = data.email,
    age = data.age,
    salary = data.salary,
    department = data.department,
  }) {
    await this.modalFirstName.type(firstName);
    await this.modalLastName.type(lastName);
    await this.modalEmail.type(email);
    await this.modalAge.type(age);
    await this.modalSalary.type(salary, { force: true });
    await this.modalDepartment.type(department);
  }
}
module.exports = { WebTables };
