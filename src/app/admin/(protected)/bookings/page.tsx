import Link from "next/link";
import { redirect } from "next/navigation";
import { clsx } from "clsx";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { serviceLabels } from "@/lib/constants";
import { BookingRowActions } from "@/components/admin/booking-row-actions";
import type { BookingStatus } from "@/lib/types";

const tabs: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const { status } = await searchParams;
  const activeStatus = (status as BookingStatus | undefined) ?? "all";

  const supabase = await createClient();
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (activeStatus !== "all") {
    query = query.eq("status", activeStatus);
  }
  const { data: bookings } = await query;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Bookings</h1>

      <div className="mt-5 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value === "all" ? "/admin/bookings" : `/admin/bookings?status=${tab.value}`}
            className={clsx(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeStatus === tab.value
                ? "bg-accent text-accent-contrast"
                : "border border-line bg-bg-raised text-ink-muted hover:text-ink"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="card-shadow mt-6 overflow-hidden rounded-2xl border border-line bg-bg-raised">
        <ul className="divide-y divide-line-soft">
          {(bookings ?? []).map((booking) => (
            <li key={booking.id} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">{booking.full_name}</p>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent capitalize">
                    {booking.status.replace("_", " ")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">
                  {serviceLabels[booking.service] ?? booking.service} · {booking.event_format === "in_person" ? "In person" : "Virtual"} · {booking.preferred_date}
                  {booking.preferred_time ? ` at ${booking.preferred_time}` : ""}
                </p>
                <p className="mt-1 text-xs text-ink-faint">
                  <a href={`mailto:${booking.email}`} className="hover:text-accent">{booking.email}</a>
                  {booking.phone ? ` · ${booking.phone}` : ""}
                </p>
                {booking.notes && <p className="mt-2 max-w-xl text-sm text-ink-muted">{booking.notes}</p>}
              </div>
              <BookingRowActions id={booking.id} status={booking.status} />
            </li>
          ))}
          {(bookings ?? []).length === 0 && (
            <li className="px-5 py-8 text-sm text-ink-muted">No bookings in this view.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
