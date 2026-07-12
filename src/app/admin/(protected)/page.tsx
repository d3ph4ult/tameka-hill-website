import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { serviceLabels } from "@/lib/constants";
import { daysAgoIso } from "@/lib/dates";

export default async function AdminOverviewPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const supabase = await createClient();

  const [pendingBookings, unreadMessages, publishedTestimonials, recentClicks, recentBookings] =
    await Promise.all([
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("is_published", true),
      supabase
        .from("social_clicks")
        .select("id", { count: "exact", head: true })
        .gte("created_at", daysAgoIso(30)),
      supabase
        .from("bookings")
        .select("id, full_name, service, preferred_date, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const stats = [
    { label: "Pending bookings", value: pendingBookings.count ?? 0 },
    { label: "Unread messages", value: unreadMessages.count ?? 0 },
    { label: "Published testimonials", value: publishedTestimonials.count ?? 0 },
    { label: "Social clicks (30d)", value: recentClicks.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Overview</h1>

      <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-shadow rounded-2xl border border-line bg-bg-raised p-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-ink-faint">{stat.label}</dt>
            <dd className="mt-2 font-display text-3xl font-medium text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="card-shadow mt-8 rounded-2xl border border-line bg-bg-raised">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Recent booking requests</h2>
          <Link href="/admin/bookings" className="text-xs font-semibold text-accent">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-line-soft">
          {(recentBookings.data ?? []).map((booking) => (
            <li key={booking.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-ink">{booking.full_name}</p>
                <p className="text-xs text-ink-muted">
                  {serviceLabels[booking.service] ?? booking.service} · {booking.preferred_date}
                </p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent capitalize">
                {booking.status.replace("_", " ")}
              </span>
            </li>
          ))}
          {(recentBookings.data ?? []).length === 0 && (
            <li className="px-5 py-6 text-sm text-ink-muted">No bookings yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
