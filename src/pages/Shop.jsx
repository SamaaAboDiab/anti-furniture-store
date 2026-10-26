import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Newsletter from "../components/Newsletter";
import { allProducts, categories, getCategoryBySlug, photo } from "../data/catalog";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const SORTS = {
  featured: { label: "Featured", fn: null },
  newest: { label: "New arrivals first", fn: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price, high to low", fn: (a, b) => b.price - a.price },
};

const ALL_BANNER = {
  title: "All furniture",
  blurb: "Every piece we make, in solid wood and natural fabric. Free delivery on orders over $500.",
  image: photo("scene-minimal-living"),
};

const SALE_BANNER = {
  title: "Summer Sale",
  blurb: "Up to 25% off selected dining tables, sets and chairs — while stock lasts.",
  image: photo("promo-dining"),
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  // `category` (a room name) is accepted for links from the old site
  const legacy = categories.find((c) => c.name === searchParams.get("category"));
  const room = getCategoryBySlug(searchParams.get("room")) || legacy || null;
  const onSale = searchParams.get("sale") === "1";
  const sortKey = SORTS[searchParams.get("sort")] ? searchParams.get("sort") : "featured";

  const banner = room ? { title: room.name, blurb: room.blurb, image: room.image } : onSale ? SALE_BANNER : ALL_BANNER;
  useDocumentTitle(room ? room.name : onSale ? "Sale" : "Shop");

  const filtered = allProducts.filter((p) => (!room || p.category === room.name) && (!onSale || p.compareAt));
  const products = SORTS[sortKey].fn ? [...filtered].sort(SORTS[sortKey].fn) : filtered;

  function update(changes) {
    const next = new URLSearchParams(searchParams);
    next.delete("category");
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setSearchParams(next, { replace: true });
  }

  const chip = (active) =>
    `inline-flex min-h-[40px] shrink-0 items-center rounded-full border px-4 text-sm transition-colors duration-200 ${
      active
        ? "border-clay-500 bg-clay-500 text-white"
        : "border-ink-900/15 bg-white text-ink-700 hover:border-clay-500 hover:text-clay-600"
    }`;

  return (
    <>
      {/* Banner — photo follows the selected room */}
      <section className="container-page pt-4 md:pt-6">
        <div className="relative overflow-hidden rounded-xl2 bg-cream-200">
          <img
            key={banner.image}
            src={banner.image}
            alt=""
            width={1024}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_60%] motion-safe:animate-[fade_400ms_ease-out]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/85 to-cream-50/50 md:via-cream-50/75 md:to-cream-50/0" />
          <div className="relative px-6 py-12 sm:px-10 md:px-14 md:py-16">
            <h1 className="text-display-lg text-ink-900">{banner.title}</h1>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-700 sm:text-lg">{banner.blurb}</p>
          </div>
        </div>
      </section>

      <section className="container-page pt-8">
        <div className="flex flex-col gap-4 border-b border-ink-900/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
          {/* On small screens the row scrolls sideways; the fade hints there is more */}
          <div
            role="group"
            aria-label="Filter products"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pr-10 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 lg:[mask-image:none]"
          >
            <button type="button" aria-pressed={!room && !onSale} onClick={() => update({ room: null, sale: null })} className={chip(!room && !onSale)}>
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                aria-pressed={room?.slug === c.slug}
                onClick={() => update({ room: room?.slug === c.slug ? null : c.slug })}
                className={chip(room?.slug === c.slug)}
              >
                {c.name}
              </button>
            ))}
            <span className="mx-1 w-px shrink-0 self-stretch bg-ink-900/10" aria-hidden="true" />
            <button type="button" aria-pressed={onSale} onClick={() => update({ sale: onSale ? null : "1" })} className={chip(onSale)}>
              On sale
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="text-sm tabular-nums text-ink-500" aria-live="polite">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <span>Sort</span>
              <select
                value={sortKey}
                onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
                className="min-h-[40px] cursor-pointer rounded-lg border border-ink-900/15 bg-white px-3 text-sm text-ink-900 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500/20"
              >
                {Object.entries(SORTS).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="container-page pt-8">
        {products.length > 0 ? (
          <ProductGrid products={products} priorityCount={4} />
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-ink-900">
              {onSale && room ? `No ${room.name.toLowerCase()} pieces on sale right now.` : `Nothing in ${room?.name ?? "this view"} yet.`}
            </p>
            <p className="mt-2 text-ink-500">New pieces and offers arrive every season. Browse the rest of the shop in the meantime.</p>
            <button type="button" onClick={() => update({ room: null, sale: null })} className="btn-secondary mt-6">
              Show all furniture
            </button>
          </div>
        )}
      </section>

      <Newsletter />
    </>
  );
}
