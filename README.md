# Jordan Blake — Personal Brand Platform

A premium, minimalist personal-brand landing page and social media hub for a
public speaker / résumé-writing consultant: booking system, portfolio
gallery, testimonials, and an admin dashboard, all backed by Supabase.

Everything ships with placeholder demo content (name, bio, testimonials,
social handles, abstract portfolio art) — replace it with the real client's
copy and photography before launch. See [Placeholder content](#placeholder-content-to-replace).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (Postgres, Auth, Storage, Row Level Security)
- Resend (optional, for transactional email)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Supabase
configured, the public site still renders with placeholder content, and
`/admin` shows a setup notice instead of erroring.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the migrations in order:
   - `supabase/migrations/0001_init.sql` — tables, RLS policies, storage buckets
   - `supabase/migrations/0002_seed.sql` — demo social links, testimonials, portfolio items
3. Copy your project URL and anon key into `.env.local` as
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Create the admin account:
   - In Supabase Auth, add a user (email + password) for the client.
   - In the SQL editor, grant that user dashboard access:
     ```sql
     insert into admins (user_id, email)
     values ('<the user''s auth.users id>', '<their email>');
     ```
5. Sign in at `/admin/login`.

Row Level Security enforces access at the database level: anyone can submit a
booking or contact form and log a social click; only rows in `admins` can
read/manage bookings, messages, testimonials, social links, and portfolio
images. See `supabase/migrations/0001_init.sql` for the full policy set.

### Optional: transactional email

Booking requests and contact form submissions are saved to Supabase either
way. To also send confirmation/notification emails, add a
[Resend](https://resend.com) API key and a verified from-address to
`RESEND_API_KEY` / `RESEND_FROM_EMAIL`. Without them, email sending is
silently skipped.

## Admin dashboard

`/admin` (gated by Supabase Auth + the `admins` allow-list table):

- **Overview** — pending bookings, unread messages, published testimonials, 30-day social clicks
- **Bookings** — filter by status, confirm/decline/complete/cancel
- **Testimonials** — publish/unpublish, delete, add new
- **Social Links** — edit label/username/URL/description, toggle active
- **Portfolio** — upload photos (Supabase Storage), publish/unpublish, delete
- **Messages** — contact form submissions, mark read, delete

## Project structure

```
src/
  app/
    page.tsx              Homepage — assembles all sections
    actions/               Public server actions (booking, contact, social click)
    admin/
      login/               Public login page
      (protected)/         Auth-gated dashboard routes
      actions.ts            Admin server actions
  components/
    layout/                Nav, footer
    sections/               Hero, services, booking, portfolio, testimonials, FAQ, contact, CTA
    admin/                  Admin dashboard UI
    ui/                     Shared primitives (Button)
  lib/
    supabase/               Browser/server Supabase clients
    data.ts                 Public data fetchers (with fallback content)
    validation.ts            Zod schemas for the booking/contact forms
    constants.ts             Site copy: nav, services, FAQ, stats
supabase/
  migrations/                SQL schema, RLS policies, storage buckets, seed data
```

## Placeholder content to replace

- Name, bio, and stats: `src/lib/constants.ts`, `src/components/sections/hero.tsx`, `src/components/sections/about.tsx`
- Contact info (email/phone/WhatsApp/hours): `src/lib/constants.ts` (`site` object)
- Social links, testimonials, portfolio photos: seeded in Supabase — edit via `/admin` once connected, or update `supabase/migrations/0002_seed.sql` before first run
- Portfolio placeholder art: `public/portfolio/*.svg` (abstract stage-lighting graphics — swap for real event photography)
- Legal pages: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` are boilerplate and need real legal review before launch

## Deploying

Deploy to [Vercel](https://vercel.com/new), set the environment variables
from `.env.example` in the project settings, and point
`NEXT_PUBLIC_SITE_URL` at the production domain.
