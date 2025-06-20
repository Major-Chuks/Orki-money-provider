export interface get_transactions {
  transactions: get_transactions_Sub2[];
  meta: get_transactions_Sub1;
}

interface get_transactions_Sub1 {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string;
  previousPageUrl: null;
}

interface get_transactions_Sub2 {
  id: string;
  provider_tx_id: null;
  type: string;
  sender_address: null;
  recipient_address: null;
  exchange_rate: string;
  transaction_hash: null;
  provider_fee: null;
  orki_fee: null;
  network_fee: null;
  fiat_amount: string;
  crypto_amount: string;
  fiat_currency: string;
  crypto_currency: string;
  network: string;
  payment_method: string;
  status: string;
  provider: string;
  created_at: string;
}