import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSocialLink } from "@/app/admin/actions";

const inputClasses =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-accent";

export default async function AdminSocialLinksPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const supabase = await createClient();
  const { data: links } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Social Links</h1>
      <p className="mt-1 text-sm text-ink-muted">
        These power the Social Media Hub on the homepage and the footer.
      </p>

      <div className="mt-6 space-y-4">
        {(links ?? []).map((link) => (
          <form
            key={link.id}
            action={updateSocialLink.bind(null, link.id)}
            className="card-shadow rounded-2xl border border-line bg-bg-raised p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold capitalize text-ink">{link.platform}</p>
              <label className="flex items-center gap-2 text-xs font-medium text-ink-muted">
                <input type="checkbox" name="is_active" defaultChecked={link.is_active} className="accent-accent" />
                Active
              </label>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-muted">Label</label>
                <input name="label" defaultValue={link.label} required className={inputClasses} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink-muted">Username / handle</label>
                <input name="username" defaultValue={link.username} required className={inputClasses} />
              </div>
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-ink-muted">URL</label>
              <input name="url" type="url" defaultValue={link.url} required className={inputClasses} />
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-ink-muted">Description</label>
              <input name="description" defaultValue={link.description ?? ""} className={inputClasses} />
            </div>

            <button
              type="submit"
              className="mt-4 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
            >
              Save
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
