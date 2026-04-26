"use client";

import { MessageSquare, List, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navButtons = [
  {
    href: "/polaris/dash/settings/feedback/create",
    icon: Plus,
    label: "Write",
  },
  {
    href: "/polaris/dash/settings/feedback/index",
    icon: List,
    label: "Overview",
  },
];

/**
 * Header component with title, description, and navigation tabs.
 * Highlights active route based on current pathname.
 * Keeps feedback actions visible during section navigation.
 */
export default function FeedbackHeader() {
  const pathname = usePathname();

  // TSX Structure
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 flex flex-row gap-2 items-center">
          <MessageSquare size={24} className="text-[#3B4FBF]" />
          Feedback
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          We value your input. Submit your feedback, bug reports, or feature
          requests below.
        </p>
      </div>

      <div className="flex flex-row items-center gap-2">
        {navButtons.map((btn) => {
          const isActive = pathname === btn.href;

          return (
            <Link
              key={btn.href}
              href={btn.href}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? "border-[#3B4FBF]/20 bg-indigo-50 text-[#3B4FBF] pointer-events-none"
                  : "border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
              }`}
              aria-disabled={isActive}
            >
              <btn.icon size={14} />
              {btn.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
