import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus("Creating payment intent…");
    // 1) Call your backend to create a payment intent
    const resp = await axios.post(`${API}/payments/create-intent`, {
      amount: 1000, // e.g. $10.00
      currency: "aud",
    });
    const { clientSecret } = resp.data.data;

    setStatus("Confirming card payment…");
    // 2) Confirm the card payment in Stripe.js
    const card = elements.getElement(CardElement)!;
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card } }
    );

    if (error) {
      setStatus("❌ " + error.message);
    } else {
      setStatus("✅ Payment " + paymentIntent?.status);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe} style={{ marginTop: 16 }}>
        Pay $10
      </button>
      <p>{status}</p>
    </form>
  );
}
