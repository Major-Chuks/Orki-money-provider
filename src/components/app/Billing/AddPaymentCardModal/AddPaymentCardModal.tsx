import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./AddPaymentCardModal.module.css";
import ModalContent from "@/components/Modal/ModalContent";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const AddPaymentCardModal = ({ onClose }: { onClose: () => void }) => {
  const { showToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const addPaymentMethod = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    const cardElement = elements.getElement(CardNumberElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: { name },
    });

    if (error) {
      console.error("Error:", error.message);
    } else {
      const response = await backend().post_addPaymentMethod({
        payment_method_id: paymentMethod?.id,
      });
      if (response) {
        showToast("Payment method added successfully", "success");
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <ModalLayout
      style={{ justifyContent: "flex-end", alignItems: "flex-start" }}
    >
      <ModalContent stickyHeader title={"Add Payment Method"} onClose={onClose}>
        {!stripe || !elements ? (
          <LoadingScreen style={{ height: "40vh" }} />
        ) : (
          <div className={classes.formWrapper}>
            <div className={classes.formTitle}>Add New Card</div>

            <div className={classes.form}>
              <div className={classes.inputWrapper}>
                <label>Card Number</label>
                <div className={classes.input}>
                  <CardNumberElement options={elementStyle} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div className={classes.inputWrapper}>
                  <label>Expiry</label>
                  <div className={classes.input}>
                    <CardExpiryElement options={elementStyle} />
                  </div>
                </div>
                <div className={classes.inputWrapper}>
                  <label>CVC</label>
                  <div className={classes.input}>
                    <CardCvcElement options={elementStyle} />
                  </div>
                </div>
              </div>
              <div className={classes.inputWrapper}>
                <label>Cardholder Name</label>
                <input
                  className={classes.input}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.formControl}>
              <Button onClick={onClose} variant="outlined" type="neutral">
                Cancel
              </Button>
              <Button loading={loading} onClick={addPaymentMethod}>
                Add Payment Method
              </Button>
            </div>
          </div>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

export default AddPaymentCardModal;

const elementStyle = {
  style: {
    base: {
      color: "#1a1a1a",
      fontSize: "14px",
      fontWeight: "500",
      "::placeholder": {
        color: "#777e90",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    invalid: {
      color: "#ff4d4f",
    },
  },
};
