// Optimized photos live in src/assets/photos/ (generated from images/ by
// `npm run images:optimize`). A product without a matching photo falls
// back to ProductArt's Unsplash fetch, then to placeholder art.

const photos = Object.fromEntries(
  Object.entries(
    import.meta.glob("../assets/photos/*.webp", { eager: true, import: "default" })
  ).map(([path, url]) => [path.split("/").pop().replace(".webp", ""), url])
);

export const photo = (name) => photos[name];

export const categories = [
  { slug: "living-room", name: "Living Room", image: photo("room-living"), blurb: "Sofas, lounge chairs and low tables for long evenings." },
  { slug: "bedroom", name: "Bedroom", image: photo("room-bedroom"), blurb: "Quiet frames, nightstands and wardrobes in solid oak." },
  { slug: "dining-room", name: "Dining Room", image: photo("room-dining"), blurb: "Tables that seat four to eight and age with every meal." },
  { slug: "office", name: "Office", image: photo("room-office"), blurb: "Desks sized for real work in real apartments." },
  { slug: "outdoor", name: "Outdoor", image: photo("room-outdoor"), blurb: "Teak and powder-coated steel, built for all four seasons." },
  { slug: "storage", name: "Storage", image: photo("room-storage"), blurb: "Sideboards and shelves that hide the clutter, show the rest." },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export const allProducts = [
  {
    slug: "savannah-sofa",
    name: "Savannah Sofa",
    price: 899,
    tag: "sofa",
    category: "Living Room",
    query: "beige linen sofa living room",
    material: "Bouclé upholstery, solid oak legs",
    dimensions: "W 220 × D 95 × H 78 cm",
    description:
      "A deep, low-slung three-seater built for slow afternoons. Feather-wrapped foam cushions hold their shape without losing softness, and the tapered oak legs keep the silhouette light.",
    image: photo("savannah-sofa"),
  },
  {
    slug: "luna-lounge-chair",
    name: "Luna Lounge Chair",
    price: 299,
    tag: "chair",
    category: "Living Room",
    query: "boucle lounge chair",
    material: "Bouclé, natural rubberwood",
    dimensions: "W 72 × D 80 × H 74 cm",
    description:
      "A rounded lounge chair with a gentle recline built into the frame. Small enough to float in a corner, comfortable enough to become everyone's favorite seat.",
    image: photo("luna-lounge-chair"),
  },
  {
    slug: "oakridge-dining-table",
    name: "Oakridge Dining Table",
    price: 699,
    compareAt: 899,
    tag: "table",
    category: "Dining Room",
    query: "solid oak dining table",
    material: "Solid oak, hardwax oil",
    dimensions: "W 180 × D 90 × H 75 cm",
    description:
      "A six-seat table with a single live-edge detail on one side. Finished with a hardwax oil that ages gracefully instead of showing every mark.",
    image: photo("oakridge-dining-table"),
  },
  {
    slug: "nova-coffee-table",
    name: "Nova Coffee Table",
    price: 199,
    tag: "coffee-table",
    category: "Living Room",
    query: "round coffee table",
    material: "Solid ash, tempered glass",
    dimensions: "Ø 90 × H 40 cm",
    description:
      "A low, round coffee table on a sculpted ash base. Light enough to move, sturdy enough to hold a stack of books and then some.",
    image: photo("nova-coffee-table"),
  },
  {
    slug: "matteo-armchair",
    name: "Matteo Armchair",
    price: 349,
    tag: "chair",
    category: "Living Room",
    query: "modern accent armchair",
    material: "Woven fabric, ash frame",
    dimensions: "W 68 × D 74 × H 76 cm",
    description:
      "A compact accent chair with a gently curved back and wide arms. Scaled for reading corners and small living rooms without feeling undersized.",
    image: photo("matteo-armchair"),
  },
  {
    slug: "elysian-bookshelf",
    name: "Elysian Bookshelf",
    price: 499,
    tag: "shelf",
    category: "Storage",
    query: "wood open bookshelf",
    material: "Solid oak",
    dimensions: "W 90 × D 35 × H 190 cm",
    description:
      "Five open shelves in staggered depths, built to hold books, plants, and the small objects that make a room feel lived-in.",
    image: photo("elysian-bookshelf"),
  },
  {
    slug: "harper-bed-frame",
    name: "Harper Bed Frame",
    price: 699,
    tag: "bed",
    category: "Bedroom",
    query: "upholstered bed frame bedroom",
    material: "Solid oak, upholstered headboard",
    dimensions: "Queen · W 168 × L 215 × H 105 cm",
    description:
      "A low platform frame with a padded headboard sized for reading in bed. No box spring needed — slats are rated for memory foam and hybrid mattresses alike.",
    image: photo("harper-bed-frame"),
  },
  {
    slug: "alder-nightstand",
    name: "Alder Nightstand",
    price: 229,
    tag: "storage",
    category: "Bedroom",
    query: "oak nightstand",
    material: "Solid oak, push-to-open drawer",
    dimensions: "W 50 × D 40 × H 55 cm",
    description:
      "One soft drawer and an open shelf below for the book you're halfway through. Rounded edges, no handles to catch a sleeve on in the dark.",
    image: photo("alder-nightstand"),
  },
  {
    slug: "velora-wardrobe",
    name: "Velora Cabinet",
    price: 799,
    tag: "wardrobe",
    category: "Bedroom",
    query: "wood glass cabinet",
    material: "Solid oak, reeded glass doors",
    dimensions: "W 100 × D 45 × H 190 cm",
    description:
      "A tall two-door cabinet with four adjustable shelves behind reeded glass. Sized to fit through a standard doorway in one piece.",
    image: photo("velora-wardrobe"),
  },
  {
    slug: "willow-sideboard",
    name: "Willow Sideboard",
    price: 749,
    tag: "storage",
    category: "Storage",
    query: "walnut wood sideboard cabinet",
    material: "Solid walnut, fluted fronts",
    dimensions: "W 180 × D 45 × H 75 cm",
    description:
      "Two drawers and fluted soft-close cabinets in book-matched walnut. Enough storage for a full dinnerware set, still shallow enough for a narrow hallway.",
    image: photo("willow-sideboard"),
  },
  {
    slug: "dante-desk",
    name: "Dante Desk",
    price: 499,
    tag: "desk",
    category: "Office",
    query: "minimal wood writing desk",
    material: "Solid oak, cable tray underneath",
    dimensions: "W 140 × D 70 × H 75 cm",
    description:
      "A writing desk with a hidden cable tray and a raised shelf for the monitor. Deep enough for a laptop, a keyboard and a cup of coffee at the same time.",
    image: photo("dante-desk"),
  },
  {
    slug: "halden-round-table",
    name: "Halden Round Table",
    price: 589,
    compareAt: 739,
    tag: "table",
    category: "Dining Room",
    query: "round oak dining table",
    material: "Solid oak, pedestal base",
    dimensions: "Ø 120 × H 75 cm",
    description:
      "A pedestal table that seats four without anyone straddling a leg. A good fit for kitchens and the corner of an open-plan room.",
    image: photo("halden-round-table"),
  },
  {
    slug: "marlow-dining-table",
    name: "Marlow Dining Table",
    price: 849,
    compareAt: 1129,
    tag: "table",
    category: "Dining Room",
    query: "walnut dining table",
    material: "Solid walnut, oiled finish",
    dimensions: "W 200 × D 95 × H 75 cm",
    description:
      "A long walnut table with splayed legs set in from the corners, so a bench or two extra chairs slide in easily at the ends.",
    image: photo("marlow-dining-table"),
  },
  {
    slug: "terra-outdoor-set",
    name: "Terra Outdoor Dining Set",
    price: 1190,
    tag: "table",
    category: "Outdoor",
    query: "outdoor dining set",
    material: "Teak top, powder-coated steel chairs",
    dimensions: "Table W 180 × D 90 cm · 6 chairs",
    description:
      "A teak table with six stackable steel chairs. Leave it out all year: the teak silvers naturally and the chairs drain fast after rain.",
    image: photo("terra-outdoor-set"),
  },

  // Living room
  {
    slug: "haven-modular-sofa",
    isNew: true,
    name: "Haven Modular Sofa",
    price: 1490,
    tag: "sofa",
    category: "Living Room",
    query: "modular sofa ottoman",
    material: "Oatmeal linen, kiln-dried oak frame",
    dimensions: "W 260 × D 100 × H 76 cm, ottoman included",
    description:
      "Four deep modules and a matching ottoman that rearrange in minutes — a corner sofa today, two loveseats when you move.",
    image: photo("haven-modular-sofa"),
  },
  {
    slug: "lowe-media-console",
    name: "Lowe Media Console",
    price: 649,
    tag: "storage",
    category: "Living Room",
    query: "oak media console",
    material: "Solid oak, cane-panelled doors",
    dimensions: "W 160 × D 42 × H 50 cm",
    description:
      "A low console for screens up to 65 inches, with cable cut-outs at the back and two cabinets that keep consoles and remotes out of sight.",
    image: photo("lowe-media-console"),
  },

  // Bedroom
  {
    slug: "arch-upholstered-bed",
    isNew: true,
    name: "Arch Upholstered Bed",
    price: 1090,
    tag: "bed",
    category: "Bedroom",
    query: "upholstered bed arched headboard",
    material: "Linen-blend upholstery, solid beech frame",
    dimensions: "Queen · W 170 × L 215 × H 120 cm",
    description:
      "A tall, softly arched headboard you can lean against with a book. The cover zips off for cleaning, and the slats sit low for an easy step in.",
    image: photo("arch-upholstered-bed"),
  },
  {
    slug: "fold-drawer-cabinet",
    name: "Fold Bedside Chest",
    price: 279,
    tag: "storage",
    category: "Bedroom",
    query: "fluted bedside chest",
    material: "Lacquered birch, fluted fronts",
    dimensions: "W 55 × D 40 × H 55 cm",
    description:
      "Two deep drawers behind fluted fronts that open with a light push. Tall enough to sit level with most mattresses.",
    image: photo("fold-drawer-cabinet"),
  },

  // Dining room
  {
    slug: "linden-dining-set",
    name: "Linden Dining Set",
    price: 1290,
    compareAt: 1690,
    tag: "table",
    category: "Dining Room",
    query: "oak dining set rush chairs",
    material: "Solid oak, woven paper-cord seats",
    dimensions: "Table W 200 × D 95 cm · 6 chairs",
    description:
      "A long oak table with six matching chairs on woven paper-cord seats. Bought as a set, it costs less than the pieces on their own.",
    image: photo("linden-dining-set"),
  },
  {
    slug: "fenn-dining-chair",
    name: "Fenn Dining Chair",
    price: 189,
    compareAt: 229,
    tag: "chair",
    category: "Dining Room",
    query: "oak dining chair",
    material: "Solid oak, oiled",
    dimensions: "W 45 × D 50 × H 80 cm, seat 46 cm",
    description:
      "A light, stackable chair with a curved back that supports you through long dinners. Mix it with any of our tables.",
    image: photo("fenn-dining-chair"),
  },
  {
    slug: "stack-stool",
    name: "Stack Stool",
    price: 129,
    tag: "chair",
    category: "Dining Room",
    query: "wooden stool",
    material: "Solid ash, wedged joints",
    dimensions: "W 40 × D 30 × H 45 cm",
    description:
      "A small stool with hand-wedged joints and no screws at all. Extra seating at the table, a plant stand, or a step up to the top shelf.",
    image: photo("stack-stool"),
  },

  // Office
  {
    slug: "pell-desk-chair",
    name: "Pell Desk Chair",
    price: 269,
    tag: "chair",
    category: "Office",
    query: "wooden desk chair",
    material: "Solid oak, charcoal wool seat pad",
    dimensions: "W 48 × D 52 × H 78 cm, seat 47 cm",
    description:
      "A wooden chair with a wool seat pad and a back angled for upright work. Designed to pair with the Dante and Rhea desks.",
    image: photo("pell-desk-chair"),
  },
  {
    slug: "rhea-standing-desk",
    isNew: true,
    name: "Rhea Standing Desk",
    price: 899,
    tag: "desk",
    category: "Office",
    query: "oak standing desk",
    material: "Oak top, quiet dual-motor steel frame",
    dimensions: "W 140 × D 70 × H 65–130 cm",
    description:
      "A sit-stand desk with an oak top and a frame that rises in under 20 seconds. Three height presets, and an anti-collision stop.",
    image: photo("rhea-standing-desk"),
  },
  {
    slug: "rue-corner-desk",
    name: "Rue Corner Desk",
    price: 389,
    tag: "desk",
    category: "Office",
    query: "small wooden writing desk",
    material: "Solid walnut, tapered legs",
    dimensions: "W 110 × D 55 × H 75 cm",
    description:
      "A compact writing desk with one slim drawer, sized for a bedroom corner or the space under a window.",
    image: photo("rue-corner-desk"),
  },
  {
    slug: "lean-ladder-shelf",
    name: "Lean Ladder Shelf",
    price: 159,
    tag: "shelf",
    category: "Office",
    query: "wooden ladder shelf",
    material: "Solid ash",
    dimensions: "W 45 × D 30 × H 180 cm",
    description:
      "A leaning ladder with a magazine ledge and rungs for throws. Rubber feet keep it steady without drilling into the wall.",
    image: photo("lean-ladder-shelf"),
  },

  // Outdoor
  {
    slug: "cove-outdoor-sofa",
    name: "Cove Outdoor Sofa Set",
    price: 1690,
    tag: "sofa",
    category: "Outdoor",
    query: "outdoor sofa set",
    material: "Teak frame, quick-dry outdoor cushions",
    dimensions: "Sofa W 210 cm · 2 lounge chairs · coffee table",
    description:
      "A three-seat sofa, two lounge chairs and a slatted coffee table. Cushions are filled with quick-dry foam and covered in fade-resistant fabric.",
    image: photo("cove-outdoor-sofa"),
  },
  {
    slug: "ostra-outdoor-daybed",
    isNew: true,
    name: "Ostra Outdoor Daybed",
    price: 990,
    tag: "sofa",
    category: "Outdoor",
    query: "outdoor daybed",
    material: "Acacia frame, water-resistant cushions",
    dimensions: "W 200 × D 80 × H 70 cm",
    description:
      "A long, low daybed for balconies and rooftops. Deep enough to nap on, and the cushions store flat in a box over winter.",
    image: photo("ostra-outdoor-daybed"),
  },
  {
    slug: "siesta-rattan-chair",
    name: "Siesta Lounge Chair",
    price: 349,
    tag: "chair",
    category: "Outdoor",
    query: "outdoor lounge chair",
    material: "Synthetic rattan, aluminium frame",
    dimensions: "W 70 × D 75 × H 80 cm",
    description:
      "A low lounge chair woven from UV-stable rattan over a rust-proof frame. Light enough to follow the sun across the terrace.",
    image: photo("siesta-rattan-chair"),
  },
  {
    slug: "pine-deck-sofa",
    name: "Pine Deck Sofa",
    price: 590,
    tag: "sofa",
    category: "Outdoor",
    query: "wooden outdoor sofa",
    material: "Heat-treated pine, outdoor cushions",
    dimensions: "W 180 × D 80 × H 75 cm",
    description:
      "A chunky slatted sofa in heat-treated pine that resists rot without chemical treatment. Scatter cushions included.",
    image: photo("pine-deck-sofa"),
  },

  // Storage
  {
    slug: "hollis-tall-cabinet",
    name: "Hollis Tall Cabinet",
    price: 899,
    tag: "storage",
    category: "Storage",
    query: "walnut tall cabinet",
    material: "Solid walnut, brass pulls",
    dimensions: "W 90 × D 45 × H 150 cm",
    description:
      "Two doors over three drawers in deep walnut. Holds linens, glassware or a record collection, with adjustable shelves behind the doors.",
    image: photo("hollis-tall-cabinet"),
  },
  {
    slug: "cane-cabinet",
    isNew: true,
    name: "Cane Cabinet",
    price: 699,
    tag: "storage",
    category: "Storage",
    query: "rattan cane cabinet",
    material: "Teak veneer, woven cane doors",
    dimensions: "W 120 × D 40 × H 85 cm",
    description:
      "Woven cane doors let air move through, so it works as well for shoes in a hallway as it does for plates in a dining room.",
    image: photo("cane-cabinet"),
  },
  {
    slug: "kent-shelving-unit",
    name: "Kent Shelving Unit",
    price: 549,
    tag: "shelf",
    category: "Storage",
    query: "oak cube shelving",
    material: "Solid oak",
    dimensions: "W 120 × D 35 × H 120 cm",
    description:
      "Nine open cubes in solid oak that stand alone as a room divider or sit against a wall. Add fabric boxes for hidden storage.",
    image: photo("kent-shelving-unit"),
  },
];

// Shown on the home page
export const signatureCollection = ["luna-lounge-chair", "oakridge-dining-table", "nova-coffee-table", "willow-sideboard"].map(
  (slug) => allProducts.find((p) => p.slug === slug)
);

export function getProductBySlug(slug) {
  return allProducts.find((p) => p.slug === slug);
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export const FREE_DELIVERY_THRESHOLD = 500;

// Percentage saved on a sale item, rounded down (e.g. 24 for 849 vs 1129)
export function discountPercent(product) {
  if (!product.compareAt || product.compareAt <= product.price) return 0;
  return Math.floor((1 - product.price / product.compareAt) * 100);
}
