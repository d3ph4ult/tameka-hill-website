// Thin wrapper around the Resend HTTP API. Sending is best-effort: if
// RESEND_API_KEY isn't configured, calls no-op so bookings and contact
// submissions still succeed without transactional email set up.

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return { skipped: true as const };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    if (!res.ok) {
      console.error("Resend email failed", res.status, await res.text());
      return { skipped: false as const, ok: false as const };
    }

    return { skipped: false as const, ok: true as const };
  } catch (error) {
    console.error("Resend email error", error);
    return { skipped: false as const, ok: false as const };
  }
}
