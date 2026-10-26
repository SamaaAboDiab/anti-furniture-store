// Converts the source photos in images/ into small WebP files under
// src/assets/photos/, named by what they show. Run with:
//   npm run images:optimize
// Re-run whenever you add or swap a photo in the MAP below.

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "images", "stitch_image_extraction_tool");
const OUT = path.join(root, "src", "assets", "photos");

const shot = (folder) => path.join(SRC, `high_quality_professional_studio_photography_of_${folder}`, "screen.png");
const category = (folder) => path.join(SRC, `extract_and_recreate_the_${folder}`, "screen.png");

// output name → [source file, max width, optional crop { left, top, width, height }]
const MAP = {
  "hero-living-room": [path.join(SRC, "extract_the_main_hero_image_showing_a_stylish_living_room_with_a_beige_sofa", "screen.png"), 1920],

  "savannah-sofa": [shot("the_savannah_sofa_from_data"), 1000],
  "matteo-armchair": [shot("the_matteo_armchair_from_data"), 1000],
  "willow-sideboard": [shot("the_willow_sideboard_from_data"), 1000],
  "harper-bed-frame": [shot("the_harper_bed_frame_from_data"), 1000],
  "dante-desk": [shot("a_modern_home_office_setup_with"), 1000],
  "velora-wardrobe": [shot("the_velora_wardrobe_from_data"), 1000],
  "luna-lounge-chair": [shot("the_luna_lounge_chair._a"), 1000],
  "oakridge-dining-table": [shot("the_oakridge_dining_table._a"), 1000],
  "nova-coffee-table": [shot("the_nova_coffee_table._a_round"), 1000],
  "elysian-bookshelf": [shot("the_elysian_bookshelf._a"), 1000],
  "alder-nightstand": [shot("a_minimalist_light_wood_1"), 1000],
  "halden-round-table": [shot("a_round_minimalist_wooden"), 1000],
  "marlow-dining-table": [shot("the_dante_desk_from_data_image"), 1000],
  "terra-outdoor-set": [shot("a_modern_outdoor_patio_set_with_1"), 1000],
  "haven-modular-sofa": [shot("a_spacious_living_area"), 1000],
  "linden-dining-set": [shot("a_modern_outdoor_patio_set_with"), 1000],
  "hollis-tall-cabinet": [category("storage_category_image_from_data_image_image_1._a"), 1000],
  "cove-outdoor-sofa": [category("outdoor_category_image_from_data_image_image_1._a"), 1000],
  // The remaining product photos (pell-desk-chair, ostra-outdoor-daybed, …)
  // came from Unsplash and are already WebP in src/assets/photos/;
  // credits are in src/assets/products/credits.json.

  "room-living": [category("living_room_category_image_from_data_image_image_1._a"), 1024],
  "room-bedroom": [category("bedroom_category_image_from_data_image_image_1._a_cozy"), 1024],
  "room-dining": [shot("a_minimalist_light_wood_dining"), 1024],
  "room-office": [category("office_category_image_from_data_image_image_1._a_clean"), 1024],
  "room-outdoor": [category("outdoor_category_image_from_data_image_image_1._a"), 1024],
  "room-storage": [category("storage_category_image_from_data_image_image_1._a"), 1024],

  "scene-bedroom": [shot("a_cozy_bedroom_with_a_light"), 1400],
  "scene-minimal-living": [shot("a_modern_minimalist_living_room"), 1600],
  "scene-sideboard": [shot("a_stylish_wooden_sideboard_or"), 1400],
  "scene-living": [shot("a_stylish_living_room_with_a"), 1400],
  "promo-dining": [shot("a_minimalist_light_wood_dining"), 1400],
  "quote-lamp": [shot("a_minimalist_light_wood"), 1200, { left: 60, top: 60, width: 905, height: 555 }],
  "newsletter-plant": [path.join(SRC, "extract_the_main_hero_image_showing_a_stylish_living_room_with_a_beige_sofa", "screen.png"), 800, { left: 600, top: 180, width: 424, height: 640 }],
  "blog-sustainable": [shot("a_modern_outdoor_patio_set_with_2"), 1000],
};

await mkdir(OUT, { recursive: true });

for (const [name, [src, width, crop]] of Object.entries(MAP)) {
  const dest = path.join(OUT, `${name}.webp`);
  const img = sharp(src);
  if (crop) img.extract(crop);
  const info = await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
  console.log(`${name}.webp  ${Math.round(info.size / 1024)} KB`);
}
