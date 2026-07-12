import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  service: z.enum([
    "public_speaking",
    "resume_writing",
    "career_coaching",
    "consultation",
  ]),
  eventFormat: z.enum(["virtual", "in_person"]),
  preferredDate: z.string().trim().min(1, "Choose a preferred date"),
  preferredTime: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot field: real visitors never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(2, "Add a subject").max(150),
  message: z.string().trim().min(10, "Message is too short").max(3000),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
