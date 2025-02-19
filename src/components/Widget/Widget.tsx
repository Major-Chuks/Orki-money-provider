"use client";

import React, { useEffect, useState } from "react";
import classes from "./Widget.module.css";
import menuIcon from "@/assets/widget/menu.svg";
import Image from "next/image";
import CryptoPanel from "./CryptoPanel/CryptoPanel";
import RatePanel from "./RatePanel/RatePanel";
import CustomButton from "../CustomInput/CustomButton/CustomButton";
import Sidebar from "./Sidebar/Sidebar";
import FiatPanel from "./FiatPanel/FiatPanel";
import useDebouncedEffect from "@/hooks/useDebounce";
import LargeLoadingIcon from "@/assets/SvgComponents/LargeLoadingIcon";
import Provider from "./Provider/Provider";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import {
  get_fiat_currencies,
  PaymentMethodResponse,
} from "@/interface/get_fiat_currencies";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import Redirect1 from "./Redirect/Redirect1";
import Redirect2 from "./Redirect/Redirect2";
import { get_defaults } from "@/interface/get_defaults";
import { fetchDefaults, fetchQuotes } from "./Widget.script";
import CountrySearch from "./CountrySearch/CountrySearch";
import { ICountryData } from "@/constants/country";
import backend from "@/services/apis";

