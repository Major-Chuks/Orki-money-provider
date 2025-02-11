"use client";

import React, { useEffect, useState } from "react";
import classes from "./Widget.module.css";
import menuIcon from "@/assets/widget/menu.svg";
import Image from "next/image";
import CryptoPanel from "./CryptoPanel/CryptoPanel";
import RatePanel from "./RatePanel/RatePanel";
import CustomButton from "../CustomInput/CustomButton/CustomButton";
import Sidebar from "./Sidebar/Sidebar";
import backend from "@/services/apis";
import FiatPanel from "./FiatPanel/FiatPanel";
import { formatMoneyToNumber } from "@/services/utils";
import { ICountryData } from "@/constants/country";
import useDebouncedEffect from "@/hooks/useDebounce";
import LargeLoadingIcon from "@/assets/SvgComponents/LargeLoadingIcon";
import Provider from "./Provider/Provider";
import {
  allProviders,
  moonpayCryptoCurrenciesResponse,
  moonpayFiatCurrenciesResponse,
  PaymentMethodType,
  ProvidersResponse,
  transakCryptoCurrenciesResponse,
  transakFiatCurrenciesResponse,
} from "@/services/raw";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import { post_pricing_quote } from "@/interface/post_pricing_quote";
import Redirect1 from "./Redirect/Redirect1";
import Redirect2 from "./Redirect/Redirect2";

export type SupportedProviders = "moonpay" | "transak";

