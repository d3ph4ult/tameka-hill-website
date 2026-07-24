import Image from "next/image";

const highlights = [
  { label: "Years of experience", value: "12+" },
  { label: "Industries served", value: "Tech, healthcare, finance, education" },
  { label: "Certifications", value: "ICF-certified career coach" },
  { label: "Notable stages", value: "Regional summits & Fortune 500 offsites" },
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="content-shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-accent-contrast">About Tameka</p>
          <h2 className="mt-3 text-3xl font-medium text-accent-contrast sm:text-4xl">
            Twelve years on stage and behind the résumé, in service of the same goal.
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-accent-contrast/70">
            <p>
              Tameka Hill has spent the last decade helping people communicate
              their value — to a room of a thousand, and to a single hiring
              manager reading a résumé for six seconds. That dual perspective
              shapes every keynote, workshop, and document.
            </p>
            <p>
              Before speaking full-time, Tameka led talent development inside
              two Fortune 500 companies, which is where the résumé-writing
              practice started: watching qualified people get filtered out by
              documents that didn&rsquo;t do them justice.
            </p>
            <p>
              The mission is simple — give people the words and the moment
              they need to be taken seriously. Every engagement is built
              around the specific room or the specific reader, never a
              generic template.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-accent-contrast/20 pt-8">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-accent-contrast/50">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-accent-contrast">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="card-shadow relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm gold-glow border-[16px] border-gold-border lg:ml-auto lg:max-w-none">
            <Image
              src="/about-v3/portrait.jpg"
              alt="Portrait of Tameka Hill"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
