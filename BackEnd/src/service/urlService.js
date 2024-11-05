const urlModel = require("../model/urlModel");
const { nanoid } = require("nanoid");

const shortenUrl = async (data) => {
  try {
    const shortURL = nanoid(8);
    const response = await urlModel.create({
      shortenedId: shortURL,
      redirectUrl: data.url,
      visitedCount: 0,
    });
    return response;
  } catch (error) {
    console.log("Something went wrong while creating a shorten URL");
    throw error;
  }
};

module.exports = {
  shortenUrl,
};
