import classes from "./Transactions.module.css";
import EmptyState from "./EmptyState/EmptyState";
import { data, metadata } from "./mockData";
import Pagination from "../../Pagination/Pagination";
import TransactionTable from "./TransactionTable/TransactionTable";

const Transactions = () => {
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
            <div className={classes.title}>Webhook Logs</div>
            <div className={classes.description}>
              View and download your past invoices. All invoices are available
              in PDF format.
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

export default Transactions;
