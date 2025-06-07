type Provider = {
  name: string;
  identifier: string;
  icon: string;
};

type Asset = {
  fiat: string;
  fiat_amount: string;
  crypto: string;
  crypto_amount: string;
  network: string;
  payment_method: string;
};

export type get_defaults = {
  provider: Provider;
  exchange_rate?: number;
  is_best: boolean;
  asset?: Asset;
  link?: string;
  quote_amount?: number;
  percentage_diff: number;
  is_supported: boolean;
  widget?: {
    clientId: string;
    ticker: string;
    token: string;
    currency: string;
  } | null;
}[];
