import { Wrench } from "lucide-react";
import { OperationsTabController } from "./_components/OperationsKanbanClient";
import type {
  KanbanCard,
  OpsManager,
} from "./_components/OperationsKanbanClient";

// ─── Static data ──────────────────────────────────────────────────────────────
// In a future iteration these would be fetched from Supabase server-side.

const opsManagers: OpsManager[] = [
  {
    id: "ops-001",
    name: "M. Bunda",
    initials: "MB",
    avatarColor: "#3B4FBF",
  },
  {
    id: "ops-002",
    name: "R. Tan",
    initials: "RT",
    avatarColor: "#7C3AED",
  },
  {
    id: "ops-003",
    name: "K. Reyes",
    initials: "KR",
    avatarColor: "#0891B2",
  },
];

const kanbanCards: KanbanCard[] = [
  // M. Bunda
  {
    id: "kc-001",
    title: "Logo refresh — exploration",
    assignee: "Liana C.",
    tag: "Brand",
    status: "backlog",
    client: "Orchid Labs",
    project: "Brand Refresh",
    opsManagerId: "ops-001",
  },
  {
    id: "kc-002",
    title: "Checkout API rework",
    assignee: "Diego A.",
    tag: "Dev",
    status: "in-progress",
    client: "Beacon Finance",
    project: "Platform Upgrade",
    opsManagerId: "ops-001",
  },
  {
    id: "kc-003",
    title: "Brand guidelines PDF",
    assignee: "Liana C.",
    tag: "Brand",
    status: "approved",
    client: "Orchid Labs",
    project: "Brand Refresh",
    opsManagerId: "ops-001",
  },
  // R. Tan
  {
    id: "kc-004",
    title: "Q2 ad creatives — Set B",
    assignee: "Aisha R.",
    tag: "Marketing",
    status: "backlog",
    client: "Nimbus Learning",
    project: "Q2 Campaign",
    opsManagerId: "ops-002",
  },
  {
    id: "kc-005",
    title: "Product reel V3",
    assignee: "Marcus J.",
    tag: "Video",
    status: "in-progress",
    client: "Pinecone Media",
    project: "Promo Production",
    opsManagerId: "ops-002",
  },
  {
    id: "kc-006",
    title: "Motion intro stinger",
    assignee: "Hana T.",
    tag: "Motion",
    status: "in-progress",
    client: "Pinecone Media",
    project: "Promo Production",
    opsManagerId: "ops-002",
  },
  {
    id: "kc-007",
    title: "Landing copy v2",
    assignee: "Olu A.",
    tag: "Copy",
    status: "review",
    client: "Atlas Mobility",
    project: "Website Revamp",
    opsManagerId: "ops-002",
  },
  {
    id: "kc-008",
    title: "March campaign report",
    assignee: "Aisha R.",
    tag: "Marketing",
    status: "approved",
    client: "Nimbus Learning",
    project: "Q2 Campaign",
    opsManagerId: "ops-002",
  },
  // K. Reyes
  {
    id: "kc-009",
    title: "UX audit — onboarding flow",
    assignee: "Priya R.",
    tag: "Design",
    status: "backlog",
    client: "SignalWorks",
    project: "UX Overhaul",
    opsManagerId: "ops-003",
  },
  {
    id: "kc-010",
    title: "Ops workflow documentation",
    assignee: "Sana A.",
    tag: "Ops",
    status: "in-progress",
    client: "Northwind Energy",
    project: "Ops Playbook",
    opsManagerId: "ops-003",
  },
  {
    id: "kc-011",
    title: "Contract SLA checklist",
    assignee: "Noah T.",
    tag: "Ops",
    status: "review",
    client: "Harbor Foods",
    project: "Ops Playbook",
    opsManagerId: "ops-003",
  },
  {
    id: "kc-012",
    title: "Pitch deck copy polish",
    assignee: "Olu A.",
    tag: "Copy",
    status: "approved",
    client: "Beacon Finance",
    project: "Platform Upgrade",
    opsManagerId: "ops-003",
  },
];

const vaultFiles = [
  {
    id: "vf-001",
    name: "MSA_OrchidLabs_2026.pdf",
    category: "Legal" as const,
    client: "Orchid Labs",
    uploadedBy: "M. Bunda",
    uploadedAt: "Apr 12, 2026",
    size: "1.2 MB",
  },
  {
    id: "vf-002",
    name: "Orchid_BrandKit_v4.zip",
    category: "Brand Assets" as const,
    client: "Orchid Labs",
    uploadedBy: "Liana C.",
    uploadedAt: "Apr 15, 2026",
    size: "48.6 MB",
  },
  {
    id: "vf-003",
    name: "BeaconFinance_TechSpec.docx",
    category: "Project Specs" as const,
    client: "Beacon Finance",
    uploadedBy: "Diego A.",
    uploadedAt: "Apr 20, 2026",
    size: "320 KB",
  },
  {
    id: "vf-004",
    name: "AtlasMobility_NDA_Signed.pdf",
    category: "Legal" as const,
    client: "Atlas Mobility",
    uploadedBy: "K. Reyes",
    uploadedAt: "Apr 22, 2026",
    size: "540 KB",
  },
  {
    id: "vf-005",
    name: "Nimbus_Q2_CreativeBrief.pdf",
    category: "Project Specs" as const,
    client: "Nimbus Learning",
    uploadedBy: "Aisha R.",
    uploadedAt: "Apr 25, 2026",
    size: "2.1 MB",
  },
  {
    id: "vf-006",
    name: "PineconeMedia_LogoAssets.zip",
    category: "Brand Assets" as const,
    client: "Pinecone Media",
    uploadedBy: "Liana C.",
    uploadedAt: "Apr 27, 2026",
    size: "23.4 MB",
  },
  {
    id: "vf-007",
    name: "SignalWorks_SOW_v2.pdf",
    category: "Legal" as const,
    client: "SignalWorks",
    uploadedBy: "M. Bunda",
    uploadedAt: "Apr 28, 2026",
    size: "980 KB",
  },
];

