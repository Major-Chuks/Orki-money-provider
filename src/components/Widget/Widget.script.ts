import { COUNTRY_DATA, ICountryData } from "@/constants/country";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import { get_defaults } from "@/interface/get_defaults";
import {
  get_fiat_currencies,
  PaymentMethodResponse,
} from "@/interface/get_fiat_currencies";
import backend from "@/services/apis";
import { formatMoneyToNumber } from "@/services/utils";
import { SetStateAction } from "react";

export const sortProviders = (providers: get_defaults | null) => {
  if (!providers) return null;
  const supportedProviders = providers.filter((p) => p.is_supported);
  const noSupported = providers.filter((p) => !p.is_supported);

  return [...supportedProviders, ...noSupported];
};

export const fetchDefaultsByCountry = async ({
  country,
  setError,
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
}: {
  country: ICountryData;
  setAllProviders: React.Dispatch<React.SetStateAction<get_defaults | null>>;
  setProvider: React.Dispatch<
    React.SetStateAction<get_defaults[number] | null>
  >;
  setError: React.Dispatch<SetStateAction<string>>;
  setFiatAmount: React.Dispatch<React.SetStateAction<string>>;
  setCryptoAmount: React.Dispatch<React.SetStateAction<string>>;
  setCryptoCurrency: React.Dispatch<React.SetStateAction<string>>;
  setFiatCurrency: React.Dispatch<React.SetStateAction<string>>;
  setNetwork: React.Dispatch<React.SetStateAction<string>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  setFiatCurrencies: React.Dispatch<
    React.SetStateAction<get_fiat_currencies | null>
  >;
  setCryptoCurrencies: React.Dispatch<
    React.SetStateAction<get_crypto_currencies | null>
  >;
  setPaymentOptions: React.Dispatch<
    React.SetStateAction<PaymentMethodResponse[] | null>
  >;
}) => {
  setError("");
  setFiatCurrency(country.currency.toUpperCase());

  const [fiatRes, cryptoRes, defaultRes] = await Promise.all([
    backend().get_fiat_currencies(),
    backend().get_crypto_currencies(),
    backend().post_change_location(country.code),
  ]);

  if (defaultRes) {
    const _defaults: get_defaults = defaultRes.data.data;
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

    // find the currency object
    if (fiatRes) {
      const fiatCurrencies: get_fiat_currencies = fiatRes.data.data;
      const afc = fiatCurrencies?.find(
        (fc) =>
          fc.code.toLowerCase() === _bestProvider.asset?.fiat.toLowerCase()
      );

      if (afc) {
        const _provider = _bestProvider.provider.name.toLowerCase();
        const _paymentOptions = afc[_provider as keyof typeof afc];
        setPaymentOptions(_paymentOptions as PaymentMethodResponse[]);
      }
      setFiatCurrencies(fiatCurrencies);
    }
    if (cryptoRes) {
      const cryptoCurrencies = cryptoRes.data.data;
      setCryptoCurrencies(cryptoCurrencies);
    }
  } else {
    setError(
      "This currency is not supported. Please select a different currency."
    );
  }
};

export const fetchDefaults = async ({
  setError,
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
  setCountry,
}: {
  setAllProviders: React.Dispatch<React.SetStateAction<get_defaults | null>>;
  setProvider: React.Dispatch<
    React.SetStateAction<get_defaults[number] | null>
  >;
  setError: React.Dispatch<SetStateAction<string>>;
  setFiatAmount: React.Dispatch<React.SetStateAction<string>>;
  setCryptoAmount: React.Dispatch<React.SetStateAction<string>>;
  setCryptoCurrency: React.Dispatch<React.SetStateAction<string>>;
  setFiatCurrency: React.Dispatch<React.SetStateAction<string>>;
  setNetwork: React.Dispatch<React.SetStateAction<string>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  setFiatCurrencies: React.Dispatch<
    React.SetStateAction<get_fiat_currencies | null>
  >;
  setCryptoCurrencies: React.Dispatch<
    React.SetStateAction<get_crypto_currencies | null>
  >;
  setPaymentOptions: React.Dispatch<
    React.SetStateAction<PaymentMethodResponse[] | null>
  >;
  setCountry: React.Dispatch<React.SetStateAction<ICountryData | null>>;
}) => {
  const [fiatRes, cryptoRes, defaultRes, locationRes] = await Promise.all([
    backend().get_fiat_currencies(),
    backend().get_crypto_currencies(),
    backend().get_defaults(),
    backend().get_user_location(),
  ]);

  let countryInfo: ICountryData | null = null;

  if (locationRes) {
    const cc = locationRes.data.country;
    const country = COUNTRY_DATA.find((cd) => cd.code === cc);
    if (country) {
      countryInfo = country;
      setCountry(country);
    }
  }

  if (defaultRes) {
    const _defaults: get_defaults = defaultRes.data.data;
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

    // find the currency object
    if (fiatRes) {
      const fiatCurrencies: get_fiat_currencies = fiatRes.data.data;
      const afc = fiatCurrencies?.find(
        (fc) =>
          fc.code.toLowerCase() === _bestProvider.asset?.fiat.toLowerCase()
      );

      if (afc) {
        const _provider = _bestProvider.provider.name.toLowerCase();
        const _paymentOptions = afc[_provider as keyof typeof afc];
        setPaymentOptions(_paymentOptions as PaymentMethodResponse[]);
      }
      setFiatCurrencies(fiatCurrencies);
    }
    if (cryptoRes) {
      const cryptoCurrencies = cryptoRes.data.data;
      setCryptoCurrencies(cryptoCurrencies);
    }
  } else {
    setError(
      "This currency is not supported. Please select a different currency."
    );
    // fetch user country
    if (cryptoRes) {
      const cryptoCurrencies: get_crypto_currencies = cryptoRes.data.data;
      setCryptoCurrencies(cryptoCurrencies);
      setCryptoCurrency(cryptoCurrencies[1].code);
    }
    if (fiatRes) {
      const fiatCurrencies: get_fiat_currencies = fiatRes.data.data;
      setFiatCurrencies(fiatCurrencies);
      if (countryInfo) {
        const currency = fiatCurrencies.find(
          (fc) => fc.code.toLowerCase() === countryInfo.currency.toLowerCase()
        );
        if (currency) {
          setFiatCurrency(currency.code);
        }
      } else {
        setFiatCurrency("");
      }
    }
    setFiatAmount("0.00");
    setCryptoAmount("0.00");
  }
};

