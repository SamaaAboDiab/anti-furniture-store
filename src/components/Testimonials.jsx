import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photo } from "../data/catalog";
import { reviews } from "../data/reviews";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  const go = (step) => setIndex((i) => (i + step + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="container-page scroll-mt-24 pt-14 md:pt-20" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="grid overflow-hidden rounded-xl2 bg-moss-800 md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-between gap-10 px-7 py-12 sm:px-12">
          <div>
            <h2 className="font-display text-display-sm text-cream-50">Our Customers Love Us</h2>
            <figure key={index} className="mt-6 motion-safe:animate-[fade_300ms_ease-out]" aria-live="polite">
              <blockquote className="text-lg leading-relaxed text-cream-50/90">“{review.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: review.color }}
                >
                  {review.initials}
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-cream-50">{review.name}</span>
                  <span className="text-cream-100/60">
                    {review.place} — bought the {review.product}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1} of ${reviews.length}`}
                  aria-current={i === index}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-cream-50" : "w-2 bg-cream-50/35"}`} />
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous review"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/25 text-cream-50 transition-colors hover:bg-cream-50/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next review"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/25 text-cream-50 transition-colors hover:bg-cream-50/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-64 sm:h-80 md:h-auto">
          <img
            src={photo("scene-minimal-living")}
            alt="A bright living room with a cream sofa and a walnut coffee table"
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
