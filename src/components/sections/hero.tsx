"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { BookOpen, Mic, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, trustStats } from "@/lib/constants";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const statIcons = [Users, BookOpen, Mic, Star];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Oversized ghost monogram: a quiet gold watermark that fills the
          negative space behind the title instead of leaving it empty. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-4 select-none font-display text-[9rem] font-medium leading-none text-gold-border/[0.07] sm:text-[13rem] lg:bottom-8 lg:left-8 lg:text-[15rem]"
      >
        TH
      </p>

      <div className="content-shell relative">
        {/* Top label row: eyebrow left, monogram seal right */}
        <div className="relative flex items-start justify-between gap-4">
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="eyebrow text-accent-contrast"
          >
            Speaker &middot; Career Strategist &middot; Résumé Writer
          </motion.p>

          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="ring-1 ring-gold-border/50 ring-offset-2 ring-offset-bg flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-panel-line font-display text-xs font-semibold tracking-wide text-gold-border"
            aria-hidden="true"
          >
            TH
          </motion.div>
        </div>

        {/* Giant overlapping title + photo: the title runs full width (unconstrained)
            so the photo, pinned top-right, sits beside/over its trailing letters.
            Everything below the title reserves the photo's width so it doesn't
            run underneath it. */}
        <div className="relative mt-6">
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="gold-text-glow relative z-0 font-display text-[2.1rem] font-black uppercase leading-[0.95] tracking-tight text-gold-border sm:text-5xl lg:text-[5.5rem] lg:leading-[0.94]"
          >
            Empowering
            <br />
            Careers.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-10 w-full max-w-[15rem] sm:max-w-[17rem] lg:absolute lg:-top-4 lg:-right-16 lg:mt-0 lg:w-[48%] lg:max-w-[34rem]"
          >
            {/* Diamond gold-line frame sitting behind the portrait */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[8%] z-0 rotate-45 rounded-md border border-gold-border/70"
            />

            <Image
              src="/hero-new/portrait-cutout.webp"
              alt="Portrait of Tameka Hill"
              width={1700}
              height={2848}
              priority
              sizes="(min-width: 1024px) 22vw, 55vw"
              className="relative z-10 h-auto w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 right-2 z-20 rounded-sm border border-panel-line bg-panel/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-panel-ink backdrop-blur-sm"
            >
              Booking Fall engagements
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-10 -left-4 z-20 flex items-center gap-3 rounded-sm border border-panel-line bg-panel/85 px-5 py-4 backdrop-blur-sm sm:-left-8"
            >
              <div className="flex text-gold-border" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-panel-ink">4.9 / 5 average rating</p>
                <p className="text-xs text-panel-ink-muted">From 180+ clients</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative z-20 mt-6 lg:pr-[48%]">
            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="max-w-lg font-display text-2xl italic leading-snug text-accent-contrast/80 sm:text-3xl"
            >
              Through professional <span className="gold-text-glow text-gold-border">speaking</span> and expert{" "}
              <span className="gold-text-glow text-gold-border">résumé writing</span>.
            </motion.p>

            <motion.p
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-6 max-w-lg text-base leading-relaxed text-accent-contrast/70"
            >
              Tameka helps organizations move audiences from the stage and helps
              professionals get hired on paper — through keynotes, workshops,
              one-on-one coaching, and résumés built to be read.
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="relative z-20 mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#booking" size="lg">
                Book a Speaking Session
              </Button>
              <Button href="#booking" size="lg" variant="outline-inverse">
                Get Your Résumé Reviewed
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.dl
          custom={5}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="gold-glow relative z-20 mt-14 grid grid-cols-2 divide-y divide-panel-line-soft rounded-sm border border-panel-line bg-panel/60 backdrop-blur-sm sm:grid-cols-4 sm:divide-y-0 sm:divide-x lg:mt-10 lg:max-w-[52%] lg:grid-cols-2 lg:divide-x-0 lg:divide-y"
        >
          {trustStats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <div key={stat.label} className="flex items-center gap-3 px-6 py-5">
                <Icon size={20} className="shrink-0 text-gold-border" aria-hidden="true" />
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-xl font-medium text-panel-ink sm:text-2xl">{stat.value}</dd>
                  <dd className="text-xs text-panel-ink-muted">{stat.label}</dd>
                </div>
              </div>
            );
          })}
        </motion.dl>

        <p className="relative z-20 mt-6 text-center text-xs text-accent-contrast/50 sm:text-left">{site.hours}</p>
      </div>
    </section>
  );
}
