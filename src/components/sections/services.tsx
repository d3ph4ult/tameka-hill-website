import { Check } from "lucide-react";
import { serviceCategories } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="bg-bg-soft py-24 sm:py-28">
      <div className="content-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">What Tameka Offers</p>
          <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">
            Two crafts, one standard
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Every service is built around a single outcome: the room
            remembers you, or the hiring manager keeps reading.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {serviceCategories.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="card-shadow flex scroll-mt-28 flex-col rounded-[1.75rem] border border-line bg-bg-raised p-8"
            >
              <span className="eyebrow">{service.eyebrow}</span>
              <h3 className="mt-3 font-display text-2xl font-medium text-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
