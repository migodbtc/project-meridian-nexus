import { RegisterPayload } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import {
  isValidEmailFormat,
  passesPasswordRule,
  PASSWORD_RULE_MESSAGE,
} from "@/utils/validation/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: RegisterPayload = await req.json();

  // Validation: Email address valid format
  if (!isValidEmailFormat(body.RegisterEmail)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  // Validation: Password passes the password rules/convention
  if (!passesPasswordRule(body.RegisterPassword)) {
    return NextResponse.json(
      { error: `Password ${PASSWORD_RULE_MESSAGE}` },
      { status: 400 },
    );
  }

  // Validation: Password and confirm passwords the same
  if (body.RegisterPassword !== body.RegisterConfirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 },
    );
  }

  // Validation: Terms and privacy policy must be accepted
  if (!body.RegisterAgreeToTerms) {
    return NextResponse.json(
      { error: "Terms and Conditions must be accepted" },
      { status: 400 },
    );
  }

  if (!body.RegisterAgreeToPrivacy) {
    return NextResponse.json(
      { error: "Privacy Policy must be accepted" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const emailRedirectTo = `${req.nextUrl.origin}/api/auth/confirmed`;
  const { data, error } = await supabase.auth.signUp({
    email: body.RegisterEmail,
    password: body.RegisterPassword,
    options: {
      emailRedirectTo,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(
    { user: { id: data.user?.id, email: data.user?.email } },
    { status: 201 },
  );
}
