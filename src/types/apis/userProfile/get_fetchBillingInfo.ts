export interface get_fetchBillingInfo {
  name: string;
  email: string;
  address: get_fetchBillingInfo_Sub1;
}

interface get_fetchBillingInfo_Sub1 {
  line1: string;
  city: string;
  country: string;
  state: string;
  postal_code: string;
}