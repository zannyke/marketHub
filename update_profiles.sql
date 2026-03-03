-- 1. Add shop details columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_description text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_location text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shop_hours text;

-- 2. Clean up any existing duplicate names FIRST!
-- This safely appends a number to any duplicate names (e.g., "stanlee Ngigi (2)")
-- so the UNIQUE constraint doesn't throw an error.
WITH duplicate_names AS (
  SELECT id, full_name,
         ROW_NUMBER() OVER(PARTITION BY full_name ORDER BY id) as row_num
  FROM public.profiles
  WHERE full_name IS NOT NULL
)
UPDATE public.profiles
SET full_name = public.profiles.full_name || ' (' || duplicate_names.row_num || ')'
FROM duplicate_names
WHERE public.profiles.id = duplicate_names.id AND duplicate_names.row_num > 1;

-- 3. NOW make full_name unique.
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_full_name_key'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_full_name_key UNIQUE (full_name);
  END IF;
END $$;
