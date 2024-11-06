const express = require("express");
const urlRouter = express.Router();
const urlController = require("../../controllers/urlController");
const {
  shortenUrlValidator,
  redirectUrlValidator,
  analyticsValidator,
} = require("../../middlewares/urlMiddleware");

urlRouter.get("/", (req, res) => {
  res.send("url router working");
});

urlRouter.post("/shorten", shortenUrlValidator, urlController.shortenUrl);

urlRouter.get(
  "/redirect/:shortenedId",
  redirectUrlValidator,
  urlController.redirectUrl
);

urlRouter.get(
  "/analytics/:shortenedId",
  analyticsValidator,
  urlController.analytics
);

module.exports = urlRouter;
