import axios from "axios";
import { post_buy_quote_type, post_sell_quote_type } from "./interface";

export const BACKEND_API = axios.create({
  baseURL: "https://3x26dlwune.execute-api.af-south-1.amazonaws.com/api/v1",
});

export default function backend() {
  return {
    post_sell_quote: async (payload: post_sell_quote_type) => {
      const url = `/quotes/sell`;
      try {
        const response = await BACKEND_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_buy_quote: async (payload: post_buy_quote_type) => {
      const url = `/quotes/buy`;
      try {
        const response = await BACKEND_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },
  };
}
