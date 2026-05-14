# Project Meridian Nexus (Project North Star)

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.2-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.x-3FCF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.38.0-0055FF?logo=framer&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide%20React-1.8.0-1F2937)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9-F69220?logo=pnpm&logoColor=white)

## Overview
Project North Star is a product case study built around a fictional client, **Meridian Nexus Group Ltd**, a Managed Talent-as-a-Service (TaaS) agency. The narrative centers on the agency’s struggle with fragmented tools that caused financial drift and operational blind spots across a freelancer-driven organization.

## Intent
The intent was to model a unified, cloud-hosted web engine that consolidates the entire freelancer lifecycle into one auditable system — acquisition, onboarding, delivery, and payout — while improving real-time operational visibility.

## What It Was Intended To Become
- **Polaris Engine**, a unified TaaS web platform for daily operations and admin workflows.
- A single financial ledger and reporting layer for auditability and compliance.
- A full public-cloud deployment using Next.js, Supabase, and Vercel for production-ready delivery.

## Project Status
**Discontinued.** Development friction and the increasing difficulty of sustaining momentum over time led to the project being paused indefinitely.

## Tech Stack
### Technologies & Frameworks
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Framer Motion
- Lucide React
- Vercel

### Tools
- GitHub Actions (CI/CD)
- pnpm (package management)
- Supabase CLI (migrations and type generation)

## Project Structure
- `src/app` — App Router routes (home, client brief, architecture, developer page, Polaris auth/dash)
- `src/components` — shared UI components (badges, navigation, tooltips)
- `src/layouts` — layout wrappers for auth/app experiences
- `src/utils` — hooks, validation, toast helpers, Supabase utilities
- `src/middleware` — authentication middleware
- `src/types` — shared TypeScript types
- `src/proxy.ts` — proxy helper utilities
- `supabase/` — Supabase config, migrations, templates, generated types
- `public/` — static imagery and icons
- `.github/workflows` — CI/CD workflows
- `.env.example` — environment variable template
- `doc/` — internal developer documentation (not intended for public distribution)
