"use client";

import { cloneElement, isValidElement, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { createBooking, initialBookingState } from "@/app/actions/booking";
import { site } from "@/lib/constants";

const serviceOptions = [
  { value: "public_speaking", label: "Public speaking" },
  { value: "resume_writing", label: "Résumé writing" },
  { value: "career_coaching", label: "Career coaching" },
  { value: "consultation", label: "Consultation" },
];

const inputClasses =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus-visible:outline-2 focus-visible:outline-accent";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending request…" : "Request Booking"}
    </button>
  );
}

export function BookingForm() {
  const [state, formAction] = useActionState(createBooking, initialBookingState);
  const today = new Date().toISOString().split("T")[0];

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card-shadow flex flex-col items-center gap-3 rounded-[1.75rem] border border-line bg-bg-raised px-8 py-16 text-center"
      >
        <CheckCircle2 size={40} className="text-success" aria-hidden="true" />
        <p className="font-display text-xl font-medium text-ink">Request received</p>
        <p className="max-w-sm text-sm text-ink-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-shadow space-y-6 rounded-[1.75rem] border border-line bg-bg-raised p-6 sm:p-9">
      {/* Honeypot — hidden from real visitors, filled by most bots */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" error={state.errors?.fullName}>
          <input id="fullName" name="fullName" type="text" required className={inputClasses} autoComplete="name" />
        </Field>
        <Field label="Email address" htmlFor="email" error={state.errors?.email}>
          <input id="email" name="email" type="email" required className={inputClasses} autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" htmlFor="phone" error={state.errors?.phone}>
          <input id="phone" name="phone" type="tel" className={inputClasses} autoComplete="tel" />
        </Field>
        <Field label="Service" htmlFor="service" error={state.errors?.service}>
          <select id="service" name="service" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">Format</legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input type="radio" name="eventFormat" value="virtual" defaultChecked className="accent-accent" />
            Virtual
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input type="radio" name="eventFormat" value="in_person" className="accent-accent" />
            In person
          </label>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" htmlFor="preferredDate" error={state.errors?.preferredDate}>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={today}
            className={inputClasses}
          />
        </Field>
        <Field label="Preferred time (optional)" htmlFor="preferredTime" error={state.errors?.preferredTime}>
          <input id="preferredTime" name="preferredTime" type="time" className={inputClasses} />
        </Field>
      </div>

      <Field label="Event location (optional)" htmlFor="location" error={state.errors?.location}>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="City, venue, or “remote”"
          className={inputClasses}
        />
      </Field>

      <Field label="Additional notes" htmlFor="notes" error={state.errors?.notes}>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Audience size, event goals, résumé target role — anything that helps us prepare."
          className={inputClasses}
        />
      </Field>

      <div className="flex flex-col gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-xs leading-relaxed text-ink-faint sm:max-w-[16rem]">
          Already booked and need to cancel or reschedule? Email{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-accent">
            {site.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  const field =
    isValidElement<{ "aria-describedby"?: string; "aria-invalid"?: boolean }>(children)
      ? cloneElement(children, {
          "aria-describedby": error ? errorId : undefined,
          "aria-invalid": Boolean(error),
        })
      : children;

  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {field}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
