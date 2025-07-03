import CheckCircle from "@/assets/app/CheckCircle";
import classes from "./AllPlans.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { get_listBillingPlans } from "@/types/apis/billing/get_listBillingPlans";

import { useState } from "react";
import RequestSubscriptionModal from "../RequestSubscriptionModal/RequestSubscriptionModal";
import { getCurrencySymbol } from "@/services/utils";

const Essential = ({
  plan,
}: {
  plan: get_listBillingPlans["data"][number];
}) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={classes.plan}>
      <div className={classes.title}>Essential</div>

      <div className={classes.description}>{plan.description}</div>

      <div className={classes.perMonth}>
        {getCurrencySymbol(plan.currency)}
        {plan.monthly_amount} <span>/month</span>
      </div>

      <div className={classes.withTag}>
        <div className={classes.perYear}>
          {getCurrencySymbol(plan.currency)}
          {plan.yearly_amount} <span>/year</span>
        </div>

        <div className={classes.tag}>
          Save {plan.yearly_discount_percentage}% on yearly
        </div>
      </div>

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
