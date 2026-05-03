do $$ begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public'
    and table_name = 'profiles'
  ) then
    raise exception 'profiles table does not exist — run create_profiles_table migration first';
  end if;
end $$;

alter table profiles enable row level security;

create or replace function get_my_role()
returns user_role as $$
  select role from profiles where id = auth.uid();
$$ language sql security definer stable;

-- Generic CRUD policies: all vs own data access.
-- SELECT: everyone reads own; admin/superadmin/operations/finance read all.
create policy "read: own profile"
on profiles for select
using (id = auth.uid());

create policy "read: all profiles (admin/superadmin)"
on profiles for select
using (
  get_my_role() in ('admin', 'superadmin')
);

-- INSERT: users can backfill their own profile as guest.
create policy "create: own profile as guest"
on profiles for insert
with check (id = auth.uid() and role = 'guest'::user_role);

-- UPDATE: everyone updates their own (with role preservation); admin updates any.
create policy "update: own profile"
on profiles for update
using (id = auth.uid())
with check (role = get_my_role());

create policy "update: all profiles (admin/superadmin)"
on profiles for update
using (get_my_role() in ('admin', 'superadmin'))
with check (get_my_role() in ('admin', 'superadmin'));

-- DELETE: admin/superadmin only.
create policy "delete: profiles (admin/superadmin)"
on profiles for delete
using (get_my_role() in ('admin', 'superadmin'));