"use client";

import type { ReactNode } from "react";
import { PanelLeft, PanelLeftClose, User } from "lucide-react";
import SidebarNavigation from "@/components/SidebarNavigation";
import { useSidebar } from "@/components/SidebarContext";

export default function AppLayout({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail?: string;
}) {
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {isOpen ? (
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close sidebar backdrop"
          className="fixed inset-0 z-20 bg-slate-950/30 md:hidden"
        />
      ) : null}

      <div className="relative z-30 flex min-h-screen">
        <SidebarNavigation />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleSidebar}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                className="inline-flex h-10 w-10 items-center justify-center transition text-slate-500 hover:cursor-pointer"
              >
                {isOpen ? (
                  <PanelLeftClose size={24} />
                ) : (
                  <PanelLeft size={24} />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <User size={18} className="text-slate-500" />
              <span className="text-sm text-slate-700">
                {userEmail || "user@example.com"}
              </span>
            </div>
          </header>

          <main className="p-4 md:p-6 overflow-y-auto h-[calc(100vh-5rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
