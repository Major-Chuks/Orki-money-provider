/* sync-type-disable */

export interface get_listBillingHistory {
  data: get_listBillingHistory_Sub2[];
  meta: get_listBillingHistory_Sub1;
}

interface get_listBillingHistory_Sub1 {
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

interface get_listBillingHistory_Sub2 {
  id: string;
  status: string;
  billing_period_start: string;
  billing_period_end: string;
  invoice_date: string;
  due_date: string;
  interval_type: string;
  items: get_listBillingHistory_Sub3[];
  subtotal: number;
  tax: number;
  total: string;
  download_url: string;
  payment_method: {
    brand: string;
    last_four: string;
  } | null;
  currency: string;
}

interface get_listBillingHistory_Sub3 {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}
