"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastItem = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => showToast(message, "success", duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast(message, "error", duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast(message, "warning", duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast(message, "info", duration),
    [showToast]
  );

  const contextValue = useMemo(
    () => ({
      showToast,
      success,
      error,
      warning,
      info,
      removeToast,
    }),
    [showToast, success, error, warning, info, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Common Toast Container */}
      <div
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => {
          const isError = toast.type === "error";
          const isSuccess = toast.type === "success";
          const isWarning = toast.type === "warning";

          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-lg border transition-all animate-in fade-in slide-in-from-top-3 duration-200 ${
                isError
                  ? "bg-white dark:bg-surface border-red-300 dark:border-red-900/60 text-red-950 dark:text-red-200 shadow-red-500/10"
                  : isSuccess
                  ? "bg-white dark:bg-surface border-sage/40 dark:border-success/40 text-ink dark:text-ice shadow-sage/10"
                  : isWarning
                  ? "bg-white dark:bg-surface border-sunshine/80 dark:border-gold/40 text-ink dark:text-ice shadow-sunshine/20"
                  : "bg-white dark:bg-surface border-ink/15 dark:border-hairline text-ink dark:text-ice shadow-ink/5"
              }`}
            >
              {/* Type Icon */}
              <div className="shrink-0 mt-0.5">
                {isError && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                {isSuccess && <CheckCircle2 className="h-5 w-5 text-sage dark:text-success" />}
                {isWarning && <AlertTriangle className="h-5 w-5 text-star dark:text-gold" />}
                {toast.type === "info" && <Info className="h-5 w-5 text-muted dark:text-slate-muted" />}
              </div>

              {/* Message Content */}
              <div className="flex-1 text-xs font-ui font-semibold leading-relaxed">
                {toast.message}
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice transition-colors p-0.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
                aria-label="Dismiss toast notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
