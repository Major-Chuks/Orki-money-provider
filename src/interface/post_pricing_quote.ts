type Provider = {
  name: string;
  identifier: string;
  icon: string;
};

type Quote = {
  crypto_amount: number;
  exchange_rate: number;
  quote_id: string;
  fiat_currency: string;
  crypto_currency: string;
  payment_method: string;
  network: string;
  fiat_amount: number;
};

export type post_pricing_quote = {
  provider: Provider;
  quote: Quote;
  purchase_link: string;
};
