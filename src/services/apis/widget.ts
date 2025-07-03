import { BACKEND_API, handleApiCall } from ".";

export const widgetApi = {
  post_sell_quote: async ({
    token,
    ...payload
  }: {
    fiat_currency: string;
    crypto_currency: string;
    network: string;
    payment_method: string;
    crypto_amount: string;
    token: string;
  }) => {
    const url = `/quotes/sell`;
    return handleApiCall(
      () =>
        BACKEND_API.post(url, payload, {
          headers: {
            "X-ORKI-TRADE-TYPE": "sell",
            "X-ORKI-PUBLIC-WIDGET-TOKEN": token,
          },
        }),
      "post_sell_quote"
    );
  },

  post_buy_quote: async ({
    token,
    ...payload
  }: {
    fiat_currency: string;
    crypto_currency: string;
    network: string;
    payment_method: string;
    amount: string;
    token: string;
  }) => {
    const url = `/quotes/buy`;
    return handleApiCall(
      () =>
        BACKEND_API.post(url, payload, {
          headers: {
            "X-ORKI-TRADE-TYPE": "buy",
            "X-ORKI-PUBLIC-WIDGET-TOKEN": token,
          },
        }),
      "post_buy_quote"
    );
  },
  get_generateSignatureToken: async () => {
    const url = "/generate-signature-token";
    return handleApiCall(
      () => BACKEND_API.get(url),
      "get_generateSignatureToken"
    );
  },
};
