import { AppSuspense } from "@/components/AppSuspense";
import { Suspense } from "react";
import { OnboardingPageClient } from "./_components/PageClient";

export default async function TalentOnboardingPage() {
  return (
    <Suspense fallback={<AppSuspense />}>
      <OnboardingPageClient />
    </Suspense>
  );
}
