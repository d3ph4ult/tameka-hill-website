"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/actions";
import type { BookingStatus } from "@/lib/types";

const actionsByStatus: Record<BookingStatus, { label: string; next: BookingStatus }[]> = {
  pending: [
    { label: "Confirm", next: "confirmed" },
    { label: "Decline", next: "cancelled" },
  ],
  confirmed: [
    { label: "Mark completed", next: "completed" },
    { label: "Cancel", next: "cancelled" },
  ],
  cancellation_requested: [
    { label: "Confirm cancellation", next: "cancelled" },
    { label: "Keep booking", next: "confirmed" },
  ],
  cancelled: [],
  completed: [],
};

export function BookingRowActions({ id, status }: { id: string; status: BookingStatus }) {
  const [isPending, startTransition] = useTransition();
  const actions = actionsByStatus[status];

  if (actions.length === 0) return null;

  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => updateBookingStatus(id, action.next))}
          className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
