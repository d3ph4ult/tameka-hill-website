"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { trackSocialClick } from "@/app/actions/social";
import { socialIconMap } from "@/lib/social-icons";
import type { SocialLink } from "@/lib/types";

export function SocialHub({ socialLinks }: { socialLinks: SocialLink[] }) {
  if (socialLinks.length === 0) return null;

  return (
    <section className="bg-bg-soft py-24 sm:py-28">
      <div className="content-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Connect</p>
          <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">
            One place to follow the work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Event clips, career tips, and behind-the-scenes moments — pick the
            platform you&rsquo;re already on.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((link, i) => {
            const Icon = socialIconMap[link.platform];
            return (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    void trackSocialClick(link.platform);
                  }}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-bg-raised p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_40px_-20px_rgba(18,41,79,0.35)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                      {Icon ? <Icon size={19} aria-hidden="true" /> : null}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>

                  <div>
                    <p className="font-display text-lg font-medium text-ink">{link.label}</p>
                    <p className="text-sm text-ink-muted">{link.username}</p>
                    {link.description && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{link.description}</p>
                    )}
                  </div>

                  <span className="text-sm font-semibold text-accent">Follow &rarr;</span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
