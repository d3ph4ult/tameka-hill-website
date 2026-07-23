import { Check, FileText, Mic } from "lucide-react";
import { serviceCategories } from "@/lib/constants";

const serviceIcons: Record<string, typeof Mic> = {
  speaking: Mic,
  "resume-writing": FileText,
};

export function Services() {
  return (
    <div>
      <p className="eyebrow text-accent-contrast">What Tameka Offers</p>
      <h2 className="mt-3 text-3xl font-medium text-accent-contrast sm:text-4xl">
        Two crafts, one standard
      </h2>
      <p className="mt-4 text-base leading-relaxed text-accent-contrast/70">
        Every service is built around a single outcome: the room
        remembers you, or the hiring manager keeps reading.
      </p>

      <div className="mt-8 divide-y divide-line rounded-sm border border-line bg-bg-raised text-ink">
        {serviceCategories.map((service) => {
          const Icon = serviceIcons[service.id] ?? Mic;
          return (
            <div key={service.id} id={service.id} className="scroll-mt-28 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="eyebrow text-ink">{service.eyebrow}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-medium text-ink">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{service.description}</p>

              <ul className="mt-5 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
