"use client";

import {
  Table,
  Search,
  Plus,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Shield,
  DollarSign,
  Minus,
  Edit,
  Trash2,
  Eye,
  Users,
  Briefcase,
  Settings,
  Filter,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  DoorOpen,
} from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TalentRow } from "./TalentHubPageClient";
import Link from "next/link";

type TalentStatus = "onboarding" | "active" | "paused" | "offboarded";

interface TalentIndexProps {
  talents: TalentRow[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  initialFilters: {
    status: string;
    location: string;
    verified: boolean;
    hourlyRate: number;
    search: string;
  };
  availableLocations: string[];
  availableStatuses: string[];
}

/**
 * Returns a Tailwind CSS class string for a status badge based on the given talent status.
 *
 * @param status - The talent's current status
 * @returns Tailwind class string for background, text color, and border
 */
const getStatusBadgeStyle = (status: TalentStatus) => {
  const styles = {
    onboarding: "bg-blue-100 text-blue-700 border border-blue-200",
    active: "bg-green-100 text-green-700 border border-green-200",
    paused: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    offboarded: "bg-gray-100 text-gray-700 border border-gray-200",
  };
  return styles[status] || styles.active;
};

/**
 * Converts a talent status enum value to a human-readable display label.
 *
 * @param status - The talent's current status
 * @returns Capitalised display label for the given status
 */
const getStatusLabel = (status: TalentStatus) => {
  const labels = {
    onboarding: "Onboarding",
    active: "Active",
    paused: "Paused",
    offboarded: "Offboarded",
  };
  return labels[status] || status;
};

/**
 * Renders a single row in the talent index table.
 *
 * Displays the talent's name (with optional verified badge), status badge,
 * primary role, location, hourly rate, and a set of action buttons
 * (view, edit, remove). The view button links to the talent's profile page.
 *
 * @param props.talent - The talent record to display
 */
function TalentTableRow({ talent }: { talent: TalentRow }) {
  return (
    <div className="w-full h-auto py-3 px-4 flex flex-row gap-4 items-center hover:bg-gray-50 transition border-x border-slate-300 cursor-pointer">
      {/* Name Column */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-gray-900">
            {talent.display_name}
          </div>
          {talent.is_verified && (
            <span title="Verified">
              <Shield size={14} className="text-blue-600" />
            </span>
          )}
        </div>
        <div
          className={`inline-flex items-center w-fit text-xs font-semibold px-2 py-0.5 rounded ${getStatusBadgeStyle(
            talent.status as TalentStatus,
          )}`}
        >
          {getStatusLabel(talent.status as TalentStatus)}
        </div>
      </div>

      {/* Role Column */}
      <div className="flex-1">
        <div className="text-sm text-gray-700">{talent.primary_role}</div>
      </div>

      {/* Location Column */}
      <div className="flex-1">
        <div className="text-sm text-gray-700">
          {talent.location || "Not specified"}
        </div>
      </div>

      {/* Hourly Rate Column */}
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900">
          ${talent.hourly_rate?.toFixed(2) || "N/A"}{" "}
          <span className="text-xs text-gray-600 font-normal">/hr</span>
        </div>
      </div>

      {/* Actions Column */}
      <div className="flex-1 flex items-center gap-2">
        <Link
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
          title="View"
          href={`/polaris/dash/talents/${talent.id}`}
        >
          <Eye size={16} />
        </Link>
        <button
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
          title="Remove"
        >
          <DoorOpen size={16} />
        </button>
      </div>
    </div>
  );
}

/**
 * Client Component for the filterable, paginated talent index table.
 *
 * Receives server-computed pagination data and filter options as props, then
 * manages URL search param updates on user interaction so the parent RSC
 * re-renders with fresh filtered data on every change. No direct data fetching
 * occurs here — all data flows down from {@link TalentHubPage}.
 *
 * Features:
 * - URL-driven filtering (status, location, verified, hourly rate, search)
 * - Client-side pagination controls with direct-page-jump input
 * - Full-text search across talent name, role, and location
 * - Status badges with colour-coded visual indicators
 * - Collapsible advanced filter panel
 *
 * @param props.talents            - Current page's talent records
 * @param props.total              - Total count of all matching talents (unsliced)
 * @param props.totalPages         - Total pages for the current filter set
 * @param props.currentPage        - Active 1-indexed page
 * @param props.pageSize           - Records per page
 * @param props.initialFilters     - Server-resolved filter state used to seed local UI state
 * @param props.availableLocations - Unique location strings for the location dropdown
 * @param props.availableStatuses  - Unique status strings for the status dropdown
 * @returns Rendered talent table with header, filters, rows, and pagination
 */
export function TalentIndex({
  talents,
  total,
  totalPages,
  currentPage,
  pageSize,
  initialFilters,
  availableLocations,
  availableStatuses,
}: TalentIndexProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // UI state only - doesn't affect data fetching
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<"table">("table");

  // Local filter state for UI, updates URL on change
  const [statusFilter, setStatusFilter] = useState(initialFilters.status);
  const [locationFilter, setLocationFilter] = useState(initialFilters.location);
  const [verifiedFilter, setVerifiedFilter] = useState(initialFilters.verified);
  const [hourlyRateRange, setHourlyRateRange] = useState(200);
  const [searchInput, setSearchInput] = useState(initialFilters.search);

  // Update URL params when any filter changes
  const updateFilters = (
    updates: Record<string, string | number | boolean>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset to page 1 when filters change
    params.set("page", "1");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === false) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateFilters({ status: value });
  };

  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
    updateFilters({ location: value });
  };

