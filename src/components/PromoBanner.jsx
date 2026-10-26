import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { photo } from "../data/catalog";

export default function PromoBanner() {
  return (
    <section className="container-page pt-14 md:pt-20">
      <div className="relative overflow-hidden rounded-xl2 bg-cream-200">
        <img
          src={photo("promo-dining")}
          alt="A light oak dining table with matching chairs"
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_60%] sm:w-3/5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-200 via-cream-200/90 to-cream-200/55 sm:via-cream-200 sm:via-40% sm:to-cream-200/0" />

        <div className="relative max-w-md px-7 py-12 sm:px-12 sm:py-16">
          <h2 className="text-display-md text-ink-900">
            Summer Special Deal
            <br />
            Up to 25% Off
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-700">
            Refresh your space with up to 25% off selected dining tables, sets
            and chairs, while stock lasts.
          </p>
          <Link to="/shop?sale=1" className="btn-primary mt-6">
            Grab the Deal <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
