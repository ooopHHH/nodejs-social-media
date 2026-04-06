const AppError = require("../utils/AppError");

function requireAuthorization(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.session.user.role)) return next(new AppError(403, 'fail', 'unauthorized'));
    next();
  };
};

module.exports = requireAuthorization;