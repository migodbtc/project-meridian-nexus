/**
 * MIGRATION NAME       Create Clients RLS
 * PURPOSE              Row-level security policies for the public.clients table.
 *
 * POLICY PRIORITY ORDER  (mirrors talents RLS pattern)
 *   1. admin / superadmin  — full CRUD on all client rows
 *   2. external_client     — read + update own linked row only (no self-insert/delete)
 *   3. No policy = deny    — enforced by enabled RLS
 *
 * FORWARD COMPATIBILITY NOTES
 * - get_my_role() is defined in create_profile_rls migration; it is stable + security definer.
 * - If an `operations` role ever needs read access, add a separate SELECT policy here
 *   without modifying existing policies (additive, non-breaking).
 * - The `external_client` self-update policy uses both USING and WITH CHECK anchored
 *   to profile_id = auth.uid(), so clients can never update themselves off their own row.
 */

---! Guard: clients table must exist !---
do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'clients'
	) then
		raise exception 'clients table does not exist — run create_clients_table migration first';
	end if;
end $$;

alter table public.clients enable row level security;

-- SELECT: external_client reads own linked record only.
create policy "read: own client profile"
on public.clients for select
to authenticated
using (profile_id = auth.uid());

-- SELECT: admin/superadmin read all client records.
create policy "read: all clients (admin/superadmin)"
on public.clients for select
to authenticated
using (
  get_my_role() in ('admin', 'superadmin')
);

-- INSERT: admin/superadmin create client records.
--   external_client cannot self-register; an admin must onboard them.
create policy "create: new clients (admin/superadmin)"
on public.clients for insert
to authenticated
with check (get_my_role() in ('admin', 'superadmin'));

-- UPDATE: admin/superadmin update any client record.
create policy "update: all clients (admin/superadmin)"
on public.clients for update
to authenticated
using (get_my_role() in ('admin', 'superadmin'))
with check (get_my_role() in ('admin', 'superadmin'));

-- UPDATE: external_client updates own record only.
--   Anchored to profile_id so they cannot reassign themselves.
create policy "update: own client profile"
on public.clients for update
to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

-- DELETE: admin/superadmin only; clients cannot self-delete.
create policy "delete: clients (admin/superadmin)"
on public.clients for delete
to authenticated
using (get_my_role() in ('admin', 'superadmin'));
