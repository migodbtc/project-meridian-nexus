"use server";

import { AppSuspense } from "@/components/AppSuspense";
import { Suspense } from "react";
import { OnboardingPageClient } from "./_components/PageClient";
import { showSuccessToast } from "@/utils/toast";
import { createClient } from "@/utils/supabase/server";
import {
  isValidEmailFormat,
  passesPasswordRule,
} from "@/utils/validation/auth";
import { createAdminClient } from "@/utils/supabase/admin";

// OnboardingPayload: interface made in order to define all necessary components of the payload
// regarding onboarding of talents to be used by the server actions.
export interface OnboardingPayload {
  // Auth
  emailAddress: string;
  password: string;
  confirmPassword: string;

  // Profile
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  username: string;
  phone: string;
  birthday: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  bio: string;

  // Talent
  headline: string;
  primaryRole: string;
  hourlyRate: number;
  currency: string;
  skills: string[];
  yearsExperience: number;
  availability: string;
  talentBio: string;
  timezone: string;
}

// storeTalent: takes the payload as an input and parses it into the database after validation + checks
// taken from laravel nomenclature of resource controllers i.e. create/store/index/show ec
// page.tsx
export async function storeTalent(payload: OnboardingPayload) {
  // storeTalent/validation/requiredFields: mirror client-side mandatory inputs
  const requiredFields: (keyof OnboardingPayload)[] = [
    "emailAddress",
    "password",
    "firstName",
    "lastName",
    "username",
    "phone",
    "addressLine1",
    "city",
    "province",
    "country",
    "headline",
    "primaryRole",
    "hourlyRate",
    "availability",
  ];

  for (const field of requiredFields) {
    if (!payload[field] || String(payload[field]).trim() === "") {
      throw new Error(`Validation Error: ${field} is required.`);
    }
  }

  // storeTalent/validation/format: verify email and password complexity rules
  if (!isValidEmailFormat(payload.emailAddress)) {
    throw new Error("Invalid email format.");
  }

  if (!passesPasswordRule(payload.password)) {
    throw new Error("Password does not meet security requirements.");
  }

  // storeTalent/validation/heterogenousPasswords: cross-check password matching
  if (payload.password !== payload.confirmPassword) {
    throw new Error("Validation Error: Passwords do not match.");
  }

  // storeTalent/supabase/connect: initialize server-side client
  const supabase = await createAdminClient();

  // storeTalent/supabase/availability: check for existing unique identifiers
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", payload.username)
    .single();

  if (existingUser) {
    throw new Error("Validation Error: Username is already taken.");
  }

  // storeTalent/supabase/auth: create user in auth.users
  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email: payload.emailAddress,
      password: payload.password,
    });

  if (authError || !authData.user)
    throw new Error(`Auth: ${authError?.message}`);
  const userId = authData.user.id;

  // storeTalent/supabase/profile: create public.profiles entry
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    first_name: payload.firstName,
    middle_name: payload.middleName,
    last_name: payload.lastName,
    suffix: payload.suffix as any,
    username: payload.username,
    phone: payload.phone,
    birthday: payload.birthday || null,
    address_line1: payload.addressLine1,
    address_line2: payload.addressLine2,
    city: payload.city,
    province: payload.province,
    country: payload.country,
    role: "talent",
    bio: payload.bio,
  });

  if (profileError) throw new Error(`Profile: ${profileError.message}`);

  // storeTalent/supabase/talent: create talents entry with derived fields
  const { error: talentError } = await supabase.from("talents").insert({
    profile_id: userId,
    display_name: `${payload.firstName} ${payload.lastName}`,
    headline: payload.headline,
    bio: payload.talentBio,
    location: `${payload.city}, ${payload.country}`,
    timezone: payload.timezone || "Asia/Manila",
    primary_role: payload.primaryRole,
    skills: payload.skills,
    years_experience: Number(payload.yearsExperience),
    hourly_rate: Number(payload.hourlyRate),
    currency: payload.currency || "USD",
    availability: payload.availability,
    status: "onboarding",
    onboarded_at: new Date().toISOString(),
  });

  if (talentError) throw new Error(`Talent: ${talentError.message}`);

  return { success: true };
}

export default async function TalentOnboardingPage() {
  return (
    <Suspense fallback={<AppSuspense />}>
      <OnboardingPageClient />
    </Suspense>
  );
}
