import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { get_listBillingPlans } from "@/types/apis/billing/get_listBillingPlans";

import { useState } from "react";
import RequestSubscriptionModal from "../RequestSubscriptionModal/RequestSubscriptionModal";
import { getCurrencySymbol } from "@/services/utils";

const Essential = ({
  plan,
  cycle,
}: {
  plan: get_listBillingPlans["data"][number];
  cycle: "month" | "year";
}) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={classes.plan}>
      <div className={classes.title}>Essential</div>

      <div className={classes.description}>{plan.description}</div>

      {cycle === "month" ? (
        <div className={`${classes.perMonth} ${classes.grow}`}>
          {getCurrencySymbol(plan.currency)}
          {plan.monthly_amount} <span>/month</span>
        </div>
      ) : null}

      <div className={classes.withTag}>
        <div className={classes.perYear}>
          {getCurrencySymbol(plan.currency)}
          {plan.yearly_amount} <span>/year</span>
        </div>

        <div className={classes.tag}>
          Save {plan.yearly_discount_percentage}% on yearly
        </div>
      </div>

      {cycle === "year" ? (
        <div
          style={{ fontWeight: "normal", fontSize: "28px" }}
          className={`${classes.perMonth} ${classes.shrink}`}
        >
          {getCurrencySymbol(plan.currency)}
          {plan.monthly_amount} <span style={{ fontSize: "16px" }}>/month</span>
        </div>
      ) : null}

      <div className={classes.features}>
        {plan.features.map((feature, idx) => (
          <div key={idx} className={classes.feature}>
            <CheckCircle /> {feature}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <Button
        style={{ alignSelf: "flex-end", width: "100%", borderRadius: "32px" }}
        onClick={() => setOpenForm(true)}
      >
        Start free trial
      </Button>

      {openForm && (
        <RequestSubscriptionModal
          priceId={plan.price_id as string}
          onClose={() => setOpenForm(false)}
        />
      )}
    </div>
  );
};

export default Essential;
