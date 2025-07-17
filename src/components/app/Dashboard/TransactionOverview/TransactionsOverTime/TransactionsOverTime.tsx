import { useState } from "react";
import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import { IntervalType } from "../../Dashboard";
import Chart from "./Chart/Chart";
import classes from "./TransactionsOverTime.module.css";
import { get_transactionHistory } from "@/types/apis/analytics/get_transactionHistory";
import { useTransactionHistoryQuery } from "@/services/queryApis";
import { formatDateByInterval, formatStringToMoney } from "@/services/utils";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const TransactionsOverTime = () => {
  const [interval, setInterval] = useState<IntervalType>("1D");
  // const [currency, setCurrency] = useState<string>("USD");

  const currency = "USD";

  const { data, isPending, isError } = useTransactionHistoryQuery({
    interval,
    currency,
  });
  const txOverTime: get_transactionHistory[] = data?.data.data;

  const date = txOverTime?.map((entry) =>
    formatDateByInterval(entry.date, interval)
  );
  const successTxns = txOverTime?.map((tx) => tx.successful.amount);
  const failedTxns = txOverTime?.map((tx) => tx.failed.amount);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.title}>Transactions Over Time</div>
        <ChartDateFilter onChange={setInterval} />
      </div>

      {isPending ? (
        <>
          <LoadingScreen style={{ height: "320px" }} />
        </>
      ) : isError ? (
        <ErrorScreen style={{ height: "320px" }} />
      ) : (
        <div className={classes.chartContainer}>
          <Chart
            data={date}
            series={[
              {
                name: `Successful Transactions: ${
                  successTxns.length
                } (${currency}  ${formatStringToMoney(
                  String(successTxns.reduce((acc, curr) => acc + curr, 0))
                )})`,
                data: successTxns,
                color: "#2268D178",
              },
              {
                name: `Failed Transaction: ${
                  failedTxns.length
                } (${currency}  ${formatStringToMoney(
                  String(failedTxns.reduce((acc, curr) => acc + curr, 0))
                )})`,
                data: failedTxns,
                color: "#2268D1",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionsOverTime;
