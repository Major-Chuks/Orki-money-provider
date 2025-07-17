export interface get_transactionVolume {
  interval: string;
  currency: string;
  data: get_transactionVolume_Sub2[];
  provider_color_map: get_transactionVolume_Sub1;
}

interface get_transactionVolume_Sub1 {
  transak: string;
  moonpay: string;
  stripe: string;
  wert: string;
  unlimit: string;
  yellowcard: string;
  transfi: string;
  guardarian: string;
  fonbnk: string;
  koywe: string;
  alchemypay: string;
  onrampmoney: string;
  onmeta: string;
  coinify: string;
}

interface get_transactionVolume_Sub2 {
  date: string;
  providers: get_transactionVolume_Sub3;
}

interface get_transactionVolume_Sub3 {
  stripe?: number;
  coinify?: number;
  guardarian?: number;
}