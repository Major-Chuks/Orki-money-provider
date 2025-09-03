import { useToast } from "@/context/Toast/ToastContext";
import classes from "./Dashboard.module.css";
import Statistics from "./Statistics/Statistics";
import TransactionOverview from "./TransactionOverview/TransactionOverview";

export type IntervalType = "1D" | "7D" | "30D";

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
    </div>
  );
};

export default Dashboard;
