import classes from "./BillingHistory.module.css";
import EmptyState from "./EmptyState/EmptyState";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import { data, metadata } from "./mockData";
import Status from "./Status/Status";
import TransactionTable from "./TransactionTable/TransactionTable";
import AccountSetupBanner from "../../AccountSetupBanner/AccountSetupBanner";
import Pagination from "../../Pagination/Pagination";

const BillingHistory = () => {
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
      {false && (
        <>
          <AccountSetupBanner />
          <div style={{ marginBottom: "40px" }} />
        </>
      )}

      {data ? (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>Billing History</div>
            <div className={classes.description}>
              View and download your past invoices. All invoices are available
              in PDF format.
            </div>

            <div className={classes.searchAndFilters}>
              <Search placeholder="Search by Invoice ID" />

              <div className={classes.filters}>
                <Filter onChange={() => {}} value="" />
                <Status onChange={() => {}} value="" />
              </div>
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

export default BillingHistory;
