import { data } from "../../Transactions/mockData";
import TransactionTable from "../../Transactions/TransactionTable/TransactionTable";
import classes from "./RecentTransactions.module.css";

const RecentTransactions = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>Recent Transactions</div>

      <TransactionTable data={data} />
    </div>
  );
};

export default RecentTransactions;
