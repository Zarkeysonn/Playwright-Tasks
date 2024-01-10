const { WebTables } = require("./WebTables");

class POManager {
  constructor(page) {
    this.page = page;
    this.webTables = new WebTables(this.page);
  }

  getWebTables() {
    return this.webTables;
  }
}
module.exports = { POManager };
