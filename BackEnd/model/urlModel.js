const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortenedId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitedCount: {
    type: Number,
    default: 0,
  },
  timestamps: true,
});

const urlModel = mongoose.model("url", urlSchema);
module.exports = urlModel;
