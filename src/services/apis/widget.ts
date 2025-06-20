import { BACKEND_API, handleApiCall } from ".";

export const widgetApi = {
  post_sell_quote: async (payload: {
    fiat_currency: string;
    crypto_currency: string;
    network: string;
    payment_method: string;
    crypto_amount: string;
  }) => {
    const url = `/quotes/sell`;
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_sell_quote"
    );
  },

  post_buy_quote: async (payload: {
    fiat_currency: string;
    crypto_currency: string;
    network: string;
    payment_method: string;
    amount: string;
  }) => {
    const url = `/quotes/buy`;
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_buy_quote"
    );
  },
};
