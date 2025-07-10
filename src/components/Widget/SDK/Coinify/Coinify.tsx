"use client";

import classes from "./Coinify.module.css";
import CloseIcon from "@/assets/app/CloseIcon";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

type CoinifyInitPayload = {
  buyAmount?: string;
  sellAmount?: string;
  partnerName: string;
  partnerId: string;
  primaryColor: string;
  fiatCurrencies: string;
  cryptoCurrencies: string;
  defaultCryptoCurrency: string;
  defaultFiatCurrency: string;
  isBuyAmountFixed?: string;
  isSellAmountFixed?: string;
  partnerContext: string;
  isBuyAmountWithFees: string;
  targetPage: "buy" | "sell";
};

const buildUrl = (baseUrl: string, params: CoinifyInitPayload): string => {
  const queryString = new URLSearchParams({
    ...params,
    noMenu: "true",
  }).toString();
  return `${baseUrl}?${queryString}`;
};

export default function Coinify({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload: CoinifyInitPayload;
}) {
  const src = buildUrl("https://trade-ui.sandbox.coinify.com", payload);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ButtonWrapper className={classes.iconContainer} onClick={onClose}>
          <CloseIcon />
        </ButtonWrapper>
      </div>

      <iframe
        src={src}
        width="100%"
        height="576px"
        allow="camera;fullscreen;accelerometer;gyroscope;magnetometer;payment"
        allowFullScreen
        style={{
          border: "none",
          position: "absolute",
          top: "64px",
          left: 0,
          width: "100%",
          minHeight: "calc(100% - 64px)",
          zIndex: 9999,
          background: "white",
        }}
        title="Coinify Onramp"
      />
    </div>
  );
}
