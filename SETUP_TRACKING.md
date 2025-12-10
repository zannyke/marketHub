# Setup User Tracking & Analytics

To collect user details (Email, Name, Login Count, Location) and enhanced cart data, please run the following SQL code in your **Supabase SQL Editor**.

## 1. Create User Profiles Table & Tracking Function

Copy and paste this entire block into the SQL Editor and click **Run**:

```sql
-- Create a table to store user profiles and analytics
create table if not exists user_profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  login_count integer default 1,
  last_location text,
  last_seen timestamp with time zone default now()
);

-- Enable security
alter table user_profiles enable row level security;

-- Policies
create policy "Users can view own profile" 
  on user_profiles for select using (auth.uid() = id);

create policy "Users can insert/update own profile" 
  on user_profiles for all using (auth.uid() = id);

-- Create a smart function to handle login tracking automatically
create or replace function track_user_login(user_location text)
returns void as $$
begin
  insert into user_profiles (id, email, full_name, login_count, last_location, last_seen)
  values (
    auth.uid(), 
    auth.jwt() ->> 'email', 
    coalesce((auth.jwt() -> 'user_metadata' ->> 'full_name'), 'User'), 
    1, 
    user_location, 
    now()
  )
  on conflict (id) do update
  set 
    login_count = user_profiles.login_count + 1,
    last_location = EXCLUDED.last_location,
    last_seen = now(),
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;
end;
$$ language plpgsql security definer;
```

## 2. Verify It Works

Once you run this, the application (which I have updated) will automatically:
1.  **Count every login**: The `login_count` will go up each time a user signs in.
2.  **Track Location**: It will save their timezone/region (e.g., "Africa/Nairobi") as `last_location`.
3.  **Save Names**: It ensures `full_name` and `email` are always stored in the table.
