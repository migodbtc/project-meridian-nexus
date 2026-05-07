import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import {
  TalentHubPageClient,
  type TalentRow,
} from "./_components/TalentHubPageClient";
import { AppSuspense } from "@/components/AppSuspense";
import { TalentContractKPI } from "./_components/TalentContractKPI";

type SearchParams = Promise<{
  page?: string;
  pageSize?: string;
  status?: string;
  location?: string;
  verified?: string;
  hourlyRate?: string;
  search?: string;
}>;

const TALENT_STATUSES: TalentRow["status"][] = [
  "onboarding",
  "active",
  "paused",
  "offboarded",
];

interface ContractStatusData {
  status: string;
  count: number;
  fill: string;
}

export interface ContractKPIDataResponse {
  error: string | null;
  totalContractRevenue?: number;
  signedTalents?: number;
  finishedContractTalents?: number;
  contractStatusData?: ContractStatusData[];
}

/**
 * Server component that fetches contract and talent data from Supabase.
 * Computes KPI statistics and passes them to the client component.
 *
 * Queries:
 * - contracts table: count by status, sum payment terms for revenue
 * - talents table: count by status to determine signed/finished
 *
 * @returns TalentContractKPI client component with real data
 */
async function fetchContractKPIData(): Promise<ContractKPIDataResponse> {
  const supabase = await createClient();

  const { data: contracts, error: contractsError } = await supabase
    .from("contracts")
    .select("id, status, payment_terms, talent_id");

  if (contractsError || !contracts) {
    return {
      error: `Contract fetch fail: ${contractsError?.message}`,
    };
  }

  const { data: talents, error: talentsError } = await supabase
    .from("talents")
    .select("id, status, hourly_rate");

  if (talentsError || !talents) {
    return {
      error: `Failed to fetch talents: ${talentsError?.message}`,
    };
  }

  const statusCounts = contracts.reduce(
    (acc, contract) => {
      const status = contract.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const statusColors: Record<string, string> = {
    DRAFT: "#9ca3af",
    FINALIZED: "#3b82f6",
    unknown: "#6b7280",
  };

  const contractStatusData = Object.entries(statusCounts).map(
    ([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      fill: statusColors[status] || "#6b7280",
    }),
  );

  const totalContractRevenue = contracts
    .filter((c) => c.status === "FINALIZED")
    .reduce((sum, contract) => {
      if (
        !contract.payment_terms ||
        typeof contract.payment_terms !== "object"
      ) {
        return sum;
      }

      const paymentTerms = contract.payment_terms as Record<string, unknown>;

      const monthlyRate =
        typeof paymentTerms.monthly_rate === "number"
          ? paymentTerms.monthly_rate
          : 0;

      const fixedFee =
        typeof paymentTerms.fixed_fee === "number" ? paymentTerms.fixed_fee : 0;

      return sum + (monthlyRate || fixedFee);
    }, 0);

  const signedTalents = talents.filter((t) => t.status === "active").length;

  const finishedContractTalents = talents.filter(
    (t) => t.status === "offboarded",
  ).length;

  return {
    error: null,
    totalContractRevenue,
    signedTalents,
    finishedContractTalents,
    contractStatusData,
  };
}

// GET talents server action
// pagination included
async function getTalentsWithPagination(params: {
  page: number;
  pageSize: number;
  status: string;
  location: string;
  verified: boolean;
  hourlyRate: number;
  search: string;
}) {
  const supabase = await createClient();
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize - 1;

  let query = supabase
    .from("talents")
    .select("*", { count: "exact" })
    .range(startIndex, endIndex)
    .order("created_at", { ascending: false });

  if (params.status !== "all") {
    query = query.eq("status", params.status as TalentRow["status"]);
  }
  if (params.location !== "all") {
    query = query.eq("location", params.location);
  }
  if (params.verified) {
    query = query.eq("is_verified", true);
  }
  if (params.hourlyRate < 200) {
    query = query.lte("hourly_rate", params.hourlyRate);
  }
  if (params.search.trim()) {
    const term = params.search.trim();
    query = query.or(
      `display_name.ilike.%${term}%,primary_role.ilike.%${term}%,location.ilike.%${term}%`,
    );
  }

  const { data, count, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch talents: ${error.message}`);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));

  return {
    talents: data ?? [],
    total,
    totalPages,
    currentPage: params.page,
    pageSize: params.pageSize,
  };
}

// GET talents locations (unique)
async function getUniqueLocations(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("talents")
    .select("location")
    .not("location", "is", null)
    .order("location");

  if (!data) return [];
  const unique = [
    ...new Set(
      data.map((r) => r.location).filter((loc): loc is string => loc !== null),
    ),
  ];
  return unique.sort();
}

// POST talent (onboarding)
async function postNewTalent() {
  // basic flow: parse payload, create talent, if success, create auth + profile
  // basing off my previous work, per page navigation validation should happen
  const supabase = await createClient();

  //

  // post logic

  // validation checks here
  // 1. no duplicates esp on required fields
  // 2. data is valid
  //

  // return logic
}

// PUT talent (editing)
async function editExistingTalent() {
  // possible algorithm: dynamic updating?
}

// DELETE talent (offboarding/soft delete)
async function deleteExistingTalent() {
  // soft delete aka offboarding the guy instead of fully deleting all data
}

/**
 * Talent Hub main page (RSC entry point).
 *
 * Orchestrates server-side data fetching:
 * - Talent roster with pagination, filtering (status, location, verified, hourly rate, search)
 * - Available location & status options for filter dropdowns
 * - Contract KPI stats (revenue, signed talents, finished contracts)
 *
 * Passes all data to {@link TalentHubPageClient} for rendering.
 * URL query params drive filter state; changes trigger page re-renders with fresh data.
 *
 * @param props.searchParams - Async URL search params (page, pageSize, status, location, verified, hourlyRate, search)
 * @returns TalentHubPageClient with fetched data and KPI metrics
 */
export default async function TalentHubPage(props: {
  searchParams: SearchParams;
}) {
  const resolved = await props.searchParams;

  const page = Math.max(1, parseInt(resolved.page ?? "1"));
  const pageSize = parseInt(resolved.pageSize ?? "10");
  const status = resolved.status ?? "all";
  const location = resolved.location ?? "all";
  const verified = resolved.verified === "true";
  const hourlyRate = parseInt(resolved.hourlyRate ?? "200");
  const search = resolved.search ?? "";

  const [paginationData, availableLocations] = await Promise.all([
    getTalentsWithPagination({
      page,
      pageSize,
      status,
      location,
      verified,
      hourlyRate,
      search,
    }),
    getUniqueLocations(),
  ]);

  const contractKPIData = await fetchContractKPIData();

  return (
    <Suspense fallback={<AppSuspense />}>
      <TalentHubPageClient
        talents={paginationData.talents}
        total={paginationData.total}
        totalPages={paginationData.totalPages}
        currentPage={paginationData.currentPage}
        pageSize={paginationData.pageSize}
        status={status}
        location={location}
        verified={verified}
        hourlyRate={hourlyRate}
        search={search}
        availableLocations={availableLocations}
        availableStatuses={TALENT_STATUSES}
        contractKPIData={contractKPIData}
      />
    </Suspense>
  );
}
