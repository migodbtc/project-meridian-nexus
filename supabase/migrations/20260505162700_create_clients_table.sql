/**
 * MIGRATION NAME       Create Clients Table
 * PURPOSE              Store client profiles that commission contracts within the Polaris system.
 *
 * DESCRIPTION
 * Clients are external stakeholders (role: external_client) who are assigned to talents
 * and are responsible for issuing contracts to be commissioned. Commissions occur between
 * both individuals (person-to-person) and companies (person-to-company), so clients carry
 * an explicit `client_type` to distinguish the two. A client record may be linked to an
 * authenticated user profile when the client has an account in the system, or exist as an
 * unlinked record managed entirely by admins.
 *
 * FORWARD COMPATIBILITY NOTES
 * - The `client_status` enum is designed for extensibility; new statuses can be added
 *   via ALTER TYPE without touching this file.
 * - The nullable `profile_id` allows clients without accounts to be onboarded first
 *   and linked later without requiring a schema change.
 * - Talent-to-client relationships are now exclusively managed via the contracts table.
 *   This eliminates redundancy and ensures all collaborations are contractually tracked.
 */

---! Guard: profiles table must exist (get_my_role() + profile_id FK) !---
do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'profiles'
	) then
		raise exception 'profiles table does not exist — run create_profiles_table migration first';
	end if;
end $$;

---! Enums & Types !---
create type client_status as enum (
	'pending',
	'active',
	'inactive',
	'archived'
);

create type client_type as enum (
	'individual',  -- person-to-person: the client is a natural person
	'company'      -- person-to-company: the client represents an organization
);

---! Table Schema !---
create table public.clients (
	id                uuid          primary key default gen_random_uuid(),
	profile_id        uuid          references public.profiles(id) on delete set null,
	status            client_status not null default 'pending',
	type              client_type   not null default 'individual',

	-- Display identity
	display_name      text          not null check (char_length(display_name) <= 120),
	company_name      text          check (char_length(company_name) <= 120),
	contact_email     text          not null check (contact_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
	contact_phone     text          check (contact_phone ~ '^\+?[0-9]{7,15}$'),

	-- Address
	address_line1     text          check (char_length(address_line1) <= 100),
	address_line2     text          check (char_length(address_line2) <= 100),
	city              text          check (char_length(city) <= 100),
	province          text          check (char_length(province) <= 100),
	country           text          default 'Philippines' check (char_length(country) <= 100),

	-- Notes / metadata
	notes             text          check (char_length(notes) <= 1000),

	-- Constraints
	-- company_name is required when the client type is 'company'
	constraint clients_company_name_required
		check (type = 'individual' or company_name is not null),

	-- Timestamps
	created_at        timestamptz   not null default now(),
	updated_at        timestamptz   not null default now()
);

---! Indexes !---
-- One auth account → one client record
create unique index clients_profile_id_key on public.clients(profile_id)
	where profile_id is not null;
create index clients_status_idx      on public.clients(status);

---! Triggers !---
create trigger clients_updated_at
before update on public.clients
for each row execute procedure set_updated_at();

---! Table + Column Documentation/Commenting !---
comment on table  public.clients                      is 'Stores client profiles that commission contracts within the Polaris system.';
comment on column public.clients.profile_id           is 'Optional link to an authenticated user profile (external_client role). Null for unlinked/admin-managed clients.';
comment on column public.clients.status               is 'Client lifecycle state: pending, active, inactive, archived.';
comment on column public.clients.type                 is 'Client kind: individual (person-to-person) or company (person-to-company). Determines whether company_name is required.';
comment on column public.clients.display_name         is 'Primary display name used across client listings and contract views.';
comment on column public.clients.company_name         is 'Optional company or organization name for the client.';
comment on column public.clients.contact_email        is 'Primary contact email address for this client record.';
comment on column public.clients.notes                is 'Internal admin notes about the client, not visible to the client.';
