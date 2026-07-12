"use server";

import { createClient } from "@/lib/supabase/server";

const KNOWN_PLATFORMS = new Set([
  "instagram",
  "facebook",
  "tiktok",
  "linkedin",
  "youtube",
  "x",
  "whatsapp",
]);

export async function trackSocialClick(platform: string) {
  if (!KNOWN_PLATFORMS.has(platform)) return;

  const supabase = await createClient();
  await supabase.from("social_clicks").insert({ platform });
}
