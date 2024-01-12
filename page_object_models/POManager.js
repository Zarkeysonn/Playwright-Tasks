const { WebTables } = require("./WebTables");
const { PractiseForm } = require("./PractiseForm");
const { ProgressBar } = require("./ProgressBar");

class POManager {
  constructor(page) {
    this.page = page;
    this.webTables = new WebTables(this.page);
    this.practiseForm = new PractiseForm(this.page);
    this.progressBar = new ProgressBar(this.page);
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
}
module.exports = { POManager };
