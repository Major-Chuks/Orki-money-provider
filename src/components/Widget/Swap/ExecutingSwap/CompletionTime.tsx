import { useDateCountdown } from "@/hooks/useDateCountDown";
import classes from "./CompletionTime.module.css";
import { formatDateCounter } from "@/services/utils";
import { useEffect } from "react";

const CompletionTime = ({
  expiryTime,
  onRefresh,
  style,
}: {
  expiryTime: number | Date | string;
  onRefresh?: () => void;
  style?: React.CSSProperties;
}) => {
  const counter = useDateCountdown(expiryTime);

  useEffect(() => {
    if (counter === 0) {
      if (onRefresh) onRefresh();
    }
  }, [counter]);

  return (
    <span style={style} className={classes.duration}>
      {formatDateCounter(counter).compact}
    </span>
  );
};

export default CompletionTime;
