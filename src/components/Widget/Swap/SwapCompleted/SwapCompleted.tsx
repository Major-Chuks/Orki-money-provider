import classes from "./SwapCompleted.module.css";
import {
  ArrowDown,
  CheckIcon,
  Copy as CopyIcon,
  ExternalLink,
} from "lucide-react";
import Copy from "@/components/app/Copy/Copy";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import ethereumLogo from "@/assets/widget/ethereumLogo.svg";
import usdtLogo from "@/assets/widget/usdtLogo.svg";
import Image from "next/image";
import SwapButton from "../SwapButton/SwapButton";

const SwapCompleted = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={classes.container}>
      <div className={classes.successIconWrapper}>
        <CheckIcon width={57} height={57} color="#16A34A" />
      </div>
      <div className={classes.title}>Swap Completed!</div>

      <div className={classes.conversion}>
        <div className={classes.tokenWrapper}>
          <div className={classes.icon}>
            <Image src={ethereumLogo} alt="" />
          </div>
          1 ETH
        </div>
        <ArrowDown width={20} height={20} color="#AEAEB2" />
        <div className={classes.tokenWrapper}>
          <div className={classes.icon}>
            <Image src={usdtLogo} alt="" />
          </div>
          1791.499499 USDT
        </div>
      </div>

      <div className={classes.transactionDetails}>
        <div className={classes.item}>
          <span>Transaction time:</span>
          <span>2.3 seconds</span>
        </div>

        <div className={classes.item}>
          <span>Network fee:</span>
          <span>$0.45</span>
        </div>

        <div className={classes.item}>
          <span>Exchange rate:</span>
          <span>1 ETH ≈ 1791.50 USDT</span>
        </div>
      </div>

      <div className={classes.transactionHash}>
        <div className={classes.label}>Transaction Hash</div>
        <div className={classes.hashWrapper}>
          <div className={classes.hash}>
            0x17a5df9c6c308c330e7cfofc501eb4bfe997fbd673
          </div>

          <div className={classes.icons}>
            <Copy value="0x17a5df9c6c308c330e7cfofc501eb4bfe997fbd673">
              <ButtonWrapper>
                <CopyIcon width={16} height={16} color="#8E8E93" />
              </ButtonWrapper>
            </Copy>
            <ButtonWrapper>
              <ExternalLink width={16} height={16} color="#8E8E93" />
            </ButtonWrapper>
          </div>
        </div>
      </div>

      <SwapButton onClick={onClose}>Make Another Swap</SwapButton>
    </div>
  );
};

export default SwapCompleted;
