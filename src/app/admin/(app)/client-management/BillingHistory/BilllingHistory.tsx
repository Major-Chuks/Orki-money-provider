import classes from "./BillingHistory.module.css";
import EmptyState from "./EmptyState/EmptyState";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import exportIcon from "@/assets/app/exportIcon.svg";
import filterIcon from "@/assets/app/filterIcon.svg";
import chevronIcon from "@/assets/app/cheveron-down.svg";
import TransactionTable from "./TransactionTable/TransactionTable";
import { useTransactionsQuery } from "@/services/queryApis";
import { get_transactions } from "@/types/apis/transactions/get_transactions";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { useState } from "react";
import backend from "@/services/apis";
import Pagination from "@/components/app/Pagination/Pagination";
import ModalLayout from "@/components/Modal/ModalLayout";
import ModalContent from "@/components/Modal/ModalContent";
import CustomSearch from "@/components/CustomInput/CustomSearch/CustomSearch";
import { mockData } from "./mockData";

const BillingHistory = ({ onClose }: { onClose: () => void }) => {
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
    const response = await backend().get_exportTransaction({ params });
    if (response) {
      window.open(response.data.data, "_blank");
    }
    setExporting(false);
  };

  if (isError) return <ErrorScreen />;

  return (
    <>
      <ModalLayout containerStyle={{ zIndex: 99999 }}>
        <ModalContent
          title="Billing History"
          subtitle="View all past and upcoming billing, including payments"
          size="full"
          stickyHeader
          underline={false}
          onClose={onClose}
        >
          <div className={classes.container}>
            <div id="trn_filter" className={classes.searchAndFilters}>
              <CustomSearch placeholder="Search by Invoice ID" />

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
              </div>
            </div>

            {isPending ? (
              <LoadingScreen />
            ) : transactions.length ? (
              <TransactionTable data={mockData} />
            ) : (
              <EmptyState />
            )}

            {metadata && (
              <Pagination
                metadata={metadata}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </ModalContent>
      </ModalLayout>
    </>
  );
};

export default BillingHistory;
