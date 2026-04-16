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
          Many more features to be displayed within this application. Stay tuned
          for the progress!
        </p>
      </div>
    </div>
  );
}
