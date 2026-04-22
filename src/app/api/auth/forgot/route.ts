import { ForgotPasswordPayload } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { isValidEmailFormat } from "@/utils/validation/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/forgot
 * Sends a Supabase password-recovery email after validating input.
 */
export async function POST(req: NextRequest) {
  const body: ForgotPasswordPayload = await req.json();
  const email = body.ForgotPasswordEmail?.trim();

  const errors: string[] = [];

  // Validation
  if (!email) {
    errors.push("Email is required");
  } else if (!isValidEmailFormat(email)) {
    errors.push("Email: invalid email format.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const emailRedirectTo = `${req.nextUrl.origin}/polaris/auth/login`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: emailRedirectTo,
    });

    if (error) {
      console.error("Forgot password email send error:", error);
      return NextResponse.json(
        {
          success: false,
          errors: [error.message || "Failed to send password reset link"],
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, errors: [] }, { status: 200 });
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    return NextResponse.json(
      {
        success: false,
        errors: ["Failed to send password reset email"],
      },
      { status: 500 },
    );
  }
}
