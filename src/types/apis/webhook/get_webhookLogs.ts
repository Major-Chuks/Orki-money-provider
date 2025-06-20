export interface get_webhookLogs {
  webhook_logs: get_webhookLogs_Sub2[];
  meta: get_webhookLogs_Sub1;
}

interface get_webhookLogs_Sub1 {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: null;
  previousPageUrl: null;
}

interface get_webhookLogs_Sub2 {
  id: string;
  user_id: string;
  transaction_id: string;
  payload: get_webhookLogs_Sub3;
  url: string;
  event_type: string;
  status_code: number;
  status: string;
  attempts: number;
  last_attempted_at: string;
}

interface get_webhookLogs_Sub3 {
  data: get_webhookLogs_Sub5;
  meta: get_webhookLogs_Sub4;
}

interface get_webhookLogs_Sub4 {
  event: string;
  version: string;
  timestamp: number;
}

interface get_webhookLogs_Sub5 {
  id: string;
  type: string;
  status: string;
  network: string;
  orki_fee: null;
  provider: string;
  created_at: string;
  fiat_amount: string;
  network_fee: null;
  provider_fee: null;
  crypto_amount: string;
  exchange_rate: string;
  fiat_currency: string;
  payment_method: string;
  sender_address: null;
  crypto_currency: string;
  transaction_hash: null;
  recipient_address: null;
  provider_transaction_id: string;
}