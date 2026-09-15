-- Kısmi taramalar da canlıya alınır; kalite sonucu raporda ayrıca tutulur.
alter table public.market_taxonomy_runs
  drop constraint if exists market_taxonomy_runs_status_check;

alter table public.market_taxonomy_runs
  add constraint market_taxonomy_runs_status_check
  check (status in ('LOADING', 'PASS', 'PARTIAL', 'FAIL'));

drop index if exists public.market_taxonomy_runs_date_idx;
create index if not exists market_taxonomy_runs_date_idx
  on public.market_taxonomy_runs (marketplace, observed_date desc)
  where status in ('PASS', 'PARTIAL');

drop policy if exists "Public can read successful taxonomy runs"
  on public.market_taxonomy_runs;
create policy "Public can read published taxonomy runs"
  on public.market_taxonomy_runs for select to anon, authenticated
  using (status in ('PASS', 'PARTIAL'));

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
      and run.status in ('PASS', 'PARTIAL')
      and (p_observed_date is null or run.observed_date <= p_observed_date)
    order by run.observed_date desc, run.captured_at desc
    limit 1
  ), previous_run as (
    select run.id
    from public.market_taxonomy_runs run, selected_run selected
    where run.marketplace = 'trendyol'
      and run.status in ('PASS', 'PARTIAL')
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

drop policy if exists "Public can read successful taxonomy product observations"
  on public.market_taxonomy_product_observations;
create policy "Public can read published taxonomy product observations"
  on public.market_taxonomy_product_observations for select to anon, authenticated using (
    exists (
      select 1 from public.market_taxonomy_runs run
      where run.id = market_taxonomy_product_observations.run_id
        and run.status in ('PASS', 'PARTIAL')
    )
  );

drop policy if exists "Public can read successful taxonomy rankings"
  on public.market_taxonomy_rankings;
create policy "Public can read published taxonomy rankings"
  on public.market_taxonomy_rankings for select to anon, authenticated using (
    exists (
      select 1 from public.market_taxonomy_runs run
      where run.id = market_taxonomy_rankings.run_id
        and run.status in ('PASS', 'PARTIAL')
    )
  );

comment on table public.market_taxonomy_runs is
  'Trendyol kategori koşuları; PARTIAL kayıtlar da mevcut tarama verisini canlıda tutar ve kalite uyarısını korur.';
