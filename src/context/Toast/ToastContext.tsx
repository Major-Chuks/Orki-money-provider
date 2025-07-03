"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import classes from "./Toast.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/app/CloseIcon";
import { formatText } from "@/services/utils";
import { setToastApi } from "./ToastService";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

export type ToastContextType = {
  showToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  const showToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    setToastApi({ showToast });
    setHasMounted(true);
  }, []);

  // 🔥 Render toast container via portal to ensure it's above modals
  const toastUI = (
    <div className={classes.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={classes.toast}>
          <div className={`${classes.bar} ${classes[toast.type || "info"]}`}>
            <div
              className={`${classes.thumb} ${classes[toast.type || "info"]}`}
            />
          </div>
          <div className={classes.content}>
            <div className={classes.header}>{formatText(toast.type || "")}</div>
            <div className={classes.message}>{toast.message}</div>
          </div>
          <ButtonWrapper
            onClick={() => handleClose(toast.id)}
            className={classes.iconContainer}
          >
            <CloseIcon />
          </ButtonWrapper>
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {typeof window !== "undefined" &&
        hasMounted &&
        createPortal(toastUI, document.body)}
    </ToastContext.Provider>
  );
};
