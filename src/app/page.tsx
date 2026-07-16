import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { SocialHub } from "@/components/sections/social-hub";
import { About } from "@/components/sections/about";
import { Book } from "@/components/sections/book";
import { Work } from "@/components/sections/work";
import { Booking } from "@/components/sections/booking";
import { ResumeTestimonials } from "@/components/sections/resume-testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { FinalCta } from "@/components/sections/final-cta";
import { Signoff } from "@/components/sections/signoff";
import { getPortfolioImages, getSocialLinks } from "@/lib/data";

export default async function Home() {
  const [socialLinks, portfolioImages] = await Promise.all([
    getSocialLinks(),
    getPortfolioImages(),
  ]);

  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Work images={portfolioImages} />
        <SocialHub socialLinks={socialLinks} images={portfolioImages} />
        <About />
        <Book />
        <Booking />
        <ResumeTestimonials />
        <Faq />
        <Contact />
        <FinalCta />
        <Signoff />
      </main>
      <SiteFooter socialLinks={socialLinks} />
    </>
  );
}
