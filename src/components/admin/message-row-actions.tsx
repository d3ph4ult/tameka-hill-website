"use client";

import { useTransition } from "react";
import { deleteContactSubmission, markContactRead } from "@/app/admin/actions";

export function MessageRowActions({ id, isRead }: { id: string; isRead: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => markContactRead(id, !isRead))}
        className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {isRead ? "Mark unread" : "Mark read"}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (confirm("Delete this message?")) {
            startTransition(() => deleteContactSubmission(id));
          }
        }}
        className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-400 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
