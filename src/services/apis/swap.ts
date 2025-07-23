import { BACKEND_API, handleApiCall } from ".";

export const swapApi = {
  get_swapPairs: async () => {
    const url = "/swap/pairs";
    return handleApiCall(() => BACKEND_API.get(url), "get_swapPairs");
  },
  get_swap: async ({ id }: { id: string }) => {
    const url = `/swap/${id}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_swap");
  },
  get_swapQuote: async ({
    pairId,
    amount,
  }: {
    pairId: string;
    amount: string;
  }) => {
    const url = `/swap/quote?pairId=${pairId}&amount=${amount}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_swapQuote");
  },
  post_initiateSwap: async (payload: {
    source_address: string;
    input_amount: number;
    quote_amount: number;
    to_address: string;
    to_address_tag?: string;
    pair_id: string;
  }) => {
    const url = "/swap/initiate";
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_initiateSwap"
    );
  },
  patch_updateSwap: async ({
    id,
    transaction_hash,
  }: {
    id: string;
    transaction_hash: string;
  }) => {
    const url = `/swap/${id}`;
    return handleApiCall(
      () => BACKEND_API.patch(url, { transaction_hash }),
      "patch_updateSwap"
    );
  },
};
