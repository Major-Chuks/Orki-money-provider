import { BACKEND_API_NO_VERSION, handleApiCall } from ".";

export const utilityApi = {
  get_fetchFiatCurrencies: async () => {
    const url = "/fiat-currencies";
    return handleApiCall(
      () => BACKEND_API_NO_VERSION.get(url),
      "get_fetchFiatCurrencies"
    );
  },
};
