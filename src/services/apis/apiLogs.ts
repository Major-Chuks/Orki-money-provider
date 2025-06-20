import { BACKEND_API, handleApiCall } from ".";

export const apiLogsApi = {
  // API LOGS
  get_apiLogs: async () => {
    const url = "/api-logs";
    return handleApiCall(() => BACKEND_API.get(url), "get_apiLogs");
  },
};
