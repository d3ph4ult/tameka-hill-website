"use client";

import { useTransition } from "react";
import { deleteTestimonial, toggleTestimonialPublished } from "@/app/admin/actions";

export function TestimonialRowActions({ id, isPublished }: { id: string; isPublished: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => toggleTestimonialPublished(id, !isPublished))}
        className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (confirm("Delete this testimonial?")) {
            startTransition(() => deleteTestimonial(id));
          }
        }}
        className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-400 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
