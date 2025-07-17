import { useState } from "react";
import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import { IntervalType } from "../../Dashboard";
import Chart from "./Chart/Chart";
import classes from "./TopPaymentMethod.module.css";
import { get_topPaymentMethods } from "@/types/apis/analytics/get_topPaymentMethods";
import { useTopPaymentMethodsQuery } from "@/services/queryApis";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const TopPaymentMethod = () => {
  const [interval, setInterval] = useState<IntervalType>("1D");

  const { data, isPending, isError } = useTopPaymentMethodsQuery({ interval });
  const topPaymentMethod: get_topPaymentMethods[] = data?.data.data;

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header}>
          <div className={classes.title}>Top Payment Method</div>
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
              name="Top Payment Method"
              data={topPaymentMethod.map(
                ({ payment_method, percentage, color }) => ({
                  value: Number(percentage.split("%")[0]),
                  name: payment_method,
                  color,
                })
              )}
            />
          </div>
        )}
      </div>

      <div className={classes.legend}>
        {topPaymentMethod?.map(({ payment_method, color, percentage }, idx) => (
          <div key={idx} className={classes.item}>
            <div className={classes.tag}>
              <div
                className={classes.indicator}
                style={{ background: color }}
              ></div>
              <div className={classes.label}>{payment_method}</div>
            </div>
            <div className={classes.percent}>{percentage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPaymentMethod;
