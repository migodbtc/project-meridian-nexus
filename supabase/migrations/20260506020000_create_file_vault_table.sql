/**
 * MIGRATION NAME       Create File Vault Table
 * PURPOSE              Store file vaults and vault files (items) for finalized contracts.
 *
 * DESCRIPTION
 * A contract_vaults record is automatically created when a contract transitions to FINALIZED state.
 * It serves as a central repository for all contract-related files. Vault files track individual
 * uploads with metadata (uploader, file size, category, storage path).
 *
 * Vault files are soft-deleted on vault/contract removal (ON DELETE SET NULL) to preserve
 * audit trails and file records even after contract/vault removal.
 *
 * FORWARD COMPATIBILITY NOTES
 * - The file_category enum is extensible; new categories can be added via ALTER TYPE
 *   in future migrations without schema changes.
 * - The vault_name is mutable, allowing contract-specific labeling without breaking changes.
 * - JSONB metadata field can be added in a future migration to vault_files for flexible
 *   tagging, versioning, or custom attributes without altering the table structure.
 * - The bucket_path column assumes global Supabase storage; multi-bucket strategies can
 *   be added via new columns or enums in future migrations (e.g., 'bucket_name' enum).
 * - The is_active flag allows logical deletion/archiving of vaults without cascading
 *   to vault_files, enabling bulk operations and compliance requirements in future use cases.
 */

---! Guard: required tables must exist !---
do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'contracts'
	) then
		raise exception 'contracts table does not exist — run create_contracts_table migration first';
	end if;
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'auth'
		and table_name = 'users'
	) then
		raise exception 'auth.users table does not exist — Supabase auth must be configured';
	end if;
end $$;

---! Enums & Types !---
-- File category enum; extensible for future types (INVOICE, RECEIPT, PROPOSAL, etc.)
do $$ begin
	create type file_category as enum ('LEGAL_CONTRACT', 'CLIENT_BRAND_ASSET', 'TECHNICAL_PROJECT_SPEC', 'OTHER');
exception
	when duplicate_object then null;
end $$;

---! Table Schema: Contract Vaults !---
-- Each finalized contract has exactly one vault (enforced by trigger).
-- The UNIQUE constraint on contract_id ensures one-to-one mapping.
create table if not exists public.contract_vaults (
	id uuid primary key default gen_random_uuid(),
	contract_id uuid not null unique references public.contracts(id) on delete set null,
	vault_name text not null check (char_length(vault_name) <= 200),
	is_active boolean not null default true,

	-- Timestamps
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

---! Table Schema: Vault Files !---
-- Individual files stored in a vault, with metadata for audit and retrieval.
create table if not exists public.vault_files (
	id uuid primary key default gen_random_uuid(),
	vault_id uuid references public.contract_vaults(id) on delete set null,
	uploader_id uuid references auth.users(id) on delete set null,
	file_name text not null check (char_length(file_name) <= 500),
	file_size bigint check (file_size > 0),
	file_type text check (char_length(file_type) <= 50),
	category file_category not null default 'OTHER',
	bucket_path text not null check (char_length(bucket_path) <= 1000),

	-- Timestamps
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

---! Indexes !---
-- Vault queries
create index contract_vaults_contract_id_idx on public.contract_vaults(contract_id);
create index contract_vaults_is_active_idx on public.contract_vaults(is_active);

-- Vault file queries
create index vault_files_vault_id_idx on public.vault_files(vault_id);
create index vault_files_uploader_id_idx on public.vault_files(uploader_id);
create index vault_files_category_idx on public.vault_files(category);
create index vault_files_created_at_idx on public.vault_files(created_at);

---! Triggers !---
-- Update timestamps on modification
create trigger contract_vaults_updated_at
before update on public.contract_vaults
for each row execute procedure public.set_updated_at();

create trigger vault_files_updated_at
before update on public.vault_files
for each row execute procedure public.set_updated_at();

---! Table + Column Documentation !---
comment on table public.contract_vaults is 'Central repository for files associated with finalized contracts. Created automatically when a contract transitions to FINALIZED state.';
comment on column public.contract_vaults.contract_id is 'Reference to the finalized contract. Each contract has exactly one vault. Nullified if contract is deleted.';
comment on column public.contract_vaults.vault_name is 'Human-readable name for the vault. Typically "Vault for Contract [UUID]" but can be customized.';
comment on column public.contract_vaults.is_active is 'Logical active/inactive flag for vault lifecycle management. Allows archiving without cascading deletes.';

comment on table public.vault_files is 'Individual files stored within a contract vault. Includes metadata for audit, retrieval, and categorization.';
comment on column public.vault_files.vault_id is 'Reference to the parent vault. Nullified if vault is deleted.';
comment on column public.vault_files.uploader_id is 'Reference to the auth user who uploaded the file. Nullified if user is deleted.';
comment on column public.vault_files.file_name is 'Original file name as uploaded by the user.';
comment on column public.vault_files.file_size is 'File size in bytes for storage tracking and quota management.';
comment on column public.vault_files.file_type is 'MIME type of the file (e.g., "application/pdf", "image/png").';
comment on column public.vault_files.category is 'Semantic categorization of the file (LEGAL_CONTRACT, CLIENT_BRAND_ASSET, TECHNICAL_PROJECT_SPEC, OTHER).';
comment on column public.vault_files.bucket_path is 'Full path in Supabase storage bucket (e.g., "contracts/[contract-id]/[file-uuid]").';
