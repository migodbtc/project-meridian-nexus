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

-- 1. Users can read their own profile (non-guests only)
create policy "self: read own profile"
on profiles for select
using (id = auth.uid() and get_my_role() != 'guest');

-- 2. Users can update their own profile but cannot change their role
create policy "self: update own profile"
on profiles for update
using (id = auth.uid() and get_my_role() != 'guest')
with check (role = get_my_role());

-- 3. Operations and finance can read profiles at or below their level
create policy "ops_finance: read same and below"
on profiles for select
using (
  get_my_role() in ('operations', 'finance')
  and role <= get_my_role()
  and id != auth.uid()
);

-- 4. Admin can read everyone except superadmin
create policy "admin: read below superadmin"
on profiles for select
using (get_my_role() = 'admin' and role < 'superadmin'::user_role);

-- 5. Admin can update/delete anyone strictly below them
create policy "admin: write below admin"
on profiles for all
using (get_my_role() = 'admin' and role < 'admin'::user_role and id != auth.uid())
with check (role < 'admin'::user_role);

-- 6. Superadmin can do everything
create policy "superadmin: full access"
on profiles for all
using (get_my_role() = 'superadmin')
with check (get_my_role() = 'superadmin');