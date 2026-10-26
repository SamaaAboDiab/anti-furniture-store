#!/usr/bin/env node
// Downloads one photo per product from Unsplash straight into
// src/assets/products/, named after each product's slug. Run this once
// (or whenever you add/change products) — after that the site needs no
// API calls at all; ProductArt picks the local files up automatically.
//
// Usage:  npm run images:download

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "src/assets/products");
const CREDITS_FILE = path.join(OUT_DIR, "credits.json");

function loadEnvKey() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) {
    console.error(
      "No .env file found. Copy .env.example to .env and add your VITE_UNSPLASH_ACCESS_KEY first."
    );
    process.exit(1);
  }
  const contents = readFileSync(envPath, "utf-8");
  const match = contents.match(/^VITE_UNSPLASH_ACCESS_KEY\s*=\s*(.+)\s*$/m);
  if (!match || !match[1].trim()) {
    console.error("VITE_UNSPLASH_ACCESS_KEY is missing or empty in .env.");
    process.exit(1);
  }
  return match[1].trim();
}

async function loadProducts() {
  const catalogUrl = "file://" + path.join(ROOT, "src/data/catalog.js");
  const { allProducts } = await import(catalogUrl);
  return allProducts.filter((p) => p.query);
}

async function searchUnsplash(query, key) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=1&orientation=squarish`,
    { headers: { Authorization: `Client-ID ${key}` } }
  );
  if (!res.ok) {
    throw new Error(`search failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.results?.[0] || null;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed (${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
}

// Unsplash's guidelines ask apps to ping this when a photo is actually
// used, so photographers get accurate download counts.
async function pingDownloadTracking(downloadLocationUrl, key) {
  try {
    await fetch(downloadLocationUrl, {
      headers: { Authorization: `Client-ID ${key}` },
    });
  } catch {
    /* non-critical — don't fail the whole run over this */
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const key = loadEnvKey();
  const products = await loadProducts();

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const credits = existsSync(CREDITS_FILE)
    ? JSON.parse(readFileSync(CREDITS_FILE, "utf-8"))
    : {};

  const succeeded = [];
  const failed = [];

  for (const product of products) {
    const destPath = path.join(OUT_DIR, `${product.slug}.jpg`);
    if (existsSync(destPath)) {
      console.log(`${product.slug}: already downloaded, skipping`);
      succeeded.push(product.slug);
      continue;
    }

    process.stdout.write(`${product.slug} ("${product.query}")... `);
    try {
      const result = await searchUnsplash(product.query, key);
      if (!result) {
        console.log("no results, skipped");
        failed.push({ slug: product.slug, reason: "no results" });
        await sleep(300);
        continue;
      }

      await downloadImage(result.urls.regular, destPath);

      credits[product.slug] = {
        photographer: result.user?.name || "Unknown",
        photographerUrl: result.user?.links?.html
          ? `${result.user.links.html}?utm_source=anti-furniture&utm_medium=referral`
          : null,
        unsplashUrl: `${result.links.html}?utm_source=anti-furniture&utm_medium=referral`,
      };

      if (result.links?.download_location) {
        await pingDownloadTracking(result.links.download_location, key);
      }

      console.log("done");
      succeeded.push(product.slug);
    } catch (err) {
      console.log(`failed — ${err.message}`);
      failed.push({ slug: product.slug, reason: err.message });
    }

    // Stay well under the 50 req/hour demo limit (2 requests per product).
    await sleep(500);
  }

  writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2));

  console.log("\n---");
  console.log(`Downloaded: ${succeeded.length}/${products.length}`);
  if (failed.length) {
    console.log("Failed:");
    failed.forEach((f) => console.log(`  - ${f.slug}: ${f.reason}`));
    console.log(
      "\nIf these failed with a 403, you likely hit the 50 req/hour demo limit — wait an hour and re-run; already-downloaded images are kept."
    );
  }
}

main();
