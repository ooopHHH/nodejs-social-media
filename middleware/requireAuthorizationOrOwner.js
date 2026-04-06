const AppError = require('../utils/AppError');

const requireAuthorizationOrOwner = (req,res,next) => {
  const isOwner = req.session.user.id === parseInt(req.params.id);
  const isAdmin = req.session.user.role === 'admin';
  if (!isOwner && !isAdmin) return next(new AppError(403, 'fail', 'unauthorized'));
  next();
};

module.exports = requireAuthorizationOrOwner;