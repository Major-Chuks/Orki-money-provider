import axios from "axios";
import {
  post_buy_quote_type,
  post_create_account,
  post_sell_quote_type,
} from "./interface";

export const BACKEND_API = axios.create({
  baseURL: "https://api.money.orki.io/api/v1",
});

export const AUTH_API = axios.create({
  baseURL: "https://api.money.orki.io/api/",
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

    post_login: async (payload: { email: string; password: string }) => {
      const url = `/auth/login`;
      try {
        const response = await AUTH_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_create_account: async (payload: post_create_account) => {
      const url = `/auth/register`;
      try {
        const response = await AUTH_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_verify_email: async (payload: { email: string; otp: string }) => {
      const url = `/auth/verify-email`;
      try {
        const response = await AUTH_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_resend_verification_otp: async (payload: { email: string }) => {
      const url = `/auth/resend-verification-otp`;
      try {
        const response = await AUTH_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_reset_password_otp: async (payload: { email: string }) => {
      const url = `/auth/reset-password-otp`;
      try {
        const response = await AUTH_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },

    post_change_password: async (payload: {
      email: string;
      password: string;
      otp: string;
    }) => {
      const url = `/auth/change-password`;
      try {
        const response = await AUTH_API.post(url, payload);
        return response;
      } catch (error: any) {
        console.error(error);
        return error.response.data.msg;
      }
    },
  };
}
