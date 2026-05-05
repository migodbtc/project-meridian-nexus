/**
 * MIGRATION NAME       Create Contracts RLS
 * PURPOSE              Row-level security policies for the public.contracts table.
 *
 * POLICY PRIORITY ORDER
 *   1. admin / superadmin  — full CRUD on all contracts
 *   2. talent             — read own contracts (talent_id = profile_id); no write access
 *   3. external_client    — read own contracts (client_id linked profile); no write access
 *   4. No policy = deny   — enforced by enabled RLS
 *
 * FORWARD COMPATIBILITY NOTES
 * - get_my_role() is defined in create_profile_rls; it is stable + security definer.
 * - Additional roles (e.g., 'finance', 'operations') can be granted read access via
 *   new SELECT policies without modifying existing policies (additive, non-breaking).
 * - Client self-read access is anchored via talent/client profile links, ensuring
 *   proper multi-tenancy isolation even as the client table evolves.
 */

---! Guard: contracts table must exist !---
do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'contracts'
	) then
		raise exception 'contracts table does not exist — run create_contracts_table migration first';
	end if;
end $$;

alter table public.contracts enable row level security;

---! SELECT Policies !---
-- SELECT: talent reads contracts they are party to
create policy "read: own talent contracts"
on public.contracts for select
to authenticated
using (
	talent_id = (select id from public.talents where profile_id = auth.uid())
);

-- SELECT: client reads contracts they are party to (via their assigned talent link or client profile link)
-- A client can see a contract if:
--   1. The contract's client_id matches a client record where profile_id = auth.uid(), OR
--   2. The contract's talent_id is assigned to a client where profile_id = auth.uid()
create policy "read: own client contracts"
on public.contracts for select
to authenticated
using (
	client_id = (select id from public.clients where profile_id = auth.uid())
	or
	talent_id in (
		select assigned_talent_id from public.clients
		where profile_id = auth.uid() and assigned_talent_id is not null
	)
);

-- SELECT: admin/superadmin read all contracts
create policy "read: all contracts (admin/superadmin)"
on public.contracts for select
to authenticated
using (
	get_my_role() in ('admin', 'superadmin')
);

---! INSERT Policies !---
-- INSERT: admin/superadmin create new contracts
create policy "create: new contracts (admin/superadmin)"
on public.contracts for insert
to authenticated
with check (
	get_my_role() in ('admin', 'superadmin')
);

---! UPDATE Policies !---
-- UPDATE: admin/superadmin can update any contract
create policy "update: all contracts (admin/superadmin)"
on public.contracts for update
to authenticated
using (get_my_role() in ('admin', 'superadmin'))
with check (get_my_role() in ('admin', 'superadmin'));

-- UPDATE: talent/client cannot update (read-only access)
-- Note: RLS denies by default; no policy = no update access for non-admins

---! DELETE Policies !---
-- DELETE: admin/superadmin delete contracts
create policy "delete: contracts (admin/superadmin)"
on public.contracts for delete
to authenticated
using (get_my_role() in ('admin', 'superadmin'));
