type PaymentMethod = {
  orki_id: string;
  logo: string;
  name: string;
  tagline: string;
};

export type PaymentMethodResponse = {
  payment_methods: PaymentMethod[];
  recommended: string;
};
