-- RAH. stock + orders database.
-- Paste this WHOLE file into Supabase > SQL Editor > Run.
-- It is safe to run again at any time: it never erases existing stock numbers or orders.

-- 1) Stock: one row per product (and per colour for multi-colour products).
create table if not exists public.stock (
  product_id text not null,
  color      text not null default '',   -- '' for products that have a single colour
  quantity   integer not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now(),
  primary key (product_id, color)
);

-- 2) Orders: every order placed on the website is saved here (and also sent to WhatsApp).
create table if not exists public.orders (
  id          bigint generated always as identity primary key,
  reference   text not null unique,          -- the RAH-XXXXX reference the customer sees
  created_at  timestamptz not null default now(),
  status      text not null default 'new',   -- you can change this: new / confirmed / delivered / cancelled
  name        text not null default '',
  phone       text not null default '',
  email       text not null default '',
  address     text not null default '',
  city        text not null default '',
  notes       text not null default '',
  items       jsonb not null default '[]'::jsonb,
  subtotal    integer not null default 0,
  delivery    integer not null default 0,
  total       integer not null default 0
);

-- Nobody can read or write these tables from the browser; only the website's server functions can.
alter table public.stock  enable row level security;
alter table public.orders enable row level security;

-- 3) The order step: checks stock, takes the pieces out and saves the order, all in one safe step
--    (two customers cannot take the same last piece). SECURITY DEFINER = it always has the
--    rights it needs, whichever key the website uses.
drop function if exists public.reserve_stock(jsonb);

