const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const doc = new JSDOM(`<!DOCTYPE html><body></body>`).window.document;

module.exports = doc;
