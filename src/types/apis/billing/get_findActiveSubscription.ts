export interface get_findActiveSubscription {
  id: number;
  name: string;
  status: "cancelled" | "cancelling" | "active" | "trialing";
  next_billing_date: string;
  interval: string;
  quantity: number;
  on_grace_period: boolean;
  on_trial: boolean;
  trial_ends_at: string;
  price_amount: number;
  price_currency: string;
  card: get_findActiveSubscription_Sub2 | null;
  plan: get_findActiveSubscription_Sub1;
}

interface get_findActiveSubscription_Sub1 {
  id: number;
  name: string;
  description: null;
  features: string[];
}

interface get_findActiveSubscription_Sub2 {
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}
