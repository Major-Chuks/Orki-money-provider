/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import classes from "./Ramps.module.css";
import CryptoPanel from "../CryptoPanel/CryptoPanel";
import FiatPanel from "../FiatPanel/FiatPanel";
import useDebouncedEffect from "@/hooks/useDebounce";
import LargeLoadingIcon from "@/assets/SvgComponents/LargeLoadingIcon";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import {
  CoinifyWidgetType,
  get_defaults,
  OnmetaWidgetType,
} from "@/interface/get_defaults";
import {
  fetchQuotes,
  getQuoteLimit,
  InitStates,
  validQuoteLimit,
} from "./Ramps.script";
import { COUNTRY_DATA, ICountryData } from "@/constants/country";
import { PaymentMethodResponse } from "@/interface/get_payment_methods";
import {
  useGetCryptoCurencies,
  useGetDefaults,
  useGetFiatCurrencies,
  useGetPaymentMethods,
  useGetUserLocation,
  usePatchSelectedQuote,
  usePostChangeLocation,
} from "@/services/apis_tanstack";
import Koywe from "../SDK/Koywe/Koywe";
import Coinify from "../SDK/Coinify/Coinify";
import Redirect1 from "./Redirect/Redirect1";
import Redirect2 from "./Redirect/Redirect2";
import RatePanel from "./RatePanel/RatePanel";
import Provider from "./Provider/Provider";
import SwapButton from "../Swap/SwapButton/SwapButton";
import WidgetDrawer from "../WidgetDrawer/WidgetDrawer";
import { usePathname } from "next/navigation";
import { WidgetType } from "@/types";

