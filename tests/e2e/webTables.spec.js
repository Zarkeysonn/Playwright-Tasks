const { test, expect } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Happy flow", async () => {
  test("e2e web tables", async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/webtables");
    const webTables = poManager.getWebTables();
    await webTables.fillRegistrationFormAndSubmit({});
    // funkcija za edit :) za ovo ispod
    await webTables.editRecordInTable(1);
    await page.pause();
  });
});

test.describe("Bad flow", async () => {
  let webTables;
  let modalRegistration;
  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/webtables");
    webTables = poManager.getWebTables();
    await webTables.clickAddButton();
    modalRegistration = await webTables.modalWindow;
    expect(modalRegistration).toBeVisible();
    expect(webTables.modalSubmitButton).toBeEnabled();
  });
  test("First name field is empty", async () => {
    await webTables.fillModalRegistrationForm({ firstName: "" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Last name field is empty", async () => {
    await webTables.fillModalRegistrationForm({ lastName: "" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Email field is empty", async () => {
    await webTables.fillModalRegistrationForm({ email: "" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Age field is empty", async () => {
    await webTables.fillModalRegistrationForm({ age: "" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Age field is string character", async () => {
    await webTables.fillModalRegistrationForm({ age: "a" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Salary field is empty", async () => {
    await webTables.fillModalRegistrationForm({ salary: "" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Salary field is string character", async () => {
    await webTables.fillModalRegistrationForm({ salary: "a" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
  test("Department field is empty", async () => {
    await webTables.fillModalRegistrationForm({ department: "" });
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).toBeVisible();
  });
});

test.describe("Edit record in table", async () => {
  let webTables;
  let modalRegistration;
  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    webTables = poManager.getWebTables();
    modalRegistration = await webTables.modalWindow;
    await page.goto("/webtables");
    webTables = poManager.getWebTables();
  });
  test("Change first name", async () => {
    await webTables.editRecordInTable(1);
    await webTables.editFirstNameField({ text: "MicaPita" });
  });
});
