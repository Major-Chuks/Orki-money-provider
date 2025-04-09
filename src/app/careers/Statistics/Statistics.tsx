import Responsive from "@/components/Responsive/Responsive";
import classes from "./Statistics.module.css";
import { useState } from "react";
import useSpringProgress from "@/hooks/useSpring";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";

const data = [
  {
    count: 95,
    name: "Supported Fiat Currency",
  },
  {
    count: 180,
    name: "Supported Countries",
  },
  {
    count: 200,
    name: "Supported Cryptocurrencies",
  },
  {
    count: 16,
    name: "Local Payment Methods",
  },
];

const Statistics = () => {
  return (
    <div className={classes.container}>
      <Responsive>
        <div className={classes.listContainer}>
          {data.map(({ count, name }, idx) => (
            <StatCard key={idx} count={count} name={name} />
          ))}
        </div>
      </Responsive>
    </div>
  );
};

export default Statistics;

const StatCard = ({ count, name }: { count: number; name: string }) => {
  const [intersecting, setIntersecting] = useState(false);
  const progress = useSpringProgress(1, count, intersecting);

  return (
    <IntersectionObserver onIntersecting={setIntersecting}>
      <div className={classes.box}>
        <div className={classes.count}>{Math.round(progress)}+</div>
        <div className={classes.name}>{name}</div>
      </div>
    </IntersectionObserver>
  );
};
