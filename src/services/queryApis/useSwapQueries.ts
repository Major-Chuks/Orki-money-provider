// Generated file - DO NOT EDIT
// This file contains React Query hooks for swap API

import { swapApi } from "../apis/swap";

import { useApiQuery, useApiMutation } from ".";



export const useSwapPairsQuery = () =>
  useApiQuery(["get_swapPairs"], swapApi.get_swapPairs);

export const useSwapQuery = (params: { id: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_swap", JSON.stringify(params)], () =>
    swapApi.get_swap(params)
  );

export const useSwapQuoteQuery = (params: { pairId: string; amount: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_swapQuote", JSON.stringify(params)], () =>
    swapApi.get_swapQuote(params)
  );

export const useInitiateSwapMutation = () =>
  useApiMutation(swapApi.post_initiateSwap);

export const useUpdateSwapMutation = () =>
  useApiMutation(swapApi.patch_updateSwap);
