const errorHandler = (error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({ 
      status: error.status || "error", 
      message: error.message 
  })
};

module.exports = errorHandler;