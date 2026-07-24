"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { trackSocialClick } from "@/app/actions/social";
import { socialIconMap } from "@/lib/social-icons";
import type { PortfolioImage, SocialLink } from "@/lib/types";

export function SocialHub({
  socialLinks,
  images = [],
}: {
  socialLinks: SocialLink[];
  images?: PortfolioImage[];
}) {
  if (socialLinks.length === 0) return null;

  const filmstrip = images.slice(0, 4);

  return (
    <section className="py-24 sm:py-28">
      <div className="content-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent-contrast">Connect</p>
            <h2 className="mt-3 text-3xl font-medium text-accent-contrast sm:text-4xl">
              One place to follow the work
            </h2>
            <p className="mt-4 text-base leading-relaxed text-accent-contrast/70">
              Event clips, career tips, and behind-the-scenes moments — pick the
              platform you&rsquo;re already on.
            </p>
          </div>

          {filmstrip.length > 0 && (
            <ul className="flex shrink-0 gap-3" aria-hidden="true">
              {filmstrip.map((image, i) => (
                <li
                  key={image.id}
                  className="card-shadow gold-glow relative hidden aspect-square w-16 overflow-hidden rounded-sm border-4 border-gold-border sm:block"
                  style={{ marginTop: i % 2 === 1 ? "1.25rem" : 0 }}
                >
                  <Image src={image.image_url} alt="" fill sizes="64px" className="object-cover" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {socialLinks.map((link, i) => {
            const Icon = socialIconMap[link.platform];
            return (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    void trackSocialClick(link.platform);
                  }}
                  className="group flex h-full flex-col justify-between gap-6 rounded-sm gold-glow border-[16px] border-gold-border bg-panel p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-border/60 bg-panel-accent-soft text-gold-border">
                      {Icon ? <Icon size={19} aria-hidden="true" /> : null}
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="text-panel-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-border"
                    />
                  </div>

                  <div>
                    <p className="font-display text-lg font-medium text-panel-ink">{link.label}</p>
                    <p className="text-sm text-panel-ink-muted">{link.username}</p>
                    {link.description && (
                      <p className="mt-2 text-sm leading-relaxed text-panel-ink-muted">{link.description}</p>
                    )}
                  </div>

                  <span className="text-sm font-semibold text-gold-border">Follow &rarr;</span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
