const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const urlService = require("../service/urlService");

const shortenUrl = async (req, res) => {
  try {
    const response = await urlService.shortenUrl({
      url: req.body.url,
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Successfully created the shortened URL",
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong", error.message);
    throw error;
  }
};

const redirectUrl = async (req, res) => {
  try {
    const response = await urlService.redirectUrl({
      shortenedId: req.body.shortenedId,
    });

    return res.redirect(response);
  } catch (error) {
    console.log("Something went wrong", error.message);
    throw error;
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
