"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

interface Feedback {
  id: string;
  subject: string;
  topic: string;
  message: string;
  created_at?: string;
}

interface FeedbackListClientProps {
  feedbacks: Feedback[];
}

const ITEMS_PER_PAGE = 10;
const MAX_PREVIEW_CHARS = 100;

/**
 * Interactive client component for feedback display with accordion expansion.
 * Handles pagination, character-based text truncation (see above)
 * and individual feedback expansion/collapse state management.
 */
export default function FeedbackListClient({
  feedbacks,
}: FeedbackListClientProps) {
  // Form state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Dynamic constants
  const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFeedbacks = useMemo(
    () => feedbacks.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [feedbacks, startIndex],
  );

  // Toggle Handler Function
  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Helper Functions
  const getPreviewText = (text: string, charLimit: number) => {
    if (text.length <= charLimit) return text;
    return text.substring(0, charLimit).trim() + "...";
  };

  const isTextTruncated = (text: string) => {
    return text.length > MAX_PREVIEW_CHARS;
  };

  // TSX Structure
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {currentFeedbacks.map((feedback) => {
          const isExpanded = expandedItems.has(feedback.id);
          const isTruncated = isTextTruncated(feedback.message);
          const displayText = isExpanded
            ? feedback.message
            : getPreviewText(feedback.message, MAX_PREVIEW_CHARS);

          return (
            <div
              key={feedback.id}
              className="rounded-lg border border-slate-200 transition-shadow hover:shadow-sm"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-sm font-semibold text-slate-800 flex-1 wrap-break-word">
                    {feedback.subject}
                  </h4>
                  {isTruncated && (
                    <button
                      onClick={() => toggleExpand(feedback.id)}
                      className="shrink-0 p-1 rounded hover:bg-slate-100 transition-colors"
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      <ChevronDown
                        size={18}
                        className={`text-slate-600 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-medium text-[#3B4FBF] ring-1 ring-inset ring-indigo-700/10 capitalize">
                    {feedback.topic}
                  </span>
                </div>
              </div>

              <div className="px-4 py-3 pt-1">
                <p
                  className={`text-sm text-slate-600 whitespace-pre-wrap transition-all ${
                    !isExpanded && isTruncated ? "line-clamp-4" : ""
                  }`}
                >
                  {displayText}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            Page {currentPage} of {totalPages} ({feedbacks.length} total)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-xs font-medium rounded border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-xs font-medium rounded transition-colors ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-xs font-medium rounded border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
