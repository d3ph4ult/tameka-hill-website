-- Jordan Blake platform: core schema
-- Run in order against a fresh Supabase project (SQL editor or `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- helpers
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- admins: allow-list of Supabase Auth users who can access the admin dashboard
-- ---------------------------------------------------------------------------

create table if not exists admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

create policy "admins can read their own row"
  on admins for select
  to authenticated
  using (user_id = auth.uid());

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- bookings
-- ---------------------------------------------------------------------------

create type booking_service as enum (
  'public_speaking',
  'resume_writing',
  'career_coaching',
  'consultation'
);

create type booking_format as enum ('virtual', 'in_person');

create type booking_status as enum (
  'pending',
  'confirmed',
  'cancellation_requested',
  'cancelled',
  'completed'
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  service booking_service not null,
  event_format booking_format not null,
  preferred_date date not null,
  preferred_time time,
  location text,
  notes text,
  status booking_status not null default 'pending',
  admin_note text
);

create trigger bookings_set_updated_at
  before update on bookings
  for each row execute function set_updated_at();

alter table bookings enable row level security;

create policy "anyone can request a booking"
  on bookings for insert
  to anon, authenticated
  with check (status = 'pending');

create policy "admins manage bookings"
  on bookings for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- contact submissions
-- ---------------------------------------------------------------------------

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false
);

alter table contact_submissions enable row level security;

create policy "anyone can send a message"
  on contact_submissions for insert
  to anon, authenticated
  with check (is_read = false);

create policy "admins manage contact submissions"
  on contact_submissions for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  occupation text,
  service_used booking_service,
  rating smallint not null default 5 check (rating between 1 and 5),
  quote text not null,
  photo_url text,
  is_published boolean not null default false,
  sort_order integer not null default 0
);

create trigger testimonials_set_updated_at
  before update on testimonials
  for each row execute function set_updated_at();

alter table testimonials enable row level security;

create policy "published testimonials are public"
  on testimonials for select
  to anon, authenticated
  using (is_published = true);

create policy "admins manage testimonials"
  on testimonials for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- social links + click tracking
-- ---------------------------------------------------------------------------

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  platform text not null unique,
  label text not null,
  username text not null,
  description text,
  url text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0
);

create trigger social_links_set_updated_at
  before update on social_links
  for each row execute function set_updated_at();

alter table social_links enable row level security;

create policy "active social links are public"
  on social_links for select
  to anon, authenticated
  using (is_active = true);

create policy "admins manage social links"
  on social_links for all
  to authenticated
  using (is_admin())
  with check (is_admin());

create table if not exists social_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  platform text not null
);

alter table social_clicks enable row level security;

create policy "anyone can log a social click"
  on social_clicks for insert
  to anon, authenticated
  with check (true);

create policy "admins read social clicks"
  on social_clicks for select
  to authenticated
  using (is_admin());

-- ---------------------------------------------------------------------------
-- portfolio / speaking gallery
-- ---------------------------------------------------------------------------

create table if not exists portfolio_images (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text,
  image_url text not null,
  is_published boolean not null default true,
  sort_order integer not null default 0
);

alter table portfolio_images enable row level security;

create policy "published portfolio images are public"
  on portfolio_images for select
  to anon, authenticated
  using (is_published = true);

create policy "admins manage portfolio images"
  on portfolio_images for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- storage: public buckets for portfolio + testimonial photos
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('testimonials', 'testimonials', true)
on conflict (id) do nothing;

create policy "public read portfolio bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

create policy "admins write portfolio bucket"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'portfolio' and is_admin())
  with check (bucket_id = 'portfolio' and is_admin());

create policy "public read testimonials bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'testimonials');

create policy "admins write testimonials bucket"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'testimonials' and is_admin())
  with check (bucket_id = 'testimonials' and is_admin());

-- ---------------------------------------------------------------------------
-- indexes
-- ---------------------------------------------------------------------------

-- Prevent two active bookings from claiming the same date + time slot.
create unique index if not exists bookings_no_double_booking
  on bookings (preferred_date, preferred_time)
  where preferred_time is not null and status in ('pending', 'confirmed');

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_preferred_date_idx on bookings (preferred_date);
create index if not exists social_clicks_platform_idx on social_clicks (platform, created_at);
create index if not exists testimonials_published_idx on testimonials (is_published, sort_order);
create index if not exists portfolio_published_idx on portfolio_images (is_published, sort_order);
