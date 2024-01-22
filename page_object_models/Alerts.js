import { expect } from "@playwright/test";
import data from "../fixtures/e2e_data.json";

export class Alerts {
  constructor(page) {
    this.page = page;
    this.instantAlert = page.locator("#alertButton");
    this.timerAlert = page.locator("#timerAlertButton");
    this.confirmBox = page.locator("#confirmButton");
    this.confirmResult = page.locator("#confirmResult");
    this.promptBox = page.locator("#promtButton");
    this.promptResult = page.locator("#promptResult");
  }

  async handleInstantAlert() {
    // Enabling dialog window handler
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain(data.alert);
      expect(dialog.message()).toContain(data.clickButtonMssg);
      await dialog.accept();
    });
    await this.instantAlert.click();
  }

  async handleTimerAlert() {
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain(data.alert);
      expect(dialog.message()).toContain(data.dialogAlertMssg);
      await dialog.accept();
    });
    await this.timerAlert.click();
    await this.page.waitForTimeout(5000);
    await expect(this.timerAlert).toBeVisible();
  }

  async confirmAlert() {
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain(data.confirm);
      expect(dialog.message()).toContain(data.dialogQuestion);
      await dialog.accept();
    });
    await this.confirmBox.click();
    expect(await this.confirmResult).toContainText(data.OkSelected);
  }

  async promptAlert(someText) {
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain(data.prompt);
      expect(dialog.message()).toContain(data.pleaseEnterName);
      await dialog.accept(someText);
    });
    this.promptBox.click();
    await expect(this.promptResult).toContainText(someText);
  }
}
