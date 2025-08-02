// Generated file - DO NOT EDIT
// This file contains React Query hooks for utility API

import { utilityApi } from "../apis/utility";

import { useApiQuery } from ".";



export const useFetchFiatCurrenciesQuery = () =>
  useApiQuery(["get_fetchFiatCurrencies"], utilityApi.get_fetchFiatCurrencies);
