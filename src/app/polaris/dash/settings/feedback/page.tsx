import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const ALLOWED_EMAILS = [
  "sgpurificacion@dbtcmandaluyong.one-bosco.org",
  "mjdmbunda@dbtcmandaluyong.one-bosco.org",
];

/**
 * Authenticates user email against whitelist and redirects to feedback form.
 * Displays error message if email not authorized.
 * Prevents unauthorized access to feedback submission route.
 */
async function AuthGateRedirect() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Validate authenticated user against allowed email list.
  if (!user || !user.email || !ALLOWED_EMAILS.includes(user.email)) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-rose-500 font-medium">
          Sorry! Your email address is not authorized to give feedback to the
          system.
        </p>
      </div>
    );
  }

  // Redirect authorized users to feedback creation page.
  redirect("/polaris/dash/settings/feedback/create");
  return (
    <div className="space-y-2">
      <p className="text-sm text-rose-500 font-medium">
        Redirecting to feedback form...
      </p>
    </div>
  );
}

/**
 * Root feedback page with auth gate and redirect logic.
 * Wraps async auth check in Suspense boundary.
 * Shows fallback while access verification request resolves.
 */
export default function FeedbackRedirectPage() {
  return (
    <Suspense
      fallback={<p className="text-sm text-slate-500">Verifying access...</p>}
    >
      <AuthGateRedirect />
    </Suspense>
  );
}
