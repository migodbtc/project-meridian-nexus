import { MessageSquare } from "lucide-react";
import { createClient } from "@/utils/supabase/server"; 
import FeedbackForm from "./_components/FeedbackForm";
import { Database } from "../../../../../../supabase/types/supabase";

const ALLOWED_EMAILS = ["sgpurificacion@dbtcmandaluyong.one-bosco.org", "mjdmbunda@dbtcmandaluyong.one-bosco.org"];

/**
 * FeedbackPage Component
 * A server component acting as an authenticated gate for user feedback submission.
 * Validates the user's email against an allowed list before rendering the FeedbackForm.
 * Includes a server action to securely insert feedback directly into the database.
 */
export default async function FeedbackPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Authentication Gate
  if (!user || !user.email || !ALLOWED_EMAILS.includes(user.email)) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800 flex flex-row gap-2 items-center">
          <MessageSquare size={24} className="text-[#3B4FBF]" />
          Feedback
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Sorry! Your email address is not authorized to give feedback to the system.
        </p>
      </div>
    );
  }

  // Actions
  async function submitFeedbackAction(prevState: any, formData: FormData) {
    "use server";

    // Security Reverification
    const supabaseServer = await createClient(); 
    const { data: { user: actionUser } } = await supabaseServer.auth.getUser();

    // Authenticated user email validation
    if (!actionUser || !actionUser.email || !ALLOWED_EMAILS.includes(actionUser.email)) {
      return { success: false, message: "Unauthorized submission attempt." };
    }

    // Data extraction
    const topic = formData.get("topic") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const payload: Database["public"]["Tables"]["feedback"]["Insert"] = {
      user_id: actionUser.id,
      email: actionUser.email,
      topic,
      subject,
      message,
    };

    try {
      const { error } = await supabaseServer.from('feedback').insert(payload);
      
      if (error) throw error;

      return { success: true, message: "Thank you! Your feedback has been submitted." };
    } catch (error) {
      console.error("Feedback submission error:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }
  }

  return (
    <FeedbackForm 
      user={{ 
        email: user.email, 
      }} 
      submitAction={submitFeedbackAction} 
    />
  );
}