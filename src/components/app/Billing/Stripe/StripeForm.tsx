// components/StripeForm.tsx
"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useToast } from "@/context/Toast/ToastContext";
import backend from "@/services/apis";

const StripeForm = ({
  priceId,
  onClose,
}: {
  priceId: string;
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      console.error(error.message);
      showToast(error.message || "Subscription failed", "error");
      setLoading(false);
      return;
    }

    const response = await backend().post_subscribeBilling({
      payment_method_id: paymentMethod.id,
      price_id: priceId,
    });

    if (response) {
      showToast("Subsciption successful", "success");
      onClose();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default StripeForm;
