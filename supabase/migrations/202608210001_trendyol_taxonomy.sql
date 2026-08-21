create table if not exists public.market_taxonomy_runs (
  id uuid primary key default gen_random_uuid(),
  marketplace text not null default 'trendyol',
  observed_date date not null,
  captured_at timestamptz not null,
  catalog_run_id text not null,
  catalog_generated_at timestamptz not null,
  status text not null default 'LOADING' check (status in ('LOADING', 'PASS', 'FAIL')),
  total_category_paths integer not null check (total_category_paths >= 0),
  total_categories integer not null check (total_categories >= 0),
  covered_categories integer not null check (covered_categories >= 0),
  coverage numeric(5, 2) not null default 0,
  unique_products integer not null check (unique_products >= 0),
  ranking_memberships integer not null check (ranking_memberships >= 0),
  categories_with_products integer not null check (categories_with_products >= 0),
  empty_categories integer not null check (empty_categories >= 0),
  failed_categories integer not null check (failed_categories >= 0),
  roots jsonb not null default '[]'::jsonb,
  levels jsonb not null default '{}'::jsonb,
  source_commit text,
  completed_at timestamptz,
  ingested_at timestamptz not null default now(),
  unique (marketplace, observed_date),
  unique (marketplace, catalog_run_id)
);

create table if not exists public.market_taxonomy_categories (
  marketplace text not null default 'trendyol',
  category_id bigint not null,
  name text not null,
  slug text not null,
  level integer not null check (level between 0 and 12),
  has_children boolean not null default false,
  child_count integer not null default 0 check (child_count >= 0),
  root_id bigint not null,
  root_name text not null,
  source_url text not null,
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  primary key (marketplace, category_id)
);

create table if not exists public.market_taxonomy_category_paths (
  marketplace text not null default 'trendyol',
  path_key text not null,
  category_id bigint not null,
  parent_id bigint,
  level integer not null check (level between 0 and 12),
  root_id bigint not null,
  path text not null,
  path_ids jsonb not null default '[]'::jsonb,
  path_slug text not null,
  source_url text not null,
  last_seen_at timestamptz not null,
  primary key (marketplace, path_key),
  foreign key (marketplace, category_id)
    references public.market_taxonomy_categories(marketplace, category_id) on delete cascade
);

create table if not exists public.market_taxonomy_products (
  marketplace text not null default 'trendyol',
  product_key text not null,
  product_id text not null,
  merchant_id text,
  title text not null,
  brand text,
  canonical_url text not null,
  image_url text,
  category_name text,
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  primary key (marketplace, product_key)
);

create table if not exists public.market_taxonomy_product_observations (
  run_id uuid not null references public.market_taxonomy_runs(id) on delete cascade,
  marketplace text not null default 'trendyol',
  product_key text not null,
  observed_date date not null,
  captured_at timestamptz not null,
  price numeric,
  original_price numeric,
  currency text not null default 'TRY',
  in_stock boolean,
  running_out boolean,
  rating numeric,
  rating_count integer,
  promotions jsonb not null default '[]'::jsonb,
  fast_delivery boolean,
  rush_delivery_hours integer,
  primary key (run_id, product_key),
  foreign key (marketplace, product_key)
    references public.market_taxonomy_products(marketplace, product_key) on delete restrict
);

create table if not exists public.market_taxonomy_rankings (
  run_id uuid not null references public.market_taxonomy_runs(id) on delete cascade,
  marketplace text not null default 'trendyol',
  observed_date date not null,
  category_id bigint not null,
  rank integer not null check (rank > 0 and rank <= 1000),
  product_key text not null,
  primary key (run_id, category_id, rank, product_key),
  foreign key (marketplace, category_id)
    references public.market_taxonomy_categories(marketplace, category_id) on delete restrict,
  foreign key (marketplace, product_key)
    references public.market_taxonomy_products(marketplace, product_key) on delete restrict
);

create index if not exists market_taxonomy_runs_date_idx
  on public.market_taxonomy_runs (marketplace, observed_date desc) where status = 'PASS';
create index if not exists market_taxonomy_categories_root_name_idx
  on public.market_taxonomy_categories (root_id, name);
create index if not exists market_taxonomy_category_paths_category_idx
  on public.market_taxonomy_category_paths (category_id, level, path);
create index if not exists market_taxonomy_products_product_idx
  on public.market_taxonomy_products (product_id, merchant_id);
create index if not exists market_taxonomy_observations_product_date_idx
  on public.market_taxonomy_product_observations (product_key, observed_date desc);
create index if not exists market_taxonomy_rankings_category_date_rank_idx
  on public.market_taxonomy_rankings (category_id, observed_date desc, rank);

