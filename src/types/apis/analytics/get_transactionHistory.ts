export interface get_transactionHistory {
  date: string;
  successful: get_transactionHistory_Sub1;
  failed: get_transactionHistory_Sub1;
}

interface get_transactionHistory_Sub1 {
  count: number;
  amount: number;
}