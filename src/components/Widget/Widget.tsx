"use client";

import React, { useEffect, useState } from "react";
import classes from "./Widget.module.css";
import menuIcon from "@/assets/widget/menu.svg";
import Image from "next/image";
import CryptoPanel from "./CryptoPanel/CryptoPanel";
import RatePanel from "./RatePanel/RatePanel";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import CustomButton from "../CustomInput/CustomButton/CustomButton";
import Sidebar from "./Sidebar/Sidebar";
import History from "./History/History";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import backend from "@/services/apis";
import FiatPanel from "./FiatPanel/FiatPanel";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import { formatMoneyToNumber, formatStringToMoney } from "@/services/utils";
import { cryptoCurrenciesResponse } from "./cryptoCurrencies";
import { fiatCurrenciesResponse } from "./fiatCurrencies";
import { ICountryData } from "@/constants/country";
import { get_pricing_quote } from "@/interface/get_pricing_quote";
import useDebouncedEffect from "@/hooks/useDebounce";
import LargeLoadingIcon from "@/assets/SvgComponents/LargeLoadingIcon";

const Widget = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleHistory, setToggleHistory] = useState(false);
  const [fiatCurrencies, setFiatCurrencies] =
    useState<get_fiat_currencies | null>(
      null //fiatCurrenciesResponse as get_fiat_currencies
    );
  const [cryptoCurrencies, setCryptoCurrencies] =
    useState<get_crypto_currencies | null>(
      null //cryptoCurrenciesResponse as get_crypto_currencies
    );
  const [loading, setLoading] = useState(false);
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [network, setNetwork] = useState("");
  const [isBuyOrSell, setIsBuyOrSell] = useState<"BUY" | "SELL">("BUY");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentOptions, setPaymentOptions] = useState<
    get_fiat_currencies[number]["paymentOptions"] | null
  >(null);
  const [country, setCountry] = useState<ICountryData | null>(null);
  const [quote, setQuote] = useState<get_pricing_quote | null>(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [error, setError] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    const [fiatRes, cryptoRes] = await Promise.all([
      backend().get_fiat_currencies(),
      backend().get_crypto_currencies(),
    ]);
    if (fiatRes) {
      setFiatCurrencies(fiatRes.data.response);
    }
    if (cryptoRes) {
      setCryptoCurrencies(cryptoRes.data.response);
    }
    setLoading(false);
  };

  const handleFiatAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiatAmount(formatStringToMoney(event.target.value));
  };

  const handleCryptoAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCryptoAmount(formatStringToMoney(event.target.value));
  };

  const handleProceed = () => {
    const queryParams = Object.fromEntries(
      Object.entries({
        apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
        fiatAmount: formatMoneyToNumber(fiatAmount),
        fiatCurrency,
        cryptoAmount: formatMoneyToNumber(cryptoAmount),
        cryptoCurrency,
        network,
        isBuyOrSell,
        paymentMethod,
      }).filter(([_, value]) => value)
    );
    const queryString = new URLSearchParams(queryParams as any).toString();
    window.open(
      `https://global-stg.transak.com?${queryString}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (!fiatCurrency) return;
    const paymentOption = fiatCurrencies?.find(
      (fc) => fc.symbol === fiatCurrency
    )?.paymentOptions;
    if (paymentOption) {
      setPaymentOptions(paymentOption);
    } else {
      setPaymentOptions(null);
    }
    setPaymentMethod("");
  }, [fiatCurrency]);

  useDebouncedEffect(
    () => {
      const handleFetchQuote = async () => {
        setQuote(null);
        setError(false);

        const queryParams = Object.fromEntries(
          Object.entries({
            partnerApiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
            ...(isBuyOrSell === "BUY"
              ? { fiatAmount: formatMoneyToNumber(fiatAmount) }
              : { cryptoAmount: formatMoneyToNumber(cryptoAmount) }),
            fiatCurrency,
            cryptoCurrency,
            network,
            isBuyOrSell,
            paymentMethod,
          }).filter(([_, value]) => value)
        );

        const queryParamKeys = [
          ...(isBuyOrSell === "BUY" ? ["fiatAmount"] : ["cryptoAmount"]),
          "fiatCurrency",
          "cryptoCurrency",
          "network",
          "isBuyOrSell",
          "paymentMethod",
        ];

        const allKeysPresent = queryParamKeys.every(
          (key) => key in queryParams
        );

        if (!allKeysPresent) return;

        const queryString = new URLSearchParams(queryParams as any).toString();
        setLoadingQuotes(true);
        const response = await backend().get_pricing_quote(queryString);
        if (response) {
          setQuote(response.data.response);
          isBuyOrSell === "BUY"
            ? setCryptoAmount(String(response.data.response.cryptoAmount))
            : setFiatAmount(String(response.data.response.fiatAmount));
        } else {
          setError(true);
        }
        setLoadingQuotes(false);
      };

      handleFetchQuote();
    },
    [
      isBuyOrSell === "BUY" ? fiatAmount : cryptoAmount,
      fiatCurrency,
      cryptoCurrency,
      network,
      isBuyOrSell,
      paymentMethod,
    ],
    1000
  ); // Adjust the debounce delay as needed

  return (
    <React.Fragment>
      {loading ? (
        <div className={`${classes.container} ${classes.loader}`}>
          <LargeLoadingIcon />
        </div>
      ) : (
        <div className={classes.container}>
          {toggleSidebar && (
            <Sidebar
              onHistoryClick={() => setToggleHistory(true)}
              onClose={() => setToggleSidebar(false)}
              onCountryChange={setCountry}
            />
          )}
          {toggleHistory && <History onClose={() => setToggleHistory(false)} />}

          <div className={classes.heading}>
            <div className={classes.tabSwitch}>
              <div
                onClick={() => setIsBuyOrSell("BUY")}
                className={`${classes.tab} ${
                  isBuyOrSell === "BUY" && classes.active
                } `}
              >
                Buy
              </div>
              <div
                onClick={() => setIsBuyOrSell("SELL")}
                className={`${classes.tab} ${
                  isBuyOrSell === "SELL" && classes.active
                } `}
              >
                Sell
              </div>

              <div
                className={`${classes.underline} ${classes[isBuyOrSell]}`}
              ></div>
            </div>

            <div
              onClick={() => setToggleSidebar(true)}
              className={classes.menuIcon}
            >
              <Image src={menuIcon} alt="" />
            </div>
          </div>

          {isBuyOrSell === "BUY" ? (
            <div className={classes.panelWrapper}>
              {fiatCurrencies ? (
                <FiatPanel
                  onAmountChange={handleFiatAmountChange}
                  onCurrencyChange={setFiatCurrency}
                  fiatCurrencies={fiatCurrencies}
                  title="You Pay"
                  value={fiatAmount}
                />
              ) : (
                <div>Unable to fetch fiat currencies</div>
              )}
              {cryptoCurrencies ? (
                <CryptoPanel
                  cryptoCurrencies={cryptoCurrencies}
                  title="You Receive"
                  onAmountChange={handleCryptoAmountChange}
                  onCurrencyChange={(symbol, network) => {
                    setCryptoCurrency(symbol);
                    setNetwork(network);
                  }}
                  value={cryptoAmount}
                />
              ) : (
                <div>Unable to fetch crypto currencies</div>
              )}
            </div>
          ) : (
            <div className={classes.panelWrapper}>
              {cryptoCurrencies ? (
                <CryptoPanel
                  cryptoCurrencies={cryptoCurrencies}
                  title="You Sell"
                  onAmountChange={handleCryptoAmountChange}
                  onCurrencyChange={(symbol, network) => {
                    setCryptoCurrency(symbol);
                    setNetwork(network);
                  }}
                  value={cryptoAmount}
                />
              ) : (
                <div>Unable to fetch crypto currencies</div>
              )}
              {fiatCurrencies ? (
                <FiatPanel
                  onAmountChange={handleFiatAmountChange}
                  onCurrencyChange={setFiatCurrency}
                  fiatCurrencies={fiatCurrencies}
                  title="You Receive"
                  value={fiatAmount}
                />
              ) : (
                <div>Unable to fetch fiat currencies</div>
              )}
            </div>
          )}

          <div style={{ marginBottom: "44px" }}>
            <RatePanel
              cryptoCurrency={cryptoCurrency}
              quote={quote}
              loading={loadingQuotes}
            />

            {error && (
              <div className={classes.errorText}>
                Unable to retrieve a quote for the provided details.
              </div>
            )}
          </div>

          {paymentOptions && (
            <PaymentMethod
              paymentOptions={paymentOptions}
              onPaymentMethodChange={(pm) => setPaymentMethod(pm.id)}
            />
          )}

          <CustomButton disabled={!quote} onClick={handleProceed}>
            Proceed
          </CustomButton>
        </div>
      )}
    </React.Fragment>
  );
};

export default Widget;
