"use client";

import { BarChart2, AlertCircle, Users, Briefcase, Star } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface ContractStatusData {
  status: string;
  count: number;
  fill: string;
}

interface ClientStatisticsData {
  activeClients: number;
  activeContracts: number;
  averageRating: number;
  contractStatusData: ContractStatusData[];
}

interface ClientStatisticsCardProps {
  clientStats?: ClientStatisticsData;
}

export function ClientStatisticsCard({
  clientStats,
}: ClientStatisticsCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        <BarChart2 size={14} className="text-gray-500" />
        CLIENT STATISTICS
      </label>
      <div className="flex-1 border border-slate-300 bg-white rounded-lg p-4 flex flex-row gap-4">
        {/* Left Section: Charts */}
        <div className="flex-1 flex flex-col gap-2 items-center justify-start">
          {/* Chart Title */}
          <span className="w-full text-center text-xs font-semibold uppercase text-slate-600 tracking-wide self-start">
            Contracts Statuses
          </span>

          {/* Chart Data or Empty State */}
          {clientStats?.contractStatusData &&
          clientStats.contractStatusData.length > 0 ? (
            <>
              {/* Contract Status Pie Chart */}
              <div className="w-full h-32">
                <ResponsiveContainer width="100%" height={128}>
                  <PieChart>
                    <Pie
                      data={clientStats.contractStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {clientStats.contractStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend */}
              <div className="w-full flex flex-col gap-1.5 text-xs">
                {clientStats.contractStatusData.map((status, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: status.fill }}
                    />
                    <span className="text-slate-600 font-medium">
                      {status.status}: {status.count}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-32 flex flex-col items-center justify-center gap-2 text-center">
              <AlertCircle size={28} className="text-slate-300" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
                  No Contracts
                </span>
                <span className="text-xs text-slate-300">
                  No contract data available
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Statistics */}
        <div className="flex-1 flex flex-col justify-center gap-1 pl-4 border-l border-slate-200">
          {/* Active Clients */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 flex items-center justify-center rounded-md">
                <Users size={18} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                Active Clients
              </span>
            </div>
            {clientStats?.activeClients && clientStats.activeClients > 0 ? (
              <span className="text-2xl font-bold text-blue-600 ml-0.5">
                {clientStats.activeClients}
              </span>
            ) : (
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="text-2xl text-slate-400">...</span>
              </div>
            )}
          </div>

          {/* Active Contracts */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 flex items-center justify-center rounded-md">
                <Briefcase size={18} className="text-slate-600" />
              </div>
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                Active Contracts
              </span>
            </div>
            {clientStats?.activeContracts && clientStats.activeContracts > 0 ? (
              <span className="text-2xl font-bold text-slate-900 ml-0.5">
                {clientStats.activeContracts}
              </span>
            ) : (
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="text-2xl text-slate-400">...</span>
              </div>
            )}
          </div>

          {/* Satisfaction Rating */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 flex items-center justify-center rounded-md">
                <Star size={18} className="text-amber-600 fill-amber-600" />
              </div>
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                Avg. Rating
              </span>
            </div>
            {clientStats?.averageRating ? (
              <span className="text-2xl font-bold text-amber-600 ml-0.5">
                {clientStats.averageRating}
              </span>
            ) : (
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="text-2xl text-slate-400">...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
