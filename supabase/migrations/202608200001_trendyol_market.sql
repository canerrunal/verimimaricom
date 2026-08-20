create table if not exists public.market_profiles (
  slug text primary key,
  marketplace text not null default 'trendyol',
  label text not null,
  source_label text not null,
  source_url text,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.market_pipeline_runs (
  id uuid primary key default gen_random_uuid(),
  profile_slug text not null references public.market_profiles(slug) on delete restrict,
  observed_date date not null,
  captured_at timestamptz not null,
  status text not null check (status in ('PASS', 'FAIL')),
  product_count integer not null check (product_count >= 0),
  detail_success_rate numeric(5, 2) not null default 0,
  coverage jsonb not null default '{}'::jsonb,
  quality jsonb not null default '{}'::jsonb,
  source_commit text,
  ingested_at timestamptz not null default now(),
  unique (profile_slug, captured_at)
);

create table if not exists public.market_products (
  marketplace text not null default 'trendyol',
  product_id text not null,
  title text not null,
  brand text,
  category text,
  canonical_url text not null,
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  primary key (marketplace, product_id)
);

create table if not exists public.market_merchants (
  marketplace text not null default 'trendyol',
  merchant_id text not null,
  name text,
  score numeric,
  last_seen_at timestamptz not null,
  primary key (marketplace, merchant_id)
);

create table if not exists public.market_observations (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.market_pipeline_runs(id) on delete cascade,
  profile_slug text not null references public.market_profiles(slug) on delete restrict,
  observed_date date not null,
  captured_at timestamptz not null,
  marketplace text not null default 'trendyol',
  product_id text not null,
  merchant_id text,
  offer_key text not null,
  rank_scope text not null,
  rank_scope_label text not null,
  rank_position integer,
  composite_position integer,
  rank_delta integer,
  price numeric,
  original_price numeric,
  discount_percent numeric,
  price_delta_percent numeric,
  currency text not null default 'TRY',
  trend_score numeric,
  opportunity_score numeric,
  stock_status text,
  stock_signal text,
  sales_signal text,
  sales_signal_days integer,
  sales_signal_min numeric,
  sales_signal_daily_min numeric,
  rating numeric,
  rating_count integer,
  review_count integer,
  review_delta integer,
  question_count integer,
  campaigns jsonb not null default '[]'::jsonb,
  delivery_summary text,
  detail_status text,
  rank_contract_version text not null default 'v2',
  unique (run_id, product_id),
  foreign key (marketplace, product_id) references public.market_products(marketplace, product_id)
);

create index if not exists market_pipeline_runs_profile_captured_idx
  on public.market_pipeline_runs (profile_slug, captured_at desc);

create index if not exists market_observations_profile_date_rank_idx
  on public.market_observations (profile_slug, observed_date desc, rank_position);

create index if not exists market_observations_product_history_idx
  on public.market_observations (product_id, captured_at desc);

create or replace view public.market_latest_observations
with (security_invoker = true)
as
with latest_runs as (
  select distinct on (profile_slug)
    id,
    profile_slug,
    status,
    product_count,
    detail_success_rate,
    coverage
  from public.market_pipeline_runs
  where status = 'PASS'
  order by profile_slug, captured_at desc
)
select
  observation.profile_slug,
  observation.observed_date,
  observation.captured_at,
  observation.product_id,
  observation.merchant_id,
  observation.offer_key,
  product.title,
  product.brand,
  product.category,
  product.canonical_url as url,
  merchant.name as seller_name,
  merchant.score as seller_score,
  observation.price,
  observation.original_price,
  observation.discount_percent,
  observation.price_delta_percent,
  observation.currency,
  observation.rank_scope,
  observation.rank_scope_label,
  observation.rank_position,
  observation.composite_position,
  observation.rank_delta,
  observation.trend_score,
  observation.opportunity_score,
  observation.stock_status,
  observation.stock_signal,
  observation.sales_signal,
  observation.sales_signal_days,
  observation.sales_signal_min,
  observation.sales_signal_daily_min,
  observation.rating,
  observation.rating_count,
  observation.review_count,
  observation.review_delta,
  observation.question_count,
  observation.campaigns,
  observation.delivery_summary,
  observation.detail_status,
  latest_runs.status as run_status,
  latest_runs.product_count as run_product_count,
  latest_runs.detail_success_rate as run_detail_success_rate,
  latest_runs.coverage as run_coverage
from latest_runs
join public.market_observations observation on observation.run_id = latest_runs.id
join public.market_products product
  on product.marketplace = observation.marketplace and product.product_id = observation.product_id
left join public.market_merchants merchant
  on merchant.marketplace = observation.marketplace and merchant.merchant_id = observation.merchant_id;

alter table public.market_profiles enable row level security;
alter table public.market_pipeline_runs enable row level security;
alter table public.market_products enable row level security;
alter table public.market_merchants enable row level security;
alter table public.market_observations enable row level security;

create policy "Public can read market profiles"
  on public.market_profiles for select to anon, authenticated using (enabled = true);
create policy "Public can read successful market runs"
  on public.market_pipeline_runs for select to anon, authenticated using (status = 'PASS');
create policy "Public can read market products"
  on public.market_products for select to anon, authenticated using (true);
create policy "Public can read market merchants"
  on public.market_merchants for select to anon, authenticated using (true);
create policy "Public can read observations from successful runs"
  on public.market_observations for select to anon, authenticated using (
    exists (
      select 1
      from public.market_pipeline_runs run
      where run.id = market_observations.run_id and run.status = 'PASS'
    )
  );

grant select on public.market_profiles to anon, authenticated;
grant select on public.market_pipeline_runs to anon, authenticated;
grant select on public.market_products to anon, authenticated;
grant select on public.market_merchants to anon, authenticated;
grant select on public.market_observations to anon, authenticated;
grant select on public.market_latest_observations to anon, authenticated;

comment on view public.market_latest_observations is
  'Son başarılı Trendyol profil çalışmasının herkese açık ve normalize edilmiş gözlemleri.';
comment on column public.market_observations.sales_signal_daily_min is
  'Trendyol sayfasında görünen alt sınır satış etiketinin gün penceresine bölünmüş halidir; gerçek satış adedi değildir.';
