const { WebTables } = require("./WebTables");
const { PractiseForm } = require("./PractiseForm");
const { ProgressBar } = require("./ProgressBar");
const { BrokenImageLinks } = require("./BrokenImageLinks");
const { UploadAndDownload } = require("./UploadAndDownload");
const { Alerts } = require("./Alerts");
const { Frames } = require("./Frames");

class POManager {
  constructor(page) {
    this.page = page;
    this.webTables = new WebTables(this.page);
    this.practiseForm = new PractiseForm(this.page);
    this.progressBar = new ProgressBar(this.page);
    this.brokenImageLinks = new BrokenImageLinks(this.page);
    this.uploadAndDownload = new UploadAndDownload(this.page);
    this.alerts = new Alerts(this.page);
    this.frames = new Frames(this.page);
  }

  getFrames() {
    return this.frames;
  }

  getAlerts() {
    return this.alerts;
  }

  getUploadAndDownload() {
    return this.uploadAndDownload;
  }

  getWebTables() {
    return this.webTables;
  }

  getPractiseForm() {
    return this.practiseForm;
  }

  getProgressBar() {
    return this.progressBar;
  }

  getBrokenImageLinks() {
    return this.brokenImageLinks;
  }
}
module.exports = { POManager };
