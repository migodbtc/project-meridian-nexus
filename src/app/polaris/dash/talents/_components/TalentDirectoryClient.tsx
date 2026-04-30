"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpAZ,
  ArrowUpWideNarrow,
  ChevronLeft,
  ChevronRight,
  Search,
  UserPlus,
} from "lucide-react";

type Talent = {
  id: string;
  name: string;
  role: string;
  location: string;
  status: "Available" | "Engaged" | "Paused";
  rate: string;
  activeContracts: number;
  nextRenewal: string;
  primarySkill: string;
  lastEngaged: string;
};

type SortKey =
  | "name"
  | "role"
  | "location"
  | "status"
  | "rate"
  | "activeContracts"
  | "nextRenewal"
  | "lastEngaged";

type SortDirection = "asc" | "desc";

type TalentDirectoryClientProps = {
  talents: Talent[];
};

const PAGE_SIZE = 10;

export default function TalentDirectoryClient({
  talents,
}: TalentDirectoryClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const filteredTalents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return talents;
    }
    return talents.filter((talent) => {
      const haystack = [
        talent.name,
        talent.role,
        talent.location,
        talent.status,
        talent.primarySkill,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, talents]);

  const sortedTalents = useMemo(() => {
    const copy = [...filteredTalents];
    copy.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      const aText = String(aValue).toLowerCase();
      const bText = String(bValue).toLowerCase();
      if (aText < bText) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aText > bText) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    return copy;
  }, [filteredTalents, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedTalents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentRows = sortedTalents.slice(startIndex, startIndex + PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  };

  const toggleMultiSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isAllVisibleSelected =
    currentRows.length > 0 &&
    currentRows.every((row) => selectedIds.has(row.id));

  const toggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllVisibleSelected) {
        currentRows.forEach((row) => next.delete(row.id));
      } else {
        currentRows.forEach((row) => next.add(row.id));
      }
      return next;
    });
  };

  const sortIcon = (key: SortKey) => {
    if (key !== sortKey) {
      return <ArrowDownWideNarrow className="h-4 w-4 text-slate-300" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUpAZ className="h-4 w-4 text-slate-500" />;
    }
    return <ArrowDownAZ className="h-4 w-4 text-slate-500" />;
  };

  const paginationLabel = `${startIndex + 1}-${Math.min(
    startIndex + PAGE_SIZE,
    sortedTalents.length,
  )} of ${sortedTalents.length}`;

  return (
    <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <label className="flex w-full max-w-xl items-center gap-3 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name, role, skill, or location"
              className="w-full bg-transparent text-slate-700 placeholder:text-slate-500 focus:outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <UserPlus className="h-4 w-4" />
          Onboard talent
        </button>
      </div>

      <div className="mt-6 overflow-hidden">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 border-b-1 border-slate-300">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all on page"
                  checked={isAllVisibleSelected}
                  onChange={toggleSelectAllVisible}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900"
                />
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-2"
                >
                  Name
                  {sortIcon("name")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("role")}
                  className="flex items-center gap-2"
                >
                  Role
                  {sortIcon("role")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("location")}
                  className="flex items-center gap-2"
                >
                  Location
                  {sortIcon("location")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("status")}
                  className="flex items-center gap-2"
                >
                  Status
                  {sortIcon("status")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("activeContracts")}
                  className="flex items-center gap-2"
                >
                  Contracts
                  {sortIcon("activeContracts")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("nextRenewal")}
                  className="flex items-center gap-2"
                >
                  Renewal
                  {sortIcon("nextRenewal")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("rate")}
                  className="flex items-center gap-2"
                >
                  Rate
                  {sortIcon("rate")}
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleSort("lastEngaged")}
                  className="flex items-center gap-2"
                >
                  Last engaged
                  {sortIcon("lastEngaged")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {currentRows.map((talent) => {
              const isSelected = selectedIds.has(talent.id);
              return (
                <tr
                  key={talent.id}
                  className={`transition ${
                    isSelected ? "bg-slate-50" : "hover:bg-slate-50/60"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${talent.name}`}
                      checked={isSelected}
                      onChange={() => toggleMultiSelection(talent.id)}
                      className="h-4 w-4 rounded border-slate-300 text-slate-900"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">
                      {talent.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {talent.primarySkill}
                    </div>
                  </td>
                  <td className="px-4 py-3">{talent.role}</td>
                  <td className="px-4 py-3">{talent.location}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
                      {talent.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">
                      {talent.activeContracts}
                    </div>
                    <div className="text-xs text-slate-500">Active</div>
                  </td>
                  <td className="px-4 py-3">{talent.nextRenewal}</td>
                  <td className="px-4 py-3">{talent.rate}</td>
                  <td className="px-4 py-3">{talent.lastEngaged}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>{paginationLabel}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <span className="text-xs text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
