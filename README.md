# Anti — Furniture Store

A front-end for a fictional furniture brand, built with **React 19**, **React
Router 7** and **Tailwind CSS 3** on **Vite**.

The UI design was generated with Google Stitch; this project is my
implementation of it. Products, prices, reviews and contact details are demo
data.

## Features

- **Shop** with room filters, an "On sale" filter and sorting, all kept in the
  URL (`/shop?room=bedroom&sort=price-asc`) so filtered views can be shared
- **Cart** saved in `localStorage` (only `{ slug, qty }`, so prices and images
  always come from the catalog), with a free-delivery progress bar, sale
  savings and quick add-to-cart from any product card
- **Product pages** with sale pricing, quantity, related pieces and a breadcrumb
- **Blog** with article pages, **Contact** form with inline validation, and a
  404 page
- **Responsive** from 320px phones to desktop, with a full-height side drawer
  menu on small screens
- **Accessible**: keyboard focus styles, skip link, labelled controls, focus
  trap in the mobile menu, `prefers-reduced-motion` respected
- **Fast images**: photos converted from ~1.2 MB PNGs to ~50 KB WebP, with
  reserved dimensions and lazy loading

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build    # production build in dist/
npm run lint     # oxlint
```

## Project structure

```
src/
  pages/        one file per route (Home, Shop, Collections, Product, Cart,
                About, Blog, BlogPost, Contact, Policies, NotFound)
  components/   Navbar, Footer, Hero, ProductGrid, Testimonials, …
  data/         catalog.js (products, rooms), blog.js, reviews.js
  context/      cart state
  assets/       optimized WebP photos
scripts/        image optimization (sharp)
```

Design tokens (colors `cream`, `ink`, `clay`, `moss`; fonts Fraunces and
Inter; type scale) live in `tailwind.config.js`.

## Images

Room and studio photos were generated with Google Stitch. Fourteen product
photos come from [Unsplash](https://unsplash.com) and are credited on each
product page (`src/assets/products/credits.json`).

The original full-size PNGs are not in this repository. To re-run the WebP
conversion, put them in `images/` and run `npm run images:optimize` (see the
`MAP` in `scripts/optimize-images.mjs`).
