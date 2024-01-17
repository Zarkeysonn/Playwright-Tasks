import { test, expect } from "../../modules/base";

test.describe("Happy flow", async () => {
  test("e2e web tables", async ({ wpage, webTables }) => {
    await wpage.goto("/webtables");
    await webTables.fillRegistrationFormAndSubmit({});
    await webTables.editRecordInTable(1);
  });
});

test.describe("Bad flow", async () => {
  let modalRegistration;
  test.beforeEach(async ({ wpage, webTables }) => {
    await wpage.goto("/webtables");
    await webTables.clickAddButton();
    modalRegistration = await webTables.modalWindow;
    expect(modalRegistration).toBeVisible();
    expect(webTables.modalSubmitButton).toBeEnabled();
  });
  test("First name field is empty", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({
      firstName: "",
      success: false,
    });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Last name field is empty", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({
      lastName: "",
      success: false,
    });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Email field is empty", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({
      email: "",
      success: false,
    });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Age field is empty", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({ age: "", success: false });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Age field is string character", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({ age: "a", success: false });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Salary field is empty", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({
      salary: "",
      success: false,
    });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Salary field is string character", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({
      salary: "a",
      success: false,
    });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Department field is empty", async ({ webTables }) => {
    await webTables.fillRegistrationFormAndSubmit({
      department: "",
      success: false,
    });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
});

test.describe("Edit record in table", async () => {
  let modalRegistration;
  test.beforeEach(async ({ webTables, wpage }) => {
    modalRegistration = await webTables.modalWindow;
    await wpage.goto("/webtables");
  });
  test("Change first name", async ({ webTables }) => {
    await webTables.editRecordInTable(1);
    await webTables.editFirstNameField({ text: "MicaPita" });
  });
});
