/**
 * MIGRATION NAME       Create File Vault RLS
 * PURPOSE              Row-level security policies for contract_vaults and vault_files tables.
 *
 * POLICY PRIORITY ORDER (mirrors contract RLS pattern)
 *   1. admin / superadmin  — full CRUD on all vaults and files
 *   2. talent             — read vaults/files for their own contracts; no write access
 *   3. external_client    — read vaults/files for their assigned contracts; no write access
 *   4. No policy = deny   — enforced by enabled RLS
 *
 * FORWARD COMPATIBILITY NOTES
 * - get_my_role() is defined in create_profile_rls; it is stable + security definer.
 * - File upload/delete operations can be granted to talents/clients in future migrations
 *   via new INSERT/DELETE policies without modifying existing policies (additive).
 * - The CTE-based access check (user_contract_vaults CTE) is reusable and can be
 *   extended to include additional role types (e.g., 'finance', 'operations') as needed.
 * - Audit logging can be added to vault_files via a trigger in a future migration without
 *   affecting these RLS policies.
 */

---! Guard: tables must exist !---
do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'contract_vaults'
	) then
		raise exception 'contract_vaults table does not exist — run create_contract_vaults_table migration first';
	end if;
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'vault_files'
	) then
		raise exception 'vault_files table does not exist — run create_contract_vaults_table migration first';
	end if;
end $$;

---! Enable RLS on both tables !---
alter table public.contract_vaults enable row level security;
alter table public.vault_files enable row level security;

/**
 * Helper CTE-based policies for contract vault access control.
 * Vaults are accessible to:
 *   1. Talents who are party to the contract
 *   2. Clients assigned to the contract or linked to it
 *   3. Admins/superadmins (full access)
 */

---! contract_vaults: SELECT Policies !---
-- SELECT: talent reads vaults for contracts they are party to
create policy "read: own talent contract vaults"
on public.contract_vaults for select
to authenticated
using (
	contract_id in (
		select id from public.contracts
		where talent_id = (select id from public.talents where profile_id = auth.uid())
	)
);

-- SELECT: client reads vaults for contracts they are party to
create policy "read: own client contract vaults"
on public.contract_vaults for select
to authenticated
using (
	contract_id in (
		select id from public.contracts
		where client_id = (select id from public.clients where profile_id = auth.uid())
	)
);

-- SELECT: admin/superadmin read all vaults
create policy "read: all contract vaults (admin/superadmin)"
on public.contract_vaults for select
to authenticated
using (
	get_my_role() in ('admin', 'superadmin')
);

---! contract_vaults: INSERT Policies !---
-- INSERT: admin/superadmin create vaults (though vaults are primarily auto-created)
create policy "create: new contract vaults (admin/superadmin)"
on public.contract_vaults for insert
to authenticated
with check (
	get_my_role() in ('admin', 'superadmin')
);

---! contract_vaults: UPDATE Policies !---
-- UPDATE: admin/superadmin update any vault
create policy "update: all contract vaults (admin/superadmin)"
on public.contract_vaults for update
to authenticated
using (get_my_role() in ('admin', 'superadmin'))
with check (get_my_role() in ('admin', 'superadmin'));

-- Note: talent/client cannot update vaults (read-only access)

---! contract_vaults: DELETE Policies !---
-- DELETE: admin/superadmin delete vaults
create policy "delete: contract vaults (admin/superadmin)"
on public.contract_vaults for delete
to authenticated
using (get_my_role() in ('admin', 'superadmin'));

---! vault_files: SELECT Policies !---
-- SELECT: talent reads files in vaults for contracts they are party to
create policy "read: own talent vault files"
on public.vault_files for select
to authenticated
using (
	vault_id in (
		select id from public.contract_vaults
		where contract_id in (
			select id from public.contracts
			where talent_id = (select id from public.talents where profile_id = auth.uid())
		)
	)
);

-- SELECT: client reads files in vaults for contracts they are party to
create policy "read: own client vault files"
on public.vault_files for select
to authenticated
using (
	vault_id in (
		select id from public.contract_vaults
		where contract_id in (
			select id from public.contracts
			where client_id = (select id from public.clients where profile_id = auth.uid())
		)
	)
);

-- SELECT: admin/superadmin read all vault files
create policy "read: all vault files (admin/superadmin)"
on public.vault_files for select
to authenticated
using (
	get_my_role() in ('admin', 'superadmin')
);

---! vault_files: INSERT Policies !---
-- INSERT: admin/superadmin create vault files
create policy "create: new vault files (admin/superadmin)"
on public.vault_files for insert
to authenticated
with check (
	get_my_role() in ('admin', 'superadmin')
);

-- Future: talent/client file uploads can be enabled via additional INSERT policies
-- (e.g., "create: own vault files (talent)" when uploader_id = auth.uid())

---! vault_files: UPDATE Policies !---
-- UPDATE: admin/superadmin update any vault file
create policy "update: all vault files (admin/superadmin)"
on public.vault_files for update
to authenticated
using (get_my_role() in ('admin', 'superadmin'))
with check (get_my_role() in ('admin', 'superadmin'));

-- Note: talent/client cannot update vault files (read-only access)

---! vault_files: DELETE Policies !---
-- DELETE: admin/superadmin delete vault files
create policy "delete: vault files (admin/superadmin)"
on public.vault_files for delete
to authenticated
using (get_my_role() in ('admin', 'superadmin'));

-- Future: talent/client self-delete can be enabled via additional DELETE policies
-- (e.g., "delete: own vault files (talent)" when uploader_id = auth.uid())
