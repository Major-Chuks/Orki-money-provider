import classes from "./BillingHistory.module.css";
import EmptyState from "./EmptyState/EmptyState";
import Search from "./Search/Search";
import Status from "./Status/Status";
import TransactionTable from "./TransactionTable/TransactionTable";
import Pagination from "../../Pagination/Pagination";
import { useListBillingHistoryQuery } from "@/services/queryApis";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { get_listBillingHistory } from "@/types/apis/billing/get_listBillingHistory";

const BillingHistory = () => {
  const { data, isPending, isError } = useListBillingHistoryQuery();
  const billingHistory: get_listBillingHistory["data"] = data?.data.data.data;
  const metadata: get_listBillingHistory["meta"] = data?.data.data.meta;

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
      {billingHistory && billingHistory.length ? (
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
                <Status onChange={() => {}} value="" />
              </div>
            </div>

            <TransactionTable data={billingHistory} />

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
