"use client";

import { Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PulsePoint = {
  label: string;
  demand: number;
  supply: number;
};

type SystemPulseClientProps = {
  series: PulsePoint[];
  summary: string[];
};

export default function SystemPulseClient({
  series,
  summary,
}: SystemPulseClientProps) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-6 transition ">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Activity className="h-5 w-5 text-slate-600" />
          System pulse
        </h3>
      </div>

      <div className="mt-6 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={series}
            margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B4FBF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B4FBF" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              axisLine={false}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: "#CBD5F5" }}
              contentStyle={{
                borderRadius: "12px",
                borderColor: "#E2E8F0",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
              }}
              labelStyle={{ color: "#64748B" }}
            />
            <Area
              type="monotone"
              dataKey="supply"
              stroke="#94A3B8"
              strokeWidth={2}
              fill="url(#supplyFill)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="#3B4FBF"
              strokeWidth={2}
              fill="url(#demandFill)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-500">
        {summary.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
