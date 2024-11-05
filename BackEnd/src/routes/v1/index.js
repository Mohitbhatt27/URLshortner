const express = require("express");
const { pingController } = require("../../controllers/pingController");
const urlRouter = require("./urlRouter");

const v1Router = express.Router();

v1Router.get("/ping", pingController);
v1Router.use("/url", urlRouter);

module.exports = {
  v1Router,
};
