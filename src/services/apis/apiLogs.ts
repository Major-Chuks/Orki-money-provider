import { BACKEND_API, handleApiCall } from ".";

export const apiLogsApi = {
  // API LOGS
  get_apiLogs: async ({ params }: { params: string }) => {
    const url = `/api-logs${params}`;
    return handleApiCall(() => BACKEND_API.get(url), "get_apiLogs");
  },
};
