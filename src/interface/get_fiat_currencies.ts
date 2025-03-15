type PaymentMethodResponse = {
  paymentMethodName: string;
  paymentMethodId: string;
  paymentMethodLogo: string | null;
  minBuyAmount: number | null;
  maxBuyAmount: number | null;
  minSellAmount: number | null;
  maxSellAmount: number | null;
  processingTime: string | null;
};

export type get_fiat_currencies = {
  code: string;
  name: string;
  logoSymbol: string;
  fiat_icon: string;
  transak: PaymentMethodResponse[];
  moonpay: PaymentMethodResponse[];
  stripe: PaymentMethodResponse[];
  wert: PaymentMethodResponse[];
}[];
