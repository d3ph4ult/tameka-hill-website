import Link from "next/link";
import type { SocialLink } from "@/lib/types";
import { navLinks, serviceCategories, site } from "@/lib/constants";
import { socialIconMap } from "@/lib/social-icons";

export function SiteFooter({ socialLinks }: { socialLinks: SocialLink[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent-contrast/15 bg-bg">
      <div className="content-shell flex flex-col gap-10 py-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="max-w-xs">
          <Link href="#top" className="flex items-center gap-2.5 font-display text-lg font-medium text-accent-contrast">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-contrast text-sm font-semibold text-accent"
            >
              TH
            </span>
            {site.name}
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-accent-contrast/70">
            Speaking, coaching, and career documents that help people get in the room — and get the job.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <div>
            <h3 className="eyebrow text-accent-contrast">Quick Links</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 lg:flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-accent-contrast/70 hover:text-gold-strong">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-accent-contrast">Services</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 lg:flex-col">
              {serviceCategories.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`} className="text-sm text-accent-contrast/70 hover:text-gold-strong">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex flex-wrap gap-3 lg:shrink-0">
          {socialLinks.map((link) => {
            const Icon = socialIconMap[link.platform];
            return (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="gold-glow flex h-10 w-10 items-center justify-center rounded-full border-4 border-gold-border bg-transparent text-accent-contrast/70 transition-colors hover:text-accent-contrast"
                >
                  {Icon ? <Icon size={17} aria-hidden="true" /> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-accent-contrast/15">
        <div className="content-shell flex flex-col gap-3 py-6 text-xs text-accent-contrast/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-gold-strong">Privacy Policy</a>
            <a href="/terms" className="hover:text-gold-strong">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
