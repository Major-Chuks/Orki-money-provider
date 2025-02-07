export type get_crypto_currencies = {
  code: string;
  name: string;
  icon: string;
  network: string;
  decimal?: number | null;
  decimals?: number | null;
  min_amount: number | null;
  max_amount: number | null;
  provider: string;
};
