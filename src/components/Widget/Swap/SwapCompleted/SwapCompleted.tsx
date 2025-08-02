/* eslint-disable @next/next/no-img-element */
import classes from "./SwapCompleted.module.css";
import {
  ArrowDown,
  CheckIcon,
  Copy as CopyIcon,
  ExternalLink,
} from "lucide-react";
import Copy from "@/components/app/Copy/Copy";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
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
          {swap.status === "complete" ? (
            <div className={classes.successIconWrapper}>
              <CheckIcon width={57} height={57} color="#16A34A" />
            </div>
          ) : null}
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
                <img src={swap.from_asset.logo} alt="" />
              </div>
              {swap.from_amount}
            </div>
            <ArrowDown width={20} height={20} color="#AEAEB2" />
            <div className={classes.tokenWrapper}>
              <div className={classes.icon}>
                <img src={swap.to_asset.logo} alt="" />
              </div>
              {swap.payout_amount}
            </div>
          </div>

          <div className={classes.transactionDetails}>
            <div className={classes.item}>
              <span className={classes.key}>From address:</span>
              <div className={classes.withCopy}>
                <span className={classes.value}>
                  {formatText(swap.from_address, "clip", [5, 6])}
                </span>
                <Copy value={swap.from_address}>
                  <ButtonWrapper>
                    <CopyIcon width={16} height={16} color="#8E8E93" />
                  </ButtonWrapper>
                </Copy>
              </div>
            </div>

            <div className={classes.item}>
              <span className={classes.key}>To address:</span>
              <div className={classes.withCopy}>
                <span className={classes.value}>
                  {formatText(swap.to_address, "clip", [5, 6])}
                </span>
                <Copy value={swap.to_address}>
                  <ButtonWrapper>
                    <CopyIcon width={16} height={16} color="#8E8E93" />
                  </ButtonWrapper>
                </Copy>
              </div>
            </div>

            <div className={classes.item}>
              <span className={classes.key}>Pay in address:</span>
              <div className={classes.withCopy}>
                <span className={classes.value}>
                  {formatText(swap.pay_in_address, "clip", [5, 6])}
                </span>
                <Copy value={swap.pay_in_address}>
                  <ButtonWrapper>
                    <CopyIcon width={16} height={16} color="#8E8E93" />
                  </ButtonWrapper>
                </Copy>
              </div>
            </div>

            <div className={classes.item}>
              <span className={classes.key}>Transaction time:</span>
              <span className={classes.value}>{swap.elapsed_time}</span>
            </div>

            <div className={classes.item}>
              <span className={classes.key}>Exchange rate:</span>
              <div className={`${classes.rate} ${classes.value}`}>
                <span>1 {swap.from_asset.asset}</span> <EquivalentIcon />{" "}
                <span>
                  {swap.exchange_rate} {swap.to_asset.asset}
                </span>
              </div>
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
                {swap.explorer ? (
                  <ButtonWrapper
                    onClick={() => window.open(swap.explorer, "_blank")}
                  >
                    <ExternalLink width={16} height={16} color="#8E8E93" />
                  </ButtonWrapper>
                ) : null}
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
