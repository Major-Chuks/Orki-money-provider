export type post_buy_quote_type = {
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  amount: string;
};

export type post_sell_quote_type = {
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  crypto_amount: string;
};
