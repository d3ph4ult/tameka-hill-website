import type { Metadata } from "next";
import { site } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main className="content-shell py-24">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-3xl font-medium text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated: placeholder — replace before launch.</p>

        <div className="prose mt-8 space-y-6 text-sm leading-relaxed text-ink-muted">
          <p>
            This is placeholder legal copy generated as part of the site
            template. Replace it with a policy reviewed by a qualified
            professional before this site goes live.
          </p>

          <section>
            <h2 className="text-base font-semibold text-ink">Information we collect</h2>
            <p className="mt-2">
              When you submit a booking request or contact form, we collect
              the information you provide — name, email, phone number, and
              any event or project details you share. We also log which
              social links you click, without collecting personal
              identifiers, to understand which platforms are most useful to
              visitors.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">How we use it</h2>
            <p className="mt-2">
              We use submitted information to respond to booking and contact
              requests, coordinate speaking engagements and résumé projects,
              and send confirmation or follow-up emails related to your
              request.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">Data retention &amp; access</h2>
            <p className="mt-2">
              Booking and contact records are retained as needed to provide
              our services and are accessible only to authorized
              administrators of this site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-accent">{site.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
