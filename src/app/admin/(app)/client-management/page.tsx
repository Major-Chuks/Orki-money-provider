"use client";

import classes from "./page.module.css";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import exportIcon from "@/assets/app/exportIcon.svg";
import filterIcon from "@/assets/app/filterIcon.svg";
import chevronIcon from "@/assets/app/cheveron-down.svg";
import { useTransactionsQuery } from "@/services/queryApis";
import { get_transactions } from "@/types/apis/transactions/get_transactions";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

import { useState } from "react";
import Pagination from "@/components/app/Pagination/Pagination";
import EmptyState from "@/components/app/Transactions/EmptyState/EmptyState";
import TransactionTable from "./TransactionTable/TransactionTable";
import { mockData } from "./mockData";
import CustomSearch from "@/components/CustomInput/CustomSearch/CustomSearch";

const TransactionsPage = () => {
  const [params, setParams] = useState("");
  const [exporting, setExporting] = useState(false);

  const { data, isPending, isError } = useTransactionsQuery({
    params,
  });
  const transactions: get_transactions["transactions"] =
    data?.data.data.transactions;
  const metadata: get_transactions["meta"] = data?.data.data.meta;

  const handlePagination = (page: number) => {
    const searchParams = new URLSearchParams(params || "");
    searchParams.set("page", String(page));
    setParams(`?${searchParams.toString()}`);
  };

  const handleExport = async () => {
    setExporting(true);
    // const response = await backend().get_exportTransaction({ params });
    // if (response) {
    //   window.open(response.data.data, "_blank");
    // }
    setExporting(false);
  };

  if (isError) return <ErrorScreen />;

  console.log(transactions);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>Client Management</div>
          <div className={classes.description}>
            Manage client accounts, KYB verification, and billing status
          </div>

          <div id="trn_filter" className={classes.searchAndFilters}>
            <CustomSearch placeholder="Search by ID, Client ID or Provider..." />
            <div className={classes.filters}>
              <CustomButton
                style={{
                  width: "max-content",
                  borderRadius: "8px",
                  background: "#FEFEFE",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "12px 16px",
                }}
                leftIcon={filterIcon}
                rightIcon={chevronIcon}
              >
                Filter
              </CustomButton>

              <CustomButton
                style={{
                  width: "max-content",
                  borderRadius: "8px",
                  background: "#FEFEFE",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "12px 16px",
                }}
                leftIcon={exportIcon}
                loading={exporting}
                onClick={handleExport}
              >
                Export
              </CustomButton>

              <CustomButton
                style={{
                  width: "max-content",
                  borderRadius: "8px",
                  background: "#FEFEFE",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "12px 16px",
                }}
                rightIcon={chevronIcon}
              >
                Status: All
              </CustomButton>
            </div>
          </div>

          {isPending ? (
            <LoadingScreen />
          ) : mockData.length ? (
            <TransactionTable data={mockData} />
          ) : (
            <EmptyState isSearch={params} />
          )}

          {metadata && (
            <Pagination
              metadata={metadata}
              handlePagination={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
