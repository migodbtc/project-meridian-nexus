"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { LogOut, PanelLeft, PanelLeftClose, User, Menu } from "lucide-react";
import SidebarNavigation from "@/components/SidebarNavigation";
import { useSidebar } from "@/components/SidebarContext";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail?: string;
}) {
  const router = useRouter();
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPending, setLogoutPending] = useState(false);
  const [logoutFailed, setLogoutFailed] = useState(false);

  const handleProfileClick = () => {
    setMenuOpen(false);
    router.push("/polaris/dash/settings");
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    setLogoutPending(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        setLogoutFailed(true);
        setTimeout(() => setLogoutFailed(false), 2500);
        return;
      }

      router.push("/polaris/auth/login?logout=success");
    } catch {
      setLogoutFailed(true);
      setTimeout(() => setLogoutFailed(false), 2500);
    } finally {
      setLogoutPending(false);
    }
  };

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
          {logoutFailed ? (
            <div className="fixed right-4 top-4 z-60 rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 shadow-lg">
              Logout failed for now.
            </div>
          ) : null}

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
              <div className="flex flex-col items-end gap-1">
                <div className="flex flex-row gap-2">
                  <User size={20} className="text-slate-500" />
                  <span className="text-sm text-slate-700">
                    {userEmail || "user@example.com"}
                  </span>
                </div>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center justify-center hover:cursor-pointer"
                  aria-label="User menu"
                >
                  <Menu size={20} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 first:rounded-t-lg"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutPending}
                      className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 flex items-center gap-2 last:rounded-b-lg border-t border-slate-200"
                    >
                      <LogOut size={16} />
                      {logoutPending ? "Logging Out..." : "Log Out"}
                    </button>
                  </div>
                )}
              </div>
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
