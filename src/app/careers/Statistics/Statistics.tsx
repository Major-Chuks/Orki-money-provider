import Responsive from "@/components/Responsive/Responsive";
import classes from "./Statistics.module.css";

const data = [
  {
    count: "95+",
    name: "Supported Fiat Currency",
  },
  {
    count: "180+",
    name: "Supported Countries",
  },
  {
    count: "200+",
    name: "Supported Cryptocurrencies",
  },
  {
    count: "16+",
    name: "Local Payment Methods",
  },
];

const Statistics = () => {
  return (
    <div className={classes.container}>
      <Responsive>
        <div className={classes.listContainer}>
          {data.map(({ count, name }, idx) => (
            <div key={idx} className={classes.box}>
              <div className={classes.count}>{count}</div>
              <div className={classes.name}>{name}</div>
            </div>
          ))}
        </div>
      </Responsive>
    </div>
  );
};

export default Statistics;
