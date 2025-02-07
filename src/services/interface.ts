import { SupportedProviders } from "@/components/Widget/Widget";

export type post_buy_quote = {
  provider: SupportedProviders;
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  amount: string;
};

export type post_sell_quote = {
  provider: SupportedProviders;
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  crypto_amount: string;
};
