const express = require("express");
const {
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
  updateRole,
  deleteUser,
} = require("../controller/user.controller");
const userRoute = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/password/forgot", forgotPassword);
userRoute.put("/password/reset/:token", resetPassword);
userRoute.post("/logout", userLogout);
userRoute.get("/me", isAuthenticatedUser, getUserDetails);
userRoute.put("/password/update", isAuthenticatedUser, updatePassword);
userRoute.put("/me/update", isAuthenticatedUser, updateProfile);
userRoute.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);
userRoute
  .route("/admin/user/:userId")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
module.exports = userRoute;
