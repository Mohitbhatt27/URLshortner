const shortenUrlValidator = (req, res, next) => {
  if (!req.body.url) {
    return res.status(400).json({
      success: false,
      message: "url is required",
    });
  }
  next();
};

const redirectUrlValidator = (req, res, next) => {
  if (!req.params.shortenedId) {
    return res.status(400).json({
      success: false,
      message: "shortenedId is required",
    });
  }
  next();
};

const analyticsValidator = (req, res, next) => {
  if (!req.params.shortenedId) {
    return res.status(400).json({
      success: false,
      message: "shortenedId is required",
    });
  }
  next();
};

module.exports = {
  shortenUrlValidator,
  redirectUrlValidator,
  analyticsValidator,
};
