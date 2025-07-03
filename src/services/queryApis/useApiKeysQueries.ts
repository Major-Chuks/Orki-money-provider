// Generated file - DO NOT EDIT
// This file contains React Query hooks for apiKeys API

import { apiKeysApi } from "../apis/apiKeys";

import { useApiQuery, useApiMutation } from ".";



export const useApiKeysQuery = (params: { type: "live" | "test" }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_apiKeys", JSON.stringify(params)], () =>
    apiKeysApi.get_apiKeys(params)
  );

export const useCreateApiKeyMutation = () =>
  useApiMutation(apiKeysApi.post_createApiKey);

export const useApiKeyMutation = () =>
  useApiMutation(apiKeysApi.delete_apiKey);
