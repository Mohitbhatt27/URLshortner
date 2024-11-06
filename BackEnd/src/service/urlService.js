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

const redirectUrl = async (data) => {
  try {
    const existingUrl = await urlModel.findOne({
      shortenedId: data.shortenedId,
    });
    if (!existingUrl) {
      throw new Error("URL not found");
    }
    const updatedVisitedCount = existingUrl.visitedCount + 1;
    const response = await urlModel.findOneAndUpdate(
      { shortenedId: data.shortenedId },
      { visitedCount: updatedVisitedCount },
      { new: true }
    );
    const redirectURL =
      response.redirectUrl.startsWith("http://") ||
      response.redirectUrl.startsWith("https://")
        ? response.redirectUrl
        : `http://${response.redirectUrl}`;
    return redirectURL;
  } catch (error) {
    console.log("Something went wrong while fetching the redirectURL");
    throw error;
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
