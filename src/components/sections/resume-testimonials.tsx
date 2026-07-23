"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resumeTestimonialImages } from "@/lib/constants";

export function ResumeTestimonials() {
  if (resumeTestimonialImages.length === 0) return null;

  return (
    <section className="py-24 sm:py-28">
      <div className="content-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-contrast">Résumé Results</p>
          <h2 className="mt-3 text-3xl font-medium text-accent-contrast sm:text-4xl">
            In their own words
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {resumeTestimonialImages.map((image, i) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-shadow flex items-center justify-center rounded-sm border-[19px] border-gold-border bg-bg-raised p-3"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="h-auto w-full rounded-lg object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
