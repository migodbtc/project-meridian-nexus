import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { TalentProfilePageClient } from "./_components/TalentProfilePageClient";
import { Tables } from "../../../../../../supabase/types/supabase";

type Talent = Tables<"talents">;

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

  return <TalentProfilePageClient talent={talent} />;
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
 *
 * @todo Replace getTalentById mock lookup with a Supabase server action.
 */
export default function TalentProfilePage(
  props: PageProps<"/polaris/dash/talents/[id]">,
) {
  return (
    <Suspense fallback={null}>
      <TalentProfileContent params={props.params} />
    </Suspense>
  );
}
