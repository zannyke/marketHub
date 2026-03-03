-- Create the Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  seller_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity int DEFAULT 1,
  total_price numeric NOT NULL,
  status text DEFAULT 'pending', -- 'pending', 'assigned', 'picked_up', 'delivered'
  delivery_person_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  delivery_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Turn on Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies
-- Buyers can see their own orders
CREATE POLICY "Buyers can view own orders" ON public.orders
FOR SELECT USING (auth.uid() = buyer_id);

-- Sellers can see orders for their products
CREATE POLICY "Sellers can view own products orders" ON public.orders
FOR SELECT USING (auth.uid() = seller_id);

-- Delivery persons can see assigned orders or pending orders
CREATE POLICY "Delivery can view assigned and pending" ON public.orders
FOR SELECT USING (
  status = 'pending' OR auth.uid() = delivery_person_id
);

-- Buyers can insert their own orders
CREATE POLICY "Buyers can create orders" ON public.orders
FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Delivery persons can update status to accept or deliver
CREATE POLICY "Delivery can update order status" ON public.orders
FOR UPDATE USING (
  status = 'pending' OR auth.uid() = delivery_person_id
) WITH CHECK (
  auth.uid() = delivery_person_id
);

-- Enable realtime so delivery drivers see new orders instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
