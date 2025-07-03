export interface get_listBillingPlans {
  data: get_listBillingPlans_Sub1[];
  meta: null;
}

interface get_listBillingPlans_Sub1 {
  name: string;
  price_id: string;
  plan_id: string;
  plan_cycle: string;
  features: string[];
  description: null | string;
  is_active: number;
  currency: string;
  monthly_amount: number;
  has_yearly_discount: boolean;
  yearly_discount_percentage: null;
  yearly_amount: null;
  requires_quote: boolean;
  contact_us: null | string;
}