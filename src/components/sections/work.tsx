import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import type { PortfolioImage } from "@/lib/types";

export function Work({ images }: { images: PortfolioImage[] }) {
  return (
    <section id="services" className="py-24 sm:py-28">
      <div className="content-shell">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Portfolio images={images} />
          <Services />
        </div>
      </div>
    </section>
  );
}
