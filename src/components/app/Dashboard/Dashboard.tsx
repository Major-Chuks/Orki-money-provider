import classes from "./Dashboard.module.css";
import RecentTransactions from "./RecentTransactions/RecentTransactions";
import Statistics from "./Statistics/Statistics";
import TransactionOverview from "./TransactionOverview/TransactionOverview";

const Dashboard = () => {
  return (
    <div className={classes.container}>
      <Statistics />
      <TransactionOverview />
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
