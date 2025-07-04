import ChevronDown from "@/assets/app/ChevronDown";
import classes from "./CurrentPlan.module.css";
import Button from "@/components/CustomInput/Button/Button";
import DropdownLayout from "../../Dropdown/DropdownLayout/DropdownLayout";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import DropdownWrapper from "../../Dropdown/DropdownWrapper/DropdownWrapper";
import ArrowUp from "@/assets/app/ArrowUp";
import CreditCardIcon from "@/assets/app/CreditCardIcon";
import { useFindActiveSubscriptionQuery } from "@/services/queryApis";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { get_findActiveSubscription } from "@/types/apis/billing/get_findActiveSubscription";
import { formatText, formatTxDate } from "@/services/utils";
import { useState } from "react";
import ManageSubscriptionModal from "../ManageSubscriptionModal/ManageSubscriptionModal";
import UpdatePlanModal from "../UpdatePlanModal/UpdatePlanModal";
import CancelSubscriptionModal from "../CancelSubscriptionModal/CancelSubscriptionModal";
import EmptyState from "../EmptyState/EmptyState";
import { Ban, CheckCircle, Clock } from "lucide-react";

const CurrentPlan = () => {
  const [openManageSubscriptionModal, setOpenManageSubscriptionModal] =
    useState(false);
  const [openUpdatePlanModal, setOpenUpdatePlanModal] = useState(false);
  const [openCancePlanModal, setOpenCancelPlanModal] = useState(false);

  const { data, isPending, isError, refetch } =
    useFindActiveSubscriptionQuery();
  const currentPlan: get_findActiveSubscription = data?.data.data;

  if (isPending) return <LoadingScreen style={{ height: "40vh" }} />;

  if (isError) return <ErrorScreen style={{ height: "40vh" }} />;

  if (!data) return <EmptyState />;

  return (
    <div className={`${classes.container} ${classes[currentPlan.status]}`}>
      <div className={classes.headerWrapper}>
        <div className={classes.header}>
          <div className={classes.title}>Current Plan: {currentPlan.name}</div>
          <div className={classes.description}>
            Manage your active subscription details
          </div>
        </div>
        <div className={`${classes.status} ${classes[currentPlan.status]}`}>
          {currentPlan.status === "active" ||
          currentPlan.status === "trialing" ? (
            <CheckCircle width={12} height={12} />
          ) : currentPlan.status === "cancelling" ? (
            <Clock width={12} height={12} />
          ) : currentPlan.status === "cancelled" ? (
            <Ban width={12} height={12} />
          ) : null}
          {formatText(currentPlan.status)}
        </div>
      </div>

      <div className={classes.gridBox1}>
        <div className={classes.item}>
          <div className={classes.name}>Next Billing Date</div>
          <div className={classes.value}>
            {formatTxDate(currentPlan.next_billing_date)}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.name}>Price</div>
          <div className={classes.value}>
            {currentPlan.price_currency} {currentPlan.price_amount}/
            {currentPlan.interval}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.name}>Payment Method</div>
          {currentPlan.card ? (
            <div className={classes.value}>
              {currentPlan.card.brand} **** {currentPlan.card.last4} (Expires{" "}
              {currentPlan.card.exp_month}/{currentPlan.card.exp_year})
            </div>
          ) : (
            <div className={classes.value}>No payment method</div>
          )}
        </div>
      </div>

      <PlanFeatures features={currentPlan.plan.features} />

      <div className={classes.btnWrapper}>
        <Button
          onClick={() => setOpenManageSubscriptionModal(true)}
          style={{ borderRadius: "8px" }}
        >
          Manage Subscription <ArrowUp />
        </Button>
        <Button
          onClick={() => setOpenUpdatePlanModal(true)}
          style={{
            border: "2px solid #E5E7EB",
            background: "#fff",
            color: "#4B5563",
            borderRadius: "8px",
          }}
        >
          Update Payment Plan <CreditCardIcon />
        </Button>
        {currentPlan.status !== "cancelled" && (
          <>
            <Button
              style={{
                borderRadius: "8px",
                border: "2px solid #E5E7EB",
                background: "#fff",
                color:
                  currentPlan.status === "cancelling" ? "#4B5563" : "#EF4444",
              }}
              onClick={() => setOpenCancelPlanModal(true)}
            >
              {currentPlan.status === "cancelling"
                ? "Resume Subscription"
                : "Cancel Subscription"}
            </Button>
          </>
        )}
      </div>

      {openManageSubscriptionModal && (
        <ManageSubscriptionModal
          onClose={() => {
            setOpenManageSubscriptionModal(false);
            refetch();
          }}
        />
      )}

      {openUpdatePlanModal && (
        <UpdatePlanModal
          onClose={() => {
            setOpenUpdatePlanModal(false);
            refetch();
          }}
        />
      )}

      {openCancePlanModal && (
        <CancelSubscriptionModal
          onClose={() => {
            setOpenCancelPlanModal(false);
            refetch();
          }}
          plan={currentPlan}
        />
      )}
    </div>
  );
};

export default CurrentPlan;

const PlanFeatures = ({ features }: { features: string[] }) => {
  return (
    <div className={classes.features}>
      <DropdownLayout>
        {({ open, toggle }) => (
          <>
            <div className={classes.subHeading}>
              <div className={classes.subTitle}>Plan Features</div>
              <ButtonWrapper onClick={toggle}>
                <ChevronDown />
              </ButtonWrapper>
            </div>
            <DropdownWrapper
              open={open}
              containerStyle={{ width: "100%" }}
              position="static"
            >
              <div className={classes.gridBox2}>
                {features.map((item, idx) => (
                  <div key={idx} className={classes.item}>
                    <CheckCircle /> {item}
                  </div>
                ))}
              </div>
            </DropdownWrapper>
          </>
        )}
      </DropdownLayout>
    </div>
  );
};
