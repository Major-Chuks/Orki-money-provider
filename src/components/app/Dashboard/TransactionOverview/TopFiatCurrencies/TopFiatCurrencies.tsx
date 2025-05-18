import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import Chart from "../TopPaymentMethod/Chart/Chart";
import classes from "./TopFiatCurrencies.module.css";

const TopFiatCurrencies = () => {
  const payoutStats = [
    {
      label: "USD",
      color: "#00E065",
      value: 0,
      percentage: "0.00",
    },
    {
      label: "EUR",
      color: "#FFC561",
      value: 0,
      percentage: "0.00",
    },
    {
      label: "GBP",
      color: "#FF7B7B",
      value: 0,
      percentage: "0.00",
    },
    {
      label: "AED",
      color: "#616CFF",
      value: 0,
      percentage: "0.00",
    },
    {
      label: "INR",
      color: "#0BA2CC",
      value: 0,
      percentage: "0.00",
    },
  ];

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header}>
          <div className={classes.title}>Top Fiat Currencies</div>
          <ChartDateFilter />
        </div>

        <div className={classes.chartContainer}>
          {true && (
            <Chart
              data={payoutStats.map(({ label, value, color }) => ({
                value: Number(value),
                name: label,
                color,
              }))}
            />
          )}
        </div>
      </div>

      <div className={classes.legend}>
        {payoutStats.map(({ label, color, percentage }, idx) => (
          <div key={idx} className={classes.item}>
            <div className={classes.tag}>
              <div
                className={classes.indicator}
                style={{ background: color }}
              ></div>
              <div className={classes.label}>{label}</div>
            </div>
            <div className={classes.percent}>{percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFiatCurrencies;
