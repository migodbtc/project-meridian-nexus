import { RocketIcon } from "lucide-react";

export default function DashPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-8 py-12 text-center max-w-md">
        <p className="text-7xl">
          <RocketIcon />
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">Coming Soon</h2>
        <p className="text-sm text-slate-500">
          Dashboard features are under development. Check back soon for updates.
        </p>
      </div>
    </div>
  );
}