export const fetchQuotes = async ({
  fiatAmount,
  cryptoAmount,
  fiatCurrency,
  cryptoCurrency,
  network,
  isBuyOrSell,
  paymentMethod,
}: {
  fiatAmount: string;
  cryptoAmount: string;
  fiatCurrency: string;
  cryptoCurrency: string;
  network: string;
  isBuyOrSell: string;
  paymentMethod: string;
}) => {
  const queryParams = Object.fromEntries(
    Object.entries({
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
    "fiatCurrency",
    "cryptoCurrency",
    "network",
    "isBuyOrSell",
    "paymentMethod",
  ];

  const allKeysPresent = queryParamKeys.every((key) => key in queryParams);

  if (!allKeysPresent) return;

  // const queryString = new URLSearchParams(queryParams as any).toString();
  const response =
    isBuyOrSell === "BUY"
      ? await backend().post_buy_quote({
          fiat_currency: fiatCurrency.toUpperCase(),
          crypto_currency: cryptoCurrency.toUpperCase(),
          network: network,
          payment_method: paymentMethod,
          amount: formatMoneyToNumber(fiatAmount).toString(),
        })
      : await backend().post_sell_quote({
          fiat_currency: fiatCurrency,
          crypto_amount: cryptoAmount,
          crypto_currency: cryptoCurrency,
          network: network,
          payment_method: paymentMethod,
        });

  return response;
};

export const getQuoteLimit = ({
  fiatCurrencies,
  providerName,
  paymentMethod,
  fiatCurrency,
}: {
  providerName: string;
  fiatCurrency: string;
  paymentMethod: string;
  fiatCurrencies: get_fiat_currencies | null;
}) => {
  // validate input when fiat currency or input value changes
  const afc = fiatCurrencies?.find(
    (fc) => fc.code.toLowerCase() === fiatCurrency.toLowerCase()
  );
  if (afc && providerName) {
    const _paymentOptions = afc[providerName.toLowerCase() as keyof typeof afc];
    if (typeof _paymentOptions !== "string") {
      const _paymentMethod = _paymentOptions.find(
        (pm) => pm.paymentMethodId === paymentMethod
      );
      if (_paymentMethod) {
        return {
          minBuyAmount: _paymentMethod?.minBuyAmount || 0,
          maxBuyAmount: _paymentMethod?.maxBuyAmount || 0,
        };
      }
    }
  }
  return { minBuyAmount: 0, maxBuyAmount: 0 };
};

export const isValidQuoteLimit = ({
  maxBuyAmount,
  minBuyAmount,
  fiatAmount,
  fiatCurrency,
  setError,
}: {
  minBuyAmount: number;
  maxBuyAmount: number;
  fiatAmount: number;
  fiatCurrency: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (fiatAmount < minBuyAmount) {
    setError(
      `Order value can’t be lesser than ${fiatCurrency.toUpperCase()} ${minBuyAmount.toLocaleString()}`
    );
    return false;
  }
  if (maxBuyAmount) {
    if (fiatAmount > maxBuyAmount) {
      setError(
        `Order value can’t be higher than ${fiatCurrency.toUpperCase()} ${maxBuyAmount.toLocaleString()}`
      );
      return false;
    }
  }
  return true;
};
