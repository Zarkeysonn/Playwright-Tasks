import { expect } from "@playwright/test";

class Alerts {
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
      expect(dialog.type()).toContain("alert");
      expect(dialog.message()).toContain("You clicked a button");
      await dialog.accept();
    });
    await this.instantAlert.click();
  }

  async handleTimerAlert() {
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("alert");
      expect(dialog.message()).toContain("This alert appeared after 5 seconds");
      await dialog.accept();
    });
    await this.timerAlert.click();
    await this.page.waitForTimeout(5000);
  }

  async confirmAlert() {
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("confirm");
      expect(dialog.message()).toContain("Do you confirm action?");
      await dialog.accept(); // click on Ok
      //await dialog.cancel(); // click on cancel
    });

    await this.confirmBox.click();
    expect(await this.confirmResult).toContainText("You selected Ok");
  }

  async promptAlert(someText) {
    await this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("prompt");
      expect(dialog.message()).toContain("Please enter your name");
      await dialog.accept(someText);
    });
    this.promptBox.click();
    await expect(this.promptResult).toContainText(someText);
  }
}
module.exports = { Alerts };
