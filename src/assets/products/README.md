# Product images

There are two ways to get real photos into this site — pick one, or mix
both.

## Option A — Unsplash API (no files to manage)

Product cards already fetch a matching photo automatically at runtime,
based on each product's `query` field in `src/data/catalog.js`.

1. Get a free key: https://unsplash.com/developers → New Application →
   copy the "Access Key"
2. Copy `.env.example` (project root) to `.env`
3. Paste your key: `VITE_UNSPLASH_ACCESS_KEY=your_key_here`
4. Restart `npm run dev`

That's it — no images to download or commit. If a product's `query`
doesn't return a great match, just edit that product's `query` field in
`catalog.js`.

## Option B — Your own photo files

Drop image files in this folder, named however you like, e.g.:

    savannah-sofa.jpg

Then in `catalog.js`, import it and add it to that product's `image`
field:

    import savannahSofaImg from "../assets/products/savannah-sofa.jpg";
    { slug: "savannah-sofa", ..., image: savannahSofaImg }

A local `image` always takes priority over the Unsplash fetch. Any
product with neither falls back to the placeholder art, so you can adopt
either option gradually, product by product.
