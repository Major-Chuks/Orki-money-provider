// import { StaticImageData } from "next/image";

import { routes } from "@/services/routes";
import { StaticImageData } from "next/image";
import home from "@/assets/app/pageRoutes/home.png";
import homeActive from "@/assets/app/pageRoutes/home-active.png";

import transactions from "@/assets/app/pageRoutes/transactions.png";
import transactionsActive from "@/assets/app/pageRoutes/transactions-active.png";

import apiManangement from "@/assets/app/pageRoutes//api-management.png";
import apiManangementActive from "@/assets/app/pageRoutes/api-management-active.png";

import billing from "@/assets/app/pageRoutes/billing.png";
import billingActive from "@/assets/app/pageRoutes/billing-active.png";

import settings from "@/assets/app/pageRoutes/settings.png";
import settingsActive from "@/assets/app/pageRoutes/settings-active.png";

export const pageRoutes: {
  name: string;
  icons: {
    active: StaticImageData;
    inActive: StaticImageData;
  };
  url: string;
}[] = [
  {
    name: "Home",
    icons: {
      active: homeActive,
      inActive: home,
    },
    url: routes.dashboard,
  },
  {
    name: "Transactions",
    icons: {
      active: transactionsActive,
      inActive: transactions,
    },
    url: routes.transactions,
  },
  {
    name: "API Management",
    icons: {
      active: apiManangementActive,
      inActive: apiManangement,
    },
    url: routes.apiManagement,
  },
  {
    name: "Billing",
    icons: {
      active: billingActive,
      inActive: billing,
    },
    url: routes.billing,
  },
  {
    name: "Profile and Settings",
    icons: {
      active: settingsActive,
      inActive: settings,
    },
    url: routes.profileAndSettings,
  },
];

export const mapRoutesToHeading: Record<
  string,
  { title: string; description: string }
> = {
  app: {
    title: "Dashboard",
    description: "",
  },
  transactions: {
    title: "Transactions",
    description: "",
  },
  "api-management": {
    title: "API Management",
    description: "",
  },
  billing: {
    title: "Billing",
    description: "",
  },
  "profile-and-settings": {
    title: "Profile and Settings",
    description: "",
  },
};
