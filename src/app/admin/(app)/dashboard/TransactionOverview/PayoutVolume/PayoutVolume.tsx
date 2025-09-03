import { useState } from "react";
import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import Chart from "./Chart/Chart";
import classes from "./PayoutVolume.module.css";
import { IntervalType } from "../../Dashboard";
import { useTransactionVolumeQuery } from "@/services/queryApis";
import { get_transactionVolume } from "@/types/apis/analytics/get_transactionVolume";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import CurrencyFilter from "../../CurrencyFilter/CurrencyFilter";

const PayoutVolume = () => {
  const [interval, setInterval] = useState<IntervalType>("30D");
  const [currency, setCurrency] = useState<string>("USD");

  const { data, isPending, isError } = useTransactionVolumeQuery({
    interval,
    currency,
  });

  const txVolume: get_transactionVolume = data?.data.data;

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.title}>Transaction Volume</div>
        <div className={classes.filterWrapper}>
          <CurrencyFilter onChange={setCurrency} />
          <ChartDateFilter onChange={setInterval} />
        </div>
      </div>

      {isPending ? (
        <>
          <LoadingScreen style={{ height: "320px" }} />
        </>
      ) : isError ? (
        <ErrorScreen style={{ height: "320px" }} />
      ) : (
        <>
          <div className={classes.chartContainer}>
            {txVolume.data.length ? (
              txVolume.provider_color_map && (
                <Chart
                  key={interval + currency}
                  data={txVolume}
                  interval={interval}
                />
              )
            ) : (
              <div className={classes.infoText}>No result found</div>
            )}
          </div>

          <div className={classes.legend}>
            {txVolume.provider_color_map &&
              Object.entries(txVolume.provider_color_map).map(
                ([key, value], idx) => (
                  <div key={idx} className={classes.item}>
                    <span style={{ background: value }}></span>
                    {key}
                  </div>
                )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default PayoutVolume;
