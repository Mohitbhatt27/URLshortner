const express = require("express");
const urlRouter = express.Router();
const urlController = require("../../controllers/urlController");

urlRouter.get("/", (req, res) => {
  res.send("url router working");
});

urlRouter.post("/shorten", urlController.shortenUrl);
urlRouter.post("/redirect", urlController.redirectUrl);

module.exports = urlRouter;
