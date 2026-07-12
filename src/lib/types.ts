export type BookingService =
  | "public_speaking"
  | "resume_writing"
  | "career_coaching"
  | "consultation";

export type BookingFormat = "virtual" | "in_person";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancellation_requested"
  | "cancelled"
  | "completed";

export interface Booking {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: BookingService;
  event_format: BookingFormat;
  preferred_date: string;
  preferred_time: string | null;
  location: string | null;
  notes: string | null;
  status: BookingStatus;
  admin_note: string | null;
}

export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
}

export interface Testimonial {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  occupation: string | null;
  service_used: BookingService | null;
  rating: number;
  quote: string;
  photo_url: string | null;
  is_published: boolean;
  sort_order: number;
}

export interface SocialLink {
  id: string;
  created_at: string;
  updated_at: string;
  platform: string;
  label: string;
  username: string;
  description: string | null;
  url: string;
  is_active: boolean;
  sort_order: number;
}

export interface SocialClick {
  id: string;
  created_at: string;
  platform: string;
}

export interface PortfolioImage {
  id: string;
  created_at: string;
  title: string;
  category: string | null;
  image_url: string;
  is_published: boolean;
  sort_order: number;
}

export interface Admin {
  user_id: string;
  email: string;
  created_at: string;
}

// Note: this file intentionally does not export a postgrest-js `Database`
// generic. Hand-rolling that type is brittle against postgrest-js's internal
// constraint shape (Relationships, __InternalSupabase, etc.) and drifts the
// moment the schema changes. Once a real Supabase project exists, replace
// these row interfaces with `supabase gen types typescript` output and wire
// it back into src/lib/supabase/client.ts and server.ts as the client's
// generic parameter.
