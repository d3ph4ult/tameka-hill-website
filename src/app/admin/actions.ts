"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!admin) redirect("/admin/login?error=not_authorized");

  return supabase;
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const supabase = await requireAdmin();
  await supabase.from("bookings").update({ status }).eq("id", bookingId);
  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
}

export async function markContactRead(id: string, isRead: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("contact_submissions").update({ is_read: isRead }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteContactSubmission(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("contact_submissions").delete().eq("id", id);
  revalidatePath("/admin/messages");
}

export async function toggleTestimonialPublished(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("testimonials").update({ is_published: isPublished }).eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(formData: FormData) {
  const supabase = await requireAdmin();

  const name = formData.get("name")?.toString().trim();
  const quote = formData.get("quote")?.toString().trim();
  if (!name || !quote) return;

  const occupation = formData.get("occupation")?.toString().trim() || null;
  const serviceUsed = formData.get("service_used")?.toString() || null;
  const rating = Number(formData.get("rating")) || 5;
  const isPublished = formData.get("is_published") === "on";

  await supabase.from("testimonials").insert({
    name,
    quote,
    occupation,
    service_used: serviceUsed,
    rating,
    is_published: isPublished,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateSocialLink(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const label = formData.get("label")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const url = formData.get("url")?.toString().trim();
  if (!label || !username || !url) return;

  const description = formData.get("description")?.toString().trim() || null;
  const isActive = formData.get("is_active") === "on";

  await supabase
    .from("social_links")
    .update({ label, username, url, description, is_active: isActive })
    .eq("id", id);

  revalidatePath("/admin/social-links");
  revalidatePath("/");
}

export async function togglePortfolioPublished(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  await supabase.from("portfolio_images").update({ is_published: isPublished }).eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function deletePortfolioImage(id: string, imageUrl: string) {
  const supabase = await requireAdmin();

  // Only remove from storage if this was actually uploaded there — seed/demo
  // images point at static files in /public and have no storage object.
  const marker = "/storage/v1/object/public/portfolio/";
  const markerIndex = imageUrl.indexOf(marker);
  if (markerIndex !== -1) {
    const objectPath = imageUrl.slice(markerIndex + marker.length);
    await supabase.storage.from("portfolio").remove([objectPath]);
  }

  await supabase.from("portfolio_images").delete().eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}

export async function uploadPortfolioImage(formData: FormData) {
  const supabase = await requireAdmin();

  const file = formData.get("file");
  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || null;

  if (!(file instanceof File) || file.size === 0 || !title) return;

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("portfolio").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return;

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio").getPublicUrl(path);

  await supabase.from("portfolio_images").insert({
    title,
    category,
    image_url: publicUrl,
    is_published: true,
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}
