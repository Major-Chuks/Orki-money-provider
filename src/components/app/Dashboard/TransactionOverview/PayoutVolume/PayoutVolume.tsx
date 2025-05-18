import ChartDateFilter from "../../ChartDateFilter/ChartDateFilter";
import Chart from "./Chart/Chart";
import classes from "./PayoutVolume.module.css";

const legend = [
  "Onramp 1",
  "Onramp 2",
  "Onramp 3",
  "Onramp 4",
  "Onramp 5",
  "Onramp 6",
  "Onramp 7",
  "Onramp 8",
  "Onramp 9",
  "Onramp 10",
];

const legendFill = [
  "#743B09",
  "#84C512",
  "#6430FF",
  "#B938FF",
  "#2F9860",
  "#D81C2F",
  "#69D931",
  "#3131E5",
  "#22DA90",
  "#3D9AC9",
];

const PayoutVolume = () => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.title}>Payout Volume</div>
        <ChartDateFilter />
      </div>

      <div className={classes.chartContainer}>
        <Chart />
      </div>

      <div className={classes.legend}>
        {legend.map((item, idx) => (
          <div key={idx} className={classes.item}>
            <span style={{ background: legendFill[idx] }}></span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayoutVolume;
