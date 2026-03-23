// Error handler middleware
const errorHandler = (err, req, res, next) => {
  res.status(500).json([ err.message ]);
};

module.exports = { errorHandler };