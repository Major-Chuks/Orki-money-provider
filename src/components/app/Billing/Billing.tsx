import { useState } from "react";
import TabNavigation from "../TabNavigation/TabNavigation";
import classes from "./Billing.module.css";
import CurrentPlan from "./CurrentPlan/CurrentPlan";
import AllPlans from "./AllPlans/AllPlans";
import BillingHistory from "./BillingHistory/BillingHistory";

const tabList = ["Available Plans", "Billing History"] as const;
type TabType = (typeof tabList)[number];

const Billing = () => {
  const [tab, setTab] = useState<TabType>("Available Plans");

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Billing & Subscription</div>
        <div className={classes.description}>
          Manage your subscription plan, view billing history, and update
          payment methods.
        </div>
      </div>

      <CurrentPlan />
      <div style={{ marginBottom: "40px" }}></div>
      <TabNavigation
        tab={tab}
        tabList={tabList}
        onTabChange={(option) => setTab(option)}
      />
      <div style={{ marginBottom: "32px" }}></div>
      {tab === "Available Plans" ? <AllPlans /> : <BillingHistory />}
    </div>
  );
};

export default Billing;
