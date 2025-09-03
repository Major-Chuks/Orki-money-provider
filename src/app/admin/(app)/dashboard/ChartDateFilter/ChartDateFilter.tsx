import { useEffect, useState } from "react";
import classes from "./ChartDateFilter.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

const ChartDateFilter = ({
  onChange,
}: {
  onChange: (interval: "1D" | "7D" | "30D") => void;
}) => {
  const [interval, setInterval] = useState<"1D" | "7D" | "30D">("30D");

  useEffect(() => {
    onChange(interval);
  }, [interval]);

  return (
    <div className={classes.container}>
      <ButtonWrapper>
        <div
          onClick={() => setInterval("1D")}
          className={`${classes.item} ${interval === "1D" && classes.active}`}
        >
          1D
        </div>
      </ButtonWrapper>

      <ButtonWrapper>
        <div
          onClick={() => setInterval("7D")}
          className={`${classes.item} ${interval === "7D" && classes.active}`}
        >
          7D
        </div>
      </ButtonWrapper>

      <ButtonWrapper>
        <div
          onClick={() => setInterval("30D")}
          className={`${classes.item} ${interval === "30D" && classes.active}`}
        >
          30D
        </div>
      </ButtonWrapper>
    </div>
  );
};

export default ChartDateFilter;
