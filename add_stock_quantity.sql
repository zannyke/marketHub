-- Add stock_quantity to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock_quantity int DEFAULT 1;

-- If you want, you can update existing products to have at least 1 stock
UPDATE public.products SET stock_quantity = 1 WHERE stock_quantity IS NULL;
