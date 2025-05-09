import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
