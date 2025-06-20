// Generated file - DO NOT EDIT
// This file contains React Query hooks for apiLogs API

import { apiLogsApi } from "../apis/apiLogs";

import { useApiQuery } from ".";



export const useApiLogsQuery = () =>
  useApiQuery(["get_apiLogs"], apiLogsApi.get_apiLogs);
