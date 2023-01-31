const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
  };
};

const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({ message: err.message });
};

module.exports = {
  catchAsync,
  globalErrorHandler,
};
