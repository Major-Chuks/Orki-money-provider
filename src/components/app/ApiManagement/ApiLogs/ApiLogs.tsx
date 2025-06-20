import classes from "./ApiLogs.module.css";
import EmptyState from "./EmptyState/EmptyState";
import TransactionTable from "./TransactionTable/TransactionTable";
import Pagination from "../../Pagination/Pagination";
import { useApiLogsQuery } from "@/services/queryApis";
import { get_apiLogs } from "@/types/apis/apiLogs/get_apiLogs";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const ApiLogs = () => {
  const { data, isPending, isError } = useApiLogsQuery();

  const apiLogs: get_apiLogs["logs"] = data?.data.data.logs;
  const metadata: get_apiLogs["meta"] = data?.data.data.meta;

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

export default ApiLogs;
