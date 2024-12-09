import { StaticImageData } from "next/image";
import visaIcon from "@/assets/widget/visa-electron.svg";
import googlePayIcon from "@/assets/widget/google-pay.svg";
import applePayIcon from "@/assets/widget/apple-pay.svg";

export type IPAYMENT_METHOD = {
  icon: StaticImageData;
  title: string;
};

export const PAYMENT_METHOD: IPAYMENT_METHOD[] = [
  {
    title: "Credit Card",
    icon: visaIcon,
  },
  {
    icon: applePayIcon,
    title: "Apple pay",
  },
  {
    icon: googlePayIcon,
    title: "Google pay",
  },
];
