export const site = {
  name: "Tameka Hill",
  tagline: "Speaker & Career Strategist",
  email: "akemathill@gmail.com",
  phone: "+1 876-833-6463",
  whatsapp: "https://wa.me/18768336463",
  hours: "Mon–Fri, 9:00 AM–6:00 PM ET",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#book", label: "The Book" },
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

export const book = {
  eyebrow: "Published Work",
  title: "The Girl in the Shadows",
  subtitle: "A Novel",
  // TODO: replace with the short description Tameka is sending over.
  description:
    "Tameka Hill's debut novel. Full description coming soon.",
  details: [] as string[],
  cta: "Get the Book",
  href: "https://a.co/d/014sUrBN",
  coverImage: "/book/signing.jpg",
  supportingImages: [
    { src: "/book/holding.jpg", alt: "Tameka Hill holding a copy of The Girl in the Shadows at her book signing" },
    { src: "/book/stack.jpg", alt: "Copies of The Girl in the Shadows by Tameka Hill on display" },
  ],
};

// Résumé-writing proof is shown as image testimonials rather than text quotes.
export const resumeTestimonialImages: { src: string; alt: string }[] = [
  { src: "/resume-testimonials/amanda-waite.jpg", alt: "Testimonial from Amanda Waite: \"My resume gave me the additional confidence I needed in my job search... I was simply amazed, it helped me to start my career in a brand new profession.\"" },
  { src: "/resume-testimonials/kimesha-walters.jpg", alt: "Testimonial from Kimesha Walters, Brand & PR Strategist: \"Tameka did an exceptional job in creating a contemporary design for my resume, capturing the diversity of my skills through excellent diction and presenting it in a visually appealing manner.\"" },
  { src: "/resume-testimonials/martina-alleyne.jpg", alt: "Testimonial from Martina Alleyne, Project Information Officer: \"Tameka is an accomplished writer who knows how to get the desired results. My resume is beyond my expectations.\"" },
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
  },
] as const;

export const faqItems = [
  {
    question: "How do I book a speaking engagement?",
    answer:
      "Use the booking form below — choose \"Public speaking,\" share your preferred date and event format, and Tameka's team will follow up within two business days to confirm availability and details.",
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
