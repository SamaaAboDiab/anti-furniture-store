import { Link } from "react-router-dom";
import { categories } from "../data/catalog";
import SectionHeader, { SectionFooterLink } from "./SectionHeader";

const LINK = { to: "/collections", label: "View All Categories" };

export default function CategoryGrid() {
  return (
    <section className="container-page pt-14 md:pt-20">
      <SectionHeader title="Browse by Category" link={LINK} />

      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-6">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link to={`/shop?room=${cat.slug}`} className="group flex flex-col items-center gap-3 text-center">
              <div className="aspect-square w-full max-w-[150px] overflow-hidden rounded-full bg-cream-200 ring-1 ring-ink-900/5 transition-shadow duration-300 group-hover:shadow-card">
                <img
                  src={cat.image}
                  alt=""
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-medium text-ink-700 transition-colors group-hover:text-clay-600">
                {cat.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SectionFooterLink link={LINK} />
    </section>
  );
}
