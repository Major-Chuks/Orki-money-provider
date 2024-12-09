import classes from "./RatePanel.module.css";
import refreshIcon from "@/assets/widget/refresh.svg";
import approxEqualIcon from "@/assets/widget/approx-equal.svg";
import moonpayIcon from "@/assets/widget/moonpay.svg";
import Image from "next/image";
import chevronWhite from "@/assets/widget/chevron-white.svg";

const RatePanel = () => {
  return (
    <div className={classes.container}>
      <div>
        <Image src={refreshIcon} alt="" />
        <span>1 BTC</span>
        <Image src={approxEqualIcon} alt="" />
        <span>2724.32 USD</span>
      </div>

      <div>
        <span>By</span>
        <Image src={moonpayIcon} alt="" />
        <Image className={classes.chevron} src={chevronWhite} alt="" />
      </div>
    </div>
  );
};

export default RatePanel;
