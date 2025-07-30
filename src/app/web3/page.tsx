/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import classes from "./page.module.css";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitBalance,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import type { Provider } from "@reown/appkit/react";
import { mainnet, polygon } from "viem/chains";
import {
  useBalance,
  usePublicClient,
  useSendTransaction,
  useWriteContract,
} from "wagmi";
import { Address, erc20Abi, formatEther, parseEther, parseUnits } from "viem";
import { wagmiAdapter } from "../../../config";
import { debounce } from "lodash";

const WalletInfoDisplay = React.memo(
  ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div>
      <label>{label}: </label>
      {typeof value === "string" ? <p>{value}</p> : value}
    </div>
  )
);
WalletInfoDisplay.displayName = "WalletInfoDisplay";

export default function Web3Page() {
  const [balance, setBalance] = useState<any>();
  const [toAddress, setToAddress] = useState("");
  const [ethValue, setEthValue] = useState("0.001");
  const [sendError, setSendError] = useState<string | null>(null);

  const { open } = useAppKit();
  const { fetchBalance } = useAppKitBalance();

  const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
    useAppKitAccount();

  const { disconnect } = useDisconnect();
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { writeContract } = useWriteContract();

  const { sendTransaction } = useSendTransaction();
  const publicClient = usePublicClient({ config: wagmiAdapter.wagmiConfig });

  const {
    data: balanceData,
    isLoading,
    isError,
  } = useBalance({
    address: "0x4eb9B0dBD3f5e71d8663FE4F833FaBC2C6f322Cb",
    chainId: mainnet.id,
  });

  // Memoized values for expensive computations
  const embeddedWalletInfoString = useMemo(
    () => JSON.stringify(embeddedWalletInfo || {}),
    [embeddedWalletInfo]
  );

  const caipNetworkString = useMemo(
    () => JSON.stringify(caipNetwork || {}, null, 2),
    [caipNetwork]
  );

  // Debounced handlers for inputs
  const handleAddressChange = useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          setToAddress(e.target.value),
        300
      ),
    []
  );

  const handleValueChange = useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => setEthValue(e.target.value),
        300
      ),
    []
  );

  // Event handlers
  const handleConnect = useCallback(() => open(), [open]);
  const handleSwitchNetwork = useCallback(
    () => switchNetwork(polygon),
    [switchNetwork]
  );
  const handleDisconnect = useCallback(async () => {
    await disconnect();
  }, [disconnect]);

  const handleSendTransaction = useCallback(() => {
    if (!isConnected || !toAddress) {
      setSendError(
        "Please connect your wallet and enter a valid recipient address."
      );
      return;
    }

    setSendError(null);
    sendTransaction({
      to: toAddress as `0x${string}`,
      value: parseEther(ethValue),
    });
  }, [isConnected, toAddress, ethValue, sendTransaction]);

  const handleSendToken = useCallback(async () => {
    if (!isConnected || !toAddress) {
      setSendError(
        "Please connect your wallet and enter a valid recipient address."
      );
      return;
    }

    const tokenAddress = "0x4E15361FD6b4BB609Fa63C81A2be19d873717870"; // Replace with actual token contract
    const decimals = 18; // Replace with actual token decimals

    const amount = parseUnits(ethValue, decimals); // convert human-readable to token units

    // const gas = await publicClient.estimateGas({
    //   account: address as Address,
    //   to: tokenAddress as Address,
    //   value: 0n, // Always 0 for ERC-20
    //   data: encodeFunctionData({
    //     abi: erc20ABI,
    //     functionName: "transfer",
    //     args: [toAddress as Address, amount],
    //   }),
    // });

    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "transfer",
      args: [toAddress as `0x${string}`, amount],
    });
  }, [isConnected, toAddress, ethValue, writeContract]);

  const handleEstimateGas = useCallback(async () => {
    if (!isConnected) return console.log("User not connected!");
    if (!toAddress) return console.log("Please set the receiving address");
    if (!ethValue) return console.log("Please set value");

    if (publicClient) {
      console.log("Estimating...");
      const gas = await publicClient.estimateGas({
        account: address as Address,
        to: toAddress as Address,
        value: parseEther(ethValue),
      });
      console.log({ gas });
    }
  }, [isConnected, toAddress, ethValue, publicClient, address]);

  const handleCheckBalance = async () => {
    if (!publicClient) throw new Error("Missing public client");

    const balance: bigint = await publicClient.readContract({
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      abi: erc20Abi,
      functionName: "balanceOf",
      args: ["0x320685Ad4B07e2F23f8831c181387836268Bbe79"],
    });

    const formatted = formatEther(balance);

    console.log({ formatted });
  };

  // Effects
  useEffect(() => {
    if (isConnected) {
      (async () => {
        const res = await fetchBalance();
        setBalance(res.data);
      })();
    }
  }, [isConnected, fetchBalance]);

  useEffect(() => {
    if (!walletProvider?.on) {
      console.log("Event Registration Failed ❌");
      return;
    }

    console.log("Event Registration Successful ✅");

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Accounts changed:", accounts);
    };

    const handleChainChanged = (chainId: string) => {
      console.log("Chain changed to:", parseInt(chainId, 16));
    };

    const handleDisconnectEvent = (error: unknown) => {
      console.warn("Wallet disconnected", error);
    };

    walletProvider.on("accountsChanged", handleAccountsChanged);
    walletProvider.on("chainChanged", handleChainChanged);
    walletProvider.on("disconnect", handleDisconnectEvent);

    return () => {
      walletProvider.removeListener("accountsChanged", handleAccountsChanged);
      walletProvider.removeListener("chainChanged", handleChainChanged);
      walletProvider.removeListener("disconnect", handleDisconnectEvent);
    };
  }, [walletProvider]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      handleAddressChange.cancel();
      handleValueChange.cancel();
    };
  }, [handleAddressChange, handleValueChange]);

  useEffect(() => {
    console.log({ balanceData, isLoading, isError });
  }, [balanceData, isLoading, isError]);

  return (
    <div className={classes.container}>
      <button onClick={handleConnect}>Connect wallet</button>{" "}
      <button onClick={handleDisconnect}>Disconnect</button>{" "}
      <button onClick={handleSwitchNetwork}>Switch Network</button>{" "}
      <button onClick={handleEstimateGas}>Estimate Gas</button>{" "}
      <button onClick={handleCheckBalance}>Check Balance</button>
      <br />
      <br />
      <div>
        <label>Send to address:</label>
        <input
          type="text"
          placeholder="0x..."
          defaultValue={toAddress}
          onChange={handleAddressChange}
          style={{ width: "400px", padding: "4px", marginTop: "4px" }}
        />
      </div>
      <br />
      <div style={{ marginTop: "10px" }}>
        <label>Amount (ETH):</label>
        <input
          type="number"
          placeholder="0.001"
          defaultValue={ethValue}
          onChange={handleValueChange}
          style={{ width: "200px", padding: "4px", marginTop: "4px" }}
        />
      </div>
      <br />
      <button onClick={handleSendTransaction}>Send {ethValue} ETH</button>
      <button onClick={handleSendToken}>Send {ethValue} ETH</button>
      {sendError && (
        <p style={{ color: "red", marginTop: "10px" }}>{sendError}</p>
      )}
      <br />
      <div>
        {balance && (
          <WalletInfoDisplay
            label="Balance"
            value={`${balance.balance} ${balance.symbol}`}
          />
        )}
      </div>
      <br />
      <WalletInfoDisplay label="Address" value={address} />
      <br />
      <WalletInfoDisplay label="caipAddress" value={caipAddress} />
      <br />
      <WalletInfoDisplay
        label="isConnected"
        value={isConnected ? "true" : "false"}
      />
      <br />
      <WalletInfoDisplay label="status" value={status} />
      <br />
      <WalletInfoDisplay
        label="embeddedWalletInfo"
        value={embeddedWalletInfoString}
      />
      <br />
      <WalletInfoDisplay
        label="caipNetwork"
        value={<pre>{caipNetworkString}</pre>}
      />
      <br />
      <WalletInfoDisplay label="caipNetworkId" value={caipNetworkId} />
      <br />
      <WalletInfoDisplay label="chainId" value={chainId} />
    </div>
  );
}
