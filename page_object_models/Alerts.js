import { expect } from "@playwright/test";

class Alerts {
  constructor(wpage) {
    this.wpage = wpage;
    this.instantAlert = wpage.locator("#alertButton");
    this.timerAlert = wpage.locator("#timerAlertButton");
    this.confirmBox = wpage.locator("#confirmButton");
    this.confirmResult = wpage.locator("#confirmResult");
    this.promptBox = wpage.locator("#promtButton");
    this.promptResult = wpage.locator("#promptResult");
  }

  async handleInstantAlert() {
    // Enabling dialog window handler
    await this.wpage.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("alert");
      expect(dialog.message()).toContain("You clicked a button");
      await dialog.accept();
    });
    await this.instantAlert.click();
  }

  async handleTimerAlert() {
    await this.wpage.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("alert");
      expect(dialog.message()).toContain("This alert appeared after 5 seconds");
      await dialog.accept();
    });
    await this.timerAlert.click();
    await this.wpage.waitForTimeout(5000);
  }

  async confirmAlert() {
    await this.wpage.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("confirm");
      expect(dialog.message()).toContain("Do you confirm action?");
      await dialog.accept(); // click on Ok
      //await dialog.cancel(); // click on cancel
    });

    await this.confirmBox.click();
    expect(await this.confirmResult).toContainText("You selected Ok");
  }

  async promptAlert(someText) {
    await this.wpage.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("prompt");
      expect(dialog.message()).toContain("Please enter your name");
      await dialog.accept(someText);
    });
    this.promptBox.click();
    await expect(this.promptResult).toContainText(someText);
  }
}
module.exports = { Alerts };
