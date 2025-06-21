import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import Chart from "./Chart/Chart";
import classes from "./TransactionsOverTime.module.css";

const TransactionsOverTime = () => {
  const data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const series = [0, 0, 0, 0, 0, 0, 0];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Transactions Over Time</div>
        <ChartDateFilter />
      </div>

      <div className={classes.chartContainer}>
        <Chart data={data} series={series} />
      </div>
    </div>
  );
};

export default TransactionsOverTime;
