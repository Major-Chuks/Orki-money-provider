import ModalLayout from "@/components/Modal/ModalLayout";
import ModalContent from "@/components/Modal/ModalContent";
import { useState } from "react";
import { useToast } from "@/context/Toast/ToastContext";
import backend from "@/services/apis";
import { get_findActiveSubscription } from "@/types/apis/billing/get_findActiveSubscription";
import Button from "@/components/CustomInput/Button/Button";
import classes from "./CancelSubscriptionModal.module.css";
import { formatTxDate } from "@/services/utils";

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
      const response = await backend().post_resumeSubscription();
      if (response) {
        showToast("Subscription resumed", "success");
        onClose();
      }
    } else {
      const response = await backend().post_cancelSubscription();
      if (response) {
        showToast("Subscription cancelling", "success");
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent
        stickyHeader
        title={
          plan.status === "cancelling"
            ? "Resume Subscription"
            : "Cancel Subscription"
        }
        onClose={onClose}
      >
        <div className={classes.container}>
          {plan.status === "cancelling" ? (
            <div className={classes.textWrapper}>
              <div>
                You&apos;re about to resume your subscription. Once resumed,
                you&apos;ll regain access to all {plan.plan.name} features and
                be billed at your next renewal date.
              </div>
              <div className={classes.box}>
                Your current plan and settings will remain unchanged, and your
                next billing cycle will continue as scheduled.
              </div>
            </div>
          ) : (
            <div className={classes.textWrapper}>
              <div>
                Are you sure you want to cancel your subscription? You&apos;ll
                lose access to all {plan.plan.name} features at the end of your
                billing period.
              </div>
              <div className={classes.box}>
                Your subscription will remain active until{" "}
                <span>{formatTxDate(plan.next_billing_date, false)}</span>.
                After that, you&apos;ll be moved to the free plan.
              </div>
              <div>
                <p>Before you go, would you like to</p>
                <ul>
                  <li>Downgrade to a cheaper plan?</li>
                  <li>Contact support for assistance?</li>
                </ul>
              </div>
            </div>
          )}

          <div className={classes.btnWrapper}>
            <Button onClick={onClose} variant="outlined" type="neutral">
              {plan.status === "cancelling" ? "Cancel" : "Keep Subscription"}
            </Button>
            <Button
              type={plan.status === "cancelling" ? "primary" : "danger"}
              loading={loading}
              onClick={handleToggleSubscription}
            >
              {plan.status === "cancelling" ? "Yes, Resume" : "Yes, Cancel"}
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default CancelSubscriptionModal;
