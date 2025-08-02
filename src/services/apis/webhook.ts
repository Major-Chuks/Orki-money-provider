import { BACKEND_API, handleApiCall } from ".";

export const webhookApi = {
  // WEBHOOK
  patch_subscribeToWebhook: async (payload: {
    url: string;
    events: string[];
  }) => {
    const url = "/webhooks/subscribe";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_subscribeToWebhook"
    );
  },

  get_webhookLogs: async ({ params }: { params: string }) => {
    const url = `/webhooks/logs${params}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_webhookLogs");
  },

  get_webhooks: async () => {
    const url = "/webhooks";
    return handleApiCall(() => BACKEND_API.get(url), "get_webhooks");
  },

  post_retryWebhook: async ({ webhookId }: { webhookId: string }) => {
    const url = `/webhooks/${webhookId}/retry`;
    return handleApiCall(() => BACKEND_API.post(url), "post_retryWebhook");
  },
};
