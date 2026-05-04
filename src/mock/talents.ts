/**
 * Mock talent data
 * Corresponds to the talents table schema
 */

import { Database } from "../../supabase/types/supabase";

type TalentStatus = Database["public"]["Enums"]["talent_status"];

export const mockTalents: Array<{
  id: string;
  profile_id: string | null;
  status: TalentStatus;
  display_name: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  timezone: string;
  primary_role: string | null;
  skills: string[];
  years_experience: number | null;
  hourly_rate: number | null;
  currency: string | null;
  availability: string | null;
  is_verified: boolean;
  onboarded_at: string | null;
  offboarded_at: string | null;
  created_at: string;
  updated_at: string;
}> = [
  {
    id: "talent-001-550e8400-e29b-41d4-a716",
    profile_id: "550e8400-e29b-41d4-a716-446655440001",
    status: "active",
    display_name: "Alice Johnson",
    headline: "Senior Full-Stack Developer",
    bio: "Experienced full-stack developer with expertise in React, Node.js, and cloud infrastructure. Passionate about building scalable applications and mentoring junior developers.",
    location: "Manila, Philippines",
    timezone: "Asia/Manila",
    primary_role: "Full-Stack Engineer",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Next.js",
    ],
    years_experience: 8,
    hourly_rate: 75.0,
    currency: "USD",
    availability: "Full-time, 40+ hours/week",
    is_verified: true,
    onboarded_at: "2025-12-15T10:00:00Z",
    offboarded_at: null,
    created_at: "2025-12-01T08:30:00Z",
    updated_at: "2026-05-02T14:20:00Z",
  },
  {
    id: "talent-002-550e8400-e29b-41d4-a716",
    profile_id: null,
    status: "onboarding",
    display_name: "Elena Rodriguez",
    headline: "UX/UI Designer",
    bio: "Creative designer focused on user-centered design and modern web interfaces. Experienced with Figma, Adobe Suite, and design systems.",
    location: "Barcelona, Spain",
    timezone: "Europe/Madrid",
    primary_role: "UI/UX Designer",
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Adobe XD",
      "Design Systems",
      "CSS",
    ],
    years_experience: 6,
    hourly_rate: 65.0,
    currency: "USD",
    availability: "Part-time, 20-30 hours/week",
    is_verified: false,
    onboarded_at: null,
    offboarded_at: null,
    created_at: "2026-04-15T12:00:00Z",
    updated_at: "2026-05-02T09:30:00Z",
  },
  {
    id: "talent-003-550e8400-e29b-41d4-a716",
    profile_id: null,
    status: "active",
    display_name: "Marcus Chen",
    headline: "Backend Engineer & DevOps Specialist",
    bio: "Specialized in building robust backend systems and managing cloud infrastructure. Expertise in microservices, Kubernetes, and CI/CD pipelines.",
    location: "Singapore",
    timezone: "Asia/Singapore",
    primary_role: "Backend Engineer",
    skills: [
      "Python",
      "Go",
      "Kubernetes",
      "AWS",
      "Jenkins",
      "PostgreSQL",
      "Redis",
      "Microservices",
    ],
    years_experience: 10,
    hourly_rate: 85.0,
    currency: "USD",
    availability: "Full-time, 40+ hours/week",
    is_verified: true,
    onboarded_at: "2026-01-10T08:00:00Z",
    offboarded_at: null,
    created_at: "2025-11-20T14:00:00Z",
    updated_at: "2026-05-01T11:00:00Z",
  },
  {
    id: "talent-004-550e8400-e29b-41d4-a716",
    profile_id: null,
    status: "paused",
    display_name: "Sophia Nakamura",
    headline: "Marketing & Growth Strategist",
    bio: "Results-driven marketing professional with focus on digital strategy and growth hacking. Experience in SEO, content marketing, and analytics.",
    location: "Tokyo, Japan",
    timezone: "Asia/Tokyo",
    primary_role: "Marketing Manager",
    skills: [
      "Digital Marketing",
      "SEO",
      "Content Strategy",
      "Google Analytics",
      "Growth Hacking",
      "Social Media",
    ],
    years_experience: 7,
    hourly_rate: 55.0,
    currency: "USD",
    availability: "On hold - available from June",
    is_verified: true,
    onboarded_at: "2025-08-05T09:00:00Z",
    offboarded_at: null,
    created_at: "2025-08-01T10:00:00Z",
    updated_at: "2026-04-20T16:00:00Z",
  },
  {
    id: "talent-005-550e8400-e29b-41d4-a716",
    profile_id: null,
    status: "offboarded",
    display_name: "James Wilson",
    headline: "Senior QA Engineer (Former)",
    bio: "Quality assurance specialist with expertise in test automation and manual testing. Previously contributed to multiple projects.",
    location: "London, UK",
    timezone: "Europe/London",
    primary_role: "QA Engineer",
    skills: [
      "Selenium",
      "Jest",
      "Manual Testing",
      "Test Automation",
      "Jira",
      "Cypress",
    ],
    years_experience: 9,
    hourly_rate: 70.0,
    currency: "USD",
    availability: null,
    is_verified: true,
    onboarded_at: "2024-06-01T08:00:00Z",
    offboarded_at: "2026-03-31T17:00:00Z",
    created_at: "2024-06-01T08:00:00Z",
    updated_at: "2026-03-31T17:00:00Z",
  },
  {
    id: "talent-006-550e8400-e29b-41d4-a716",
    profile_id: "550e8400-e29b-41d4-a716-446655440002",
    status: "active",
    display_name: "Bob Smith",
    headline: "Project Manager & Consultant",
    bio: "Experienced project manager specializing in Agile methodologies and cross-functional team coordination. Skilled in stakeholder management and delivery excellence.",
    location: "Cebu, Philippines",
    timezone: "Asia/Manila",
    primary_role: "Project Manager",
    skills: [
      "Agile",
      "Scrum",
      "Jira",
      "Stakeholder Management",
      "Risk Management",
      "Team Leadership",
    ],
    years_experience: 11,
    hourly_rate: 70.0,
    currency: "USD",
    availability: "Full-time, 40+ hours/week",
    is_verified: true,
    onboarded_at: "2026-02-01T09:00:00Z",
    offboarded_at: null,
    created_at: "2025-10-15T13:00:00Z",
    updated_at: "2026-05-02T10:00:00Z",
  },
];

export type MockTalent = (typeof mockTalents)[number];
