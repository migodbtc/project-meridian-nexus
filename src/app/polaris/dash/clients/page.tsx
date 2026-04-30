import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Globe2,
} from "lucide-react";
import ClientDirectoryClient from "./_components/ClientDirectoryClient";

const kpiCards = [
  {
    label: "Active clients",
    value: "42",
    icon: Building2,
  },
  {
    label: "Expansion pipeline",
    value: "$180k",
    icon: BadgeDollarSign,
  },
  {
    label: "Contracts live",
    value: "28",
    icon: BriefcaseBusiness,
  },
  {
    label: "Upcoming renewals",
    value: "7",
    icon: CalendarClock,
  },
  {
    label: "Regions served",
    value: "11",
    icon: Globe2,
  },
];

const clients = [
  {
    id: "cli-001",
    name: "Orchid Labs",
    industry: "Healthtech",
    location: "San Diego, US",
    tier: "Enterprise" as const,
    monthlySpend: "$48k",
    activeContracts: 3,
    nextRenewal: "May 22, 2026",
    accountOwner: "Ari Watson",
  },
  {
    id: "cli-002",
    name: "Luma Retail",
    industry: "E-commerce",
    location: "Toronto, CA",
    tier: "Growth" as const,
    monthlySpend: "$26k",
    activeContracts: 2,
    nextRenewal: "Jun 02, 2026",
    accountOwner: "Samir Desai",
  },
  {
    id: "cli-003",
    name: "Northwind Energy",
    industry: "Clean Energy",
    location: "Copenhagen, DK",
    tier: "Enterprise" as const,
    monthlySpend: "$54k",
    activeContracts: 4,
    nextRenewal: "May 12, 2026",
    accountOwner: "Julia Park",
  },
  {
    id: "cli-004",
    name: "Pinecone Media",
    industry: "Entertainment",
    location: "Los Angeles, US",
    tier: "Core" as const,
    monthlySpend: "$18k",
    activeContracts: 1,
    nextRenewal: "Jun 15, 2026",
    accountOwner: "Emi Rodriguez",
  },
  {
    id: "cli-005",
    name: "Atlas Mobility",
    industry: "Transportation",
    location: "Berlin, DE",
    tier: "Growth" as const,
    monthlySpend: "$32k",
    activeContracts: 2,
    nextRenewal: "May 30, 2026",
    accountOwner: "Noah Turner",
  },
  {
    id: "cli-006",
    name: "Beacon Finance",
    industry: "Fintech",
    location: "New York, US",
    tier: "Enterprise" as const,
    monthlySpend: "$61k",
    activeContracts: 3,
    nextRenewal: "May 10, 2026",
    accountOwner: "Ivy Brooks",
  },
  {
    id: "cli-007",
    name: "Oasis Hospitality",
    industry: "Travel",
    location: "Barcelona, ES",
    tier: "Core" as const,
    monthlySpend: "$14k",
    activeContracts: 1,
    nextRenewal: "Jun 08, 2026",
    accountOwner: "Chloe Kim",
  },
  {
    id: "cli-008",
    name: "SignalWorks",
    industry: "SaaS",
    location: "Austin, US",
    tier: "Growth" as const,
    monthlySpend: "$23k",
    activeContracts: 2,
    nextRenewal: "May 18, 2026",
    accountOwner: "Ravi Singh",
  },
  {
    id: "cli-009",
    name: "Harbor Foods",
    industry: "CPG",
    location: "Chicago, US",
    tier: "Core" as const,
    monthlySpend: "$12k",
    activeContracts: 1,
    nextRenewal: "Jun 20, 2026",
    accountOwner: "Maya Patel",
  },
  {
    id: "cli-010",
    name: "Nimbus Learning",
    industry: "Edtech",
    location: "Dublin, IE",
    tier: "Growth" as const,
    monthlySpend: "$27k",
    activeContracts: 2,
    nextRenewal: "May 25, 2026",
    accountOwner: "Oliver Ross",
  },
  {
    id: "cli-011",
    name: "Aster Bio",
    industry: "Biotech",
    location: "Boston, US",
    tier: "Enterprise" as const,
    monthlySpend: "$58k",
    activeContracts: 3,
    nextRenewal: "May 28, 2026",
    accountOwner: "Lea Morgan",
  },
  {
    id: "cli-012",
    name: "Juniper Home",
    industry: "Consumer Goods",
    location: "Oslo, NO",
    tier: "Core" as const,
    monthlySpend: "$16k",
    activeContracts: 1,
    nextRenewal: "Jun 11, 2026",
    accountOwner: "Theo Garcia",
  },
];

export default function ClientsPage() {
  return (
    <div className="px-6 py-2">
      <div className="flex flex-col gap-2">
        <h1 className="flex flex-row items-center gap-3 text-3xl font-semibold text-slate-900">
          <Building2 className="h-8 w-8 text-slate-700" />
          <span>Clients</span>
        </h1>
      </div>

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

      <ClientDirectoryClient clients={clients} />
    </div>
  );
}