create or replace function public.get_market_category_rankings(
  p_category_id bigint,
  p_observed_date date default null,
  p_limit integer default 200
)
returns table (
  observed_date date,
  captured_at timestamptz,
  category_id bigint,
  rank integer,
  previous_rank integer,
  rank_delta integer,
  product_key text,
  product_id text,
  merchant_id text,
  title text,
  brand text,
  url text,
  image_url text,
  price numeric,
  previous_price numeric,
  price_delta_percent numeric,
  original_price numeric,
  currency text,
  in_stock boolean,
  running_out boolean,
  rating numeric,
  rating_count integer,
  promotions jsonb,
  fast_delivery boolean,
  rush_delivery_hours integer
)
language sql
stable
security invoker
set search_path = public
as $$
  with selected_run as (
    select run.id, run.observed_date, run.captured_at
    from public.market_taxonomy_runs run
    where run.marketplace = 'trendyol'
      and run.status = 'PASS'
      and (p_observed_date is null or run.observed_date <= p_observed_date)
    order by run.observed_date desc, run.captured_at desc
    limit 1
  ), previous_run as (
    select run.id
    from public.market_taxonomy_runs run, selected_run selected
    where run.marketplace = 'trendyol'
      and run.status = 'PASS'
      and run.observed_date < selected.observed_date
    order by run.observed_date desc, run.captured_at desc
    limit 1
  )
  select
    selected.observed_date,
    selected.captured_at,
    current_rank.category_id,
    current_rank.rank,
    previous_rank.rank as previous_rank,
    case when previous_rank.rank is null then null else previous_rank.rank - current_rank.rank end as rank_delta,
    product.product_key,
    product.product_id,
    product.merchant_id,
    product.title,
    product.brand,
    product.canonical_url as url,
    product.image_url,
    observation.price,
    previous_observation.price as previous_price,
    case
      when previous_observation.price is null or previous_observation.price = 0 or observation.price is null then null
      else round(((observation.price - previous_observation.price) / previous_observation.price) * 100, 2)
    end as price_delta_percent,
    observation.original_price,
    observation.currency,
    observation.in_stock,
    observation.running_out,
    observation.rating,
    observation.rating_count,
    observation.promotions,
    observation.fast_delivery,
    observation.rush_delivery_hours
  from selected_run selected
  join public.market_taxonomy_rankings current_rank
    on current_rank.run_id = selected.id and current_rank.category_id = p_category_id
  join public.market_taxonomy_products product
    on product.marketplace = current_rank.marketplace and product.product_key = current_rank.product_key
  join public.market_taxonomy_product_observations observation
    on observation.run_id = selected.id and observation.product_key = current_rank.product_key
  left join previous_run previous on true
  left join public.market_taxonomy_rankings previous_rank
    on previous_rank.run_id = previous.id
    and previous_rank.category_id = current_rank.category_id
    and previous_rank.product_key = current_rank.product_key
  left join public.market_taxonomy_product_observations previous_observation
    on previous_observation.run_id = previous.id
    and previous_observation.product_key = current_rank.product_key
  order by current_rank.rank, product.product_key
  limit least(greatest(p_limit, 1), 200);
$$;

alter table public.market_taxonomy_runs enable row level security;
alter table public.market_taxonomy_categories enable row level security;
alter table public.market_taxonomy_category_paths enable row level security;
alter table public.market_taxonomy_products enable row level security;
alter table public.market_taxonomy_product_observations enable row level security;
alter table public.market_taxonomy_rankings enable row level security;

create policy "Public can read successful taxonomy runs"
  on public.market_taxonomy_runs for select to anon, authenticated using (status = 'PASS');
create policy "Public can read taxonomy categories"
  on public.market_taxonomy_categories for select to anon, authenticated using (true);
create policy "Public can read taxonomy category paths"
  on public.market_taxonomy_category_paths for select to anon, authenticated using (true);
create policy "Public can read taxonomy products"
  on public.market_taxonomy_products for select to anon, authenticated using (true);
create policy "Public can read successful taxonomy product observations"
  on public.market_taxonomy_product_observations for select to anon, authenticated using (
    exists (
      select 1 from public.market_taxonomy_runs run
      where run.id = market_taxonomy_product_observations.run_id and run.status = 'PASS'
    )
  );
create policy "Public can read successful taxonomy rankings"
  on public.market_taxonomy_rankings for select to anon, authenticated using (
    exists (
      select 1 from public.market_taxonomy_runs run
      where run.id = market_taxonomy_rankings.run_id and run.status = 'PASS'
    )
  );

grant select on public.market_taxonomy_runs to anon, authenticated;
grant select on public.market_taxonomy_categories to anon, authenticated;
grant select on public.market_taxonomy_category_paths to anon, authenticated;
grant select on public.market_taxonomy_products to anon, authenticated;
grant select on public.market_taxonomy_product_observations to anon, authenticated;
grant select on public.market_taxonomy_rankings to anon, authenticated;
grant execute on function public.get_market_category_rankings(bigint, date, integer) to anon, authenticated;

comment on function public.get_market_category_rankings(bigint, date, integer) is
  'Seçilen gün veya önceki son başarılı Trendyol taksonomi koşusundaki kategori sıralamasını, bir önceki başarılı günün sıra ve fiyat farkıyla döndürür.';
