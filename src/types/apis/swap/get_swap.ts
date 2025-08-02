export interface get_swap {
  id: string;
  pair_id: string;
  status: string;
  from_asset: string;
  to_asset: string;
  from_address: string;
  to_address: string;
  pay_in_address: string;
  transaction_hash: string;
  explorer: string;
  message: string;
  elapsed_time: string;
  exchange_rate: number;
}