import Link from "next/link";
import type { SocialLink } from "@/lib/types";
import { navLinks, serviceCategories, site } from "@/lib/constants";
import { socialIconMap } from "@/lib/social-icons";

export function SiteFooter({ socialLinks }: { socialLinks: SocialLink[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="content-shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="#top" className="flex items-center gap-2.5 font-display text-lg font-medium text-ink">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-contrast"
            >
              TH
            </span>
            {site.name}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Speaking, coaching, and career documents that help people get in the room — and get the job.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-ink-muted hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceCategories.map((service) => (
              <li key={service.id}>
                <a href={`#${service.id}`} className="text-sm text-ink-muted hover:text-accent">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Social</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform];
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg text-ink-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {Icon ? <Icon size={17} aria-hidden="true" /> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="content-shell flex flex-col gap-3 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-accent">Privacy Policy</a>
            <a href="/terms" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
