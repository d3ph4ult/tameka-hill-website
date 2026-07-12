import type { Metadata } from "next";
import { site } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <main className="content-shell py-24">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-3xl font-medium text-ink">Terms of Service</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: placeholder — replace before launch.</p>

        <div className="prose mt-8 space-y-6 text-sm leading-relaxed text-ink-muted">
          <p>
            This is placeholder legal copy generated as part of the site
            template. Replace it with terms reviewed by a qualified
            professional before this site goes live.
          </p>

          <section>
            <h2 className="text-base font-semibold text-ink">Bookings</h2>
            <p className="mt-2">
              Submitting the booking form is a request, not a confirmed
              engagement. Availability, pricing, and scope are confirmed
              directly with you before any agreement is final. Deposits and
              cancellation terms will be outlined in your booking
              confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">Résumé &amp; career documents</h2>
            <p className="mt-2">
              Turnaround times listed on this site are estimates. Delivered
              documents include one round of revisions unless otherwise
              agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">Website use</h2>
            <p className="mt-2">
              This site and its content are provided as-is. Testimonials
              reflect individual client experiences and are not a guarantee
              of results.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-accent">{site.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
