create extension if not exists pgcrypto;

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tool_name text not null,
  vote text not null check (vote in ('yes', 'no')),
  comment text,
  page_path text not null default '/',
  user_agent text,
  notification_status text not null default 'pending'
    check (notification_status in ('pending', 'sent', 'failed')),
  notification_id text,
  notification_error text
);

create index if not exists feedback_submissions_created_at_idx
  on public.feedback_submissions (created_at desc);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project_type text not null,
  budget text not null,
  message text,
  page_path text not null default '/is-birligi',
  user_agent text,
  notification_status text not null default 'pending'
    check (notification_status in ('pending', 'sent', 'failed')),
  notification_id text,
  notification_error text
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.feedback_submissions enable row level security;
alter table public.contact_submissions enable row level security;

revoke all on table public.feedback_submissions from anon, authenticated;
revoke all on table public.contact_submissions from anon, authenticated;

comment on table public.feedback_submissions is
  'Veri Mimarı araçlarından gönderilen geri bildirimler. Yalnızca service role erişir.';

comment on table public.contact_submissions is
  'İş birliği formundan gönderilen talepler. Yalnızca service role erişir.';
