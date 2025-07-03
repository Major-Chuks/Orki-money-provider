export interface get_listPaymentMethods {
  data: get_listPaymentMethods_Sub1[];
  meta: null;
}

interface get_listPaymentMethods_Sub1 {
  id: string;
  type: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}