// src/stripe.ts
import { loadStripe } from "@stripe/stripe-js";

const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;
console.log("👀 using Stripe key:", key);

export const stripePromise = loadStripe(key);
