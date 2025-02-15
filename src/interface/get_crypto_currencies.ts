type CurrencyNetwork = {
  code: string;
  network: string;
  icon: string | null;
};

type ProviderDetails = {
  code: string;
  network: string;
  icon: string | null;
  is_stable?: boolean;
  decimals?: number;
  min_amount?: number | null;
  max_amount?: number | null;
  min_buy_amount?: number | null;
  max_buy_amount?: number | null;
  min_sell_amount?: number | null;
  max_sell_amount?: number | null;
  token_address?: string;
  chain_id: string;
};

export type get_crypto_currencies = {
  code: string;
  network: string;
  name: string;
  crypto_icon: string;
  transak: ProviderDetails;
  moonpay: ProviderDetails;
  stripe: CurrencyNetwork;
  wert: CurrencyNetwork;
}[];
