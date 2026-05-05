import { createClient } from "@/utils/supabase/server";
import { TalentContractKPI } from "./TalentContractKPI";

interface ContractStatusData {
  status: string;
  count: number;
  fill: string;
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
export async function TalentContractKPIServer() {
  const supabase = await createClient();

  try {
    // Fetch contracts with their status and payment terms
    const { data: contracts, error: contractsError } = await supabase
      .from("contracts")
      .select("id, status, payment_terms, talent_id");

    if (contractsError || !contracts) {
      console.error("Failed to fetch contracts:", contractsError);
      return (
        <div className="text-sm text-red-500">Failed to load contract data</div>
      );
    }

    // Fetch talents with their status and hourly rates
    const { data: talents, error: talentsError } = await supabase
      .from("talents")
      .select("id, status, hourly_rate");

    if (talentsError || !talents) {
      console.error("Failed to fetch talents:", talentsError);
      return (
        <div className="text-sm text-red-500">Failed to load talent data</div>
      );
    }

    // Compute statistics
    const statusCounts = contracts.reduce(
      (acc, contract) => {
        const status = contract.status || "unknown";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const statusColors: Record<string, string> = {
      DRAFT: "#9ca3af", // gray
      FINALIZED: "#3b82f6", // blue
      unknown: "#6b7280", // dark gray
    };

    const contractStatusData: ContractStatusData[] = Object.entries(
      statusCounts,
    ).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      fill: statusColors[status] || "#6b7280",
    }));

    // Calculate revenue from finalized contract payment terms
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
        const monthlyRate = paymentTerms.monthly_rate as number | null;
        const fixedFee = paymentTerms.fixed_fee as number | null;
        return sum + (monthlyRate || fixedFee || 0);
      }, 0);

    // Count active talents (signed) and offboarded talents (finished)
    const signedTalents = talents.filter((t) => t.status === "active").length;
    const finishedContractTalents = talents.filter(
      (t) => t.status === "offboarded",
    ).length;

    return (
      <TalentContractKPI
        totalContractRevenue={totalContractRevenue}
        signedTalents={signedTalents}
        finishedContractTalents={finishedContractTalents}
        contractStatusData={contractStatusData}
      />
    );
  } catch (error) {
    console.error("Error fetching contract KPI data:", error);
    return (
      <div className="text-sm text-red-500">Error loading contract data</div>
    );
  }
}
