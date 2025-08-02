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
import { useState } from "react";

const BillingHistory = () => {
  const [params, setParams] = useState("");

  const { data, isPending, isError } = useListBillingHistoryQuery({
    params,
  });
  const billingHistory: get_listBillingHistory["data"] = data?.data.data.data;
  const metadata: get_listBillingHistory["meta"] = data?.data.data.meta;

  const handlePagination = (page: number) => {
    const searchParams = new URLSearchParams(params || "");
    searchParams.set("page", String(page));
    setParams(`?${searchParams.toString()}`);
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

export default BillingHistory;
