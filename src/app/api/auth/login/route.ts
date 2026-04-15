import { LoginPayload } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { isValidEmailFormat } from "@/utils/validation/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: LoginPayload = await req.json();

  // Validation: Email address valid format
  if (!isValidEmailFormat(body.LoginEmail)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.LoginEmail,
    password: body.LoginPassword,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json(
    { user: { id: data.user?.id, email: data.user?.email } },
    { status: 200 },
  );
}