create or replace function public.place_order(items jsonb, details jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  it jsonb;
  r record;
  total integer;
  remaining integer;
  take integer;
  want integer;
  pid text;
  col text;
  ref text := nullif(details->>'reference', '');
  short jsonb := '[]'::jsonb;
begin
  -- Nothing to do (used by /api/health to test the connection without changing anything).
  if jsonb_array_length(items) = 0 then
    return jsonb_build_object('ok', true, 'empty', true);
  end if;

  -- Same order sent twice (double tap): do not take the stock twice.
  if ref is not null and exists (select 1 from public.orders where reference = ref) then
    return jsonb_build_object('ok', true, 'duplicate', true);
  end if;

  -- Step 1: check every item. A product with no stock row counts as out of stock.
  -- color '' means "single-colour product": all of that product's rows are added together.
  for it in select * from jsonb_array_elements(items) loop
    pid := it->>'productId'; col := coalesce(it->>'color', ''); want := (it->>'quantity')::int;
    total := 0;
    for r in select quantity from public.stock
      where product_id = pid and (col = '' or lower(btrim(color)) = lower(btrim(col)))
      order by color for update
    loop
      total := total + r.quantity;
    end loop;
    if total < want then
      short := short || jsonb_build_array(jsonb_build_object('productId', pid, 'color', col, 'available', total));
    end if;
  end loop;

  if jsonb_array_length(short) > 0 then
    return jsonb_build_object('ok', false, 'shortages', short);
  end if;

  -- Step 2: take the pieces out.
  for it in select * from jsonb_array_elements(items) loop
    pid := it->>'productId'; col := coalesce(it->>'color', ''); remaining := (it->>'quantity')::int;
    for r in select product_id, color, quantity from public.stock
      where product_id = pid and (col = '' or lower(btrim(color)) = lower(btrim(col)))
      order by quantity desc, color
    loop
      exit when remaining <= 0;
      take := least(r.quantity, remaining);
      if take > 0 then
        update public.stock set quantity = quantity - take, updated_at = now()
          where product_id = r.product_id and color = r.color;
        remaining := remaining - take;
      end if;
    end loop;
  end loop;

  if ref is not null then
    insert into public.orders (reference, name, phone, email, address, city, notes, items, subtotal, delivery, total)
    values (
      ref,
      coalesce(details->>'name', ''), coalesce(details->>'phone', ''), coalesce(details->>'email', ''),
      coalesce(details->>'address', ''), coalesce(details->>'city', ''), coalesce(details->>'notes', ''),
      coalesce(details->'lines', '[]'::jsonb),
      coalesce((details->>'subtotal')::int, 0), coalesce((details->>'delivery')::int, 0), coalesce((details->>'total')::int, 0)
    )
    on conflict (reference) do nothing;
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

-- Only the website's server key may call it (not the public browser keys).
revoke all on function public.place_order(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.place_order(jsonb, jsonb) to service_role;

-- Starting stock (same numbers as the website had in code).
insert into public.stock (product_id, color, quantity) values
  ('soft-crinkle-crimp-black', '', 1),
  ('soft-crinkle-crimp-choco-brown', '', 1),
  ('soft-crinkle-crimp-dusty-navy-blue', '', 1),
  ('soft-crinkle-crimp-forest-green', '', 2),
  ('soft-crinkle-crimp-ice-grey', '', 1),
  ('soft-crinkle-crimp-royal-mahroon', '', 1),
  ('soft-crinkle-crimp-navy-blue', '', 1),
  ('soft-crinkle-crimp-olive', '', 2),
  ('soft-crinkle-crimp-purple-plum', '', 1),
  ('turkish-lawn-hijab', 'Navy Blue', 2),
  ('turkish-lawn-hijab', 'Baby Blue', 2),
  ('turkish-lawn-hijab', 'Uniform Blue', 2),
  ('turkish-lawn-hijab', 'Rose Pink', 2),
  ('turkish-lawn-hijab', 'Soft Pink', 2),
  ('turkish-lawn-hijab', 'Peach Pink', 2),
  ('turkish-lawn-hijab', 'Light Grey', 2),
  ('turkish-lawn-hijab', 'Black', 2),
  ('turkish-lawn-hijab', 'Dark Grey', 2),
  ('turkish-lawn-hijab', 'Leaf Green', 2),
  ('turkish-lawn-hijab', 'Mehndi Green', 2),
  ('turkish-lawn-hijab', 'Forest Green', 2),
  ('turkish-lawn-hijab', 'Mulberry', 2),
  ('turkish-lawn-hijab', 'Burnt Orange', 2),
  ('turkish-lawn-hijab', 'Mahroon Red', 2),
  ('turkish-lawn-hijab', 'Chocolate Brown', 2),
  ('turkish-lawn-hijab', 'Dusty Nude', 2),
  ('turkish-lawn-hijab', 'Camel Brown', 1),
  ('turkish-lawn-hijab', 'Blush Pink', 2),
  ('turkish-lawn-hijab', 'Salmon Pink', 2),
  ('turkish-lawn-hijab', 'Lime Beige', 2),
  ('turkish-lawn-hijab', 'Dusty Teal', 2),
  ('turkish-lawn-hijab', 'Light Taupe', 2),
  ('turkish-lawn-hijab', 'Lavender', 2),
  ('turkish-lawn-hijab', 'Purple', 2),
  ('turkish-lawn-hijab', 'Dusty Blue', 2),
  ('turkish-lawn-hijab', 'Muted Slate Blue', 2),
  ('leopard-print-arabic-lawn-hijab-mehndi-green', '', 1),
  ('matching-hijab-and-niqab-set', 'Mulberry', 2),
  ('matching-hijab-and-niqab-set', 'Purple', 2),
  ('matching-hijab-and-niqab-set', 'Bottle Green', 1),
  ('matching-hijab-and-niqab-set', 'Dark Grey', 1),
  ('matching-hijab-and-niqab-set', 'Off White', 0),
  ('matching-hijab-and-niqab-set', 'Blue Grey', 0),
  ('irani-chaddar-black', '', 1),
  ('matching-hijab-and-cap-black', '', 1),
  ('matching-hijab-and-cap-blush-pink', '', 0),
  ('matching-hijab-and-cap-chocolate-brown', '', 1),
  ('matching-hijab-and-cap-lavender', '', 1),
  ('matching-hijab-and-cap-mahroon', '', 1),
  ('matching-hijab-and-cap-teal', '', 1),
  ('matching-hijab-and-cap-purple', '', 1),
  ('matching-hijab-and-cap-navy-blue', '', 1),
  ('tube-cap-black', '', 1),
  ('tube-cap-blush-pink', '', 2),
  ('tube-cap-brown', '', 3),
  ('tube-cap-chocolate-brown', '', 1),
  ('tube-cap-grey', '', 3),
  ('tube-cap-lavender', '', 0),
  ('tube-cap-lilac', '', 4),
  ('tube-cap-navy-blue', '', 1),
  ('tube-cap-purple', '', 2),
  ('tube-cap-red', '', 2),
  ('tube-cap-teal', '', 1),
  ('hijab-magnet-dark-brown', '', 1),
  ('hijab-magnet-deep-green', '', 1),
  ('hijab-magnet-deep-purple', '', 1),
  ('hijab-magnet-dusty-blue', '', 1),
  ('hijab-magnet-light-lavender', '', 1),
  ('hijab-magnet-metallic-grey', '', 1),
  ('hijab-magnet-mulberry-brown', '', 1),
  ('hijab-magnet-navy-blue', '', 1),
  ('hijab-magnet-sage', '', 1),
  ('hijab-magnet-sand', '', 1),
  ('hijab-magnet-silver', '', 1),
  ('chiffon-georgette-mahroon', '', 2),
  ('chiffon-georgette-navy-blue', '', 2),
  ('chiffon-georgette-purple', '', 1),
  ('chiffon-georgette-sea-foam', '', 3),
  ('chiffon-georgette-lavender', '', 0),
  ('chiffon-georgette-chocolate-brown', '', 1),
  ('chiffon-georgette-lilac', '', 4),
  ('chiffon-georgette-black', '', 2),
  ('classic-leopard-beige', '', 0),
  ('classic-leopard-black', '', 1),
  ('classic-leopard-brown', '', 0),
  ('classic-leopard-dark-grey', '', 1),
  ('classic-leopard-green', '', 1),
  ('classic-leopard-light-grey', '', 1),
  ('classic-leopard-orange', '', 1),
  ('classic-leopard-pink', '', 1),
  ('classic-leopard-sage-grey', '', 1),
  ('classic-leopard-sand', '', 0),
  ('classic-leopard-white', '', 1),
  ('vintage-leopard-blue', '', 1),
  ('vintage-leopard-butter-yellow', '', 1),
  ('vintage-leopard-mahroon', '', 1),
  ('pin-wheel-multi', '', 2),
  ('bulb-pins-silver', '', 800),
  ('bulb-pins-golden', '', 800),
  ('large-dubatta-black', '', 2)
on conflict (product_id, color) do nothing;
