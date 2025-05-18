import { useState } from "react";
import classes from "./ChartDateFilter.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

const ChartDateFilter = () => {
  const [date, setDate] = useState<"1" | "7" | "30">("1");

  return (
    <div className={classes.container}>
      <ButtonWrapper>
        <div
          onClick={() => setDate("1")}
          className={`${classes.item} ${date === "1" && classes.active}`}
        >
          1D
        </div>
      </ButtonWrapper>

      <ButtonWrapper>
        <div
          onClick={() => setDate("7")}
          className={`${classes.item} ${date === "7" && classes.active}`}
        >
          7D
        </div>
      </ButtonWrapper>

      <ButtonWrapper>
        <div
          onClick={() => setDate("30")}
          className={`${classes.item} ${date === "30" && classes.active}`}
        >
          30D
        </div>
      </ButtonWrapper>
    </div>
  );
};

export default ChartDateFilter;
