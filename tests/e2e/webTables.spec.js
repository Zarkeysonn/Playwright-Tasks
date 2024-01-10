const { test, expect } = require("@playwright/test");
const { POManager } = require("../../page_object_models/POManager");

test.describe("Happy flow", async () => {
  test("e2e web tables", async ({ page }) => {
    const poManager = new POManager(page);
    await page.goto("/webtables");
    const webTables = poManager.getWebTables();
    const numOFRowBefore = await webTables.getNumberOfTableRows();
    await webTables.clickAddButton();
    const modalRegistration = await webTables.modalWindow;
    expect(await modalRegistration).toBeVisible();
    expect(await webTables.modalSubmitButton).toBeEnabled();
    await webTables.fillModalRegistrationForm({});
    await webTables.modalSubmitButton.click();
    await expect(modalRegistration).not.toBeVisible();
    await webTables.editRecordInTable(1);
    await expect(modalRegistration).toBeVisible();
    const numOFRowAfter = await webTables.getNumberOfTableRows();
    expect(numOFRowAfter).toEqual(numOFRowBefore + 1);
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
