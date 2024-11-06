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
      shortenedId: req.params.shortenedId,
    });

    return res.redirect(response);
  } catch (error) {
    console.log("Something went wrong", error.message);
    throw error;
  }
};

const analytics = async (req, res) => {
  try {
    const response = await urlService.analytics({
      shortenedId: req.params.shortenedId,
    });

    return res.status(StatusCodes.OK).json({
      message: "Successfully fetched the analytics of the URL",
      data: response,
    });
  } catch (error) {
    console.log("Something went wrong", error.message);
    throw error;
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  analytics,
};
