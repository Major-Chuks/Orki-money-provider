export interface get_swap {
  id: string;
  pair_id: string;
  status: string;
  from_asset: get_swap_Sub1;
  to_asset: get_swap_Sub1;
  from_amount: number;
  payout_amount: number;
  from_address: string;
  to_address: string;
  pay_in_address: string;
  transaction_hash: string;
  explorer: string;
  message: string;
  elapsed_time: string;
  exchange_rate: number;
}

interface get_swap_Sub1 {
  asset: string;
  logo: string;
}