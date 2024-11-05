const express = require("express");
const { pingController } = require("../../controllers/pingController");

const v1Router = express.Router();

v1Router.get("/ping", pingController);

module.exports = {
  v1Router,
};
