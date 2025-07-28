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

export type SwapStatus = "insufficient_fund" | "successful" | "failed";

export type SwapSteps = "initiating" | "processing" | "executing";

export type PaymentDetails = {
  id: string;
  pay_in_address: string;
  status: string;
  qr_code: string;
  to_amount: number;
};

const Swap = () => {
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendToken, setSendToken] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [receiveToken, setReceiveToken] = useState("");
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
          setReceiveAmount(String(quote.quote_amount));
        }
      }, 1000),
    []
  );

  useEffect(() => {
    if (
      isConnected &&
      !(sendAmount && receiveAmount && sendToken && receiveToken)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [sendAmount, receiveAmount, sendToken, receiveToken, isConnected]);

  useEffect(() => {
    if (sendAmount && sendToken) {
      debouncedGetQuote(sendAmount, sendToken);
    }
  }, [sendAmount, sendToken]);

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
              onAmountChange={setSendAmount}
              onTokenChange={(tokenId) => {
                setSendToken(tokenId);
                setReceiveToken(tokenId);
              }}
              disabled={false}
              value={sendAmount}
              swapToken={sendToken}
            />

            <ButtonWrapper className={classes.swapBtn}>
              <SwapIcon />
            </ButtonWrapper>

            <SwapPanel
              swapTokens={swapPairs || []}
              title="You Receieve"
              onAmountChange={setReceiveAmount}
              onTokenChange={setReceiveToken}
              disabled={true}
              value={receiveAmount}
              swapToken={receiveToken}
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

            {openVerifyAddress && quote && (
              <WidgetLayout overlay>
                <VerifyWalletAddress
                  onClose={() => setOpenVerifyAddress(false)}
                  onConfirm={() => {
                    setOpenVerifyAddress(false);
                    setOpenExecutingSwap(true);
                  }}
                  quote={quote}
                  onAddressChange={setTxAddress}
                />
              </WidgetLayout>
            )}

            {openExecutingSwap && quote && (
              <WidgetLayout overlay>
                <ExecutingSwap
                  onComplete={handleSwapComplete}
                  quote={quote}
                  txAddress={txAddress}
                  setPaymentDetails={setPaymentDetails}
                  confirmTransaction={confirmTransaction}
                />
              </WidgetLayout>
            )}

            {openSwapAddress && quote && paymentDetails && (
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
                  quote={quote}
                  paymentDetails={paymentDetails}
                  confirmTransaction={confirmTransaction}
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
