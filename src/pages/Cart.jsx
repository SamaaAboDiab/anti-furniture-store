import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Truck, Lock, RotateCcw, ShieldCheck, ShoppingCart, CheckCircle2, ArrowRight } from "lucide-react";
import { ProductArt } from "../components/Art";
import ProductGrid, { PriceTag, ProductBadge } from "../components/ProductGrid";
import PaymentIcons from "../components/PaymentIcons";
import { useCart } from "../context/cart";
import { allProducts, signatureCollection, formatPrice, FREE_DELIVERY_THRESHOLD } from "../data/catalog";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const DELIVERY_FEE = 49;

const PROMISES = [
  { icon: RotateCcw, text: "Free returns within 30 days" },
  { icon: ShieldCheck, text: "10-year frame warranty" },
  { icon: Lock, text: "Secure, encrypted checkout" },
];

function DeliveryProgress({ subtotal }) {
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
  const done = remaining <= 0;
  const pct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="flex items-center gap-4 rounded-xl2 border border-ink-900/5 bg-white p-5 shadow-soft">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${done ? "bg-clay-500" : "bg-clay-100"}`}>
        {done ? (
          <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Truck className="h-5 w-5 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-ink-900">
          {done ? (
            <>
              <span className="font-medium">You've unlocked free delivery.</span> We'll call to book a two-hour window.
            </>
          ) : (
            <>
              Add <span className="font-semibold text-clay-600">{formatPrice(remaining)}</span> more for free delivery.
            </>
          )}
        </p>
        <div
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-cream-200"
          role="progressbar"
          aria-label="Progress to free delivery"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="h-full rounded-full bg-clay-500 transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

function CartLine({ item, onQty, onRemove }) {
  return (
    <li className="flex gap-4 rounded-xl2 border border-ink-900/5 bg-white p-4 shadow-soft sm:gap-6 sm:p-5">
      <Link to={`/product/${item.slug}`} className="relative w-20 shrink-0 min-[360px]:w-24 sm:w-28">
        <ProductArt product={item} sizes="112px" className="aspect-square w-full rounded-xl" />
        <span className="absolute left-2 top-2 scale-90 origin-top-left">
          <ProductBadge product={item} />
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-ink-500">{item.category}</p>
            <Link to={`/product/${item.slug}`} className="mt-0.5 block font-medium text-ink-900 hover:text-clay-600">
              {item.name}
            </Link>
            <p className="mt-0.5 text-sm text-ink-500">{item.material}</p>
            <PriceTag product={item} className="mt-2 text-sm sm:hidden" />
          </div>
          <div className="hidden shrink-0 text-right sm:block">
            <p className="font-semibold tabular-nums text-ink-900">{formatPrice(item.price * item.qty)}</p>
            {item.qty > 1 && <p className="mt-0.5 text-xs tabular-nums text-ink-500">{formatPrice(item.price)} each</p>}
            {item.compareAt && (
              <p className="mt-0.5 text-xs tabular-nums text-clay-600">
                You save {formatPrice((item.compareAt - item.price) * item.qty)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center rounded-full border border-ink-900/10 bg-cream-50" role="group" aria-label={`Quantity of ${item.name}`}>
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() => onQty(item.qty - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-white hover:text-ink-900"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-medium tabular-nums text-ink-900" aria-live="polite">
              {item.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() => onQty(item.qty + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-white hover:text-ink-900"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="-mr-2 inline-flex min-h-[40px] min-w-[40px] items-center justify-center gap-1.5 rounded-full px-3 text-sm sm:-mr-3 text-ink-500 transition-colors hover:bg-cream-100 hover:text-clay-600"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {/* Icon only on very small screens, where the label doesn't fit beside the stepper */}
            <span className="max-[400px]:sr-only">Remove</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, count } = useCart();
  const [checkoutNote, setCheckoutNote] = useState(false);
  useDocumentTitle("Cart");

  const inCart = new Set(items.map((i) => i.slug));
  const categoriesInCart = new Set(items.map((i) => i.category));
  const suggestions = [
    ...allProducts.filter((p) => !inCart.has(p.slug) && categoriesInCart.has(p.category)),
    ...signatureCollection.filter((p) => !inCart.has(p.slug)),
    ...allProducts.filter((p) => !inCart.has(p.slug)),
  ]
    .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <>
        <section className="container-page pt-12 md:pt-16">
          <div className="flex flex-col items-center rounded-xl2 border border-ink-900/5 bg-white px-6 py-16 text-center shadow-soft sm:py-20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
              <ShoppingCart className="h-7 w-7 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-display-lg text-ink-900">Your cart is empty</h1>
            <p className="mt-3 max-w-md text-ink-500">
              Start with a room, or browse every piece in the shop. Delivery is free on orders over {formatPrice(FREE_DELIVERY_THRESHOLD)}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="btn-primary">
                Shop all furniture
              </Link>
              <Link to="/collections" className="btn-secondary">
                Browse collections
              </Link>
            </div>
          </div>
        </section>
        <section className="container-page pt-14 md:pt-20">
          <h2 className="mb-8 text-display-md text-ink-900">Popular right now</h2>
          <ProductGrid products={suggestions} />
        </section>
      </>
    );
  }

  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;
  const savings = items.reduce((sum, i) => sum + (i.compareAt ? (i.compareAt - i.price) * i.qty : 0), 0);

  return (
    <>
      <section className="container-page pt-12 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div>
            <h1 className="text-display-lg text-ink-900">Your cart</h1>
            <p className="mt-2 text-ink-500">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <Link to="/shop" className="btn-ghost min-h-0 pb-0.5">
            Continue shopping <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <div className="space-y-4">
            <DeliveryProgress subtotal={subtotal} />
            <ul className="space-y-4">
              {items.map((item) => (
                <CartLine
                  key={item.slug}
                  item={item}
                  onQty={(qty) => updateQty(item.slug, qty)}
                  onRemove={() => removeItem(item.slug)}
                />
              ))}
            </ul>
            <ul className="grid gap-3 rounded-xl2 border border-ink-900/5 bg-white px-5 py-4 shadow-soft sm:grid-cols-3 sm:gap-4">
              {PROMISES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-ink-700">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay-100">
                    <Icon className="h-4 w-4 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-4 rounded-xl2 border border-ink-900/5 bg-white p-6 shadow-card lg:sticky lg:top-28">
            <h2 className="text-xl text-ink-900">Order summary</h2>

            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-700">Subtotal</dt>
                <dd className="tabular-nums text-ink-900">{formatPrice(subtotal + savings)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-clay-600">Sale savings</dt>
                  <dd className="tabular-nums text-clay-600">−{formatPrice(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-700">Delivery</dt>
                <dd className="tabular-nums text-ink-900">{freeDelivery ? "Free" : formatPrice(delivery)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-ink-900/10 pt-3">
                <dt>
                  <span className="block font-medium text-ink-900">Total</span>
                  <span className="text-xs text-ink-500">Including sales tax</span>
                </dt>
                <dd className="font-display text-xl tabular-nums text-ink-900">{formatPrice(subtotal + delivery)}</dd>
              </div>
            </dl>

            <div>
              <button type="button" onClick={() => setCheckoutNote(true)} className="btn-primary min-h-[48px] w-full">
                <Lock className="h-4 w-4" aria-hidden="true" /> Check out
              </button>
              {checkoutNote && (
                <p role="status" className="mt-3 rounded-xl bg-cream-100 p-3.5 text-xs leading-relaxed text-ink-700">
                  Online checkout opens soon. To place this order now, call{" "}
                  <a href="tel:+15550124830" className="font-medium text-ink-900 underline underline-offset-2">+1 (555) 012-4830</a>{" "}
                  or <Link to="/contact" className="font-medium text-ink-900 underline underline-offset-2">send us a message</Link>.
                </p>
              )}
              <div className="mt-3 flex justify-center">
                <PaymentIcons />
              </div>
            </div>

          </aside>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="container-page pt-14 md:pt-20">
          <h2 className="mb-8 text-display-md text-ink-900">You might also like</h2>
          <ProductGrid products={suggestions} />
        </section>
      )}
    </>
  );
}
