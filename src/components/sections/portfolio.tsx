"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PortfolioImage } from "@/lib/types";

export function Portfolio({ images }: { images: PortfolioImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = (index: number, el: HTMLElement) => {
    triggerRef.current = el;
    setActiveIndex(index);
  };

  const close = () => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (activeIndex === null) return;
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) return null;

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <div>
      <p className="eyebrow text-accent-contrast">Portfolio</p>
      <h2 className="mt-3 text-3xl font-medium text-accent-contrast sm:text-4xl">
        From the stage and the studio
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-2">
        {images.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={(e) => open(index, e.currentTarget)}
              className="group block w-full text-left"
            >
              <span className="card-shadow relative block aspect-[4/5] w-full overflow-hidden rounded-sm border-4 border-gold-border">
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-2.5 block text-sm font-medium text-accent-contrast">{image.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-10"
            onClick={close}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full max-w-3xl outline-none"
            >
              <Image
                src={active.image_url}
                alt={active.title}
                width={900}
                height={1125}
                className="max-h-[80vh] w-auto rounded-sm border-4 border-gold-border object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/85">{active.title}</p>

              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-lg"
              >
                <X size={18} aria-hidden="true" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))}
                    className="absolute top-1/2 -left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg sm:-left-14"
                  >
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length))}
                    className="absolute top-1/2 -right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg sm:-right-14"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
