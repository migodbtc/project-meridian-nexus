"use client";

import { ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/polaris/dash/settings/account");
  }, [router]);

  return (
    <div className="flex h-fill w-full flex-col items-left justify-left gap-3">
      <div className="text-sm font-medium text-slate-500">
        Redirecting to account settings...
      </div>
    </div>
  );
}
