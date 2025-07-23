export interface post_initiateSwap {
  source_address: string;
  input_amount: number;
  quote_amount: number;
  to_address: string;
  to_address_tag?: string | undefined;
  pair_id: string;
}
