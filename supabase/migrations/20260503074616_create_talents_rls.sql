do $$ begin
	if not exists (
		select 1 from information_schema.tables
		where table_schema = 'public'
		and table_name = 'talents'
	) then
		raise exception 'talents table does not exist - run create_talents_table migration first';
	end if;
end $$;

alter table public.talents enable row level security;

-- Generic CRUD policies: all vs own data access.
-- SELECT: talents read own; admin/superadmin/operations/finance read all.
create policy "read: own talent profile"
on public.talents for select
to authenticated
using (profile_id = auth.uid());

create policy "read: all talents (admin/superadmin)"
on public.talents for select
to authenticated
using (
  get_my_role() in ('admin', 'superadmin')
);

-- INSERT: admins, superadmin, and operations can create new talent records.
create policy "create: new talents (admin/superadmin)"
on public.talents for insert
to authenticated
with check (get_my_role() in ('admin', 'superadmin'));

-- UPDATE: admins/superadmin can update all; talents can update their own profile link only.
create policy "update: all talents (admin)"
on public.talents for update
to authenticated
using (get_my_role() in ('admin', 'superadmin'))
with check (get_my_role() in ('admin', 'superadmin'));

create policy "update: own talent profile"
on public.talents for update
to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

-- DELETE: admins and superadmin can delete any talent; talents cannot self-delete.
create policy "delete: talents (admin/superadmin)"
on public.talents for delete
to authenticated
using (get_my_role() in ('admin', 'superadmin'));
