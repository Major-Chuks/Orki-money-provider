import axios from "axios";

export const BACKEND_API = axios.create({
  baseURL: "/api/transak",
  withCredentials: true,
});

BACKEND_API.interceptors.request.use(async (config) => {
  // const apiKey = "fb5f3193-423a-4a47-a7cd-07a24f448c16";
  // const apiSecret = "wcImPJE/C1D+bsVFDEjcFA==";
  // config.headers.Authorization = `Bearer ${apiKey}`;
  return config;
});

export default function backend() {
  return {
    get_fiat_currencies: async () => {
      const url = "/currencies/fiat-currencies";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    get_crypto_currencies: async () => {
      const url = "/currencies/crypto-currencies";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    get_pricing_quote: async (queryString: string) => {
      const url = `/pricing-quotes?${queryString}`;
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    get_countries: async () => {
      const url = "/countries";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    get_user_country: async () => {
      const url = "/user-country";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  };
}
