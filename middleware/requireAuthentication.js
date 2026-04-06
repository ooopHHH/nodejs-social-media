const AppError = require('../utils/AppError');

const requireAuthentication = (req, res, next) => {
  if (!req.session.user) return next(new AppError(401, 'fail', 'unauthenticated'));
  next();
};

module.exports = requireAuthentication;