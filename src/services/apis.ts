import axios from "axios";
import { post_buy_quote, post_sell_quote } from "./interface";

export const BACKEND_API = axios.create({
  baseURL: "https://3x26dlwune.execute-api.af-south-1.amazonaws.com/api/v1",
});

export default function backend() {
  return {
    get_user_location: async () => {
      return;
      const url = "/api/user-location";
      try {
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    post_change_location: async (country: string) => {
      const url = "/change-location";
      try {
        const response = await BACKEND_API.post(url, { country });
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    post_sell_quote: async (payload: post_sell_quote) => {
      const url = `/quotes/sell`;
      try {
        const response = await BACKEND_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_buy_quote: async (payload: post_buy_quote) => {
      const url = `/quotes/buy`;
      try {
        const response = await BACKEND_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    get_fiat_currencies: async () => {
      const url = "/fiat-currencies";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    get_crypto_currencies: async () => {
      const url = "/crypto-currencies";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    get_defaults: async () => {
      const url = "/defaults";
      try {
        const response = await BACKEND_API.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    // get_pricing_quote: async (queryString: string) => {
    //   const url = `/pricing-quotes?${queryString}`;
    //   try {
    //     const response = await BACKEND_API.get(url);
    //     return response;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    // get_countries: async () => {
    //   const url = "/countries";
    //   try {
    //     const response = await BACKEND_API.get(url);
    //     return response;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  };
}
