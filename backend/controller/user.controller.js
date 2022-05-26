const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtFunction");

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

  sendToken(user, 200, res);
});

// Login User

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check email and password

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatch = user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
};
