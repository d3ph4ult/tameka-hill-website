import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MessageRowActions } from "@/components/admin/message-row-actions";

export default async function AdminMessagesPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Messages</h1>

      <div className="card-shadow mt-6 overflow-hidden rounded-2xl border border-line bg-bg-raised">
        <ul className="divide-y divide-line-soft">
          {(messages ?? []).map((message) => (
            <li key={message.id} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">{message.subject}</p>
                  {!message.is_read && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-ink-muted">
                  {message.name} ·{" "}
                  <a href={`mailto:${message.email}`} className="hover:text-accent">{message.email}</a>
                </p>
                <p className="mt-2 max-w-xl text-sm text-ink-muted">{message.message}</p>
              </div>
              <MessageRowActions id={message.id} isRead={message.is_read} />
            </li>
          ))}
          {(messages ?? []).length === 0 && (
            <li className="px-5 py-8 text-sm text-ink-muted">No messages yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
