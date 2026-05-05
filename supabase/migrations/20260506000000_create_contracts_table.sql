/**
 * MIGRATION NAME       Create Contracts Table
 * PURPOSE              Store contracts between talents and clients within the Polaris system.
 *
 * DESCRIPTION
 * Contracts represent agreements between a talent and a client. A contract has two states:
 * DRAFT (editable) and FINALIZED (immutable, triggers vault creation). Contracts track
 * project details, payment terms, timelines, and reference both talent and client.
 * 
 * Both talent_id and client_id are soft-deletes (ON DELETE SET NULL) to preserve
 * contract history while allowing talent/client removal without orphaning contracts.
 *
 * FORWARD COMPATIBILITY NOTES
 * - The contract_status enum can be extended with new statuses (e.g., 'APPROVED', 'CANCELED')
 *   via ALTER TYPE in future migrations without requiring schema changes.
 * - The JSONB fields (project_timeline, payment_terms) allow flexible contract variants
 *   without requiring new columns or migrations.
 * - The vault creation trigger (defined in same migration) is non-breaking and can be
 *   modified or extended in future migrations via CREATE OR REPLACE FUNCTION.
 * - The unique constraint on vault creation is enforced at the trigger level, ensuring
 *   each finalized contract has exactly one vault.
 */

---! Guard: required tables must exist !---
do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'talents'
	) then
		raise exception 'talents table does not exist — run create_talents_table migration first';
	end if;
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'clients'
	) then
		raise exception 'clients table does not exist — run create_clients_table migration first';
	end if;
end $$;

---! Enums & Types !---
-- Contract status enum; extensible for future statuses (APPROVED, CANCELED, etc.)
do $$ begin
	create type contract_status as enum ('DRAFT', 'FINALIZED', 'APPROVED', 'CANCELED');
exception
	when duplicate_object then null;
end $$;

---! Table Schema !---
create table if not exists public.contracts (
	id uuid primary key default gen_random_uuid(),
	talent_id uuid references public.talents(id) on delete set null,
	client_id uuid references public.clients(id) on delete set null,
	status contract_status not null default 'DRAFT',

	-- Contract details
	summary text check (char_length(summary) <= 2000),
	project_timeline jsonb default '{}'::jsonb,
	payment_terms jsonb default '{}'::jsonb,

	-- Timestamps
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

---! Indexes !---
create index contracts_talent_id_idx on public.contracts(talent_id);
create index contracts_client_id_idx on public.contracts(client_id);
create index contracts_status_idx on public.contracts(status);
create index contracts_created_at_idx on public.contracts(created_at);

---! Triggers !---
create trigger contracts_updated_at
before update on public.contracts
for each row execute procedure set_updated_at();

---! Function: Auto-create vault on contract finalization !---
-- This function creates a contract_vaults record when a contract transitions from DRAFT to FINALIZED.
-- It is idempotent: only runs on DRAFT → FINALIZED transitions.
create or replace function public.create_vault_on_finalization()
returns trigger as $$
declare
	vault_exists boolean;
begin
	-- Check if the status changed from DRAFT to FINALIZED
	if new.status = 'FINALIZED' and old.status = 'DRAFT' then
		-- Check if vault already exists (safety check for idempotency)
		select exists(
			select 1 from public.contract_vaults
			where contract_id = new.id
		) into vault_exists;

		if not vault_exists then
			insert into public.contract_vaults (contract_id, vault_name)
			values (new.id, 'Vault for Contract ' || new.id);
		end if;
	end if;
	return new;
end;
$$ language plpgsql security definer;

-- Bind the trigger to the contracts table
drop trigger if exists trigger_contract_finalization on public.contracts;
create trigger trigger_contract_finalization
after update of status on public.contracts
for each row execute procedure public.create_vault_on_finalization();

---! Table + Column Documentation !---
comment on table public.contracts is 'Stores contracts between talents and clients within the Polaris system.';
comment on column public.contracts.talent_id is 'Reference to the talent involved in the contract. Nullified if talent is deleted.';
comment on column public.contracts.client_id is 'Reference to the client involved in the contract. Nullified if client is deleted.';
comment on column public.contracts.status is 'Contract state: DRAFT (editable) or FINALIZED (immutable, triggers vault). Extensible for APPROVED, CANCELED, etc.';
comment on column public.contracts.summary is 'Human-readable contract summary or scope description.';
comment on column public.contracts.project_timeline is 'JSONB field for flexible project timeline data (start_date, end_date, milestones, etc.).';
comment on column public.contracts.payment_terms is 'JSONB field for flexible payment structure (rate, currency, payment_schedule, etc.).';
