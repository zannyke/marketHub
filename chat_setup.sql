-- 1. Create a Messages table to store the live chat history
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Turn on Row Level Security (RLS) to keep chats private
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Buyers and Sellers can read messages they are involved in
CREATE POLICY "Users can read their own messages" ON public.messages
FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 4. Policy: Users can only send messages as themselves
CREATE POLICY "Users can insert their own messages" ON public.messages
FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 5. VERY IMPORTANT: Enable "Real Time" broadcasting for this table!
-- This is the magic that makes chat instantly appear without refreshing.
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