const approvalItems = [
  {
    id: "aq-001",
    title: "Brand guidelines PDF — final sign-off",
    requestedBy: "Liana C.",
    client: "Orchid Labs",
    tag: "Brand" as const,
    submittedAt: "Apr 28, 2026",
    status: "pending" as const,
  },
  {
    id: "aq-002",
    title: "March campaign report delivery",
    requestedBy: "Aisha R.",
    client: "Nimbus Learning",
    tag: "Marketing" as const,
    submittedAt: "Apr 27, 2026",
    status: "approved" as const,
  },
  {
    id: "aq-003",
    title: "Contract SLA checklist — ops review",
    requestedBy: "Noah T.",
    client: "Harbor Foods",
    tag: "Ops" as const,
    submittedAt: "Apr 29, 2026",
    status: "pending" as const,
  },
  {
    id: "aq-004",
    title: "Pitch deck copy polish",
    requestedBy: "Olu A.",
    client: "Beacon Finance",
    tag: "Copy" as const,
    submittedAt: "Apr 26, 2026",
    status: "approved" as const,
  },
  {
    id: "aq-005",
    title: "Q2 ad creatives — Set A",
    requestedBy: "Aisha R.",
    client: "Nimbus Learning",
    tag: "Marketing" as const,
    submittedAt: "Apr 24, 2026",
    status: "rejected" as const,
  },
  {
    id: "aq-006",
    title: "Landing copy v2 — website revamp",
    requestedBy: "Olu A.",
    client: "Atlas Mobility",
    tag: "Copy" as const,
    submittedAt: "Apr 30, 2026",
    status: "pending" as const,
  },
  {
    id: "aq-007",
    title: "UX audit findings report",
    requestedBy: "Priya R.",
    client: "SignalWorks",
    tag: "Design" as const,
    submittedAt: "Apr 30, 2026",
    status: "pending" as const,
  },
];

// Unique filter options derived from static data
const uniqueClients = [...new Set(kanbanCards.map((c) => c.client))].sort();
const uniqueProjects = [...new Set(kanbanCards.map((c) => c.project))].sort();

// ─── KPI cards ────────────────────────────────────────────────────────────────

import {
  CheckCircle2,
  ClipboardList,
  Folders,
  ListTodo,
  Users2,
} from "lucide-react";

const kpiCards = [
  {
    label: "Active projects",
    value: String(
      new Set(
        kanbanCards
          .filter((c) => c.status === "in-progress")
          .map((c) => c.project),
      ).size,
    ),
    icon: ListTodo,
  },
  {
    label: "Cards in flight",
    value: String(
      kanbanCards.filter((c) => c.status === "in-progress").length,
    ),
    icon: ClipboardList,
  },
  {
    label: "Pending approvals",
    value: String(approvalItems.filter((i) => i.status === "pending").length),
    icon: CheckCircle2,
  },
  {
    label: "Ops managers",
    value: String(opsManagers.length),
    icon: Users2,
  },
  {
    label: "Vault files",
    value: String(vaultFiles.length),
    icon: Folders,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OperationsPage() {
  return (
    <div className="px-6 py-2">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="flex flex-row items-center gap-3 text-3xl font-semibold text-slate-900">
          <Wrench className="h-8 w-8 text-slate-700" />
          <span>Operations</span>
        </h1>
        <p className="text-sm text-slate-500">
          Centralized global Kanban with Ops Manager swimlanes, encrypted file
          vault, and milestone approval queue.
        </p>
      </div>

      {/* KPI strip */}
      <section className="mt-8 grid gap-4 lg:grid-cols-5">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-300 bg-white p-4"
            >
              <div className="flex items-center justify-between gap-3 h-full">
                <div className="flex flex-col gap-2">
                  <div className="text-slate-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-semibold text-slate-900">
                    {card.value}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {card.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Tab controller (client island) */}
      <OperationsTabController
        kanban={{
          opsManagers,
          cards: kanbanCards,
          clients: uniqueClients,
          projects: uniqueProjects,
        }}
        vault={{ files: vaultFiles }}
        queue={{ items: approvalItems }}
      />
    </div>
  );
}
