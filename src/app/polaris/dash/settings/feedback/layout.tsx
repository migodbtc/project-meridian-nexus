import FeedbackHeader from "./_components/FeedbackHeader";

/**
 * Layout wrapper for feedback section with persistent header.
 * Provides navigation between routes like feedback create & feedback index.
 * Ensures shared heading remains visible across child pages.
 */
export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Render shared header above nested feedback content.
    <div className="flex flex-col gap-6">
      <FeedbackHeader />
      {children}
    </div>
  );
}
