"use client";

import { useMemo } from "react";
import type { ComponentType } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Handshake,
  Minus,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TodayMetric = {
  label: string;
  value: string;
  direction: "up" | "down" | "flat";
  icon: "user-check" | "file-text" | "handshake" | "shield-alert";
};

type TodayAnalyticsClientProps = {
  metrics: TodayMetric[];
  throughput: number[];
};

export default function TodayAnalyticsClient({
  metrics,
  throughput,
}: TodayAnalyticsClientProps) {
  const maxValue = useMemo(() => {
    return throughput.reduce((max, value) => Math.max(max, value), 1);
  }, [throughput]);

  const iconMap: Record<
    TodayMetric["icon"],
    ComponentType<{ className?: string }>
  > = {
    "user-check": UserCheck,
    "file-text": FileText,
    handshake: Handshake,
    "shield-alert": ShieldAlert,
  };

  const throughputData = useMemo(() => {
    return throughput.map((value, index) => ({
      hour: `H${index + 1}`,
      value,
    }));
  }, [throughput]);

  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Activity className="h-5 w-5 text-slate-600" />
            Progress Today
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => {
          const MetricIcon = iconMap[metric.icon];
          const trendColor =
            metric.direction === "up"
              ? "text-emerald-600"
              : metric.direction === "down"
                ? "text-rose-500"
                : "text-slate-500";
          const TrendIcon =
            metric.direction === "up"
              ? ArrowUpRight
              : metric.direction === "down"
                ? ArrowDownRight
                : Minus;
          return (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-300 bg-slate-50/70 p-4 transition hover:border-[#3B4FBF]/40 hover:bg-[#3B4FBF]/5"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {metric.label}
                </div>
                <div className="text-slate-500">
                  <MetricIcon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="text-2xl font-semibold text-slate-900">
                  {metric.value}
                </div>
                <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Throughput today</span>
          <span>Last 8 hours</span>
        </div>
        <div className="mt-3 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={throughputData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="hour" hide />
              <YAxis domain={[0, maxValue + 5]} hide />
              <Tooltip
                cursor={{ stroke: "#CBD5F5" }}
                contentStyle={{
                  borderRadius: "12px",
                  borderColor: "#E2E8F0",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
                labelStyle={{ color: "#64748B" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B4FBF"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
