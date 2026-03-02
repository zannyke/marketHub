-- [ADVANCED SETUP]
-- Run this in your Supabase Dashboard > SQL Editor to create a robust 'Profiles' system.

-- 1. Create a Profiles table (The master list of your users)
--    - Stores Name, Email, Role, Location, Login Count
--    - Stores Item Counts: Cart, Bought, Sold, Delivered
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  role text,
  location text,
  login_count int default 0,
  
  -- Item Counts
  cart_count int default 0,
  bought_count int default 0,
  sold_count int default 0,
  delivered_count int default 0,
  
  last_login_at timestamptz default now()
);

-- 2. Security Policies (RLS)
alter table public.profiles enable row level security;

-- Allow users to read their own profile
create policy "Read access" on public.profiles for select using (true);
-- Allow users/system to update their own profile
create policy "Update access" on public.profiles for all using (auth.uid() = id);

-- 3. Data Tracking Function (Automatically runs on login)
--    - Fetches user details
--    - Calculates live stats (e.g., items in cart)
create or replace function public.track_user_login(user_location text)
returns void
language plpgsql
security definer -- Runs with admin privileges to read auth.users
as $$
declare
  u_email text;
  u_name text;
  u_role text;
  live_cart_count int;
begin
  -- 1. Fetch the latest secure data from Supabase Auth
  select 
    email, 
    raw_user_meta_data->>'full_name', 
    raw_user_meta_data->>'role'
  into u_email, u_name, u_role
  from auth.users
  where id = auth.uid();

  -- 2. Calculate Stats
  -- Count total items (sum of quantity) currently in the user's cart
  select coalesce(sum(quantity), 0) into live_cart_count 
  from public.cart_items 
  where user_id = auth.uid();

  -- Note: 'bought', 'sold', and 'delivered' counts would normally be queried from an 'orders' table here.
  -- Since the orders table is not yet connected, we default them to 0. You can update this function later.

  -- 3. Upsert into Profiles (Insert if new, Update if exists)
  insert into public.profiles (
    id, email, full_name, role, location, login_count, 
    cart_count, bought_count, sold_count, delivered_count, last_login_at
  )
  values (
    auth.uid(), u_email, u_name, coalesce(u_role, 'buyer'), user_location, 1, 
    live_cart_count, 0, 0, 0, now()
  )
  on conflict (id) do update
  set 
    email = EXCLUDED.email,         
    full_name = EXCLUDED.full_name, 
    role = EXCLUDED.role,           
    location = EXCLUDED.location,   
    login_count = public.profiles.login_count + 1,
    
    -- Update live stats
    cart_count = live_cart_count,
    -- Maintain existing counts for others (or update via logic later)
    bought_count = public.profiles.bought_count, 
    sold_count = public.profiles.sold_count,
    delivered_count = public.profiles.delivered_count,
    
    last_login_at = now();
end;
$$;

-- Grant permissions for valid users to call the function
grant execute on function public.track_user_login(text) to authenticated;
grant execute on function public.track_user_login(text) to service_role;

-- 4. Auto-create Profile on Sign Up (Trigger)
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Products Table (The items for sale)
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text,
  price numeric not null,
  old_price numeric,
  image_url text,
  tag text,
  tag_color text,
  rating numeric default 0,
  reviews_count int default 0,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

-- 6. Cart Items Table (User shopping carts)
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade,
  temp_product_id text, -- For mock products if needed
  quantity int default 1,
  product_metadata jsonb, -- Backwards compatibility
  created_at timestamptz default now()
);

-- 7. Security Policies (RLS)
alter table public.products enable row level security;
alter table public.cart_items enable row level security;

-- Products: Everyone can view, but only the owner (seller) can edit/delete
drop policy if exists "Products viewable by everyone" on public.products;
create policy "Products viewable by everyone" on public.products for select using (true);
drop policy if exists "Sellers can manage their own products" on public.products;
create policy "Sellers can manage their own products" on public.products for all using (auth.uid() = seller_id);

-- Cart Items: Users can only see/edit their own cart
drop policy if exists "Users can manage their own cart" on public.cart_items;
create policy "Users can manage their own cart" on public.cart_items for all using (auth.uid() = user_id);
