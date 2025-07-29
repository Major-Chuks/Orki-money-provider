import { useDateCountdown } from "@/hooks/useDateCountDown";
import classes from "./CompletionTime.module.css";
import { formatDateCounter } from "@/services/utils";

const CompletionTime = ({
  expiryTime,
}: {
  expiryTime: number | Date | string;
}) => {
  const counter = useDateCountdown(expiryTime);

  return (
    <div className={classes.container}>
      Estimated completion: {formatDateCounter(counter).instant}
    </div>
  );
};

export default CompletionTime;
