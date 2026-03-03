-- 1. Add shop details columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_description text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_location text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_hours text;

-- 2. Make full_name unique so users can't have the same name.
-- We use a unique constraint. If it fails due to existing duplicates,
-- you may need to manually clean them up first or we handle it gracefully.
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_full_name_key'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_full_name_key UNIQUE (full_name);
  END IF;
END $$;
