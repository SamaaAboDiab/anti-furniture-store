import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "../data/catalog";
import { CartContext } from "./cart";

const STORAGE_KEY = "anti-cart";

// Only { slug, qty } is persisted. Price, name and image are always read
// from the catalog, so a stale localStorage entry can never show an old
// price or a broken image URL from a previous build.
function readInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((i) => i && getProductBySlug(i.slug) && Number.isInteger(i.qty) && i.qty > 0)
      .map(({ slug, qty }) => ({ slug, qty }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart just won't persist across reloads */
    }
  }, [lines]);

  const value = useMemo(() => {
    const items = lines.map((l) => ({ ...getProductBySlug(l.slug), qty: l.qty }));

    function addItem(product, qty = 1) {
      setLines((prev) => {
        const existing = prev.find((i) => i.slug === product.slug);
        if (existing) {
          return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { slug: product.slug, qty }];
      });
    }

    function removeItem(slug) {
      setLines((prev) => prev.filter((i) => i.slug !== slug));
    }

    function updateQty(slug, qty) {
      if (qty < 1) return removeItem(slug);
      setLines((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty } : i)));
    }

    function clearCart() {
      setLines([]);
    }

    return {
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.qty * i.price, 0),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
