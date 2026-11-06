-- RAH. stock database. Paste this whole file into Supabase > SQL Editor > Run (once).

create table if not exists public.stock (
  product_id text not null,
  color      text not null default '',   -- '' for products that have a single colour
  quantity   integer not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now(),
  primary key (product_id, color)
);

-- Nobody can read or write the table directly from the browser; only the website's server functions can.
alter table public.stock enable row level security;

-- Takes pieces out of stock in one safe step (two customers cannot take the same last piece).
create or replace function public.reserve_stock(items jsonb)
returns jsonb
language plpgsql
as $$
declare
  it jsonb;
  cur integer;
  short jsonb := '[]'::jsonb;
begin
  for it in select * from jsonb_array_elements(items) loop
    select quantity into cur from public.stock
      where product_id = it->>'productId' and color = it->>'color' for update;
    if cur is not null and cur < (it->>'quantity')::int then
      short := short || jsonb_build_array(jsonb_build_object(
        'productId', it->>'productId', 'color', it->>'color', 'available', cur));
    end if;
  end loop;

  if jsonb_array_length(short) > 0 then
    return jsonb_build_object('ok', false, 'shortages', short);
  end if;

  for it in select * from jsonb_array_elements(items) loop
    update public.stock
      set quantity = quantity - (it->>'quantity')::int, updated_at = now()
      where product_id = it->>'productId' and color = it->>'color';
  end loop;
  return jsonb_build_object('ok', true);
end;
$$;

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
  ('matching-hijab-and-niqab-set', 'Off White', 1),
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
  ('chiffon-georgette-purple', '', 2),
  ('chiffon-georgette-sea-foam', '', 3),
  ('chiffon-georgette-lavender', '', 0),
  ('chiffon-georgette-chocolate-brown', '', 1),
  ('chiffon-georgette-lilac', '', 4),
  ('chiffon-georgette-black', '', 2),
  ('classic-leopard-beige', '', 1),
  ('classic-leopard-black', '', 1),
  ('classic-leopard-brown', '', 0),
  ('classic-leopard-dark-grey', '', 1),
  ('classic-leopard-green', '', 1),
  ('classic-leopard-light-grey', '', 1),
  ('classic-leopard-orange', '', 1),
  ('classic-leopard-pink', '', 1),
  ('classic-leopard-sage-grey', '', 1),
  ('classic-leopard-sand', '', 1),
  ('classic-leopard-white', '', 1),
  ('vintage-leopard-blue', '', 1),
  ('vintage-leopard-butter-yellow', '', 1),
  ('vintage-leopard-mahroon', '', 1),
  ('pin-wheel-multi', '', 2),
  ('bulb-pins-silver', '', 800),
  ('bulb-pins-golden', '', 800),
  ('large-dubatta-black', '', 2)
on conflict (product_id, color) do nothing;
