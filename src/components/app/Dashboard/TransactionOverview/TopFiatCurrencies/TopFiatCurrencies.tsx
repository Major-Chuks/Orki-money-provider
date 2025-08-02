import { useState } from "react";
import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import { IntervalType } from "../../Dashboard";
import Chart from "../TopPaymentMethod/Chart/Chart";
import classes from "./TopFiatCurrencies.module.css";
import { useTopFiatCurrenciesQuery } from "@/services/queryApis";
import { get_topFiatCurrencies } from "@/types/apis/analytics/get_topFiatCurrencies";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const TopFiatCurrencies = () => {
  const [interval, setInterval] = useState<IntervalType>("30D");

  const { data, isPending, isError } = useTopFiatCurrenciesQuery({ interval });
  const topFiatCurrencies: get_topFiatCurrencies[] = data?.data.data;

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header}>
          <div className={classes.title}>Top Fiat Currencies</div>
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
              name="Top Fiat Currencies"
              data={topFiatCurrencies.map(
                ({ fiat_currency, percentage, color }) => ({
                  value: Number(percentage.split("%")[0]),
                  name: fiat_currency,
                  color,
                })
              )}
            />
          </div>
        )}
      </div>

      <div className={classes.legend}>
        {topFiatCurrencies?.map(({ fiat_currency, color, percentage }, idx) => (
          <div key={idx} className={classes.item}>
            <div className={classes.tag}>
              <div
                className={classes.indicator}
                style={{ background: color }}
              ></div>
              <div className={classes.label}>{fiat_currency}</div>
            </div>
            <div className={classes.percent}>{percentage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFiatCurrencies;
