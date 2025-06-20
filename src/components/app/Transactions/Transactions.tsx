import AccountSetupBanner from "../AccountSetupBanner/AccountSetupBanner";
import classes from "./Transactions.module.css";
import EmptyState from "./EmptyState/EmptyState";
import Search from "./Search/Search";
import Pagination from "../Pagination/Pagination";
import Filter from "./Filter/Filter";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import exportIcon from "@/assets/app/exportIcon.svg";
import Status from "./Status/Status";
import TransactionTable from "./TransactionTable/TransactionTable";
import { useTransactionsQuery } from "@/services/queryApis";
import { get_transactions } from "@/types/apis/transactions/get_transactions";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const Transactions = () => {
  const { data, isPending, isError } = useTransactionsQuery();
  const transactions: get_transactions["transactions"] =
    data?.data.data.transactions;
  const metadata: get_transactions["meta"] = data?.data.data.meta;

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
      {false && (
        <>
          <AccountSetupBanner />
          <div style={{ marginBottom: "40px" }} />
        </>
      )}

      {transactions.length ? (
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.title}>Transaction History</div>
            <div className={classes.description}>
              View all transactions processed through Orki Terminal.
            </div>

            <div className={classes.searchAndFilters}>
              <Search placeholder="Search by ID, Client ID or Provider..." />

              <div className={classes.filters}>
                <Filter onChange={() => {}} value="" />
                <CustomButton
                  style={{
                    borderRadius: "8px",
                    background: "#FEFEFE",
                    border: "1px solid #E5E7EB",
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "12px 16px",
                  }}
                  leftIcon={exportIcon}
                  onClick={() => {}}
                >
                  Export
                </CustomButton>
                <Status onChange={() => {}} value="" />
              </div>
            </div>

            <TransactionTable data={transactions} />

            {false && (
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
