import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import { get_defaults } from "@/interface/get_defaults";
import {
  get_fiat_currencies,
  PaymentMethodResponse,
} from "@/interface/get_fiat_currencies";
import backend from "@/services/apis";
import { formatMoneyToNumber } from "@/services/utils";

export const sortProviders = (providers: get_defaults | null) => {
  if (!providers) return null;
  const supportedProviders = providers.filter((p) => p.is_supported);
  const noSupported = providers.filter((p) => !p.is_supported);

  return [...supportedProviders, ...noSupported];
};

export const fetchDefaults = async ({
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
  setAllProviders: React.Dispatch<React.SetStateAction<get_defaults | null>>;
  setProvider: React.Dispatch<
    React.SetStateAction<get_defaults[number] | null>
  >;
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
  const [fiatRes, cryptoRes, defaultRes] = await Promise.all([
    backend().get_fiat_currencies(),
    backend().get_crypto_currencies(),
    backend().get_defaults(),
  ]);

  if (defaultRes) {
    const _defaults: get_defaults = defaultRes.data.data;
    setAllProviders(_defaults);
    const _bestProvider = _defaults.find((dp) => dp.is_best);
    if (!_bestProvider) return;
    setProvider(_bestProvider);
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
