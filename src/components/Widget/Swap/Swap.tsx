"use client";

import CryptoPanel from "@/components/Widget/CryptoPanel/CryptoPanel";
import classes from "./Swap.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import SwapProvider from "@/components/Widget/Swap/SwapProvider/Provider";
import SwapIcon from "@/assets/SvgComponents/SwapIcon";
import { useEffect, useState } from "react";
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

export type SwapStatus = "insufficient_fund" | "successful" | "failed";

const Swap = () => {
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendCurrency, setSendCurrency] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [openVerifyAddress, setOpenVerifyAddress] = useState(false);
  const [openExecutingSwap, setOpenExecutingSwap] = useState(false);
  const [openSwapCompleted, setOpenSwapCompleted] = useState(false);
  const [openSwapAddress, setOpenSwapAddress] = useState(false);

  const { isConnected, embeddedWalletInfo, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = async () => {
    await disconnect();
  };

  const handleSwap = () => {
    if (isConnected) {
      setOpenVerifyAddress(true);
    } else {
      setOpenConnectWallet(true);
    }
  };

  const handleSwapComplete = (status: SwapStatus) => {
    if (status === "successful") {
      setOpenSwapCompleted(true);
    } else if (status === "insufficient_fund") {
      setOpenSwapAddress(true);
    }
    setOpenExecutingSwap(false);
  };

  useEffect(() => {
    if (
      isConnected &&
      !(sendAmount && receiveAmount && sendCurrency && receiveCurrency)
    ) {
      setDisabled(false); // change to true
    }
  }, [sendAmount, receiveAmount, sendCurrency, receiveCurrency, isConnected]);

  useEffect(() => {
    console.log({ embeddedWalletInfo, isConnected, address });
  }, [isConnected, address, embeddedWalletInfo]);

  return (
    <div className={classes.container}>
      {isConnected && address ? (
        <SwapConnectedAccount onClose={handleDisconnect} address={address} />
      ) : null}

      <div className={classes.sect1}>
        <CryptoPanel
          cryptoCurrencies={[]}
          title="You Send"
          onAmountChange={setSendAmount}
          onCurrencyChange={setSendCurrency}
          disabled={false}
          value={sendAmount}
          cryptoCurrency={sendCurrency}
          defaultNetwork={""}
        />

        <ButtonWrapper className={classes.swapBtn}>
          <SwapIcon />
        </ButtonWrapper>

        <CryptoPanel
          cryptoCurrencies={[]}
          title="You Receive"
          onAmountChange={setReceiveAmount}
          onCurrencyChange={setReceiveCurrency}
          disabled={false}
          value={receiveAmount}
          cryptoCurrency={receiveCurrency}
          defaultNetwork={""}
        />
      </div>

      <SwapProvider />

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

        {openVerifyAddress && (
          <WidgetLayout overlay>
            <VerifyWalletAddress
              onClose={() => setOpenVerifyAddress(false)}
              onConfirm={() => {
                setOpenVerifyAddress(false);
                setOpenExecutingSwap(true);
              }}
            />
          </WidgetLayout>
        )}

        {openExecutingSwap && (
          <WidgetLayout overlay>
            <ExecutingSwap onComplete={handleSwapComplete} />
          </WidgetLayout>
        )}

        {openSwapCompleted && (
          <WidgetLayout overlay>
            <SwapCompleted onClose={() => setOpenSwapCompleted(false)} />
          </WidgetLayout>
        )}

        {openSwapAddress && (
          <WidgetLayout overlay>
            <SwapAddress
              goBack={() => {
                setOpenSwapAddress(false);
                setOpenVerifyAddress(true);
              }}
              onClose={() => setOpenSwapAddress(false)}
              onRetry={() => {
                setOpenSwapAddress(false);
                setOpenExecutingSwap(true);
              }}
            />
          </WidgetLayout>
        )}
      </>
    </div>
  );
};

export default Swap;
