/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { authApi } from "./auth";
import { apiKeysApi } from "./apiKeys";
import { transactionsApi } from "./transactions";
import { webhookApi } from "./webhook";
import { widgetApi } from "./widget";
import { apiLogsApi } from "./apiLogs";
import { store } from "@/redux/store";
import { setError } from "@/redux/slices/error";
import { setCurrentUser } from "@/redux/slices/user";
import { billingApi } from "./billing";
import { toast } from "@/context/Toast/ToastService";
import { userProfileApi } from "./userProfile";
import { teamManagementApi } from "./teamManagement";
import { onboardingApi } from "./onboarding";

export const baseURL = "https://api.money.orki.io/api";

export const BACKEND_API = axios.create({
  baseURL: baseURL + "/v1",
});

export const BACKEND_API_NO_VERSION = axios.create({
  baseURL: baseURL,
});

BACKEND_API.interceptors.request.use(async (config) => {
  const { user } = store.getState();
  const accessToken = user.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

BACKEND_API_NO_VERSION.interceptors.request.use(async (config) => {
  const { user } = store.getState();
  const accessToken = user.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const AUTH_API = axios.create({
  baseURL: baseURL + "/auth",
});

export const handleApiCall = async <T>(
  method: () => Promise<T>,
  label: string
): Promise<T | undefined> => {
  try {
    return await method();
  } catch (error) {
    handleError(error, label);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const handleError = (error: any, label?: string) => {
  const dispatch = store.dispatch;

  const errMsg =
    error?.response?.data?.msg ||
    error?.response?.data?.message ||
    error?.message;

  dispatch(
    setError({
      code: error?.status || error?.response?.status,
      message: errMsg,
      label: label || "",
    })
  );
  toast.show(errMsg, "error");

  if (error?.status === 401 || error?.response?.status === 401) {
    dispatch(setCurrentUser(null));
    // force logout
  }
};

export default function backend() {
  return {
    ...authApi,
    ...apiKeysApi,
    ...transactionsApi,
    ...webhookApi,
    ...widgetApi,
    ...apiLogsApi,
    ...billingApi,
    ...userProfileApi,
    ...teamManagementApi,
    ...onboardingApi,
  };
}
