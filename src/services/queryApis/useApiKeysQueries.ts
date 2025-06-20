// Generated file - DO NOT EDIT
// This file contains React Query hooks for apiKeys API

import { apiKeysApi } from "../apis/apiKeys";

import { useApiQuery, useApiMutation } from ".";



export const useApiKeysQuery = (params: { type: "live" | "test" }) =>
  useApiQuery(["get_apiKeys"], () =>
    apiKeysApi.get_apiKeys(params)
  );

export const useCreateApiKeyMutation = () =>
  useApiMutation(apiKeysApi.post_createApiKey);

export const useApiKeyMutation = () =>
  useApiMutation(apiKeysApi.delete_apiKey);
