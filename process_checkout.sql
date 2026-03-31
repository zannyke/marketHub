create or replace function public.process_checkout(
  checkout_email text,
  cart_items_json json,
  delivery_address text
) returns boolean
language plpgsql
security definer
as $$
declare
  _user_id uuid;
  _user_email text;
  _user_phone text;
  _item json;
  _product record;
begin
  -- 1. Get authenticated user
  _user_id := auth.uid();
  _user_email := auth.jwt() ->> 'email';
  _user_phone := auth.jwt() ->> 'phone';

  if _user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- 2. Cross-Reference Logic: check if input email/phone matches session
  if (lower(trim(checkout_email)) = lower(trim(coalesce(_user_email, '')))) or
     (trim(checkout_email) = trim(coalesce(_user_phone, ''))) then
    -- Security Checkpoint verified
  else
    raise exception 'Security Checkpoint Failed: Identity mismatch. The provided identifier does not match the active session.';
  end if;

  -- 3. Process cart items
  for _item in select * from json_array_elements(cart_items_json) loop
    -- lock product for update to prevent race conditions
    select * into _product from public.products where id = (_item->>'productId')::uuid for update;

    if not found then
      raise exception 'Product % not found', _item->>'productId';
    end if;

    -- Create order
    insert into public.orders (
      buyer_id, seller_id, product_id, quantity, total_price, delivery_address, status
    ) values (
      _user_id,
      _product.seller_id,
      (_item->>'productId')::uuid,
      (_item->>'quantity')::int,
      (_product.price * (_item->>'quantity')::int),
      delivery_address,
      'pending'
    );
  end loop;

  -- 4. Clear the user's cart in the DB
  delete from public.cart_items where user_id = _user_id;

  return true;
end;
$$;
