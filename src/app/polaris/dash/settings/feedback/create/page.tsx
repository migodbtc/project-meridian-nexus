import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import FeedbackForm from "./_components/FeedbackForm";
import { Database } from "../../../../../../../supabase/types/supabase";

const ALLOWED_EMAILS = [
  "sgpurificacion@dbtcmandaluyong.one-bosco.org",
  "mjdmbunda@dbtcmandaluyong.one-bosco.org",
];

/**
 * Server container that prepares authenticated user context.
 * Defines secure server action for feedback persistence.
 * Returns client form component with submission handler.
 */
async function FeedbackFormContainer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Server Actions
  async function submitFeedbackAction(prevState: any, formData: FormData) {
    "use server";

    const supabaseServer = await createClient();
    const {
      data: { user: actionUser },
    } = await supabaseServer.auth.getUser();

    if (
      !actionUser ||
      !actionUser.email ||
      !ALLOWED_EMAILS.includes(actionUser.email)
    ) {
      return { success: false, message: "Unauthorized submission attempt." };
    }

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
      const { error } = await supabaseServer.from("feedback").insert(payload);

      if (error) throw error;

      return {
        success: true,
        message: "Thank you! Your feedback has been submitted.",
      };
    } catch (error) {
      console.error("Feedback submission error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }

  // TSX Structure (Client element w/ Server Action)
  return (
    <FeedbackForm
      user={{
        email: user?.email || "",
      }}
      submitAction={submitFeedbackAction}
    />
  );
}

/**
 * Feedback creation route with suspense loading fallback.
 * Waits for server container before rendering form UI.
 * Keeps loading state visible during auth initialization.
 */
export default function CreateFeedbackPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-slate-500">Loading user information...</p>
      }
    >
      <FeedbackFormContainer />
    </Suspense>
  );
}
