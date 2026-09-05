begin;
set local lock_timeout = '5s';
-- Additive: old observations keep unknown metrics, never fabricated stock zeros.
alter table public.market_observations add column if not exists metrics jsonb not null default '{}'::jsonb;
alter table public.market_taxonomy_product_observations add column if not exists metrics jsonb not null default '{}'::jsonb;
comment on column public.market_observations.metrics is 'Public reported stock for an identified merchant/listing/variant; inventory decline estimates are not confirmed orders.';
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
  latest_runs.coverage as run_coverage,
  observation.metrics
from latest_runs
join public.market_observations observation on observation.run_id = latest_runs.id
join public.market_products product
  on product.marketplace = observation.marketplace and product.product_id = observation.product_id
left join public.market_merchants merchant
  on merchant.marketplace = observation.marketplace and merchant.merchant_id = observation.merchant_id;
commit;
