import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { SocialHub } from "@/components/sections/social-hub";
import { About } from "@/components/sections/about";
import { Book } from "@/components/sections/book";
import { Services } from "@/components/sections/services";
import { Booking } from "@/components/sections/booking";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { ResumeTestimonials } from "@/components/sections/resume-testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { FinalCta } from "@/components/sections/final-cta";
import { getPortfolioImages, getSocialLinks, getTestimonials } from "@/lib/data";

export default async function Home() {
  const [socialLinks, testimonials, portfolioImages] = await Promise.all([
    getSocialLinks(),
    getTestimonials(),
    getPortfolioImages(),
  ]);

  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <SocialHub socialLinks={socialLinks} />
        <About />
        <Book />
        <Services />
        <Booking />
        <Portfolio images={portfolioImages} />
        <Testimonials testimonials={testimonials} />
        <ResumeTestimonials />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <SiteFooter socialLinks={socialLinks} />
    </>
  );
}
