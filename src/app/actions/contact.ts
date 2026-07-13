"use server";

import { contactSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/constants";
import type { ContactActionState } from "@/lib/action-state";

export async function submitContact(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    subject: formData.get("subject")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
  };

  if (raw.company) {
    return { status: "success", message: "Thanks for reaching out — we'll reply soon." };
  }

  const parsed = contactSchema.safeParse(raw);
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

  const { error } = await supabase.from("contact_submissions").insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (error) {
    console.error("Contact insert failed", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please email us directly instead.",
    };
  }

  await sendEmail({
    to: site.email,
    subject: `New contact message: ${data.subject}`,
    html: `<p><strong>${escapeHtml(data.name)}</strong> (${escapeHtml(data.email)})</p><p>${escapeHtml(data.message)}</p>`,
  });

  return { status: "success", message: "Thanks for reaching out — we'll reply within two business days." };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
