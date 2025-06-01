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

export enum Role {
  developer,
  executive,
  marketing,
  product,
  operations,
}

export type post_create_account = {
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  emailAddress: string;
  role: string;
  password: string;
};
