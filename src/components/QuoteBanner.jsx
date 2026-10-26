import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { photo } from "../data/catalog";
import { reviews } from "../data/reviews";

export default function QuoteBanner() {
  return (
    <section className="container-page pt-14 md:pt-20">
      <div className="grid overflow-hidden rounded-xl2 bg-moss-900 md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 sm:py-14">
          <span aria-hidden="true" className="font-display text-6xl leading-none text-clay-400/60">“</span>
          <p className="mt-2 max-w-md font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-cream-50">
            Furniture that transforms your house into a home.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2.5" aria-hidden="true">
              {reviews.slice(0, 4).map((r) => (
                <span
                  key={r.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-moss-900 text-xs font-semibold text-white"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initials}
                </span>
              ))}
            </div>
            <span className="text-sm text-cream-100/75">2K+ happy customers</span>
          </div>

          <Link
            to="/#reviews"
            className="mt-8 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-lg border border-cream-50/25 px-5 text-sm font-medium text-cream-50 transition-colors hover:bg-cream-50/10"
          >
            Read Their Stories <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="relative h-64 sm:h-80 md:h-auto">
          <img
            src={photo("quote-lamp")}
            alt="A linen table lamp on an oak nightstand in warm evening light"
            width={1200}
            height={736}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
