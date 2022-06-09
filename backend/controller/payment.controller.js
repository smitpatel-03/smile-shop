const stripe = require("stripe")(
  "sk_test_51L8p5CSEW7uIqFjosKEv47DEaJwfd0HguNxkRqmwL1LG6xzQtKjpQ9fpazCXC3NAeTP9aNRf180MxQc2iCvOWjzy00OxNtd6Vt"
);
const catchAsyncError = require("../middleware/catchAsyncError");
exports.processPayment = catchAsyncError(async (req, res, next) => {
  console.log(req.body.amount);
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
    payment_method_types: ["card"],
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
