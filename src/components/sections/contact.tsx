"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/lib/action-state";
import { site } from "@/lib/constants";

const inputClasses =
  "w-full rounded-sm border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus-visible:outline-2 focus-visible:outline-accent";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-gold-shine inline-flex w-full items-center justify-center rounded-sm px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="content-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow text-accent-contrast">Contact</p>
          <h2 className="mt-3 text-3xl font-medium text-accent-contrast sm:text-4xl">Get in touch</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-accent-contrast/70">
            For bookings, use the form above. For everything else — press,
            partnerships, questions — reach out directly.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-sm text-accent-contrast">
              <Mail size={18} className="text-accent-contrast" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-gold-strong">{site.email}</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-accent-contrast">
              <Phone size={18} className="text-accent-contrast" aria-hidden="true" />
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-gold-strong">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3 text-sm text-accent-contrast">
              <MessageCircle size={18} className="text-accent-contrast" aria-hidden="true" />
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold-strong">
                Message on WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-accent-contrast/70">
              <Clock size={18} className="text-accent-contrast" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>

        <div>
          {state.status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="card-shadow gold-glow flex flex-col items-center gap-3 rounded-sm border border-panel-line bg-panel px-8 py-16 text-center"
            >
              <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
              <p className="font-display text-xl font-medium text-panel-ink">Message sent</p>
              <p className="max-w-sm text-sm text-panel-ink-muted">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="card-shadow gold-glow space-y-5 rounded-sm border border-panel-line bg-panel p-6 sm:p-9">
              <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {state.status === "error" && state.message && (
                <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
                  {state.message}
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-panel-ink">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    aria-invalid={Boolean(state.errors?.name)}
                    aria-describedby={state.errors?.name ? "name-error" : undefined}
                    className={inputClasses}
                  />
                  {state.errors?.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600">{state.errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-panel-ink">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={Boolean(state.errors?.email)}
                    aria-describedby={state.errors?.email ? "contact-email-error" : undefined}
                    className={inputClasses}
                  />
                  {state.errors?.email && (
                    <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-600">{state.errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-panel-ink">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  aria-invalid={Boolean(state.errors?.subject)}
                  aria-describedby={state.errors?.subject ? "subject-error" : undefined}
                  className={inputClasses}
                />
                {state.errors?.subject && (
                  <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-600">{state.errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-panel-ink">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={Boolean(state.errors?.message)}
                  aria-describedby={state.errors?.message ? "message-error" : undefined}
                  className={inputClasses}
                />
                {state.errors?.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600">{state.errors.message}</p>
                )}
              </div>

              <SubmitButton />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
