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
import backend from "@/services/apis";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";
import Pagination from "@/components/app/Pagination/Pagination";
import AdvancedSearch, {
  SearchParamsType,
} from "@/components/app/Transactions/AdvancedSearch/AdvancedSearch";
import EmptyState from "@/components/app/Transactions/EmptyState/EmptyState";
import TransactionTable from "./TransactionTable/TransactionTable";

const UserManagementPage = () => {
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

  const handleSearch = async (searchParams: SearchParamsType) => {
    const activeSearch = Object.keys(searchParams).filter((s) => {
      const key = s as keyof typeof searchParams;
      if (s === "processed_at" && !searchParams[s].split(",").every((t) => t)) {
        return false;
      }
      return searchParams[key];
    });
    let params = "";
    activeSearch.forEach((s) => {
      const key = s as keyof typeof searchParams;
      if (!params) {
        params += `?filter[${s.toLowerCase()}]=${searchParams[key]}`;
      } else {
        params += `&filter[${s.toLowerCase()}]=${searchParams[key]}`;
      }
    });

    setParams(params);
  };

  const handleExport = async () => {
    setExporting(true);
    const response = await backend().get_exportTransaction({ params });
    if (response) {
      window.open(response.data.data, "_blank");
    }
    setExporting(false);
  };

  if (isError) return <ErrorScreen />;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>Transaction History</div>
          <div className={classes.description}>
            View all transactions processed through Orki Terminal.
          </div>

          <DropdownLayout>
            {({ open, toggle }) => (
              <>
                <div id="trn_filter" className={classes.searchAndFilters}>
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
                    onClick={toggle}
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
                </div>

                <DropdownWrapper
                  position="static"
                  open={open}
                  containerStyle={{
                    marginBottom: "34px",
                  }}
                >
                  <AdvancedSearch onSearch={handleSearch} />
                </DropdownWrapper>
              </>
            )}
          </DropdownLayout>

          {isPending ? (
            <LoadingScreen />
          ) : transactions.length ? (
            <TransactionTable data={transactions} />
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

export default UserManagementPage;
