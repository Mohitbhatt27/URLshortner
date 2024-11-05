const express = require("express");
const { v1Router } = require("./v1/index");
const APIrouter = express.Router();

APIrouter.use("/v1", v1Router);

module.exports = {
  APIrouter,
};
