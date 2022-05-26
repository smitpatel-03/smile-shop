const express = require("express");
const { registerUser } = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.post("/register", registerUser);

module.exports = userRoute;
