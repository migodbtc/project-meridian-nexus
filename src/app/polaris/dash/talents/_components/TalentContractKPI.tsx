"use client";

import { FileText, Users, CheckCircle2, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface ContractStatusData {
  status: string;
  count: number;
  fill: string;
}

interface ContractKPIProps {
  totalContractRevenue: number;
  signedTalents: number;
  finishedContractTalents: number;
  contractStatusData: ContractStatusData[];
}

/**
 * Client component displaying contract KPI metrics with status breakdown.
 * Left side: vertical bar chart showing contract status distribution
 * Right side: three stat rows (revenue prominent, signed talents, finished contracts)
 *
 * Receives pre-computed stats from server component.
 * Mirrors the layout pattern of TalentKPIOnboardOffboard component.
 *
 * @param props - Pre-computed contract statistics from server
 * @returns Rendered contract KPI card with chart and statistics
 */
function TalentContractKPIClient({
  totalContractRevenue,
  signedTalents,
  finishedContractTalents,
  contractStatusData,
}: ContractKPIProps) {
  return (
    <div>
      {/* KPI Card Label */}
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        <FileText size={14} className="text-gray-500" />
        Talent Contracts
      </label>

      {/* Contract KPI Card - Chart + Stats */}
      <div className="col-span-2 border border-slate-300 bg-white rounded-lg px-2 py-4 flex h-64">
        {/* Left Section: Contract Status Bar Chart */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={contractStatusData}
              margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {contractStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Color Indicators */}
          <div className="flex flex-row gap-1 flex-wrap justify-center">
            {contractStatusData.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></div>
                <span className="text-xs text-gray-600">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Statistics */}
        <div className="flex-1 flex flex-col justify-center gap-2 pl-6 border-l border-slate-300">
          {/* Total Contract Revenue - Prominently displayed */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <DollarSign size={14} />
              Contract Revenue (Monthly)
            </label>
            <div className="text-3xl font-bold text-green-600">
              ${totalContractRevenue.toLocaleString()}
            </div>
          </div>

          {/* Total Signed Talents */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <Users size={14} />
              Signed Talents
            </label>
            <div className="text-2xl font-bold text-blue-600">
              {signedTalents}
            </div>
          </div>

          {/* Finished Contract Talents */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <CheckCircle2 size={14} />
              Finished Contracts
            </label>
            <div className="text-2xl font-bold text-green-600">
              {finishedContractTalents}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TalentContractKPIClient as TalentContractKPI };
