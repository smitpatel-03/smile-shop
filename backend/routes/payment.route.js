const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/payment.controller");
const paymentRouter = express.Router();

paymentRouter
  .route("/payment/process")
  .post(isAuthenticatedUser, processPayment);
paymentRouter.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
module.exports = paymentRouter;
