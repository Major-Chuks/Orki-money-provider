/* eslint-disable react-hooks/exhaustive-deps */
import TrippleChevronIcon from "@/assets/SvgComponents/TrippleChevronIcon";
import classes from "./ExecutingSwap.module.css";
import ethereumLogo from "@/assets/widget/ethereumLogo.svg";
import usdtLogo from "@/assets/widget/usdtLogo.svg";
import Image from "next/image";
import { CheckIcon, Clock } from "lucide-react";
import LoadingIcon from "@/assets/app/LoadingIcon";
import { useEffect, useState } from "react";
import { PaymentDetails, SwapStatus } from "../Swap";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";
import EquivalentIcon from "@/assets/SvgComponents/EquivalentIcon";
import {
  useBalance,
  usePublicClient,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { formatEther, parseEther, parseGwei, type Address } from "viem";
import backend from "@/services/apis";
import { useSendTransaction } from "wagmi";
import { wagmiAdapter } from "../../../../../config";

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
  const [step, setStep] = useState<"initiating" | "processing" | "executing">(
    "initiating"
  );
  const token = quote.pair_id.split("_")[0];
  const pair = quote.pair_id.split("_")[1];

  const publicClient = usePublicClient({ config: wagmiAdapter.wagmiConfig });
  // const { data: gas } = useEstimateGas({ ...TEST_TX });
  const { data: hash, sendTransaction } = useSendTransaction();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { address } = useAppKitAccount();

  const { refetch } = useBalance({
    address: address as Address,
    chainId: 80002,
  });

  // function to get the balance
  const handleGetBalance = async () => {
    const balance = await refetch();
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      balance.data?.value.toString()
    );

    if (balance.data) {
      return formatEther(balance.data?.value);
    }
  };

  const handleInitiateSwap = async () => {
    const balance = await handleGetBalance();
    console.log({ balance });

    // initiate swap
    const response = await backend().post_initiateSwap({
      source_address: txAddress.sendingAdderss,
      input_amount: quote.input_amount,
      quote_amount: quote.quote_amount,
      to_address: txAddress.receivingAddress,
      pair_id: quote.pair_id,
    });

    if (response) {
      const res: PaymentDetails = response.data.data;
      setPaymentDetails(res);
      if (balance && Number(balance) <= Number(quote.input_amount)) {
        onComplete("insufficient_fund");
      } else {
        // Todo: send the fund
        let gas;
        if (publicClient) {
          gas = await publicClient.estimateGas({
            account: txAddress.sendingAdderss as Address,
            to: res.pay_in_address as Address,
            value: parseEther(String(quote.input_amount)),
          });
        } else {
          console.error("publicClient is undefined");
          return;
        }
        try {
          sendTransaction({
            to: txAddress.receivingAddress as Address, // example recipient
            value: parseGwei("0.01"), // convert ETH unit to wei
            gas,
          });

          console.log(hash);
        } catch (err) {
          console.error("Error sending transaction:", err);
        }
      }
    } else {
      setPaymentDetails(null);
      onComplete("failed");
    }
  };

  console.log({ isLoading, isSuccess });

  useEffect(() => {
    console.log({ confirmTransaction });

    if (confirmTransaction) {
      setStep("processing");
      setTimeout(() => {
        onComplete("failed");
      }, 5000);
    } else {
      handleInitiateSwap();
    }
  }, [confirmTransaction]);

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
            <CheckIcon color="#FFFFFF" />
          </div>
          <div className={classes.name}>Initiating swap</div>
        </div>
        <div className={classes.line}></div>
        <div
          className={`${classes.step} ${
            step === "processing" && classes.active
          }`}
        >
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
        <div
          className={`${classes.step} ${
            step === "executing" && classes.active
          }`}
        >
          <div className={classes.icon}>
            <Clock color="#FFFFFF" />
          </div>
          <div className={classes.name}>Executing transaction</div>
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
