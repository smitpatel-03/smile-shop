const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");

// Register user

const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample ",
      url: "sampele url",
    },
  });

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
  });
});

module.exports = {
  registerUser,
};
