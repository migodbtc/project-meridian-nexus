import { RocketIcon } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-8 py-12 text-center max-w-md">
        <p className="text-7xl">
          <RocketIcon />
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">Coming Soon!</h2>
        <p className="text-sm text-slate-500">
          Polaris (along with Project North Star) is a work-in-progress, with
          stable changes updated every week. More features will come! Watch the
          Instagram page (@communeye.software) for updates, and thank you for
          visiting!
        </p>
      </div>
    </div>
  );
}