  const handleVerifiedChange = (checked: boolean) => {
    setVerifiedFilter(checked);
    updateFilters({ verified: checked });
  };

  const handleHourlyRateChange = (value: number) => {
    setHourlyRateRange(value);
    updateFilters({ hourlyRate: value });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    updateFilters({ search: value });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setLocationFilter("all");
    setVerifiedFilter(false);
    setHourlyRateRange(10);
    setSearchInput("");

    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <label className="w-full text-xs font-semibold text-gray-700 uppercase flex items-center gap-1 pt-4">
        Talents Index
      </label>
      {/* Table View Switching */}
      <div className="w-full h-auto flex flex-row gap-2 text-gray-600 ">
        <button
          onClick={() => setActiveView("table")}
          className={`w-24 my-2 py-1 flex flex-row gap-1 justify-center align-middle items-center text-sm text-center font-semibold border-b-2 transition hover:cursor-pointer hover:text-[#2F3FA0] hover:border-b-2 hover:border-[#2F3FA0] ${
            activeView === "table"
              ? "text-[#2F3FA0] border-[#2F3FA0]"
              : "border-transparent"
          }`}
        >
          <Table size={16} />
          <span>TABLE</span>
        </button>
      </div>
      {/* Table Search Bar */}
      <div className="w-full h-auto flex flex-row gap-2 text-gray-400 items-center justify-between mb-2">
        <button
          type="button"
          aria-pressed={isFilterOpen}
          onClick={() => setIsFilterOpen((open) => !open)}
          className={`h-10 w-10 flex items-center justify-center rounded-lg border transition hover:cursor-pointer ${
            isFilterOpen
              ? "bg-[#2F3FA0]/10 border-[#2F3FA0] text-[#2F3FA0]"
              : "bg-white border-slate-300 text-gray-600 hover:border-gray-600"
          }`}
        >
          <Filter size={16} />
        </button>
        <div className="flex items-center gap-2 flex-1 h-10 bg-white rounded-lg px-3 hover:cursor-pointer border border-slate-300">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search talents..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 hover:cursor-pointer"
          />
        </div>

        <button className="h-10 px-4 bg-[#2F3FA0] text-white rounded-lg font-semibold text-sm flex items-center gap-2 hover:cursor-pointer hover:bg-[#4A5FBF] transition">
          <Plus size={16} />
          ONBOARD
        </button>
      </div>
      {/* Table Filters */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-out ${
          isFilterOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full h-auto py-3 flex flex-row gap-4 text-gray-700 items-center justify-between">
          {/* Location Dropdown */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <MapPin size={14} className="text-gray-500" />
              Location
            </label>
            <div className="relative flex-1">
              <select
                value={locationFilter}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full h-9 px-3 pr-8 bg-white border border-slate-300 rounded-lg text-xs text-gray-700 hover:cursor-pointer hover:border-gray-600 appearance-none transition focus:outline-none focus:border-[#2F3FA0]"
              >
                <option value="all">All Locations</option>
                {availableLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Hourly Rate Input */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <DollarSign size={14} className="text-gray-500" />
              Hourly Rate
            </label>
            <div className="flex items-center gap-1 h-9">
              <button
                onClick={() =>
                  handleHourlyRateChange(Math.max(10, hourlyRateRange - 10))
                }
                className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-gray-700 font-semibold hover:cursor-pointer hover:bg-gray-50 hover:border-gray-600 transition"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                value={hourlyRateRange}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 10 && val <= 200) handleHourlyRateChange(val);
                }}
                className="grow w-4/5 text-center px-2 py-1 bg-white border border-slate-300 rounded-lg text-gray-700 font-semibold text-sm hover:border-gray-600 focus:outline-none focus:border-[#2F3FA0] transition"
              />
              <span className="grow w-1/5 text-xs text-gray-600 font-medium">
                / hr
              </span>
              <button
                onClick={() =>
                  handleHourlyRateChange(Math.min(200, hourlyRateRange + 10))
                }
                className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-gray-700 font-semibold hover:cursor-pointer hover:bg-gray-50 hover:border-gray-600 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <CheckCircle2 size={14} className="text-gray-500" />
              Status
            </label>
            <div className="relative flex-1">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full h-9 px-3 pr-8 bg-white border border-slate-300 rounded-lg text-xs text-gray-700 hover:cursor-pointer hover:border-gray-600 appearance-none transition focus:outline-none focus:border-[#2F3FA0]"
              >
                <option value="all">All Status</option>
                {availableStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Verified Checkbox */}
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-xs font-semibold text-gray-700 uppercase flex items-center gap-1">
              <Shield size={14} className="text-gray-500" />
              Verified
            </label>
            <div className="flex items-center gap-2 h-9">
              <input
                type="checkbox"
                checked={verifiedFilter}
                onChange={(e) => handleVerifiedChange(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-[#2F3FA0] rounded border border-slate-300 hover:border-gray-600 transition"
              />
              <span className="text-xs text-gray-700">
                {verifiedFilter ? "Only Verified" : "All"}
              </span>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="flex flex-col gap-2 justify-end flex-1">
            <button
              onClick={handleResetFilters}
              className="h-9 w-full flex gap-2 font-semibold text-sm items-center justify-center rounded-lg border border-slate-300 bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-600 transition cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw size={16} />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>
      {/* Table Headers */}
      <div className="mt-2 w-full h-auto py-3 px-4 flex flex-row gap-4 bg-white border border-slate-300 text-xs rounded-t-xl font-semibold text-gray-700">
        <div className="flex-1 flex items-center gap-2">
          <Users size={14} className="text-gray-500" />
          Talent Name
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Briefcase size={14} className="text-gray-500" />
          Role
        </div>
        <div className="flex-1 flex items-center gap-2">
          <MapPin size={14} className="text-gray-500" />
          Location
        </div>
        <div className="flex-1 flex items-center gap-2">
          <DollarSign size={14} className="text-gray-500" />
          Hourly Rate
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Settings size={14} className="text-gray-500" />
          Actions
        </div>
      </div>

      {/* Table Rows */}
      <div className="w-full flex flex-col divide-y divide-slate-300 bg-white">
        {talents.length > 0 ? (
          talents.map((talent: TalentRow) => (
            <TalentTableRow key={talent.id} talent={talent} />
          ))
        ) : (
          <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500 gap-2 border-x border-slate-300">
            <Users size={32} className="text-gray-400" />
            <span className="text-sm font-medium">No talents found</span>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="w-full h-12 py-3 px-4 flex flex-row gap-4 items-center justify-between border border-slate-300 rounded-b-lg bg-white">
        {/* Left: Page Indicator */}
        <div className="text-xs text-gray-600">
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <span> • </span>
          <span>{total} total talents</span>
          <span> • </span>
          <span>{pageSize} per page</span>
        </div>

        {/* Right: Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition cursor-pointer"
            title="First page"
          >
            <ChevronFirst size={16} />
          </button>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition cursor-pointer"
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1 px-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= totalPages) {
                  handlePageChange(val);
                }
              }}
              className="w-12 text-center px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs text-gray-700 font-semibold hover:border-gray-600 focus:outline-none focus:border-[#2F3FA0] transition"
            />
            <span className="text-xs text-gray-600">of {totalPages}</span>
          </div>

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition cursor-pointer"
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition cursor-pointer"
            title="Last page"
          >
            <ChevronLast size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
