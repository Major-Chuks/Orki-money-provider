/* eslint-disable @typescript-eslint/no-explicit-any */
import { erc20Abi, parseEther, parseUnits, type Address } from "viem";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import { config } from "../../../../../config";
import { SwapStatus, SwapSteps } from "../Swap";
import Echo from "laravel-echo";
import React from "react";

const publicClient = getPublicClient(config);

// handle native token swap
export const handleNativeTokenSwap = async ({
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
  const parsedAmount = parseEther(String(amount));

  // prepare transaction
  const transaction = {
    account: fromAddress as Address,
    to: toAddress as Address,
    value: parsedAmount,
  };

  try {
    if (!publicClient) throw new Error("Missing public client");

    // Check token balance
    const balance = await publicClient.getBalance({
      address: fromAddress as Address,
    });

    // const formatted = formatEther(balance);

    // if (Number(formatted) <= amount) {
    //   onComplete("insufficient_fund");
    //   return;
    // }

    if (balance < parsedAmount) {
      onComplete("insufficient_fund");
      return;
    }

    const walletClient = await getWalletClient(config);
    if (!walletClient) throw new Error("Missing wallet client");

    // Estimate Gas
    const gasEstimate = await publicClient.estimateGas(transaction);
    const gas = gasEstimate + BigInt(10_000); // small buffer

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
  } catch (error) {
    console.log(error);
    onComplete("failed");
  }
};

// Handle ERC-20 token transfer
export const handleErc20TokenSwap = async ({
  fromAddress,
  toAddress,
  amount,
  tokenAddress,
  decimals = 18,
  onComplete,
  setStep,
}: {
  fromAddress: string;
  toAddress: string;
  amount: number;
  tokenAddress: string;
  decimals?: number;
  onComplete: (status: SwapStatus) => void;
  setStep: React.Dispatch<React.SetStateAction<SwapSteps>>;
}) => {
  const parsedAmount = parseUnits(String(amount), decimals);

  try {
    if (!publicClient) throw new Error("Missing public client");

    // Check token balance
    const balance: bigint = await publicClient.readContract({
      address: tokenAddress as Address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [fromAddress as Address],
    });

    if (balance < parsedAmount) {
      onComplete("insufficient_fund");
      return;
    }

    const walletClient = await getWalletClient(config);
    if (!walletClient) throw new Error("Missing wallet client");

    setStep("executing");

    // Optional: estimate gas
    const gasEstimate = await publicClient.estimateContractGas({
      address: tokenAddress as Address,
      abi: erc20Abi,
      functionName: "transfer",
      args: [toAddress as Address, parsedAmount],
      account: fromAddress as Address,
    });

    // Optional: add a buffer
    const gas = gasEstimate + BigInt(10_000);

    // Send ERC-20 token transfer
    const hash = await walletClient.writeContract({
      address: tokenAddress as Address,
      abi: erc20Abi,
      functionName: "transfer",
      args: [toAddress as Address, parsedAmount],
      account: fromAddress as Address,
      gas,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    // TODO: update swap endpoint with the txHash

    console.log("ERC-20 transfer confirmed in block:", receipt.blockNumber);
    // You can add endpoint updates here
  } catch (error) {
    console.error(error);
    onComplete("failed");
  }
};

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
