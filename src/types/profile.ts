export type UserRole =
  | "guest"
  | "talent"
  | "external_client"
  | "operations"
  | "finance"
  | "admin"
  | "superadmin";

export interface ProfileRecord {
  id: string;
  role: UserRole;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  suffix: string | null;
  username: string | null;
  phone: string | null;
  birthday: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  bio: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type ProfileResponse = ProfileRecord & {
  email: string;
};

export interface ProfileUpdatePayload {
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  phone?: string | null;
  birthday?: string | null;
  bio?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  province?: string | null;
  country?: string | null;
}
