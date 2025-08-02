// Generated file - DO NOT EDIT
// This file contains React Query hooks for analytics API

import { analyticsApi } from "../apis/analytics";

import { useApiQuery } from ".";



export const useTotalTransactionsQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_totalTransactions", JSON.stringify(params)], () =>
    analyticsApi.get_totalTransactions(params)
  );

export const useCompletedTransactionsQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_completedTransactions", JSON.stringify(params)], () =>
    analyticsApi.get_completedTransactions(params)
  );

export const useTotalVolumeQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_totalVolume", JSON.stringify(params)], () =>
    analyticsApi.get_totalVolume(params)
  );

export const useFailedTransactionsQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_failedTransactions", JSON.stringify(params)], () =>
    analyticsApi.get_failedTransactions(params)
  );

export const useTransactionVolumeQuery = (params: { interval: "1D" | "7D" | "30D"; currency: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_transactionVolume", JSON.stringify(params)], () =>
    analyticsApi.get_transactionVolume(params)
  );

export const useTransactionHistoryQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_transactionHistory", JSON.stringify(params)], () =>
    analyticsApi.get_transactionHistory(params)
  );

export const useTopPaymentMethodsQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_topPaymentMethods", JSON.stringify(params)], () =>
    analyticsApi.get_topPaymentMethods(params)
  );

export const useTopFiatCurrenciesQuery = (params: { interval: "1D" | "7D" | "30D" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_topFiatCurrencies", JSON.stringify(params)], () =>
    analyticsApi.get_topFiatCurrencies(params)
  );
