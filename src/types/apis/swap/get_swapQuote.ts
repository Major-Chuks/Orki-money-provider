export interface get_swapQuote {
  id: string;
  input_amount: number;
  quote_amount: number;
  quote_miner_fee: number;
  pair_id: string;
  exchange_rate: number;
  min_from_amount: number;
  max_from_amount: number;
  expiry: Date;
}
