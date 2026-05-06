import { Suspense } from "react";
import {
  TalentHubPageClient,
  type SearchParams,
} from "./_components/TalentHubPageClient";
import { AppSuspense } from "@/components/AppSuspense";

/**
 * RSC entry point for the Talents Hub route (`/polaris/dash/talents`).
 *
 * Sync shell — intentionally does **not** await `searchParams`. The Promise
 * is forwarded to {@link TalentHubPageClient} inside `<Suspense>` so the
 * static shell prerenders without blocking client-side navigation.
 *
 * @param props.searchParams - Next.js 15+ async search params Promise
 */
export default function TalentHubPage(props: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<AppSuspense />}>
      <TalentHubPageClient searchParams={props.searchParams} />
    </Suspense>
  );
}
