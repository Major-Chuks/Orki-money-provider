import { useListBillingPlansQuery } from "@/services/queryApis";
import classes from "./AllPlans.module.css";
import Essential from "./Essential";
import Premium from "./Premium";
import WhiteLabel from "./WhiteLabel";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { get_listBillingPlans } from "@/types/apis/billing/get_listBillingPlans";
import { useState } from "react";

const AllPlans = () => {
  const [cycle, setCycle] = useState<"month" | "year">("month");

  const { data, isPending, isError } = useListBillingPlansQuery();
  const billingPlans: get_listBillingPlans = data?.data.data;

  if (isPending) return <LoadingScreen />;

  if (isError) return <ErrorScreen />;

  const essentialPlan = billingPlans.data.find(
    (plan) => plan.name.toLowerCase() === "essential"
  );
  const premiumPlan = billingPlans.data.find(
    (plan) => plan.name.toLowerCase() === "premium"
  );
  const whiteLabel = billingPlans.data.find(
    (plan) => plan.name.toLowerCase() === "white label"
  );

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div
          className={`${classes.tab} ${cycle === "month" && classes.active}`}
          onClick={() => setCycle("month")}
        >
          Bill Monthly
        </div>
        <div
          className={`${classes.tab} ${cycle === "year" && classes.active}`}
          onClick={() => setCycle("year")}
        >
          Bill Yearly <span>Save 20%</span>
        </div>
      </div>

      <div className={classes.plans}>
        {essentialPlan && <Essential plan={essentialPlan} />}
        {premiumPlan && <Premium plan={premiumPlan} />}
        {whiteLabel && <WhiteLabel plan={whiteLabel} />}
      </div>
    </div>
  );
};

export default AllPlans;
