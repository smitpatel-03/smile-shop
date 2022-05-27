const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
  forgotPassword,
  resetPassword,
  getUserDetails,
} = require("../controller/user.controller");
const userRoute = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/password/forgot", forgotPassword);
userRoute.put("/password/reset/:token", resetPassword);
userRoute.post("/logout", userLogout);
userRoute.get("/me", isAuthenticatedUser, getUserDetails);

module.exports = userRoute;
