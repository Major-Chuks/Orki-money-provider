// import { StaticImageData } from "next/image";

import { routes } from "@/services/routes";
import { StaticImageData } from "next/image";
import home from "@/assets/app/pageRoutes/home.png";
import homeActive from "@/assets/app/pageRoutes/home-active.png";

import transactions from "@/assets/app/pageRoutes/transactions.png";
import transactionsActive from "@/assets/app/pageRoutes/transactions-active.png";

import clientManangement from "@/assets/app/pageRoutes//client-management.png";
import clientManangementActive from "@/assets/app/pageRoutes/client-management-active.png";

import settings from "@/assets/app/pageRoutes/settings.png";
import settingsActive from "@/assets/app/pageRoutes/settings-active.png";

export const adminRoutes: {
  name: string;
  icons: {
    active: StaticImageData;
    inActive: StaticImageData;
  };
  url: string;
}[] = [
  {
    name: "Dashboard",
    icons: {
      active: homeActive,
      inActive: home,
    },
    url: routes.adminDashboard,
  },
  {
    name: "Client Management",
    icons: {
      active: clientManangementActive,
      inActive: clientManangement,
    },
    url: routes.adminClientManagement,
  },
  {
    name: "Transactions",
    icons: {
      active: transactionsActive,
      inActive: transactions,
    },
    url: routes.adminTransactions,
  },
  {
    name: "Profile and Settings",
    icons: {
      active: settingsActive,
      inActive: settings,
    },
    url: routes.adminProfileAndSettings,
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
  "client-management": {
    title: "Client Management",
    description: "",
  },
  "profile-and-settings": {
    title: "Profile and Settings",
    description: "",
  },
};
