"use client";

import { DollarSign, AlertCircle } from "lucide-react";

export function FinanceStatisticsCard() {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        <DollarSign size={14} className="text-gray-500" />
        FINANCE STATISTICS
      </label>
      <div className="flex-1 border border-slate-300 bg-white rounded-lg p-4 flex flex-col items-center justify-center gap-2">
        <AlertCircle size={32} className="text-slate-300" />
        <span className="text-xs font-semibold uppercase text-slate-400 tracking-wide text-center">
          Work in Progress
        </span>
        <span className="text-xs text-slate-300 text-center">Coming Soon</span>
      </div>
    </div>
  );
}
