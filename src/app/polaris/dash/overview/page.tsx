import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  FileText,
  Handshake,
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import TodayAnalyticsClient from "./_components/TodayAnalyticsClient";
import SystemPulseClient from "./_components/SystemPulseClient";

const kpiCards = [
  {
    label: "Active talent",
    value: "128",
    icon: Users,
  },
  {
    label: "Contracts live",
    value: "32",
    icon: FileText,
  },
  {
    label: "On-time delivery",
    value: "96%",
    icon: ShieldCheck,
  },
  {
    label: "Upcoming renewals",
    value: "9",
    icon: CalendarClock,
  },
  {
    label: "Daily revenue",
    value: "$18.4k",
    icon: BadgeDollarSign,
  },
];

const todayMetrics = [
  {
    label: "Talent activated",
    value: "14",
    direction: "up" as const,
    icon: "user-check" as const,
  },
  {
    label: "Contracts touched",
    value: "9",
    direction: "up" as const,
    icon: "file-text" as const,
  },
  {
    label: "Client check-ins",
    value: "22",
    direction: "flat" as const,
    icon: "handshake" as const,
  },
  {
    label: "Risk flags",
    value: "2",
    direction: "down" as const,
    icon: "shield-alert" as const,
  },
];

const throughput = [12, 18, 14, 22, 28, 20, 26, 19];

const quickActions = [
  {
    title: "Talent Onboarding",
    description: "Create role scope and send start pack.",
    icon: UserPlus,
  },
  {
    title: "Contract Review",
    description: "6 agreements await legal sign-off.",
    icon: FileText,
  },
  {
    title: "Approve Milestones",
    description: "Assign a pod and publish milestones.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Review Finances",
    description: "Book daily standup and SLA review.",
    icon: CalendarClock,
  },
];

const recentActivities = [
  {
    id: "act-001",
    title: "Contract renewal approved for Orchid Labs",
    time: "32 min ago",
    detail: "Renewal signed for Q2 growth pod.",
    icon: FileText,
  },
  {
    id: "act-002",
    title: "Talent briefing scheduled for Atlas Mobility",
    time: "1 hr ago",
    detail: "Operations lead assigned to delivery team.",
    icon: Users,
  },
  {
    id: "act-003",
    title: "Client pulse check completed",
    time: "2 hrs ago",
    detail: "SignalWorks moved to green status.",
    icon: BarChart3,
  },
  {
    id: "act-004",
    title: "New specialist added to content roster",
    time: "3 hrs ago",
    detail: "Editorial strategy support added.",
    icon: UserPlus,
  },
];

const pulseSeries = [
  { label: "Mon", demand: 48, supply: 42 },
  { label: "Tue", demand: 62, supply: 55 },
  { label: "Wed", demand: 56, supply: 50 },
  { label: "Thu", demand: 70, supply: 63 },
  { label: "Fri", demand: 64, supply: 60 },
  { label: "Sat", demand: 52, supply: 48 },
];

const pulseSummary = [
  "Talent utilization: 78%",
  "Contract velocity: 6.2 hrs",
  "Client sentiment: 4.6/5",
  "SLA health: 96%",
];

export default function OverviewPage() {
  return (
    <div className="px-6 py-2">
      <div className="flex flex-col gap-2">
        <h1 className="flex flex-row items-center gap-3 text-3xl font-semibold text-slate-900">
          <LayoutDashboard className="h-8 w-8 text-slate-700" />
          <span>Overview</span>
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

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodayAnalyticsClient
            metrics={todayMetrics}
            throughput={throughput}
          />
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Sparkles className="h-5 w-5 text-slate-600" />
              Quick actions
            </h3>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  type="button"
                  className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-6 text-center text-sm transition hover:border-[#3B4FBF]/40 hover:bg-[#3B4FBF]/5"
                >
                  <Icon className="h-5 w-5 text-slate-600" />
                  <div className="text-slate-900 text-sm">{action.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-300 bg-white p-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Activity className="h-5 w-5 text-slate-600" />
              Recent activity
            </h3>
            <p className="text-sm text-slate-500">
              Global updates across talent, contracts, and client delivery.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 transition hover:border-[#3B4FBF]/40 hover:bg-[#3B4FBF]/5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-slate-500" />
                      <div className="text-sm font-semibold text-slate-900">
                        {activity.title}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-1 ml-6 text-xs text-slate-500">
                    {activity.detail}
                  </p>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="mt-4 w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#3B4FBF]/40 hover:bg-[#3B4FBF]/5"
          >
            See more activity
          </button>
        </div>
        <SystemPulseClient series={pulseSeries} summary={pulseSummary} />
      </section>
    </div>
  );
}
