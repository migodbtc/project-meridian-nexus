"use client";

import { Tables } from "@/supabase/types/supabase";
import { ArrowLeft, User, BarChart2, DollarSign, BookOpen } from "lucide-react";
import Link from "next/link";

type Talent = Tables<"talents">;

interface TalentProfilePageClientProps {
  talent: Talent;
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
}: TalentProfilePageClientProps) {
  return (
    <div className="min-h-full bg-slate-100 px-4 pt-4 space-y-3">
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
        {/* Card 1 — spans both rows */}
        <div className="row-span-2 flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
            <User size={14} className="text-gray-500" />
            PERSONAL INFORMATION
          </label>
          <div className="flex-1 border border-slate-300 bg-white rounded-lg px-2 py-4 flex items-center justify-center text-gray-400 text-sm">
            —
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
            <BarChart2 size={14} className="text-gray-500" />
            CLIENT STATISTICS
          </label>
          <div className="h-48 border border-slate-300 bg-white rounded-lg px-2 py-4 flex items-center justify-center text-gray-400 text-sm">
            —
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
            <DollarSign size={14} className="text-gray-500" />
            FINANCE STATISTICS
          </label>
          <div className="h-48 border border-slate-300 bg-white rounded-lg px-2 py-4 flex items-center justify-center text-gray-400 text-sm">
            —
          </div>
        </div>
      </div>

      {/* Notebook Tab */}
      <div className="w-full flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
          <BookOpen size={14} className="text-gray-500" />
          ADDITIONAL INFORMATION
        </label>
        WASSSAAAHHHH
      </div>
    </div>
  );
}
