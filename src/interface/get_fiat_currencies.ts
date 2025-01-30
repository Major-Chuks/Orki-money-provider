type PaymentOption = {
  name: string;
  id: string;
  isNftAllowed: boolean;
  isNonCustodial: boolean;
  processingTime: string;
  displayText: boolean;
  icon: string;
  limitCurrency: string;
  isActive: boolean;
  provider: string;
  maxAmount: number;
  minAmount: number;
  defaultAmount: number;
  isConverted: boolean;
  visaPayoutCountries?: string[];
  mastercardPayoutCountries?: string[];
  isPayOutAllowed: boolean;
  minAmountForPayOut: number;
  maxAmountForPayOut: number;
  defaultAmountForPayOut: number;
};

type CurrencyInfo = {
  symbol: string;
  supportingCountries: string[];
  logoSymbol: string;
  name: string;
  paymentOptions: PaymentOption[];
  isPopular: boolean;
  isAllowed: boolean;
  roundOff: number;
  isPayOutAllowed: boolean;
  defaultCountryForNFT: string;
  icon: string;
};

export type get_fiat_currencies = CurrencyInfo[];
