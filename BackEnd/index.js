const express = require("express");
const { PORT } = require("./src/config/serverConfig");
const { APIrouter } = require("./src/routes/apiRouter");
const connectDB = require("./src/config/dbConfig");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", APIrouter);

app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});

connectDB();
