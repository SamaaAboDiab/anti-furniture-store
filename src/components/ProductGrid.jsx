import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import { ProductArt } from "./Art";
import { formatPrice, discountPercent } from "../data/catalog";
import { useCart } from "../context/cart";

export function PriceTag({ product, className = "" }) {
  const off = discountPercent(product);
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 tabular-nums ${className}`}>
      <span className={`font-semibold ${off ? "text-clay-600" : "text-ink-900"}`}>{formatPrice(product.price)}</span>
      {off > 0 && (
        <>
          <span className="sr-only">, was</span>
          <s className="text-ink-500">{formatPrice(product.compareAt)}</s>
        </>
      )}
    </p>
  );
}

export function ProductBadge({ product }) {
  const off = discountPercent(product);
  if (off) {
    return <span className="rounded-full bg-clay-500 px-2.5 py-1 text-xs font-semibold text-white">−{off}%</span>;
  }
  if (product.isNew) {
    return <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-soft">New</span>;
  }
  return null;
}

// Adds one item without leaving the grid. A sibling of the card link (not
// inside it), since a <button> can't be nested in an <a>.
function QuickAdd({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  function handleClick() {
    addItem(product, 1);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
      className={`absolute bottom-2.5 right-2.5 flex h-11 w-11 items-center md:bottom-3 md:right-3 md:h-10 md:w-10 justify-center rounded-full shadow-card transition-all duration-200 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100 ${
        added ? "bg-clay-500 text-white md:translate-y-0 md:opacity-100" : "bg-white text-ink-900 hover:bg-clay-500 hover:text-white"
      }`}
    >
      {added ? <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" /> : <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
    </button>
  );
}

export function ProductCard({ product, priority = false }) {
  return (
    <div className="group relative">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative">
          <ProductArt
            product={product}
            priority={priority}
            className="aspect-[5/4] w-full rounded-xl ring-1 ring-ink-900/5 transition-shadow duration-300 group-hover:shadow-card"
          />
          <div className="absolute left-3 top-3">
            <ProductBadge product={product} />
          </div>
        </div>
        <h3 className="mt-3 font-body text-sm font-medium text-ink-900 transition-colors group-hover:text-clay-600 sm:text-[0.9375rem]">
          {product.name}
        </h3>
        <PriceTag product={product} className="mt-1 text-sm" />
      </Link>
      {/* Positioned over the photo's bottom-right corner */}
      <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[5/4]">
        <div className="pointer-events-auto">
          <QuickAdd product={product} />
        </div>
      </div>
    </div>
  );
}

// 2 columns on phones, then 3 or 4 from tablet width up
const COLS = {
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-3 md:grid-cols-4",
};

export default function ProductGrid({ products, columns = 4, priorityCount = 0 }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 ${COLS[columns] || COLS[4]}`}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
