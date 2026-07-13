"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { serviceLabels } from "@/lib/constants";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  if (testimonials.length === 0) return null;

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = (card?.clientWidth ?? 320) + 20;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-bg-soft py-24 sm:py-28">
      <div className="content-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">
              What clients say afterward
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-raised text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-raised text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="card-shadow flex w-[85%] shrink-0 snap-start flex-col rounded-[1.75rem] border border-line bg-bg-raised p-8 sm:w-[46%] lg:w-[31%]"
            >
              <Quote size={28} className="text-accent-soft" aria-hidden="true" />
              <div className="mt-3 flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < t.rating ? "currentColor" : "none"}
                    strokeWidth={i < t.rating ? 0 : 1.5}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 border-t border-line-soft pt-4">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink-muted">
                  {t.occupation}
                  {t.occupation && t.service_used ? " · " : ""}
                  {t.service_used ? serviceLabels[t.service_used] : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
