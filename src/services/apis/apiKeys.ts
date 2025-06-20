import { BACKEND_API, handleApiCall } from ".";

export const apiKeysApi = {
  // API KEYS
  get_apiKeys: async ({ type }: { type: "live" | "test" }) => {
    const url = `/api-keys?type=${type}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_apiKeys");
  },

  post_createApiKey: async (payload: { type: "live" | "test" }) => {
    const url = "/api-keys/create";
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_createApiKey"
    );
  },

  delete_apiKey: async ({ apiKeyId }: { apiKeyId: string }) => {
    const url = `/api-keys/${apiKeyId}/revoke`;
    return handleApiCall(() => BACKEND_API.delete(url), "delete_apiKey");
  },
};
