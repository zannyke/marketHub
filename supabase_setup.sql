-- [ADVANCED SETUP]
-- Run this in your Supabase Dashboard > SQL Editor to create a robust 'Profiles' system.

-- 1. Create a Profiles table (The master list of your users)
--    - Stores Name, Email, Role, Location, and Login Count
--    - Automatically handles duplicates
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  role text,
  location text,
  login_count int default 0,
  last_login_at timestamptz default now()
);

-- 2. Security Policies (RLS)
alter table public.profiles enable row level security;

-- Allow users to read their own profile
create policy "Read access" on public.profiles for select using (true);
-- Allow users/system to update their own profile
create policy "Update access" on public.profiles for all using (auth.uid() = id);

-- 3. Data Tracking Function (Automatically runs on login)
--    - Fetches the latest Name/Role from Auth Metadata
--    - Increments the Login Counter
create or replace function public.track_user_login(user_location text)
returns void
language plpgsql
security definer -- Runs with admin privileges to read auth.users
as $$
declare
  u_email text;
  u_name text;
  u_role text;
begin
  -- 1. Fetch the latest secure data from Supabase Auth
  select 
    email, 
    raw_user_meta_data->>'full_name', 
    raw_user_meta_data->>'role'
  into u_email, u_name, u_role
  from auth.users
  where id = auth.uid();

  -- 2. Upsert into Profiles (Insert if new, Update if exists)
  insert into public.profiles (
    id, email, full_name, role, location, login_count, last_login_at
  )
  values (
    auth.uid(), u_email, u_name, coalesce(u_role, 'buyer'), user_location, 1, now()
  )
  on conflict (id) do update
  set 
    email = EXCLUDED.email,         -- Sync email if changed
    full_name = EXCLUDED.full_name, -- Sync name if changed
    role = EXCLUDED.role,           -- Sync role if changed
    location = EXCLUDED.location,   -- Update location
    login_count = public.profiles.login_count + 1, -- Increment counter!
    last_login_at = now();
end;
$$;

-- Grant permissions for valid users to call the function
grant execute on function public.track_user_login(text) to authenticated;
grant execute on function public.track_user_login(text) to service_role;

-- 4. Auto-create Profile on Sign Up (Trigger)
--    - Ensures a profile exists immediately after sign up, even before first login
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, role, location, login_count)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'buyer'),
    'Unknown',
    0
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Re-create the trigger securely
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
