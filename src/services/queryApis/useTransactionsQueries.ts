// Generated file - DO NOT EDIT
// This file contains React Query hooks for transactions API

import { transactionsApi } from "../apis/transactions";

import { useApiQuery } from ".";



export const useTransactionsQuery = () =>
  useApiQuery(["get_transactions"], transactionsApi.get_transactions);

export const useFindTransactionQuery = (params: { transactionId: string }) =>
  useApiQuery(["get_findTransaction"], () =>
    transactionsApi.get_findTransaction(params)
  );
