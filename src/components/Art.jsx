import {
  Sofa,
  Bed,
  Armchair,
  Table,
  BookOpen,
  Lamp,
  Archive,
  PanelsTopLeft,
} from "lucide-react";
import { useUnsplashImage } from "../lib/useUnsplashImage";
import { localProductImages } from "../assets/products";

const ICONS = {
  sofa: Sofa,
  bed: Bed,
  chair: Armchair,
  storage: Archive,
  desk: PanelsTopLeft,
  wardrobe: Archive,
  table: Table,
  "coffee-table": Table,
  shelf: BookOpen,
};

/**
 * Renders a product's photo. Priority order:
 *  1. A local file in src/assets/products/ named after `product.slug`
 *  2. `product.image` — set in src/data/catalog.js from src/assets/photos/
 *  3. A live photo fetched from the Unsplash API, searched by `product.query`
 *     (requires VITE_UNSPLASH_ACCESS_KEY, see .env.example)
 *  4. Placeholder art keyed by `product.tag`
 *
 * The wrapper always reserves its box (via className, e.g. aspect-[4/5]),
 * so images never shift the layout while loading.
 */
export function ProductArt({ product, className = "", priority = false, sizes = "(min-width: 768px) 25vw, 50vw" }) {
  const localImage = (product?.slug && localProductImages[product.slug]) || product?.image;
  const searchQuery = !localImage && product ? product.query || product.name : null;
  const { url: remoteImage } = useUnsplashImage(searchQuery);
  const image = localImage || remoteImage;

  if (image) {
    return (
      <div className={`overflow-hidden bg-cream-200 ${className}`}>
        <img
          src={image}
          alt={product?.name || ""}
          width={1000}
          height={1000}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const Icon = ICONS[product?.tag] || Lamp;
  return (
    <div className={`flex items-center justify-center bg-cream-200 ${className}`}>
      <Icon className="h-12 w-12 text-ink-900/20" strokeWidth={1} aria-hidden="true" />
    </div>
  );
}
