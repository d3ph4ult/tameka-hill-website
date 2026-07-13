import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-28">
      <div className="content-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-contrast/10 via-transparent to-transparent"
          />
          <h2 className="relative font-display text-3xl font-medium text-accent-contrast sm:text-4xl">
            Ready to elevate your career or inspire your audience?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-accent-contrast/80">
            Book a speaking engagement or receive a professionally crafted
            résumé today.
          </p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#booking" size="lg">
              Book a Service
            </Button>
            <Button
              href="#contact"
              size="lg"
              variant="secondary"
              className="border-accent-contrast/30 bg-transparent text-accent-contrast hover:border-accent-contrast hover:text-accent-contrast"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
