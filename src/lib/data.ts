import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { PortfolioImage, SocialLink, Testimonial } from "@/lib/types";

// Fallback content mirrors supabase/migrations/0002_seed.sql, so local
// preview still looks complete before a Supabase project is connected.

const fallbackSocialLinks: SocialLink[] = [
  { id: "instagram", created_at: "", updated_at: "", platform: "instagram", label: "Instagram", username: "@jordanblake.speaks", description: "Behind the scenes from stages and studios.", url: "https://instagram.com/", is_active: true, sort_order: 1 },
  { id: "linkedin", created_at: "", updated_at: "", platform: "linkedin", label: "LinkedIn", username: "Jordan Blake", description: "Career insights and speaking updates for professionals.", url: "https://linkedin.com/", is_active: true, sort_order: 2 },
  { id: "youtube", created_at: "", updated_at: "", platform: "youtube", label: "YouTube", username: "Jordan Blake", description: "Full keynotes, workshop clips, and résumé teardown videos.", url: "https://youtube.com/", is_active: true, sort_order: 3 },
  { id: "tiktok", created_at: "", updated_at: "", platform: "tiktok", label: "TikTok", username: "@jordanblake", description: "Quick career tips in under 60 seconds.", url: "https://tiktok.com/", is_active: true, sort_order: 4 },
  { id: "facebook", created_at: "", updated_at: "", platform: "facebook", label: "Facebook", username: "Jordan Blake Speaks", description: "Event announcements and community discussion.", url: "https://facebook.com/", is_active: true, sort_order: 5 },
  { id: "x", created_at: "", updated_at: "", platform: "x", label: "X", username: "@jordanblake", description: "Thoughts on careers, speaking, and the future of work.", url: "https://x.com/", is_active: true, sort_order: 6 },
  { id: "whatsapp", created_at: "", updated_at: "", platform: "whatsapp", label: "WhatsApp", username: "+1 (555) 010-0142", description: "Message directly for fast booking questions.", url: "https://wa.me/15550100142", is_active: true, sort_order: 7 },
];

const fallbackTestimonials: Testimonial[] = [
  { id: "t1", created_at: "", updated_at: "", name: "Maria Santos", occupation: "VP of Operations, Halden Group", service_used: "public_speaking", rating: 5, quote: "Jordan opened our annual leadership summit and set the tone for the entire event. Practical, funny, and genuinely moving — our team is still talking about it.", photo_url: null, is_published: true, sort_order: 1 },
  { id: "t2", created_at: "", updated_at: "", name: "David Chen", occupation: "Software Engineer", service_used: "resume_writing", rating: 5, quote: "I had 200+ applications go nowhere. Two weeks after the rewrite I had four interviews. The résumé finally sounded like someone who could do the job.", photo_url: null, is_published: true, sort_order: 2 },
  { id: "t3", created_at: "", updated_at: "", name: "Priya Nair", occupation: "HR Director, Fieldstone Health", service_used: "public_speaking", rating: 5, quote: "We booked a half-day workshop on difficult conversations and it became the highest-rated session in our program history.", photo_url: null, is_published: true, sort_order: 3 },
  { id: "t4", created_at: "", updated_at: "", name: "Tom Whitfield", occupation: "Recent MBA Graduate", service_used: "career_coaching", rating: 5, quote: "The coaching sessions gave me a framework for interviews I still use today. Direct feedback, no fluff, real results.", photo_url: null, is_published: true, sort_order: 4 },
];

const fallbackPortfolioImages: PortfolioImage[] = [
  { id: "p1", created_at: "", title: "Keynote — Halden Group Leadership Summit", category: "Speaking", image_url: "/portfolio/stage-01.svg", is_published: true, sort_order: 1 },
  { id: "p2", created_at: "", title: "Workshop — Difficult Conversations", category: "Workshop", image_url: "/portfolio/stage-02.svg", is_published: true, sort_order: 2 },
  { id: "p3", created_at: "", title: "Panel — Future of Work Conference", category: "Speaking", image_url: "/portfolio/stage-03.svg", is_published: true, sort_order: 3 },
  { id: "p4", created_at: "", title: "Studio Portrait", category: "Portrait", image_url: "/portfolio/stage-04.svg", is_published: true, sort_order: 4 },
];

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!isSupabaseConfigured()) return fallbackSocialLinks;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackSocialLinks;
    return data;
  } catch {
    return fallbackSocialLinks;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return fallbackTestimonials;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackTestimonials;
    return data;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  if (!isSupabaseConfigured()) return fallbackPortfolioImages;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_images")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackPortfolioImages;
    return data;
  } catch {
    return fallbackPortfolioImages;
  }
}
