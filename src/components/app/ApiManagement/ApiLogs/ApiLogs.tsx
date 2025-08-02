import classes from "./ApiLogs.module.css";
import EmptyState from "./EmptyState/EmptyState";
import TransactionTable from "./TransactionTable/TransactionTable";
import Pagination from "../../Pagination/Pagination";
import { useApiLogsQuery } from "@/services/queryApis";
import { get_apiLogs } from "@/types/apis/apiLogs/get_apiLogs";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { useState } from "react";

const ApiLogs = () => {
  const [params, setParams] = useState("");
  const { data, isPending, isError } = useApiLogsQuery({
    params,
  });

  const apiLogs: get_apiLogs["logs"] = data?.data.data.logs;
  const metadata: get_apiLogs["meta"] = data?.data.data.meta;

  const handlePagination = (page: number) => {
    const searchParams = new URLSearchParams(params || "");
    searchParams.set("page", String(page));
    setParams(`?${searchParams.toString()}`);
  };

  if (isPending) return <LoadingScreen />;

  if (isError) return <ErrorScreen />;

  return (
    <>
      {apiLogs.length ? (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>API Logs</div>
            <div className={classes.description}>
              View recent API activity and debug integrations.
            </div>

            <TransactionTable data={apiLogs} />

            {metadata && (
              <Pagination
                metadata={metadata}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default ApiLogs;
