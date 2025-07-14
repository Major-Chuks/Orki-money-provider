import TrippleChevronIcon from "@/assets/SvgComponents/TrippleChevronIcon";
import classes from "./ExecutingSwap.module.css";
import ethereumLogo from "@/assets/widget/ethereumLogo.svg";
import usdtLogo from "@/assets/widget/usdtLogo.svg";
import Image from "next/image";
import { CheckIcon, Clock } from "lucide-react";
import LoadingIcon from "@/assets/app/LoadingIcon";
import { useEffect } from "react";
import { SwapStatus } from "../Swap";

const ExecutingSwap = ({
  onComplete,
}: {
  onComplete: (status: SwapStatus) => void;
}) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete("insufficient_fund");
    }, 5000);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.title}>Executing Swap</div>
      <div className={classes.description}>
        Please wait while we process your transactions
      </div>

      <div className={classes.tokenWrapper}>
        <div className={classes.tokenIcon}>
          <Image src={ethereumLogo} alt="" />
          <div className={classes.network}>
            <Image src={ethereumLogo} alt="" />
          </div>
        </div>
        <TrippleChevronIcon />
        <div className={classes.tokenIcon}>
          <Image src={usdtLogo} alt="" />
          <div className={classes.network}>
            <Image src={ethereumLogo} alt="" />
          </div>
        </div>
      </div>

      <div className={classes.progress}>
        <div className={classes.step}>
          <div className={classes.icon}>
            <CheckIcon color="#FFFFFF" />
          </div>
          <div className={classes.name}>Initiating swap</div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.step}>
          <div className={classes.icon}>
            <LoadingIcon width={32} height={32} color="#fff" />
          </div>
          <div className={classes.rangeWrapper}>
            <div className={classes.name}>Processing</div>
            <div className={classes.range}>
              <div className={classes.thumb}></div>
            </div>
          </div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.step}>
          <div className={classes.icon}>
            <Clock color="#FFFFFF" />
          </div>
          <div className={classes.name}>Executing transaction</div>
        </div>
      </div>

      <div className={classes.conversion}>
        <div className={classes.price}>1 ETH 1791.499499939 USDT</div>
        <div className={classes.duration}>Estimated completion: 30 seconds</div>
      </div>
    </div>
  );
};

export default ExecutingSwap;
