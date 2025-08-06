import { BACKEND_API, handleApiCall } from ".";

export const transactionsApi = {
  // TRANSACTIONS
  get_transactions: async ({ params }: { params: string }) => {
    const url = `/transactions${params}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_transactions");
  },

  get_findTransaction: async ({ transactionId }: { transactionId: string }) => {
    const url = `/transactions/${transactionId}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_transactions");
  },

  get_exportTransaction: async ({ params }: { params: string }) => {
    const url = `/transactions/export${params}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_exportTransaction");
  },
};
