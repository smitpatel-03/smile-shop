const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to access the resource", 401));
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this route`,
          403
        )
      );
    }
    next();
  };
};
module.exports = { isAuthenticatedUser, authorizeRoles };
