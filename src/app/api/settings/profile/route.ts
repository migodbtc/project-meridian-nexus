import { createClient } from "@/utils/supabase/server";
import {
  ProfileRecord,
  ProfileResponse,
  ProfileUpdatePayload,
} from "@/types/profile";
import { NextRequest, NextResponse } from "next/server";

const NAME_REGEX = /^[a-zA-Z\s'\-]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{1,20}$/;
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function toProfileResponse(
  profile: ProfileRecord,
  email: string,
): ProfileResponse {
  return {
    ...profile,
    email,
  };
}

function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function validatePatchBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return {
      ok: false as const,
      errors: ["Invalid request body"],
    };
  }

  const raw = body as Record<string, unknown>;
  const payload: ProfileUpdatePayload = {
    first_name: normalizeOptionalText(raw.first_name),
    middle_name: normalizeOptionalText(raw.middle_name),
    last_name: normalizeOptionalText(raw.last_name),
    username: normalizeOptionalText(raw.username),
    phone: normalizeOptionalText(raw.phone),
    birthday: normalizeOptionalText(raw.birthday),
    bio: normalizeOptionalText(raw.bio),
    address_line1: normalizeOptionalText(raw.address_line1),
    address_line2: normalizeOptionalText(raw.address_line2),
    city: normalizeOptionalText(raw.city),
    province: normalizeOptionalText(raw.province),
    country: normalizeOptionalText(raw.country),
  };

  const errors: string[] = [];

  if (payload.first_name && !NAME_REGEX.test(payload.first_name)) {
    errors.push("First name contains invalid characters");
  }

  if (payload.middle_name && !NAME_REGEX.test(payload.middle_name)) {
    errors.push("Middle name contains invalid characters");
  }

  if (payload.last_name && !NAME_REGEX.test(payload.last_name)) {
    errors.push("Last name contains invalid characters");
  }

  if (payload.username && !USERNAME_REGEX.test(payload.username)) {
    errors.push(
      "Username must be 1-20 characters and can contain letters, numbers, dots, underscores, and hyphens",
    );
  }

  if (payload.phone && !PHONE_REGEX.test(payload.phone)) {
    errors.push("Phone must be 7-15 digits and may start with +");
  }

  if (payload.birthday && !DATE_REGEX.test(payload.birthday)) {
    errors.push("Birthday must be in YYYY-MM-DD format");
  }

  if (payload.bio && payload.bio.length > 250) {
    errors.push("Bio must be 250 characters or fewer");
  }

  if (payload.address_line1 && payload.address_line1.length > 100) {
    errors.push("Address line 1 must be 100 characters or fewer");
  }

  if (payload.address_line2 && payload.address_line2.length > 100) {
    errors.push("Address line 2 must be 100 characters or fewer");
  }

  if (payload.city && payload.city.length > 100) {
    errors.push("City must be 100 characters or fewer");
  }

  if (payload.province && payload.province.length > 100) {
    errors.push("Province must be 100 characters or fewer");
  }

  if (payload.country && payload.country.length > 100) {
    errors.push("Country must be 100 characters or fewer");
  }

  if (errors.length > 0) {
    return {
      ok: false as const,
      errors,
    };
  }

  return {
    ok: true as const,
    payload,
  };
}

export async function GET() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profileRows, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .limit(1);

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 403 },
      );
    }

    let profile = profileRows?.[0];

    if (!profile) {
      // Backfill for legacy users who predate the profile trigger.
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: user.id });

      if (insertError) {
        return NextResponse.json(
          {
            error:
              "Profile row is missing and auto-backfill is blocked by current RLS policies. Apply the latest profile RLS patch migration and retry.",
          },
          { status: 403 },
        );
      }

      const { data: retryRows, error: retryError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .limit(1);

      if (retryError) {
        return NextResponse.json(
          { error: retryError.message },
          { status: 403 },
        );
      }

      profile = retryRows?.[0];
    }

    if (!profile) {
      return NextResponse.json(
        {
          error:
            "Profile not found or not readable for this account role. Please contact an administrator.",
        },
        { status: 404 },
      );
    }

    const response = toProfileResponse(profile, user.email || "");

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const validation = validatePatchBody(await request.json());

    if (!validation.ok) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, errors: ["Unauthorized"] },
        { status: 401 },
      );
    }

    const { data: updatedRows, error: updateError } = await supabase
      .from("profiles")
      .update(validation.payload)
      .eq("id", user.id)
      .select("*")
      .limit(1);

    if (updateError) {
      return NextResponse.json(
        { success: false, errors: [updateError.message] },
        { status: 400 },
      );
    }

    const updatedProfile = updatedRows?.[0];

    if (!updatedProfile) {
      return NextResponse.json(
        {
          success: false,
          errors: [
            "Profile could not be updated. Ensure your role has profile access.",
          ],
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        profile: toProfileResponse(updatedProfile, user.email || ""),
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, errors: ["Internal server error"] },
      { status: 500 },
    );
  }
}
