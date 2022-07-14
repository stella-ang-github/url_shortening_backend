const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: String,
  actualUrl: String,
  shortUrl: String,
});

module.exports = mongoose.model("Url", urlSchema);