const Widget = ({}: { onLaunch: (queryString: string) => void }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleProvider, setToggleProvider] = useState(false);
  const [fiatCurrencies, setFiatCurrencies] =
    useState<get_fiat_currencies | null>(null);
  const [cryptoCurrencies, setCryptoCurrencies] =
    useState<get_crypto_currencies | null>(null);
  const [loading, setLoading] = useState(false);
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [network, setNetwork] = useState("");
  const [isBuyOrSell, setIsBuyOrSell] = useState<"BUY" | "SELL">("BUY");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentOptions, setPaymentOptions] = useState<
    PaymentMethodResponse[] | null
  >(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [error, setError] = useState("");
  // const [quote, setQuote] = useState<post_pricing_quote | null>(null);

  const [allProviders, setAllProviders] = useState<get_defaults | null>(null);
  const [provider, setProvider] = useState<get_defaults[number] | null>(null);
  const [toggleFirstRedirect, setToggleFirstRedirect] = useState(false);
  const [toggleSecondRedirect, setToggleSecondRedirect] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [toggleCountryModal, setToggleCountryModal] = useState(false);

  const handleFiatCurrencyChange = (c: string) => {
    setFiatCurrency(c);

    // update payment options when fiat currency changes
    const afc = fiatCurrencies?.find(
      (fc) => fc.code.toLowerCase() === c.toLowerCase()
    );
    if (afc && provider) {
      const _provider = provider.provider.name.toLowerCase();
      const _paymentOptions = afc[_provider as keyof typeof afc];
      setPaymentOptions(_paymentOptions as PaymentMethodResponse[]);
    }
  };

  const handleProceed = () => {
    if (!provider) return;
    // before window will open, show the initial redirect screen.
    setToggleFirstRedirect(true);

    setTimeout(() => {
      setToggleFirstRedirect(false);
      // window.open(purchaseLink, "_blank", "noopener,noreferrer");
      const popupWindow = window.open(
        provider.link,
        `${provider.provider.name}_${network}_${fiatAmount}_${fiatCurrency}_${cryptoAmount}_${cryptoCurrency}`
      );
      if (!popupWindow) return;
      setToggleSecondRedirect(true);

      setPopupWindow(popupWindow);
      const checkPopupClosed: NodeJS.Timeout = setInterval(() => {
        if (popupWindow.closed) {
          clearInterval(checkPopupClosed);
          setToggleSecondRedirect(false);
        }
      }, 500);
    }, 1000);
    // onLaunch(purchaseLink);
  };

  const handleContinueProcess = () => {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.focus();
    }
  };

  const getCountryDefault = async (country: ICountryData) => {
    setLoading(true);
    setError("");
    const response = await backend().post_change_location(country.code);
    if (response) {
      const _defaults: get_defaults = response.data.data;
      setAllProviders(_defaults);
      const _bestProvider = _defaults.find((dp) => dp.is_best);
      if (!_bestProvider) return;
      setProvider(_bestProvider);
      setFiatAmount(String(_bestProvider.asset?.fiat_amount));
      setCryptoAmount(String(_bestProvider.asset?.crypto_amount));
      // setPaymentMethod(""); // the component handles the initiallization.
      setCryptoCurrency(_bestProvider.asset?.crypto || "");
      setFiatCurrency(_bestProvider.asset?.fiat || "");
      setNetwork(_bestProvider.asset?.network || "");
      const afc = fiatCurrencies?.find(
        (fc) =>
          fc.code.toLowerCase() === _bestProvider.asset?.fiat.toLowerCase()
      );

      if (afc) {
        const _provider = _bestProvider.provider.name.toLowerCase();
        const _paymentOptions = afc[_provider as keyof typeof afc];
        setPaymentOptions(_paymentOptions as PaymentMethodResponse[]);
      }
    } else {
      setError(
        "This currency is not supported. Please select a different currency."
      );
    }
    setLoading(false);
  };

  // STEP 1
  // Make an api call to fetch all providers and currencies
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchDefaults({
        setAllProviders,
        setProvider,
        setFiatAmount,
        setCryptoAmount,
        setFiatCurrency,
        setCryptoCurrency,
        setPaymentMethod,
        setNetwork,
        setFiatCurrencies,
        setCryptoCurrencies,
        setPaymentOptions,
      });
      setLoading(false);
    })();
  }, []);

  // STEP 2
  // Fetch quotes
  useDebouncedEffect(
    async () => {
      setError("");
      setLoadingQuotes(true);
      const response = await fetchQuotes({
        fiatAmount,
        cryptoAmount,
        fiatCurrency,
        cryptoCurrency,
        network,
        isBuyOrSell,
        paymentMethod,
      });
      setLoadingQuotes(false);
      if (response && typeof response === "object") {
        const _defaults: get_defaults = response.data.data;
        setAllProviders(_defaults);
        const _bestProvider = _defaults.find((dp) => dp.is_best);
        if (!_bestProvider) return;
        setProvider(_bestProvider);
        setFiatAmount(String(_bestProvider.asset?.fiat_amount));
        setCryptoAmount(String(_bestProvider.asset?.crypto_amount));
      } else {
        setAllProviders(null);
        if (response && typeof response === "string") {
          setError(response);
        }
        // else {
        //   setError("Unable to retrieve a quote for the provided details.");
        // }
      }
    },
    [
      isBuyOrSell === "BUY" ? fiatAmount : cryptoAmount,
      // fiatAmount,
      // cryptoAmount,
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
          {toggleCountryModal && (
            <CountrySearch
              overlayOnly={true}
              onCountryChange={getCountryDefault}
              onClose={() => setToggleCountryModal(false)}
              fiatCurrency={fiatCurrency}
            />
          )}
          {toggleFirstRedirect && (
            <Redirect1 isBuyOrSell={isBuyOrSell} provider={provider} />
          )}
          {toggleSecondRedirect && (
            <Redirect2
              handleOpenProvider={handleContinueProcess}
              handleCloseProvider={() => setToggleSecondRedirect(false)}
              provider={provider}
            />
          )}
          {toggleSidebar && (
            <Sidebar
              onHistoryClick={() => setToggleProvider(true)}
              onClose={() => setToggleSidebar(false)}
              onCountrySearch={() => setToggleCountryModal(true)}
              fiatCurrency={fiatCurrency}
            />
          )}
          {toggleProvider && (
            <Provider
              allProviders={allProviders}
              onSelect={setProvider}
              onClose={() => setToggleProvider(false)}
              isBuyOrSell={isBuyOrSell}
            />
          )}

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
              <FiatPanel
                onAmountChange={setFiatAmount}
                onCurrencyChange={handleFiatCurrencyChange}
                fiatCurrencies={fiatCurrencies}
                fiatCurrency={fiatCurrency}
                title="You Pay"
                value={fiatAmount}
                defaultCurrencyCode={provider?.asset?.fiat}
                provider={provider}
                paymentMethod={paymentMethod}
                error={error}
              />
              <CryptoPanel
                cryptoCurrencies={cryptoCurrencies}
                title="You Receive"
                onAmountChange={setCryptoAmount}
                onCurrencyChange={(symbol, network) => {
                  setCryptoCurrency(symbol);
                  setNetwork(network);
                }}
                value={cryptoAmount}
                defaultCurrencyCode={provider?.asset?.crypto}
                defaultNetwork={provider?.asset?.network}
              />
            </div>
          ) : (
            <div className={classes.panelWrapper}>
              <CryptoPanel
                cryptoCurrencies={cryptoCurrencies}
                title="You Sell"
                onAmountChange={setCryptoAmount}
                onCurrencyChange={(symbol, network) => {
                  setCryptoCurrency(symbol);
                  setNetwork(network);
                }}
                value={cryptoAmount}
                defaultCurrencyCode={provider?.asset?.crypto}
              />
              <FiatPanel
                onAmountChange={setFiatAmount}
                onCurrencyChange={handleFiatCurrencyChange}
                fiatCurrencies={fiatCurrencies}
                fiatCurrency={fiatCurrency}
                title="You Receive"
                value={fiatAmount}
                defaultCurrencyCode={provider?.asset?.fiat}
                provider={provider}
                paymentMethod={paymentMethod}
                error={error}
              />
            </div>
          )}

          <div style={{ marginBottom: "44px" }}>
            <RatePanel
              loading={loadingQuotes}
              onProviderClick={() => setToggleProvider(true)}
              provider={provider}
              hasError={!!error}
            />
          </div>

          {paymentOptions && (
            <PaymentMethod
              paymentOptions={paymentOptions}
              onPaymentMethodChange={(pm) =>
                setPaymentMethod(pm.paymentMethodId)
              }
              paymentMethod={paymentMethod}
            />
          )}

          <CustomButton
            style={{ background: "#6148C2" }}
            disabled={!provider}
            onClick={handleProceed}
          >
            Proceed
          </CustomButton>
        </div>
      )}
    </React.Fragment>
  );
};

export default Widget;
