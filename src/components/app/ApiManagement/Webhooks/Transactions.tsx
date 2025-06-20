import classes from "./Transactions.module.css";
import EmptyState from "./EmptyState/EmptyState";
import Pagination from "../../Pagination/Pagination";
import TransactionTable from "./TransactionTable/TransactionTable";
import { useWebhookLogsQuery } from "@/services/queryApis";
import { get_webhookLogs } from "@/types/apis/webhook/get_webhookLogs";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const Transactions = () => {
  const { data, isPending, isError } = useWebhookLogsQuery();

  const metadata: get_webhookLogs["meta"] = data?.data.data.meta;
  const webhook_logs: get_webhookLogs["webhook_logs"] =
    data?.data.data.webhook_logs;

  const handlePrev = (): void => {
    if (!metadata?.previousPageUrl) return;
    // refetch({ page: Number(metadata?.previousPageUrl.split("=")[1]) });
  };

  const handleNext = (): void => {
    if (!metadata?.nextPageUrl) return;
    // refetch({ page: Number(metadata?.nextPageUrl.split("=")[1]) });
  };

  const handleGoto = (page: number) => {
    console.log(page);
    // refetch({ page });
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
                handleGoto={handleGoto}
                handleNext={handleNext}
                handlePrev={handlePrev}
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
