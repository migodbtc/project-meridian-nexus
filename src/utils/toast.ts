"use client";

import { CheckCircle2, TriangleAlert } from "lucide-react";
import { createElement, useEffect } from "react";
import { toast } from "sonner";

/**
 * The primitive toast types supported by the application.
 * - `success` renders green accents
 * - `error` renders red accents
 */
export type AppToastType = "success" | "error";

/**
 * The payload used to render a toast.
 * - `title` is the bold one-line summary shown next to the icon.
 * - `description` is optional and shown on a separate line to provide context.
 * - `duration` overrides the default display time (in milliseconds).
 */
export type AppToastPayload = {
  type: AppToastType;
  title: string;
  description?: string;
  duration?: number;
};

/**
 * Session-storage key for client-queued flash toasts.
 * These are queued client-side before a programmatic redirect (used in some flows).
 */
const FLASH_TOAST_STORAGE_KEY = "polaris:flash-toast";

/**
 * Cookie key used by server endpoints to set a one-time flash toast
 * that survives an HTTP redirect. The cookie is intentionally readable by
 * client JavaScript (not HttpOnly) so the browser can consume and clear it.
 */
export const FLASH_TOAST_COOKIE_KEY = "polaris_flash_toast";

/**
 * Returns a small set of Tailwind class names used to theme a toast
 * according to its `type`.
 */
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

/**
 * Small presentational wrapper that renders the correct icon for the
 * toast `type`.
 */
function ToastIcon({ type }: { type: AppToastType }) {
  if (type === "success") {
    return createElement(CheckCircle2, { size: 16 });
  }

  return createElement(TriangleAlert, { size: 16 });
}

/**
 * Render a fully styled application toast using Sonner's `toast.custom` API.
 * The payload controls visual styling and optional description/duration.
 */
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

/** Convenience helpers for common toast types. */
export function showSuccessToast(title: string, description?: string) {
  showAppToast({ type: "success", title, description });
}

export function showErrorToast(title: string, description?: string) {
  showAppToast({ type: "error", title, description });
}

/**
 * Queue a toast on the client using sessionStorage. This is useful when
 * an in-page script wants to redirect and still display a toast on the
 * destination page without involving server-side cookies.
 */
export function queueFlashToast(payload: AppToastPayload) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    FLASH_TOAST_STORAGE_KEY,
    JSON.stringify(payload),
  );
}

/**
 * Pop a queued toast from sessionStorage and return it. This function
 * clears the stored value so the toast is one-time.
 */
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

/**
 * Read a cookie value by name. Returns the raw cookie string or `null`.
 * This is intentionally tiny and defensive — only used for the single
 * flash-toast cookie we set from server endpoints.
 */
function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.trim().split("=");
    if (key !== name) continue;
    return rest.join("=");
  }

  return null;
}

/**
 * Pop a flash toast that was set by a server endpoint using a cookie.
 * The cookie is removed by setting an expired value so the message is
 * one-time and cannot be replayed.
 */
function popFlashToastFromCookie(): AppToastPayload | null {
  const raw = readCookieValue(FLASH_TOAST_COOKIE_KEY);
  if (!raw) return null;

  document.cookie = `${FLASH_TOAST_COOKIE_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;

  try {
    return JSON.parse(decodeURIComponent(raw)) as AppToastPayload;
  } catch {
    return null;
  }
}

/**
 * React hook to surface a queued/redirected toast on mount. The hook
 * checks for client-side queued toasts first (sessionStorage) and falls
 * back to a cookie-based flash toast that server endpoints can set.
 */
export function useFlashToast() {
  useEffect(() => {
    const payload = popFlashToast() ?? popFlashToastFromCookie();
    if (!payload) return;
    showAppToast(payload);
  }, []);
}
