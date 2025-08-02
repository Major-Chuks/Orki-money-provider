/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import classes from "./Swap.module.css";
import SwapProvider from "@/components/Widget/Swap/SwapProvider/Provider";
import SwapIcon from "@/assets/SvgComponents/SwapIcon";
import React, { useEffect, useMemo, useState } from "react";
import WidgetDrawer from "@/components/Widget/WidgetDrawer/WidgetDrawer";
import ConnectWalletOptions from "@/components/Widget/Swap/ConnectWalletOptions/ConnectWalletOptions";
import SwapConnectedAccount from "@/components/Widget/Swap/SwapConnectedAccount/SwapConnectedAccount";
import WidgetLayout from "@/components/Widget/WidgetLayout/WidgetLayout";
import VerifyWalletAddress from "@/components/Widget/Swap/VerifyWalletAddress/VerifyWalletAddress";
import ExecutingSwap from "@/components/Widget/Swap/ExecutingSwap/ExecutingSwap";
import SwapCompleted from "@/components/Widget/Swap/SwapCompleted/SwapCompleted";
import SwapAddress from "@/components/Widget/Swap/SwapAddress/SwapAddress";
import SwapButton from "@/components/Widget/Swap/SwapButton/SwapButton";
import {
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit-controllers/react";
import { useAppKit } from "@reown/appkit/react";
import { useSwapPairsQuery } from "@/services/queryApis";
import LargeLoadingIcon from "@/assets/SvgComponents/LargeLoadingIcon";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import SwapPanel from "./SwapPanel/SwapPanel";
import backend from "@/services/apis";
import { get_swapQuote } from "@/types/apis/swap/get_swapQuote";
import { debounce } from "lodash";
import SwapError from "./SwapError/SwapError";
import { formatNumber } from "@/services/utils";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { useEcho } from "@/hooks/useEcho";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export type SwapStatus =
  | "insufficient_fund"
  | "successful"
  | "failed"
  | "external_transfer";

export type SwapSteps = "initiating" | "processing" | "executing";

export type PaymentDetails = {
  id: string;
  pay_in_address: string;
  status: string;
  qr_code: string;
  pay_in_amount: number;
  pay_out_amount: number;
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Echo: Echo<any>;
    Pusher: typeof Pusher;
  }
}

