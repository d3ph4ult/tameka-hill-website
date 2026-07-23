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
    <section id="top" className="pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="content-shell">
        <div className="relative overflow-hidden rounded-sm border border-line bg-bg-raised p-6 card-shadow-lg sm:p-10 lg:p-14">
          {/* Oversized ghost monogram: a quiet corporate-seal watermark that fills
              the negative space behind the title instead of leaving it empty. */}
          <p
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 select-none font-display text-[9rem] font-medium leading-none text-accent/[0.06] sm:text-[13rem] lg:bottom-8 lg:left-8 lg:text-[15rem]"
          >
            TH
          </p>

          {/* Top label row: eyebrow left, monogram seal right */}
          <div className="relative flex items-start justify-between gap-4">
            <motion.p
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="eyebrow text-ink"
            >
              Speaker &middot; Career Strategist &middot; Résumé Writer
            </motion.p>

            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="ring-1 ring-gold/50 ring-offset-2 ring-offset-bg-raised flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line font-display text-xs font-semibold tracking-wide text-accent"
              aria-hidden="true"
            >
              TH
            </motion.div>
          </div>

          {/* Giant overlapping title + photo: the title runs full width (unconstrained)
              so the photo, pinned top-right at z-10, genuinely overlaps its trailing
              letters instead of just sitting beside it. Everything below the title
              reserves the photo's width so it doesn't run underneath it. */}
          <div className="relative mt-6">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="relative z-0 font-display text-[2.4rem] font-black leading-[0.92] tracking-tighter text-ink sm:text-6xl lg:text-[8rem] lg:leading-[0.88]"
            >
              Empowering
              <br />
              Careers.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto mt-10 w-full max-w-[15rem] sm:max-w-[17rem] lg:absolute lg:-top-6 lg:-right-8 lg:mt-0 lg:w-[76%] lg:max-w-[58rem]"
            >
              <Image
                src="/hero-new/portrait-cutout.webp"
                alt="Portrait of Tameka Hill"
                width={1700}
                height={2848}
                priority
                sizes="(min-width: 1024px) 22vw, 55vw"
                className="h-auto w-full drop-shadow-[0_18px_30px_rgba(24,20,15,0.28)]"
              />

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="card-shadow absolute top-6 -right-3 rounded-sm border border-line bg-bg-raised px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink sm:-right-5"
              >
                Booking Fall engagements
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card-shadow absolute bottom-10 -left-4 flex items-center gap-3 rounded-sm border border-line bg-bg-raised px-5 py-4 sm:-left-8"
              >
                <div className="flex text-ink" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">4.9 / 5 average rating</p>
                  <p className="text-xs text-ink-muted">From 180+ clients</p>
                </div>
              </motion.div>
            </motion.div>

            <div className="relative z-20 mt-6 lg:pr-[48%]">
              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="max-w-lg font-display text-2xl italic leading-snug text-ink-muted sm:text-3xl"
              >
                Through professional <span className="text-accent text-shine">speaking</span> and expert{" "}
                <span className="text-accent text-shine">résumé writing</span>.
              </motion.p>

              <motion.p
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted"
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
                <Button
                  href="#booking"
                  size="lg"
                  variant="secondary"
                  className="bg-bg/[0.02] backdrop-blur-[2px]"
                >
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
            className="card-shadow-lg relative z-20 mt-14 grid grid-cols-2 divide-y divide-line-soft/60 rounded-sm border border-line bg-bg/[0.02] backdrop-blur-[2px] sm:grid-cols-4 sm:divide-y-0 sm:divide-x lg:mt-10 lg:max-w-[52%] lg:grid-cols-2 lg:divide-x-0 lg:divide-y"
          >
            {trustStats.map((stat, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
                <div key={stat.label} className="flex items-center gap-3 px-6 py-5">
                  <Icon size={20} className="shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-xl font-medium text-ink sm:text-2xl">{stat.value}</dd>
                    <dd className="text-xs text-ink-muted">{stat.label}</dd>
                  </div>
                </div>
              );
            })}
          </motion.dl>

          <p className="relative z-20 mt-6 text-center text-xs text-ink-faint sm:text-left">{site.hours}</p>
        </div>
      </div>
    </section>
  );
}
