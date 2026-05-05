"use client";

import { TrendingUp, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { mockTalents } from "@/mock/talents";

/**
 * Computes onboarding and offboarding KPI metrics against the current calendar month.
 * Counts are derived from the mock talent roster and are not real-time.
 *
 * @returns Object containing:
 *   - `totalActive`          — count of talents currently in `"active"` status
 *   - `onboardedThisMonth`   — talents whose `onboarded_at` falls in the current month/year
 *   - `offboardedThisMonth`  — talents whose `offboarded_at` falls in the current month/year
 *
 * @todo Replace with a Supabase aggregation query once the DB layer is ready.
 */
const getKPIStats = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalActive = mockTalents.filter(
    (talent) => talent.status === "active",
  ).length;

  const onboardedThisMonth = mockTalents.filter((talent) => {
    if (!talent.onboarded_at) return false;
    const onboardDate = new Date(talent.onboarded_at);
    return (
      onboardDate.getMonth() === currentMonth &&
      onboardDate.getFullYear() === currentYear
    );
  }).length;

  const offboardedThisMonth = mockTalents.filter((talent) => {
    if (!talent.offboarded_at) return false;
    const offboardDate = new Date(talent.offboarded_at);
    return (
      offboardDate.getMonth() === currentMonth &&
      offboardDate.getFullYear() === currentYear
    );
  }).length;

  return {
    totalActive,
    onboardedThisMonth,
    offboardedThisMonth,
  };
};

/**
 * Client component displaying onboarding and offboarding KPI metrics.
 * Shows a donut chart with onboarded/offboarded stats and three stat cards:
 * - Total Active talents
 * - Onboarded This Month
 * - Offboarded This Month
 *
 * Uses mock data. Will be replaced with Supabase real-time data fetching.
 *
 * @returns Rendered KPI card with chart and statistics
 */
export function TalentKPIOnboardOffboard() {
  const stats = getKPIStats();
  const chartData = [
    { name: "Onboarded", value: stats.onboardedThisMonth, fill: "#3b82f6" },
    { name: "Offboarded", value: stats.offboardedThisMonth, fill: "#ef4444" },
  ];

  return (
    <div>
      {/* KPI Card Label */}
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        Onboarding vs Offboarded
      </label>

      {/* Talent Count KPI Card - Chart + Stats */}
      <div className="col-span-2 border border-slate-300 bg-white rounded-lg px-2 py-4 flex h-64">
        {/* Left Section: Donut Chart */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Color Indicators */}
          <div className="flex flex-row gap-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Onboarded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Offboarded</span>
            </div>
          </div>
        </div>

        {/* Right Section: Statistics */}
        <div className="flex-1 flex flex-col justify-center gap-2 pl-6 border-l border-slate-300">
          {/* Total Active Talents */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <Users size={14} className="" />
              Total Active
            </label>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalActive}
            </div>
          </div>

          {/* Onboarded This Month */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <TrendingUp size={14} className="" />
              Onboarded This Month
            </label>
            <div className="text-2xl font-bold text-blue-600">
              {stats.onboardedThisMonth}
            </div>
          </div>

          {/* Offboarded This Month */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <TrendingUp size={14} className="rotate-180" />
              Offboarded This Month
            </label>
            <div className="text-2xl font-bold text-red-600">
              {stats.offboardedThisMonth}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
