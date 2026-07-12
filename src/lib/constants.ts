export const site = {
  name: "Jordan Blake",
  tagline: "Speaker & Career Strategist",
  email: "hello@jordanblake.co",
  phone: "+1 (555) 010-0142",
  whatsapp: "https://wa.me/15550100142",
  hours: "Mon–Fri, 9:00 AM–6:00 PM ET",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#speaking", label: "Speaking" },
  { href: "#resume-writing", label: "Résumé Writing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const trustStats = [
  { value: "180+", label: "Clients served" },
  { value: "60+", label: "Workshops delivered" },
  { value: "95+", label: "Speaking engagements" },
  { value: "4.9/5", label: "Client satisfaction" },
];

export const serviceCategories = [
  {
    id: "speaking",
    eyebrow: "Service 01",
    title: "Public Speaking",
    description:
      "Keynotes, corporate events, and workshops built around a clear message and a room that stays with you afterward.",
    items: [
      "Keynote speeches",
      "Corporate events",
      "Motivational speaking",
      "Workshops & seminars",
      "Conference panels",
    ],
    priceNote: "Starting at $2,500 per engagement",
    cta: "Book a Speaking Session",
    href: "#booking",
  },
  {
    id: "resume-writing",
    eyebrow: "Service 02",
    title: "Professional Résumé Writing",
    description:
      "Résumés and LinkedIn profiles written to survive applicant-tracking systems and hold a hiring manager's attention.",
    items: [
      "Résumé creation & redesign",
      "Cover letter writing",
      "LinkedIn optimization",
      "Career document consultation",
    ],
    priceNote: "3–5 business day turnaround",
    cta: "Get Your Résumé Reviewed",
    href: "#booking",
  },
  {
    id: "coaching",
    eyebrow: "Service 03",
    title: "Career Coaching",
    description:
      "Focused, one-on-one sessions for people navigating a job search, a promotion case, or a career pivot.",
    items: [
      "One-on-one coaching",
      "Interview preparation",
      "Career strategy planning",
    ],
    priceNote: "By appointment",
    cta: "Request Coaching",
    href: "#booking",
  },
] as const;

export const faqItems = [
  {
    question: "How do I book a speaking engagement?",
    answer:
      "Use the booking form below — choose \"Public speaking,\" share your preferred date and event format, and Jordan's team will follow up within two business days to confirm availability and details.",
  },
  {
    question: "How long does résumé writing take?",
    answer:
      "Most résumé and LinkedIn projects are delivered within 3–5 business days after your intake call. Rush turnaround is available on request.",
  },
  {
    question: "Do you offer virtual consultations?",
    answer:
      "Yes. Every service can be delivered virtually or in person — just select your preferred format when you book.",
  },
  {
    question: "Can you customize presentations for our organization?",
    answer:
      "Every keynote and workshop is tailored to your audience, industry, and event goals after a short discovery call.",
  },
  {
    question: "How do payments work?",
    answer:
      "A deposit secures your date or project start; the remaining balance is invoiced on delivery or the day of the event. Details are confirmed in your booking agreement.",
  },
  {
    question: "Do you provide revisions?",
    answer:
      "Résumé and LinkedIn projects include a round of revisions after your first draft. Speaking engagements include one planning call to fine-tune content ahead of the event.",
  },
] as const;

export const serviceLabels: Record<string, string> = {
  public_speaking: "Public speaking",
  resume_writing: "Résumé writing",
  career_coaching: "Career coaching",
  consultation: "Consultation",
};
