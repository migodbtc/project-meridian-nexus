import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import FeedbackListClient from "./_components/FeedbackListClient";

/**
 * Server component that fetches feedback from Supabase.
 * Passes data to client component for pagination and accordion.
 * Handles loading errors and empty-state responses safely.
 */
async function LoadedFeedbackList() {
  const supabase = await createClient();

  const { data: feedbacks, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-sm text-rose-500">Failed to load feedback.</p>;
  }

  if (feedbacks?.length === 0) {
    return (
      <p className="text-sm text-slate-500 italic">
        No feedback submitted yet.
      </p>
    );
  }

  return <FeedbackListClient feedbacks={feedbacks} />;
}

/**
 * Feedback overview page with Suspense boundary for data loading.
 * Displays paginated two-column accordion list of all feedback.
 * Shows loading fallback while server query resolves.
 */
export default function FeedbackIndexPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={<p className="text-sm text-slate-500">Loading feedback...</p>}
      >
        <LoadedFeedbackList />
      </Suspense>
    </div>
  );
}
