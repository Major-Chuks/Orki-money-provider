import classes from "./Transactions.module.css";
import EmptyState from "./EmptyState/EmptyState";
import Pagination from "../../Pagination/Pagination";
import TransactionTable from "./TransactionTable/TransactionTable";
import { useWebhookLogsQuery } from "@/services/queryApis";
import { get_webhookLogs } from "@/types/apis/webhook/get_webhookLogs";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { useState } from "react";

const Transactions = () => {
  const [params, setParams] = useState("");

  const { data, isPending, isError } = useWebhookLogsQuery({
    params,
  });

  const metadata: get_webhookLogs["meta"] = data?.data.data.meta;
  const webhook_logs: get_webhookLogs["webhook_logs"] =
    data?.data.data.webhook_logs;

  const handlePagination = (page: number) => {
    const searchParams = new URLSearchParams(params || "");
    searchParams.set("page", String(page));
    setParams(`?${searchParams.toString()}`);
  };

  if (isPending) return <LoadingScreen />;

  if (isError) return <ErrorScreen />;

  return (
    <>
      {webhook_logs.length ? (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>Webhook Logs</div>
            <div className={classes.description}>
              View and download your past invoices. All invoices are available
              in PDF format.
            </div>

            <TransactionTable data={webhook_logs} />

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

export default Transactions;
