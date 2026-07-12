"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trustStats } from "@/lib/constants";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-accent-soft/70 to-transparent"
      />
      <div className="content-shell grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="eyebrow"
          >
            Speaker &middot; Career Strategist &middot; Résumé Writer
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-5 text-[2.6rem] font-medium leading-[1.08] text-ink sm:text-6xl"
          >
            Empowering careers through professional speaking and expert résumé writing.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            Jordan helps organizations move audiences from the stage and helps
            professionals get hired on paper — through keynotes, workshops,
            one-on-one coaching, and résumés built to be read.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#booking" size="lg">
              Book a Speaking Session
            </Button>
            <Button href="#booking" size="lg" variant="secondary">
              Get Your Résumé Reviewed
            </Button>
          </motion.div>

          <motion.dl
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-medium text-ink">{stat.value}</dd>
                <dd className="mt-1 text-sm text-ink-muted">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card-shadow-lg relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]"
          >
            <Image
              src="/portfolio/stage-04.svg"
              alt="Abstract spotlight portrait illustration representing Jordan Blake on stage"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="card-shadow absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-line bg-bg-raised px-5 py-4 sm:-left-8"
          >
            <div className="flex text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">4.9 / 5 average rating</p>
              <p className="text-xs text-ink-muted">From 180+ clients</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card-shadow absolute -top-5 -right-3 rounded-xl border border-line bg-bg-raised px-4 py-2.5 text-xs font-semibold text-accent sm:-right-6"
          >
            Booking Fall engagements
          </motion.div>
        </div>
      </div>
    </section>
  );
}
