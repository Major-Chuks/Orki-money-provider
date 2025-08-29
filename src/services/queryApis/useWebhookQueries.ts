// Generated file - DO NOT EDIT
// This file contains React Query hooks for webhook API

import { webhookApi } from "../apis/webhook";

import { useApiQuery, useApiMutation } from ".";



export const useSubscribeToWebhookMutation = () =>
  useApiMutation(webhookApi.patch_subscribeToWebhook);

export const useWebhookLogsQuery = (params: { params: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_webhookLogs", JSON.stringify(params)], () =>
    webhookApi.get_webhookLogs(params)
  );

export const useWebhooksQuery = () =>
  useApiQuery(["get_webhooks"], webhookApi.get_webhooks);

export const useRetryWebhookMutation = () =>
  useApiMutation(webhookApi.post_retryWebhook);

export const useWebhookSecretMutation = () =>
  useApiMutation(webhookApi.patch_webhookSecret);

export const useWebhookSecretQuery = () =>
  useApiQuery(["get_webhookSecret"], webhookApi.get_webhookSecret);
