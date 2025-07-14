import CautionIcon from "@/assets/SvgComponents/CautionIcon";
import classes from "./SwapNotification.module.css";

const SwapNotification = ({
  message,
  title,
  bottom,
  top,
}: {
  message: string;
  title?: string;
  bottom?: string;
  top?: string;
}) => {
  return (
    <div
      style={{ marginBottom: bottom, marginTop: top }}
      className={classes.container}
    >
      <CautionIcon />
      <div>
        {title ? <div className={classes.title}>{title}</div> : null}
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
};

export default SwapNotification;
