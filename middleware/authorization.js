const AppError = require("../utils/AppError");

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.user) return next(new AppError(401, 'fail', 'unauthenticated'));
    if (!roles.includes(req.session.user.role)) return next(new AppError(403, 'fail', 'forbidden'));
    next()
  };
};

module.exports = requireRole;