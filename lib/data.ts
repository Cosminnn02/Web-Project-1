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
] as const;

export interface Destination {
  name: string;
  region: string;
  continent: string;
  description: string;
  price: string; // "Private" or a starting figure
  image: string;
}

export const DESTINATIONS: Destination[] = [
  // ——— Europe ———
  {
    name: "Santorini",
    region: "Cyclades, Greece",
    continent: "Europe",
    description: "A private caldera villa, a chef on call, and the Aegean to yourself.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Amalfi Coast",
    region: "Campania, Italy",
    continent: "Europe",
    description: "A cliffside palazzo, a boat at dawn, and long lunches that never end.",
    price: "From $62,000",
    image:
      "https://images.unsplash.com/photo-1583844056361-4418a8f2a985?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Swiss Alps",
    region: "Valais, Switzerland",
    continent: "Europe",
    description: "A private chalet, a personal guide, and peaks that belong to no one.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Lofoten Islands",
    region: "Nordland, Norway",
    continent: "Europe",
    description: "A whitewashed rorbu above the fjord, midnight sun, and the sea to yourself.",
    price: "From $38,000",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80",
  },
  // ——— Asia ———
  {
    name: "Kyoto",
    region: "Kansai, Japan",
    continent: "Asia",
    description: "Temple gardens at first light, a tea master, and rooms above the city.",
    price: "From $48,000",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Bali",
    region: "Indonesia",
    continent: "Asia",
    description: "A jungle estate, a private pool, and mornings that begin with silence.",
    price: "From $41,000",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Maldives",
    region: "North Atoll",
    continent: "Asia",
    description: "A single overwater villa, a house reef, and a horizon with nothing on it.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a59e8?auto=format&fit=crop&w=1400&q=80",
  },
  // ——— Africa ———
  {
    name: "Marrakech",
    region: "Morocco",
    continent: "Africa",
    description: "A restored riad, a private hammam, and the medina after the crowds.",
    price: "From $32,000",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Serengeti",
    region: "Tanzania",
    continent: "Africa",
    description: "A private tented camp, a guide who knows the plains, and the migration.",
    price: "From $55,000",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Cape Town",
    region: "Western Cape, South Africa",
    continent: "Africa",
    description: "A cliff estate between two oceans, a cellar, and the city at your feet.",
    price: "From $36,000",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=80",
  },
  // ——— North America ———
  {
    name: "Banff",
    region: "Alberta, Canada",
    continent: "North America",
    description: "A lakeside lodge, a private guide, and the Rockies in first light.",
    price: "From $44,000",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Big Sur",
    region: "California, USA",
    continent: "North America",
    description: "A cliffside house above the Pacific, a chef, and the coast to yourself.",
    price: "From $58,000",
    image:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Tulum",
    region: "Quintana Roo, Mexico",
    continent: "North America",
    description: "A cenote, a private beach, and the jungle at the edge of the sea.",
    price: "From $34,000",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80",
  },
  // ——— South America ———
  {
    name: "Cusco",
    region: "Peru",
    continent: "South America",
    description: "A private hacienda above the Andes, a guide, and the road to Machu Picchu.",
    price: "From $42,000",
    image:
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Patagonia",
    region: "Argentina",
    continent: "South America",
    description: "A remote estancia, a private guide, and the wind at the end of the world.",
    price: "From $52,000",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
  },
  // ——— Oceania ———
  {
    name: "Queenstown",
    region: "Otago, New Zealand",
    continent: "Oceania",
    description: "A lakeside villa, a private heli, and the Southern Alps as your backdrop.",
    price: "From $46,000",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Great Barrier Reef",
    region: "Queensland, Australia",
    continent: "Oceania",
    description: "A private island, a house reef, and the water to yourself.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1400&q=80",
  },
  // ——— Antarctica ———
  {
    name: "Antarctica",
    region: "The Southern Ocean",
    continent: "Antarctica",
    description: "A private expedition, a research station, and a continent that belongs to no one.",
    price: "Private",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80",
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
  // Foreground gallery (right column) — a 5-image ring: center | sides | behind.
  // Local pictures in /public/pics, mapped to the itinerary's highlights.
  imageMain: "/pics/pexels-alejandro-henriquez-558322658-19102632.jpg",
  imageLeft: "/pics/pexels-dendoktoor-9100844.jpg",
  imageRight: "/pics/pexels-celalkeser-33966954.jpg",
  imageExtra1: "/pics/pexels-qaarif-16018410.jpg",
  imageExtra2: "/pics/pexels-pixabay-358223.jpg",
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