const Ramps = ({
  type: widgetType,
  country,
}: {
  type: WidgetType;
  country: ICountryData | null;
}) => {
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentOptions, setPaymentOptions] =
    useState<PaymentMethodResponse | null>(null);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [error, setError] = useState("");
  const [allProviders, setAllProviders] = useState<
    get_defaults["quotes"] | null
  >(null);
  const [provider, setProvider] = useState<
    get_defaults["quotes"][number] | null
  >(null);
  const [requestId, setRequestId] = useState("");
  const [toggleFirstRedirect, setToggleFirstRedirect] = useState(false);
  const [toggleSecondRedirect, setToggleSecondRedirect] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const isFirstQuoteRender = useRef(0);
  const [openWidget, setOpenWidget] = useState(false);

  const pathname = usePathname();

  const { data: fiatResponse, isSuccess: isFiatSuccess } =
    useGetFiatCurrencies(pathname);
  const { data: cryptoResponse, isSuccess: isCryptoSuccess } =
    useGetCryptoCurencies(pathname);
  const { data: defaultsResponse, isSuccess: isDefaultsSuccess } =
    useGetDefaults(pathname);
  const { data: locationResponse, isSuccess: isLocationSuccess } =
    useGetUserLocation(pathname);
  const {
    data: paymentMethodResponse,
    isPending: isPaymentMethodPending,
    isSuccess: isPaymentMethodSuccess,
  } = useGetPaymentMethods(pathname, fiatCurrency);

  const { mutateAsync } = usePostChangeLocation();

  const patchSelectedQuote = usePatchSelectedQuote();

  const handleFiatCurrencyChange = async (c: string) => {
    setFiatCurrency(c);
  };

  const handleProceed = async () => {
    try {
      await patchSelectedQuote.mutateAsync({
        provider: provider?.provider.identifier || "",
        request_id: requestId,
      });

      //************************************************** */

      const sanitizeName = (str: string) => str.replace(/[^a-zA-Z0-9_]/g, "_");

      if (!provider) return;
      // before window will open, show the initial redirect screen.
      setToggleFirstRedirect(true);

      // delay for 1000ms
      await new Promise((res) => {
        setTimeout(() => {
          res("");
        }, 1000);
      });

      setToggleFirstRedirect(false);

      // track when to open widget
      if (provider.widget && provider.provider.identifier === "koywe") {
        setOpenWidget(true);
        return;
      }

      if (provider.widget && provider.provider.identifier === "coinify") {
        setOpenWidget(true);
        return;
      }

      let onmetaUrl = "";

      if (provider.widget && provider.provider.identifier === "onmeta") {
        const widget = provider.widget as OnmetaWidgetType;
        const asset = provider.asset;

        const payload = {
          fiatType: widget.fiat.toLowerCase(),
          tokenSymbol: widget.crypto,
          environment: "production",
          metadata: JSON.stringify({ orderID: widget.metadata.orderID }),
          fiatAmount:
            widgetType === "Onramp"
              ? Number(asset?.fiat_amount)
              : Number(asset?.crypto_amount),
          chainId: String(widget.ticker),
          onRamp: widgetType === "Onramp" ? "enabled" : "disabled",
          offRamp: widgetType === "Offramp" ? "enabled" : "disabled",
        };

        const queryString = new URLSearchParams(payload as any).toString();
        onmetaUrl = `https://onmeta-widget-orki.vercel.app?${queryString}`;
      }

      const popupWindow = window.open(
        onmetaUrl ? onmetaUrl : provider.link,
        sanitizeName(
          `${provider.provider.identifier}_${network}_${fiatAmount}_${fiatCurrency}_${cryptoAmount}_${cryptoCurrency}`
        )
      );
      if (!popupWindow) return console.log("No popup window");

      setToggleSecondRedirect(true);

      setPopupWindow(popupWindow);
      const checkPopupClosed: NodeJS.Timeout = setInterval(() => {
        if (popupWindow.closed) {
          clearInterval(checkPopupClosed);
          setToggleSecondRedirect(false);
        }
      }, 500);
      //************************************************ */
    } catch (err) {
      fetchAndUpdateQuotes();
      console.error(err);
    }
  };

  const handleContinueProcess = () => {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.focus();
    }
  };

  const handleInitStates = (defaultsData?: get_defaults) => {
    InitStates({
      isChangeLocation: !!defaultsData,
      fiatData: fiatResponse?.data.data,
      cryptoData: cryptoResponse?.data.data,
      defaultData: defaultsData?.quotes ?? defaultsResponse?.data.data.quotes,
      locationData: locationResponse?.data.data,
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
      setError,
      setCountry: () => {},
    });
    if (defaultsData) {
      setRequestId(defaultsData.request_id);
    } else {
      setRequestId(defaultsResponse?.data.data.request_id);
    }
  };

  const handleCountryChange = async (country: ICountryData) => {
    isFirstQuoteRender.current = 1;
    setLoading(true);
    try {
      const response = await mutateAsync(country.code);
      handleInitStates(response.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!country) return;
    handleCountryChange(country);
  }, [country]);

  useEffect(() => {
    setLoading(true);
    if (isFiatSuccess && isCryptoSuccess && isDefaultsSuccess) {
      setLoading(false);
    }
  }, [isFiatSuccess, isCryptoSuccess, isDefaultsSuccess]);

  useEffect(() => {
    if (isPaymentMethodSuccess) {
      setPaymentOptions(paymentMethodResponse.data.data);
      setPaymentMethod(paymentMethodResponse.data.data.recommended);
    }
  }, [isPaymentMethodSuccess]);

  // Initiallize states
  useEffect(() => {
    if (
      isFiatSuccess &&
      isCryptoSuccess &&
      isDefaultsSuccess &&
      isLocationSuccess
    ) {
      handleInitStates();
    }
  }, [isFiatSuccess, isCryptoSuccess, isDefaultsSuccess, isLocationSuccess]);

  const fetchAndUpdateQuotes = async () => {
    setError("");

    if (widgetType === "Onramp") {
      if (Number(fiatAmount) <= 0) return;
    } else if (widgetType === "Offramp") {
      if (Number(cryptoAmount) <= 0) return;
    }

    setLoadingQuotes(true);
    const response = await fetchQuotes({
      fiatAmount,
      cryptoAmount,
      fiatCurrency,
      cryptoCurrency,
      network,
      widgetType,
      paymentMethod,
    });
    setLoadingQuotes(false);
    if (response && typeof response === "object" && response.data.data) {
      const _defaults: get_defaults = response.data.data;
      setAllProviders(_defaults.quotes);
      setRequestId(_defaults.request_id);
      const _bestProvider = _defaults.quotes.find((dp) => dp.is_best);
      if (!_bestProvider) return;
      setProvider(_bestProvider);
      // Only set the changing value to avoid race condition
      if (widgetType === "Onramp") {
        setCryptoAmount(String(_bestProvider.asset?.crypto_amount));
      } else if (widgetType === "Offramp") {
        setFiatAmount(String(_bestProvider.asset?.fiat_amount));
      }
      // removed the function to fetch payment options from here
    } else if (
      response &&
      typeof response === "object" &&
      !response.data.data
    ) {
      setAllProviders(null);
      setProvider(null);
      setRequestId("");
      setError(response.data.msg);
    } else if (response && typeof response === "string") {
      setAllProviders(null);
      setProvider(null);
      setRequestId("");
      setError(response);
    } else {
      const countryData = COUNTRY_DATA.find(
        (c) => c.currency.toLowerCase() === fiatCurrency.toLowerCase()
      );
      if (countryData) {
        handleCountryChange(countryData);
      }
    }
  };

  // Fetch quotes
  useDebouncedEffect(
    async () => {
      if (isFirstQuoteRender.current !== 2) {
        isFirstQuoteRender.current += 1;
        return; // Exit early on first render
      }
      fetchAndUpdateQuotes();
    },
    [
      widgetType === "Onramp" ? fiatAmount : cryptoAmount,
      fiatCurrency,
      cryptoCurrency,
      network,
      widgetType,
      paymentMethod,
    ],
    1000
  ); // Adjust the debounce delay as needed

  useEffect(() => {
    if (provider) {
      if (widgetType === "Onramp") {
        setCryptoAmount(String(provider.quote_amount));
      } else {
        setFiatAmount(String(provider.quote_amount));
      }
    }
  }, [provider]);

  useEffect(() => {
    // check quote limit
    const { minBuyAmount, maxBuyAmount } = getQuoteLimit({
      fiatCurrencies,
      fiatCurrency,
      providerName: provider?.provider.identifier || "",
      paymentMethod,
    });

    validQuoteLimit({
      minBuyAmount,
      maxBuyAmount,
      fiatAmount: Number(fiatAmount),
      fiatCurrency,
      setError,
    });
  }, [provider, fiatCurrencies, fiatCurrency, fiatAmount, paymentMethod]);

  return (
    <React.Fragment>
      {loading ? (
        <div className={`${classes.container} ${classes.loader}`}>
          <LargeLoadingIcon />
        </div>
      ) : (
        <div className={classes.container}>
          {widgetType === "Onramp" ? (
            <div className={classes.panelWrapper}>
              <FiatPanel
                onAmountChange={setFiatAmount}
                onCurrencyChange={handleFiatCurrencyChange}
                fiatCurrencies={fiatCurrencies}
                fiatCurrency={fiatCurrency}
                title="You Pay"
                value={fiatAmount}
                error={error}
                disableCurrency={loadingQuotes}
                disableAmount={loadingQuotes}
              />
              <CryptoPanel
                cryptoCurrencies={cryptoCurrencies}
                title="You Receive"
                onAmountChange={setCryptoAmount}
                onCurrencyChange={(symbol, network) => {
                  setCryptoCurrency(symbol);
                  setNetwork(network);
                }}
                disableCurrency={loadingQuotes}
                disableAmount={true}
                value={cryptoAmount}
                cryptoCurrency={cryptoCurrency}
                network={network}
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
                disableCurrency={loadingQuotes}
                disableAmount={loadingQuotes}
                value={cryptoAmount}
                cryptoCurrency={cryptoCurrency}
                network={network}
              />
              <FiatPanel
                onAmountChange={setFiatAmount}
                onCurrencyChange={handleFiatCurrencyChange}
                fiatCurrencies={fiatCurrencies}
                fiatCurrency={fiatCurrency}
                title="You Receive"
                value={fiatAmount}
                error={error}
                disableCurrency={loadingQuotes}
                disableAmount={true}
              />
            </div>
          )}

          <div style={{ marginBottom: "44px" }}>
            <RatePanel
              loading={loadingQuotes}
              onProviderClick={() => setToggleProvider(true)}
              provider={provider}
            />
          </div>

          <PaymentMethod
            paymentOptions={paymentOptions}
            onPaymentMethodChange={(pm) => setPaymentMethod(pm.orki_id)}
            paymentMethod={paymentMethod}
            loading={isPaymentMethodPending}
            disabled={loadingQuotes}
          />

          <SwapButton
            disabled={!provider || !!error || loadingQuotes}
            onClick={handleProceed}
          >
            Proceed
          </SwapButton>
        </div>
      )}

      {/* Modals ******************************************************************* */}
      <>
        {toggleProvider && (
          <WidgetDrawer
            onClose={() => setToggleProvider(false)}
            modalStyle={{
              height: "100%",
              borderRadius: "0",
            }}
          >
            {({ close }) => (
              <Provider
                allProviders={allProviders}
                onSelect={setProvider}
                onClose={close}
                widgetType={widgetType}
              />
            )}
          </WidgetDrawer>
        )}
        {toggleFirstRedirect && (
          <WidgetDrawer
            onClose={() => {}}
            modalStyle={{
              height: "100%",
              borderRadius: "0",
            }}
          >
            {() => <Redirect1 widgetType={widgetType} provider={provider} />}
          </WidgetDrawer>
        )}
        {toggleSecondRedirect && (
          <WidgetDrawer
            onClose={() => setToggleSecondRedirect(false)}
            modalStyle={{
              height: "100%",
              borderRadius: "0",
            }}
          >
            {({ close }) => (
              <Redirect2
                handleOpenProvider={handleContinueProcess}
                handleCloseProvider={close}
                provider={provider}
              />
            )}
          </WidgetDrawer>
        )}
      </>

      {/* Launch Widgets *********************************************************** */}
      <>
        {openWidget &&
          provider?.widget &&
          provider.provider.identifier === "koywe" &&
          (() => {
            // const widget = provider.widget as KoyweWidgetType;
            return (
              <Koywe
                currencies={[]}
                tokens={[]}
                clientId="680a518c0ea44d25514e3a49" // const
                callbackUrl="https://money.orki.io/sdk/koywe/callback"
                onClose={() => setOpenWidget(false)}
                testing={true}
              />
            );
          })()}

        {openWidget &&
          provider?.widget &&
          provider.provider.identifier === "coinify" &&
          (() => {
            const widget = provider.widget as CoinifyWidgetType;
            return (
              <Coinify
                payload={{
                  ...(widgetType === "Onramp"
                    ? { buyAmount: provider.asset?.fiat_amount || "" }
                    : { sellAmount: provider.asset?.crypto_amount || "" }),
                  partnerName: "ORKI",
                  partnerId: "5c3da04c-53f0-44c6-a290-40b594c216ec", // const
                  primaryColor: "#6148C2",
                  fiatCurrencies: widget.fiat,
                  cryptoCurrencies: widget.crypto,
                  defaultCryptoCurrency: widget.crypto,
                  defaultFiatCurrency: widget.fiat,

                  ...(widgetType === "Onramp"
                    ? { isBuyAmountFixed: "true" }
                    : { isSellAmountFixed: "true" }),
                  isBuyAmountWithFees: "true",
                  partnerContext: JSON.stringify({
                    orderID: widget.metadata.orderID,
                  }),
                  targetPage: widgetType === "Onramp" ? "buy" : "sell",
                }}
                onClose={() => setOpenWidget(false)}
              />
            );
          })()}
      </>
    </React.Fragment>
  );
};

export default Ramps;
