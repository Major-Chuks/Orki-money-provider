import { useQuery, useMutation } from "@tanstack/react-query";
import { BACKEND_API } from "./apis";
import { post_buy_quote_type, post_sell_quote_type } from "./interface";
import { queryClient } from "@/app/appLayout";

const get_user_location = async () => {
  const url = "/get-location";
  const response = await BACKEND_API.get(url);
  return response;
};

const get_coverage = async () => {
  const url = "/coverage";
  const response = await BACKEND_API.get(url);
  return response;
};

const post_change_location = async (country: string) => {
  const url = "/change-location";
  const response = await BACKEND_API.post(url, { country });
  return response;
};

const get_payment_methods = async (fiat: string) => {
  const url = `/payment-methods?fiat=${fiat}`;
  const response = await BACKEND_API.get(url);
  return response;
};

const post_sell_quote = async (payload: post_sell_quote_type) => {
  const url = `/quotes/sell`;
  const response = await BACKEND_API.post(url, payload);
  return response;
};

const post_buy_quote = async (payload: post_buy_quote_type) => {
  const url = `/quotes/buy`;
  const response = await BACKEND_API.post(url, payload);
  return response;
};

const get_fiat_currencies = async () => {
  const url = "/fiat-currencies";
  const response = await BACKEND_API.get(url);
  return response;
};

const get_crypto_currencies = async () => {
  const url = "/crypto-currencies";
  const response = await BACKEND_API.get(url);
  return response;
};

const get_defaults = async () => {
  const url = "/defaults";
  const response = await BACKEND_API.get(url);
  return response;
};

// Hooks for queries and mutations
export const useGetUserLocation = () =>
  useQuery({ queryKey: ["get_user_location"], queryFn: get_user_location });

export const useGetCoverage = () =>
  useQuery({ queryKey: ["get_coverage"], queryFn: get_coverage });

export const usePostChangeLocation = () =>
  useMutation({
    mutationFn: (country: string) => post_change_location(country),
  });

export const useGetPaymentMethods = (fiat?: string) =>
  useQuery({
    queryKey: ["get_payment_methods", fiat],
    queryFn: () => get_payment_methods(fiat!),
    enabled: !!fiat,
  });

export const usePostSellQuote = () =>
  useMutation({
    mutationFn: (payload: post_sell_quote_type) => post_sell_quote(payload),
  });

export const usePostBuyQuote = () =>
  useMutation({
    mutationFn: (payload: post_buy_quote_type) => post_buy_quote(payload),
  });

export const useGetFiatCurrencies = () =>
  useQuery({ queryKey: ["get_fiat_currencies"], queryFn: get_fiat_currencies });

export const useGetCryptoCurencies = () =>
  useQuery({
    queryKey: ["get_crypto_currencies"],
    queryFn: () => get_crypto_currencies(),
  });

export const useGetDefaults = () =>
  useQuery({
    queryKey: ["get_defaults"],
    queryFn: get_defaults,
  });

// Functions for queries and mutations outside react component
export const getUserLocation = () =>
  queryClient.ensureQueryData({
    queryKey: ["get_user_location"],
    queryFn: get_user_location,
  });

export const getCoverage = () =>
  queryClient.ensureQueryData({
    queryKey: ["get_coverage"],
    queryFn: () => get_coverage,
  });

export const getPaymentMethods = (fiat: string) =>
  queryClient.ensureQueryData({
    queryKey: ["get_payment_methods", fiat],
    queryFn: () => get_payment_methods(fiat),
  });

export const getFiatCurrencies = () =>
  queryClient.ensureQueryData({
    queryKey: ["get_fiat_currencies"],
    queryFn: get_fiat_currencies,
  });

export const getCryptoCurencies = () =>
  queryClient.ensureQueryData({
    queryKey: ["get_crypto_currencies"],
    queryFn: () => get_crypto_currencies(),
  });

export const getDefaults = () =>
  queryClient.ensureQueryData({
    queryKey: ["get_defaults"],
    queryFn: get_defaults,
  });
