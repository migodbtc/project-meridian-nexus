"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  FilePlus2,
  LayoutGrid,
  Plus,
  ShieldCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type KanbanStatus = "backlog" | "in-progress" | "review" | "approved";

export type KanbanTag =
  | "Brand"
  | "Dev"
  | "Marketing"
  | "Video"
  | "Copy"
  | "Motion"
  | "Design"
  | "Ops";

export type KanbanCard = {
  id: string;
  title: string;
  assignee: string;
  tag: KanbanTag;
  status: KanbanStatus;
  client: string;
  project: string;
  opsManagerId: string;
};

export type OpsManager = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
};

type OperationsKanbanClientProps = {
  opsManagers: OpsManager[];
  cards: KanbanCard[];
  clients: string[];
  projects: string[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMN_ORDER: KanbanStatus[] = [
  "backlog",
  "in-progress",
  "review",
  "approved",
];

const COLUMN_META: Record<
  KanbanStatus,
  { label: string; color: string; headerBg: string }
> = {
  backlog: {
    label: "Backlog",
    color: "border-slate-300",
    headerBg: "bg-slate-50",
  },
  "in-progress": {
    label: "In Progress",
    color: "border-[#3B4FBF]",
    headerBg: "bg-[#3B4FBF]/5",
  },
  review: {
    label: "Review",
    color: "border-amber-400",
    headerBg: "bg-amber-50",
  },
  approved: {
    label: "Approved",
    color: "border-emerald-400",
    headerBg: "bg-emerald-50",
  },
};

const TAG_COLORS: Record<KanbanTag, string> = {
  Brand: "bg-purple-100 text-purple-700 border-purple-200",
  Dev: "bg-blue-100 text-blue-700 border-blue-200",
  Marketing: "bg-rose-100 text-rose-700 border-rose-200",
  Video: "bg-orange-100 text-orange-700 border-orange-200",
  Copy: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Motion: "bg-pink-100 text-pink-700 border-pink-200",
  Design: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Ops: "bg-slate-100 text-slate-700 border-slate-200",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function OperationsKanbanClient({
  opsManagers,
  cards,
  clients,
  projects,
}: OperationsKanbanClientProps) {
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedProject, setSelectedProject] = useState("all");

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      const clientMatch =
        selectedClient === "all" || card.client === selectedClient;
      const projectMatch =
        selectedProject === "all" || card.project === selectedProject;
      return clientMatch && projectMatch;
    });
  }, [cards, selectedClient, selectedProject]);

  const totalCards = filtered.length;
  const activeManagerCount = useMemo(() => {
    const ids = new Set(filtered.map((c) => c.opsManagerId));
    return ids.size;
  }, [filtered]);

  return (
    <div className="mt-6">
      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Filter
          </span>

          {/* Client dropdown */}
          <div className="relative">
            <select
              id="ops-filter-client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="appearance-none cursor-pointer rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]/30"
            >
              <option value="all">All clients</option>
              {clients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Project dropdown */}
          <div className="relative">
            <select
              id="ops-filter-project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="appearance-none cursor-pointer rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]/30"
            >
              <option value="all">All projects</option>
              {projects.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">
            {totalCards} card{totalCards !== 1 ? "s" : ""} ·{" "}
            {activeManagerCount} ops manager
            {activeManagerCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Swimlanes ──────────────────────────────────────────────────────── */}
      <div className="mt-4 flex flex-col gap-6">
        {opsManagers.map((manager) => {
          const managerCards = filtered.filter(
            (c) => c.opsManagerId === manager.id,
          );

          // Build column map
          const columnMap = COLUMN_ORDER.reduce<
            Record<KanbanStatus, KanbanCard[]>
          >(
            (acc, status) => {
              acc[status] = managerCards.filter((c) => c.status === status);
              return acc;
            },
            { backlog: [], "in-progress": [], review: [], approved: [] },
          );

          const laneCardCount = managerCards.length;

          return (
            <div
              key={manager.id}
              className="rounded-2xl border border-slate-200 bg-white"
            >
              {/* Swimlane header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: manager.avatarColor }}
                  >
                    {manager.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {manager.name}
                    </p>
                    <p className="text-xs text-slate-400">Ops Manager</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {laneCardCount} card{laneCardCount !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Columns grid */}
              <div className="grid grid-cols-2 gap-px bg-slate-100 lg:grid-cols-4">
                {COLUMN_ORDER.map((status) => {
                  const meta = COLUMN_META[status];
                  const columnCards = columnMap[status];
                  return (
                    <div
                      key={status}
                      className="flex flex-col gap-3 bg-white p-4"
                    >
                      {/* Column header */}
                      <div
                        className={`flex items-center justify-between rounded-lg px-3 py-2 ${meta.headerBg}`}
                      >
                        <span
                          className={`border-l-2 pl-2 text-xs font-semibold uppercase tracking-wider text-slate-600 ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {columnCards.length}
                        </span>
                      </div>

                      {/* Cards */}
                      <div className="flex flex-col gap-2">
                        {columnCards.length === 0 ? (
                          <div className="rounded-lg border border-dashed border-slate-200 px-3 py-4 text-center">
                            <p className="text-xs text-slate-300">Empty</p>
                          </div>
                        ) : (
                          columnCards.map((card) => (
                            <button
                              key={card.id}
                              type="button"
                              className="group w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-left transition hover:border-[#3B4FBF]/40 hover:bg-[#3B4FBF]/5 hover:shadow-sm"
                            >
                              <p className="text-xs font-semibold leading-snug text-slate-800 group-hover:text-slate-900">
                                {card.title}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-[11px] text-slate-400">
                                  {card.assignee}
                                </span>
                                <span
                                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${TAG_COLORS[card.tag]}`}
                                >
                                  {card.tag}
                                </span>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── File Vault Panel ─────────────────────────────────────────────────────────

type VaultFile = {
  id: string;
  name: string;
  category: "Legal" | "Brand Assets" | "Project Specs";
  client: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
};

const VAULT_CATEGORY_COLORS: Record<VaultFile["category"], string> = {
  Legal: "bg-rose-100 text-rose-700 border-rose-200",
  "Brand Assets": "bg-purple-100 text-purple-700 border-purple-200",
  "Project Specs": "bg-blue-100 text-blue-700 border-blue-200",
};

type FileVaultPanelProps = {
  files: VaultFile[];
};

export function FileVaultPanel({ files }: FileVaultPanelProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    VaultFile["category"] | "all"
  >("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return files.filter((f) => {
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.client.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all" || f.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [files, query, selectedCategory]);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "Legal", "Brand Assets", "Project Specs"] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "border-[#3B4FBF] bg-[#3B4FBF] text-white"
                    : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {cat === "all" ? "All files" : cat}
              </button>
            ),
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search files…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]/30"
          />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <FilePlus2 className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">File name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Uploaded by</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((file) => (
              <tr
                key={file.id}
                className="transition hover:bg-slate-50/70"
              >
                <td className="px-4 py-3 font-semibold text-slate-800">
                  {file.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${VAULT_CATEGORY_COLORS[file.category]}`}
                  >
                    {file.category}
                  </span>
                </td>
                <td className="px-4 py-3">{file.client}</td>
                <td className="px-4 py-3">{file.uploadedBy}</td>
                <td className="px-4 py-3 text-slate-400">{file.uploadedAt}</td>
                <td className="px-4 py-3 text-slate-400">{file.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400">
            No files match your search.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Approval Queue Panel ─────────────────────────────────────────────────────

type ApprovalItem = {
  id: string;
  title: string;
  requestedBy: string;
  client: string;
  tag: KanbanTag;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
};

const APPROVAL_STATUS_COLORS: Record<ApprovalItem["status"], string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-100 text-rose-700 border-rose-200",
};

type ApprovalQueuePanelProps = {
  items: ApprovalItem[];
};

export function ApprovalQueuePanel({ items }: ApprovalQueuePanelProps) {
  const [filter, setFilter] = useState<ApprovalItem["status"] | "all">("all");

  const filtered = useMemo(
    () => items.filter((i) => filter === "all" || i.status === filter),
    [items, filter],
  );

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition ${
                filter === s
                  ? "border-[#3B4FBF] bg-[#3B4FBF] text-white"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400">
          {filtered.filter((i) => i.status === "pending").length} pending
          approval{filtered.filter((i) => i.status === "pending").length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400">
            No items in this queue.
          </div>
        )}
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4 transition hover:border-[#3B4FBF]/30 hover:bg-[#3B4FBF]/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
              </div>
              <p className="text-xs text-slate-400">
                {item.requestedBy} · {item.client} · {item.submittedAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${TAG_COLORS[item.tag]}`}
              >
                {item.tag}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${APPROVAL_STATUS_COLORS[item.status]}`}
              >
                {item.status}
              </span>
              {item.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab Controller (wraps all three panels) ──────────────────────────────────

type OperationsTabControllerProps = {
  kanban: OperationsKanbanClientProps;
  vault: FileVaultPanelProps;
  queue: ApprovalQueuePanelProps;
};

type TabKey = "kanban" | "vault" | "queue";

export function OperationsTabController({
  kanban,
  vault,
  queue,
}: OperationsTabControllerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("kanban");

  const pendingCount = queue.items.filter((i) => i.status === "pending").length;

  const TABS: { key: TabKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      key: "kanban",
      label: "Global Kanban",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      key: "vault",
      label: "File Vault",
      icon: <FilePlus2 className="h-4 w-4" />,
    },
    {
      key: "queue",
      label: "Approval Queue",
      icon: <ShieldCheck className="h-4 w-4" />,
      badge: pendingCount,
    },
  ];

  return (
    <div className="mt-8">
      {/* Tab bar + add card button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              id={`ops-tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 rounded-full bg-[#3B4FBF] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          id="ops-add-card"
          className="inline-flex items-center gap-2 rounded-xl bg-[#3B4FBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2f40a0]"
        >
          <Plus className="h-4 w-4" />
          Add card
        </button>
      </div>

      {/* Panel */}
      {activeTab === "kanban" && <OperationsKanbanClient {...kanban} />}
      {activeTab === "vault" && <FileVaultPanel {...vault} />}
      {activeTab === "queue" && <ApprovalQueuePanel {...queue} />}
    </div>
  );
}
