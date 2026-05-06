"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Badge, BookOpen } from "lucide-react";
import { Tables } from "@/supabase/types/supabase";
import { PersonalInformationCard } from "./PersonalInformationCard";
import { ClientStatisticsCard } from "./ClientStatisticsCard";
import { FinanceStatisticsCard } from "./FinanceStatisticsCard";

type Talent = Tables<"talents">;
type Profile = Tables<"profiles">;

interface TalentProfilePageClientProps {
  talent: Talent;
  talentProfile: Profile;
  clientStats?: {
    activeClients: number;
    activeContracts: number;
    averageRating: number;
    contractStatusData: Array<{
      status: string;
      count: number;
      fill: string;
    }>;
  };
}

interface TalentProfileTabContentProps {
  talent: Talent;
}

/**
 * Get status badge styling based on talent status
 */
function getStatusBadgeStyle(status: string | null) {
  const statusMap: Record<string, { bg: string; text: string }> = {
    onboarding: { bg: "bg-blue-100", text: "text-blue-800" },
    active: { bg: "bg-green-100", text: "text-green-800" },
    paused: { bg: "bg-yellow-100", text: "text-yellow-800" },
    offboarded: { bg: "bg-gray-100", text: "text-gray-800" },
  };
  return (
    statusMap[status || ""] || { bg: "bg-gray-100", text: "text-gray-800" }
  );
}

function TalentProfileTabContent({ talent }: TalentProfileTabContentProps) {
  return (
    <div className="flex-1 min-h-64 border border-slate-300 bg-white rounded-lg p-4 text-slate-400">
      <div className="grid grid-cols-4 gap-x-8 gap-y-5 text-sm">
        {/* Verified */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Verified
          </span>
          <span className="text-slate-900 font-medium text-sm">
            {talent.is_verified ? "Yes" : "No"}
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Status
          </span>
          {talent.status ? (
            <span
              className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                getStatusBadgeStyle(talent.status).bg
              } ${getStatusBadgeStyle(talent.status).text}`}
            >
              <Badge size={12} className="mr-1.5" />
              {talent.status}
            </span>
          ) : (
            <span className="text-gray-400">N/A</span>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Location
          </span>
          <span
            className={
              talent.location
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.location || "N/A"}
          </span>
        </div>

        {/* Timezone */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Timezone
          </span>
          <span
            className={
              talent.timezone
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.timezone || "N/A"}
          </span>
        </div>

        {/* Primary Role */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Primary Role
          </span>
          <span
            className={
              talent.primary_role
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.primary_role || "N/A"}
          </span>
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Years of Experience
          </span>
          <span
            className={
              talent.years_experience
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.years_experience ?? "N/A"}
          </span>
        </div>

        {/* Rate */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Rate
          </span>
          <span
            className={
              talent.hourly_rate
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.hourly_rate
              ? `${talent.currency || "USD"} ${talent.hourly_rate}/hr`
              : "N/A"}
          </span>
        </div>

        {/* Availability */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Availability
          </span>
          <span
            className={
              talent.availability
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.availability || "N/A"}
          </span>
        </div>

        {/* Onboarded On */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Onboarded On
          </span>
          <span
            className={
              talent.onboarded_at
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.onboarded_at
              ? new Date(talent.onboarded_at).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        {/* Offboarded On */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
            Offboarded On
          </span>
          <span
            className={
              talent.offboarded_at
                ? "text-slate-900 font-medium text-sm"
                : "text-gray-400"
            }
          >
            {talent.offboarded_at
              ? new Date(talent.offboarded_at).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

function TalentContractTabContent() {
  return (
    <div className="flex-1 min-h-64 border border-slate-300 bg-white rounded-lg p-4 text-slate-400">
      Talent contract tab content
    </div>
  );
}

function TalentFinancialsTabContent() {
  return (
    <div className="flex-1 min-h-64 border border-slate-300 bg-white rounded-lg p-4 text-slate-400">
      Talent financial tab content
    </div>
  );
}

function TalentPerformanceTabContent() {
  return (
    <div className="flex-1 min-h-64 border border-slate-300 bg-white rounded-lg p-4 text-slate-400">
      Talent performance tab content
    </div>
  );
}

/**
 * Client Component shell for the individual Talent Profile page
 * (`/polaris/dash/talents/[id]`).
 *
 * Receives a fully-resolved talent record from the parent RSC
 * ({@link TalentProfilePage}) — no async data fetching happens here.
 * Owns all interactive UI for the profile view: header details, tabbed
 * sections (bio, skills, history), inline edits, modals, etc.
 *
 * @param props.talent - The resolved talent record to display
 */
export function TalentProfilePageClient({
  talent,
  talentProfile,
  clientStats,
}: TalentProfilePageClientProps) {
  const [activeView, setActiveView] = useState<string>("profile");

  return (
    <div className="min-h-full bg-slate-100 px-4 pt-4 space-y-3 pb-12">
      {/* Navigation (Back to Talent) */}
      <div className="w-full flex flex-row justify-between mb-2">
        <span className="text-sm text-slate-500 uppercase flex items-left gap-2">
          <Link
            href={"/polaris/dash/talents"}
            className="flex flex-row gap-2 border-b border-transparent hover:border-slate-500"
          >
            <ArrowLeft size={18} /> Talents
          </Link>
          <span>/</span>
          <span className="font-semibold">
            {talent.display_name ? talent.display_name : talent.id}
          </span>
        </span>
      </div>
      {/* Main Card Cluster */}
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-3">
        {/* Card 1 — spans both rows (Primary) */}
        <PersonalInformationCard talent={talent} profile={talentProfile} />

        {/* Card 2 - Client Statistics */}
        <ClientStatisticsCard clientStats={clientStats} />

        {/* Card 3 - Finance Statistics (WIP) */}
        <FinanceStatisticsCard />
      </div>

      {/* Notebook Tab */}
      <div className="w-full flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
          <BookOpen size={14} className="text-gray-500" />
          ADDITIONAL INFORMATION
        </label>
        {/* Tab Navigation */}
        <div className="w-full h-auto flex flex-row gap-2 text-gray-600 uppercase">
          {["profile", "contracts", "financials", "performance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`min-w-24 my-2 px-2 py-1 uppercase flex flex-row gap-1 justify-center items-center text-sm text-center font-semibold border-b-2 transition hover:cursor-pointer hover:text-[#2F3FA0] hover:border-[#2F3FA0] ${
                activeView === tab
                  ? "text-[#2F3FA0] border-[#2F3FA0]"
                  : "border-transparent text-slate-300"
              }`}
            >
              <span>{tab}</span>
            </button>
          ))}
        </div>
        {/* Notebook Tab Cards */}
        {activeView === "profile" && (
          <TalentProfileTabContent talent={talent} />
        )}
        {activeView === "contracts" && <TalentContractTabContent />}
        {activeView === "financials" && <TalentFinancialsTabContent />}
        {activeView === "performance" && <TalentPerformanceTabContent />}
      </div>
    </div>
  );
}
