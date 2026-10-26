import { Link } from "react-router-dom";
import { categories, allProducts } from "../data/catalog";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Collections() {
  useDocumentTitle("Collections");

  return (
    <section className="container-page pt-12 md:pt-16">
      <h1 className="text-display-lg text-ink-900">Our Collections</h1>
      <p className="mt-4 max-w-prose text-lg text-ink-500">
        Every piece is grouped by the room it was designed for, so you can
        furnish one corner or a whole home in a single visit.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
        {categories.map((cat) => {
          const pieces = allProducts.filter((p) => p.category === cat.name);
          return (
            <li key={cat.slug}>
              <Link to={`/shop?room=${cat.slug}`} className="group block">
                <div className="aspect-square overflow-hidden rounded-xl bg-cream-200 sm:aspect-[4/3]">
                  <img
                    src={cat.image}
                    alt=""
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3 flex flex-col gap-0.5 sm:mt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h2 className="text-lg text-ink-900 sm:text-display-sm group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {cat.name}
                  </h2>
                  <span className="shrink-0 text-sm tabular-nums text-ink-500">
                    {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
                  </span>
                </div>
                <p className="mt-1 hidden max-w-sm text-sm text-ink-500 sm:block">{cat.blurb}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
