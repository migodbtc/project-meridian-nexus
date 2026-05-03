/**
 * MIGRATION NAME       Create Talents Table
 * PURPOSE              Store talent profiles used across the Polaris dashboard.
 *
 * DESCRIPTION
 * The table supports onboarding, active, and offboarded talent states and keeps
 * flexible profile details for the Talent Hub UI. It integrates with user
 * profiles when available and tracks timestamps for auditing.
 */

---! Enums & Types !---
create type talent_status as enum (
	'onboarding',
	'active',
	'paused',
	'offboarded'
);

---! Table Schema !---
create table public.talents (
	id uuid primary key default gen_random_uuid(),
	profile_id uuid references public.profiles(id) on delete set null,
	status talent_status not null default 'onboarding',
	display_name text not null check (char_length(display_name) <= 120),
	headline text check (char_length(headline) <= 120),
	bio text check (char_length(bio) <= 1000),
	location text check (char_length(location) <= 120),
	timezone text not null default 'Asia/Manila' check (char_length(timezone) <= 60),
	primary_role text check (char_length(primary_role) <= 120),
	skills text[] not null default '{}',
	years_experience integer check (years_experience >= 0),
	hourly_rate numeric(10, 2) check (hourly_rate >= 0),
	currency text default 'USD' check (char_length(currency) = 3),
	availability text check (char_length(availability) <= 120),
	is_verified boolean not null default false,
	onboarded_at timestamptz,
	offboarded_at timestamptz,
	created_at timestamptz default now() not null,
	updated_at timestamptz default now() not null
);

---! Indexes !---
create unique index talents_profile_id_key on public.talents(profile_id);
create index talents_status_idx on public.talents(status);

---! Triggers !---
create trigger talents_updated_at before
update on public.talents for each row execute procedure set_updated_at();

---! Table + Column Documentation/Commenting !---
comment on table public.talents is 'Stores talent profiles for the Polaris Talent Hub.';
comment on column public.talents.profile_id is 'Optional link to a user profile if the talent has an auth account.';
comment on column public.talents.status is 'Talent lifecycle state (onboarding, active, paused, offboarded).';
comment on column public.talents.display_name is 'Primary display name used across talent listings.';
comment on column public.talents.headline is 'Short headline or role summary.';
comment on column public.talents.bio is 'Long-form summary used in talent profile views.';
comment on column public.talents.skills is 'Primary skills used for search and filtering.';
