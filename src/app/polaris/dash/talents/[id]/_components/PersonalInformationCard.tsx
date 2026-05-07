"use client";

import {
  User,
  UserCircle2,
  BookOpen,
  Badge,
  SquarePen,
  Trash,
  DoorOpen,
} from "lucide-react";
import { Tables } from "@/supabase/types/supabase";

type Talent = Tables<"talents">;
type Profile = Tables<"profiles">;

interface PersonalInformationCardProps {
  talent: Talent;
  profile: Profile;
}

/**
 * Displays talent's personal information card.
 *
 * Renders:
 * - Avatar + talent role badge
 * - Full name (from profile + talent record)
 * - Headline & biography
 * - Additional metadata (skills, certifications, etc.)
 *
 * @param props.talent - Talent record containing headline, display name, bio, verification status
 * @param props.profile - Profile record containing first name, middle name, last name, suffix
 * @returns Personal information card component
 */
export function PersonalInformationCard({
  talent,
  profile,
}: PersonalInformationCardProps) {
  return (
    <div className="row-span-2 flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
        <User size={14} className="text-gray-500" />
        PERSONAL INFORMATION
      </label>
      <div className="flex-1 flex-col border border-slate-300 bg-white rounded-lg p-6 flex items-start justify-left text-gray-400 space-y-6">
        <div className="w-full flex flex-row gap-6">
          <div className="flex flex-col text-center justify-center items-center shrink-0">
            <UserCircle2 size={64} className="text-slate-400" />
            <span className="text-xs px-2.5 py-1 rounded-xl bg-slate-700 text-white uppercase font-semibold mt-2">
              Talent
            </span>
          </div>
          <div className="flex-1 space-y-0.5">
            <span className="w-full text-xs text-slate-400 uppercase font-semibold tracking-wide flex items-center gap-1.5">
              {talent.headline || "N/A"}
            </span>
            <h1 className="text-3xl text-slate-900 font-bold transition-colors flex items-center gap-2.5 leading-tight">
              <span>
                {`${profile.first_name} ${profile.middle_name ? `${profile.middle_name?.substring(0, 1)}.` : ""} ${profile.last_name} ${profile.suffix ? profile.suffix : ""}` ||
                  talent.display_name ||
                  profile.id}
              </span>
            </h1>
            <p className="w-full text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
              <BookOpen size={16} className="mt-0.5 shrink-0 text-slate-500" />
              <span>{talent.bio || "No biography added"}</span>
            </p>
          </div>
          <div className="w-8 flex flex-col space-y-2 text-center">
            <button
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
              title="Edit talent"
            >
              <SquarePen size={16} />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
              title="Offboard talent"
            >
              <DoorOpen size={16} />
            </button>
          </div>
        </div>
        <div className="w-full border-t border-slate-200 pt-6">
          <div className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {profile.first_name && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    First Name
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.first_name}
                  </span>
                </div>
              )}
              {profile.middle_name && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Middle Name
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.middle_name}
                  </span>
                </div>
              )}
              {profile.last_name && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Last Name
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.last_name}
                  </span>
                </div>
              )}
              {profile.suffix && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Suffix
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.suffix}
                  </span>
                </div>
              )}
              {profile.address_line1 && (
                <div className="flex flex-col col-span-2">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Address Line 1
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.address_line1}
                  </span>
                </div>
              )}
              {profile.address_line2 && (
                <div className="flex flex-col col-span-2">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Address Line 2
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.address_line2}
                  </span>
                </div>
              )}
              {profile.birthday && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Birthday
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.birthday}
                  </span>
                </div>
              )}
              {profile.phone && (
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Phone
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.phone}
                  </span>
                </div>
              )}
              {profile.bio && (
                <div className="flex flex-col col-span-2">
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
                    Bio
                  </span>
                  <span className="text-slate-900 font-medium text-sm">
                    {profile.bio}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
