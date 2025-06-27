import { useToast } from "@/context/Toast/ToastContext";
import classes from "./Dashboard.module.css";
import RecentTransactions from "./RecentTransactions/RecentTransactions";
import Statistics from "./Statistics/Statistics";
import TransactionOverview from "./TransactionOverview/TransactionOverview";

const Dashboard = () => {
  const { showToast } = useToast();

  return (
    <div className={classes.container}>
      <button
        style={{ display: "none" }}
        onClick={() => showToast("Settings saved!", "error")}
      >
        Show Toast
      </button>
      <Statistics />
      <TransactionOverview />
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
