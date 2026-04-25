"use client";

import { useActionState, useState, useEffect } from "react";
import { MessageSquare, Send, Loader2, User, Mail, Tag, Type, AlignLeft, ChevronDown } from "lucide-react";
import { showSuccessToast, showErrorToast, useFlashToast } from "@/utils/toast";

type UserProps = {
  email: string;
};

// Define the shape of what the server action returns
type FormState = {
  success: boolean;
  message: string;
} | null;

/**
 * FeedbackForm Component
 * A client component responsible for rendering the feedback submission UI.
 * Handles local state for dynamic character limits and integrates with a 
 * React 19 `useActionState` server action hook to manage pending states.
 */
export default function FeedbackForm({ 
  user, 
  submitAction 
}: { 
  user: UserProps;
  // Typing for a React 19 Server Action
  submitAction: (state: FormState, payload: FormData) => Promise<FormState>;
}) {
  // useActionState handles the pending boolean and the returned data automatically
  const [state, formAction, isPending] = useActionState(submitAction, null);

  const [subjectLength, setSubjectLength] = useState(0);
  const [messageLength, setMessageLength] = useState(0);

  // Initialize flash toast watcher
  useFlashToast();

  // Watch for server action state changes and pop a toast
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      showSuccessToast("Feedback Submitted", state.message);
    } else {
      showErrorToast("Submission Failed", state.message);
    }
  }, [state]);

  return (
    // Pass the formAction directly to the action prop
    <form action={formAction} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 flex flex-row gap-2 items-center">
          <MessageSquare size={24} className="text-[#3B4FBF]" />
          Feedback
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          We value your input. Submit your feedback, bug reports, or feature requests below.
        </p>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold text-slate-700">User Information</h3>
        <div className="flex items-center gap-2 rounded-lg text-slate-600">
          <Mail size={16} className="text-slate-800" />
          <span className="text-sm font-medium text-slate-700">Submitting as:</span>
          <span className="text-sm">{user.email}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Feedback Details</h3>
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="block">
              <label className="flex items-center gap-1.5 text-sm text-slate-700 mb-1">
                <Tag size={16} className="text-slate-800" />
                Topic <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <select
                  name="topic"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] bg-white appearance-none pr-8 cursor-pointer"
                  defaultValue=""
                  required
                  disabled={isPending}
                >
                  <option value="" disabled>Select a topic...</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="uiux">UI/UX Feedback</option>
                  <option value="performance">Performance Issue</option>
                  <option value="account">Account Issue</option>
                  <option value="general">General Feedback</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-800">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="block">
              <label className="flex items-center gap-1.5 text-sm text-slate-700 mb-1">
                <Type size={16} className="text-slate-800" />
                Subject <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="subject"
                required
                maxLength={100}
                disabled={isPending}
                onChange={(e) => setSubjectLength(e.target.value.length)}
                placeholder="Brief summary of your feedback..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              />
              <p className="mt-1 text-xs text-slate-400 text-right">{subjectLength}/100</p>
            </div>
          </div>

          <div className="block">
            <label className="flex items-center gap-1.5 text-sm text-slate-700 mb-1">
              <AlignLeft size={16} className="text-slate-800" />
              Message <span className="text-rose-600">*</span>
            </label>
            <textarea
              name="message"
              rows={5}
              required
              maxLength={1000}
              disabled={isPending}
              onChange={(e) => setMessageLength(e.target.value.length)}
              placeholder="Please provide as much detail as possible..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
            />
            <p className="mt-1 text-xs text-slate-400 text-right">{messageLength}/1000</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B4FBF] px-4 py-2 text-sm font-semibold text-white transition hover:cursor-pointer hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {/* Swap icon for a spinner when loading */}
          {isPending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {isPending ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
}