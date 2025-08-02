// Generated file - DO NOT EDIT
// This file contains React Query hooks for apiLogs API

import { apiLogsApi } from "../apis/apiLogs";

import { useApiQuery } from ".";



export const useApiLogsQuery = (params: { params: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_apiLogs", JSON.stringify(params)], () =>
    apiLogsApi.get_apiLogs(params)
  );
