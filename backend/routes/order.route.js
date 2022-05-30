const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const orderRoute = express.Router();

orderRoute.route("/order/new").post(isAuthenticatedUser, newOrder);

orderRoute
  .route("/order/:orderId")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

orderRoute.route("/orders/me").get(isAuthenticatedUser, myOrders);

orderRoute
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

orderRoute
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = orderRoute;
