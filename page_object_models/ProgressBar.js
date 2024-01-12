import { expect } from "@playwright/test";
import data from "../fixtures/e2e_data.json";

class ProgressBar {
  constructor(page) {
    this.page = page;
    this.startStopButton = page.locator('[id="startStopButton"]');
    this.resetButton = page.locator('[id="resetButton"]');
    this.progressBar = page.locator('[id="progressBar"]');
  }

  /*
    Asertuj na pocetku dugme i procenat 0%, zatim pusti dok progressBarValue ne dodje
    do npr 69% onda klikni dugme, pa opet klikni da krene i asertuj da je gotovo 
    progressbar 100% i dugme text Reset, klikni na dugme i asertuj text Dugmeta i 
    progressBar value 0%
   */

  async stopOnWantedValue({ value, currentValue, expectedValue }) {
    await this.startStopButton.click();
    await this.page.waitForTimeout(value);
    const progressBarValue = await this.progressBar.getAttribute(
      `aria-valuenow`
    );
    console.log(progressBarValue, "VALUE");
    await this.startStopButton.click();
  }

  async getProgressBarText() {
    const progressBar = await this.page.waitForSelector("#progressBar");
    const progressBarText = await progressBar.textContent();
    return progressBarText ? progressBarText.trim() : null;
  }

  async startThenResetProgressBar() {
    await expect(this.startStopButton).toHaveText(data.buttonStart);
    await this.startStopButton.click();
    await this.page.waitForTimeout(1500);
    await this.startStopButton.click();
    const value = await this.getProgressBarText();
    expect(await value).toEqual("15%");
    await expect(this.startStopButton).toHaveText(data.buttonStart);
    await this.startStopButton.click();
    await this.page.waitForTimeout(8500);
    const newValue = await this.getProgressBarText();
    expect(await newValue).toEqual("100%");
    await expect(this.resetButton).toHaveText(data.buttonReset);
    await this.resetButton.click();
    const resetValue = await this.getProgressBarText();
    await expect(this.startStopButton).toHaveText(data.buttonStart);
    expect(await resetValue).toEqual("0%");
  }
}

module.exports = { ProgressBar };
