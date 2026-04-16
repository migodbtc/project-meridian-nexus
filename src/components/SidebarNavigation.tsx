"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings } from "lucide-react";
import { useSidebar } from "@/components/SidebarContext";

const navItems = [
  { href: "/polaris/dash/overview", label: "Dashboard", icon: LayoutDashboard },
];

const bottomNavItems = [
  { href: "/polaris/dash/settings", label: "Settings", icon: Settings },
];

export default function SidebarNavigation() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <aside
      className={[
        "absolute inset-y-0 left-0 z-30 h-screen max-h-screen border-r border-slate-200 bg-white shadow-xl transition-all duration-300 ease-out overflow-x-hidden md:relative md:shadow-none",
        isOpen
          ? "w-72 translate-x-0 md:w-72"
          : "w-72 -translate-x-full md:w-0 md:translate-x-0",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      <div className="flex h-full w-72 shrink-0 flex-col overflow-hidden">
        <div className="min-h-20 border-b border-slate-200 px-6 pb-3 pt-5">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600">
            The unified TaaS web engine
          </p>
          <h1 className="text-xl font-bold leading-tight text-shadow-black">
            <span className="bg-linear-to-r from-[#3B4FBF] to-amber-400 bg-clip-text text-transparent">
              POLARIS
            </span>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname?.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-[#3B4FBF]/10 text-[#2F3FA0]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-200 px-3 py-3">
          <ul className="space-y-1">
            {bottomNavItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname?.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-[#3B4FBF]/10 text-[#2F3FA0]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    ].join(" ")}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
