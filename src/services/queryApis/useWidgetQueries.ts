// Generated file - DO NOT EDIT
// This file contains React Query hooks for widget API

import { widgetApi } from "../apis/widget";

import { useApiMutation } from ".";



export const useSellQuoteMutation = () =>
  useApiMutation(widgetApi.post_sell_quote);

export const useBuyQuoteMutation = () =>
  useApiMutation(widgetApi.post_buy_quote);
