import classes from "./ApiLogs.module.css";
import EmptyState from "./EmptyState/EmptyState";
import { data, metadata } from "./mockData";
import TransactionTable from "./TransactionTable/TransactionTable";
import Pagination from "../../Pagination/Pagination";

const ApiLogs = () => {
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

  return (
    <>
      {data ? (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>API Logs</div>
            <div className={classes.description}>
              View recent API activity and debug integrations.
            </div>

            <TransactionTable data={data} />

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
