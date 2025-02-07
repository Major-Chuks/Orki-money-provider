type PaymentMethod = {
  id: string;
  name: string;
  icon: string | null;
};

export type get_fiat_currencies = {
  code: string;
  name: string;
  icon: string | null;
  provider: string;
  min_amount: number | null;
  max_amount: number | null;
  payment_methods: PaymentMethod[];
};
