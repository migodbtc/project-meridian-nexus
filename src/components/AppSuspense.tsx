"use client";

import { Loader2 } from "lucide-react";

interface AppSuspenseProps {
  message?: string;
  icon?: React.ReactNode;
  fullHeight?: boolean;
}

/**
 * AppSuspense component for displaying loading/suspense states.
 * Used primarily in route transitions and data fetching scenarios.
 *
 * @param message - Custom loading message (defaults to "Loading...")
 * @param icon - Custom lucide-react icon (defaults to Loader2)
 * @param fullHeight - If true, uses min-h-screen; otherwise min-h-32
 */
export function AppSuspense({
  message = "Loading...",
  icon,
  fullHeight = false,
}: AppSuspenseProps) {
  return (
    <div
      className={`w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-3 rounded-lg ${
        fullHeight ? "min-h-screen" : "min-h-32"
      }`}
    >
      <div className="animate-spin text-slate-500">
        {icon ?? <Loader2 size={32} />}
      </div>
      <span className="text-sm font-medium text-slate-600">{message}</span>
    </div>
  );
}
