const mongoose = require("mongoose");
const { DB_URL } = require("../config/serverConfig");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("Something went wrong while connecting DB", error.message);
  }
};

module.exports = connectDB;
