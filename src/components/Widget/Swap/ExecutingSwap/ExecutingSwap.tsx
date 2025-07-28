/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import TrippleChevronIcon from "@/assets/SvgComponents/TrippleChevronIcon";
import classes from "./ExecutingSwap.module.css";
import ethereumLogo from "@/assets/widget/ethereumLogo.svg";
import usdtLogo from "@/assets/widget/usdtLogo.svg";
import Image from "next/image";
import { CheckIcon, Clock } from "lucide-react";
import LoadingIcon from "@/assets/app/LoadingIcon";
import { useEffect, useState } from "react";
import { PaymentDetails, SwapStatus, SwapSteps } from "../Swap";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import backend from "@/services/apis";
import { handleSubscribeToSwapEvents, handleTestTokenSwap } from "./script";
// import { handleERC20TokenSwap, handleNativeTokenSwap, handleNonEvmTokenSwap } from "./script";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEcho } from "@/hooks/useEcho";
import { formatText } from "@/services/utils";

declare global {
  interface Window {
    Echo: Echo<any>;
    Pusher: typeof Pusher;
  }
}

// TODO implement network switching

const ExecutingSwap = ({
  quote,
  txAddress,
  confirmTransaction,
  onComplete,
  setPaymentDetails,
}: {
  quote: get_swapQuote;
  txAddress: {
    sendingAdderss: string;
    receivingAddress: string;
  };
  confirmTransaction: boolean;
  onComplete: (status: SwapStatus) => void;
  setPaymentDetails: React.Dispatch<
    React.SetStateAction<PaymentDetails | null>
  >;
}) => {
  const [step, setStep] = useState<SwapSteps>("initiating");
  const [status, setStatus] = useState("");
  const token = quote.pair_id.split("_")[0];
  const pair = quote.pair_id.split("_")[1];

  const echo = useEcho();

  const handleInitiateSwap = async () => {
    // initiate swap
    const response = await backend().post_initiateSwap({
      source_address: txAddress.sendingAdderss,
      input_amount: quote.input_amount,
      quote_amount: quote.quote_amount,
      to_address: txAddress.receivingAddress,
      pair_id: quote.pair_id,
    });

    if (!response) {
      setPaymentDetails(null);
      onComplete("failed");
      return;
    }

    const res: PaymentDetails = response.data.data;
    setPaymentDetails(res);

    handleSubscribeToSwapEvents({
      echo,
      swapId: res.id,
      onStatusChange: setStatus,
    });

    // check token type
    // currently assumes that the token is evm and native
    setStep("processing");

    handleTestTokenSwap({
      fromAddress: txAddress.sendingAdderss,
      toAddress: res.pay_in_address,
      amount: res.to_amount,
      onComplete,
      setStep,
    });

    // // if native token: tokenSymbol === network's tokenSymbol
    // handleNativeTokenSwap()

    // // if erc20 token: tokenSymbol !== network's tokenSymbol
    // handleERC20TokenSwap();

    // // if non-evm tokens: if network symbol is not part of view's supported networks
    // handleNonEvmTokenSwap();
  };

  useEffect(() => {
    if (confirmTransaction) {
      setStep("processing");
    } else if (echo) {
      handleInitiateSwap();
    }
  }, [confirmTransaction, echo]);

  useEffect(() => {
    if (status === "complete") {
      onComplete("successful");
    }
  }, [status]);

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
        <div
          className={`${classes.step} ${
            step === "initiating" && classes.active
          }`}
        >
          <div className={classes.icon}>
            {step === "initiating" ? (
              <LoadingIcon width={32} height={32} color="#fff" />
            ) : (
              <CheckIcon color="#FFFFFF" />
            )}
          </div>
          <div className={classes.name}>Initiating swap</div>
        </div>
        <div className={classes.line}></div>
        <div
          className={`${classes.step} ${
            step === "processing" && classes.active
          } ${step === "executing" && classes.complete}`}
        >
          <div className={classes.icon}>
            {step === "initiating" ? (
              <div />
            ) : step === "processing" ? (
              <LoadingIcon width={32} height={32} color="#fff" />
            ) : (
              <CheckIcon color="#FFFFFF" />
            )}
          </div>
          <div className={classes.nameWrapper}>
            <div className={classes.name}>Processing</div>
            <div className={classes.range}>
              <div className={classes.thumb}></div>
            </div>
          </div>
        </div>
        <div className={classes.line}></div>
        <div
          className={`${classes.step} ${
            step === "executing" && classes.active
          }`}
        >
          <div className={classes.icon}>
            {step === "initiating" || step === "processing" ? (
              <Clock color="#FFFFFF" />
            ) : step === "executing" ? (
              <LoadingIcon width={32} height={32} color="#fff" />
            ) : (
              <CheckIcon color="#FFFFFF" />
            )}
          </div>
          <div className={classes.nameWrapper}>
            <div className={classes.name}>Executing transaction</div>
            {status && (
              <div className={classes.status}>
                {formatText(status, "titleCase")}...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.conversion}>
        <div className={classes.price}>
          1 {token} <EquivalentIcon /> {quote.exchange_rate} {pair}
        </div>
        <div className={classes.duration}>Estimated completion: 30 seconds</div>
      </div>
    </div>
  );
};

export default ExecutingSwap;
