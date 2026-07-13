import Image from "next/image";
import { resumeTestimonialImages } from "@/lib/constants";

export function ResumeTestimonials() {
  if (resumeTestimonialImages.length === 0) return null;

  return (
    <section className="py-24 sm:py-28">
      <div className="content-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Résumé Results</p>
          <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">
            In their own words
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {resumeTestimonialImages.map((image) => (
            <div
              key={image.src}
              className="card-shadow flex items-center justify-center rounded-2xl border border-line bg-bg-raised p-3"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
