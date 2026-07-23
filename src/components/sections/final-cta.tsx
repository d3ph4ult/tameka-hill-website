import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-28">
      <div className="content-shell">
        <div className="card-shadow-lg relative overflow-hidden rounded-sm bg-bg-raised px-8 py-12 sm:px-14 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/5 via-transparent to-transparent"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-normal text-ink sm:text-4xl">
                Ready to elevate your career or inspire your audience?
              </h2>
              <p className="mt-4 text-base text-ink-muted">
                Book a speaking engagement or receive a professionally crafted
                résumé today.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button href="#booking" size="lg" variant="secondary">
                Book a Service
              </Button>
              <Button href="#contact" size="lg" variant="ghost">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
