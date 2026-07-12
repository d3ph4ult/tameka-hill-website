"use client";

import { useTransition } from "react";
import { deletePortfolioImage, togglePortfolioPublished } from "@/app/admin/actions";

export function PortfolioRowActions({
  id,
  imageUrl,
  isPublished,
}: {
  id: string;
  imageUrl: string;
  isPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => togglePortfolioPublished(id, !isPublished))}
        className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (confirm("Delete this image?")) {
            startTransition(() => deletePortfolioImage(id, imageUrl));
          }
        }}
        className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-400 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
