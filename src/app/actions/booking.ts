"use server";

import { bookingSchema } from "@/lib/validation";
import { serviceLabels, site } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import type { BookingActionState } from "@/lib/action-state";

export async function createBooking(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    service: formData.get("service")?.toString() ?? "",
    eventFormat: formData.get("eventFormat")?.toString() ?? "",
    preferredDate: formData.get("preferredDate")?.toString() ?? "",
    preferredTime: formData.get("preferredTime")?.toString() ?? "",
    location: formData.get("location")?.toString() ?? "",
    notes: formData.get("notes")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
  };

  // Honeypot: bots fill every field. Pretend success without writing anything.
  if (raw.company) {
    return {
      status: "success",
      message: "Thanks — your request has been received. We'll follow up within two business days.",
    };
  }

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("bookings").insert({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone || null,
    service: data.service,
    event_format: data.eventFormat,
    preferred_date: data.preferredDate,
    preferred_time: data.preferredTime || null,
    location: data.location || null,
    notes: data.notes || null,
    status: "pending",
  });

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        message: "That date and time just got booked. Please choose another slot.",
        errors: { preferredTime: "Already booked" },
      };
    }
    console.error("Booking insert failed", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again or email us directly.",
    };
  }

  const serviceLabel = serviceLabels[data.service] ?? data.service;

  await sendEmail({
    to: data.email,
    subject: `We received your ${serviceLabel} request`,
    html: `<p>Hi ${escapeHtml(data.fullName)},</p>
      <p>Thanks for requesting <strong>${escapeHtml(serviceLabel)}</strong> for ${escapeHtml(data.preferredDate)}${data.preferredTime ? ` at ${escapeHtml(data.preferredTime)}` : ""}.
      This is a request, not a confirmation — Tameka's team will follow up within two business days.</p>
      <p>If anything changes, reply to this email.</p>`,
  });

  await sendEmail({
    to: site.email,
    subject: `New booking request: ${serviceLabel} — ${data.fullName}`,
    html: `<p><strong>${escapeHtml(data.fullName)}</strong> (${escapeHtml(data.email)}${data.phone ? `, ${escapeHtml(data.phone)}` : ""}) requested <strong>${escapeHtml(serviceLabel)}</strong>.</p>
      <ul>
        <li>Format: ${escapeHtml(data.eventFormat)}</li>
        <li>Preferred date: ${escapeHtml(data.preferredDate)}</li>
        <li>Preferred time: ${escapeHtml(data.preferredTime || "Not specified")}</li>
        <li>Location: ${escapeHtml(data.location || "Not specified")}</li>
      </ul>
      <p>${escapeHtml(data.notes || "No additional notes.")}</p>`,
  });

  return {
    status: "success",
    message: "Thanks — your request has been received. We'll follow up within two business days.",
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
