import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Cart/Payment";
const StripeProvider = ({ apiKey }) => {
  return (
    <Elements stripe={loadStripe(apiKey)}>
      <Payment />
    </Elements>
  );
};

export default StripeProvider;
