"use client";

import { useToastStore } from "@/stores/toast.store";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const isError = t.type === "error";
        const isSuccess = t.type === "success";
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all animate-slide-up ${
              isError
                ? "bg-red-50 border-red-150 text-red-800"
                : isSuccess
                  ? "bg-emerald-50 border-emerald-150 text-emerald-800"
                  : "bg-zinc-50 border-zinc-150 text-zinc-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isError ? (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              ) : isSuccess ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-zinc-600 shrink-0" />
              )}
              <span className="text-xs font-semibold leading-relaxed">
                {t.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
