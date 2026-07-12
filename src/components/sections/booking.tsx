import { BookingForm } from "@/components/sections/booking-form";

export function Booking() {
  return (
    <section id="booking" className="py-24 sm:py-28">
      <div className="content-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">Book a Service</p>
          <h2 className="mt-3 text-3xl font-medium text-ink sm:text-4xl">
            Tell us what you need
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-muted">
            Share a few details and Jordan&rsquo;s team will confirm availability
            within two business days. Every request is reviewed by a person —
            never auto-approved.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
