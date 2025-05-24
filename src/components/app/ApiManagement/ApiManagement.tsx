import { useState } from "react";
import TabNavigation from "../TabNavigation/TabNavigation";
import classes from "./ApiManagement.module.css";
import Banner from "./Banner/Banner";
import ApiKeys from "./ApiKeys/ApiKeys";
import ApiLogs from "./ApiLogs/ApiLogs";
import Webhooks from "./Webhooks/Webhooks";

const tablist = ["API Keys", "Webhooks", "API Logs"] as const;
type TabType = (typeof tablist)[number];

const ApiManagement = () => {
  const [tab, setTab] = useState<TabType>("API Keys");

  return (
    <div className={classes.container}>
      <Banner />

      <div style={{ marginBottom: "28px" }} />

      <TabNavigation
        tabList={tablist}
        tab={tab}
        onTabChange={(option) => setTab(option)}
        style={{ width: "max-content" }}
      />

      <div style={{ marginBottom: "32px" }} />

      {tab === "API Keys" && <ApiKeys />}
      {tab === "API Logs" && <ApiLogs />}
      {tab === "Webhooks" && <Webhooks />}
    </div>
  );
};

export default ApiManagement;
