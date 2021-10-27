const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;

  next(error);
};

const errorHandler = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  res.json({
    success: false,
    message: error.message,
    stack: process.NODE_ENV === "production" ? "🔥" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
