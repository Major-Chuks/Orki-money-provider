import { ToastContextType } from "./ToastContext";

// toastService.ts
let externalShowToast: ToastContextType["showToast"] | null = null;

export const setToastApi = (api: ToastContextType) => {
  externalShowToast = api.showToast;
};

export const toast = {
  show: (message: string, type?: "success" | "error" | "info") => {
    if (!externalShowToast) {
      console.warn("Toast not initialized");
      return;
    }
    externalShowToast(message, type);
  },
};
