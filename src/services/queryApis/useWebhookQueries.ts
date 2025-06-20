// Generated file - DO NOT EDIT
// This file contains React Query hooks for webhook API

import { webhookApi } from "../apis/webhook";

import { useApiQuery, useApiMutation } from ".";



export const useSubscribeToWebhookMutation = () =>
  useApiMutation(webhookApi.patch_subscribeToWebhook);

export const useWebhookLogsQuery = () =>
  useApiQuery(["get_webhookLogs"], webhookApi.get_webhookLogs);

export const useWebhooksQuery = () =>
  useApiQuery(["get_webhooks"], webhookApi.get_webhooks);

export const useRetryWebhookMutation = () =>
  useApiMutation(webhookApi.post_retryWebhook);
