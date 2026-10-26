import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";
import { photo } from "../data/catalog";

const BADGES = [
  { icon: ShieldCheck, title: "Premium Quality", sub: "Crafted with the finest materials" },
  { icon: Truck, title: "Free Delivery", sub: "On every order over $500" },
  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle-free returns within 30 days" },
  { icon: Lock, title: "Secure Payment", sub: "Encrypted, trusted checkout" },
];

export default function Hero() {
  return (
    <section className="container-page pt-4 md:pt-6">
      <div className="relative overflow-hidden rounded-xl2 bg-cream-200">
        <img
          src={photo("hero-living-room")}
          alt="A calm living room with a beige linen sofa, a round oak coffee table and a woven pendant lamp"
          width={1024}
          height={1024}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_100%] md:object-[center_62%]"
        />
        {/* Mobile: text sits at the top, overlay fades down so the sofa stays visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-50/80 via-45% to-cream-50/0 md:bg-gradient-to-r md:from-cream-50/95 md:via-cream-50/45 md:via-50%" />

        <div className="relative flex min-h-[600px] items-start px-6 pb-40 pt-10 sm:px-10 md:min-h-[600px] md:items-center md:px-14 md:py-16 lg:min-h-[640px]">
          <div className="max-w-xl">
            <h1 className="text-display-xl text-ink-900">
              Crafted for
              <br />
              Comfort.
              <br />
              <span className="text-clay-500">Made for Life.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700 sm:text-lg">
              Explore modern furniture designed to bring elegance, comfort and
              functionality to your home.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/collections" className="btn-ghost">
                View Collections <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ul className="relative z-10 mx-auto -mt-12 grid max-w-[calc(100%-1.5rem)] grid-cols-2 gap-x-3 gap-y-5 rounded-xl2 border border-ink-900/5 bg-white p-5 shadow-card sm:max-w-[calc(100%-4rem)] sm:gap-x-4 sm:px-8 sm:py-6 lg:grid-cols-4">
        {BADGES.map(({ icon: Icon, title, sub }) => (
          <li key={title} className="flex flex-col items-start gap-2.5 sm:flex-row sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-100">
              <Icon className="h-5 w-5 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink-900">{title}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-500 sm:leading-relaxed">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
