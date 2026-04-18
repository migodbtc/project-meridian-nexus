"use client";

import Link from "next/link";
import { Settings, User, Bell, LifeBuoy, Lock, LogOut } from "lucide-react";
import { useState } from "react";

type SettingsTab = "account" | "preferences" | "support";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full  p-4 lg:flex-1 lg:self-start">
          <div className="mb-5 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Settings size={18} className="text-[#3B4FBF]" />
            <h1 className="text-base font-semibold text-slate-800">Settings</h1>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className={[
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition hover:cursor-pointer",
                activeTab === "account"
                  ? "border-[#3B4FBF]/30 bg-[#3B4FBF]/10 text-[#2F3FA0]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <User size={16} />
              Account
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preferences")}
              className={[
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition hover:cursor-pointer",
                activeTab === "preferences"
                  ? "border-[#3B4FBF]/30 bg-[#3B4FBF]/10 text-[#2F3FA0]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <Bell size={16} />
              Preferences
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("support")}
              className={[
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition hover:cursor-pointer",
                activeTab === "support"
                  ? "border-[#3B4FBF]/30 bg-[#3B4FBF]/10 text-[#2F3FA0]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <LifeBuoy size={16} />
              Support
            </button>
          </nav>
        </aside>

        <section className="w-full border-l border-slate-200 p-5 lg:flex-3 lg:p-6">
          {activeTab === "account" ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 flex flex-row gap-2">
                  <User size={24} className="text-[#3B4FBF]" />
                  Account
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Modify your account & profile details here, and view other
                  important personal information in relation to the application.
                </p>
              </div>

              <div className="">
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                  Credentials
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block text-sm text-slate-700">
                    Email Address <span className="text-rose-600">*</span>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Role <span className="text-rose-600">*</span>
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                        Guest
                      </span>
                    </div>
                  </label>

                  <label className="block text-sm text-slate-700 md:col-span-2">
                    User ID <span className="text-rose-600">*</span>
                    <span className="mt-1 block rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs text-slate-700">
                      00000000-0000-0000-0000-000000000000
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block text-sm text-slate-700">
                    First Name
                    <input
                      type="text"
                      placeholder="Your first name here..."
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Middle Name
                    <input
                      type="text"
                      placeholder="Your middle name here..."
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Last Name
                    <input
                      type="text"
                      placeholder="Your last name here..."
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Username
                    <input
                      type="text"
                      placeholder="Your username here..."
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Phone
                    <input
                      type="tel"
                      placeholder="Your phone number here..."
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700">
                    Birthday
                    <input
                      type="date"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>

                  <label className="block text-sm text-slate-700 md:col-span-2">
                    Bio
                    <textarea
                      rows={3}
                      placeholder="Your short bio here..."
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-[#3B4FBF] px-4 py-2 text-sm font-semibold text-white transition hover:cursor-pointer hover:opacity-95"
                >
                  Save Changes
                </button>

                <Link
                  href="/polaris/auth/change-password"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:cursor-pointer hover:bg-slate-50"
                >
                  <Lock size={15} />
                  Change Password
                </Link>

                <Link
                  href="/polaris/auth/forgot-password"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:cursor-pointer hover:bg-slate-50"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
          ) : null}

          {activeTab === "preferences" ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Preferences
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Personalize your workspace experience.
                </p>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                This section is a placeholder for upcoming user preference
                controls.
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-700">Theme</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Light mode is currently active.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-700">
                    Notifications
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Fine-grained controls will be added soon.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "support" ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Support
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Help, references, and project context.
                </p>
              </div>

              <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
                This section is currently informational and will later include
                live support workflows.
              </div>

              <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-800">
                  Project North Star
                </p>
                <p className="mt-2">
                  A product case study built around Meridian Nexus Group Ltd, a
                  managed Talent-as-a-Service agency, addressing disconnected
                  tools that create financial drift and operational blindness.
                </p>
                <p className="mt-2">
                  Polaris is implemented with Next.js, Supabase, Vercel,
                  Tailwind CSS, Lucide React, and Framer Motion.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                <p>
                  For support concerns, contact
                  <span className="font-semibold"> contact@communeye.dev</span>.
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
