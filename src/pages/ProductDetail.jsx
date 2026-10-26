import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Check } from "lucide-react";
import { getProductBySlug, allProducts, categories, formatPrice, discountPercent, FREE_DELIVERY_THRESHOLD } from "../data/catalog";
import { ProductArt } from "../components/Art";
import PhotoCredit from "../components/PhotoCredit";
import ProductGrid, { PriceTag, ProductBadge } from "../components/ProductGrid";
import { useCart } from "../context/cart";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import NotFound from "./NotFound";

// Keyed by slug so quantity and "added" state reset when moving between products
export default function ProductDetailRoute() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  if (!product) return <NotFound message="We couldn't find that piece. It may have been renamed or retired." />;
  return <ProductDetail key={slug} product={product} />;
}

function ProductDetail({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);

  useDocumentTitle(product.name);
  useEffect(() => () => clearTimeout(timer.current), []);

  const room = categories.find((c) => c.name === product.category);
  const sameRoom = allProducts.filter((p) => p.slug !== product.slug && p.category === product.category);
  const related = [...sameRoom, ...allProducts.filter((p) => p.slug !== product.slug && p.category !== product.category)].slice(0, 4);

  function handleAddToCart() {
    addItem(product, qty);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 2400);
  }

  const details = [
    ["Materials", product.material],
    ["Dimensions", product.dimensions],
    ["Delivery", product.price >= FREE_DELIVERY_THRESHOLD ? "Free, in 2–4 weeks" : "From $49, in 2–4 weeks"],
    ["Returns", "30 days, collected from your home"],
  ].filter(([, v]) => v);

  return (
    <>
      <section className="container-page pt-6 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/shop" className="hover:text-ink-900">Shop</Link>
            </li>
            {room && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={`/shop?room=${room.slug}`} className="hover:text-ink-900">{room.name}</Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-900">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
          <div>
            <ProductArt product={product} priority sizes="(min-width: 768px) 55vw, 100vw" className="aspect-square w-full rounded-xl" />
            <PhotoCredit slug={product.slug} />
          </div>

          <div className="md:sticky md:top-28 md:self-start">
            <h1 className="text-display-lg text-ink-900">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <PriceTag product={product} className="text-xl" />
              <ProductBadge product={product} />
            </div>
            {discountPercent(product) > 0 && (
              <p className="mt-1 text-sm text-clay-600">You save {formatPrice(product.compareAt - product.price)} in the Summer Sale.</p>
            )}
            <p className="mt-6 max-w-prose leading-relaxed text-ink-700">{product.description}</p>

            <div className="mt-8 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center rounded-xl border border-ink-900/20" role="group" aria-label="Quantity">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={qty <= 1}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-ink-700 hover:text-ink-900 disabled:text-ink-300"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center tabular-nums text-ink-900" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={qty >= 10}
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="flex h-12 w-12 items-center justify-center text-ink-700 hover:text-ink-900 disabled:text-ink-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button type="button" onClick={handleAddToCart} className="btn-primary min-h-[48px] flex-1 sm:flex-none sm:px-10">
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" /> Added to cart
                  </>
                ) : (
                  `Add to cart — ${formatPrice(product.price * qty)}`
                )}
              </button>
            </div>
            <p className="mt-3 min-h-[1.25rem] text-sm text-ink-500" role="status">
              {justAdded && (
                <>
                  {qty} × {product.name} in your cart.{" "}
                  <Link to="/cart" className="font-medium text-ink-900 underline underline-offset-4">View cart</Link>
                </>
              )}
            </p>

            <dl className="mt-8 divide-y divide-ink-900/10 border-y border-ink-900/10 text-sm">
              {details.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page pt-14 md:pt-24">
        <h2 className="mb-10 text-display-md text-ink-900">
          {sameRoom.length ? `More for the ${product.category.toLowerCase()}` : "You might also like"}
        </h2>
        <ProductGrid products={related} />
      </section>
    </>
  );
}
