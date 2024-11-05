const express = require("express");
const { PORT } = require("./src/config/serverConfig");
const { APIrouter } = require("./src/routes/apiRouter");

const app = express();

app.use("/api", APIrouter);

app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});
