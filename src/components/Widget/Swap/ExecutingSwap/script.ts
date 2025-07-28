/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatEther, parseEther, type Address } from "viem";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import { config } from "../../../../../config";
import { SwapStatus, SwapSteps } from "../Swap";
import Echo from "laravel-echo";
import React from "react";

const publicClient = getPublicClient(config);

// handle native token swap
export const handleTestTokenSwap = async ({
  fromAddress,
  toAddress,
  amount,
  onComplete,
  setStep,
}: {
  fromAddress: string;
  toAddress: string;
  amount: number;
  onComplete: (status: SwapStatus) => void;
  setStep: React.Dispatch<React.SetStateAction<SwapSteps>>;
}) => {
  // prepare transaction
  const transaction = {
    account: fromAddress as Address,
    to: toAddress as Address,
    value: parseEther(String(amount)),
  };

  try {
    if (publicClient) {
      // Check Balance

      const balance = await publicClient.getBalance({
        address: fromAddress as Address,
      });

      const formatted = formatEther(balance);

      if (Number(formatted) <= amount) {
        onComplete("insufficient_fund");
        return;
      }

      // Estimate Gas
      const gas = await publicClient.estimateGas(transaction);

      const walletClient = await getWalletClient(config);

      // Send Fund
      const txHash = await walletClient.sendTransaction({
        ...transaction,
        gas,
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      // TODO: update swap endpoint with the txHash
      setStep("executing");
      console.log("Transaction confirmed in block:", receipt.blockNumber);
    }
  } catch (error) {
    console.log(error);
    onComplete("failed");
  }
};

export const handleNativeTokenSwap = async () => {};

// handle erc 20 swap
export const handleERC20TokenSwap = async () => {};

// handle no evm swap
export const handleNonEvmTokenSwap = async () => {};

export const handleSubscribeToSwapEvents = ({
  echo,
  swapId,
  onStatusChange,
}: {
  echo: Echo<any>;
  swapId: string;
  onStatusChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (echo) {
    echo
      .channel(`swaps.${swapId}`)
      .listen(".swaps.status_changed", (e: any) => {
        console.log("Swap status changed event:", e);
        onStatusChange(e.status);
        switch (e.status) {
          case "awaiting":
            break;
          case "complete":
            break;
          case "delayed":
            break;
          case "expired":
            break;
          case "in progress":
            break;
          case "failed":
            break;
          case "refunded":
            break;
          case "swapped":
            break;
          case "pending":
            break;
          default:
            console.warn("Unknown status:", e.status);
        }
      });
  }
};
