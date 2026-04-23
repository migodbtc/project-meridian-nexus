"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, User, LifeBuoy } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const active = pathname.includes("/support") ? "support" : "account";

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full  p-4 lg:flex-1 lg:self-start">
          <div className="mb-5 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Settings size={18} className="text-[#3B4FBF]" />
            <h1 className="text-base font-semibold text-slate-800">Settings</h1>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              href="/polaris/dash/settings/account"
              className={[
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition",
                active === "account"
                  ? "border-[#3B4FBF]/30 bg-[#3B4FBF]/10 text-[#2F3FA0]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <User size={16} />
              Account
            </Link>

            <Link
              href="/polaris/dash/settings/support"
              className={[
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition",
                active === "support"
                  ? "border-[#3B4FBF]/30 bg-[#3B4FBF]/10 text-[#2F3FA0]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <LifeBuoy size={16} />
              Support
            </Link>
          </nav>
        </aside>

        <section className="w-full h-full border-l border-slate-200 p-5 lg:flex-3 lg:p-6">
          {children}
        </section>
      </div>
    </div>
  );
}
