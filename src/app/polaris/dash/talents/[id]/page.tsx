import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { TalentProfilePageClient } from "./_components/TalentProfilePageClient";
import { Tables } from "@/supabase/types/supabase";
import { AppSuspense } from "@/components/AppSuspense";

type Talent = Tables<"talents">;
type Profile = Tables<"profiles">;

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

/**
 * Looks up a single talent record by its ID from Supabase.
 *
 * @param id - The talent's unique identifier string
 * @returns The matching talent record, or `null` if not found or RLS denies access
 */
async function getTalentById(id: string): Promise<Talent | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("talents")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    console.error("Failed to fetch talent:", error);
    return null;
  }

  return data ?? null;
}
// Fetches talent profile via id
async function getTalentProfile(id: string): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("talents")
    .select("profile_id, profiles(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error in retrieving talent profile: ", error);
    return null;
  }

  const profile = data?.profiles ?? null;

  return profile;
}

/**
 * Fetches client statistics for a specific talent.
 * Includes: active clients count, active contracts count, average rating, and contract status breakdown.
 *
 * @param talentId - The talent's unique identifier
 * @returns Client statistics data for display in the Client Statistics card
 */
async function getClientStatistics(
  talentId: string,
): Promise<ClientStatisticsData> {
  const supabase = await createClient();

  // Fetch distinct active clients (from finalized/active contracts)
  const { data: clientsData, error: clientsError } = await supabase
    .from("contracts")
    .select("client_id")
    .eq("talent_id", talentId)
    .in("status", ["FINALIZED", "APPROVED"])
    .neq("client_id", null);

  if (clientsError) {
    console.warn(
      "Failed to fetch active clients:",
      clientsError.message || clientsError,
    );
  }

  const activeClients = new Set(
    (clientsData ?? [])
      .map((c) => c.client_id)
      .filter((id): id is string => id !== null && id !== undefined),
  ).size;

  // Fetch active contracts count
  const { data: contractsData, error: contractsCountError } = await supabase
    .from("contracts")
    .select("id, status")
    .eq("talent_id", talentId);

  if (contractsCountError) {
    console.warn(
      "Failed to fetch contracts:",
      contractsCountError.message || contractsCountError,
    );
  }

  const activeContractsCount =
    (contractsData ?? []).filter(
      (c) => c.status === "FINALIZED" || c.status === "APPROVED",
    ).length ?? 0;

  // Contract status breakdown for chart
  const statusMap = new Map<string, number>();
  const statusColors: Record<string, string> = {
    DRAFT: "#94a3b8",
    FINALIZED: "#10b981",
    APPROVED: "#3b82f6",
    CANCELED: "#ef4444",
  };

  (contractsData ?? []).forEach((contract) => {
    const status = contract.status || "DRAFT";
    statusMap.set(status, (statusMap.get(status) ?? 0) + 1);
  });

  const contractStatusData: ContractStatusData[] = Array.from(statusMap).map(
    ([status, count]) => ({
      status,
      count,
      fill: statusColors[status] || "#6b7280",
    }),
  );

  // Average rating (mock for now - would come from reviews/ratings table)
  const averageRating = 4.8;

  return {
    activeClients,
    activeContracts: activeContractsCount,
    averageRating,
    contractStatusData,
  };
}

/**
 * Inner async component that reads `params` and resolves the talent record.
 *
 * Must live inside a `<Suspense>` boundary (provided by {@link TalentProfilePage})
 * so that awaiting the `params` Promise does not block client-side navigation
 * at shared layout boundaries.
 *
 * @param props.params - Next.js 15+ async dynamic route params Promise (`{ id }` segment)
 * @returns TalentProfilePageClient with the resolved talent, or a not-found response
 */
async function TalentProfileContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const talent = await getTalentById(id);

  if (!talent) {
    notFound();
  }

  const profile = await getTalentProfile(id);

  if (!profile) {
    notFound();
  }

  const clientStats = await getClientStatistics(id);

  return (
    <TalentProfilePageClient
      talent={talent}
      talentProfile={profile}
      clientStats={clientStats}
    />
  );
}

/**
 * RSC entry point for the individual Talent Profile route
 * (`/polaris/dash/talents/[id]`).
 *
 * Intentionally does **not** await `params` at the top level. Instead,
 * the Promise is forwarded to {@link TalentProfileContent} which sits inside a
 * `<Suspense>` boundary. This ensures the static shell can prerender and that
 * client-side navigations are not blocked at shared layout boundaries.
 *
 * @param props.params - Next.js 15+ async dynamic route params Promise
 * @returns Suspense-wrapped TalentProfileContent
 */
export default function TalentProfilePage(
  props: PageProps<"/polaris/dash/talents/[id]">,
) {
  return (
    <Suspense fallback={<AppSuspense />}>
      <TalentProfileContent params={props.params} />
    </Suspense>
  );
}
