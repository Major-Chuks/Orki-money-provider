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
  widget?: KoyweWidgetType | OnmetaWidgetType | CoinifyWidgetType | null;
}[];

export type KoyweWidgetType = {
  clientId: string;
  ticker: string;
  crypto: string;
  fiat: string;
};

export type OnmetaWidgetType = {
  fiat: string;
  crypto: string;
  network: string;
  ticker: number;
  payment_method: string;
  metadata: {
    orderID: string;
  };
};

export type CoinifyWidgetType = {
  fiat: string;
  crypto: string;
  network: string;
  ticker: string;
  payment_method: string;
  metadata: {
    orderID: string;
  };
};
