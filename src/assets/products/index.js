// Automatically picks up any image file placed in this folder, keyed by
// filename (without extension) — which should match a product's `slug`
// in src/data/catalog.js. Run `npm run fetch-images` to populate this
// folder automatically, or drop files in by hand.
//
// e.g. savannah-sofa.jpg in this folder → localProductImages["savannah-sofa"]

const modules = import.meta.glob("./*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
});

export const localProductImages = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const slug = path.replace("./", "").replace(/\.[^.]+$/, "");
    return [slug, url];
  })
);
