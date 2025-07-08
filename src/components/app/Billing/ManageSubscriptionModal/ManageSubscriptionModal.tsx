import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./ManageSubscriptionModal.module.css";
import ModalContent from "@/components/Modal/ModalContent";
import Button from "@/components/CustomInput/Button/Button";
import {
  useFindActiveSubscriptionQuery,
  useListBillingPlansQuery,
} from "@/services/queryApis";
import { get_listBillingPlans } from "@/types/apis/billing/get_listBillingPlans";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import { useState } from "react";
import { get_findActiveSubscription } from "@/types/apis/billing/get_findActiveSubscription";
import { formatTxDate } from "@/services/utils";

const ManageSubscriptionModal = ({ onClose }: { onClose: () => void }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState("");

  const { data, isPending, isError } = useListBillingPlansQuery();
  const billingPlans: get_listBillingPlans = data?.data.data;

  const {
    data: currentPlanData,
    isPending: isCurrentPlanPending,
    isError: isCurrentPlanError,
  } = useFindActiveSubscriptionQuery();
  const currentPlan: get_findActiveSubscription = currentPlanData?.data.data;

  const otherPlans = billingPlans?.data.filter(
    (plan) => plan.name.toLowerCase() !== currentPlan.plan.name.toLowerCase()
  );

  const handleCustomPlan = (url: string) => {
    window.open(url, "_blank");
  };

  const handleSwapSubscription = async (priceId: string) => {
    setLoading(priceId);
    const response = await backend().post_swapSubscription({
      price_id: priceId,
    });
    if (response) {
      showToast("Payment plan updated successfully", "success");
    }
    setLoading("");
  };

  return (
    <ModalLayout
      style={{ justifyContent: "flex-end", alignItems: "flex-start" }}
    >
      <ModalContent
        stickyHeader
        title={"Manage Your Subscription"}
        subtitle="Change your plan, update billing frequency, or manage your subscription"
        onClose={onClose}
      >
        {isCurrentPlanPending ? (
          <LoadingScreen style={{ height: "20vh" }} />
        ) : isCurrentPlanError ? (
          <ErrorScreen style={{ height: "20vh" }} />
        ) : (
          <div className={classes.currentPlan}>
            <div className={classes.tag}>Active</div>
            <div className={classes.plan}>
              Current Plan: {currentPlan?.name}
            </div>
            <div>
              Next billing: {formatTxDate(currentPlan.next_billing_date, false)}{" "}
              • {currentPlan.price_currency} {currentPlan?.price_amount}/
              {currentPlan?.interval}
            </div>
          </div>
        )}

        {isPending ? (
          <LoadingScreen style={{ height: "20vh" }} />
        ) : isError ? (
          <ErrorScreen style={{ height: "20vh" }} />
        ) : (
          <>
            <div className={classes.availablePlans}>
              <div className={classes.title}>Available Plans</div>

              <div className={classes.cardWrapper}>
                {otherPlans.map((plan, idx) => (
                  <div key={idx} className={classes.card}>
                    <div className={classes.plan}>{plan.name}</div>
                    {plan.contact_us && plan.requires_quote ? (
                      <div className={classes.billing}>Custom Pricing</div>
                    ) : (
                      <div className={classes.billing}>
                        {plan.currency} {plan.monthly_amount}
                      </div>
                    )}
                    {plan.contact_us && plan.requires_quote ? (
                      <Button
                        style={{
                          alignSelf: "flex-end",
                          width: "100%",
                          borderRadius: "32px",
                        }}
                        onClick={() =>
                          handleCustomPlan(plan.contact_us as string)
                        }
                        loading={loading === plan.price_id}
                      >
                        Schedule a call
                      </Button>
                    ) : (
                      <Button
                        style={{
                          alignSelf: "flex-end",
                          width: "100%",
                          borderRadius: "32px",
                        }}
                        onClick={() =>
                          handleSwapSubscription(plan.price_id as string)
                        }
                        loading={loading === plan.price_id}
                      >
                        Subscribe
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ModalContent>
    </ModalLayout>
  );
};

export default ManageSubscriptionModal;
