"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import classes from "./Toast.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/app/CloseIcon";
import { formatText } from "@/services/utils";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

type ToastContextType = {
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

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={classes.toastContainer}>
        {toasts.map((toast) => (
          <div key={toast.id} className={classes.toast}>
            <div className={`${classes.bar} ${classes[toast.type || "info"]}`}>
              <div
                className={`${classes.thumb}  ${classes[toast.type || "info"]}`}
              ></div>
            </div>
            <div className={classes.content}>
              <div className={classes.header}>
                {""} {formatText(toast.type as string)}
              </div>
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
    </ToastContext.Provider>
  );
};
