/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  erc20Abi,
  formatEther,
  parseEther,
  parseUnits,
  type PublicClient,
  type Address,
} from "viem";
import { getWalletClient } from "@wagmi/core";
import { config } from "../../../../../config";
import { SwapStatus, SwapSteps } from "../Swap";
import React from "react";

// handle native token swap
export const handleNativeTokenSwap = async ({
  fromAddress,
  toAddress,
  amount,
  onComplete,
  setStep,
  publicClient,
}: {
  fromAddress: string;
  toAddress: string;
  amount: number;
  onComplete: (status: SwapStatus) => void;
  setStep: React.Dispatch<React.SetStateAction<SwapSteps>>;
  publicClient: PublicClient;
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

    // create a minor delay
    await new Promise((res) => {
      setTimeout(() => {
        res("");
      }, 2000);
    });

    // Check token balance
    const balance = await publicClient.getBalance({
      address: fromAddress as Address,
    });

    const formatted = formatEther(balance);
    console.log({ formatted });

    if (balance < parsedAmount) {
      onComplete("insufficient_fund");
      return;
    }

    const walletClient = await getWalletClient(config);
    if (!walletClient) throw new Error("Missing wallet client");

    // Estimate Gas
    const gasEstimate = await publicClient.estimateGas(transaction);
    const gas = gasEstimate + BigInt(10_000); // small buffer

    const formattedGas = formatEther(gas);

    console.log({ formattedGas });

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
  publicClient,
}: {
  fromAddress: string;
  toAddress: string;
  amount: number;
  tokenAddress: string;
  decimals?: number;
  onComplete: (status: SwapStatus) => void;
  setStep: React.Dispatch<React.SetStateAction<SwapSteps>>;
  publicClient: PublicClient;
}) => {
  const parsedAmount = parseUnits(String(amount), decimals);

  try {
    if (!publicClient) throw new Error("Missing public client");

    // create a minor delay
    await new Promise((res) => {
      setTimeout(() => {
        res("");
      }, 2000);
    });

    // Check token balance
    const balance: bigint = await publicClient.readContract({
      address: tokenAddress as Address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [fromAddress as Address],
    });

    const formatted = formatEther(balance);
    console.log({ formatted });

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
