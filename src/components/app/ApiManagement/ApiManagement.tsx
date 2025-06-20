import { useEffect, useState } from "react";
import TabNavigation from "../TabNavigation/TabNavigation";
import classes from "./ApiManagement.module.css";
import Banner from "./Banner/Banner";
import ApiKeys from "./ApiKeys/ApiKeys";
import ApiLogs from "./ApiLogs/ApiLogs";
import Webhooks from "./Webhooks/Webhooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabList = ["API Keys", "Webhooks", "API Logs"] as const;
type TabType = (typeof tabList)[number];

const ApiManagement = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Convert query param to tab name
  const typeParam = searchParams.get("type");
  const isValidTab = (t: string): t is TabType =>
    tabList.map((v) => v.toLowerCase()).includes(t.toLowerCase());

  const initialTab: TabType =
    typeParam && isValidTab(typeParam)
      ? (tabList.find(
          (t) => t.toLowerCase() === typeParam.toLowerCase()
        ) as TabType)
      : "API Keys";

  const [tab, setTab] = useState<TabType>(initialTab);

  // Sync tab -> URL
  useEffect(() => {
    const currentParam = searchParams.get("type");
    if (tab.toLowerCase() !== currentParam?.toLowerCase()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", tab.toLowerCase());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [tab]);

  // Sync URL -> tab (in case user changes query param manually)
  useEffect(() => {
    if (typeParam && isValidTab(typeParam)) {
      const normalized = tabList.find(
        (t) => t.toLowerCase() === typeParam.toLowerCase()
      )!;
      setTab(normalized);
    }
  }, [typeParam]);

  return (
    <div className={classes.container}>
      <Banner />

      <div style={{ marginBottom: "28px" }} />

      <TabNavigation
        tabList={tabList}
        tab={tab}
        onTabChange={(option) => setTab(option)}
        style={{ width: "max-content" }}
      />

      <div style={{ marginBottom: "32px" }} />

      {tab === "API Keys" && <ApiKeys />}
      {tab === "Webhooks" && <Webhooks />}
      {tab === "API Logs" && <ApiLogs />}
    </div>
  );
};

export default ApiManagement;
