import { createClient } from "@/utils/supabase/server";
import type { Tables } from "../../../../../../supabase/types/supabase";
import { TalentIndex } from "./TalentIndex";
import { TalentKPIOnboardOffboard } from "./TalentKPIOnboardOffboard";
import { TalentContractKPIServer } from "./TalentContractKPIServer";

/** Exported so child components can reference the real DB row type. */
export type TalentRow = Tables<"talents">;

export type SearchParams = Promise<{
  page?: string;
  pageSize?: string;
  status?: string;
  location?: string;
  verified?: string;
  hourlyRate?: string;
  search?: string;
}>;

/**
 * Queries the `talents` table with server-side filtering and cursor-based
 * pagination using the Supabase server client.
 *
 * Filters are translated to PostgREST query modifiers:
 * - status / location / verified  → equality filters
 * - hourlyRate                    → `.lte` upper-bound (skipped when at max 200)
 * - search                        → case-insensitive `ilike` across name/role/location
 *
 * The `count: "exact"` option returns the total matching rows alongside the
 * paged slice, so the client can render accurate pagination controls.
 */
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
  // Skip the hourly-rate filter when the slider is at its maximum
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

/**
 * Fetches all distinct non-null location strings from the talents table.
 * Used to populate the Location filter dropdown.
 */
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

/** Static list derived from the `talent_status` DB enum. */
const TALENT_STATUSES: TalentRow["status"][] = [
  "onboarding",
  "active",
  "paused",
  "offboarded",
];

/**
 * Async RSC for the Talents Hub page content.
 *
 * Sits inside the `<Suspense>` boundary provided by the parent page export,
 * so awaiting `searchParams` here does not block client-side navigation at
 * shared layout boundaries.
 *
 * Resolves search params, fires two parallel Supabase queries (paginated
 * talent rows + unique location list), then renders KPI cards and the
 * talent index table.
 *
 * @param props.searchParams - Next.js 15+ async search params Promise
 */
export async function TalentHubPageClient({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolved = await searchParams;

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

  return (
    <div className="h-full bg-slate-300/50">
      {/* Key Process Indicators */}
      <div className="grid grid-cols-2 gap-4 bg-slate-100 px-4 pt-4">
        <TalentKPIOnboardOffboard />
        <TalentContractKPIServer />
      </div>

      {/* Talents Table */}
      <div className="min-h-120 bg-slate-100 px-4 pb-12">
        <TalentIndex
          talents={paginationData.talents}
          total={paginationData.total}
          totalPages={paginationData.totalPages}
          currentPage={paginationData.currentPage}
          pageSize={paginationData.pageSize}
          initialFilters={{ status, location, verified, hourlyRate, search }}
          availableLocations={availableLocations}
          availableStatuses={[...TALENT_STATUSES]}
        />
      </div>
    </div>
  );
}
