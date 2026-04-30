import {
  BadgeDollarSign,
  CalendarClock,
  FileText,
  ShieldCheck,
  User2,
  Users,
} from "lucide-react";
import TalentDirectoryClient from "./_components/TalentDirectoryClient";

const kpiCards = [
  {
    label: "Active talent",
    value: "128",
    note: "Across 14 countries",
    icon: Users,
  },
  {
    label: "Engaged this quarter",
    value: "46",
    note: "+12 from last cycle",
    icon: ShieldCheck,
  },
  {
    label: "Contracts live",
    value: "32",
    note: "Including retainers",
    icon: FileText,
  },
  {
    label: "Upcoming renewals",
    value: "9",
    note: "Next 45 days",
    icon: CalendarClock,
  },
  {
    label: "Avg. hourly rate",
    value: "$64",
    note: "Across senior tiers",
    icon: BadgeDollarSign,
  },
];

const talents = [
  {
    id: "tal-001",
    name: "Aya Nakamura",
    role: "Product Designer",
    location: "Tokyo, JP",
    status: "Engaged" as const,
    rate: "$72/hr",
    activeContracts: 2,
    nextRenewal: "May 18, 2026",
    primarySkill: "Design Systems",
    lastEngaged: "Apr 22, 2026",
  },
  {
    id: "tal-002",
    name: "Harper Nguyen",
    role: "Growth Strategist",
    location: "Austin, US",
    status: "Available" as const,
    rate: "$58/hr",
    activeContracts: 1,
    nextRenewal: "Jun 02, 2026",
    primarySkill: "Lifecycle Campaigns",
    lastEngaged: "Mar 30, 2026",
  },
  {
    id: "tal-003",
    name: "Mateo Silva",
    role: "Frontend Engineer",
    location: "Lisbon, PT",
    status: "Engaged" as const,
    rate: "$66/hr",
    activeContracts: 3,
    nextRenewal: "May 07, 2026",
    primarySkill: "React + RSC",
    lastEngaged: "Apr 25, 2026",
  },
  {
    id: "tal-004",
    name: "Riley Chen",
    role: "Data Analyst",
    location: "Singapore, SG",
    status: "Available" as const,
    rate: "$54/hr",
    activeContracts: 1,
    nextRenewal: "May 29, 2026",
    primarySkill: "Revenue Insights",
    lastEngaged: "Apr 09, 2026",
  },
  {
    id: "tal-005",
    name: "Sana Adebayo",
    role: "Operations Lead",
    location: "London, UK",
    status: "Paused" as const,
    rate: "$60/hr",
    activeContracts: 0,
    nextRenewal: "Jun 10, 2026",
    primarySkill: "Scale Playbooks",
    lastEngaged: "Feb 18, 2026",
  },
  {
    id: "tal-006",
    name: "Leo Martinez",
    role: "Content Director",
    location: "Mexico City, MX",
    status: "Engaged" as const,
    rate: "$62/hr",
    activeContracts: 2,
    nextRenewal: "May 24, 2026",
    primarySkill: "Editorial Strategy",
    lastEngaged: "Apr 20, 2026",
  },
  {
    id: "tal-007",
    name: "Chloe Brooks",
    role: "Customer Success",
    location: "Denver, US",
    status: "Available" as const,
    rate: "$48/hr",
    activeContracts: 1,
    nextRenewal: "Jun 03, 2026",
    primarySkill: "Retention Plays",
    lastEngaged: "Mar 11, 2026",
  },
  {
    id: "tal-008",
    name: "Jin Park",
    role: "Brand Strategist",
    location: "Seoul, KR",
    status: "Engaged" as const,
    rate: "$70/hr",
    activeContracts: 2,
    nextRenewal: "May 12, 2026",
    primarySkill: "Positioning",
    lastEngaged: "Apr 27, 2026",
  },
  {
    id: "tal-009",
    name: "Priya Raman",
    role: "Marketing Ops",
    location: "Bengaluru, IN",
    status: "Available" as const,
    rate: "$46/hr",
    activeContracts: 1,
    nextRenewal: "Jun 14, 2026",
    primarySkill: "Automation",
    lastEngaged: "Mar 18, 2026",
  },
  {
    id: "tal-010",
    name: "Noah Torres",
    role: "QA Lead",
    location: "Toronto, CA",
    status: "Engaged" as const,
    rate: "$55/hr",
    activeContracts: 2,
    nextRenewal: "May 20, 2026",
    primarySkill: "Release Quality",
    lastEngaged: "Apr 16, 2026",
  },
  {
    id: "tal-011",
    name: "Amira Soliman",
    role: "Community Manager",
    location: "Cairo, EG",
    status: "Available" as const,
    rate: "$44/hr",
    activeContracts: 1,
    nextRenewal: "Jun 01, 2026",
    primarySkill: "Community Growth",
    lastEngaged: "Mar 07, 2026",
  },
  {
    id: "tal-012",
    name: "Elliot Walker",
    role: "Engineering Manager",
    location: "Berlin, DE",
    status: "Paused" as const,
    rate: "$78/hr",
    activeContracts: 0,
    nextRenewal: "Jun 21, 2026",
    primarySkill: "Delivery Systems",
    lastEngaged: "Feb 12, 2026",
  },
];

export default function TalentHubPage() {
  return (
    <div className="px-6 py-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900 flex flex-row items-center gap-3">
          <User2 className="h-8 w-8 text-slate-700" />
          <span>Talents</span>
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

      <TalentDirectoryClient talents={talents} />
    </div>
  );
}
