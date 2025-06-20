import { useTransactionsQuery } from "@/services/queryApis";
import TransactionTable from "../../Transactions/TransactionTable/TransactionTable";
import classes from "./RecentTransactions.module.css";
import { get_transactions } from "@/types/apis/transactions/get_transactions";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const RecentTransactions = () => {
  const { data, isPending, isError } = useTransactionsQuery();
  const transactions: get_transactions["transactions"] =
    data?.data.data.transactions;

  if (isPending) return <LoadingScreen />;

  if (isError) return <ErrorScreen />;

  return (
    <div className={classes.container}>
      <div className={classes.header}>Recent Transactions</div>

      <TransactionTable data={transactions} />
    </div>
  );
};

export default RecentTransactions;
