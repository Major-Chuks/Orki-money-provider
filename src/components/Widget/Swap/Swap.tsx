"use client";

import classes from "./Swap.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
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

const Swap = () => {
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

  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  const { data, isPending } = useSwapPairsQuery();
  const swapPairs: get_swapPairs = data?.data.data;

  const handleDisconnect = async () => {
    await disconnect();
  };

  const handleSwap = () => {
    if (isConnected) {
      setOpenVerifyAddress(true);
    } else {
      open({ view: "Connect" });
    }
    setConfirmTransaction(false);
  };

  const handleSwapComplete = (status: SwapStatus) => {
    if (status === "successful") {
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

  useEffect(() => {
    if (
      isConnected &&
      !(amount && Number(amount) && amountPair && token && tokenPair)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [amount, amountPair, token, tokenPair, isConnected]);

  useEffect(() => {
    setAmountPair("");

    if (amount && Number(amount) && token && tokenPair) {
      debouncedGetQuote(amount, `${token.symbol}_${tokenPair.symbol}`);
    }
  }, [amount, token, tokenPair]);

  return (
    <React.Fragment>
      {isPending ? (
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
              value={amount}
            />

            <ButtonWrapper className={classes.swapBtn}>
              <SwapIcon />
            </ButtonWrapper>

            <SwapPanel
              swapTokens={swapPairs || []}
              title="You Receieve"
              onAmountChange={setAmountPair}
              onTokenChange={setTokenPair}
              searchDisabled={quoteLoading}
              amountDisabled={true}
              value={amountPair}
            />
          </div>

          <SwapProvider quote={quote} loading={quoteLoading} />

          <div style={{ marginBottom: "71px" }}></div>

          <SwapButton onClick={handleSwap} disabled={disabled}>
            {isConnected ? "Next" : "Connect Wallet"}
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
                  onAddressChange={setTxAddress}
                />
              </WidgetLayout>
            )}

            {openExecutingSwap && quote && token && tokenPair && (
              <WidgetLayout overlay>
                <ExecutingSwap
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
                  paymentDetails={paymentDetails}
                  confirmTransaction={confirmTransaction}
                  isExternalTransfer={isExternalTransfer}
                />
              </WidgetLayout>
            )}

            {openSwapCompleted && quote && (
              <WidgetLayout overlay>
                <SwapCompleted
                  onClose={() => setOpenSwapCompleted(false)}
                  quote={quote}
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
