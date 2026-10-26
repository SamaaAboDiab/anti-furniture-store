import { photo } from "./catalog";

export const blogPosts = [
  {
    slug: "style-your-living-room",
    title: "5 Tips to Style Your Living Room",
    date: "2026-06-10",
    readMinutes: 4,
    image: photo("scene-living"),
    excerpt: "Small changes that make a living room feel calmer, warmer and more like you.",
    body: [
      ["Start with one anchor piece", "Choose the piece the room is built around — usually the sofa — and plan everything else around its scale. A deep three-seater like the Savannah needs about 90 cm of walking space in front of it."],
      ["Layer three kinds of light", "A ceiling pendant for general light, a floor lamp for reading and one small table lamp for the evening. Warm bulbs (2700K) keep linen and oak looking their best."],
      ["Keep to two or three materials", "Oak, linen and one accent such as walnut or cane is plenty. Repeating the same wood tone two or three times across a room makes it feel planned rather than collected."],
      ["Give the rug room to breathe", "The front legs of the sofa and chairs should sit on the rug. In most living rooms that means 200 × 300 cm, bigger than people expect."],
      ["Leave some surfaces empty", "A coffee table with a single stack of books and a vase looks styled; one covered edge to edge looks cluttered. Closed storage like the Lowe console takes care of the rest."],
    ],
  },
  {
    slug: "choose-the-perfect-sofa",
    title: "How to Choose the Perfect Sofa",
    date: "2026-06-04",
    readMinutes: 5,
    image: photo("haven-modular-sofa"),
    excerpt: "Seat depth, fillings, fabrics and the one measurement most people forget.",
    body: [
      ["Measure the door, not just the room", "Check the width of every doorway, hallway and stairwell on the way in. Modular sofas like the Haven arrive in pieces, which solves most tight-entry problems."],
      ["Pick a seat depth for how you sit", "55 cm suits people who sit upright; 60 cm and up is for curling up and napping. If you are shorter, add a lumbar cushion rather than buying a shallower sofa."],
      ["Know what's inside the cushions", "High-resilience foam wrapped in feather keeps its shape and stays soft. All-feather cushions need plumping daily; all-foam can feel firm at first."],
      ["Choose a fabric for your household", "Bouclé and tightly woven linen hide wear well. With pets or children, look for removable, washable covers and a rub count above 30,000."],
      ["Sit on it for ten minutes", "Visit a showroom and sit the way you would at home. Comfort over the first minute and comfort after ten are very different things."],
    ],
  },
  {
    slug: "sustainable-furniture",
    title: "Sustainable Furniture: Why It Matters",
    date: "2026-05-28",
    readMinutes: 3,
    image: photo("blog-sustainable"),
    excerpt: "The most sustainable sofa is the one you never have to replace.",
    body: [
      ["Longevity beats recyclability", "Most of a piece's environmental cost is paid when it's made. A table that lasts 30 years has a fraction of the footprint of three that last ten."],
      ["Solid wood can be repaired", "Scratches in oiled oak sand out in minutes and the finish can be refreshed at home. Veneered particleboard, once chipped, usually can't be fixed."],
      ["Look for replaceable parts", "Zip-off covers, bolted rather than glued joints, and standard hardware all mean a piece can be repaired instead of thrown away."],
      ["Ask where the wood comes from", "Every board we use is FSC-certified, and we publish the mill for each species. If a brand can't tell you where its wood is from, that's a good question to keep asking."],
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
