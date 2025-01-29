type CryptoCurrency = {
  _id: string;
  coinId: string;
  address: string;
  addressAdditionalData: boolean;
  createdAt: string;
  decimals: number;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  isAllowed: boolean;
  isPopular: boolean;
  isStable: boolean;
  name: string;
  roundOff: number;
  symbol: string;
  isIgnorePriceVerification: boolean;
  image_bk: {
    large: string;
    small: string;
    thumb: string;
  };
  kycCountriesNotSupported: string[];
  network: {
    name: string;
    fiatCurrenciesNotSupported: string[];
    chainId: string;
  };
  uniqueId: string;
  tokenType: "GENERAL" | "STABLE" | "UTILITY" | string; // Assuming tokenType can vary
  tokenIdentifier: string | null;
  isPayInAllowed: boolean;
  minAmountForPayIn: number | null;
  maxAmountForPayIn: number | null;
};

export type get_crypto_currencies = CryptoCurrency[];