const Widget = ({ onLaunch }: { onLaunch: (queryString: string) => void }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleProvider, setToggleProvider] = useState(false);
  const [fiatCurrencies, setFiatCurrencies] = useState<
    get_fiat_currencies[] | null
  >(moonpayFiatCurrenciesResponse);
  const [cryptoCurrencies, setCryptoCurrencies] = useState<
    get_crypto_currencies[] | null
  >(moonpayCryptoCurrenciesResponse);
  const [loading, setLoading] = useState(false);
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [network, setNetwork] = useState("");
  const [isBuyOrSell, setIsBuyOrSell] = useState<"BUY" | "SELL">("BUY");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentOptions, setPaymentOptions] = useState<
    PaymentMethodType[] | null
  >(null);
  const [country, setCountry] = useState<ICountryData | null>(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [error, setError] = useState(false);
  const [quote, setQuote] = useState<post_pricing_quote | null>(null);
  const [bestProvider, setBestProvider] = useState<
    ProvidersResponse[number] | null
  >(null);
  const [provider, setProvider] = useState<ProvidersResponse[number] | null>(
    null
  );
  const [purchaseLink, setPurchaseLink] = useState("");
  const [toggleFirstRedirect, setToggleFirstRedirect] = useState(false);
  const [toggleSecondRedirect, setToggleSecondRedirect] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);

  const handleCurrencies = async (_provider: SupportedProviders) => {
    // setLoading(true);
    // const [fiatRes, cryptoRes] = await Promise.all([
    //   backend().get_fiat_currencies({
    //     provider: _provider.toLowerCase() as SupportedProviders,
    //   }),
    //   backend().get_crypto_currencies({
    //     provider: _provider.toLowerCase() as SupportedProviders,
    //   }),
    // ]);
    // if (fiatRes) {
    //   setFiatCurrencies(fiatRes.data.data);
    // }
    // if (cryptoRes) {
    //   setCryptoCurrencies(cryptoRes.data.data);
    // }
    // setLoading(false);

    if (_provider === "moonpay") {
      setFiatCurrencies(moonpayFiatCurrenciesResponse);
      setCryptoCurrencies(moonpayCryptoCurrenciesResponse);
    } else if (_provider === "transak") {
      setFiatCurrencies(transakFiatCurrenciesResponse);
      setCryptoCurrencies(transakCryptoCurrenciesResponse);
    }
  };

  const handleFiatAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFiatAmount(event.target.value);
  };

  const handleCryptoAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCryptoAmount(event.target.value);
  };

  const handleFiatCurrencyChange = (c: string) => {
    setFiatCurrency(c);

    // find the currency object
    const afc = fiatCurrencies?.find(
      (fc) => fc.name.toLowerCase() === c.toLowerCase()
    );
    if (afc) {
      setPaymentOptions(afc.payment_methods);
    }
  };

  const handleProceed = () => {
    // before window will open, show the initial redirect screen.
    setToggleFirstRedirect(true);

    setTimeout(() => {
      setToggleFirstRedirect(false);
      // window.open(purchaseLink, "_blank", "noopener,noreferrer");
      const popupWindow = window.open(purchaseLink, "popupWindow");
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

  const handleCloseProcess = () => {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
  };

  // STEP 1
  // Make an api call to fetch all quotes | Initiallize providers and payment options
  useEffect(() => {
    const _bestProvider = allProviders.find((qt) => qt.is_best);
    if (!_bestProvider) return;
    setPaymentOptions(_bestProvider.payment_methods);
    setBestProvider(_bestProvider);
    setProvider(_bestProvider);
    setFiatAmount(String(_bestProvider.asset.min_buy_amount));
    setCryptoAmount(String(_bestProvider.amount_to_receive));
    setPaymentMethod(""); // the component handles initiallizing this.
    setCryptoCurrency(_bestProvider.asset.crypto_icon_identifier);
    setFiatCurrency(_bestProvider.asset.fiat_icon_identifier);
    setNetwork(_bestProvider.asset.network);

    // Fetch the currencies for the quote provider
    handleCurrencies(_bestProvider.provider.name as SupportedProviders);
  }, []);

  // STEP 2
  // Fetch quotes
  useDebouncedEffect(
    () => {
      const handleFetchQuote = async () => {
        setError(false);

        const queryParams = Object.fromEntries(
          Object.entries({
            // partnerApiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY,
            provider: provider?.provider.name.toLowerCase(),
            fiatAmount: formatMoneyToNumber(fiatAmount),
            cryptoAmount: formatMoneyToNumber(cryptoAmount),
            fiatCurrency,
            cryptoCurrency,
            network,
            isBuyOrSell,
            paymentMethod,
          }).filter(([_, value]) => value)
        );

        const queryParamKeys = [
          ...(isBuyOrSell === "BUY" ? ["fiatAmount"] : ["cryptoAmount"]),
          "provider",
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

        // const queryString = new URLSearchParams(queryParams as any).toString();
        setLoadingQuotes(true);
        const response =
          isBuyOrSell === "BUY"
            ? await backend().post_buy_quote({
                provider:
                  provider?.provider.name.toLowerCase() as SupportedProviders,
                fiat_currency: fiatCurrency.toUpperCase(),
                crypto_currency: cryptoCurrency.toUpperCase(),
                network: network,
                payment_method: paymentMethod,
                amount: formatMoneyToNumber(fiatAmount).toString(),
              })
            : await backend().post_sell_quote({
                provider:
                  provider?.provider.name.toLowerCase() as SupportedProviders,
                fiat_currency: fiatCurrency,
                crypto_amount: cryptoAmount,
                crypto_currency: cryptoCurrency,
                network: network,
                payment_method: paymentMethod,
              });

        if (response) {
          isBuyOrSell === "BUY"
            ? setCryptoAmount(String(response.data.data.quote.crypto_amount))
            : setFiatAmount(String(response.data.data.quote.fiat_amount));
          setPurchaseLink(response.data.data.purchase_link as string);
          setQuote(response.data.data);
        } else {
          setError(true);
          setPurchaseLink("");
        }
        setLoadingQuotes(false);
      };

      handleFetchQuote();
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
      provider,
    ],
    1000
  ); // Adjust the debounce delay as needed

  // STEP 3
  // whenever a provider changes, fetch the currencies relating to that provider
  useEffect(() => {
    if (!provider) return;
    handleCurrencies(
      provider.provider.name.toLowerCase() as SupportedProviders
    );
  }, [provider]);

  return (
    <React.Fragment>
      {loading ? (
        <div className={`${classes.container} ${classes.loader}`}>
          <LargeLoadingIcon />
        </div>
      ) : (
        <div className={classes.container}>
          {toggleFirstRedirect && <Redirect1 quote={quote} />}
          {toggleSecondRedirect && (
            <Redirect2
              handleOpenProvider={handleContinueProcess}
              handleCloseProvider={handleCloseProcess}
              quote={quote}
            />
          )}
          {toggleSidebar && (
            <Sidebar
              onHistoryClick={() => setToggleProvider(true)}
              onClose={() => setToggleSidebar(false)}
              onCountryChange={setCountry}
            />
          )}
          {toggleProvider && (
            <Provider
              onSelect={setProvider}
              onClose={() => setToggleProvider(false)}
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
                onAmountChange={handleFiatAmountChange}
                onCurrencyChange={handleFiatCurrencyChange}
                fiatCurrencies={fiatCurrencies}
                title="You Pay"
                value={fiatAmount}
                defaultCurrencyCode={bestProvider?.asset.fiat_icon_identifier}
                defaultCurrencyIcon={bestProvider?.asset.fiat_icon}
                provider={provider}
              />
              <CryptoPanel
                cryptoCurrencies={cryptoCurrencies}
                title="You Receive"
                onAmountChange={handleCryptoAmountChange}
                onCurrencyChange={(symbol, network) => {
                  setCryptoCurrency(symbol);
                  setNetwork(network);
                }}
                value={cryptoAmount}
                defaultCurrencyCode={bestProvider?.asset.crypto_icon_identifier}
                defaultCurrencyIcon={bestProvider?.asset.crypto_icon}
              />
            </div>
          ) : (
            <div className={classes.panelWrapper}>
              <CryptoPanel
                cryptoCurrencies={cryptoCurrencies}
                title="You Sell"
                onAmountChange={handleCryptoAmountChange}
                onCurrencyChange={(symbol, network) => {
                  setCryptoCurrency(symbol);
                  setNetwork(network);
                }}
                value={cryptoAmount}
                defaultCurrencyCode={bestProvider?.asset.crypto_icon_identifier}
                defaultCurrencyIcon={bestProvider?.asset.crypto_icon}
              />
              <FiatPanel
                onAmountChange={handleFiatAmountChange}
                onCurrencyChange={handleFiatCurrencyChange}
                fiatCurrencies={fiatCurrencies}
                title="You Receive"
                value={fiatAmount}
                defaultCurrencyCode={bestProvider?.asset.fiat_icon_identifier}
                defaultCurrencyIcon={bestProvider?.asset.fiat_icon}
                provider={provider}
              />
            </div>
          )}

          <div style={{ marginBottom: "44px" }}>
            <RatePanel
              loading={loadingQuotes}
              onProviderClick={() => setToggleProvider(true)}
              quote={quote}
              provider={
                provider?.provider.name.toLowerCase() as SupportedProviders
              }
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

          <CustomButton
            style={{ background: "#6148C2" }}
            disabled={!purchaseLink}
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
