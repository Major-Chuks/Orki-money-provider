export type post_buy_quote = {
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  amount: string;
};

export type post_sell_quote = {
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  crypto_amount: string;
};
