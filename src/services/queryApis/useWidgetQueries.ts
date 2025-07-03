// Generated file - DO NOT EDIT
// This file contains React Query hooks for widget API

import { widgetApi } from "../apis/widget";

import { useApiQuery, useApiMutation } from ".";



export const useSellQuoteMutation = () =>
  useApiMutation(widgetApi.post_sell_quote);

export const useBuyQuoteMutation = () =>
  useApiMutation(widgetApi.post_buy_quote);

export const useGenerateSignatureTokenQuery = () =>
  useApiQuery(["get_generateSignatureToken"], widgetApi.get_generateSignatureToken);
