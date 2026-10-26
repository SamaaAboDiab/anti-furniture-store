import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { photo } from "../data/catalog";

const POINTS = [
  "Sustainable & eco-friendly materials",
  "Modern & timeless designs",
  "Built for durability",
  "Designed for everyday living",
];

export default function WhyChoose({ showLink = true }) {
  return (
    <section id="materials" className="container-page scroll-mt-24 pt-14 md:pt-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <div>
          <h2 className="text-display-md text-ink-900">Why Choose Anti?</h2>
          <p className="mt-3 max-w-sm text-ink-500">
            We combine design, comfort and durability to create furniture
            you'll love for years.
          </p>
          {showLink && (
            <Link to="/about" className="btn-secondary mt-6">
              Learn More
            </Link>
          )}

          <ul className="mt-8 space-y-3.5">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-clay-500/15">
                  <Check className="h-3 w-3 text-clay-600" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <img
          src={photo("scene-sideboard")}
          alt="A walnut sideboard styled with a vase in a bright living room"
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-xl2 bg-cream-200 object-cover"
        />
      </div>
    </section>
  );
}
