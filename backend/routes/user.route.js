const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
  forgotPassword,
  resetPassword,
} = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/password/forgot", forgotPassword);
userRoute.put("/password/reset/:token", resetPassword);
userRoute.post("/logout", userLogout);

module.exports = userRoute;
