const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
} = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", userLogout);

module.exports = userRoute;
