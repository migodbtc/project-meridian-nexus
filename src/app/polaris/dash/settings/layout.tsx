"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  LifeBuoy,
  CreditCard,
  LucideIcon,
  Megaphone,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "account",
    label: "Account",
    href: "/polaris/dash/settings/account",
    icon: User,
  },
  {
    id: "support",
    label: "Support",
    href: "/polaris/dash/settings/support",
    icon: LifeBuoy,
  },
  {
    id: "feedback",
    label: "Feedback",
    href: "/polaris/dash/settings/feedback",
    icon: Megaphone,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full p-4 lg:flex-1 lg:self-start">
          <div className="mb-5 flex items-center gap-2">
            <Settings size={18} className="text-[#3B4FBF]" />
            <h1 className="text-base font-semibold text-slate-800">Settings</h1>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.includes(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={[
                    "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition",
                    isActive
                      ? "border-[#3B4FBF]/30 bg-[#3B4FBF]/10 text-[#2F3FA0]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="w-full h-full border-l border-slate-200 p-5 lg:flex-3 lg:p-6">
          {children}
        </section>
      </div>
    </div>
  );
}
