const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    const error = new Error("Access Denied");
    error.status = 401;
    return next(error);
  }

  try {
    const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req.userId = validToken.id;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") error.status = 400;

    next(error);
  }
};

module.exports = isAuth;
