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
import { useSwapQuery } from "@/services/queryApis";
import { get_swap } from "@/types/apis/swap/get_swap";
import { SwapStatus } from "../Swap";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import { formatText } from "@/services/utils";

const SwapCompleted = ({
  onClose,
  onComplete,
  swapId,
}: {
  onClose: () => void;
  onComplete: (status: SwapStatus) => void;
  swapId: string;
}) => {
  const { data, isPending, isError } = useSwapQuery({
    id: swapId,
  });
  const swap: get_swap = data?.data.data;

  if (isError) {
    onComplete("failed");
  }

  return (
    <div className={classes.container}>
      {isPending ? (
        <div className={classes.loadingText}>Retrieving receipt...</div>
      ) : swap ? (
        <>
          <div className={classes.successIconWrapper}>
            <CheckIcon width={57} height={57} color="#16A34A" />
          </div>
          {swap.status === "complete" ? (
            <div className={classes.title}>Swap Completed!</div>
          ) : (
            <div className={classes.title}>
              Swap {formatText(swap.status, "titleCase")}
            </div>
          )}

          <div className={classes.conversion}>
            <div className={classes.tokenWrapper}>
              <div className={classes.icon}>
                <Image src={ethereumLogo} alt="" />
              </div>
              --
            </div>
            <ArrowDown width={20} height={20} color="#AEAEB2" />
            <div className={classes.tokenWrapper}>
              <div className={classes.icon}>
                <Image src={usdtLogo} alt="" />
              </div>
              --
            </div>
          </div>

          <div className={classes.transactionDetails}>
            {/* <div className={classes.item}>
              <span>From address:</span>
              <span>{formatText(swap.from_address, "clip", [5, 8])}</span>
            </div>

            <div className={classes.item}>
              <span>To address:</span>
              <span>{formatText(swap.to_address, "clip", [5, 8])}</span>
            </div>

            <div className={classes.item}>
              <span>Pay in address:</span>
              <span>{formatText(swap.pay_in_address, "clip", [5, 8])}</span>
            </div> */}

            <div className={classes.item}>
              <span>Transaction time:</span>
              <span>{swap.elapsed_time}</span>
            </div>

            <div className={classes.item}>
              <span>Network fee:</span>
              <span>--</span>
            </div>

            <div className={classes.item}>
              <span>Exchange rate:</span>
              <span>1 {swap.from_asset}</span> <EquivalentIcon />{" "}
              <span>
                {swap.exchange_rate} {swap.to_asset}
              </span>
            </div>
          </div>

          <div className={classes.transactionHash}>
            <div className={classes.label}>Transaction Hash</div>
            <div className={classes.hashWrapper}>
              <div className={classes.hash}>{swap.transaction_hash}</div>

              <div className={classes.icons}>
                <Copy value={swap.transaction_hash}>
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
        </>
      ) : null}
    </div>
  );
};

export default SwapCompleted;
