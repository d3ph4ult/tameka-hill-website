import { Check, FileText, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
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

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {serviceCategories.map((service) => {
          const Icon = serviceIcons[service.id] ?? Mic;
          return (
            <div
              key={service.id}
              id={service.id}
              className="gold-glow relative scroll-mt-28 rounded-sm border border-panel-line bg-panel p-7"
            >
              <span aria-hidden="true" className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-gold-border" />
              <span aria-hidden="true" className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-gold-border" />
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-gold-border" />
              <span aria-hidden="true" className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-gold-border" />

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-border/60 bg-panel-accent-soft text-gold-border">
                <Icon size={19} aria-hidden="true" />
              </span>
              <p className="eyebrow mt-4 text-gold-border">{service.eyebrow}</p>
              <h3 className="mt-3 font-display text-xl font-medium text-panel-ink">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-panel-ink-muted">{service.description}</p>

              <ul className="mt-5 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-panel-ink">
                    <Check size={15} className="mt-0.5 shrink-0 text-gold-border" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button href="#booking" size="md">
                  Learn More
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
