"use client";

import { TalentIndex } from "./TalentIndex";
import { TalentKPIOnboardOffboard } from "./TalentKPIOnboardOffboard";
import type { Tables } from "../../../../../../supabase/types/supabase";
import { ContractKPIDataResponse } from "../page";
import { TalentContractKPI } from "./TalentContractKPI";

export type TalentRow = Tables<"talents">;

interface TalentHubPageClientProps {
  talents: TalentRow[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  status: string;
  location: string;
  verified: boolean;
  hourlyRate: number;
  search: string;
  availableLocations: string[];
  availableStatuses: TalentRow["status"][];
  contractKPIData: ContractKPIDataResponse;
}

/**
 * Client component that renders the Talent Hub dashboard.
 *
 * Composed of three sections:
 * - Top: KPI cards (onboarding/offboarding stats, contract metrics)
 * - Bottom: TalentIndex table with filtering, pagination, and search
 *
 * Receives all server-fetched data as props; no data fetching here.
 * Delegates user interactions (filter/page changes) to TalentIndex,
 * which updates URL search params to trigger parent RSC re-renders.
 *
 * @param props - Pre-fetched talent roster, pagination state, KPI metrics, and filter options
 * @returns Dashboard layout with KPI cards and talent index table
 */
export function TalentHubPageClient({
  talents,
  total,
  totalPages,
  currentPage,
  pageSize,
  status,
  location,
  verified,
  hourlyRate,
  search,
  availableLocations,
  availableStatuses,
  contractKPIData,
}: TalentHubPageClientProps) {
  return (
    <div className="h-full bg-slate-300/50">
      <div className="grid grid-cols-2 gap-4 bg-slate-100 px-4 pt-4">
        <TalentKPIOnboardOffboard />
        <TalentContractKPI contractKPIData={contractKPIData} />
      </div>

      <div className="min-h-120 bg-slate-100 px-4 pb-12">
        <TalentIndex
          talents={talents}
          total={total}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          initialFilters={{ status, location, verified, hourlyRate, search }}
          availableLocations={availableLocations}
          availableStatuses={availableStatuses}
        />
      </div>
    </div>
  );
}
