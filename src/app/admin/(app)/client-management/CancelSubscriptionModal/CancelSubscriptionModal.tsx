import ModalLayout from "@/components/Modal/ModalLayout";
import ModalContent from "@/components/Modal/ModalContent";
import { useState } from "react";
import { useToast } from "@/context/Toast/ToastContext";
import { get_findActiveSubscription } from "@/types/apis/billing/get_findActiveSubscription";
import Button from "@/components/CustomInput/Button/Button";
import classes from "./CancelSubscriptionModal.module.css";

// TODO: does not cancel subscription but pauses

const CancelSubscriptionModal = ({
  onClose,
  plan,
}: {
  onClose: () => void;
  plan: get_findActiveSubscription;
}) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleToggleSubscription = async () => {
    setLoading(true);
    if (plan.status === "cancelling") {
      // const response = await backend().post_resumeSubscription();
      if (true) {
        showToast("Subscription resumed", "success");
        onClose();
      }
    } else {
      // const response = await backend().post_cancelSubscription();
      if (true) {
        showToast("Subscription paused", "success");
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <ModalLayout containerStyle={{ zIndex: 99999 }}>
      <ModalContent
        stickyHeader
        title={
          plan.status === "cancelling"
            ? "Resume Subscription"
            : "Pause Subscription"
        }
        onClose={onClose}
      >
        <div className={classes.container}>
          {plan.status === "cancelling" ? (
            <div className={classes.textWrapper}>
              <div>
                Are you sure you want to resume this subscription? This action
                will immediately resume this client subscription.
              </div>
            </div>
          ) : (
            <div className={classes.textWrapper}>
              <div>
                Are you sure you want to pause this subscription? This action
                will immediately pause this client subscription.
              </div>
            </div>
          )}

          <div className={classes.btnWrapper}>
            <Button onClick={onClose} variant="outlined" type="neutral">
              Cancel
            </Button>
            <Button
              type={"primary"}
              loading={loading}
              onClick={handleToggleSubscription}
            >
              {plan.status === "cancelling"
                ? "Resume Subscription"
                : "Pause Subscription"}
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default CancelSubscriptionModal;
