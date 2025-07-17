import { BACKEND_API, handleApiCall } from ".";

export const analyticsApi = {
  get_totalTransactions: async ({
    interval,
  }: {
    interval: "1D" | "7D" | "30D";
  }) => {
    const url = `/dashboard/analytics/total-transactions?interval=${interval}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_totalTransactions");
  },

  get_completedTransactions: async ({
    interval,
  }: {
    interval: "1D" | "7D" | "30D";
  }) => {
    const url = `/dashboard/analytics/completed-transactions?interval=${interval}`;
    return handleApiCall(
      () => BACKEND_API.get(url),
      "get_completedTransactions"
    );
  },

  get_totalVolume: async ({ interval }: { interval: "1D" | "7D" | "30D" }) => {
    const url = `/dashboard/analytics/total-volume?interval=${interval}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_totalVolume");
  },

  get_failedTransactions: async ({
    interval,
  }: {
    interval: "1D" | "7D" | "30D";
  }) => {
    const url = `/dashboard/analytics/failed-transactions?interval=${interval}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_failedTransactions");
  },

  get_transactionVolume: async ({
    interval,
  }: {
    interval: "1D" | "7D" | "30D";
  }) => {
    const url = `/dashboard/analytics/transaction-volume?interval=${interval}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_transactionVolume");
  },

  get_transactionHistory: async ({
    interval,
    currency,
  }: {
    interval: "1D" | "7D" | "30D";
    currency: string;
  }) => {
    const url = `/dashboard/analytics/transaction-history?interval=${interval}&currency=${currency}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_transactionHistory");
  },

  get_topPaymentMethods: async ({
    interval,
  }: {
    interval: "1D" | "7D" | "30D";
  }) => {
    const url = `/dashboard/analytics/top-payment-methods?interval=${interval}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_topPaymentMethods");
  },

  get_topFiatCurrencies: async ({
    interval,
  }: {
    interval: "1D" | "7D" | "30D";
  }) => {
    const url = `/dashboard/analytics/top-fiat-currencies?interval=${interval}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_topFiatCurrencies");
  },
};
