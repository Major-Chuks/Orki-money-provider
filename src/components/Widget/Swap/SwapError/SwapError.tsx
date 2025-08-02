import { ArrowLeft } from "lucide-react";
import classes from "./SwapError.module.css";

const SwapError = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={onClose} className={classes.backBtn}>
          <ArrowLeft /> Back
        </div>
      </div>

      <div className={classes.main}>
        <div className={classes.errorText}>Something went wrong!</div>
      </div>
    </div>
  );
};

export default SwapError;
