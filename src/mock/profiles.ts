/**
 * Mock profile data
 * Corresponds to the profiles table schema
 */

import { Database } from "../../supabase/types/supabase";

type UserRole = Database["public"]["Enums"]["user_role"];
type NameSuffix = Database["public"]["Enums"]["name_suffix"];

export const mockProfiles: Array<{
  id: string;
  role: UserRole;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  suffix: NameSuffix | null;
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
}> = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    role: "talent",
    first_name: "Alice",
    middle_name: "Marie",
    last_name: "Johnson",
    suffix: null,
    username: "alice.johnson",
    phone: "+639171234567",
    birthday: "1990-05-15",
    address_line1: "123 Tech Street",
    address_line2: "Suite 100",
    city: "Manila",
    province: "Metro Manila",
    country: "Philippines",
    bio: "Full-stack developer passionate about scalable systems and user experience design.",
    created_at: "2025-12-01T08:30:00Z",
    updated_at: "2026-05-02T14:20:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    role: "external_client",
    first_name: "Bob",
    middle_name: null,
    last_name: "Smith",
    suffix: null,
    username: "bob.smith",
    phone: "+639189876543",
    birthday: "1985-03-22",
    address_line1: "456 Business Avenue",
    address_line2: null,
    city: "Cebu",
    province: "Cebu",
    country: "Philippines",
    bio: "Product manager focused on enterprise solutions.",
    created_at: "2025-11-15T10:45:00Z",
    updated_at: "2026-05-02T09:15:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    role: "operations",
    first_name: "Carol",
    middle_name: "Elizabeth",
    last_name: "Williams",
    suffix: null,
    username: "carol.williams",
    phone: "+639155555555",
    birthday: "1988-07-10",
    address_line1: "789 Operations Lane",
    address_line2: null,
    city: "Davao",
    province: "Davao del Sur",
    country: "Philippines",
    bio: "Operations lead dedicated to process optimization and team efficiency.",
    created_at: "2025-10-20T13:00:00Z",
    updated_at: "2026-04-28T16:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    role: "admin",
    first_name: "David",
    middle_name: "James",
    last_name: "Brown",
    suffix: "Jr.",
    username: "david.brown",
    phone: "+639161111111",
    birthday: "1992-11-08",
    address_line1: "321 Admin Plaza",
    address_line2: "Floor 5",
    city: "Quezon City",
    province: "Metro Manila",
    country: "Philippines",
    bio: "System administrator and infrastructure specialist.",
    created_at: "2025-09-05T11:20:00Z",
    updated_at: "2026-05-01T12:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    role: "guest",
    first_name: null,
    middle_name: null,
    last_name: null,
    suffix: null,
    username: null,
    phone: null,
    birthday: null,
    address_line1: null,
    address_line2: null,
    city: null,
    province: null,
    country: "Philippines",
    bio: null,
    created_at: "2026-05-03T08:00:00Z",
    updated_at: "2026-05-03T08:00:00Z",
  },
];

export type MockProfile = (typeof mockProfiles)[number];
