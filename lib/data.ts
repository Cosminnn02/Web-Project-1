/**
 * Mock data — placeholder content for the design build.
 * We'll swap these for the final copy later.
 */

export const BRAND = {
  name: "Maison Voyage",
  short: "Maison",
  tagline: "Private travel, composed like a private affair.",
  email: "concierge@maisonvoyage.com",
  phone: "+41 22 000 0000",
  address: "Rue du Rhône 62, Geneva",
};

export const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Private Travel", href: "/private-travel" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export interface Destination {
  name: string;
  region: string;
  description: string;
  price: string; // "Private" or a starting figure
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    name: "Santorini",
    region: "Cyclades, Greece",
    description: "A private caldera villa, a chef on call, and the Aegean to yourself.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Kyoto",
    region: "Kansai, Japan",
    description: "Temple gardens at first light, a tea master, and rooms above the city.",
    price: "From $48,000",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Amalfi Coast",
    region: "Campania, Italy",
    description: "A cliffside palazzo, a boat at dawn, and long lunches that never end.",
    price: "From $62,000",
    image:
      "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Swiss Alps",
    region: "Valais, Switzerland",
    description: "A private chalet, a personal guide, and peaks that belong to no one.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Marrakech",
    region: "Morocco",
    description: "A restored riad, a private hammam, and the medina after the crowds.",
    price: "From $32,000",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Bali",
    region: "Indonesia",
    description: "A jungle estate, a private pool, and mornings that begin with silence.",
    price: "From $41,000",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
  },
];

export interface Experience {
  title: string;
  eyebrow: string;
  word: string;
  description: string;
  details: string[];
  image: string;
  video: string;
}

export const EXPERIENCES: Experience[] = [
  {
    title: "A Private Yacht Day",
    eyebrow: "On the Water",
    word: "Celebrate",
    description:
      "Your own crew, your own course, and the horizon unshared. We arrange the vessel, the captain, and the provisions — you choose the light and the pace.",
    details: [
      "A captain and crew, dedicated to you",
      "Provisions composed around your table",
      "Anchors dropped wherever the day leads",
    ],
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80",
    video: "yacht-e58b3f7a.mp4",
  },
  {
    title: "Sunset in a Vineyard",
    eyebrow: "At Golden Hour",
    word: "Explore",
    description:
      "A table for two among the rows, as the light turns to gold. The estate opens its cellar, and the evening is measured in pours, not minutes.",
    details: [
      "A private table among the vines",
      "The cellar, opened for two",
      "An evening that ends when you decide",
    ],
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    video: "vineyard-236aa879.mp4",
  },
  {
    title: "Private Gallery Access",
    eyebrow: "After Closing",
    word: "Observe",
    description:
      "The collection after closing, with the curator at your side. No crowds, no glass between you and the work — only the conversation it invites.",
    details: [
      "The gallery, emptied for you",
      "A curator, not a guide",
      "Works you will not find in any catalogue",
    ],
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
    video: "gallery-0c3c6a92.mp4",
  },
  {
    title: "A Spa Retreat",
    eyebrow: "In Silence",
    word: "Relax",
    description:
      "Days measured in silence, water, and unhurried care. A private suite, a private therapist, and a schedule that belongs entirely to you.",
    details: [
      "A suite held for you alone",
      "Therapists who know your name",
      "A rhythm set by you, not the clock",
    ],
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
    video: "spa-8fb3a06d.mp4",
  },
  {
    title: "A Cultural Immersion",
    eyebrow: "By Hand",
    word: "Create",
    description:
      "A master, a craft, and an afternoon that changes how you see. We open the doors that are usually closed, and introduce you to the hands behind the work.",
    details: [
      "A master craftsman, privately",
      "A workshop that does not open to the public",
      "An afternoon you will carry home",
    ],
    image:
      "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=1600&q=80",
    video: "craft-6020c33a.mp4",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Consult",
    description:
      "A quiet conversation about what you're seeking — the places, the pace, the people.",
  },
  {
    n: "02",
    title: "Curate",
    description:
      "We compose a single, considered itinerary. Nothing generic, nothing rushed.",
  },
  {
    n: "03",
    title: "Journey",
    description:
      "You travel. We remain quietly close, adjusting everything as the days unfold.",
  },
] as const;

export const ITINERARY = {
  eyebrow: "Featured Itinerary",
  title: "The Amalfi Quiet",
  duration: "9 days · 2 guests · Private",
  description:
    "Nine days along the coast, unhurried. A cliffside palazzo, a private boat, and long lunches that never quite end — composed entirely around you.",
  highlights: [
    "A private palazzo above Positano",
    "A personal boat and captain, daily",
    "A table for two in a working vineyard",
    "A chef who cooks only for you",
    "The coast, after the crowds have gone",
  ],
  image:
    "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?auto=format&fit=crop&w=1800&q=80",
  // Foreground gallery (right column) — a centered trio: small | main | small.
  // Reusing proven-working Unsplash URLs already used elsewhere in the site.
  imageMain:
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
  imageLeft:
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
  imageRight:
    "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80",
  imageExtra1:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  imageExtra2:
    "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80",
};

export const TESTIMONIAL = {
  quote:
    "They didn't plan a trip. They understood us — and then the world simply arranged itself around us.",
  author: "A private client",
  detail: "Geneva · since 2019",
};

export const STATS = [
  { value: 18, suffix: "", label: "Years of quiet practice" },
  { value: 42, suffix: "", label: "Destinations, privately held" },
  { value: 300, suffix: "+", label: "Private clients served" },
] as const;
