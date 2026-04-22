import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  passesPasswordRule,
  PASSWORD_RULE_MESSAGE,
} from "@/utils/validation/auth";

/**
 * POST /api/auth/change
 * Updates the authenticated user's password.
 * Validates password requirements and verifies confirmation before updating.
 */
export async function POST(request: NextRequest) {
  const { currentPassword, newPassword, confirmPassword } =
    await request.json();

  const errors: string[] = [];

  // Validation
  if (!currentPassword) errors.push("Current password is required");
  if (!newPassword) errors.push("New password is required");
  if (!confirmPassword) errors.push("Password confirmation is required");
  if (newPassword !== confirmPassword)
    errors.push("New passwords do not match");
  if (currentPassword === newPassword)
    errors.push("New password must be different from current password");
  if (!passesPasswordRule(newPassword)) errors.push(PASSWORD_RULE_MESSAGE);

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // Execute main change password operation
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, errors: ["User not authenticated"] },
        { status: 401 },
      );
    }

    // Update password with Supabase
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Password update error:", error);
      return NextResponse.json(
        {
          success: false,
          errors: [error.message || "Failed to update password"],
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, errors: [] }, { status: 200 });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { success: false, errors: ["Failed to change password"] },
      { status: 500 },
    );
  }
}
