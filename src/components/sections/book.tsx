import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { book } from "@/lib/constants";

export function Book() {
  return (
    <section id="book" className="py-24 sm:py-28">
      <div className="content-shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="mx-auto grid w-full max-w-md grid-cols-[1.3fr_1fr] items-center gap-5 lg:max-w-none">
          <div className="card-shadow-lg relative aspect-[2/3] w-full -rotate-2 overflow-hidden rounded-sm">
            <Image
              src={book.coverImage}
              alt={`Tameka Hill signing copies of ${book.title}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            {book.supportingImages.map((image) => (
              <div key={image.src} className="card-shadow relative aspect-square w-full overflow-hidden rounded-sm">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{book.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">{book.title}</h2>
          <p className="mt-3 font-display text-lg italic text-ink-muted">{book.subtitle}</p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">{book.description}</p>

          {book.details.length > 0 && (
            <ul className="mt-7 space-y-2.5">
              {book.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-9">
            <Button href={book.href} target="_blank" rel="noopener noreferrer" size="lg">
              {book.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
