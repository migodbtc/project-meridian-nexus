"use client";

import { CheckCircle2, TriangleAlert } from "lucide-react";
import { createElement, useEffect } from "react";
import { toast } from "sonner";

export type AppToastType = "success" | "error";

export type AppToastPayload = {
  type: AppToastType;
  title: string;
  description?: string;
  duration?: number;
};

const FLASH_TOAST_STORAGE_KEY = "polaris:flash-toast";

function getToastTheme(type: AppToastType) {
  if (type === "success") {
    return {
      wrapper: "border-emerald-200 bg-emerald-50",
      iconShell: "text-emerald-700",
      title: "text-emerald-900",
      description: "text-emerald-800",
    };
  }

  return {
    wrapper: "border-rose-200 bg-rose-50",
    iconShell: "text-rose-700",
    title: "text-rose-900",
    description: "text-rose-800",
  };
}

function ToastIcon({ type }: { type: AppToastType }) {
  if (type === "success") {
    return createElement(CheckCircle2, { size: 16 });
  }

  return createElement(TriangleAlert, { size: 16 });
}

export function showAppToast(payload: AppToastPayload) {
  const theme = getToastTheme(payload.type);

  toast.custom(
    () =>
      createElement(
        "div",
        {
          className: `w-[320px] rounded-xl border p-3 shadow-xl ${theme.wrapper}`,
        },
        createElement(
          "div",
          { className: "flex items-center gap-2" },
          createElement(
            "span",
            {
              className: `flex h-8 items-center justify-center ${theme.iconShell}`,
            },
            createElement(ToastIcon, { type: payload.type }),
          ),
          createElement(
            "p",
            { className: `text-sm font-semibold ${theme.title}` },
            payload.title,
          ),
        ),
        payload.description
          ? createElement(
              "p",
              {
                className: `text-xs leading-relaxed mb-1 ${theme.description}`,
              },
              payload.description,
            )
          : null,
      ),
    {
      duration: payload.duration ?? 4500,
    },
  );
}

export function showSuccessToast(title: string, description?: string) {
  showAppToast({ type: "success", title, description });
}

export function showErrorToast(title: string, description?: string) {
  showAppToast({ type: "error", title, description });
}

export function queueFlashToast(payload: AppToastPayload) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    FLASH_TOAST_STORAGE_KEY,
    JSON.stringify(payload),
  );
}

function popFlashToast(): AppToastPayload | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(FLASH_TOAST_STORAGE_KEY);
  if (!raw) return null;

  window.sessionStorage.removeItem(FLASH_TOAST_STORAGE_KEY);

  try {
    return JSON.parse(raw) as AppToastPayload;
  } catch {
    return null;
  }
}

export function useFlashToast() {
  useEffect(() => {
    const payload = popFlashToast();
    if (!payload) return;
    showAppToast(payload);
  }, []);
}
