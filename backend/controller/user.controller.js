const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtFunction");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
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

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

// Logout user

const userLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  //Get Reset Password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n If your have not request this email then please igonre it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log("error");
    user.reserPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
const resetPassword = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Token is Invalid or has been expire ", 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 404));
  }
  user.password = req.body.password;
  user.resetPassword = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(
        "your password is not matching with confirm password",
        401
      )
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

// Get All Users

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User Details

const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new ErrorHandler("user does not exist with id " + req.params.id, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  userLogout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
};
