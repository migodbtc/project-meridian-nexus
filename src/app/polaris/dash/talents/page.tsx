import { TrendingUp, Table } from "lucide-react";

export default function TalentHubPage() {
  return (
    <div className="h-full bg-slate-300/50">
      <div className="grid grid-cols-4 h-48 border border-slate-200 bg-slate-50">
        <div className=" border-r border-slate-300 last:border-r-0 p-4">
          <div className="flex items-center gap-3 text-gray-600 mb-2">
            <TrendingUp size={18} className="text-gray-600" />
            <div>
              <h2 className="text-sm font-bold text-gray-600 uppercase">
                Key Metrics
              </h2>
            </div>
          </div>
          <p className="text-2xl leading-tight wrap-break-word font-bold text-black">
            Hello
          </p>
        </div>
        <div className=" border-r border-slate-300 last:border-r-0 p-4"></div>
        <div className=" border-r border-slate-300 last:border-r-0 p-4"></div>
        <div className=" p-4"></div>
      </div>

      {/* Talents Table Space */}
      <div className="min-h-120 bg-slate-50 border border-slate-200">
        <p className="text-slate-500">Talents table will be displayed here</p>
        <div className="w-full h-12 flex flex-row gap-2 px-2 py-1 text-gray-400">
          <button className="w-24 flex flex-row gap-1 justify-center align-middle items-center text-sm text-center font-semibold border-b-2 border-transparent transition hover:cursor-pointer hover:text-[#2F3FA0] hover:border-b-2 hover:border-[#2F3FA0]">
            <Table size={16} />
            <span>TABLE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
