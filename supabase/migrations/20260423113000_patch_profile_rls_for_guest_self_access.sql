do $$ begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public'
    and table_name = 'profiles'
  ) then
    raise exception 'profiles table does not exist - run create_profiles_table migration first';
  end if;
end $$;

alter table profiles enable row level security;

drop policy if exists "self: read own profile" on profiles;
drop policy if exists "self: update own profile" on profiles;
drop policy if exists "self: insert own profile" on profiles;

-- Allow all authenticated users, including guests, to read their own profile.
create policy "self: read own profile"
on profiles for select
using (id = auth.uid());

-- Allow users to update their own profile but never escalate role.
create policy "self: update own profile"
on profiles for update
using (id = auth.uid())
with check (role = get_my_role());

-- Allow users to backfill their own profile row as guest when missing.
create policy "self: insert own profile"
on profiles for insert
with check (id = auth.uid() and role = 'guest'::user_role);
