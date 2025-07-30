/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import TrippleChevronIcon from "@/assets/SvgComponents/TrippleChevronIcon";
import classes from "./ExecutingSwap.module.css";
import { CheckIcon, Clock } from "lucide-react";
import LoadingIcon from "@/assets/app/LoadingIcon";
import { useCallback, useEffect, useState } from "react";
import { PaymentDetails, SwapStatus, SwapSteps } from "../Swap";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import backend from "@/services/apis";
import {
  handleErc20TokenSwap,
  handleNativeTokenSwap,
  // handleNonEvmTokenSwap,
  handleSubscribeToSwapEvents,
} from "./script";
// import { handleERC20TokenSwap, handleNativeTokenSwap, handleNonEvmTokenSwap } from "./script";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEcho } from "@/hooks/useEcho";
import { formatText } from "@/services/utils";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import CompletionTime from "./CompletionTime";
import { useAppKitNetwork } from "@reown/appkit/react";
import { networks } from "../../../../../config";
import { AppKitNetwork } from "@reown/appkit/networks";

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
  token,
  tokenPair,
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
  token: get_swapPairs[number];
  tokenPair: get_swapPairs[number];
  onComplete: (status: SwapStatus) => void;
  setPaymentDetails: React.Dispatch<
    React.SetStateAction<PaymentDetails | null>
  >;
}) => {
  const [step, setStep] = useState<SwapSteps>("initiating");
  const [status, setStatus] = useState("");
  const tokenSymbol = token.symbol;
  const pairSymbol = tokenPair.symbol;

  const echo = useEcho();

  const { switchNetwork } = useAppKitNetwork();

  const handleSwitchNetwork = useCallback(() => {
    const network: AppKitNetwork | undefined = (
      networks as unknown as AppKitNetwork[]
    ).find((n) => Number(n.id) === Number(token.chainId));
    if (network) {
      switchNetwork(network);
      console.log("Switched network to " + network.name);
    } else {
      throw new Error("Invalid network!");
    }
  }, [switchNetwork, token.chainId]);

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

    setStep("processing");

    if (token.contractAddress && token.chainId) {
      handleSwitchNetwork();

      // // if erc20 tokenSymbol: tokenSymbol !== network's tokenSymbol
      handleErc20TokenSwap({
        fromAddress: txAddress.sendingAdderss,
        toAddress: res.pay_in_address,
        amount: res.pay_in_amount,
        onComplete,
        setStep,
        tokenAddress: token.contractAddress,
      });
    } else if (!token.contractAddress && token.chainId) {
      handleSwitchNetwork();

      // // if native tokenSymbol: tokenSymbol === network's tokenSymbol
      handleNativeTokenSwap({
        fromAddress: txAddress.sendingAdderss,
        toAddress: res.pay_in_address,
        amount: res.pay_in_amount,
        onComplete,
        setStep,
      });
    } else if (!token.contractAddress && !token.chainId) {
      // // if non-evm tokens: if network symbol is not part of view's supported networks
      setStep("processing");
      // handleNonEvmTokenSwap();
    }
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
          <img src={token.token_logo} alt="" />
          <div className={classes.network}>
            <img src={token.network_logo} alt="" />
          </div>
        </div>
        <TrippleChevronIcon />
        <div className={classes.tokenIcon}>
          <img src={tokenPair.token_logo} alt="" />
          <div className={classes.network}>
            <img src={token.network_logo} alt="" />
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
          1 {tokenSymbol} <EquivalentIcon /> {quote.exchange_rate} {pairSymbol}
        </div>
        <CompletionTime expiryTime={quote.expiry} />
      </div>
    </div>
  );
};

export default ExecutingSwap;
