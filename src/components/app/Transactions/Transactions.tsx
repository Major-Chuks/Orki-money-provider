import AccountSetupBanner from "../AccountSetupBanner/AccountSetupBanner";
import classes from "./Transactions.module.css";
import EmptyState from "./EmptyState/EmptyState";
import Pagination from "../Pagination/Pagination";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import exportIcon from "@/assets/app/exportIcon.svg";
import filterIcon from "@/assets/app/filterIcon.svg";
import chevronIcon from "@/assets/app/cheveron-down.svg";
import TransactionTable from "./TransactionTable/TransactionTable";
import { useTransactionsQuery } from "@/services/queryApis";
import { get_transactions } from "@/types/apis/transactions/get_transactions";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import AdvancedSearch, {
  SearchParamsType,
} from "./AdvancedSearch/AdvancedSearch";
import { useState } from "react";

const Transactions = () => {
  const [params, setParams] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const { data, isPending, isError } = useTransactionsQuery({
    params,
  });
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

  const handleSearch = async (searchParams: SearchParamsType) => {
    const activeSearch = Object.keys(searchParams).filter((s) => {
      const key = s as keyof typeof searchParams;
      if (
        s === "created_between" &&
        !searchParams[s].split(",").every((t) => t)
      ) {
        return false;
      }
      return searchParams[key];
    });
    let params = "";
    activeSearch.forEach((s) => {
      const key = s as keyof typeof searchParams;
      if (!params) {
        params += `?filters[${s.toLowerCase()}]=${searchParams[key]}`;
      } else {
        params += `&filters[${s.toLowerCase()}]=${searchParams[key]}`;
      }
    });

    setParams(params);
  };

  if (isError) return <ErrorScreen />;

  return (
    <>
      {false && (
        <>
          <AccountSetupBanner />
          <div style={{ marginBottom: "40px" }} />
        </>
      )}

      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>Transaction History</div>
          <div className={classes.description}>
            View all transactions processed through Orki Terminal.
          </div>

          <div className={classes.searchAndFilters}>
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
              onClick={() => setOpenSearch(!openSearch)}
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
              onClick={() => {}}
            >
              Export
            </CustomButton>
          </div>

          {openSearch ? <AdvancedSearch onSearch={handleSearch} /> : null}

          {isPending ? (
            <LoadingScreen />
          ) : transactions.length ? (
            <TransactionTable data={transactions} />
          ) : (
            <EmptyState isSearch={params} />
          )}

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
    </>
  );
};

export default Transactions;
