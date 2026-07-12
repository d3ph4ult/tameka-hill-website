import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { uploadPortfolioImage } from "@/app/admin/actions";
import { PortfolioRowActions } from "@/components/admin/portfolio-row-actions";

const inputClasses =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-accent";

export default async function AdminPortfolioPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login");

  const supabase = await createClient();
  const { data: images } = await supabase
    .from("portfolio_images")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">Portfolio</h1>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(images ?? []).map((image) => (
          <div key={image.id} className="card-shadow overflow-hidden rounded-2xl border border-line bg-bg-raised">
            <div className="relative aspect-[4/5] w-full">
              <Image src={image.image_url} alt={image.title} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-4">
              <div>
                <p className="text-sm font-semibold text-ink">{image.title}</p>
                <p className="text-xs text-ink-muted">
                  {image.category} · {image.is_published ? "Published" : "Draft"}
                </p>
              </div>
              <PortfolioRowActions id={image.id} imageUrl={image.image_url} isPublished={image.is_published} />
            </div>
          </div>
        ))}
      </div>

      <div className="card-shadow mt-8 rounded-2xl border border-line bg-bg-raised p-6">
        <h2 className="text-sm font-semibold text-ink">Upload photo</h2>
        <form action={uploadPortfolioImage} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="title" placeholder="Title" required className={inputClasses} />
            <input name="category" placeholder="Category (e.g. Speaking)" className={inputClasses} />
          </div>
          <input
            name="file"
            type="file"
            accept="image/*"
            required
            className="block w-full text-sm text-ink-muted file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