const Swap = () => {
  const echo = useEcho();

  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<get_swapPairs[number] | null>(null);
  const [amountPair, setAmountPair] = useState("");
  const [tokenPair, setTokenPair] = useState<get_swapPairs[number] | null>(
    null
  );
  const [disabled, setDisabled] = useState(false);
  const [openVerifyAddress, setOpenVerifyAddress] = useState(false);
  const [openExecutingSwap, setOpenExecutingSwap] = useState(false);
  const [openSwapCompleted, setOpenSwapCompleted] = useState(false);
  const [openSwapAddress, setOpenSwapAddress] = useState(false);
  const [openSwapError, setOpenSwapError] = useState(false);
  const [quote, setQuote] = useState<get_swapQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [txAddress, setTxAddress] = useState({
    sendingAdderss: "",
    receivingAddress: "",
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [isExternalTransfer, setIsExternalTransfer] = useState(false);
  const [toggleSwap, setToggleSwap] = useState(false);
  const [isEVM, setIsEVM] = useState(false);
  const [swapId, setSwapId] = useState("");

  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const { data, isPending } = useSwapPairsQuery();
  const swapPairs: get_swapPairs = data?.data.data;

  const handleDisconnect = async () => {
    await disconnect();
  };

  const handleSwap = () => {
    if (isConnected || !isEVM) {
      setOpenVerifyAddress(true);
    } else {
      open({ view: "Connect" });
    }
    setConfirmTransaction(false);
  };

  const handleSwapComplete = (status: SwapStatus, id?: string) => {
    if (status === "successful" && id) {
      setSwapId(id);
      setOpenSwapCompleted(true);
    } else if (status === "insufficient_fund") {
      setOpenSwapAddress(true);
    } else if (status === "failed") {
      setOpenSwapError(true);
    } else if (status === "external_transfer") {
      setOpenSwapAddress(true);
      setIsExternalTransfer(true);
    }
    setOpenExecutingSwap(false);
  };

  // Debounced getQuote
  const debouncedGetQuote = useMemo(
    () =>
      debounce(async (amount: string, token: string) => {
        if (!token || !amount) return;
        setQuoteLoading(true);
        const response = await backend().get_swapQuote({
          pairId: token,
          amount,
        });
        setQuoteLoading(false);
        if (response) {
          const quote: get_swapQuote = response.data.data;
          setQuote(quote);
          setAmountPair(String(quote.quote_amount));
        } else {
          setQuote(null);
          setAmountPair("");
        }
      }, 1000),
    []
  );

  const handleRefetchQuote = () => {
    if (openExecutingSwap) return;
    if (token && tokenPair)
      debouncedGetQuote(amount, `${token.symbol}_${tokenPair.symbol}`);
  };

  useEffect(() => {
    handleRefetchQuote();
  }, [openExecutingSwap]);

  useEffect(() => {
    // Handle disabling the next button

    if (!isConnected && !isEVM) {
      setDisabled(false);
      return;
    }

    if (
      !(
        quote &&
        amount &&
        Number(amount) &&
        amountPair &&
        token &&
        tokenPair &&
        Number(amount) >= quote.min_from_amount &&
        Number(amount) <= quote.max_from_amount
      )
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [amount, amountPair, token, tokenPair, isConnected, isEVM, quote]);

  useEffect(() => {
    // Handle quotes
    setAmountPair("");
    setQuote(null);
    if (amount && Number(amount) && token && tokenPair) {
      if (token.symbol === tokenPair.symbol) return;
      debouncedGetQuote(amount, `${token.symbol}_${tokenPair.symbol}`);
    }
  }, [amount, token, tokenPair]);

  useEffect(() => {
    // Set default swap parameters
    if (swapPairs) {
      setToken(swapPairs[0]);
      setTokenPair(swapPairs[1]);
      setAmount("0.1");
    }
  }, [swapPairs]);

  useEffect(() => {
    // Handle toggle swap panel
    if (!quote) return;
    const tokenAcc = { ...token } as get_swapPairs[number];

    setAmount(amountPair);
    setToken(tokenPair);
    setTokenPair(tokenAcc);
    setAmountPair("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleSwap]);

  useEffect(() => {
    // Handle connecting wallet based on the selected swap tokens
    if (
      token?.chainId ||
      token?.contractAddress ||
      tokenPair?.chainId ||
      tokenPair?.contractAddress
    ) {
      setIsEVM(true);
    } else {
      setIsEVM(false);
    }
  }, [token, tokenPair]);

  return (
    <React.Fragment>
      {isPending || !token || !tokenPair || !amount ? (
        <div className={`${classes.container} ${classes.loader}`}>
          <LargeLoadingIcon />
        </div>
      ) : (
        <div className={classes.container}>
          {isConnected && address ? (
            <SwapConnectedAccount
              onClose={handleDisconnect}
              address={address}
            />
          ) : null}

          <div className={classes.sect1}>
            <SwapPanel
              swapTokens={swapPairs || []}
              title="You Send"
              onAmountChange={setAmount}
              onTokenChange={setToken}
              searchDisabled={quoteLoading}
              amountDisabled={quoteLoading}
              min_from_amount={quote?.min_from_amount}
              max_from_amount={quote?.max_from_amount}
              setDisabled={setDisabled}
              isConnected={isConnected}
              value={amount}
              token={token}
            />

            <ButtonWrapper
              onClick={() => setToggleSwap(!toggleSwap)}
              className={classes.swapBtn}
            >
              <SwapIcon />
            </ButtonWrapper>

            <SwapPanel
              swapTokens={swapPairs || []}
              title="You Receieve"
              onAmountChange={setAmountPair}
              onTokenChange={setTokenPair}
              searchDisabled={quoteLoading}
              amountDisabled={true}
              value={formatNumber(Number(amountPair), 6)}
              token={tokenPair}
            />
          </div>

          <SwapProvider
            quote={quote}
            loading={quoteLoading}
            onRefresh={handleRefetchQuote}
          />

          <div style={{ marginBottom: "71px" }}></div>

          <SwapButton onClick={handleSwap} disabled={disabled || quoteLoading}>
            {isConnected || !isEVM ? "Next" : "Connect Wallet"}
          </SwapButton>

          <>
            {openConnectWallet && (
              <WidgetDrawer onClose={() => setOpenConnectWallet(false)}>
                {({ close }) => (
                  <ConnectWalletOptions
                    onClose={close}
                    onSelect={() => {
                      close();
                    }}
                  />
                )}
              </WidgetDrawer>
            )}

            {openVerifyAddress && quote && token && tokenPair && (
              <WidgetLayout overlay>
                <VerifyWalletAddress
                  onClose={() => setOpenVerifyAddress(false)}
                  onConfirm={() => {
                    setOpenVerifyAddress(false);
                    setOpenExecutingSwap(true);
                  }}
                  quote={quote}
                  token={token}
                  tokenPair={tokenPair}
                  quoteLoading={quoteLoading}
                  onAddressChange={setTxAddress}
                />
              </WidgetLayout>
            )}

            {openExecutingSwap && quote && token && tokenPair && echo && (
              <WidgetLayout overlay>
                <ExecutingSwap
                  echo={echo}
                  onComplete={handleSwapComplete}
                  setPaymentDetails={setPaymentDetails}
                  quote={quote}
                  txAddress={txAddress}
                  token={token}
                  tokenPair={tokenPair}
                  confirmTransaction={confirmTransaction}
                />
              </WidgetLayout>
            )}

            {openSwapAddress && quote && paymentDetails && token && (
              <WidgetLayout overlay>
                <SwapAddress
                  goBack={() => {
                    setOpenSwapAddress(false);
                    setOpenVerifyAddress(true);
                  }}
                  onClose={() => setOpenSwapAddress(false)}
                  onConfirm={() => {
                    setOpenSwapAddress(false);
                    setOpenExecutingSwap(true);
                    setConfirmTransaction(true);
                  }}
                  token={token}
                  tokenPair={tokenPair}
                  paymentDetails={paymentDetails}
                  confirmTransaction={confirmTransaction}
                  isExternalTransfer={isExternalTransfer}
                  quote={quote}
                  quoteLoading={quoteLoading}
                />
              </WidgetLayout>
            )}

            {openSwapCompleted && quote && (
              <WidgetLayout overlay>
                <SwapCompleted
                  onClose={() => setOpenSwapCompleted(false)}
                  swapId={swapId}
                  onComplete={() => {
                    setOpenSwapCompleted(false);
                    setSwapId("");
                    setOpenSwapError(true);
                  }}
                />
              </WidgetLayout>
            )}

            {openSwapError && (
              <WidgetLayout overlay>
                <SwapError
                  onClose={() => {
                    setOpenSwapError(false);
                    setOpenExecutingSwap(false);
                    setOpenSwapAddress(false);
                  }}
                />
              </WidgetLayout>
            )}
          </>
        </div>
      )}
    </React.Fragment>
  );
};

export default Swap;
