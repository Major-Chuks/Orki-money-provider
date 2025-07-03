import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./UpdatePlanModal.module.css";
import ModalContent from "@/components/Modal/ModalContent";
import CardIcon from "@/assets/app/CardIcon";
import { PlusCircleIcon } from "lucide-react";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import { useListPaymentMethodsQuery } from "@/services/queryApis";
import { get_listPaymentMethods } from "@/types/apis/billing/get_listPaymentMethods";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const UpdatePlanModal = ({ onClose }: { onClose: () => void }) => {
  const [openForm, setOpenForm] = useState(false);
  const { showToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultLoading, setDefaultLoading] = useState("");
  const [deleting, setDeleting] = useState("");

  const { data, isPending, isError, refetch } = useListPaymentMethodsQuery();
  const paymentMethods: get_listPaymentMethods = data?.data.data;

  const setDefaultCard = async (cardId: string) => {
    setDefaultLoading(cardId);
    const response = await backend().patch_updatePaymentMethod({ id: cardId });

    if (response) {
      showToast("Default card updated successfully", "success");
      refetch();
    }
    setDefaultLoading("");
  };

  const deleteCard = async (cardId: string) => {
    setDeleting(cardId);
    const response = await backend().delete_deletePaymentMethod({ id: cardId });

    if (response) {
      showToast("Card deleted successfully", "success");
      refetch();
    }
    setDeleting("");
  };

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
        refetch();
        setOpenForm(false);
      }
    }
    setLoading(false);
  };

  return (
    <ModalLayout
      style={{ justifyContent: "flex-end", alignItems: "flex-start" }}
    >
      <ModalContent
        headerSticky
        title={"Payment Methods"}
        subtitle="Manage your payment methods and billing information"
        onClose={onClose}
      >
        {isPending ? (
          <LoadingScreen style={{ height: "40vh" }} />
        ) : isError ? (
          <ErrorScreen style={{ height: "40vh" }} />
        ) : data ? (
          <>
            <div className={classes.cardWrapper}>
              <div className={classes.title}>Your Payment Methods</div>
              {paymentMethods.data.map((pm, idx) => (
                <div key={idx}>
                  <div className={classes.card}>
                    <CardIcon />
                    <div>
                      <div className={classes.details}>
                        <div className={classes.cardNo}>
                          {pm.brand} •••• {pm.last4}
                        </div>
                        <div className={classes.date}>
                          Expires {pm.exp_month}/{pm.exp_year}
                        </div>
                      </div>

                      <div className={classes.btnWrapper}>
                        {pm.is_default ? (
                          <div className={classes.status}>Default</div>
                        ) : (
                          <ButtonWrapper
                            className={classes.setDefaultBtn}
                            onClick={() => setDefaultCard(pm.id)}
                            loading={defaultLoading === pm.id}
                          >
                            Set as default
                          </ButtonWrapper>
                        )}

                        <ButtonWrapper
                          className={classes.deleteBtn}
                          onClick={() => deleteCard(pm.id)}
                          loading={deleting === pm.id}
                        >
                          Delete
                        </ButtonWrapper>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.line}></div>
            {!openForm && (
              <ButtonWrapper
                onClick={() => setOpenForm(true)}
                className={classes.toggleBtn}
              >
                <PlusCircleIcon /> Add New Payment Method
              </ButtonWrapper>
            )}

            {openForm ? (
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
                  <Button
                    onClick={() => setOpenForm(false)}
                    variant="outlined"
                    type="neutral"
                  >
                    Cancel
                  </Button>
                  <Button loading={loading} onClick={addPaymentMethod}>
                    Add Payment Method
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div>No Payment methods</div>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

export default UpdatePlanModal;

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
