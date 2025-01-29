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
import {
  fetchCountries,
  fetchCryptoCurrencies,
  fetchFiatCurrencies,
  fetchPricingQuotes,
  fetchUserCountry,
} from "./Widget.script";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import backend from "@/services/apis";
import FiatPanel from "./FiatPanel/FiatPanel";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import { formatStringToMoney } from "@/services/utils";
import { cryptoCurrenciesResponse } from "./cryptoCurrencies";
import { fiatCurrenciesResponse } from "./fiatCurrencies";

const Widget = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleHistory, setToggleHistory] = useState(false);
  const [fiatCurrencies, setFiatCurrencies] =
    useState<get_fiat_currencies | null>(
      fiatCurrenciesResponse as get_fiat_currencies
    );
  const [cryptoCurrencies, setCryptoCurrencies] =
    useState<get_crypto_currencies | null>(
      cryptoCurrenciesResponse as get_crypto_currencies
    );
  const [loading, setLoading] = useState(false);
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [network, setNetwork] = useState("");
  const [isBuyOrSell, setIsBuyOrSell] = useState<"BUY" | "SELL">("BUY");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quoteCountryCode, setQuoteCountryCode] = useState("");
  const [paymentOptions, setPaymentOptions] = useState<
    get_fiat_currencies[number]["paymentOptions"] | null
  >(null);

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

  useEffect(() => {
    // handleFetch();
  }, []);

  useEffect(() => {
    if (!fiatCurrency) return;
    const popt = fiatCurrencies?.find(
      (fc) => fc.symbol === fiatCurrency
    )?.paymentOptions;
    if (popt) {
      setPaymentOptions(popt);
    } else {
      setPaymentOptions(null);
    }
  }, [fiatCurrency]);

  return (
    <React.Fragment>
      {loading ? (
        <div className={classes.container}>
          <div>Loading...</div>
        </div>
      ) : (
        <div className={classes.container}>
          <button style={{ cursor: "pointer" }} onClick={fetchPricingQuotes}>
            Fetch pricing quotes
          </button>
          <button style={{ cursor: "pointer" }} onClick={fetchCryptoCurrencies}>
            Fetch crypto currencies
          </button>
          <button style={{ cursor: "pointer" }} onClick={fetchFiatCurrencies}>
            Fetch fiat currencies
          </button>
          <button style={{ cursor: "pointer" }} onClick={fetchCountries}>
            Fetch countries
          </button>
          <button style={{ cursor: "pointer" }} onClick={fetchUserCountry}>
            Fetch user country
          </button>
          {toggleSidebar && (
            <Sidebar
              onHistoryClick={() => setToggleHistory(true)}
              onClose={() => setToggleSidebar(false)}
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

          <RatePanel
            fiatAmount={fiatAmount}
            cryptoAmount={cryptoAmount}
            fiatCurrency={fiatCurrency}
            cryptoCurrency={cryptoCurrency}
            network={network}
            isBuyOrSell={isBuyOrSell}
            paymentMethod={paymentMethod}
            quoteCountryCode={quoteCountryCode}
          />

          <PaymentMethod paymentOptions={paymentOptions} />

          <CustomButton>Proceed</CustomButton>
        </div>
      )}
    </React.Fragment>
  );
};

export default Widget;
