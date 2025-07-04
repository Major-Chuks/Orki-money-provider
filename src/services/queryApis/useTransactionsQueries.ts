// Generated file - DO NOT EDIT
// This file contains React Query hooks for transactions API

import { transactionsApi } from "../apis/transactions";

import { useApiQuery } from ".";



export const useTransactionsQuery = (params: { params: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_transactions", JSON.stringify(params)], () =>
    transactionsApi.get_transactions(params)
  );

export const useFindTransactionQuery = (params: { transactionId: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_findTransaction", JSON.stringify(params)], () =>
    transactionsApi.get_findTransaction(params)
  );
