import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createTestimonial } from "@/app/admin/actions";
import { TestimonialRowActions } from "@/components/admin/testimonial-row-actions";

const inputClasses =
  "w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-accent";

export default async function AdminTestimonialsPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Testimonials</h1>

      <div className="card-shadow mt-6 overflow-hidden rounded-2xl border border-line bg-bg-raised">
        <ul className="divide-y divide-line-soft">
          {(testimonials ?? []).map((t) => (
            <li key={t.id} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                    {t.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">{t.occupation}</p>
                <p className="mt-2 max-w-xl text-sm text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <TestimonialRowActions id={t.id} isPublished={t.is_published} />
            </li>
          ))}
          {(testimonials ?? []).length === 0 && (
            <li className="px-5 py-8 text-sm text-ink-muted">No testimonials yet.</li>
          )}
        </ul>
      </div>

      <div className="card-shadow mt-8 rounded-2xl border border-line bg-bg-raised p-6">
        <h2 className="text-sm font-semibold text-ink">Add testimonial</h2>
        <form action={createTestimonial} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" placeholder="Name" required className={inputClasses} />
            <input name="occupation" placeholder="Occupation" className={inputClasses} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <select name="service_used" defaultValue="" className={inputClasses}>
              <option value="">No service linked</option>
              <option value="public_speaking">Public speaking</option>
              <option value="resume_writing">Résumé writing</option>
              <option value="career_coaching">Career coaching</option>
              <option value="consultation">Consultation</option>
            </select>
            <select name="rating" defaultValue="5" className={inputClasses}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} star{n === 1 ? "" : "s"}</option>
              ))}
            </select>
          </div>
          <textarea name="quote" placeholder="Quote" required rows={3} className={inputClasses} />
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input type="checkbox" name="is_published" defaultChecked className="accent-accent" />
            Publish immediately
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            Add testimonial
          </button>
        </form>
      </div>
    </div>
  );
}
